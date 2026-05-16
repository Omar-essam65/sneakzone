import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('sneakzone-cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('sneakzone-cart', JSON.stringify(cart));
  }, [cart]);

  // Each cart item is unique by id + size combo
  const addToCart = (product) => {
    const key = `${product.id}-${product.selectedSize}`;
    setCart(prev => {
      const existing = prev.find(i => i.cartKey === key);
      if (existing) {
        return prev.map(i => i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, cartKey: key, quantity: 1 }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(i => i.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, qty) => {
    if (qty < 1) return removeFromCart(cartKey);
    setCart(prev => prev.map(i => i.cartKey === cartKey ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
