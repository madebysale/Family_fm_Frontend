import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const numberRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

import { useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import SignaturePad from "./SignaturePad";
// import "yup-phone-lite";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import './res.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { fontSize } from '@mui/system';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),

  // mobile: Yup.string()
  //   .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number')
  //   .required('Phone is required'),


  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(uppercaseRegex, 'Password must contain at least one uppercase letter')
    .matches(lowercaseRegex, 'Password must contain at least one lowercase letter')
    .matches(numberRegex, 'Password must contain at least one number')
    .matches(specialCharRegex, 'Password must contain at least one special character'),

  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // signature: Yup.mixed().required("Signature is required"),
});


const AuthRegister = ({ subtitle }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('file1');
  // const [mysign, setmysign] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState(null);
  const [signatureerror, setSignatureError] = useState(false);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
    console.log(event.target.value);

    const value = event.target.value;
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    console.log(phone);
    setPhoneValidation(validatePhoneNumber(value));
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

  function handleFileSelect(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const signRef = useRef();
  const handleClear = () => {
    console.log(signRef.current.clear());
    setFile('');
  };

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  const handle = () => {
    if (
      signRef.current === '' ||
      signRef.current === undefined ||
      signRef.current === null ||
      signRef.current.isEmpty()
    ) {
      return;
    } else {
      const base64String = signRef.current.toDataURL(); // Replace with your base64 string
      const fileName = 'image.png'; // Replace with the desired file name

      const byteString = atob(base64String.split(',')[1]);
      const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], fileName, { type: 'image/png' });

      setFile(file);
    }

    console.log(file, 'file');
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          signature: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          setLoading(true);

          if (file === '' || file === undefined || file === null) {
            setSignatureError(true);
            setTimeout(() => setLoading(false), 100);
          } else {
            if (!phoneValidation) {
              setSignatureError(true);
              setSubmitting(false); // Set submitting to false to re-enable form submission
              return;
            }

            setSignatureError(false);
            setLoading(true);
            const formData = new FormData();

            formData.append('name', values.name);
            formData.append('lastname', values.lastname);
            formData.append('email', values.email);
            formData.append('mobile', phone);
            formData.append('password', values.password);
            formData.append('signature', file);

            console.log(values, 'resgister');
            axios
              .post(
                'http://192.168.29.28:8080/api/public/user',
                formData,

                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
              .then((response) => {
                setTimeout(() => setLoading(false), 2000);
                toast.success(response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
                if (response.data.code !== 200) {
                  navigate('/login', { replace: true });
                }

                console.log(response.data.data, 'role res');
              })
              .catch((error) => {
                toast.warn(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER,
                });

                setLoading(false);
              });
          }

          console.log(file);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="register-form">
            <div className="container-grid">
              <div className='label-input-div'>
                <label htmlFor="name">First name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="First Name"
                  className="form-control-log"
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback-er" />
              </div>
              <div className='label-input-div'>
                <label htmlFor="lastname">Last name</label>
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control-log"
                />
                <ErrorMessage name="lastname" component="div" className="invalid-feedback-er" />
              </div>
              <div className='label-input-div'>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  className="form-control-log"
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback-er" />
              </div>
              <div controlId="mobile" className='label-input-div'>
                <label>Mobile</label>
                <PhoneInput
                  className="input-phn"
                  international
                  name="mobile"
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value); // Update the phone state
                    setFieldValue('mobile', value); // Update the 'mobile' field inside Formik
                  }}
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
                    <p style={{ color: 'red', fontSize: '12px' }}>
                      {isValidPhoneNumber(phone) ? '' : 'invalid phone number'}
                    </p>
                  </>
                )}
              </div>

              <div  className='label-input-div'>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  className="form-control-log"
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback-er" />
              </div>

              <div className='label-input-div'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  className="form-control-log"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback-er"
                />
              </div>
            </div>

            <div className=" row">
              <div className="col">
                <input
                  checked={selectedFile === 'file1'}
                  type="radio"
                  name="fileAttachment"
                  value="file1"
                  onChange={handleFileChange}
                />
                Signature
              </div>
              <div className="col">
                <input
                  style={{ fontSize: '18px', fontWeight: '500' }}
                  type="radio"
                  name="fileAttachment"
                  value="file2"
                  onChange={handleFileChange}
                />{' '}
                {/* <span style={{fontSize:"18px" , fontWeight:'500',width:"50px"}}> */}
                Attach your signature
                {/* </span> */}
              </div>
              {selectedFile === 'file1' ? (
                <>
                  <div className="signature-pad-res" id="canvas-signature">
                    <SignatureCanvas ref={signRef} options={options} onEnd={handle} />
                    {signatureerror ? (
                      <>
                        <span style={{ color: 'red' }}>Signature is required !</span>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="sign-res-btn-res">
                      <Button className="sign-button-res" onClick={handleClear}>
                        Clear
                      </Button>
                      {/* <Button className="sign-button-1-res" onClick={handle}>
                     Save
                   </Button> */}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {selectedFile === 'file2' ? (
                <>
                  <div id="signature" style={{ height: '170px' }}>
                    <input
                      type="file"
                      checked={selectedFile === 'file2'}
                      onChange={handleFileSelect}
                    />
                    {/* {(signatureerror)?<><div  style={{color:"red"}}>Signature is required !</div></>:<></>} */}
                    {/* <ErrorMessage name="signature" component="div" className="invalid-feedback-er" /> */}
                    {preview && (
                      <img
                        src={preview}
                        id="signature"
                        alt="File preview"
                        style={{ width: '70%', height: '80%' }}
                      />
                    )}
                    {signatureerror ? (
                      <>
                        <div style={{ color: 'red' }}>Signature is required !</div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <button type="submit" className="btn-1 btn-primary" style={{ marginTop: '25px' }}>
              {loading ? 'Loading...' : 'Signup'}
            </button>
          </Form>
        )}
      </Formik>

      {subtitle}
    </div>
  );
};

export default AuthRegister;
