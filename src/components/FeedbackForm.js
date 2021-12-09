import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function FeedbackForm({setShowFeedback}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState2] = useState('');
    const [validated, setValidated] = useState(false);

    
  const handleFNameChange = e => {
    setName(e.target.value);
};

const handleLNameChange = e => {
  setName(e.target.value);
};

const handleEmailChange = e => {
  setEmail(e.target.value);
};

const handleCityChange = e => {
  setCity(e.target.value);
};

const handleStateChange = e => {
  setState2(e.target.value);
};

const handleSubmit = e => {
  console.log('Submitted the form!! Here are the details:');
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  setValidated(true);
  console.log('Submitted the form!! Here are the details:');
  console.log(name,email,phone,city,state);
};

    
    return (
        <div className="border-0 pt-5 ps-4" style={{backgroundColor:'aliceblue', height: "100%"}}
          >
          <div>
            <ModalHeader className="border-0" closeButton onHide={() => setShowFeedback(false)}>
              <div>
                <h4>Thank you so much for taking the time!</h4>
                <p style={{fontSize:"13px"}}>Please provide the following details</p>
              </div>
            </ModalHeader>
            <div>
            <Form align="left" noValidate validated={validated} style={{paddingTop: "20px"}} className="p-3" onSubmit={handleSubmit}>
                        
              <Form.Group controlId="fname">
                  <Form.Label className="mb-1">First Name</Form.Label>
                  <Form.Control className="mb-3 shadow w-50" type="fname" placeholder="Your First Name" onChange={handleFNameChange} required/>
              </Form.Group>

              <Form.Group controlId="lname">
                  <Form.Label className="mb-1">Last Name</Form.Label>
                  <Form.Control className="mb-3 shadow w-50" type="lname" placeholder="Your Last Name" onChange={handleLNameChange} required/>
              </Form.Group>
              
              <Form.Group controlId="address">
                  <Form.Label className="mb-1">Address</Form.Label>
                  <Form.Control className="mb-3 shadow" rows={4} as="textarea" placeholder="Enter your full postal address" onChange={handleCityChange} required/>
              </Form.Group>

              <Form.Group controlId="country">
                  <Form.Label className="mb-1">State</Form.Label>
                  <Form.Control className="mb-3 shadow w-75" type="country" placeholder="India" onChange={handleStateChange} required/>
              </Form.Group>

              <Form.Group controlId="email">
                  <Form.Label className="mb-1">Email</Form.Label>
                  <Form.Control className="mb-3 shadow w-50" type="email" placeholder="Your Email-ID" onChange={handleEmailChange} required/>
                  <Form.Control.Feedback className="text-danger" type="invalid">
                    Please enter a valid email
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label className="mb-1">Phone Number</Form.Label>
                <PhoneInput placeholder="Your number" defaultCountry="IN" withCountryCallingCode className="w-50 shadow mb-3 phoneInputFormField" value={phone} onChange={setPhone} />  
                {/* <Form.Control.Feedback type="invalid">
                    Please enter a valid number
                </Form.Control.Feedback> */}
              </Form.Group>
              
              <div className="center">
              <Button type="submit" className="fw-bold my-2" style={{width: "220px",background: "#5CC8A1", fontSize: "20px" ,height: "45px"}}>
                  Submit Feedback
              </Button>
              </div>
          </Form>
            </div>
            </div>
        </div>
    )
}

export default FeedbackForm
