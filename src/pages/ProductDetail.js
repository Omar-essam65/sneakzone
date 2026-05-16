import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 24px;
  display: flex;
  gap: 56px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const ImgBox = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ProductImg = styled.img`
  width: 420px;
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 16px 60px rgba(0,0,0,0.18);
  object-fit: cover;
  display: block;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--brown-dark);
  color: var(--gold);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Details = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Brand = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
`;

const Name = styled.h2`
  font-size: 42px;
  margin: 0 0 8px;
  color: var(--brown-dark);
  line-height: 1.05;
`;

const Price = styled.p`
  font-size: 32px;
  font-weight: 800;
  color: var(--brown-mid);
  margin-bottom: 20px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const MetaItem = styled.div`
  background: var(--card-bg);
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 12px;

  span:first-child {
    display: block;
    color: #999;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  span:last-child {
    color: var(--brown-dark);
    font-weight: 700;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(0,0,0,0.08);
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 14.5px;
  line-height: 1.9;
  color: #555;
  margin-bottom: 28px;
`;

const SizeLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--brown-dark);
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: var(--brown-light);
    font-size: 12px;
    letter-spacing: 0;
  }
`;

const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
`;

const SizeBtn = styled.button`
  width: 54px;
  height: 44px;
  border-radius: 8px;
  border: 1.5px solid ${p => p.$selected ? 'var(--brown-dark)' : 'rgba(0,0,0,0.12)'};
  background: ${p => p.$selected ? 'var(--brown-dark)' : 'white'};
  color: ${p => p.$selected ? 'var(--gold)' : 'var(--brown-dark)'};
  font-size: 13px;
  font-weight: ${p => p.$selected ? '700' : '500'};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: var(--brown-light);
    background: ${p => p.$selected ? 'var(--brown-dark)' : 'var(--card-bg)'};
    transform: scale(1.05);
  }
`;

const SizeError = styled.p`
  color: var(--danger);
  font-size: 13px;
  margin: -20px 0 20px;
  font-weight: 600;
`;

const AddBtn = styled.button`
  background: var(--brown-dark);
  color: white;
  border: none;
  padding: 16px 36px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 12px;
  letter-spacing: 1px;
  transition: all 0.2s;

  &:hover {
    background: var(--brown-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184,147,90,0.35);
  }
`;

const BackBtn = styled.button`
  background: transparent;
  border: 1.5px solid rgba(0,0,0,0.15);
  color: var(--brown-mid);
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    border-color: var(--brown-light);
    color: var(--brown-dark);
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #1a1a1a;
  color: white;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found || null);
    setSelectedSize(null);
    setSizeError(false);
  }, [id]);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({ ...product, selectedSize });
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h3>Product not found.</h3>
      <button onClick={() => navigate('/sneakers')} style={{ marginTop: 16, padding: '10px 24px', cursor: 'pointer' }}>
        Back to Shop
      </button>
    </div>
  );

  return (
    <>
      <Wrapper>
        <ImgBox>
          <ProductImg src={product.image} alt={product.name} />
          <CategoryBadge>{product.category}</CategoryBadge>
        </ImgBox>

        <Details>
          <Brand>{product.brand}</Brand>
          <Name>{product.name}</Name>
          <Price>${product.price}</Price>

          <MetaRow>
            <MetaItem>
              <span>Colorway</span>
              <span>{product.colorway}</span>
            </MetaItem>
            <MetaItem>
              <span>Year</span>
              <span>{product.releaseYear}</span>
            </MetaItem>
            <MetaItem>
              <span>Category</span>
              <span>{product.category}</span>
            </MetaItem>
          </MetaRow>

          <Divider />

          <Description>{product.description}</Description>

          <SizeLabel>
            Select Size (US)
            {selectedSize && <span>Selected: US {selectedSize}</span>}
          </SizeLabel>

          <SizeGrid>
            {product.sizes.map(size => (
              <SizeBtn
                key={size}
                $selected={selectedSize === size}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
              >
                {size}
              </SizeBtn>
            ))}
          </SizeGrid>

          {sizeError && <SizeError>⚠ Please select a size before adding to cart.</SizeError>}

          <AddBtn onClick={handleAdd}>Add to Cart 🛒</AddBtn>
          <BackBtn onClick={() => navigate(-1)}>← Back</BackBtn>
        </Details>
      </Wrapper>

      {toast && (
        <Toast>
          ✅ {product.name} (US {selectedSize}) added to cart!
        </Toast>
      )}
    </>
  );
}

export default ProductDetail;
