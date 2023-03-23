import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchMissingChild() {
  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>I am Searching For A Child</h4>
      {/* Search by child id */}
      <Form>
        <Form.Group controlId="childId">
          <Form.Label>Child ID:</Form.Label>
          <Form.Control type="text" placeholder="Enter child ID" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
          Search By Child ID
        </Button>
      </Form>
    </div>
  );
}
