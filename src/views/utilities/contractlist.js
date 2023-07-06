import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import {RotatingLines} from 'react-loader-spinner';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
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



function Contractlist() {
  const navigate = useNavigate();
  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const[mainloader,setmainloader] = useState(false);
  const[totalrow,settotalrow] = useState('');


  useEffect(() => {

   

      setIsrole(parseInt(localStorage.getItem('role')));
      setTimeout(() => setmainloader(false), 2000)

    axios
      .post(
        'http://3.142.245.136:8080/api/public/list',
        {
          page:currentPage,
          limit:itemsPerPage,
        },
        {
          headers: {'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data.results);
        settotalrow(response.data.totalRows)
        console.log(response.data.totalRows,"pa")
        setmainloader(true)

      }).catch((error)=>{
        console.log(error.response.data.message,'errod')
        setmainloader(false);
        toast.error(error.response.data.message);
      })

    
  }, [Delete,currentPage]);


 

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (rowIndex) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
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
      String(item.phone).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.sales_rep).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.event).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.orderid).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
 
  const paginate = (pageNumber) =>setCurrentPage(pageNumber)
  



  const onDelete = (id) => {
    axios
      .post(`http://3.142.245.136:8080/api/public/delete/${id}`)
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
      <Container maxWidth="xl dashhead">
      {/* <h3 className='mt-5 heading-nw'>Quotations List</h3> */}
       
        <div className="header-div"></div>

      
        <Card className='mt-3 py-3 px-3'>

        
                   <div className="mt-3  img-con-ad">
     <div className="btn create-invo"><Link to='/dashboard/agreement'>Create Quotation +</Link></div>  
      
      </div>
        <div className="search-admin">
          <Input
            placeholder="Search"
            className="col-3 mt-2 mb-1 mx-3 input"
            value={searchTerm}
            onChange={handleSearch}
          ></Input>

{mainloader ? (
      <RotatingLines type="Oval" strokeColor="grey" height={150} width={150} />
    ) : (

    
          <Table className="ad-table " style={{}}>
            <thead>
              <tr className="head-row">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Event</th>
                <th>Sales rep</th>
              
              
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => {
                 
                return (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(index)}>
                      <td >
                        {item.orderid}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.event}</td>
                      <td>{item.sales_rep}</td>
                      {/* <td>{moment(item.contract_date).utc().format('MM/DD/YY')}</td> */}
                      <td>
                      <Icon style={{color:'green',fontSize: '19px'}} icon="akar-icons:edit" onClick={() =>navigate(`/dashboard/updateagreement/${item.id}`)} />
                          </td>
                      <td>
                        {/* <img src={view} alt="React view"className="view-img" onClick={()=>navigate(`/admin/viewdetail/${item.id}`,{replace:true})}/> */}
                        <Icon style={{color:'blue', fontSize: '19px',cursor:'pointer'}} icon="carbon:view"  onClick={() => navigate(`/dashboard/viewdetail/${item.id}`)} />
                        {/* <i
                          style={{ color: '#4570EA', cursor: 'pointer' }}
                         
                        >
                          <GrOverview size={25} />
                        </i> */}
                      </td>
                      <td>
                      <Icon style={{color:'red', fontSize: '19px',cursor:'pointer'}} icon="fluent:delete-32-regular" onClick={() => onDelete(item.id)} />
                      
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
           totalItems={totalrow}
           paginate={paginate}
          
    
        />
        </Card>
      </Container>
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
export default Contractlist;
