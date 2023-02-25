import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/SignUp.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("aadharNumber", aadharNumber);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("pincode", pincode);
    formData.append("district", district);
    formData.append("image", image);
  
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);
  };
  
  

  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(event) => setMobileNumber(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAadharNumber">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhar number"
                value={aadharNumber}
                onChange={(event) => setAadharNumber(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(event) => setPincode(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDistrict">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group controlId="formSubmit">
              <Button variant="primary" type="submit" style={{"margin":"10px"}}>
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Signup;
