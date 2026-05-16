import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageTitle = styled.h2`
  text-align: center;
  font-size: 40px;
  margin-bottom: 8px;
  color: var(--brown-dark);
`;

const NewsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 30px;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 14px;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const NewsImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const NewsBody = styled.div`
  padding: 16px;
`;

const NewsSource = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--brown-light);
  font-weight: 600;
`;

const NewsTitle = styled.h3`
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin: 8px 0 6px;
  color: var(--text-dark);
  line-height: 1.4;
`;

const NewsLink = styled.a`
  font-size: 13px;
  color: var(--brown-mid);
  font-weight: 600;

  &:hover { text-decoration: underline; }
`;

const LoadingMsg = styled.p`
  text-align: center;
  font-size: 18px;
  padding: 60px;
  color: #888;
`;

const ErrorMsg = styled.p`
  text-align: center;
  color: var(--brown-mid);
  font-size: 16px;
  padding: 40px;
`;

// Fallback sneaker news data (shown when API is unavailable)
const fallbackNews = [
  { id: 1, title: 'Nike Air Jordan 4 Black Cat Gets a 2024 Restock', source: 'Sneaker News', url: 'https://sneakernews.com', image: 'https://placehold.co/300x180/3b2314/c9a97a?text=Jordan+4+Black+Cat' },
  { id: 2, title: 'Yeezy Foam RNNR Returns in Three New Colorways', source: 'Hypebeast', url: 'https://hypebeast.com', image: 'https://placehold.co/300x180/6b3d1e/f5f0e8?text=Yeezy+Foam+RNNR' },
  { id: 3, title: 'Nike Dunk Low Panda Still Dominates Resale Charts', source: 'StockX', url: 'https://stockx.com', image: 'https://placehold.co/300x180/2c1a0e/b8935a?text=Panda+Dunks' },
  { id: 4, title: 'Air Force 1 Celebrates 40 Years With Special Edition', source: 'Sneaker News', url: 'https://sneakernews.com', image: 'https://placehold.co/300x180/b8935a/ffffff?text=Air+Force+1+40th' },
  { id: 5, title: 'Air Jordan 11 Cool Grey: Everything You Need to Know', source: 'Complex', url: 'https://complex.com', image: 'https://placehold.co/300x180/3b2314/c9a97a?text=Jordan+11+Cool+Grey' },
  { id: 6, title: 'Fire Red Jordan 4: History of the Most Iconic Colorway', source: 'Sole Collector', url: 'https://solecollector.com', image: 'https://placehold.co/300x180/c0392b/ffffff?text=Fire+Red+4s' },
];

function Trending() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect + API integration: fetch sneaker news from public API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using NewsData.io public endpoint (free tier, no key needed for demo)
        const res = await fetch(
          'https://newsdata.io/api/1/news?apikey=pub_demo&q=sneakers&language=en&category=sports'
        );

        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const articles = data.results.slice(0, 6).map((article, i) => ({
            id: i,
            title: article.title,
            source: article.source_id || 'Sneaker News',
            url: article.link || '#',
            image: article.image_url || `https://placehold.co/300x180/3b2314/c9a97a?text=Sneakers`,
          }));
          setNews(articles);
        } else {
          setNews(fallbackNews);
        }
      } catch (err) {
        // Use fallback data when API fails
        setNews(fallbackNews);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="page-wrapper">
      <PageTitle>🔥 Trending Now</PageTitle>
      <p className="text-center text-muted mb-2" style={{ letterSpacing: '1px' }}>
        Latest sneaker news & drops
      </p>

      {loading && <LoadingMsg>Loading latest drops...</LoadingMsg>}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* Mapping news articles to cards */}
      <NewsGrid>
        {news.map(article => (
          <NewsCard key={article.id}>
            <NewsImg
              src={article.image}
              alt={article.title}
              onError={e => { e.target.src = 'https://placehold.co/300x180/3b2314/c9a97a?text=Sneaker+News'; }}
            />
            <NewsBody>
              <NewsSource>{article.source}</NewsSource>
              <NewsTitle>{article.title}</NewsTitle>
              <NewsLink href={article.url} target="_blank" rel="noopener noreferrer">
                Read More →
              </NewsLink>
            </NewsBody>
          </NewsCard>
        ))}
      </NewsGrid>
    </div>
  );
}

export default Trending;
