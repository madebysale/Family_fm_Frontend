import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from 'react-phone-number-input';


import {RotatingLines} from 'react-loader-spinner';
// import "./Adminpanel.css";
// import mylogo from "../component/fm_logo.png";
// import view from "../component/view.png.png";
// import{AiOutlineLogout} from 'react-icons/ai'4
import { FiArrowRight } from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrOverview } from 'react-icons/gr';
import { CiEdit } from 'react-icons/ci';

import { Input, Select } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Field } from 'formik';
import { Option } from 'antd/es/mentions';
import { Grid, Container, Typography } from '@mui/material';
// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row} from "react-bootstrap";
import {
  Card,
 
} from '@material-ui/core';
import Pdf from 'src/views/utilities/Pdf';
import ConfirmationModal from 'src/views/utilities/ConformationModal';

import './Form.css'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // mobile: Yup.string()
  // // .test("phone-number", "Invalid phone number")
  // .required("Mobile is required"),
  address: Yup.string().required('Address is required'),
  company_name: Yup.string().required('company Name is required'),
 
});

function Customer() {
  const navigate = useNavigate();
  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const[adddata,setadddata]=useState()
  const[mypdf,setmypdf]= useState([])
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(true);
  const[mainloader,setmainloader] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    company_name: '',
   
  });


   var myrole = localStorage.getItem('role')
 

  useEffect(() => {

      setIsrole(parseInt(localStorage.getItem('role')));
      setTimeout(() => setmainloader(false), 2000)
      

    axios
      .post(
        'https://api.familyfm.ltd:8080/api/public/customerlist',
        {},
        {
          headers: {'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data);
        setmypdf(response.data.data)
        setmainloader(true)
        
        if (response.data.code == 401) {
          navigate('/login', { replace: true });
          localStorage.removeItem('token');
          toast.error(response.data.message.message);
        }
       
      }).catch((error)=>{
        // console.log(error.response.data.message,'errod')
        setmainloader(false);
        toast.error(error.response.data.message);
      })

    
  }, [Delete ,adddata ]);


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



  const handleSubmit = (values, { resetForm }) => {
    const customer = {
      ...values,
      mobile: phone,
    };
    handleAddCustomer(customer ,resetForm);

    console.log(handleAddCustomer(customer.mobile),'dssdss')
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // const validatePhoneNumber = (value) => {
  //   const isValid = isValidPhoneNumber(value);
  //   return isValid ? undefined : 'Invalid phone number';
  // };
 

  
  const handleAddCustomer = (customer, resetForm ) => {
    // Perform actions to add customer using values
    // const customer = {
    //   ...values,
    //   mobile: phone,
    // };
    // handleAddCustomer(customer);

    console.log(customer.mobile)

    // console.log(values,'dd4545cusmainsdd')
    axios
    .post(
      'https://api.familyfm.ltd:8080/api/public/createcustomer',
         {
          name:customer.name,
          email:customer.email,
          mobile:customer.mobile,
          address:customer.address,
          company_name:customer.company_name
         },


    
    )
    .then((resp) => {
      
      if (resp.data.code === 400) {
        // setTimeout(() => setLoading(false), 1000);
   
        toast.error(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
  

      console.log(resp.data, 'hjjhjhj');
       if (resp.data.code === 200) {
        setadddata(!adddata)
        toast.success(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

       
      }
    })
    .catch((err) => {
      // setLoading(false);

      console.log(err.response, 'err-message');

      // toast.error(err.message, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    });


    // Reset form fields and close modal
    resetForm();
    setShowModal(false)
    
  };



  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = Data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(item.contract_date)
        .utc()
        .format('Do MMMM, YYYY')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.mobile).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    
      String(item.id).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



 
  const onDelete = (id) => {
    axios
      .post(`https://api.familyfm.ltd:8080/api/public/customerdelete/${id}`)
      .then((response) => {
        console.log(response.data);
        if(response.code!==200){
          setDelete(!Delete)
        
        }
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      });
  };

  const handleDeleteClick = (id) => {
    setItemIdToDelete(id);
    setShowConfirmation(true);
  };
  
  const handleConfirm = () => {
    if (itemIdToDelete) {
      axios
      .post(`https://api.familyfm.ltd:8080/api/public/customerdelete/${itemIdToDelete}`)
  
        .then((response) => {
          console.log(response.data);
          if (response.code !== 200) {
            setDelete(!Delete);
            // Perform any necessary actions on delete failure
          }
          toast.success(response.data.message);
        })
        .catch((error) => {
          // Handle error if API request fails
        });
      console.log("Item deleted!");
      setShowConfirmation(false);
    }
  };
  
  const handleCancel = () => {
    console.log("Deletion canceled.");
    setShowConfirmation(false);
  };

  return (
    <>
      <Container maxWidth="xl dashhead mt-3">
    
    
        {/* <div className="header-div"></div> */}

       
        <Card className='mt-6 py-3 px-3' >

          {/* <div className=""> */}
      {/* <button className="btn create-invo" onClick={() => setShowModal(true)}>
        Add Customer +
      </button> */}


      <Modal  show={showModal} onHide={() => setShowModal(false)} style={{marginTop:"50px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              address: '',
              company_name: '',
             
            }}
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
                <Form.Group controlId="name">
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
                     defaultCountry="RU"

                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={valid ? null : 'Invalid phone number'}
                  />
                  {/* ... Other JSX ... */}
                  {phone && (
                    <>
                  
                      {/* <p>
                        Is Possible: {isPossiblePhoneNumber(phone) ? 'true' : 'false'}
                      </p> */}
                      <p style={{color:'red',fontSize:"12px"}}>{isValidPhoneNumber(phone) ? '' : 'invalid phone number'}</p>
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
                  <Form.Label>company name</Form.Label>
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

                {/* Repeat Form.Group, Field, and ErrorMessage for other fields */}

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
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
    


                  
        <div className="search-admin">

          <Input
            placeholder="Search"
            className="col-3 mt-2 mb-1 mx-3 input"
            value={searchTerm}
            onChange={handleSearch}
          ></Input>
        
                <div className=' col-6' style={{float:'right'}}>
<div className="add-cust-btn">
                    <button
                      className="btn create-invo"
                   
                      onClick={() =>  setShowModal(true)}
                    >
                      Add Customer +
                    </button>

                 
                  </div>     
                 
                  </div>

          
{mainloader ? (
      <RotatingLines type="Oval" strokeColor="grey" height={150} width={150} />
    ) : (

          <Table className="ad-table table-responsive " style={{}}>
            <thead>
              <tr className="head-row text-center">
              
                <th>ID</th>
                <th>Customer Name</th>
                <th>Phone No.</th>
                <th>Eamil</th>
                <th>Address</th>
                <th>Total Quotation/Contract</th>
               
                {
                        (myrole==3)?<></>:<th>Delete</th>

                      }
                
               
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                
                return (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(index)} className='tr-whitespace text-center'>
                      <td>
                        {item.id}
                      </td>
                   
                      <td>{item.name}</td>
                  
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                     <td>{item.quotation}/{item.contract}</td>
                  
                     <td>
                      {
                        (myrole==3)?<></>:<Icon style={{color:'red', fontSize: '19px',cursor:'pointer'}} icon="fluent:delete-32-regular" onClick={() => handleDeleteClick(item.id)} />

                      }
                      
                      </td>
                    
                     
              
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
             )}
        </div>

        <Pagination
           style={{alignItems:'center'}} 
           itemsPerPage={itemsPerPage}
           totalItems={filteredData.length}
           paginate={paginate}
          
        />
        </Card>
      </Container>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this Customer?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          itemId={itemId}
        />
      )}
    </>
  );

  function Pagination({ itemsPerPage, totalItems, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className="page-link"
                disabled={number === currentPage}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
 
    
  }
}
export default Customer;
