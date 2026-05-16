import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const PageTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  margin-bottom: 10px;
  color: var(--brown-dark);
`;

const SearchBar = styled.input`
  display: block;
  margin: 0 auto 24px;
  padding: 10px 20px;
  width: 100%;
  max-width: 400px;
  border: 2px solid var(--brown-light);
  border-radius: 30px;
  font-size: 15px;
  outline: none;
  background: white;
  color: var(--text-dark);
  transition: border 0.2s;

  &:focus {
    border-color: var(--brown-dark);
  }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 40px;
`;

function Sneakers() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [filtered, setFiltered] = useState(products);

  // useEffect: filter and sort products when search/sort changes
  useEffect(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [search, sortBy]);

  return (
    <div className="page-wrapper">
      <PageTitle>All Sneakers</PageTitle>
      <p className="text-center text-muted mb-4" style={{ letterSpacing: '1px' }}>
        {filtered.length} style{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Search Input - event handling (input) */}
      <SearchBar
        type="text"
        placeholder="Search sneakers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Sort Dropdown - event handling */}
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select"
          style={{ maxWidth: '200px', borderRadius: '20px', borderColor: 'var(--brown-light)' }}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Mapping products to ProductCard components */}
      {filtered.length > 0 ? (
        <ProductsGrid>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      ) : (
        <NoResults>No sneakers found for "{search}"</NoResults>
      )}
    </div>
  );
}

export default Sneakers;
