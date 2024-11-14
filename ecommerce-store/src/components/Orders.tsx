import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import {Order} from '../types'
import {  orderApi } from '../services/api';
import { useAuth } from '../context/AuthContext';


const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(
      []
    );
    const [loading, setLoading] = useState(false);

    const  {user} = useAuth();


    useEffect(() => {
      fetchOrders();
    });

    // Fetch orders from the API
    const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await orderApi.getOrders(user!.id); // Call cartApi.getCart
          console.log(response)
          if(response.status === 200){
            setOrders(response.data);
          }
        } catch {
          // toast.error('Failed to fetch cart items. Please try again.'); // Handle error
    
          
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
    <Paper elevation={0} style={{ padding: '16px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Order List
    </Typography>
    {orders.length === 0 ? ( // Check if there are no orders
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <img src="https://i.ibb.co/r5thB8C/rb-2566.png" alt="No Orders Illustration" style={{ width: '200px', height: 'auto', marginBottom: '16px' }} />
        <Typography variant="h6">
          No orders found. Please check back later!
        </Typography>
      </div>
    ) : (
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} sx={{borderBottom: '1px solid #003161', padding: '16px'}}>
            <ListItemText
              primary={`Order ID: ${order.id} ${order.discountAmount ? `- Discount Amount: Rs.${order.discountAmount.toFixed(2)}`: ``}`}
              secondary={`Customer Id: ${order.userId} | Items: ${order.items.length} | Total: Rs.${order.total?.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    )}
  </Paper>
  );
};

export default Orders;