import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchMissingChild() {

  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>Iam Searching For A Child</h4>
      <Tabs defaultActiveKey="Quick search" fill variant="tabs">

        {/* Quick Search */}
        <Tab eventKey="Quick search" title="Quick Search">
          <div style={{
            display: 'block',
            width: 700,
            padding: 30
          }}>
            {/* form start- Quick search */}
            <Form>
              <Form.Group controlId="fName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender:</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Male"
                      name="group1"
                      type={type}
                      
                    />
                    <Form.Check
                      inline
                      label="Female"
                      name="group1"
                      type={type}
                      
                    />
                    <Form.Check
                      inline
                      label="Others"
                      name="group1"
                      type={type}
                      
                    />
                  </div>
                ))}
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age in Years:</Form.Label>
                <Form.Control type="number" placeholder="Enter Age" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Quick Search
              </Button>
            </Form>
          </div>
        </Tab>

        {/* Search by child id */}
        <Tab eventKey="Search by child id" title="Search By Child ID">
          {/* Form Start-search by child id */}
          <div style={{
            display: 'block',
            width: 700,
            padding: 30
          }}>
            <Form>
              <Form.Group controlId="childId">
                <Form.Label>Child ID:</Form.Label>
                <Form.Control type="text" placeholder="Enter child ID"  />
              </Form.Group>
              <Button variant="primary" type="submit" align='center'>
                Search By Child ID
              </Button>
            </Form>
          </div>
        </Tab>

      </Tabs>
    </div>
  );
}