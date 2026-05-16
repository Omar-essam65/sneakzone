import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const HeroSection = styled.section`
  background: linear-gradient(145deg, #0f0500 0%, #2c1a0a 45%, #5a3015 100%);
  color: white;
  padding: 90px 40px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Subtle texture rings */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 900px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,122,0.07);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,122,0.07);
    pointer-events: none;
  }
`;

const HeroEyebrow = styled.p`
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  margin-bottom: 14px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(60px, 11vw, 108px);
  letter-spacing: 10px;
  margin-bottom: 14px;
  color: white;
  line-height: 1;
  span { color: var(--gold); }
`;

const HeroSub = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 44px;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const HeroBtnRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, var(--gold) 0%, #d4a96a 100%);
  color: var(--brown-dark);
  padding: 16px 48px;
  border-radius: 60px;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.28s cubic-bezier(.22,.68,0,1.2);
  box-shadow: 0 6px 28px rgba(201,169,122,0.4);

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 14px 36px rgba(201,169,122,0.5);
    background: linear-gradient(135deg, #e8c080 0%, var(--gold) 100%);
  }
`;

const GhostBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid rgba(201,169,122,0.45);
  color: rgba(255,255,255,0.75);
  padding: 16px 40px;
  border-radius: 60px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.25s;

  &:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-3px);
  }
`;

/* ══════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════ */
const StatsBar = styled.div`
  background: var(--brown-dark);
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(201,169,122,0.12);
`;

const StatItem = styled.div`
  padding: 20px 44px;
  text-align: center;
  border-right: 1px solid rgba(201,169,122,0.15);
  &:last-child { border-right: none; }

  span:first-child {
    display: block;
    font-size: 28px;
    font-family: 'Bebas Neue', sans-serif;
    color: var(--gold);
    letter-spacing: 3px;
  }
  span:last-child {
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

/* ══════════════════════════════════════════
   HORIZONTAL LAYOUT: SIDEBAR + GRID
══════════════════════════════════════════ */
const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 36px 56px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 20px 40px;
  }
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  width: 210px;
  flex-shrink: 0;
  padding-top: 44px;
  padding-right: 32px;
  position: sticky;
  top: 80px;

  @media (max-width: 900px) {
    width: 100%;
    position: static;
    padding-right: 0;
    padding-bottom: 28px;
  }
`;

const SidebarLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--gold);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(184,147,90,0.25);
`;

const CatBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 11px 14px;
  margin-bottom: 4px;
  border-radius: 10px;
  border: 1px solid ${p => p.$active ? 'transparent' : 'transparent'};
  font-size: 14px;
  font-weight: ${p => p.$active ? '700' : '500'};
  cursor: pointer;
  transition: all 0.2s;
  background: ${p => p.$active ? 'var(--brown-dark)' : 'transparent'};
  color: ${p => p.$active ? 'var(--gold)' : '#5a4030'};

  &:hover {
    background: ${p => p.$active ? 'var(--brown-dark)' : 'rgba(59,35,20,0.06)'};
    color: ${p => p.$active ? 'var(--gold)' : 'var(--brown-dark)'};
    padding-left: 20px;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${p => p.$active ? 'var(--gold)' : 'rgba(90,64,48,0.3)'};
    flex-shrink: 0;
  }
`;

const HotWidget = styled.div`
  margin-top: 36px;
  background: linear-gradient(160deg, #1a0a00 0%, #3b2314 100%);
  border-radius: 16px;
  padding: 22px 18px;
  border: 1px solid rgba(201,169,122,0.15);
`;

const HotTitle = styled.p`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--gold);
  margin-bottom: 16px;
  opacity: 0.85;
`;

const HotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  &:last-child { border-bottom: none; }

  span:first-child {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
  }
  span:last-child {
    font-size: 13px;
    color: var(--gold);
    font-weight: 700;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
  }
`;

/* ── Products Area ── */
const ProductsArea = styled.main`
  flex: 1;
  min-width: 0;
  padding-top: 44px;
  padding-left: 36px;
  border-left: 1px solid rgba(59,35,20,0.08);

  @media (max-width: 900px) {
    padding-left: 0;
    border-left: none;
    border-top: 1px solid rgba(59,35,20,0.08);
    padding-top: 28px;
  }
`;

const AreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 14px;
`;

const AreaTitle = styled.h2`
  font-size: 40px;
  color: var(--brown-dark);
  margin: 0;
  line-height: 1;
`;

const AreaSub = styled.p`
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
  letter-spacing: 0.5px;
`;

const ViewAllBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--brown-mid);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 10px 22px;
  border: 1.5px solid rgba(107,61,30,0.3);
  border-radius: 50px;
  transition: all 0.22s;

  &:hover {
    background: var(--brown-dark);
    color: var(--gold);
    border-color: var(--brown-dark);
    transform: translateY(-1px);
  }
`;

/* ── Equal-height grid ── */
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-auto-rows: 1fr;        /* ← all rows same height */
  gap: 22px;
  align-items: stretch;       /* ← stretch cards to fill row height */
`;

/* ══════════════════════════════════════════
   POST: NEWSLETTER
══════════════════════════════════════════ */
const NewsletterSection = styled.section`
  background: linear-gradient(145deg, #0f0500 0%, #2c1a0a 100%);
  padding: 72px 40px;
  text-align: center;
  border-top: 1px solid rgba(201,169,122,0.1);
`;

const NewsletterInner = styled.div`
  max-width: 540px;
  margin: 0 auto;
`;

const NLEyebrow = styled.p`
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.7;
  margin-bottom: 12px;
`;

const NLTitle = styled.h2`
  color: white;
  font-size: 42px;
  letter-spacing: 4px;
  margin-bottom: 10px;
  span { color: var(--gold); }
`;

const NLSub = styled.p`
  color: rgba(255,255,255,0.45);
  font-size: 13px;
  margin-bottom: 36px;
  letter-spacing: 0.5px;
  line-height: 1.7;
`;

const NLForm = styled.div`
  display: flex;
  gap: 0;
  max-width: 460px;
  margin: 0 auto;
  border-radius: 60px;
  overflow: hidden;
  border: 1.5px solid rgba(201,169,122,0.25);
  background: rgba(255,255,255,0.05);
  transition: border-color 0.2s;

  &:focus-within {
    border-color: rgba(201,169,122,0.6);
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 16px 24px;
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  min-width: 0;

  &::placeholder { color: rgba(255,255,255,0.3); }
`;

const SubscribeBtn = styled.button`
  background: linear-gradient(135deg, var(--gold), #d4a96a);
  color: var(--brown-dark);
  border: none;
  padding: 16px 28px;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.22s;
  flex-shrink: 0;

  &:hover { background: linear-gradient(135deg, #e8c080, var(--gold)); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const FeedbackMsg = styled.p`
  margin-top: 18px;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.$error ? '#fc8181' : '#68d391'};
  letter-spacing: 0.5px;
`;

const ApiTag = styled.span`
  display: inline-block;
  margin-top: 20px;
  font-size: 10px;
  background: rgba(201,169,122,0.1);
  border: 1px solid rgba(201,169,122,0.2);
  color: rgba(201,169,122,0.6);
  padding: 4px 14px;
  border-radius: 20px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
const catMeta = {
  All:    { icon: '👟', label: 'All Sneakers' },
  Jordan: { icon: '🏀', label: 'Jordan'       },
  Nike:   { icon: '✓',  label: 'Nike'          },
  Yeezy:  { icon: '⚡', label: 'Yeezy'         },
};

const hotItems = [
  { name: 'Blackcat 4s',     price: '$220' },
  { name: 'Panda Dunks',     price: '$160' },
  { name: 'AJ11 Cool Grey',  price: '$250' },
];

function Home() {
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [postMsg, setPostMsg] = useState('');
  const [postError, setPostError] = useState(false);

  // ── GET: filter products when category changes
  useEffect(() => {
    const filtered =
      activeCategory === 'All'
        ? products.slice(0, 6)
        : products.filter(p => p.category === activeCategory);
    setFeatured(filtered);
  }, [activeCategory]);

  // ── POST: newsletter subscribe (📍 POST METHOD — Home.js → handleSubscribe)
  const handleSubscribe = async () => {
    setPostMsg('');
    setPostError(false);
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setPostMsg('Please enter a valid email address.');
      setPostError(true);
      return;
    }
    setPostLoading(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter_subscribe' }),
      });
      const data = await res.json();
      console.log('📬 POST /newsletter →', data);
      setPostMsg('🎉 You\'re in! Expect exclusive drops straight to your inbox.');
      setEmail('');
    } catch {
      setPostMsg('Something went wrong. Please try again.');
      setPostError(true);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div>

      {/* ── HERO ── */}
      <HeroSection>
        <HeroEyebrow>New Season · Limited Drops</HeroEyebrow>
        <HeroTitle>Sneak<span>Zone</span></HeroTitle>
        <HeroSub>The only store serious sneakerheads trust</HeroSub>
        <HeroBtnRow>
          <PrimaryBtn to="/sneakers">
            Shop Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </PrimaryBtn>
          <GhostBtn to="/trending">🔥 Trending Drops</GhostBtn>
        </HeroBtnRow>
      </HeroSection>

      {/* ── STATS ── */}
      <StatsBar>
        <StatItem><span>6+</span><span>Exclusive Styles</span></StatItem>
        <StatItem><span>3</span><span>Top Brands</span></StatItem>
        <StatItem><span>FREE</span><span>Shipping Over $150</span></StatItem>
        <StatItem><span>100%</span><span>Authentic</span></StatItem>
      </StatsBar>

      {/* ── HORIZONTAL: SIDEBAR + PRODUCTS ── */}
      <ContentRow>

        {/* LEFT SIDEBAR */}
        <Sidebar>
          <SidebarLabel>Browse by Brand</SidebarLabel>

          {['All', 'Jordan', 'Nike', 'Yeezy'].map(cat => (
            <CatBtn
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="dot" />
              {catMeta[cat].icon} {catMeta[cat].label}
            </CatBtn>
          ))}

          <HotWidget>
            <HotTitle>🔥 Hot Right Now</HotTitle>
            {hotItems.map(item => (
              <HotRow key={item.name}>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </HotRow>
            ))}
          </HotWidget>
        </Sidebar>

        {/* RIGHT: EQUAL-HEIGHT PRODUCT GRID */}
        <ProductsArea>
          <AreaHeader>
            <div>
              <AreaTitle>
                {activeCategory === 'All' ? 'Featured Drops' : activeCategory}
              </AreaTitle>
              <AreaSub>
                {featured.length} style{featured.length !== 1 ? 's' : ''} available
              </AreaSub>
            </div>
            <ViewAllBtn to="/sneakers">
              View All
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </ViewAllBtn>
          </AreaHeader>

          <ProductsGrid>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>

          {featured.length === 0 && (
            <p style={{ textAlign: 'center', color: '#bbb', padding: '60px 0', fontSize: '15px' }}>
              No styles in this category yet.
            </p>
          )}
        </ProductsArea>

      </ContentRow>

      {/* ── POST METHOD: NEWSLETTER ── */}
      <NewsletterSection>
        <NewsletterInner>
          <NLEyebrow>Stay Connected</NLEyebrow>
          <NLTitle>Get Early <span>Access</span></NLTitle>
          <NLSub>
            Be first to know about new drops, restocks & exclusive member deals.<br />
            No spam — only heat.
          </NLSub>
          <NLForm>
            <EmailInput
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
            />
            <SubscribeBtn onClick={handleSubscribe} disabled={postLoading}>
              {postLoading ? '...' : 'Subscribe'}
            </SubscribeBtn>
          </NLForm>
          {postMsg && <FeedbackMsg $error={postError}>{postMsg}</FeedbackMsg>}
          <ApiTag>📡 POST · jsonplaceholder.typicode.com/posts</ApiTag>
        </NewsletterInner>
      </NewsletterSection>

    </div>
  );
}

export default Home;
