import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const HeaderWrapper = styled.header`
  background: linear-gradient(90deg, #1a0a00 0%, var(--brown-dark) 100%);
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 24px rgba(0,0,0,0.5);
  border-bottom: 1px solid rgba(201,169,122,0.15);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  h1 {
    color: white;
    font-size: 30px;
    margin: 0;
    letter-spacing: 5px;
    font-family: 'Bebas Neue', sans-serif;

    span { color: var(--gold); }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  a {
    color: rgba(255,255,255,0.75);
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: color 0.2s;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--gold);
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    &:hover {
      color: var(--gold);
      &::after { transform: scaleX(1); }
    }
  }
`;

const CartBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,169,122,0.15);
  border: 1px solid rgba(201,169,122,0.35);
  color: var(--gold) !important;
  padding: 7px 16px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1px;
  transition: all 0.2s;

  &::after { display: none !important; }

  &:hover {
    background: var(--gold) !important;
    color: var(--brown-dark) !important;
  }
`;

const CartCount = styled.span`
  background: var(--gold);
  color: var(--brown-dark);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const UserGreeting = styled.span`
  color: var(--gold);
  font-size: 13px;
  font-weight: 500;
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(201,169,122,0.4);
  color: rgba(255,255,255,0.7);
  padding: 5px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    background: rgba(201,169,122,0.15);
    color: var(--gold);
    border-color: var(--gold);
  }
`;

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Logo onClick={() => navigate('/')}>
        <h1>Sneak<span>Zone</span></h1>
      </Logo>

      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/sneakers">Shop</Link>
        <Link to="/trending">🔥 Trending</Link>

        {user ? (
          <>
            <UserGreeting>Hi, {user.username}</UserGreeting>
            <LogoutBtn onClick={logout}>Logout</LogoutBtn>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <CartBtn to="/cart">
          🛒 Cart <CartCount>{cartCount}</CartCount>
        </CartBtn>
      </NavLinks>
    </HeaderWrapper>
  );
}

export default Navbar;
