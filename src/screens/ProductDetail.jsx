// src/screens/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../axios';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import ProductList from './ProductList';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getRequest(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }
  

  if (!product) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ fontSize: '24px' }}>Something Went Wrong!</div>
  </div>
  }

  return (
    <Container style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <Row>
        <Col>
        <h1 style={{ fontFamily: 'Freeman, sans-serif' }}>Product Details for {product.name}</h1>
          <Card>
          <Card.Img variant="top" src={product.productImage} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Allergen Info: {product.allergen_info}</Card.Text>
              <Card.Text>Price: ${product.selling_price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
