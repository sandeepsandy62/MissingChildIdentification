import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Signin() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };



const handleSignUp = () => {
  
}


  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign in
            </Button>

            <div className="text-center">
              <Button variant="link" onClick={handleSignUp}>Don't have an account? Sign up</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Signin;