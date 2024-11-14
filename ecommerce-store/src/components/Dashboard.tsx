import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
} from "@mui/material";
import { adminApi } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Stats {
  totalOrders: number;
  totalAmount: number;
  discountCodes: { isValid: boolean; code: string; percentage: number }[];
  totalDiscountAmount: number;
  averageOrderValue: number;
  totalDiscountCodesIssued: number;
  activeDiscountCodes: number;
  orderCountAfterDiscountApplied: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState("");

  const fetchStats = async () => {
    try {
      const response = await adminApi.getStats();
      console.log(response);
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleGenerateDiscount = async () => {
    try {
      await adminApi.generateDiscountCode(Number(discountPercentage));
      toast.success("Discount code generated successfully.");
      await fetchStats();
    } catch (error) {
      toast.error("Failed to generate discount code.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  function getCountFormatted(n: number){
    if(n === 1) return ``;
    if(n === 2) return `2nd`;
    if(n === 3) return `3rd`;
    return `${n}th`
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics for Sales
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Orders Summary</Typography>
            <Typography>Total Orders: {stats.totalOrders}</Typography>
            <Typography>Total Amount: Rs.{stats.totalAmount}</Typography>
            <Typography>
              Total Discount Amount: Rs.{stats.totalDiscountAmount.toFixed(2)}
            </Typography>
            <Typography>
              Average Order Value: Rs.{stats.averageOrderValue}
            </Typography>
            <Typography>
              Total Discount Codes Issued: {stats.totalDiscountCodesIssued}
            </Typography>
            <Typography>
              Active Discount Codes: {stats.activeDiscountCodes}
            </Typography>
            <Typography>Every {getCountFormatted(stats.orderCountAfterDiscountApplied)} Order eligible for Discount</Typography>(Not Configurable from frontend as of now!)
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Discount Codes</Typography>
            <Grid container spacing={2}  alignItems="flex-end">
              <Grid item xs={6}>
                <TextField
                  label="Discount (%)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateDiscount}
                  sx={{ mb: 2 }}
                >
                  Generate Code
                </Button>
              </Grid>
            </Grid>
            {!stats.discountCodes.length ? (
              <Typography>No discount codes available.</Typography>
            ) : (
              <List>
                {stats.discountCodes.map((code) => (
                  <ListItem key={code.code} sx={{borderBottom: '1px solid #003161'}}>
                    <ListItemText
                      primary={`${code.code} - ${code.percentage}% OFF`}
                      secondary={`${code.isValid ? "Valid" : "InValid"}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Dashboard;
