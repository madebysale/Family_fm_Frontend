import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-phone-number-input/style.css';
import './Form.css';


import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from 'react-phone-number-input';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  company_name: Yup.string().required('Company Name is required'),
});

const Customerpopup = ({ showModal, closeModal, handleAddCustomer }) => {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    company_name: '',
  });

  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState();
  const [error, setError] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      return 'Phone number is required';
    }
    if (!isPossiblePhoneNumber(value)) {
      return 'Invalid phone number';
    }
    return undefined;
  };

  const handleSubmit = async (values, { resetForm }) => {
    const customer = {
      ...values,
      mobile: phone,
    };
   await handleAddCustomer(customer ,resetForm);
    setPhone('');
  };



  return (
    <div className="mt-3 img-con-ad">
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={customerData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Field
                    type="text"
                    name="name"
                    className={`form-control ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Field
                    type="text"
                    name="email"
                    className={`form-control ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <PhoneInput
               
                  className='input-phn'
                    international
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={valid ? null : 'Invalid phone number'}
                    inputprops={{
                      autoFocus: true,
                    
                    }}
                  />
                  {/* ... Other JSX ... */}
                  {phone && (
                    <>
                  
                      {/* <p>
                        Is Possible: {isPossiblePhoneNumber(phone) ? 'true' : 'false'}
                      </p> */}
                      <p style={{color:"red",fontSize:"12px"}}>{isValidPhoneNumber(phone) ? '' : 'invalid phone number'}</p>
                    </>
                  )}
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Field
                    type="text"
                    name="address"
                    className={`form-control ${
                      touched.address && errors.address ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group controlId="company_name">
                  <Form.Label>Company Name</Form.Label>
                  <Field
                    type="text"
                    name="company_name"
                    className={`form-control ${
                      touched.company_name && errors.company_name ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="company_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Add Customer
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Customerpopup;
