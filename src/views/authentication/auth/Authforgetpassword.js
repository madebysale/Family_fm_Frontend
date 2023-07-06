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


const AuthForgetpassword = () => {
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
      <h2>Forget password </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values) => {
            setLoading(true)
          axios
            .post("http://3.142.245.136:8080/api/public/forgetpassword", {
              email: values.email,
            })
            .then((response) => {
           
           

              if (response.data.code !== 200) {
                setTimeout(() => setLoading(false), 1000)
                toast.success(response.data.message,{
                    position: toast.POSITION.TOP_CENTER

                });
                navigate("/resetpassword", { replace: true })
              } else {
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              }
                );
              setLoading(false)
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="login-form">
            <Row>
              <Col>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control-log" placeholder="Enter your email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <Button type="submit" className="btn-1">
            {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>

      <Link to="/login">
        <button className="link-btn">Go to login page</button>
      </Link>
    </div>
   
    </Card>
    </Grid>
        </Grid>
    </Box>
  );
};

export default AuthForgetpassword;
