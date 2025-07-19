import React, { useState } from 'react';
import { Dialog, DialogTitle, IconButton, Typography, Button, Box, DialogContent, DialogActions } from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import PrDetailsModal from './PrDetailsModal'; // Renamed from PoDetailsModal
import * as XLSX from 'xlsx';

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

interface OrderHistoryEntry {
  prNumber: string; // Changed from poNumber
  date: string;
  time: string;
  items: PrItem[]; // Changed from PoItem
  status: string;
  user: string;
}

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface OrderHistoryModalProps {
  orderHistory: OrderHistoryEntry[];
  onClose: () => void;
  loggedInUser: User | null; // Changed type to User | null
  isAdmin: boolean;
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ orderHistory, onClose, loggedInUser, isAdmin }) => {
  const [selectedPr, setSelectedPr] = useState<OrderHistoryEntry | null>(null); // Changed from selectedPo

  const filteredOrderHistory = isAdmin
    ? orderHistory
    : orderHistory.filter(entry => entry.user === loggedInUser?.username); // Access username property

  const handleExportAll = () => {
    const data = filteredOrderHistory.flatMap(order =>
      order.items.map(item => ({
        'User': order.user,
        'PR Number': order.prNumber, // Changed from PO Number
        'Date': order.date,
        'Time': order.time,
        'Item Code': item.itemCode,
        'Description': item.description,
        'UOM': item.uom,
        'Supplier': item.supplier,
        'Unit Price': item.unitPrice,
        'Quantity': item.quantity,
        'Amount': item.amount,
      }))
    );

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Purchase Requests'); // Changed sheet name
    XLSX.writeFile(wb, `MCI_PR_ALL_REQUESTS_${new Date().toLocaleDateString('en-CA')}.xlsx`); // Changed filename
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 3, backgroundColor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Order History</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
        {orderHistory.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', paddingY: 5, color: '#616161' }}>
            No order history available. Submit an order to see it here!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {filteredOrderHistory.map((entry, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 3,
                  borderRadius: '8px',
                  borderColor: '#e0e0e0',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: '#1976d2', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' },
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' }, // Responsive width
                }}
                onClick={() => setSelectedPr(entry)} // Changed from setSelectedPo
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121', marginBottom: 1 }}>
                  PR: {entry.prNumber}
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Date: {entry.date}
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Time: {entry.time}
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                  Items: {entry.items.length}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#388e3c', marginTop: 1 }}>
                  Status: {entry.status}
                </Typography>
                {isAdmin && (
                  <Typography variant="body2" sx={{ color: '#616161', marginTop: 1 }}>
                    User: {entry.user}
                  </Typography>
                )}
              </Button>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExportAll}
            sx={{ backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
          >
            Export All Orders
          </Button>
        )}
      </DialogActions>

      {selectedPr && (
        <PrDetailsModal // Changed from PoDetailsModal
          prDetails={selectedPr} // Changed from poDetails
          onClose={() => setSelectedPr(null)}
        />
      )}
    </Dialog>
  );
};

export default OrderHistoryModal;