import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { UploadFile as UploadIcon, History as HistoryIcon, Delete as DeleteIcon, Print as PrintIcon, Download as DownloadIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import PoTable from './components/PoTable';
import OrderHistoryModal from './components/OrderHistoryModal';
import * as XLSX from 'xlsx';

// --- API Service ---
// A simple service to handle all API requests
const apiService = {
  // Base URL for the backend
  API_URL: 'http://localhost:5000/api',

  // Custom fetch function to handle credentials and headers
  async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.API_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Send cookies with every request
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // --- Auth ---
  checkSession() {
    return this.fetch('/session');
  },
  login(username: string, password: string) {
    return this.fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  logout() {
    return this.fetch('/logout', { method: 'POST' });
  },
  changePassword(oldPassword: string, newPassword: string, confirmNewPassword: string) {
    return this.fetch('/change_password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
    });
  },

  // --- Data ---
  getRequests() {
    return this.fetch('/requests');
  },
  submitRequest(prData: any) { // Using 'any' for simplicity, can be more specific if needed
    return this.fetch('/requests', {
      method: 'POST',
      body: JSON.stringify(prData),
    });
  },
  getLookupData() {
    return this.fetch('/lookup');
  },
  uploadLookupData(lookupData: any) { // Using 'any' for simplicity, can be more specific if needed
    return this.fetch('/lookup', {
      method: 'POST',
      body: JSON.stringify(lookupData),
    });
  },
};


// --- Type Interfaces ---

interface PrItem {
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
  prNumber: string;
  date: string;
  time: string;
  items: PrItem[];
  status: string;
  user: string;
}

interface User {
  username: string;
  role: 'admin' | 'user';
}


// --- Main App Component ---

const App = () => {
  // State
  const [items, setItems] = useState<PrItem[]>([]);
  const [prNumber, setPrNumber] = useState('');
  const [lookupData, setLookupData] = useState<LookupData>({});
  const [orderHistory, setOrderHistory] = useState<OrderHistoryEntry[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  const currentDate = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD for easier sorting
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // --- Helper Functions ---
  const generateUniquePrNumber = (user: User | null) => {
    const userPrefix = user ? user.username.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : 'GUEST';
    return `PR-${userPrefix}-${Date.now()}`;
  };

  const fetchAndSetOrderHistory = async () => {
    try {
      const history = await apiService.getRequests();
      setOrderHistory(history);
    } catch (error: any) {
      console.error("Failed to fetch order history:", error);
      // Optionally, show an error to the user
    }
  };

  // --- Effects ---

  // Check user session on initial load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const data = await apiService.checkSession();
        if (data.isLoggedIn) {
          setLoggedInUser(data.user);
          setShowLoginDialog(false);
        } else {
          setShowLoginDialog(true);
        }
      } catch (error: any) {
        console.error("Session check failed:", error);
        setShowLoginDialog(true); // Show login on error
      }
    };
    checkUserSession();
  }, []);

  // Generate PR number and fetch data when user logs in
  useEffect(() => {
    if (loggedInUser) {
      setPrNumber(generateUniquePrNumber(loggedInUser));
      fetchAndSetOrderHistory(); // Fetch history on login
      
      // Fetch lookup data on login
      const fetchLookup = async () => {
        try {
          const data = await apiService.getLookupData();
          console.log("App.tsx: Fetched lookup data", data);
          setLookupData(data);
        } catch (error: any) {
      console.error("Failed to fetch lookup data:", error);
    }
      };
      fetchLookup();
    }
  }, [loggedInUser]);


  // --- Event Handlers ---

  const handleLogin = async () => {
    try {
      const data = await apiService.login(usernameInput, passwordInput);
      setLoggedInUser(data.user);
      setShowLoginDialog(false);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } catch (error: any) {
      setLoginError(error.message || 'Invalid username or password.');
    }
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setLoggedInUser(null);
      setShowLoginDialog(true);
      setItems([]);
      setPrNumber('');
    } catch (error: any) {
      console.error("Logout failed:", error);
      // Handle logout error if necessary
    }
  };

  const handleChangePassword = async () => {
    try {
      await apiService.changePassword(oldPassword, newPassword, confirmNewPassword);
      alert('Password changed successfully!');
      setShowChangePasswordDialog(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordChangeError('');
    } catch (error: any) {
      setPasswordChangeError(error.message || 'Failed to change password.');
    }
  };

  const handleSubmitOrder = async () => {
    if (items.length === 0) {
      alert('No items to submit.');
      return;
    }
    // Basic validation
    if (items.some(item => !item.itemCode || item.quantity <= 0)) {
        alert('Please ensure all items have an item code and quantity.');
        return;
    }

    const prData = {
      prNumber: prNumber,
      date: currentDate,
      time: currentTime,
      items: items,
      status: 'Submitted',
      user: loggedInUser?.username,
    };

    try {
      await apiService.submitRequest(prData);
      alert('Purchase Request submitted successfully!');
      setItems([]); // Clear items after submission
      setPrNumber(generateUniquePrNumber(loggedInUser)); // Generate new PR number
      fetchAndSetOrderHistory(); // Refresh history
    } catch (error: any) {
      alert(`Failed to submit order: ${error.message}`);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all items?')) {
      setItems([]);
      setPrNumber(generateUniquePrNumber(loggedInUser));
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
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          const itemCode = row[1]?.toString().trim().toLowerCase();
          const description = row[2]?.toString().trim();
          const uom = row[5]?.toString().trim();
          if (itemCode && description && uom) {
            newLookup[itemCode] = { description, uom };
          }
        }
        console.log("App.tsx: newLookup before upload", newLookup);
        await apiService.uploadLookupData(newLookup);
        setLookupData(newLookup); // Update state on success
        alert('Lookup data uploaded successfully!');
      } catch (error: any) {
        console.error('Error processing or uploading Excel file:', error);
        alert(`Failed to upload lookup data: ${error.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const isAdmin = loggedInUser?.role === 'admin';

  // --- Render ---

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', minHeight: '100vh', padding: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', marginBottom: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between', paddingY: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="div" sx={{ color: '#212121', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              MCI Online PR Form - order office supplies here!
            </Typography>
             <Typography sx={{ color: '#616161', fontSize: '0.6rem', lineHeight: 1, marginTop: '-4px' }}>
              created by: johnM
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', color: '#616161' }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentDate}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentTime}</Typography>
            {loggedInUser && (
              <>
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', marginTop: '4px' }}>PR#: {prNumber}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#424242', marginTop: '4px' }}>Logged in as: {loggedInUser.username}</Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {!loggedInUser ? (
        <Dialog open={showLoginDialog} onClose={() => {}} disableEscapeKeyDown>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Login</DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <TextField autoFocus margin="dense" id="username" label="User ID" type="text" fullWidth variant="outlined" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} sx={{ marginBottom: 2 }} />
            <TextField margin="dense" id="password" label="Password" type="password" fullWidth variant="outlined" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
            {loginError && <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>{loginError}</Typography>}
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleLogin} variant="contained" startIcon={<LoginIcon />}>Login</Button>
            <Button onClick={() => setShowChangePasswordDialog(true)} variant="outlined">Change Password</Button>
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
            <input type="file" id="upload-excel" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ display: 'none' }} />
            <label htmlFor="upload-excel">
              <Button variant="contained" component="span" startIcon={<UploadIcon />} sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }} disabled={!isAdmin}>
                Upload Items
              </Button>
            </label>
            <Button variant="contained" startIcon={<HistoryIcon />} onClick={() => { fetchAndSetOrderHistory(); setShowOrderHistory(true); }} sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}>
              Order History
            </Button>
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleClearAll} sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#c62828' } }}>
              Clear All
            </Button>
            <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ backgroundColor: '#424242', '&:hover': { backgroundColor: '#212121' } }}>
              Print Preview
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleSubmitOrder} sx={{ backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}>
              Submit Order
            </Button>
          </Box>

          <Box sx={{ borderTop: '1px solid #e0e0e0', paddingTop: 3, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 3, borderRadius: '8px', boxShadow: 'inset 0px 1px 5px rgba(0, 0, 0, 0.05)' }}>
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

        <Dialog open={showChangePasswordDialog} onClose={() => setShowChangePasswordDialog(false)}>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Change Password</DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <TextField autoFocus margin="dense" id="old-password" label="Old Password" type="password" fullWidth variant="outlined" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} sx={{ marginBottom: 2 }} />
            <TextField margin="dense" id="new-password" label="New Password" type="password" fullWidth variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ marginBottom: 2 }} />
            <TextField margin="dense" id="confirm-new-password" label="Confirm New Password" type="password" fullWidth variant="outlined" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChangePassword()} />
            {passwordChangeError && <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>{passwordChangeError}</Typography>}
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={() => setShowChangePasswordDialog(false)} color="primary">Cancel</Button>
            <Button onClick={handleChangePassword} variant="contained" color="primary">Change Password</Button>
          </DialogActions>
        </Dialog>
    </Box>
  );
}

export default App;