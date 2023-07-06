import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas';

import { AiOutlineLogout } from 'react-icons/ai';

import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import { Formik, Field } from 'formik';
import { TimePicker } from 'antd';

import axios from 'axios';
import SignaturePad from './SignaturePad';
import moment from 'moment';
import * as Yup from 'yup';



import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import { Termcondition } from './Termcondition';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import { Grid, Container, Typography } from '@mui/material';
// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row} from "react-bootstrap";

import './Form.css';

const { RangePicker } = DatePicker;

const validationSchema = Yup.object({
  // Contract_date: Yup.date().required('Required'),
  // sales_rep: Yup.string().required('Required'),

  // Advertiser: Yup.string().required('Required'),

  // name: Yup.string().required('Required'),

  // event: Yup.string().required('Required'),

  // phone: Yup.string()
  //   .matches(/^[0-9]{10}$/, 'Invalid phone number')
  //   .required('Required'),

  // email: Yup.string().email('Invalid email address').required('Required'),

  // start_date: Yup.date(),
  // end_date: Yup.date().min(Yup.ref('start_date'), "end date can't be before start date"),

  // termsAndConditions: Yup.bool().oneOf([true], 'accept the t&C'),
});

const Foam = () => {
  const navigate = useNavigate();

  const [product_type, setproduct_type] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [event, setevent] = useState('');
  const [rate, setrate] = useState('');
  const [discount, setdiscount] = useState('');
  const [cost, setcost] = useState('');
  const [cost_tax, setcost_tax] = useState('');

  const [discounted_cost, setdiscounted_cost] = useState('');

  const [rowsData, setRowsData] = useState([]);

  const [dates, setDates] = useState([]);
  const [startdate, setstartdate] = useState('');
  const [enddate, setenddate] = useState('');
  const [starttime, setstarttime] = useState('');
  const [endtime, setendtime] = useState('');
  const [qty, setqty] = useState('');
  const [mysign, setmysign] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState([]);
  const [mysignerror, setmysignerror] = useState(false);
  const [paymentdue, setpaymentdue] = useState(
    'This payment of balance due will be billed over a two month period. The 1st in April 25th and the next on 15 may',
  );
  const [errorMessage, setErrorMessage] = useState(false);
  const [storage, setstorage] = useState([]);
  const [myupdata, setmyupdata] = useState([]);
  const [name, setname] = useState('');
  const [contractdate, setcontractdate] = useState('');
  const [salesrep, setsalesrep] = useState('');
  const [Advertiser, setAdvertiser] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [myevent, setmyevent] = useState('');
  const [id, setid] = useState(false);
  const[myproduct,setmyproduct]=useState('')
  const[myproduct1,setmyproduct1]=useState('')
  const[porductitem,setproductitem]=useState([])
  
  const [datascan, setdatascan] = useState([]);
  const [temprarydatascan, settemprarydatascan] = useState([]);
  const[mycost,setmycost]=useState('')
  const [trade,settrade]=useState('')
  const [abst,setabst]=useState('')
  const [grandtotal,setgrandtotal]=useState('')
  const [discountabst,setdiscountabst] = useState('')
  const [itemlist,setitemlist] = useState('')


  const [error, seterror] = useState('');

  const [fields, setFields] = useState([
    {
      product_type: '',
      runDates:'',
      perWeeks:'',
      rate: '',
      discount: '',
      cost: '',
      cost_tax: '',
      discounted_cost:'',
      total: '',
      monday: "",
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      qty: '',
      runTimes: '',
    },
  ]);

  const params = useParams();
  console.log(params.id, 'ds');
  const [dataapi, setDataapi] = useState([]);

  useEffect(() => {
    axios
      .post('http://3.142.245.136:8080/api/public/agreementlist',{
        id: params.id,
      },{
        headers: {'x-token': localStorage.getItem('token') },
      }
      )
      .then((response) => {
        setid(response.data.data.details[0].id);
        setDataapi(response.data.data.details);
        setproductitem(response.data.data.itemlist)
        setname(response.data.data.details[0].name);
        
        setsalesrep(response.data.data.details[0].sales_rep);
        setmyevent(response.data.data.details[0].event);
        setemail(response.data.data.details[0].email);
        setphone(response.data.data.details[0].phone);
        setAdvertiser(response.data.data.details[0].advertiser);
        setmycost(response.data.data.details[0].cost)
        settrade(response.data.data.details[0].trade)
        setabst(response.data.data.details[0].abst)
        setdiscountabst(response.data.data.details[0].discountabst)
        setitemlist(response.data.data.itemlist)

          
         
     

     
        
      });
  }, [params]);


   const updateAPIData=()=>{

   
  axios
  .post(`http://3.142.245.136:8080/api/public/updateagreement/${id}`, {
   
    sales_rep: salesrep,
    advertiser: Advertiser,
    name: name,
    event: myevent,
    phone: phone,
    email: email,
    fields:datascan,
    sign: mysign,

   
    
   
  })
  .then((response) => {
    toast.success(response.data.message);
    console.log(response.data,'vgcgcfcfc');
  });
   }


  const signRef = useRef();
  const handleClear = () => {
    console.log(signRef.current.clear());
    setmysign('');
  };

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  const handle = () => {
    if (
      signRef.current === ''||
      signRef.current === undefined ||
      signRef.current === null ||
      signRef.current.isEmpty()
    ) {
      return;
    } else {
      setmysign(signRef.current.toDataURL());
    }
  };

  console.log(mysign, 'file');

  const taxcost = () => {
    var tax = (calrate * 15) / 100 - discount + '';
    var totaltax = tax + calrate;
    setcost_tax(totaltax);
    return totaltax;
  };

  var costing;
  const discountcost = () => {
    costing = calrate - discount;
    setdiscounted_cost(costing);
    return costing;
  };

  const calculate = (index, event) => {
    setevent(event);
  };

  console.log(mysign, 'dd');

  var calrate;
  const ratecaculate = () => {
    calrate = event * rate;
    setcost(calrate);

    return calrate;
  };

  function handleChange(i, event, productid) {
    const { name, value, id } = event.target;
console.log(event.target.value,"event value")

  //check to validate if entry is not a number
  // if (isNaN(name)) {
  //   const updated = {};
  //   const tempraryupdated = {};
  //   updated['value'] = value;
  //   updated['name'] = name;
  //   tempraryupdated[name] = value;
    
  //   updated["productid"] = productid;
    
  //   setdatascan(datascan.filter((item) => (item['name'] !== name)));
  //   //somehow update data
  //   setdatascan((datascan) => [...datascan, updated]);
  //   settemprarydatascan(temprarydatascan.filter((item) => (item !== name)));
  //   //somehow update data
  //   settemprarydatascan((temprarydatascan) => [...temprarydatascan, tempraryupdated]);
  // }
  // console.log(datascan,temprarydatascan,'datascan')
   
    let values = [...fields];
    // let myvalue =String(values[i][event.target.name]);
    // let index = myvalue.replace(/[0-9]/g,'');

    // index = event.target.value;
    console.log(values,"values")
    // console.log(datascan,'datascan')
    // for(let defaultindex=0;defaultindex<values.length;defaultindex++){
    //   for(let innerdefault=0;innerdefault<datascan.length;innerdefault++){
    //     if(values[defaultindex].productId===datascan[innerdefault].productid){
          
    //       console.log("okay",Object.keys(values[defaultindex]))
    //     }
    //   }
    // }
// console.log(result,'result')
    // values[i]["productId"]=productid
    let start = moment(startdate, 'YYYY-MM-DD');
    let end = moment(enddate, 'YYYY-MM-DD');
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    while (start <= end) {
      if (start.format('ddd') === 'Mon') {
        weekdayMonCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Tue') {
        weekdayTueCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Wed') {
        weekdayWedCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Thu') {
        weekdayThuCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Fri') {
        weekdayFriCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sat') {
        weekdaySatCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sun') {
        weekdaySunCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      }
    }
    console.log(weekdayMonCounter, 'weekday');

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i]['qty'] =
      Number(values[i]['monday']) * weekdayMonCounter +
      Number(values[i]['tuesday']) * weekdayTueCounter +
      Number(values[i]['wednesday']) * weekdayWedCounter +
      Number(values[i]['thursday']) * weekdayThuCounter +
      Number(values[i]['friday']) * weekdayFriCounter +
      Number(values[i]['saturday']) * weekdaySatCounter +
      Number(values[i]['sunday']) * weekdaySunCounter;

    console.log(fields.qty, 'iki');

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    setFields(values);
    console.log(fields);
    console.log(Number(values[i]['tuesday']), 'tuesday');

    fields[i].cost =
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      fields[i].rate;
    fields[i].discounted_cost = fields[i].cost - fields[i].discount;

    fields[i].cost_tax = fields[i].discounted_cost + (fields[i].discounted_cost * 15) / 100;
  }

  console.log(startdate, enddate, 'startdate');



  const handleDelete = (index1) => {
    const values = fields.filter((data, i) => i !== index1);

    setFields(values);
  };

  var orderid = Math.floor(100000 + Math.random() * 900000);

  console.log(orderid);

  const handlePaymentDue = (event) => {
    if (event.target.value === null || event.target.value === '') {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setpaymentdue(event.target.value);
    }
  };

  return (
    <Container maxWidth="xl dashhead">
     <h3 className='mt-5 heading-nw'>Updated Agreement</h3>
    
          
     
      <Formik
        initialValues={{
          Contract_date: '',
          sales_rep: '',
          Advertiser: '',
          name:'',
          event: '',
          phone: '',
          email: '',
          start_date: '',
          end_date: '',
          product_type: 'spots',
          termsAndConditions: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {

          if (mysign === '' || mysign === undefined || mysign === null) {
            setmysignerror(true);
          } else {
            setmysignerror(false);

            setTimeout(() => setLoading(false), 1000);
          }

          if (name === '') {
            setmysignerror(true);
          } else {
            setmysignerror(false);
          }

      
        }}
      >
        {({ errors, touched, values, handleSubmit, isSubmitting }) => (
          <Form className="form-con form-inline" onSubmit={handleSubmit}>
            {dataapi.map((item) => {
              return (
                <>
                 <Card className="mt-3 px-3 py-3">
                  <div className="form ">
                    <div className="row">
                    <Col item xs={12} sm={6} md={4}>
                    <div className="form-group">
                        <label htmlFor="name" className="label-con">
                          Name
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                          />
                          {errors.name && touched.name ? (
                            <div className="error-message">{errors.name}</div>
                          ) : null}

                        </div>
                      </div>

                      </Col>
                      {/* <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="Contract_Date" className="label-con">
                          Contract Date
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="Contract_date"
                            type="date"
                            className="form-control"
                            placeholder="Contract_date"
                            value={contractdate}
                            onChange={(e) => setcontractdate(e.target.value)}
                          />
                          {errors.Contract_date && touched.Contract_date ? (
                            <div className="error-message">{errors.Contract_date}</div>
                          ) : null}
                        </div>
                      </div>
                      </Col> */}
                      <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="sales_rep" className="label-con">
                          Sales Rep
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="sales_rep"
                            type="text"
                            className="form-control"
                            placeholder="Sales Rep"
                            value={salesrep}
                            onChange={(e) => setsalesrep(e.target.value)}
                          />
                          {errors.sales_rep && touched.sales_rep ? (
                            <div className="error-message">{errors.sales_rep}</div>
                          ) : null}
                        </div>
                      </div>
                      </Col>
                      <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="Advertiser" className="label-con">
                          Advertiser
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="Advertiser"
                            type="text"
                            className="form-control"
                            placeholder="Advertiser"
                            value={Advertiser}
                            onChange={(e) => setAdvertiser(e.target.value)}
                          />
                          {errors.Advertiser && touched.Advertiser ? (
                            <div className="error-message">{errors.Advertiser}</div>
                          ) : null}
                        </div>
                      </div>
                      </Col>
                      <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="event" className="label-con">
                          Event
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="event"
                            type="text"
                            className="form-control"
                            placeholder="Event"
                            value={myevent}
                            onChange={(e) => setmyevent(e.target.value)}
                          />
                          {errors.event && touched.event ? (
                            <div className="error-message">{errors.event}</div>
                          ) : null}
                        </div>
                      </div>
                            </Col>
                            <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="phone" className="label-con">
                          Phone
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="phone"
                            min={0}
                            type="number"
                            className="form-control"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                          />
                          {errors.phone && touched.phone ? (
                            <div className="error-message">{errors.phone}</div>
                          ) : null}
                        </div>
                      </div>
                            </Col>
                            <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <label htmlFor="email" className="label-con">
                          Email
                        </label>
                        <div className="input-er-con">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                          />
                          {errors.email && touched.email ? (
                            <div className="error-message">{errors.email}</div>
                          ) : null}
                        </div>
                      </div>
                      </Col>
                    </div>
                  </div>
                  </Card>
                 
                  {/* /////////////////////////////////////////////////////////////////////// */}
                  <Card className="mt-5 px-3 py-3">
                  
                  <>
                  
                   
                    <div className="container">
                    <button className="btn  update-btn" style={{ float: 'right' }} type="submit" onClick={updateAPIData}>
                    update
                  </button>
                  {/* <button
                              type="button "
                              style={{ float: 'right' }}
                              className="btn  add-btn"
                              // onClick={() => handleAdd()}
                            >
                              Add Item +
                            </button> */}
                      <div className="">
                      <div className='table-responsive ' id="style-2">
                         
                            <Table className="table-responsive ">
                              <thead className="tr-row">
                                <tr>
                                  <th>Product Type</th>
                                  <th>Run Dates</th>
                                  <th>Run Time</th>
                                  <th className="th-perwk">Per Weeks</th>
                                  <th>Rate</th>
                                  {/* <th>Discount</th> */}
                                  <th>Cost</th>
                                  {/* <th>Discounted Cost</th> */}
                                  {/* <th>Cost (w/Tax)</th> */}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                
                                itemlist.map((field ,index) => {
                                  // (()=>{
                                  //   handleChange(index, event)
                                  // })
                                
                                  
                                        return (
                                          <>
                                            <tr key={index}>
                                              <td>
                                                <div
                                                  className="form-group"
                                                  style={{ width: '238px' }}
                                                >
                                                  <Field
                                                    defaultValue={field.product_type}
                                                    as="select"
                                                    name='product_type'
                                                    id="dropdown-input"
                                                    className="dropdown"
                                                    onChange={(e) => handleChange(index,e,field.id)}
                                                    // onChange={(e) => setmyproduct(e.target.value)}
                                                  >
                                                    <option selected value="spots">
                                                      spots
                                                    </option>
                                                    <option value="Mentions">Mentions</option>
                                                    <option value="Half Hours">Half Hours</option>
                                                    <option value="outside Broadcast">
                                                      outside Broadcast
                                                    </option>
                                                  </Field>
                                                  
                                                </div>
                                              </td>

                                              <td colspan="1" className="form-group">
                                  <div
                                    // style={{ width: "130px" }}
                                    className="form-group"
                                  >
                                    <div style={{ border: 'none' }} className="date-range">
                                      <RangePicker
                                      // defaultValue={[moment(field.start_date),moment(field.end_date)]}
                                        // defaultValue={[field.start_date,field.end_date]}
                                       
                                        name="runDates"
                                        onChange={(values, event) => {
                                          if (event.length === 0) {
                                            console.log('requires');
                                          } else {
                                            console.log('not');
                                          }

                                          if (values !== null) {
                                            setDates(
                                              values.map((item) => {
                                                return item;
                                              }),
                                            );
                                            setstartdate(event[0].$d);
                                            setenddate(event[1].$d);

                                            const valuess = [...fields];
                                            valuess[index]['runDates'] = {
                                              startdate: values[0].$d,
                                              enddate: values[1].$d,
                                            };
                                            setFields(valuess);

                                            setstartdate(values[0].$d);
                                            setenddate(values[1].$d);

                                            console.log(values);
                                          }
                                        }}
                                       
                                        
                                       

                                      />
                              
                                      {dates && dates.length < 2 ? (
                                        <span
                                          style={{ textAlign: 'center' }}
                                          className="error-message"
                                        >
                                          please select date range
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </td>

                                              <td>
                                                <div className="date-range">
                                                <TimePicker.RangePicker
                                           defaultValue={[moment(field.starttime).format(),moment(field.endtime)]}
                                       
                                        name="runTimes" 
                                        onChange={(values, event) => {
                                          if (event.length === 0) {
                                            console.log('requires');
                                          } else {
                                            console.log('not');
                                          }

                                          if (values !== null) {
                                            console.log(values.length);
                                            console.log(event.length, 'event');

                                            setTimeRange(
                                              values.map((item) => {
                                                return item;
                                              }),
                                            );

                                            setstarttime(event[0].$d);
                                            setendtime(event[1].$d);

                                            const valuess = [...fields];
                                            valuess[index]['runTimes'] = {
                                              starttime: values[0].$d,
                                              endtime: values[1].$d,
                                            };
                                            setFields(valuess);

                                            setstarttime(values[0].$d);
                                            setendtime(values[1].$d);

                                            console.log(values, 'ghm');
                                          }
                                        }}
                                        format="H:mm A"
                                        use12Hours
                                        placeholder={['Start Time', 'End Time']}
                                      />
                                                  {timeRange && timeRange.length < 2 ? (
                                                    <span
                                                      style={{ textAlign: 'center' }}
                                                      className="error-message"
                                                    >
                                                      please select time range
                                                    </span>
                                                  ) : null}
                                                </div>
                                              </td>

                                              <td>
                                                <div className="form-group">
                                                  <Form.Control
                                                    onClick={handleShow}
                                                    className="popup-btn"
                                                    type="total"
                                                    name="total" 
                                                    defaultValue={field.total}
                                                    placeholder="Select Days"
                                                  />
                                                  {/* </button> */}

                                                  <Modal
                                                    className="pop-btn"
                                                    show={show}
                                                    onHide={handleClose}
                                                  >
                                                    <Modal.Header closeButton>
                                                      <Modal.Title>select Days</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                      <Form
                                                        className="popup-container"
                                                        validated={false}
                                                      >
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          id="mon"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">1</div>
                                                          <Form.Label
                                                            name="monday"
                                                            className="label-con1"
                                                          >
                                                            Monday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.monday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="monday" 
                                                            placeholder="monday"
                                                            autoFocus
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          id="tues"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">2</div>
                                                          <Form.Label className="label-con1">
                                                            Tuesday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.tuesday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="tuesday" 
                                                            placeholder="tuesday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          id="wed"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">3</div>
                                                          <Form.Label className="label-con1">
                                                            Wednesday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.wednesday}
                                                      
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="wednesday" 
                                                            placeholder="Wednesday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          id="thurs"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">4</div>
                                                          <Form.Label className="label-con1">
                                                            Thursday
                                                          </Form.Label>
                                                          <Form.Control
                                                            type="number"
                                                            min={0}
                                                            className="popup-control"
                                                            defaultValue={field.thursday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="thursday"
                                                            placeholder="thursday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3 "
                                                          id="fri"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">5</div>
                                                          <Form.Label className="label-con1">
                                                            Friday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.friday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="friday"
                                                            placeholder="friday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          id="sat"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">6</div>
                                                          <Form.Label className="label-con1">
                                                            Saturday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.saturday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="saturday"
                                                            placeholder="saturday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">7</div>
                                                          <Form.Label className="label-con1">
                                                            Sunday
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="number"
                                                            min={0}
                                                            defaultValue={field.sunday}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            name="sunday"
                                                            placeholder="sunday"
                                                          />
                                                        </Form.Group>
                                                        <Form.Group
                                                          className="popup-grp mb-3 px-3"
                                                          controlId="exampleForm.ControlInput1"
                                                        >
                                                          <div className="label-con1">8</div>
                                                          <Form.Label className="label-con1">
                                                            Total
                                                          </Form.Label>
                                                          <Form.Control
                                                            className="popup-control"
                                                            type="total"
                                                            name="total"
                                                            min={1}
                                                            defaultValue={field.total}
                                                            onChange={(e) =>
                                                              handleChange(index, e,field.id)
                                                            }
                                                            placeholder="total"
                                                          />
                                                        </Form.Group>
                                                      </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                      <Button
                                                        variant="secondary"
                                                        onClick={handleClose}
                                                      >
                                                        Close
                                                      </Button>
                                                      <Button
                                                        variant="primary"
                                                        onClick={handleClose}
                                                      >
                                                        ok
                                                      </Button>
                                                    </Modal.Footer>
                                                  </Modal>
                                                </div>
                                              </td>

                                              <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                 
                                                    defaultValue={field.rate}
                                                    onChange={(e) => handleChange(index, e,field.id)}
                                                    step="any"
                                                    name="rate" 
                                                    type="number"
                                                    min={0}
                                                    className="form-control as"
                                                    // required
                                                  />
                                                </div>
                                              </td>

                                              {/* <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                    defaultValue={field.discount}
                                                    onChange={(e) => handleChange(index, e,field.id)}
                                                    step="any"
                                                    name={"discount" 
                                                    type="number"
                                                    min={0}
                                                    className="form-control as"
                                                  />
                                                </div>
                                                {''}
                                              </td> */}

                                              <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                    step="0.01"
                                                    defaultValue={field.cost}
                                                    onChange={(e) => handleChange(index, e,field.id)}
                                                    name="cost"
                                                    min={0}
                                                    type="number"
                                                    className="form-control as"
                                                  />
                                                </div>
                                              </td>

                                              {/* <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                    step="0.01"
                                                    defaultValue={field.discounted_cost}
                                                    onChange={(e) => handleChange(index, e,field.id)}
                                                    name={"discounted_cost"}
                                                    min={0}
                                                    type="number"
                                                    className="form-control as"
                                                  />
                                                </div>
                                              </td> */}

                                              {/* <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                    step="0.01"
                                                    defaultValue={field.cost_tax}
                                                    onChange={(e) => handleChange(index, e,field.id)}
                                                    name={"cost_tax" 
                                                    min={0}
                                                    type="number"
                                                    className="form-control as"
                                                  />
                                                </div>
                                                
                                              </td> */}

                                              <td>
                                                {index !== 0 && (
                                                  <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDelete(index)}
                                                  >
                                                    X
                                                  </button>
                                                )}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })
                                    }
                              </tbody>
                            </Table>

                            {/* <div style={{ float: 'right' }}>
      <div>
        <span className="totalcosttext">cost:</span>
        <input className= "totalcost1" type="text" Value={total} onChange={(e) => setmycost(e.target.value)} />
      </div>
      <div>
        <span className="totalcosttext">Trade:</span>
       
        <input className="totalcost2" type="text" Value={trade} onChange={(e) => settrade(e.target.value)} />
      </div>
      <div>
        <span className='totaltext' style={{paddingRight:"5px"}}>Abst%:</span> 
        <input className="totalcost5" type="text" Value={abstdiscount} onChange={(e) => setabstdiscount(e.target.value)} />
        <input className="totalcost3" type="text" Value={myvalue} onChange={(e) => setabst(e.target.value)}  />
      </div>
      <div>
        <span className= "totalcosttext">Total:</span>
        <input className="totalcost4" type="text" Value={grand} onChange={(e) => setgrandtotal(e.target.value)} />
      </div>
    </div>
                             */}
                          </div>

                          {/* lllllllllllllllllll//////////////////llllllllllllllllllllllll//////llllllllllllllllllllll////////////////////llllllllllllllllllllllchatgort */}
                        
                        <div className="col-sm-4"></div>
                      </div>
                    </div>
                  </>
</Card>
                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                  {/* <Addrow /> */}
                  <Card className="mt-5 px-3 py-3">
                  <div className="signaturearea">
                    <Field
                      style={{ width: '900px', border: 'none' }}
                      value={paymentdue}
                      onChange={(e) => handlePaymentDue(e)}
                    />
                    {!errorMessage ? (
                      <>
                        <div style={{ color: 'red' }}>this field is required !</div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Row>
                   <Col item xs={12} sm={7} md={7}>
                   <div className="signature-pad">
                    <SignatureCanvas ref={signRef} options={options} onEnd={handle} />
                    {mysignerror ? (
                      <>
                        <span style={{ color: 'red' }}>Signature is required !</span>
                      </>
                    ) : (
                      <></>
                    )}
                   
                  </div>
                    </Col>
                    <Col item xs={12} sm={4} md={4}>
                    <div className="sign-res-btn">
                      <Button className="sign-button" onClick={handleClear}>
                        Clear
                      </Button>
                    </div>

                  <div className="chcek-box">
                    <div className="term-check">
                      <Field type="checkbox" name="termsAndConditions" />
                      <span className="term">
                        {' '}
                        <Termcondition />
                      </span>
                    </div>

                    <div>
                      {errors.termsAndConditions && touched.termsAndConditions ? (
                        <div className="error-message">{errors.termsAndConditions}</div>
                      ) : null}
                    </div>
                    </div>
                    </Col>
                    <Col item xs={12} sm={12} md={12}>
                      <div>
                        
                    <Button type="submit" className="submit-button mt-4">
                      {loading ? 'Loading...' : 'Submit'}
                    </Button>
                  </div>
                      </Col>
                    </Row>
                    </Card>
                 

                 
             
               
                </>
              );
            })}
          </Form>
        )}
      </Formik>

      {/* <Footer /> */}
   
   
    </Container>
  );
};

export default Foam;
