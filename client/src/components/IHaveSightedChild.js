import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from 'react-bootstrap';


function IHaveSightedChild() {
  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>I Have Sighted A Child</h4>
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

                {/* Date of Sighting */}
                <Form.Group className="mb-3" controlId="dateOfSighting">
                  <Form.Label>Date of Missing</Form.Label>
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
                <Form.Group className="mb-3" controlId="approximateHeight">
                  <Form.Label>Approximate Height</Form.Label>
                  <Form.Control input="text" name="height"></Form.Control>
                </Form.Group>

                {/* Reason */}
                <Form.Group className="mb-3" controlId="reason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please explain the reason why you think child is lost"
                  ></Form.Control>
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

        
        {/* Location Details */}
        <Tab eventKey="locationDetails" title="Location Details">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sightedState">
                  <Form.Label>SightedState</Form.Label>
                  <Form.Control type="text" placeholder="state" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sightedDistrict">
                  <Form.Label>Sighted District</Form.Label>
                  <Form.Control type="text" placeholder="district" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sightedAddress">
                  <Form.Label>Sighted Adress/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="H-No , street , village ..."
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sightedPincode">
                  <Form.Label>Sighted Pincode</Form.Label>
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
  )
}

export default IHaveSightedChild