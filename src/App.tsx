import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, CircularProgress } from '@mui/material';
import { UploadFile as UploadIcon, History as HistoryIcon, Delete as DeleteIcon, Print as PrintIcon, Download as DownloadIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import PoTable from './components/PoTable';
import OrderHistoryModal from './components/OrderHistoryModal';

import * as XLSX from 'xlsx';

interface PoItem {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

interface LookupEntry {
  description: string;
  uom: string;
}

interface LookupData {
  [itemCode: string]: LookupEntry;
}

interface OrderHistoryEntry {
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string; // e.g., 'Pending', 'Submitted'
  user: string; // User who submitted the order
}

interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

const USERS_INITIAL: User[] = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'Finance director', password: 'password', role: 'user' },
  { username: 'Gen accounting', password: 'password', role: 'user' },
  { username: 'Treasury', password: 'password', role: 'user' },
  { username: 'Inventory & Cost accounting mngr', password: 'password', role: 'user' },
  { username: 'Revenue Assurance and Collection mngr', password: 'password', role: 'user' },
  { username: 'Purchasing', password: 'password', role: 'user' },
  { username: 'Warehouse & Logistics mngr', password: 'password', role: 'user' },
  { username: 'Biz dev', password: 'password', role: 'user' },
  { username: 'EA', password: 'password', role: 'user' },
  { username: 'IT - SAP', password: 'password', role: 'user' },
  { username: 'FP & A Manager', password: 'password', role: 'user' },
  { username: 'Service', password: 'password', role: 'user' },
];

const App = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : USERS_INITIAL;
  });
  const [items, setItems] = useState<PoItem[]>([]);
  const [poNumber, setPoNumber] = useState(''); // Now a state variable
  const [lookupData, setLookupData] = useState<LookupData>({});
  const [orderHistory, setOrderHistory] = useState<OrderHistoryEntry[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(localStorage.getItem('loggedInUser'));
  const [showLoginDialog, setShowLoginDialog] = useState(!localStorage.getItem('loggedInUser'));
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [approverEmail, setApproverEmail] = useState('');
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>(
    { open: false, message: '', severity: 'info' }
  );
  const [sendingApproval, setSendingApproval] = useState(false);

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

  // Function to generate a unique PO number
  const generateUniquePoNumber = (user: string | null) => {
    const userPrefix = user ? user.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : 'GUEST';
    return `PO-${userPrefix}-${Date.now()}`;
  };

  useEffect(() => {
    // Load items from local storage on initial render
    const savedItems = localStorage.getItem('poItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }

    // Load lookup data from local storage
    const savedLookupData = localStorage.getItem('poLookupData');
    if (savedLookupData) {
      setLookupData(JSON.parse(savedLookupData));
    }

    // Load and filter order history from local storage (last 14 days)
    const savedOrderHistory = localStorage.getItem('poOrderHistory');
    if (savedOrderHistory) {
      const parsedHistory: OrderHistoryEntry[] = JSON.parse(savedOrderHistory);
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      const filteredHistory = parsedHistory.filter(entry => {
        // Ensure date is parsed correctly, handling potential inconsistencies
        const [month, day, year] = entry.date.split('/').map(Number);
        const entryDate = new Date(year, month - 1, day); // Month is 0-indexed
        return entryDate >= fourteenDaysAgo;
      });
      setOrderHistory(filteredHistory);
    }

    
  }, []);

  useEffect(() => {
    // Generate a new PO number when the user logs in or if items are cleared
    if (loggedInUser && items.length === 0) {
      setPoNumber(generateUniquePoNumber(loggedInUser));
    }
  }, [loggedInUser, items]);

  useEffect(() => {
    // Save items to local storage whenever they change
    localStorage.setItem('poItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    // Save lookup data to local storage whenever it changes
    localStorage.setItem('poLookupData', JSON.stringify(lookupData));
  }, [lookupData]);

  useEffect(() => {
    // Save order history to local storage whenever it changes
    localStorage.setItem('poOrderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  useEffect(() => {
    // Persist logged-in user
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', loggedInUser);
      setShowLoginDialog(false);
    } else {
      localStorage.removeItem('loggedInUser');
      setShowLoginDialog(true);
    }
  }, [loggedInUser]);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
    );

    if (user) {
      setLoggedInUser(user.username);
      setShowLoginDialog(false);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
      // Generate PO number on successful login
      setPoNumber(generateUniquePoNumber(user.username));
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setShowLoginDialog(true);
    setItems([]); // Clear current items on logout
    setPoNumber(generateUniquePoNumber(null)); // Generate new PO for next session
  };

  const handleChangePassword = () => {
    if (!usernameInput || !oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeError('All fields are required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New password and confirm new password do not match.');
      return;
    }

    const userIndex = users.findIndex(
      (u) => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === oldPassword
    );

    if (userIndex === -1) {
      setPasswordChangeError('Invalid username or old password.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters long.');
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex].password = newPassword;
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated users to local storage
    setPasswordChangeError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowChangePasswordDialog(false);
    alert('Password changed successfully!');
  };

  const handleExport = () => {
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
      'User': loggedInUser || 'N/A', // New User column
      'PO Number': poNumber, // Added PO Number column
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
    XLSX.writeFile(wb, `MCI_PO_${poNumber}_${currentDate.replace(/ /g, '_')}.xlsx`);

    // Save to order history
    const newOrder: OrderHistoryEntry = {
      poNumber: poNumber,
      date: currentDate,
      time: currentTime,
      items: items, // Save a copy of the current items
      status: 'Submitted', // Changed status to Submitted
      user: loggedInUser || 'Unknown', // Store the user who submitted
    };
    setOrderHistory((prevHistory) => [...prevHistory, newOrder]);

    alert('Purchase Order exported successfully and saved to history!');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all items?')) {
      setItems([]);
      setPoNumber(generateUniquePoNumber(loggedInUser)); // Generate new PO number on clear
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/list-orders');
        if (!res.ok) throw new Error('Failed to fetch');
        const rows = await res.json();
        const mapped: OrderHistoryEntry[] = (rows || []).map((r: any) => {
          const created = r.created_at ? new Date(r.created_at) : new Date();
          const date = created.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const time = created.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          return {
            poNumber: r.po_number,
            date,
            time,
            items: Array.isArray(r.items) ? r.items : [],
            status: r.status || 'Submitted',
            user: r.user || 'Unknown',
          } as OrderHistoryEntry;
        });
        setOrderHistory(mapped);
      } catch (e) {
        // Non-fatal
      }
    };
    if (showOrderHistory) fetchOrders();
  }, [showOrderHistory]);

  const handleSendForApproval = async () => {
    if (!loggedInUser) {
      setSnack({ open: true, message: 'Please login first.', severity: 'error' });
      return;
    }
    if (!approverEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(approverEmail)) {
      setSnack({ open: true, message: 'Enter a valid approver email.', severity: 'error' });
      return;
    }
    if (items.length === 0) {
      setSnack({ open: true, message: 'Add at least one item.', severity: 'error' });
      return;
    }

    setSendingApproval(true);
    try {
      const res = await fetch('/api/send-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poNumber,
          user: loggedInUser,
          items,
          approverEmail,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSnack({ open: true, message: 'Approval email sent.', severity: 'success' });
      // Record to local history if not already
      const newOrder: OrderHistoryEntry = {
        poNumber: poNumber,
        date: currentDate,
        time: currentTime,
        items: items,
        status: 'Submitted',
        user: loggedInUser,
      };
      setOrderHistory((prev) => [...prev, newOrder]);
    } catch (e) {
      setSnack({ open: true, message: 'Failed to send approval email.', severity: 'error' });
    } finally {
      setSendingApproval(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const newLookup: LookupData = {};
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          const itemCode = row[1]?.toString().trim().toLowerCase(); // Column B
          const description = row[2]?.toString().trim(); // Column C
          const uom = row[5]?.toString().trim(); // Column F

          if (itemCode && description && uom) {
            newLookup[itemCode] = { description, uom };
          }
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

  const isAdmin = loggedInUser === 'admin';

  

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', marginBottom: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between', paddingY: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="div" sx={{ color: '#212121', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              MCI Online PO Form
            </Typography>
            <Typography sx={{ color: '#616161', fontSize: '0.6rem', lineHeight: 1, marginTop: '-4px' }}>
              created by: johnM
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', color: '#616161' }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentDate}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentTime}</Typography>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', marginTop: '4px' }}>PO Number: {poNumber}</Typography>
            {loggedInUser && (
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#424242', marginTop: '4px' }}>Logged in as: {loggedInUser}</Typography>
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
            <Button onClick={handleLogin} variant="contained" startIcon={<LoginIcon />}>
              Login
            </Button>
            <Button onClick={() => setShowChangePasswordDialog(true)} variant="outlined">
              Change Password
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

          

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Approver Email"
              size="small"
              type="email"
              value={approverEmail}
              onChange={(e) => setApproverEmail(e.target.value)}
              sx={{ minWidth: 280 }}
            />
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
            <Button
              variant="contained"
              onClick={handleSendForApproval}
              sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
              disabled={sendingApproval}
            >
              {sendingApproval ? <><CircularProgress size={18} sx={{ color: 'white', mr: 1 }} /> Sending…</> : 'Send for Approval'}
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

          <Box sx={{ borderTop: '1px solid #e0e0e0', paddingTop: 3, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 3, borderRadius: '8px', boxShadow: 'inset 0px 1px 5px rgba(0, 0, 0, 0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121' }}>Total Items: <span style={{ color: '#1976d2' }}>{items.length}</span></Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121' }}>Total Amount: <span style={{ color: '#1976d2' }}>₱{totalAmount.toFixed(2)}</span></Typography>
          </Box>
        </Container>
      )}

      <Dialog open={showChangePasswordDialog} onClose={() => setShowChangePasswordDialog(false)}>
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Change Password</DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            id="old-password"
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleChangePassword();
              }
            }}
          />
          {passwordChangeError && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {passwordChangeError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={() => setShowChangePasswordDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} variant="contained" color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {showOrderHistory && (
        <OrderHistoryModal
          orderHistory={orderHistory}
          onClose={() => setShowOrderHistory(false)}
          loggedInUser={loggedInUser}
          isAdmin={isAdmin}
        />
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
