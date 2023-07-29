import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./res.css";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import Logo from 'src/layouts/full/shared/logo/Logo';


const Authresetpassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (

    <Box
    sx={{
      position: 'relative',
      '&:before': {
        content: '""',
        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: '0.3',
      },
    }}
  >
 <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
 <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
    <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
    <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <div className="auth-form-container">
      {/* <h2>Sales Representative</h2> */}
      <h2>Reset password </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            // .min(8, "Must be 8 characters or more")
            .required("Required"),
          otp: Yup.string()
            .min(6, "Must be 6 Number")
            .required("Required"),
        })}
        onSubmit={(values) => {
            setLoading(true)
        axios
        .post("http://localhost:8080/api/public/resetpassword", {
         
          email: values.email,
          password: values.password,
          otp: values.otp,
          
      
        })
        .then((response) => {
          // setSubmitting(false);

         
          console.log(response.data.token)

          if(response.data.code !== 200){
            setTimeout(() => setLoading(false), 2000)
            navigate("/login", { replace: true })
            toast.success(response.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
          } else {
            
          }
        }).catch((error)=>{
            toast.error(error.response.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        })
     

     



        }}
      >
        {({ errors,touched }) => (
          <Form className="login-form">
            <Row>
              <Col>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control-log" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="email">enter otp</label>
                <Field type="number" name="otp" className="form-control-log" />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="password">New Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control-log"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
            <Button type="submit" className="btn-1">
                  {loading ? "Loading..." : "RESET PASSWORD"}
            </Button>
           <Link to='/login' > <div className="link-btn" style={{float:"right"}}  >
        Go to login page
      </div></Link>
          </Form>
        )}
      </Formik>
      
      {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here.
      </button> */}
      
     



    </div>
   
    </Card>
    </Grid>
        </Grid>
    </Box>
  );
};

export default Authresetpassword;
