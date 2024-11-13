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
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    try {
        // Generate a unique user ID
        const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
        if(email === 'admin@admin.com') {
            const userData = { id: userId, email, role: 'admin' } as User; // Fake user data
            console.log('User data:', userData);
            setUser(userData);
            return;
        }
        const userData = { id: userId, email, role: 'customer' } as User; // Fake user data
        console.log('User data:', userData);
        setUser(userData);
    } catch (error) {
        throw new Error('Login failed');
    }
};

  const logout = () => {
    setUser(null);
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