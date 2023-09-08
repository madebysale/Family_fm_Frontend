import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './res.css';
import { Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { redirect } from 'react-router';
// console.log(process.env.REACT_APP_REACT_URL)

const AuthLogin = ({ subtitle }) => {
  const [authtoken, setauthtoken] = useState();
  const [checkcode, setcheckcode] = useState(false);
  const token = localStorage.getItem('token');
  const isrole = localStorage.getItem('role');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="auth-form-container">
      <h2>Login </h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          setLoading(true);
          axios
            .post(`https://api.familyfm.ltd:8080/api/public/userlogin`, {
              email: values.email,
              password: values.password,
            })
            .then((response) => {
             

              if (response.data) {
                if (response.data.code !== 200) {
              
                  localStorage.setItem('role', response.data.data.role);

               

                  if (
                    response.data.data.clickup_code === null ||
                    response.data.data.clickup_code === '' ||
                    response.data.data.clickup_code === undefined
                  ) {
                    setcheckcode(false);
                    localStorage.setItem('temporytoken', response.data.token);

                    setauthtoken(response.data.token);
                    console.log('clickup_code_generated');
                    window.location.replace(
                      'https://app.clickup.com/api?client_id=B731VQQSX5AYO97C1KBJIQ0URTQZ6UMW&redirect_uri=https://contract.familyfm.ltd/authorization',
                    );

                  } 
                    if (
                      response.data.data.clickup_code !== null ||
                      response.data.data.clickup_code !== '' ||
                      response.data.data.clickup_code !== undefined
                    ) {
                      axios
                        .post(
                          'https://api.familyfm.ltd:8080/api/public/checkauthrization',
                          {},
                          {
                            headers: { 'x-token': response.data.token },
                          },
                        )
                        .then((res) => {
                          if (res.data.code == 200 || res.data.code == 400) {
                            console.log('else_condition');
                             localStorage.setItem('token', response.data.token);
                            setcheckcode(true);
                            navigate('/dashboard/home', { replace: true });
                            toast.success(response.data.message, {
                              position: toast.POSITION.TOP_CENTER,
                            });



                          } else if (res.data.code === 404) {
                            console.log(res.data.code, '1235');
                           
                            localStorage.setItem('temporytoken', response.data.token);
                            console.log('token');

                            // navigate('/authorization', { replace: true });
                          
                            window.location.replace(
                              'https://app.clickup.com/api?client_id=B731VQQSX5AYO97C1KBJIQ0URTQZ6UMW&redirect_uri=https://contract.familyfm.ltd/authorization',
                            );
                            toast.error('', {
                              position: toast.POSITION.TOP_CENTER,
                            });

                           
                          } 
                        })
                        .catch((error) => {
                          console.log(error);
                          console.log(response.data, 'sds');
                        });
                    }
                  
                } else {
           
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  navigate('/login', { replace: true });
                }
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });

              setLoading(false);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="login-form">
            <Row>
              <Col md={12} className="mt-3">
                <label className="mb-2" htmlFor="email">
                  Email
                </label>
                <Field type="email" name="email" className="form-control-log" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </Col>

              <Col md={12} className="mt-3">
                <label className="mb-2" htmlFor="password">
                  Password
                </label>
                <Field type="password" name="password" className="form-control-log" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </Col>
              <Col md={12}>
                <Link to="/forgetpassword">
                  <div className="link-btn" style={{ float: 'right' }}>
                    Forget password
                  </div>
                </Link>
              </Col>
              <Col md={12} className="text-center">
                <Button type="submit" style={{ marginTop: '15px' }} className="btn-1">
                  {loading ? 'Loading...' : 'Log In'}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      {subtitle}
    </div>
  );
};

export default AuthLogin;
