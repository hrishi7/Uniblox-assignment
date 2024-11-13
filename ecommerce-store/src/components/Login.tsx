
import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        login(email); // Call the login function from AuthContext
        navigate('/products');
    };

    return (
        <Card variant="outlined" style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Email" 
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
    );
}