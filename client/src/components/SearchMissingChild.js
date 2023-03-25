import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchMissingChild() {
  const [searchName, setSearchName] = useState("");
  const [childData, setChildData] = useState(null);
  const [childImage, setChildImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/search-child/${searchName}`);
      const data = await response.json();
      setChildData(data);
      setChildImage(`data:image/png;base64,${data.img}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>I am Searching For A Child</h4>
      {/* Search by child id */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="childId">
          <Form.Label>Child Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Child Name"
            name="searchName"
            value={searchName}
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          Search By Child Name
        </Button>
      </Form>
      {childData && (
        <div style={{ marginTop: "20px" }}>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Father Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={childImage} alt="" width="100px" />
              </td>
              <td>{childData.name}</td>
              <td>{childData.fatherName}</td>
            </tr>
          </tbody>
        </table>
      </div>      
      )}
    </div>
  );
}
