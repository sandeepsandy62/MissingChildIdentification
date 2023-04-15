import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function MyChildMissing() {
  const [name, setName] = useState("");
  const [dateOfMissing, setDateOfMissing] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [relationship, setRelationship] = useState("parent");
  const [description, setDescription] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [fatherMobileNumber, setFatherMobileNumber] = useState("");
  const [childAdhaarNumber, setChildAdhaarNumber] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [uploadMedia, setUploadMedia] = useState("");
  const [missingChildId, setMissingChildId] = useState("");
  const [bottomWear,setBottomWear] = useState("");
  const [topWear,setTopWear] = useState("");
  const [mentallyIll,setMentallyIll] = useState("");
  const [height,setHeight] = useState("");
  const [identificationMarks,setIdentificationMarks] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dateOfMissing", dateOfMissing);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("relationship", relationship);
    formData.append("description", description);
    formData.append("fatherName", fatherName);
    formData.append("fatherEmail", fatherEmail);
    formData.append("fatherMobileNumber", fatherMobileNumber);
    formData.append("childAdhaarNumber", childAdhaarNumber);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("testImage", uploadMedia);
    formData.append("height",height);
    formData.append("identificationMarks",identificationMarks);
    formData.append("mentallyIll",mentallyIll);
    formData.append("bottomWear",bottomWear);
    formData.append("topWear",topWear);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/missingchild",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const missingChildId = response.data;
      setMissingChildId(missingChildId)
  
      if(missingChildId){
        const featureVectorResponse = await axios.post(
          "http://localhost:8000/extract_feature_vector/" + missingChildId,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
  
        console.log("successfully extracted feature vector");
  
        if (featureVectorResponse.data != null) {
          try {
            const featureVectorList = featureVectorResponse.data.FeatureVector;
            console.log(featureVectorList);
            const response = await axios.post(
              "http://localhost:8000/store_feature_vector/"+missingChildId,
              {
                missing_child_id: missingChildId,
                feature_vector: { data: featureVectorList },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };  

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
                  <Form.Control
                    type="text"
                    placeholder="Missing Child Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Form.Group>

                {/* Date of Missing */}
                <Form.Group className="mb-3" controlId="dateOfMissing">
                  <Form.Label>Date of Missing</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfMissing}
                    onChange={(event) => {
                      setDateOfMissing(event.target.value);
                    }}
                  />
                </Form.Group>

                {/* Date of Birth */}
                <Form.Group className="mb-3" controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) => {
                      setDateOfBirth(event.target.value);
                    }}
                  />
                </Form.Group>
                {/* Height */}
                <Form.Group className="mb-3" controlId="height">
                  <Form.Label>Height (in cms)</Form.Label>
                  <Form.Control input="text"
                  name="height"
                  value={height}
                    onChange={(event) => {
                      setHeight(event.target.value);
                    }}
                    ></Form.Control>
                </Form.Group>

                {/* Top Wear */}
                <Form.Group className="mb-3" controlId="topwear">
                  <Form.Label>Top Wear</Form.Label>
                  <Form.Control input="text" 
                  name="topwear"
                  value={topWear}
                    onChange={(event) => {
                      setTopWear(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

              </Col>
              <Col md={6}>
                {/* Gender */}
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={gender}
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>

                {/* Relationship */}
                <Form.Group className="mb-3" controlId="relationship">
                  <Form.Label>Relationship</Form.Label>
                  <Form.Control
                    as="select"
                    name="relationship"
                    value={relationship}
                    onChange={(event) => {
                      setRelationship(event.target.value);
                    }}
                  >
                    <option value="parent">Parent</option>
                    <option value="legalGuardian">Legal Guardian</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Describe how the child was lost"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

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
            checked={mentallyIll === 'yes'}
            onChange ={ (event) => {
              setMentallyIll(event.target.value);
            }
          }
          />
          <Form.Check
            inline
            type="radio"
            label="No"
            value="no"
            name="mentallyIll"
            id="mentallyIllNo"
            checked={mentallyIll === 'no'}
            onChange ={ (event) => {
              setMentallyIll(event.target.value);
            }
          }
          />
        </div>
      </Form.Group>

                {/* Bottom Wear */}
                <Form.Group className="mb-3" controlId="bottomwear">
                  <Form.Label>Bottom Wear</Form.Label>
                  <Form.Control 
                  input="text"
                   name="bottomwear"
                   value={bottomWear}
                    onChange={(event) => {
                      setBottomWear(event.target.value);
                    }}
                   ></Form.Control>
                </Form.Group>

                {/* Identification Marks */}
                <Form.Group className="mb-3" controlId="identificationmarks">
                  <Form.Label>Identification Marks</Form.Label>
                  <Form.Control input="text"
                   name="identificationmarks"
                   value={identificationMarks}
                    onChange={(event) => {
                      setIdentificationMarks(event.target.value);
                    }}
                   ></Form.Control>
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
                <h4>Father / Guardian Details</h4>
                <Form.Group className="mb-3" controlId="fatherName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={fatherName}
                    onChange={(event) => {
                      setFatherName(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatherEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={fatherEmail}
                    onChange={(event) => {
                      setFatherEmail(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatherMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile"
                    value={fatherMobileNumber}
                    onChange={(event) => {
                      setFatherMobileNumber(event.target.value);
                    }}
                  />
                </Form.Group>
              </Col>

              {/* Mother Details */}
              <Col md={6}></Col>
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
                    value={childAdhaarNumber}
                    onChange={(event) => {
                      setChildAdhaarNumber(event.target.value);
                    }}
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
                  <Form.Control
                    type="text"
                    placeholder="state"
                    value={state}
                    onChange={(event) => {
                      setState(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="district">
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="district"
                    value={district}
                    onChange={(event) => {
                      setDistrict(event.target.value);
                    }}
                  />
                </Form.Group>

              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Adress/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="H-No , street , village ..."
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    value={pincode}
                    onChange={(event) => {
                      setPincode(event.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Upload Media */}
        <Tab eventKey="uploadMedia" title="Upload Media">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Alert variant="primary">
                  Upload PNG / JPEG / JPG images under 2 MB.
                </Alert>
                <Form.Group>
                  <Form.Label>Choose a file to upload</Form.Label>
                  <Form.Control
                    name="uploadMedia"
                    type="file"
                    onChange={(event) => {
                      setUploadMedia(event.target.files[0]);
                    }}
                  />
                </Form.Group>

                {/* Submit Button */}
                <Form.Group className="mb-3" controlId="submit">
                  <Button type="submit">Submit</Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div>Save this Id for future references : {missingChildId}</div>
        </Tab>
      </Tabs>
    </div>
  );
}