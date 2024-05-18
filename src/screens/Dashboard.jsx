// src/screens/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import useDataFetching from '../hooks/useDataFetching';
import { Container, Table, Button, Form, Dropdown } from 'react-bootstrap';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const { data, loading, error } = useDataFetching('/dashboard');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setProducts(data);
    }
  }, [data, loading, error]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const sortedData = products.slice().sort((a, b) => {
    if (sortKey === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return sortDirection === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
  });

  const filteredData = sortedData.filter(product => {
    return (
      product.id.includes(searchQuery) || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', alignItems: 'center', height: '100vh' }}>
        <div style={{  fontSize: '24px' }}>Loading...</div>
      </div>
    );
  }
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <h1 className="mt-4" style={{ fontFamily: 'Freeman, sans-serif' }}>Dashboard</h1>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="sort-dropdown">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSort('id')}>Product ID</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('name')}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSort('selling_price')}>Selling Price</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1></h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Selling Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.selling_price}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveProduct(product.id)}>Check</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
