import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 18px rgba(44,26,10,0.08);
  transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s;
  cursor: pointer;
  border: 1px solid rgba(59,35,20,0.07);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(44,26,10,0.18);
  }
`;

/* Fixed-height image area — contain keeps full shoe visible */
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(160deg, #f5efe4 0%, #ede4d3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;          /* ← full shoe, no crop */
    padding: 18px;
    transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
  }

  &:hover img {
    transform: scale(1.1) rotate(-2deg);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: rgba(44,26,10,0.85);
  color: var(--gold);
  padding: 4px 12px;
  border-radius: 30px;
  backdrop-filter: blur(4px);
`;

const WishlistBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  color: ${p => p.$liked ? '#e53e3e' : '#bbb'};
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.15);
    color: #e53e3e;
  }
`;

const CardBody = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

const ProductName = styled.h3`
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.35;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 4px 0 6px;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: var(--brown-dark);
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 1px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #999;
  line-height: 1.65;
  flex: 1;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ── CTA Button — gold, prominent, luxurious ── */
const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 13px 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--gold) 0%, #d4a96a 100%);
  color: var(--brown-dark);
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(.22,.68,0,1.2);
  box-shadow: 0 4px 14px rgba(184,147,90,0.35);

  &:hover {
    background: linear-gradient(135deg, #d4a96a 0%, var(--brown-dark) 100%);
    color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184,147,90,0.45);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    flex-shrink: 0;
  }
`;

const AddedFlash = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(56, 161, 105, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  border-radius: 20px;
  pointer-events: none;
  animation: flashIn 0.55s ease forwards;

  @keyframes flashIn {
    0%   { opacity: 0; }
    30%  { opacity: 1; }
    100% { opacity: 0; }
  }
`;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <ImageWrapper>
        <img src={product.image} alt={product.name} />
        <CategoryBadge>{product.category}</CategoryBadge>
        <WishlistBtn
          $liked={liked}
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
        >
          {liked ? '♥' : '♡'}
        </WishlistBtn>
      </ImageWrapper>

      <CardBody>
        <ProductName>{product.name}</ProductName>
        <PriceRow>
          <Price>${product.price}</Price>
        </PriceRow>
        <Description>{product.description}</Description>

        <AddBtn onClick={handleAddToCart}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </AddBtn>
      </CardBody>

      {flash && <AddedFlash>✓</AddedFlash>}
    </Card>
  );
}

export default ProductCard;
