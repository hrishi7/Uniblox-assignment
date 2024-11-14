import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CustomerLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#C9E6F0", color: '#003161' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Uniblox
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("/products")}>
              Products
            </Button>
            <Button color="inherit" onClick={() => navigate("/orders")}>
              Orders
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
          <Typography variant="body2" sx={{color: '#003161'}} align="center">
            © 2024 Uniblox. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default CustomerLayout;
