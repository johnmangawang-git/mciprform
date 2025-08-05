import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Button, Box } from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import PoDetailsModal from './PoDetailsModal';
import * as XLSX from 'xlsx';
import type { OrderHistoryEntry } from '../types';

import type { LoggedInUser } from '../types';

interface OrderHistoryModalProps {
  orderHistory: OrderHistoryEntry[];
  onClose: () => void;
  loggedInUser: LoggedInUser | null;
  isAdmin: boolean;
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ orderHistory, onClose, loggedInUser, isAdmin }) => {
  const [selectedPo, setSelectedPo] = useState<OrderHistoryEntry | null>(null);
  const filteredHistory = orderHistory;
  const handleSaveAllOrders = () => {
    if (orderHistory.length === 0) {
      alert('No order history to save.');
      return;
    }

    const allOrdersData: any[] = [];

    orderHistory.forEach(order => {
      order.items.forEach((item, itemIndex) => {
        allOrdersData.push({
          'PR Number': order.poNumber,
          'Date': order.date,
          'Time': order.time,
          'User': order.user,
          'Status': order.status,
          '#': itemIndex + 1,
          'Item Code': item.itemCode,
          'Description': item.description,
          'UOM': item.uom,
          'Supplier': item.supplier,
          'Unit Price': item.unitPrice,
          'Quantity': item.quantity,
          'Amount': item.amount,
          'SOH': item.soh,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(allOrdersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Orders');
    XLSX.writeFile(wb, `MCI_All_Orders_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`);

    alert('All orders saved successfully!');
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
        {isAdmin && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleSaveAllOrders}
              sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' }, padding: '8px 16px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
            >
              Save all Orders
            </Button>
          </Box>
        )}
        {filteredHistory.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', paddingY: 5, color: '#616161' }}>
            No order history available. Submit an order to see it here!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {filteredHistory.map((entry, index) => (
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
                onClick={() => setSelectedPo(entry)}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121', marginBottom: 1 }}>
                  PR#: {entry.poNumber}
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Submitted by: {entry.user}
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

      {selectedPo && (
        <PoDetailsModal
          poDetails={selectedPo}
          onClose={() => setSelectedPo(null)}
        />
      )}
    </Dialog>
  );
};

export default OrderHistoryModal;