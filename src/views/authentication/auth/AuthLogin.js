import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './res.css'
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";




const AuthLogin = ({subtitle}) => {
  


  const token =  localStorage.getItem("token");
  const isrole =  localStorage.getItem("role");
  console.log(isrole)
  const [loading, setLoading] = useState(false);
 
  

  const navigate = useNavigate();
  return (
    <div className="auth-form-container">
 
      <h2>Login </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
        
            .required("Required"),
        })}
        onSubmit={(values) => {
          setLoading(true)
        axios
        .post("http://localhost:8080/api/public/userlogin", {
           email: values.email,
           password: values.password,
           }
             )
             .then((response) => {
         

          console.log(response.data.token)
          if(response.data){
           if(response.data.code !== 200){
            localStorage.setItem("token",response.data.token)
            localStorage.setItem('role',response.data.data.role)
            setTimeout(() => setLoading(false), 2000)
            //  navigate(0)
            navigate('/dashboard/home',{replace:true})
         
        
           
          toast.success(response.data.message,{
            position: toast.POSITION.TOP_CENTER
          })

        
            
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem('role')
            navigate("/login", { replace:true});
           
         
            // toast.error(response.data.message);
          }
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
                <label htmlFor="password">Password</label>
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
            <Button type="submit" style={{marginTop:'15px'}} className="btn-1">
            {loading ? "Loading..." : "Log In"}
            </Button>
           <Link to='/forgetpassword' > <div className="link-btn" style={{float:"right"}}  >
        Forget password
      </div></Link>
          </Form>
        )}
      </Formik>
      
      {subtitle}
      
     



    </div>
  );
};

export default AuthLogin;
