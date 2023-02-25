import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from 'react-bootstrap';

export default function MyChildMissing() {
  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>My Child is Missing</h4>
      <Tabs defaultActiveKey="basicDetails" fill variant="tabs">
        {/* Basic Details */}
        <Tab eventKey="basicDetails" title="Basic Details">
          <Form>
            <Row>
              <Col md={6}>
                {/* Name */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Missing Child Name" />
                </Form.Group>

                {/* Date of Missing */}
                <Form.Group className="mb-3" controlId="dateOfMissing">
                  <Form.Label>Date of Missing</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                {/* Date of Birth */}
                <Form.Group className="mb-3" controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Describe how the child was lost"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Mentally Ill */}
                <Form.Group className="mb-3" controlId="mentallyIll">
                  <Form.Label>Mentally ill</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      value="yes"
                      name="mentallyIll"
                      id="mentallyIllYes"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      value="no"
                      name="mentallyIll"
                      id="mentallyIllNo"
                    />
                  </div>
                </Form.Group>

                {/* Gender */}
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>

                {/* Height */}
                <Form.Group className="mb-3" controlId="height">
                  <Form.Label>Height</Form.Label>
                  <Form.Control input="text" name="height"></Form.Control>
                </Form.Group>

                {/* Relationship */}
                <Form.Group className="mb-3" controlId="relationship">
                  <Form.Label>Relationship</Form.Label>
                  <Form.Control as="select" name="relationship">
                    <option value="parent">Parent</option>
                    <option value="legalGuardian">Legal Guardian</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                {/* Differently Abled */}
                <Form.Group className="mb-3" controlId="differentlyAbled">
                  <Form.Label>Differently Abled (Physical/Mental)</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      value="yes"
                      name="differentlyAbledNo"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      value="no"
                      name="differentlyAbled"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Family Details */}
        <Tab eventKey="familyDetails" title="Family Details">
          <Form>
            <Row>
              {/* Father Details */}
              <Col md={6}>
                <h4>Father Details</h4>
                <Form.Group className="mb-3" controlId="fatherName">
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control type="text" placeholder="Child's Father Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatherEmail">
                  <Form.Label>Father Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Child's Father Email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatherMobileNumber">
                  <Form.Label>Father Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Child's Father Mobile"
                  />
                </Form.Group>
              </Col>

              {/* Mother Details */}
              <Col md={6}>
                <h4>Mother Details</h4>
                <Form.Group className="mb-3" controlId="motherName">
                  <Form.Label>Mother Name</Form.Label>
                  <Form.Control type="text" placeholder="Child's Mother Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="motherEmail">
                  <Form.Label>Mother Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Child's Mother Email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="motherMobileNumber">
                  <Form.Label>Mother Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Child's Mother Mobile"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Child details */}
            <Row>
              <Col md={12}>
                <h4>Childs Details</h4>
                <Form.Group className="mb-3" controlId="childAdhaarNumber">
                  <Form.Label>Child Adhaar Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Child's Adhaar Number"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Location Details */}
        <Tab eventKey="locationDetails" title="Location Details">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="state" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="district">
                  <Form.Label>District</Form.Label>
                  <Form.Control type="text" placeholder="district" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Adress/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="H-No , street , village ..."
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="pincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Upload Media */}
        <Tab eventKey="uploadMedia" title="Upload Media">
          <Form>
            <Row>
              <Col md={12}>
                <Alert variant="primary">
                  Upload JPG or PNG images under 2 MB.
                </Alert>
                <Form.Group>
                <Form.Label>Choose a file to upload</Form.Label>
                <Form.Control type="file"/>
              </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}
