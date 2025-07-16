import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

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
  status: string; // e.g., 'Pending', 'Submitted'
  user: string; // User who submitted the order
}

interface AdminDashboardProps {
  orderHistory: OrderHistoryEntry[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orderHistory }) => {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const recentOrders = orderHistory.filter(entry => {
    const [month, day, year] = entry.date.split('/').map(Number);
    const entryDate = new Date(year, month - 1, day); // Month is 0-indexed
    return entryDate >= fourteenDaysAgo;
  });

  // Group orders by user
  const ordersByUser: { [key: string]: OrderHistoryEntry[] } = recentOrders.reduce((acc, order) => {
    if (!acc[order.user]) {
      acc[order.user] = [];
    }
    acc[order.user].push(order);
    return acc;
  }, {} as { [key: string]: OrderHistoryEntry[] });

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#212121', marginBottom: 3 }}>
        Admin Dashboard: Recent Orders (Last 14 Days)
      </Typography>

      {Object.keys(ordersByUser).length === 0 ? (
        <Typography variant="body1" sx={{ color: '#616161' }}>No recent orders from users.</Typography>
      ) : (
        <List>
          {Object.entries(ordersByUser).map(([user, orders]) => (
            <Box key={user} sx={{ marginBottom: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 1 }}>
                User: {user}
              </Typography>
              <List component="div" disablePadding>
                {orders.map((order) => (
                  <ListItem key={order.poNumber} sx={{ paddingLeft: 4 }}>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          Order submitted: PO {order.poNumber} on {order.date} at {order.time}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Items: {order.items.length} | Total Amount: ₱{order.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginTop: 2 }} />
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AdminDashboard;
