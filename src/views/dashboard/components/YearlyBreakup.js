import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';
// import {Pagination} from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { toast } from 'react-toastify';

// import mylogo from "../component/fm_logo.png";
// import view from "../component/view.png.png";
// import{AiOutlineLogout} from 'react-icons/ai'4
import { FiArrowRight } from 'react-icons/fi';
// import { AiOutlineDelete } from 'react-icons/ai';

import './dashboard.css'

import { Input, Select } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Field } from 'formik';
import { Option } from 'antd/es/mentions';
// const isrole = localStorage.getItem('role')

// console.log(isrole ,"isrole")
// console.log(isrole,'sad')

function YearlyBreakup() {
  const navigate = useNavigate();
  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [sales, setsales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const [customer, setcustomer] = useState([]);
  const [contract, setcontract] = useState([]);
  const [agreement, setagreement] = useState([]);
  const [mysales, setmysales] = useState([]);

  useEffect(() => {
    axios
      .post(
        'https://api.familyfm.ltd:8080/api/public/list',
        {
          page: currentPage,
          limit: itemsPerPage,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data.results);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='container'>
     

      <div className="search-admin">
        <Input
          placeholder="Search"
          className="col-3 mt-2 mb-1 mx-3 input"
          value={searchTerm}
          onChange={handleSearch}
        ></Input>

        <div className="table-responsive ">
          {currentItems.length === 0?<h1>No Data Found</h1>:<>
          <Table className="">
            <thead>
              <tr className="head-row">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>event</th>
                <th>Sales rep</th>
                {/* <th>contract Date</th> */}

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                console.log(item, 'sjh');
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="plus-btn">{item.orderid}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.event}</td>
                      <td>{item.sales_rep}</td>
                      {/* <td>{moment(item.contract_date).utc().format('MM/DD/YY')}</td> */}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
          </>}
        </div>
      </div>
    </div>
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
export default YearlyBreakup;
