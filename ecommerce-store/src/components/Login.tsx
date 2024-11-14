
import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        login(email); // Call the login function from AuthContext
        if(user?.role === 'admin') {
            navigate('/admin/dashboard');
        }else{
            navigate('/products');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card variant="outlined" style={{ maxWidth: 400, margin: 'auto', padding: '20px', backgroundColor: '#C9E6F0', borderRadius: '15px' }}>
            <img 
                src={'https://i.ibb.co/Y00wSCh/computer-security-with-login-password-padlock.jpg'} 
                alt="Login" 
                style={{ width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '15px 15px 0 0' }} // Adjust image size and style
            />
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center' }}>
                    <LoginIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} /> {/* Use MUI Login icon */}
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Enter email to login." 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
    );
}