// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row, Button } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Box, styled } from '@mui/material';
// import { Breadcrumb, SimpleCard } from "app/components";
import ProductPerformance from './components/ProductPerformance.js';
import { Card } from '@material-ui/core';
import avtar1 from '../../assets/images/customer/avatar_1.jpg';
import avtar2 from '../../assets/images/customer/avatar_2.jpg';
import avtar3 from '../../assets/images/customer/avatar_4.jpg';
import avtar4 from '../../assets/images/customer/avatar_11.jpg';
import avtar5 from '../../assets/images/customer/avatar_24.jpg';
import avtar6 from '../../assets/images/customer/avatar_1.jpg';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";




import axios from 'axios';
import YearlyBreakup from './components/YearlyBreakup';
import Recentlsaleslist from './components/Recentsaleslist';
import Mycustomer from './Mycustomer.js';
import SweetAlert from 'react-bootstrap-sweetalert';
// import Swal from "sweetalert2";
// import { TabPanel } from '@mui/lab';
import './dashboarddesign.css';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [sales, setsales] = useState([0]);
  const [agreement, setagreement] = useState([0]);
  const [contract, setcontract] = useState(0);
  const [customer, setcustomer] = useState([0]);
  // const [showAlert, setShowAlert] = useState(false);











  //////////////////////////////////////////////////
  useEffect(() => {
    axios
      .post('https://api.familyfm.ltd:8080/api/public/numberofsales',{},
      {
        headers: { 'x-token': localStorage.getItem('token') },

      },
      )

      .then((response) => {

    
        setsales(response.data.data);

        if(response.data.code ==401){
          navigate('/login', { replace: true });
          localStorage.removeItem('token')
        }
      });
  }, []);

  

  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    axios
      .post('https://api.familyfm.ltd:8080/api/public/totalcustomer'
     )



      .then((response) => {
      
       



        setagreement(response.data.data.totalagreement.total_agreement);
        setcontract(response.data.data.totalcontract.total_contract);
        setcustomer(response.data.data.totalcustomer.total_customer);

        console.log(response.data.data.totalcontract.total_contract, 'agreement');
      });


  }, []);

  /////////////////////////////////////////////////////////

  //------------------------------------------------------//

  useEffect(() => {
    handlecontract();
  });

  function handlecontract() {



    axios
      .post(
        'https://api.familyfm.ltd:8080/api/public/contractlist',
        {},
      
      )

      .then((response) => {
        setData(response.data.data);
      });
  }

  // -
  // ------------------------------------------------------------------------//

  // const showAlert = () => {
  //   Swal.fire({
  //     title: "Message Sent",
  //     text: "Thank you for contacting us.We will get back to you asap.",
  //     icon: "success",
  //     confirmButtonText: "OK",
  //   });
  // };

  return (
    
    <div className="dashhead">

      
      <div className="container-fluid">
      {/* <SweetAlert
        show={showAlert}
        title="API Response Success!"
        onConfirm={handleCloseAlert}
      >
        The API call was successful!
      </SweetAlert> */}
        <Row >
          <Col item xs={6} sm={6} md={3}>
            <div className="weeklysales box" onClick={() => navigate(`/dashboard/contract`)} style={{cursor:'pointer'}} >
           
              <div className="innerbox">
              <span className="icons">
                <Icon icon="akar-icons:file" />
              </span>
                {console.log(contract,'852123')}
                <h2>{contract === null ? '0' : contract}</h2>

                
              </div>
              <h3>Contracts
               
                </h3>
            </div>
          </Col>

          <Col item xs={6} sm={6} md={3}>
            <div className="Agreements box" onClick={() => navigate(`/dashboard/agreementlist`)} style={{cursor:'pointer'}} >
            
              <div className="innerbox">
              <span className="icons">
                <Icon icon="icon-park:agreement" />
              </span>
                <h2>{agreement === null ? '0' : agreement}</h2>

              </div>
              
              <h3>Quotations</h3>
            </div>
          </Col>
          {/* /////////////////////////////////////////////////////////////// */}
          <Col item xs={6} sm={6} md={3}>
            <div className="sales box"onClick={() => navigate(`/dashboard/salesperson`)} style={{cursor:'pointer'}}  >
             
              <div className="innerbox">
              <span className="icons">
                <Icon icon="codicon:graph" />
                
              </span>
                {sales.map((item) => {
                  // console.log(item, 'sales');
                  return <h2>{item.sum_of_roles}</h2>;
                })}
               
              </div>
              <h3>Sales Persons</h3>
            </div>
          </Col>

          {/* ///////////////////////////////////////////////////////////////// */}

          <Col item xs={6} sm={6} md={3}>
            <div className="customer box" onClick={() => navigate(`/dashboard/Customer`)} style={{cursor:'pointer'}} >
             
              <div className="innerbox">
              <span className="icons">
                <Icon icon="mingcute:user-1-line" />
              </span>
                <h2>{customer=== null ? '0': customer}</h2>

               
              </div>
              <h3> Total Customers </h3>
            </div>
          </Col>
        </Row>
        <Card className="mt-3 px-3 py-3">
          <Row>
            <Col item xs={12} sm={12} md={12}>
              <h3 className="mt-3 heading-nw"> Recent List</h3>
              <Tabs>
                <TabList>
                  <Tab>Contracts </Tab>
                  <Tab>Quotations</Tab>
                  <Tab>Sales Persons</Tab>
                  <Tab>Customers </Tab>
                </TabList>

                <TabPanel>
                  <YearlyBreakup />
                </TabPanel>
                <TabPanel>
                  <ProductPerformance />
                </TabPanel>
                <TabPanel>
                  <Recentlsaleslist />
                </TabPanel>
                <TabPanel>
                  <Mycustomer />
                </TabPanel>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
