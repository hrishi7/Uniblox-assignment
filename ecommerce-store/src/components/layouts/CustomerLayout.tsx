import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            E-Commerce Store
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("/products")}>
              Products
            </Button>

            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{ ml: 2 }}
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
            
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 E-Commerce Store. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default CustomerLayout;
