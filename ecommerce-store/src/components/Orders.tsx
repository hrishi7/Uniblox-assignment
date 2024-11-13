import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import {Order} from '../types'


const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      fetchOrders();
    }, []);

    // Fetch orders from the API
    const fetchOrders = async () => {
        setLoading(true);
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      }
        catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
        return (
          <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Container>
        );
      }
    
    //
  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Order List
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Order ID: ${order.id}`}
              secondary={`Customer Id: ${order.userId} | Items: ${order.items.length} | Total: $${order.finalAmount.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Orders;