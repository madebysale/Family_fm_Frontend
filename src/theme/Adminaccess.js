import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {Pagination} from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';

import BootstrapSwitchButton from 'react-bootstrap/Button';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import './Adminpanel.css';
import { RotatingLines } from 'react-loader-spinner';

import { Card } from '@material-ui/core';
import { Grid, Container, Typography } from '@mui/material';

import { Icon } from '@iconify/react';
// sections
import { Col, Row, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignatureModal from './SignatureModal';

import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { Input } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BooleanSchema } from 'yup';




// const VISIBLE_FIELDS = ['First Name', 'last Name', 'country', 'dateCreated', 'isAdmin'];

function Adminaccess() {
  // const params = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const [mainloader, setmainloader] = useState(false);

  // const getdata=()=>{

 

  // const { Data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,




  //   rowLength: 100,})






  const imageurl = "https://contract.familyfm.ltd/static/media/fm_logo.8ab00a202cf2f9daeaa1.png"

  const [status, setStatus] = useState(false);

  const path ="http://localhost/Vibz_FM/uploads/"
  



  const [showModal, setShowModal] = useState(false);
  const [currentsignature, setcurrentsignature] = useState('');


  const openModal = (signature) => {
    setcurrentsignature(signature)
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setcurrentsignature('')

  };

  useEffect(() => {
    setTimeout(() => setmainloader(false), 2000);

    axios
      .post('http://localhost:8080/api/public/adminaccess')

      .then((response) => {
        setData(response.data.data);
        setmainloader(true);
        console.log(response, 'sds');
      })
      .catch((error) => {
        setmainloader(false);
      });
  }, []);

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
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.mobile).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleToggle = (id) => {
    axios.post(`http://localhost:8080/api/public/salesrepverified/${id}`).then((response) => {
      console.log(response.data.id,'11111111');
      setStatus(response.data.data.id === false ? true : false);

      getdata();
      toast.success(response.data.message);
    });
  };


  const getdata=()=>{
    axios.post("http://localhost:8080/api/public/adminaccess" )
  
    .then((response) => {
      setData(response.data.data);
  
      console.log(response, "sds");})
   }




  return (
    <>
      <Container maxWidth="xl dashhead">
      

        <Card className="mb-5 px-3 py-3">
          <div className="mt-3 logout">
            {/* <p style={{border:"none",marginTop:"-5px"}} onClick={handleLogout}>
                   
                    <i style={{color:'red'}}><AiOutlineLogout size={35}/></i>
                    </p> */}
          </div>
          {/* <div className="mt-3  img-con-ad">
     <div className="btn create-invo"><Link to='/admin/form'>Create invoice +</Link></div>  
      
      </div> */}
          {/* <div > */}
          <div className="search-admin">
            <Input
              placeholder="Search"
              className="col-3 mt-2  mb-1 mx-3 input "
              value={searchTerm}
              onChange={handleSearch}
            ></Input>
          
          {/* </div> */}

          {mainloader ? (
            <RotatingLines type="Oval" strokeColor="grey"  height={150} width={150} />
          ) : (
            <div className="table-responsive " id="style-2">
              <Table className="ad-table table-responsive">
                <thead>
                  <tr className="head-row">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>View Signature</th>
                    <th>Action</th>
                    {/* <th>Qty</th> */}
                    {/* <th></th>
        <th></th>*/}
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => {
                    console.log(item.signature,"ffdf")
                    return (
                      <React.Fragment key={index}>
                        <tr onClick={() => handleRowClick(index)}>
                          
                          <td>{item.name}</td>
                          <td>{item.lastname}</td>

                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td className='text-center'>
  {/* Render a button or icon that triggers the modal */}
  <Icon
    style={{ color: 'blue', fontSize: '19px', cursor: 'pointer' }}
    icon="carbon:view"
    onClick={()=>{openModal(item.signature)}}
  />

  {/* Render the SignatureModal component */}
  
</td>

                          <td className="bt-design">
                            <button
                              className={item.status === true ? 'Active': 'Inactive'}
                              onClick={() => handleToggle(item.id)}
                            >
                              {item.status == true ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
          </div>

          <Pagination
            style={{ alignItems: 'center' }}
            itemsPerPage={itemsPerPage}
            totalItems={filteredData.length}
            paginate={paginate}
          />
        </Card>
        <SignatureModal
    showModal={showModal}
    closeModal={closeModal}
    item={currentsignature}
  />
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
       
        <ToastContainer />
      </div>
    );
  }
}
export default Adminaccess;
