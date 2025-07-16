import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Button, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PoDetailsModal from './PoDetailsModal';

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

interface OrderHistoryEntry {
  poNumber: string;
  date: string;
  time: string;
  items: PoItem[];
  status: string;
}

interface OrderHistoryModalProps {
  orderHistory: OrderHistoryEntry[];
  onClose: () => void;
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ orderHistory, onClose }) => {
  const [selectedPo, setSelectedPo] = useState<OrderHistoryEntry | null>(null);

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
            {orderHistory.map((entry, index) => (
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
                  PO: {entry.poNumber}
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