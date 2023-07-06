import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { toast } from 'react-toastify';
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



function Mycustomer() {
  const navigate = useNavigate();
  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const[mypdf,setmypdf]= useState([])
  const[mainloader,setmainloader] = useState(false);


  useEffect(() => {

      setIsrole(parseInt(localStorage.getItem('role')));
      setTimeout(() => setmainloader(false), 2000)

    axios
      .post(
        'http://3.142.245.136:8080/api/public/customerlist',
        {},
        {
          headers: {'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data);
        setmypdf(response.data.data)
        setmainloader(true)
       
        console.log(response, 'sds');
      }).catch((error)=>{
        console.log(error.response.data.message,'errod')
        setmainloader(false);
        toast.error(error.response.data.message);
      })

    
  }, [Delete]);



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
      // String(item.event).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



 
  const onDelete = (id) => {
    axios
      .post(`http://3.142.245.136:8080/api/public/customerdelete/${id}`)
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

  return (
    <>
   
    
    
        <div className="header-div"></div>

       
        <Card className='mt-3 py-3 px-3'>

        <div className="mt-3 logout">
            
                    </div>
                  
        <div className="search-admin">
          <Input
            placeholder="Search"
            className="col-3 mt-2 mb-1 mx-3 input"
            value={searchTerm}
            onChange={handleSearch}
          ></Input>

          

      
          <Table className="ad-table " style={{}}>
            <thead>
              <tr className="head-row">
              
                <th>ID</th>
                <th>Customer Name</th>
                <th>Phone No.</th>
                <th>Eamil</th>
                <th>Total Quotation</th>
                <th>Total Contract</th>
               
           
             
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                
                return (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(index)}>
                      <td>
                        {item.id}
                      </td>
                   
                      <td>{item.name}</td>
                  
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                     <td>{item.quotation}</td>
                     <td>{item.contract}</td>
                     
                    
                     
              
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
       
        </div>

        {/* <Pagination
           style={{alignItems:'center'}} 
           itemsPerPage={itemsPerPage}
           totalItems={filteredData.length}
           paginate={paginate}
          
        /> */}
        </Card>
    
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
export default Mycustomer;
