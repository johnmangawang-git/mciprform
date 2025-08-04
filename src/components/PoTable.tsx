import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, IconButton, Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { PoItem, LookupData } from '../types';

interface PoTableProps {
  items: PoItem[];
  setItems: React.Dispatch<React.SetStateAction<PoItem[]>>;
  lookupData: LookupData;
}

const SUPPLIER_OPTIONS = ['Majestic partnership', 'MIDAS', 'TREPOU', 'Arnaiz Electronics'];

const PoTable: React.FC<PoTableProps> = ({ items, setItems, lookupData }) => {
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (items.length > 0) {
      const maxId = Math.max(...items.map((item: PoItem) => item.id), 0);
      setNextId(maxId + 1);
    } else {
      setNextId(1);
    }
  }, [items]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: nextId,
        itemCode: '',
        description: '',
        uom: '', // Default to empty string for UOM
        supplier: SUPPLIER_OPTIONS[0], // Set default supplier
        unitPrice: 0,
        quantity: 1,
        amount: 0,
        soh: 0,
      },
    ]);
    setNextId((prevId) => prevId + 1);
  };

  const handleRemoveItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (id: number, field: keyof PoItem, value: any) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          if (field === 'itemCode') {
            const lookupEntry = lookupData[value.toLowerCase()];
            if (lookupEntry) {
              updatedItem.description = lookupEntry.description;
              updatedItem.uom = lookupEntry.uom;
            }
          }

          if (field === 'unitPrice' || field === 'quantity') {
            updatedItem.amount = updatedItem.unitPrice * updatedItem.quantity;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: '8px', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="purchase order table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Item Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>UOM</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Supplier</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Unit Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>SOH</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#424242' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#e3f2fd' } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={item.itemCode}
                    onChange={(e) => handleInputChange(item.id, 'itemCode', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={item.description}
                    onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  {/* UOM is now a TextField to accept any value from Excel */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={item.uom}
                    onChange={(e) => handleInputChange(item.id, 'uom', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={item.supplier}
                    onChange={(e) => handleInputChange(item.id, 'supplier', e.target.value)}
                  >
                    {SUPPLIER_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleInputChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="number"
                    value={item.soh}
                    onChange={(e) => handleInputChange(item.id, 'soh', parseInt(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    ₱{item.amount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 3 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddItem} sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' }, padding: '12px 24px', borderRadius: '8px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default PoTable;