import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { adminApi } from '../services/api';

interface Stats {
  totalOrders: number;
  totalAmount: number;
  discountCodes: string[];
  totalDiscountAmount: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    try {
      const response = await adminApi.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleGenerateDiscount = async () => {
    try {
      await adminApi.generateDiscountCode(10);
      fetchStats();
    } catch (error) {
      console.error('Failed to generate discount code:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Orders Summary</Typography>
            <Typography>Total Orders: {stats.totalOrders}</Typography>
            <Typography>Total Amount: ${stats.totalAmount}</Typography>
            <Typography>
              Total Discount Amount: ${stats.totalDiscountAmount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Discount Codes</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateDiscount}
              sx={{ mb: 2 }}
            >
              Generate New Discount Code
            </Button>
            <List>
              {stats.discountCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText primary={code} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;