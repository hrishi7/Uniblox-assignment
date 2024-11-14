import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string) => {
    try {
        // Generate a unique user ID
        const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        let userData: User;
        if(email === 'admin@gmail.com') {
            userData = { id: userId, email, role: 'admin' }; // Fake user data
        } else {
            userData = { id: userId, email, role: 'customer' }; // Fake user data
        }
        console.log('User data:', userData);
        setUser(userData);
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    // Remove user data from local storage
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};