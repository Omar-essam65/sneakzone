import React, { createContext, useContext, useState } from 'react';

// Users are stored in localStorage under 'sneakzone-users' as an array
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sneakzone-user');
    return stored ? JSON.parse(stored) : null;
  });

  // Register a new account — saves to localStorage user store
  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('sneakzone-users') || '[]');
    const exists = users.find(u => u.username === username || u.email === email);
    if (exists) return { success: false, message: 'Username or email already exists.' };

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('sneakzone-users', JSON.stringify(users));
    return { success: true };
  };

  // Login — checks localStorage user store
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('sneakzone-users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) return { success: false, message: 'Invalid username or password.' };

    const userData = { username: found.username, email: found.email };
    setUser(userData);
    localStorage.setItem('sneakzone-user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sneakzone-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
