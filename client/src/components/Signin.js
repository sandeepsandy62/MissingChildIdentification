import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  try {
    const response = await axios.post('http://localhost:5000/signin', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default function Signin({setShowSignUp , setToken}) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      email,
      password
    })
    setToken(token)
  };

  function handleSignUp(){
    setShowSignUp(true);
  }




  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Sign in</h1>

          <Form onSubmit={handleSubmit} >

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email"
              placeholder="Enter email"
              required 
              value={email}
              onChange={(event)=>setEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              required
              value = {password}
              onChange = {(event)=>setPassword(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign in
            </Button>

            <div className="text-center">
              <Button className='btn btn-primary' onClick={handleSignUp}>Don't have an account? Sign up</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired
};