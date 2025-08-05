import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { UploadFile as UploadIcon, History as HistoryIcon, Delete as DeleteIcon, Print as PrintIcon, Download as DownloadIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import PoTable from './components/PoTable';
import OrderHistoryModal from './components/OrderHistoryModal';
import * as XLSX from 'xlsx';
import type { PoItem, LookupData, OrderHistoryEntry, LoggedInUser } from './types';
import { supabase } from './supabaseClient';

const App = () => {
  const [items, setItems] = useState<PoItem[]>([]);
  const [currentPrNumber, setCurrentPrNumber] = useState('');
  const [lookupData, setLookupData] = useState<LookupData>({});
  const [orderHistory, setOrderHistory] = useState<OrderHistoryEntry[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const generateRandomDigits = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const generateUniquePrNumber = () => {
    return `PR# ${generateRandomDigits(6)}`;
  };

  useEffect(() => {
    setCurrentPrNumber(generateUniquePrNumber());

    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error.message);
          setLoggedInUser(null);
          setShowLoginDialog(true);
        } else {
          setLoggedInUser({ id: session.user.id, email: session.user.email || '', role: profile?.role || 'user' });
          setShowLoginDialog(false);
        }
      } else {
        setLoggedInUser(null);
        setShowLoginDialog(true);
      }
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const fetchProfile = async () => {
            const { data: profile, error } = await supabase
              .from('user_profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error('Error fetching user profile:', error.message);
              setLoggedInUser(null);
              setShowLoginDialog(true);
            } else {
              setLoggedInUser({ id: session.user.id, email: session.user.email || '', role: profile?.role || 'user' });
              setShowLoginDialog(false);
            }
          };
          fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          setLoggedInUser(null);
          setShowLoginDialog(true);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  

  useEffect(() => {
    // Generate a new PR number when the user logs in or if items are cleared
    if (loggedInUser && items.length === 0) {
      setCurrentPrNumber(generateUniquePrNumber());
    }
  }, [loggedInUser, items]);

  useEffect(() => {
    const fetchItems = async () => {
      if (loggedInUser) {
        const { data, error } = await supabase
          .from('pr_items')
          .select('*')
          .eq('user_id', loggedInUser.id);

        if (error) {
          console.error('Error fetching items:', error.message);
        } else {
          setItems(data || []);
        }
      }
    };
    fetchItems();

    const itemsSubscription = supabase
      .channel('pr_items_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pr_items', filter: `user_id=eq.${loggedInUser?.id}` },
        (payload) => {
          console.log('Change received!', payload);
          if (payload.eventType === 'INSERT') {
            setItems((prev) => [...prev, payload.new as PoItem]);
          } else if (payload.eventType === 'UPDATE') {
            setItems((prev) =>
              prev.map((item) =>
                item.id === (payload.new as PoItem).id ? (payload.new as PoItem) : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setItems((prev) =>
              prev.filter((item) => item.id !== (payload.old as PoItem).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      itemsSubscription.unsubscribe();
    };
  }, [loggedInUser]);

  useEffect(() => {
    const fetchLookupData = async () => {
      if (loggedInUser) {
        const { data, error } = await supabase
          .from('lookup_data')
          .select('*')
          .eq('user_id', loggedInUser.id);

        if (error) {
          console.error('Error fetching lookup data:', error.message);
        } else {
          const newLookup: LookupData = {};
          data?.forEach((row: any) => {
            newLookup[row.item_code.toLowerCase()] = { description: row.description, uom: row.uom };
          });
          setLookupData(newLookup);
        }
      }
    };
    fetchLookupData();

    const lookupSubscription = supabase
      .channel('lookup_data_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'lookup_data', filter: `user_id=eq.${loggedInUser?.id}` },
        (payload) => {
          console.log('Lookup data change received!', payload);
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setLookupData((prev) => ({
              ...prev,
              [payload.new.item_code.toLowerCase()]: { description: payload.new.description, uom: payload.new.uom },
            }));
          } else if (payload.eventType === 'DELETE') {
            setLookupData((prev) => {
              const newState = { ...prev };
              delete newState[payload.old.item_code.toLowerCase()];
              return newState;
            });
          }
        }
      )
      .subscribe();

    return () => {
      lookupSubscription.unsubscribe();
    };
  }, [loggedInUser]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (loggedInUser) {
        const { data, error } = await supabase
          .from('order_history')
          .select('*')
          .eq('user_id', loggedInUser.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching order history:', error.message);
        } else {
          setOrderHistory(data || []);
        }
      }
    };
    fetchOrderHistory();

    const orderHistorySubscription = supabase
      .channel('order_history_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'order_history', filter: `id=eq.${loggedInUser?.id}` },
        (payload) => {
          console.log('Order history change received!', payload);
          if (payload.eventType === 'INSERT') {
            setOrderHistory((prev) => [...prev, payload.new as OrderHistoryEntry]);
          } else if (payload.eventType === 'UPDATE') {
            setOrderHistory((prev) =>
              prev.map((entry) =>
                entry.poNumber === (payload.new as OrderHistoryEntry).poNumber ? (payload.new as OrderHistoryEntry) : entry
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setOrderHistory((prev) =>
              prev.filter((entry) => entry.poNumber !== (payload.old as OrderHistoryEntry).poNumber)
            );
          }
        }
      )
      .subscribe();

    return () => {
      orderHistorySubscription.unsubscribe();
    };
  }, [loggedInUser]);

  

  

  

  

  const handleLogin = async () => {
    setLoginError('');
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameInput,
      password: passwordInput,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      // Supabase auth listener will handle setting loggedInUser and showLoginDialog
      setUsernameInput('');
      setPasswordInput('');
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('User logged out successfully.');
      setItems([]); // Clear current items on logout
      setCurrentPrNumber(generateUniquePrNumber()); // Generate new PR for next session
    }
  };

  const handleExport = async () => {
    if (items.length === 0) {
      alert('No items to export.');
      return;
    }

    const hasEmptyFields = items.some(item =>
      !item.itemCode || !item.description || !item.supplier || item.unitPrice <= 0 || item.quantity <= 0
    );

    if (hasEmptyFields) {
      alert('Please fill in all required fields (Item Code, Description, Supplier, Unit Price, Quantity) and ensure Unit Price and Quantity are greater than 0.');
      return;
    }

    const data = items.map((item, index) => ({
      'User': loggedInUser?.email || 'N/A', // New User column
      'PR Number': currentPrNumber, // Added PR Number column
      '#': index + 1,
      'Item Code': item.itemCode,
      'Description': item.description,
      'UOM': item.uom,
      'Supplier': item.supplier,
      'Unit Price': item.unitPrice,
      'Quantity': item.quantity,
      'Amount': item.amount,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchase Order');
    XLSX.writeFile(wb, `MCI_PR_${currentPrNumber}_${currentDate.replace(/ /g, '_')}.xlsx`);

    const { error: itemsError } = await supabase
      .from('pr_items')
      .insert(items.map(item => ({ ...item, id: loggedInUser?.id, pr_number: currentPrNumber })));

    if (itemsError) {
      console.error('Error saving items to Supabase:', itemsError.message);
      alert('Failed to save items to database.');
      return;
    }

    // Save to order history
    const newOrder: OrderHistoryEntry = {
      poNumber: currentPrNumber,
      date: currentDate,
      time: currentTime,
      items: items, // Save a copy of the current items
      status: 'Pending',
      user: loggedInUser?.email || 'N/A',
    };

    const { error: orderHistoryError } = await supabase
      .from('order_history')
      .insert([{ ...newOrder, id: loggedInUser?.id }]);

    if (orderHistoryError) {
      console.error('Error saving order history to Supabase:', orderHistoryError.message);
      alert('Failed to save order history to database.');
      return;
    }

    setOrderHistory((prevHistory) => [...prevHistory, newOrder]);

    // Generate a new PR number for the next order
    setCurrentPrNumber(`PR${Math.floor(Math.random() * 1000000)}`);

    // Clear current items after successful export
    setItems([]);

    alert('Purchase Order exported successfully and saved to history!');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all items?')) {
      setItems([]);
      setCurrentPrNumber(generateUniquePrNumber()); // Generate new PR number on clear
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const newLookup: LookupData = {};
        const newLookupArray: { item_code: string; description: string; uom: string; }[] = [];

        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          const itemCode = row[1]?.toString().trim().toLowerCase(); // Column B
          const description = row[2]?.toString().trim(); // Column C
          const uom = row[5]?.toString().trim(); // Column F

          if (itemCode && description && uom) {
            newLookup[itemCode] = { description, uom };
            newLookupArray.push({ item_code: itemCode, description, uom });
          }
        }

        // Delete existing lookup data for the user
        const { error: deleteError } = await supabase
          .from('lookup_data')
          .delete()
          .eq('id', loggedInUser?.id);

        if (deleteError) {
          console.error('Error deleting old lookup data:', deleteError.message);
          alert('Failed to update lookup data.');
          return;
        }

        // Insert new lookup data
        const { error: insertError } = await supabase
          .from('lookup_data')
          .insert(newLookupArray.map(item => ({ ...item, user_id: loggedInUser?.id })));

        if (insertError) {
          console.error('Error inserting new lookup data:', insertError.message);
          alert('Failed to update lookup data.');
          return;
        }

        setLookupData(newLookup);
        alert('Lookup data uploaded successfully!');
      } catch (error) {
        console.error('Error reading Excel file:', error);
        alert('Failed to read Excel file. Please ensure it is a valid .xlsx file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const isAdmin = loggedInUser?.role === 'admin';

  console.log('Logged in user:', loggedInUser, 'Is Admin:', isAdmin); // Debug log

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', marginBottom: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between', paddingY: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="div" sx={{ color: '#212121', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              MCI Online PR Form
            </Typography>
            <Typography sx={{ color: '#616161', fontSize: '0.6rem', lineHeight: 1, marginTop: '-4px' }}>
              created by: johnM
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', color: '#616161' }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentDate}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentTime}</Typography>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', marginTop: '4px' }}>PR#: {currentPrNumber}</Typography>
            {loggedInUser && (
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#424242', marginTop: '4px' }}>Logged in as: {loggedInUser.email}</Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {!loggedInUser ? (
        <Dialog open={showLoginDialog} onClose={() => {}} disableEscapeKeyDown>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Login</DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="User ID"
              type="text"
              fullWidth
              variant="outlined"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
            {loginError && (
              <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                {loginError}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleLogin} variant="contained" startIcon={<LoginIcon />} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Container maxWidth="lg" sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', padding: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <Typography variant="h5" component="h2" sx={{ color: '#212121', fontWeight: 'bold' }}>
              Order Details
            </Typography>
            <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          <PoTable items={items} setItems={setItems} lookupData={lookupData} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 4, flexWrap: 'wrap' }}>
            <input
              type="file"
              id="upload-excel"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-excel">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
                disabled={!isAdmin} // Disabled if not admin
              >
                Upload Items
              </Button>
            </label>
            <Button variant="contained" startIcon={<HistoryIcon />} onClick={() => setShowOrderHistory(true)} sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
              Order History
            </Button>
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleClearAll} sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#c62828' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
              Clear All
            </Button>
            <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ backgroundColor: '#424242', '&:hover': { backgroundColor: '#212121' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
              Print Preview
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport} sx={{ backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
              Submit Order
            </Button>
          </Box>

          <Box sx={{ borderTop: '1px solid #e0e0e0', paddingTop: 3, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'f5f5f5', padding: 3, borderRadius: '8px', boxShadow: 'inset 0px 1px 5px rgba(0, 0, 0, 0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121' }}>Total Items: <span style={{ color: '#1976d2' }}>{items.length}</span></Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121' }}>Total Amount: <span style={{ color: '#1976d2' }}>₱{totalAmount.toFixed(2)}</span></Typography>
          </Box>
        </Container>
      )}

      {showOrderHistory && (
        <OrderHistoryModal
          orderHistory={orderHistory}
          onClose={() => setShowOrderHistory(false)}
          loggedInUser={loggedInUser}
          isAdmin={isAdmin}
        />
      )}
    </Box>
  );
};

export default App;