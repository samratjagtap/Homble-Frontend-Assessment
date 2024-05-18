import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../axios';
import { Container, Row, Col, Button, Modal, Form, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    allergenInfo: '',
    sellingPrice: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getRequest('/products');
        const sortedProducts = response.data.sort((a, b) => a.selling_price - b.selling_price); // Sort products by selling price
        setProducts(sortedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log('Adding product:', newProduct);
      await postRequest('/products', newProduct, { contentType: 'application/json' });

      console.log('Fetching updated products...');
      const response = await getRequest('/products');
      const sortedProducts = response.data.sort((a, b) => a.selling_price - b.selling_price); 
      console.log('Updated products:', sortedProducts);
      setProducts(sortedProducts);
  
      handleClose();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };
  
  

  return (
    <Container style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <h1 className="mt-4" style={{ fontFamily: 'Freeman, sans-serif' }}>Product List</h1>
      <Button className="mb-4" onClick={handleShow}>Add Product</Button>
      <Link to="/dashboard">
  <Button className="mb-4" variant="danger" style={{ marginLeft: '10px' }}>Dashboard</Button>
</Link>

      <Row>
  {loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" />
    </div>
  ) : products.length === 0 ? (
    <div>No products available</div>
  ) : (
    products.map(product => (
      <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4" onClick={() => navigate(`/products/${product.id}`)}>
        <Card className="h-100">
          <Card.Img variant="top" src={product.productImage} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text><strong>Price: ${product.selling_price}</strong></Card.Text> 
          </Card.Body>
        </Card>
      </Col>
    ))
  )}
</Row>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productAllergenInfo">
              <Form.Label>Product Allergen Info</Form.Label>
              <Form.Control
                type="text"
                name="allergenInfo"
                value={newProduct.allergen_info}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productSellingPrice">
              <Form.Label>Product Selling Price</Form.Label>
              <Form.Control
                type="number"
                name="sellingPrice"
                value={newProduct.selling_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
          
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
