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

function IHaveSightedChild() {
  const [sighted, setSighted] = useState(false);
  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");

  const [basicDetails, setBasicDetails] = useState({
    name: "",
    dateOfSighting: "",
    description: "",
    gender: "male",
    reason: "",
    phoneNumber: "",
  });

  const [locationDetails, setLocationDetails] = useState({
    sightedState: "",
    sightedDistrict: "",
    sightedAddress: "",
    sightedPincode: "",
  });

  const [uploadMedia, setUploadMedia] = useState("");

  const handleBasicDetailsChange = (event) => {
    setBasicDetails({
      ...basicDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleLocationDetailsChange = (event) => {
    setLocationDetails({
      ...locationDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUploadMediaChange = (event) => {
    setUploadMedia(event.target.files[0]);
  };

  const [sightedChildId, setSightedChildId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", basicDetails.name);
    formData.append("dateOfSighting", basicDetails.dateOfSighting);
    formData.append("description", basicDetails.description);
    formData.append("gender", basicDetails.gender);
    formData.append("reason", basicDetails.reason);
    formData.append("sightedAddress", locationDetails.sightedAddress);
    formData.append("sightedDistrict", locationDetails.sightedDistrict);
    formData.append("sightedPincode", locationDetails.sightedPincode);
    formData.append("sightedState", locationDetails.sightedState);
    formData.append("testImage", uploadMedia);

    try {
      const response = await axios.post(
        "http://localhost:5000/sightedchild",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const sightedChildId = response.data;
      setSightedChildId(sightedChildId);
      setSighted(true);

      if (sightedChildId) {
        const featureVectorResponse = await axios.post(
          "http://localhost:8000/extract_feature_vector_sighted/" +
            sightedChildId,
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
              "http://localhost:8000/store_feature_vector_sighted/" +
                sightedChildId,
              {
                sighted_child_id: sightedChildId,
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
            console.log(error);
          }

          try {
            const searchResponse = await axios.post(
              "http://localhost:8000/search_image/" + sightedChildId,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
            console.log(searchResponse.data);
            if (searchResponse.data.result === "found") {
              setSighted(true);
              if (sighted === true) {
                console.log(searchResponse);
                setFatherEmail(searchResponse.data.father_email);
                setFatherName(searchResponse.data.father_name);

                //send mail
                //message
                const message = `

Dear ${fatherName},

We have some great news to share with you - we have located your missing child at ${locationDetails.sightedAddress}! We understand this must be a tremendous relief for you and your family, and we are honored to have played a part in bringing your child back to you.

The person who sighted your child has provided us with the following details:

Contact Details:

${basicDetails.name},
${basicDetails.phoneNumber},
${basicDetails.reason},
${basicDetails.description}

Date: ${basicDetails.dateOfSighting}

Location Details:

${locationDetails.sightedAddress},
${locationDetails.sightedDistrict},
${locationDetails.sightedState},
${locationDetails.sightedPincode}

Please reach out to us as soon as possible so we can connect you with this person and provide further assistance as needed. Our team is dedicated to supporting families in these difficult situations, and we are here to help you in any way we can.

Thank you for entrusting us with your search, and we wish you all the best as you reunite with your child.

Sincerely,
Team Child Chaser`;

                try {
                  const response = await axios.post(
                    "http://localhost:8000/send-email",
                    {
                      sender_email_id: "newbie021122@gmail.com",
                      sender_email_id_password: "mmjqqhvvtskvfuop",
                      receiver_email_id: fatherEmail,
                      message: message,
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
                  console.log(error);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "block", width: "80%", padding: 20 }}>
      <h4>I Have Sighted A Child</h4>
      <Tabs defaultActiveKey="basicDetails" fill variant="tabs">
        {/* Basic Details */}
        <Tab eventKey="basicDetails" title="Basic Details">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                {/* Name */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={basicDetails.name}
                    onChange={handleBasicDetailsChange}
                  />
                </Form.Group>

                {/* Date of Sighting */}
                <Form.Group className="mb-3" controlId="dateOfSighting">
                  <Form.Label>Date of Sighting</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfSighting"
                    value={basicDetails.dateOfSighting}
                    onChange={handleBasicDetailsChange}
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Describe how the child was found"
                    name="description"
                    value={basicDetails.description}
                    onChange={handleBasicDetailsChange}
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
                    value={basicDetails.gender}
                    onChange={handleBasicDetailsChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>

                {/* Reason */}
                <Form.Group className="mb-3" controlId="reason">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Please explain the reason why you think child is lost"
                    name="reason"
                    value={basicDetails.reason}
                    onChange={handleBasicDetailsChange}
                  ></Form.Control>
                </Form.Group>
                {/* Phone number */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={basicDetails.phoneNumber}
                    onChange={handleBasicDetailsChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Location Details */}
        <Tab eventKey="locationDetails" title="Location Details">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sightedState">
                  <Form.Label>SightedState</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="state"
                    name="sightedState"
                    value={locationDetails.sightedState}
                    onChange={handleLocationDetailsChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sightedDistrict">
                  <Form.Label>Sighted District</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="district"
                    name="sightedDistrict"
                    value={locationDetails.sightedDistrict}
                    onChange={handleLocationDetailsChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="sightedAddress">
                  <Form.Label>Sighted Adress/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="H-No , street , village ..."
                    name="sightedAddress"
                    value={locationDetails.sightedAddress}
                    onChange={handleLocationDetailsChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sightedPincode">
                  <Form.Label>Sighted Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="sightedPincode"
                    value={locationDetails.sightedPincode}
                    onChange={handleLocationDetailsChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* Upload Image */}
        <Tab eventKey="uploadMedia" title="Upload Media">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={12}>
                <Alert variant="primary">Upload PNG / JPEG / JPG images under 2 MB.</Alert>
                <Form.Group>
                  <Form.Label>Choose a file to upload</Form.Label>
                  <Form.Control
                    type="file"
                    name="uploadMedia"
                    onChange={handleUploadMediaChange}
                  />
                </Form.Group>
                {/* Submit Button */}
                <Form.Group className="mb-3" controlId="submit">
                  <Button type="submit">Submit</Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div>Save this Id for future references : {sightedChildId}</div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default IHaveSightedChild;