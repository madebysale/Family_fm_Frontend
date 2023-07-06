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
import { useState ,useEffect } from 'react';
import axios from 'axios';
import YearlyBreakup from './components/YearlyBreakup';
import Recentlsaleslist from './components/Recentsaleslist';
import Mycustomer from './Mycustomer.js';
// import { TabPanel } from '@mui/lab';
import './dashboarddesign.css';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [sales, setsales] = useState([0]);
  const [agreement, setagreement] = useState([0]);
  const [contract, setcontract] = useState([0]);
  const [customer, setcustomer] = useState([0]);

  //////////////////////////////////////////////////
  useEffect(() => {

    axios.post(
        'http://3.142.245.136:8080/api/public/numberofsales')

      .then((response) => {
        setsales(response.data.data);

        console.log(response, 'sds');
      });

  }, []);

  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////

  useEffect(() => {

    axios.post(
        'http://3.142.245.136:8080/api/public/totalcustomer')

      .then((response) => {
        setagreement(response.data.data.totalagreement);
        setcontract(response.data.data.totalcontract)
        setcustomer(response.data.data.totalcustomer)

        console.log(response.data.data.totalAgreement, 'agreement');
      });

  }, []);

  /////////////////////////////////////////////////////////

  // -------------------------------------------------------------//

  
   useEffect(()=>{
       handlecontract()
   })



  function handlecontract(){

    axios
    .post(
      'http://3.142.245.136:8080/api/public/contractlist',
      {},
      {
        headers: { 'x-token': localStorage.getItem('token') },
      },
    )

    .then((response) => {
      setData(response.data.data);
    console.log(response, 'sds');
    });

  }

  // -------------------------------------------------------------------------//

  return (
    <div className="dashhead">
      <div className="container">
     

      <Row spacing={3}>
        <Col item xs={12} sm={6} md={3}>
          <div className="weeklysales box">
            <span className="icons">
              <Icon icon="akar-icons:file" />
            </span>
            <div className='innerbox'>
            {contract.map((con) => {
            
            return (
              
                <h2>{con.total_contract}</h2>
               
            );
          })}
            <h3>Contracts</h3>
              </div>
           
          </div>
        </Col>

        <Col item xs={12} sm={6} md={3}>
          <div className="Agreements box">
            <span className="icons">
              <Icon icon="icon-park:agreement" />
            </span>
            <div className='innerbox'>
            {agreement.map((agree) => {
              console.log(agree,'sdsdd')
            
            return (
              
                <h2>{agree.total_agreement}</h2>
               
            );
          })}
            <h3>Quotations</h3>
            </div>
          </div>
        </Col>
{/* /////////////////////////////////////////////////////////////// */}
        <Col item xs={12} sm={6} md={3}>

        <div className="sales box">
                <span className="icons">
                  <Icon icon="codicon:graph" />
                </span>
                <div className='innerbox'>
          {sales.map((item) => {
            // console.log(item, 'sales');
            return (
              
                <h2>{item.sum_of_roles}</h2>
               
            );
          })}
           <h3>Sales Persons</h3>
           </div>
              </div>
        </Col>

        {/* ///////////////////////////////////////////////////////////////// */}

        <Col item xs={12} sm={6} md={3}>
          <div className="customer box">
            <span className="icons">
              <Icon icon="mingcute:user-1-line" />
            </span>
            <div className='innerbox'>
            {customer.map((agree) => {
              console.log(agree,'customerdd')
            
            return (
              
                <h2>{agree.total_customer}</h2>
               
            );
          })}
            <h3> Total Customers </h3>
            </div>
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
       
        <YearlyBreakup/>
       
    </TabPanel>
    <TabPanel>
      
      <ProductPerformance />
    </TabPanel>
    <TabPanel>
     <Recentlsaleslist/>

    </TabPanel>
    <TabPanel>
 <Mycustomer/>
     
    </TabPanel>
  </Tabs>
       
        </Col>
      
      </Row>
   </Card>

     </div>
    </div>
  );
}
