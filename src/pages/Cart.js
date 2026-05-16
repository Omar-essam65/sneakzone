import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

/* ── Styled Components ── */
const PageTitle = styled.h2`
  text-align: center;
  font-size: 44px;
  margin-bottom: 8px;
  color: var(--brown-dark);
`;

const PageSub = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 13px;
  margin-bottom: 36px;
  letter-spacing: 1px;
`;

const CartTable = styled.table`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);

  th {
    background: var(--brown-dark);
    color: var(--gold);
    padding: 14px 20px;
    text-align: left;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  td {
    padding: 16px 20px;
    border-bottom: 1px solid #f0ebe0;
    vertical-align: middle;
  }

  tr:last-child td { border-bottom: none; }
`;

const SizeBadge = styled.span`
  background: var(--card-bg);
  color: var(--brown-mid);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  margin-left: 8px;
  letter-spacing: 0.5px;
`;

const QtyBtn = styled.button`
  background: var(--card-bg);
  color: var(--brown-dark);
  border: 1px solid rgba(0,0,0,0.1);
  width: 30px;
  height: 30px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.15s;

  &:hover { background: var(--brown-dark); color: white; }
`;

const QtyDisplay = styled.span`
  margin: 0 10px;
  font-weight: 700;
  font-size: 15px;
  min-width: 20px;
  display: inline-block;
  text-align: center;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: #e53e3e;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.15s;
  &:hover { transform: scale(1.3); }
`;

const TotalSection = styled.div`
  max-width: 820px;
  margin: 20px auto 0;
  background: white;
  padding: 24px 28px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
`;

const TotalText = styled.p`
  font-size: 28px;
  font-weight: 800;
  color: var(--brown-dark);
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
`;

const CheckoutBtn = styled.button`
  background: var(--brown-dark);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1.5px;
  transition: all 0.2s;

  &:hover {
    background: var(--brown-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184,147,90,0.35);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;

  p { font-size: 20px; color: #888; margin-bottom: 24px; }
`;

/* ── Checkout Modal ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 36px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 24px 80px rgba(0,0,0,0.3);
`;

const ModalTitle = styled.h3`
  font-size: 34px;
  color: var(--brown-dark);
  margin-bottom: 6px;
`;

const ModalSub = styled.p`
  color: #aaa;
  font-size: 13px;
  margin-bottom: 28px;
  letter-spacing: 0.5px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--brown-mid);
  margin-bottom: 6px;
`;

const FieldInput = styled.input`
  display: block;
  width: 100%;
  padding: 11px 14px;
  margin-bottom: 16px;
  border: 1.5px solid #e0d8cc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background: #faf8f4;

  &:focus { border-color: var(--brown-light); }
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 800;
  color: var(--brown-dark);
  border-top: 1.5px solid #eee;
  padding-top: 12px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const PlaceOrderBtn = styled.button`
  width: 100%;
  background: var(--brown-dark);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  margin-bottom: 10px;

  &:hover { background: var(--brown-light); }
`;

const CancelBtn = styled.button`
  width: 100%;
  background: transparent;
  border: 1.5px solid #ddd;
  color: #888;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: var(--brown-light); color: var(--brown-dark); }
`;

/* ── Success Screen ── */
const SuccessWrapper = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const SuccessIcon = styled.div`
  font-size: 72px;
  margin-bottom: 24px;
  animation: pop 0.4s cubic-bezier(.22,.68,0,1.2);
  @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
`;

const SuccessTitle = styled.h2`
  font-size: 48px;
  color: var(--brown-dark);
  margin-bottom: 12px;
`;

const SuccessText = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 8px;
`;

const OrderNum = styled.p`
  font-size: 13px;
  color: var(--brown-light);
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 36px;
`;

const HomeBtn = styled.button`
  background: var(--brown-dark);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  &:hover { background: var(--brown-light); }
`;

/* ── Component ── */
function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [form, setForm] = useState({
    name: user?.username || '',
    email: user?.email || '',
    address: '',
    city: '',
    card: '',
  });
  const [formError, setFormError] = useState('');

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handlePlaceOrder = () => {
    if (!form.name.trim()) return setFormError('Full name is required.');
    if (!/\S+@\S+\.\S+/.test(form.email)) return setFormError('Enter a valid email.');
    if (!form.address.trim()) return setFormError('Shipping address is required.');
    if (!form.city.trim()) return setFormError('City is required.');
    if (form.card.replace(/\s/g, '').length < 16) return setFormError('Enter a valid 16-digit card number.');

    // Save order to localStorage
    const order = {
      id: 'SZ-' + Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: cartTotal,
      customer: { name: form.name, email: form.email, address: `${form.address}, ${form.city}` },
    };
    const orders = JSON.parse(localStorage.getItem('sneakzone-orders') || '[]');
    orders.push(order);
    localStorage.setItem('sneakzone-orders', JSON.stringify(orders));

    setOrderNumber(order.id);
    clearCart();
    setShowCheckout(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="page-wrapper">
        <SuccessWrapper>
          <SuccessIcon>🎉</SuccessIcon>
          <SuccessTitle>Order Placed!</SuccessTitle>
          <SuccessText>
            Thank you for shopping at <strong>SneakZone</strong>!<br />
            Your sneakers are being prepared for shipping.
          </SuccessText>
          <SuccessText>A confirmation has been sent to <strong>{form.email}</strong>.</SuccessText>
          <OrderNum>Order #{orderNumber}</OrderNum>
          <HomeBtn onClick={() => navigate('/')}>Continue Shopping →</HomeBtn>
        </SuccessWrapper>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <PageTitle>Your Cart</PageTitle>
      <PageSub>{cart.length} item{cart.length !== 1 ? 's' : ''} · Free shipping on orders over $150</PageSub>

      {cart.length === 0 ? (
        <EmptyState>
          <p>Your cart is empty 👟</p>
          <Link to="/sneakers">
            <CheckoutBtn>Start Shopping</CheckoutBtn>
          </Link>
        </EmptyState>
      ) : (
        <>
          <CartTable>
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.cartKey}>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td><SizeBadge>US {item.selectedSize}</SizeBadge></td>
                  <td>${item.price}</td>
                  <td>
                    <QtyBtn onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>−</QtyBtn>
                    <QtyDisplay>{item.quantity}</QtyDisplay>
                    <QtyBtn onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</QtyBtn>
                  </td>
                  <td style={{ fontWeight: 700 }}>${item.price * item.quantity}</td>
                  <td>
                    <RemoveBtn onClick={() => removeFromCart(item.cartKey)}>🗑</RemoveBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </CartTable>

          <TotalSection>
            <TotalText>Total: ${cartTotal}</TotalText>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={clearCart}
                style={{ background: 'transparent', border: '1.5px solid #ddd', color: '#888', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
              >
                Clear Cart
              </button>
              <CheckoutBtn onClick={() => setShowCheckout(true)}>Checkout →</CheckoutBtn>
            </div>
          </TotalSection>
        </>
      )}

      {/* ── Checkout Modal ── */}
      {showCheckout && (
        <Overlay onClick={() => setShowCheckout(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalTitle>Checkout</ModalTitle>
            <ModalSub>Complete your order below</ModalSub>

            {/* Order summary */}
            {cart.map(item => (
              <OrderRow key={item.cartKey}>
                <span>{item.name} <SizeBadge>US {item.selectedSize}</SizeBadge> × {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </OrderRow>
            ))}
            <OrderTotal>
              <span>Total</span>
              <span>${cartTotal}</span>
            </OrderTotal>

            {/* Form */}
            <FieldLabel>Full Name</FieldLabel>
            <FieldInput name="name" placeholder="John Doe" value={form.name} onChange={handleFormChange} />

            <FieldLabel>Email</FieldLabel>
            <FieldInput name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleFormChange} />

            <FieldLabel>Shipping Address</FieldLabel>
            <FieldInput name="address" placeholder="123 Main St" value={form.address} onChange={handleFormChange} />

            <FieldLabel>City</FieldLabel>
            <FieldInput name="city" placeholder="New York" value={form.city} onChange={handleFormChange} />

            <FieldLabel>Card Number</FieldLabel>
            <FieldInput
              name="card"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={form.card}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                const spaced = val.match(/.{1,4}/g)?.join(' ') || val;
                setForm({ ...form, card: spaced });
                setFormError('');
              }}
            />

            {formError && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 12, fontWeight: 600 }}>⚠ {formError}</p>}

            <PlaceOrderBtn onClick={handlePlaceOrder}>Place Order 🎉</PlaceOrderBtn>
            <CancelBtn onClick={() => setShowCheckout(false)}>Cancel</CancelBtn>
          </Modal>
        </Overlay>
      )}
    </div>
  );
}

export default Cart;
