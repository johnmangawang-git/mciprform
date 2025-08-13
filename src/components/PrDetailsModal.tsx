import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface PrItem {
  id: number;
  itemCode: string;
  description: string;
  uom: string;
  supplier: string;
  unitPrice: number;
  quantity: number;
  amount: number;
  soh: number;
}

interface OrderHistoryEntry {
  prNumber: string; // Changed from poNumber
  date: string;
  time: string;
  items: PrItem[]; // Changed from PoItem
  status: string;
}

interface PrDetailsModalProps { // Changed from PoDetailsModalProps
  prDetails: OrderHistoryEntry; // Changed from poDetails
  onClose: () => void;
}

const PrDetailsModal: React.FC<PrDetailsModalProps> = ({ prDetails, onClose }) => { // Changed component name and prop name
  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ m: 0, p: 3, backgroundColor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>PR Details: {prDetails.prNumber}</Typography> // Changed to PR Details and prDetails.prNumber
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
        <Typography variant="body1" sx={{ color: '#424242', marginBottom: 1 }}>
          Date: <span style={{ fontWeight: 'bold' }}>{prDetails.date} {prDetails.time}</span>
        </Typography>
        <Typography variant="body1" sx={{ color: '#424242', marginBottom: 3 }}>
          Status: <span style={{ fontWeight: 'bold', color: '#388e3c' }}>{prDetails.status}</span>
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121', marginBottom: 2 }}>Items Ordered:</Typography>
        {prDetails.items.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#616161' }}>No items in this order.</Typography>
        ) : (
          <Table component={Paper} sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '8px', overflowX: 'auto' }}>
            <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Item Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>UOM</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Unit Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>SOH</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prDetails.items.map((item, index) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#e3f2fd' } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>₱{item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₱{item.amount.toFixed(2)}</TableCell>
                  <TableCell>{item.soh}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PrDetailsModal;