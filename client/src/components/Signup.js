import { useState } from "react";
import { Form, Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/SignUp.css";
import axios from 'axios';

const Signup = ({setShowSignUp}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [register,setRegister] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/signup",
      data:{
        firstName,
        lastName,
        email,
        password,
        mobileNumber,
        aadharNumber,
        address,
        pincode,
        district,
        state,
      },
    }

    //make the API call
    axios(configuration)
    .then((result)=>{
      setRegister(true);
      setShowSignUp(false);
    })
    .catch((error) => {
      error = new Error();
    })
  };
  
  
  

  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            {/* firstName */}
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            {/* Mobile Number */}
            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(event) => setMobileNumber(event.target.value)}
              />
            </Form.Group>

          </Col>
          <Col md={6}>

            {/* AadharNumber */}
            <Form.Group controlId="formAadharNumber">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhar number"
                value={aadharNumber}
                onChange={(event) => setAadharNumber(event.target.value)}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group>

            
            {/* pincode */}
            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(event) => setPincode(event.target.value)}
              />
            </Form.Group>

             {/* district */}
             <Form.Group controlId="formDistrict">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
              />
            </Form.Group>

            {/* State */}
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </Form.Group>

          </Col>

          <Col md={12}>
            <Form.Group controlId="formSubmit">
              <Button variant="primary" type="submit" style={{"margin":"10px"}}>
                Sign Up
              </Button>
            </Form.Group>
          </Col>
          {/* display success message */}
          {register?(
            <p className="text-success">You are Registered Successfully</p>
          ):(
            <p className="text-danger">You are not Registered</p>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default Signup;