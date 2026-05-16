import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background: linear-gradient(90deg, #1a0a00, var(--brown-dark));
  padding: 36px 40px 24px;
  border-top: 1px solid rgba(201,169,122,0.15);
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(201,169,122,0.15);
`;

const FooterBrand = styled.h2`
  color: white;
  font-size: 28px;
  letter-spacing: 5px;
  span { color: var(--gold); }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;

  a {
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.2s;
    &:hover { color: var(--gold); }
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: rgba(201,169,122,0.45);
  text-align: center;
  letter-spacing: 1px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterTop>
        <FooterBrand>Sneak<span>Zone</span></FooterBrand>
        <FooterLinks>
          <Link to="/">Home</Link>
          <Link to="/sneakers">Shop</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </FooterLinks>
      </FooterTop>
      <Copyright>&copy; 2025 SneakZone. All rights reserved. | Authentic sneakers only.</Copyright>
    </FooterWrapper>
  );
}

export default Footer;
