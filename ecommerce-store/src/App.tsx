import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import CustomerLayout from './components/layouts/CustomerLayout';
import AdminLayout from './components/layouts/AdminLayout';
import UserProtectedRoute from './components/common/UserProtectedRoute'; // Import UserProtectedRoute
import AdminProtectedRoute from './components/common/AdminProtectedRoute'; // Import AdminProtectedRoute

import { AuthProvider } from './context/AuthContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import { Login } from './components/Login';
import Orders from './components/Orders';

function App() {
  return (
    <AuthProvider>
     
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="login" element={<Login />} />

          {/* Customer Routes */}
          <Route path="/" element={<UserProtectedRoute><CustomerLayout /></UserProtectedRoute>}>
            <Route index element={<Navigate to="/products" />} />
            <Route path="products" element={<ProductList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </AuthProvider>
  );
}

export default App;