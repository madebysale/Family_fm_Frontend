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
// import { DateRangePicker } from 'rsuite';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.css'
import { DateTimePicker } from '@mui/lab';

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

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
  const [modalVisibility, setModalVisibility] = useState({});
  const [mytotal,setmytotal]=useState('')
  
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
      .post('http://localhost:8080/api/public/agreementlist',{
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
        (response.data.data.itemlist)

          
         
     

     
        
      });
  }, [params.id ]);


   const updateAPIData=()=>{

   
  axios
  .post(`http://localhost:8080/api/public/updateagreement/${id}`, {
   
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



  const handleClose =(index)=>{
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: false,
    }));
  };
  
   
    
   
   const handleShow =(index)=>{
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: true,
    }));
  
  
   }






  // function handle123(i,startdate,enddate) {
  //   // console.log(startdate,'ss')

  //   const values = [...fields];

 
  //   // values[i][fieldname] = event;
  
  //   // console.log(values[i], 'ii');

  //   // console.log(event.target.getAttribute('name'),'sssss')

  //   // if (event.target && event.target.name === 'runDates') {
  //   //   console.log( event.target.name,'ssasas')
  //   //   if (event.length === 0) {
  //   //     console.log('requires');
  //   //   } else {
  //   //     console.log('not');
  //   //   }
  
  //   //   if (values !== null) {
  //   //     setDates(
  //   //       values.map((item) => {
  //   //         return item;
  //   //       }),
  //   //     );
  
  //   //     const startdate = event[0].$d;
  //   //     const enddate = event[1].$d;
  
  //   //     setstartdate(startdate);
  //   //     setenddate(enddate);
  
  //   //     const valuess = [...fields];
  //   //     valuess[i]['runDates'] = {
  //   //       startdate: startdate,
  //   //       enddate: enddate,
  //   //     };
  //   //     setFields(valuess);
  
  //   //     console.log(event);
  //   //   }
  //   // }
  
   






  //       //  onChange={(values, event) => {
  //       //                                   if (event.length === 0) {
  //       //                                     console.log('requires');
  //       //                                   } else {
  //       //                                     console.log('not');
  //       //                                   }

  //       //                                   if (values !== null) {
  //       //                                     setDates(
  //       //                                       values.map((item) => {
  //       //                                         return item;
  //       //                                       }),
  //       //                                     );
  //       //                                    setstartdate(event[0].$d);
  //       //                                     setenddate(event[1].$d);

  //       //                                     const valuess = [...fields];
  //       //                                     valuess[index]['runDates'] = {
  //       //                                       startdate: values[0].$d,
  //       //                                       enddate: values[1].$d,
  //       //                                     };
  //       //                                     setFields(valuess);

  //       //                                     setstartdate(values[0].$d);
  //       //                                     setenddate(values[1].$d);

  //       //                                     console.log(values);
  //       //                                   }
  //       //                                 }}

   
  

   




    
  //   // console.log(startdate,'dssdds123')
  //   // console.log(enddate,'dssdds123')
    
    
  //   let start = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
  //   let end = moment(enddate, 'YYYY-MM-DD'); //right now (or define an end date yourself)
  //   let weekdayMonCounter = 0;
  //   let weekdayTueCounter = 0;
  //   let weekdayWedCounter = 0;
  //   let weekdayThuCounter = 0;
  //   let weekdayFriCounter = 0;
  //   let weekdaySatCounter = 0;
  //   let weekdaySunCounter = 0;

  //   while (start <= end) {
  //     if (start.format('ddd') === 'Mon') {
  //       weekdayMonCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Tue') {
  //       weekdayTueCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Wed') {
  //       weekdayWedCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Thu') {
  //       weekdayThuCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Fri') {
  //       weekdayFriCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Sat') {
  //       weekdaySatCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     } else if (start.format('ddd') === 'Sun') {
  //       weekdaySunCounter++;
  //       start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  //     }
  //   }

  //   let startDate = moment(startdate).format('YYYY-MM-DD');
  //   let endDate = moment(enddate).format('YYYY-MM-DD');
  //   let betweenMonths = [];
  //   let montharray = [];
  //   var totalcost;

  //   // console.log(startDate, 'start123');
  //   // console.log(endDate, 'end');
  //       // console.log(startDate,'startdate132')
  //   if (startDate < endDate) {
  //      let date = moment(startDate).startOf('month');
  //      while (date < moment(endDate).endOf('month')) {
  //       // console.log(date,"while.......")
  //       betweenMonths.push(date.format('MM'));
  //       montharray.push(date.format('YYYY-MM'));

  //       date.add(1, 'month');
  //     }
  //   }


  //   values[i]['jan']= 0.00
  //   values[i]['feb']= 0.00
  //   values[i]['mar']= 0.00

  //   values[i]['april']= 0.00
  //   values[i]['may']= 0.00
  //   values[i]['sept']= 0.00
  //   values[i]['oct']= 0.00
  //   values[i]['nov']= 0.00
  //   values[i]['dec']= 0.00

  //   values[i]['jun']= 0.00
  //   values[i]['july']= 0.00
  //   values[i]['aug']= 0.00

  //   for (let j = 0; j < betweenMonths.length; j++) {

  //     // console.log("for loop.......")

  //     if (j == 0) {

     
  //       let eendDate = moment(startDate).endOf('month');

  //       let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

  //       let weekdayMonCounter1 = 0;
  //       let weekdayTueCounter1 = 0;
  //       let weekdayWedCounter1 = 0;
  //       let weekdayThuCounter1 = 0;
  //       let weekdayFriCounter1 = 0;
  //       let weekdaySatCounter1 = 0;
  //       let weekdaySunCounter1 = 0;

  //       let currentDate = moment(startDate); // Create a separate variable to iterate over the dates
  //       let enddingdate = moment(startdateofmonth);

  //       while (currentDate <= enddingdate) {
  //         if (currentDate.format('ddd') === 'Mon') {
  //           weekdayMonCounter1++;
  //         } else if (currentDate.format('ddd') === 'Tue') {
  //           weekdayTueCounter1++;
  //         } else if (currentDate.format('ddd') === 'Wed') {
  //           weekdayWedCounter1++;
  //         } else if (currentDate.format('ddd') === 'Thu') {
  //           weekdayThuCounter1++;
  //         } else if (currentDate.format('ddd') === 'Fri') {
  //           weekdayFriCounter1++;
  //         } else if (currentDate.format('ddd') === 'Sat') {
  //           weekdaySatCounter1++;
  //         } else if (currentDate.format('ddd') === 'Sun') {
  //           weekdaySunCounter1++;
  //         }

  //         currentDate.add(1, 'day');
  //       }

  //       totalcost =
  //         (Number(values[i]['monday'] ) * weekdayMonCounter1 +
  //           Number(values[i]['tuesday']) * weekdayTueCounter1 +
  //           Number(values[i]['wednesday']) * weekdayWedCounter1 +
  //           Number(values[i]['thursday']) * weekdayThuCounter1 +
  //           Number(values[i]['friday']) * weekdayFriCounter1 +
  //           Number(values[i]['saturday']) * weekdaySatCounter1 +
  //           Number(values[i]['sunday']) * weekdaySunCounter1) *
  //         fields[i].rate;
  //     } else if (j == betweenMonths.length - 1) {
  //       let eendDate = moment(endDate).startOf('month');

  //       let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

  //       let weekdayMonCounter2 = 0;
  //       let weekdayTueCounter2 = 0;
  //       let weekdayWedCounter2 = 0;
  //       let weekdayThuCounter2 = 0;
  //       let weekdayFriCounter2 = 0;
  //       let weekdaySatCounter2 = 0;
  //       let weekdaySunCounter2 = 0;

  //       let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
  //       let currentDate = moment(startdateofmonth);

  //       while (currentDate <= enddingdate) {
  //         if (currentDate.format('ddd') === 'Mon') {
  //           weekdayMonCounter2++;
  //         } else if (currentDate.format('ddd') === 'Tue') {
  //           weekdayTueCounter2++;
  //         } else if (currentDate.format('ddd') === 'Wed') {
  //           weekdayWedCounter2++;
  //         } else if (currentDate.format('ddd') === 'Thu') {
  //           weekdayThuCounter2++;
  //         } else if (currentDate.format('ddd') === 'Fri') {
  //           weekdayFriCounter2++;
  //         } else if (currentDate.format('ddd') === 'Sat') {
  //           weekdaySatCounter2++;
  //         } else if (currentDate.format('ddd') === 'Sun') {
  //           weekdaySunCounter2++;
  //         }

  //         currentDate.add(1, 'day');
  //       }

  //       totalcost =
  //         (Number(values[i]['monday']) * weekdayMonCounter2 +
  //           Number(values[i]['tuesday']) * weekdayTueCounter2 +
  //           Number(values[i]['wednesday']) * weekdayWedCounter2 +
  //           Number(values[i]['thursday']) * weekdayThuCounter2 +
  //           Number(values[i]['friday']) * weekdayFriCounter2 +
  //           Number(values[i]['saturday']) * weekdaySatCounter2 +
  //           Number(values[i]['sunday']) * weekdaySunCounter2) *
  //         fields[i].rate;
  //     } else {
  //       let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

  //       let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
  //       let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD')

  //       let weekdayMonCounter1 = 0;
  //       let weekdayTueCounter1 = 0;
  //       let weekdayWedCounter1 = 0;
  //       let weekdayThuCounter1 = 0;
  //       let weekdayFriCounter1 = 0;
  //       let weekdaySatCounter1 = 0;
  //       let weekdaySunCounter1 = 0;

  //       let currentDate = moment(mystartDate); // Create a separate variable to iterate over the dates
  //       let enddingdate = moment(startdateofmonth);

  //       while (currentDate <= enddingdate) {
  //         if (currentDate.format('ddd') === 'Mon') {
  //           weekdayMonCounter1++;
  //         } else if (currentDate.format('ddd') === 'Tue') {
  //           weekdayTueCounter1++;
  //         } else if (currentDate.format('ddd') === 'Wed') {
  //           weekdayWedCounter1++;
  //         } else if (currentDate.format('ddd') === 'Thu') {
  //           weekdayThuCounter1++;
  //         } else if (currentDate.format('ddd') === 'Fri') {
  //           weekdayFriCounter1++;
  //         } else if (currentDate.format('ddd') === 'Sat') {
  //           weekdaySatCounter1++;
  //         } else if (currentDate.format('ddd') === 'Sun') {
  //           weekdaySunCounter1++;
  //         }

  //         currentDate.add(1, 'day');
  //       }

  //       totalcost =
  //         (Number(values[i]['monday']) * weekdayMonCounter1 +
  //           Number(values[i]['tuesday']) * weekdayTueCounter1 +
  //           Number(values[i]['wednesday']) * weekdayWedCounter1 +
  //           Number(values[i]['thursday']) * weekdayThuCounter1 +
  //           Number(values[i]['friday']) * weekdayFriCounter1 +
  //           Number(values[i]['saturday']) * weekdaySatCounter1 +
  //           Number(values[i]['sunday']) * weekdaySunCounter1) *
  //         fields[i].rate;

  //       // console.log(totalcost, 'middletotalcost');
  //     }
  //     var myresult = Number(betweenMonths[j]);
  //     // console.log(betweenMonths[j], 'ds');
  //     switch (myresult) {
  //       case 1:
  //         values[i]['jan']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 2:
  //         values[i]['feb']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 3:
  //         values[i]['mar']=Number(totalcost)
  //         // console.log(totalcost)

  //         break;
  //       case 4:
  //         values[i]['april']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 5:
  //         values[i]['may']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 6:
  //         values[i]['june']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 7:
  //         values[i]['july']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 8:
  //         values[i]['aug']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 9:
  //         values[i]['sept']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 10:
  //         values[i]['oct']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 11:
  //         values[i]['nov']=Number(totalcost)
  //         // console.log(totalcost)
  //         break;
  //       case 12:
  //         values[i]['dec']=Number(totalcost)
          
  //         break;

  //       default:
  //         // console.log('none value selected');
  //     }
  //   }

  //   // let eendDate = moment(startDate).endOf('month');
  //   // let myendDate = eendDate.format('YYYY-MM-DD');

  //   // let weekdayMonCounter1 = 0;
  //   // let 2 = 0;
  //   // let weekdayWedCounter1 = 0;
  //   // let weekdayThuCounter1 = 0;
  //   // let weekdayFriCounter1 = 0;
  //   // let weekdaySatCounter1 = 0;
  //   // let weekdaySunCounter1 = 0;

  //   // let currentDate = moment(startDate); // Create a separate variable to iterate over the dates
  //   // // let enddingdate = moment(myendDate)

  //   // console.log(startDate, "startDate12");
  //   // console.log(myendDate, "endDate12");

  //   // while (currentDate <= enddingdate) {
  //   //   if (currentDate.format('ddd') === 'Mon') {
  //   //     weekdayMonCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Tue') {
  //   //     weekdayTueCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Wed') {
  //   //     weekdayWedCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Thu') {
  //   //     weekdayThuCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Fri') {
  //   //     weekdayFriCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Sat') {
  //   //     weekdaySatCounter1++;
  //   //   } else if (currentDate.format('ddd') === 'Sun') {
  //   //     weekdaySunCounter1++;
  //   //   }

  //   //   currentDate.add(1, 'day');
  //   // }

  //   // console.log('Monday:', weekdayMonCounter1);
  //   // console.log('Tuesday:', weekdayTueCounter1);
  //   // console.log('Wednesday:', weekdayWedCounter1);
  //   // console.log('Thursday:', weekdayThuCounter1);
  //   // console.log('Friday:', weekdayFriCounter1);
  //   // console.log('Saturday:', weekdaySatCounter1);
  //   // console.log('Sunday:', weekdaySunCounter1);
  //   // console.log('Sund1sa51ay:', currentDate.format('ddd'));

  //   /////////////////////////////////////////////////////////////////

  //   // let mystartDate1 = moment(enddate).startOf('month');
  //   // let mystartdating = mystartDate1.format('YYYY-MM-DD');

  //   // let weekdayMonCounter2 = 0;
  //   // let weekdayTueCounter2 = 0;
  //   // let weekdayWedCounter2 = 0;
  //   // let weekdayThuCounter2 = 0;
  //   // let weekdayFriCounter2 = 0;
  //   // let weekdaySatCounter2 = 0;
  //   // let weekdaySunCounter2 = 0;

  //   // let currentDate1 = moment(mystartdating); // Create a separate variable to iterate over the dates
  //   // let enddingdate = moment(stardate)

  //   // console.log(startDate, "startDate12");
  //   // console.log(myendDate, "endDate12");

  //   // while (currentDate1 <= enddingdate) {
  //   //   if (currentDate1.format('ddd') === 'Mon') {
  //   //     weekdayMonCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Tue') {
  //   //     weekdayTueCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Wed') {
  //   //     weekdayWedCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Thu') {
  //   //     weekdayThuCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Fri') {
  //   //     weekdayFriCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Sat') {
  //   //     weekdaySatCounter2++;
  //   //   } else if (currentDate1.format('ddd') === 'Sun') {
  //   //     weekdaySunCounter2++;
  //   //   }

  //   //   currentDate.add(1, 'day');
  //   // }

  //   // console.log('Monday:', weekdayMonCounter2);
  //   // console.log('Tuesday:', weekdayTueCounter2);
  //   // console.log('Wednesday:', weekdayWedCounter2);
  //   // console.log('Thursday:', weekdayThuCounter2);
  //   // console.log('Friday:', weekdayFriCounter2);
  //   // console.log('Saturday:', weekdaySatCounter2);
  //   // console.log('Sunday:', weekdaySunCounter2);
  //   // console.log('Sund1sa51ay:', currentDate.format('ddd'));

  //   /////////////////////////////////////////////////////////////////////

  //   // let currentDate = start.clone();
  //   // let myenddate =end.clone()
  //   // let monthData = [];
  //   // console.log(currentDate.startOf('month')._i,'start')
  //   // // console.log(currentDate.endOf('month'),'end')

  //   // while (currentDate <= myenddate) {
  //   //   const year = currentDate.year();
  //   //   const month = currentDate.month();
  //   //   const myday = currentDate.daysInMonth();

  //   //   console.log(myday,'myday')

  //   //   const startDateOfMonth = currentDate.startOf('month');
  //   //   const endDateOfMonth = currentDate.endOf('month');

  //   //  const endingstartDateofMonth = myenddate.startOf('month');
  //   //  const endingDateofMonth = myenddate.endOf('month');

  //   //   const daysInMonth = endDateOfMonth.diff(startDateOfMonth, 'days') + 1;

  //   //   console.log(startDateOfMonth,'startDateOfMonth');
  //   //   console.log(endDateOfMonth,'endDateOfMonth')
  //   //   console.log(daysInMonth,'daysInMonth')
  //   //   console.log(endingstartDateofMonth,'enddate')
  //   //   console.log(endingDateofMonth,'enddate12')

  //   //   let weekdayCounts = {
  //   //     Monday: 0,
  //   //     Tuesday: 0,
  //   //     Wednesday: 0,
  //   //     Thursday: 0,
  //   //     Friday: 0,
  //   //     Saturday: 0,
  //   //     Sunday: 0,
  //   //   };

  //   //   for (let day = 0; day < daysInMonth; day++) {
  //   //     const currentDay = startDateOfMonth.clone().add(day, 'days');
  //   //     const weekday = currentDay.format('dddd');
  //   //     weekdayCounts[weekday]++;
  //   //   }

  //   //   monthData.push({ year, month, weekdayCounts });

  //   //   currentDate.add(1, 'month');

  //   // }

  //   // console.log('Month-wise data:', monthData);

  //   values[i]['total'] =
  //     Number(values[i]['monday']) +
  //     Number(values[i]['tuesday']) +
  //     Number(values[i]['wednesday']) +
  //     Number(values[i]['thursday']) +
  //     Number(values[i]['friday']) +
  //     Number(values[i]['saturday']) +
  //     Number(values[i]['sunday']);

  //   values[i]['qty'] =
  //     Number(values[i]['monday']) * weekdayMonCounter +
  //     Number(values[i]['tuesday']) * weekdayTueCounter +
  //     Number(values[i]['wednesday']) * weekdayWedCounter +
  //     Number(values[i]['thursday']) * weekdayThuCounter +
  //     Number(values[i]['friday']) * weekdayFriCounter +
  //     Number(values[i]['saturday']) * weekdaySatCounter +
  //     Number(values[i]['sunday']) * weekdaySunCounter;

  //   values[i]['total'] =
  //     Number(values[i]['monday']) +
  //     Number(values[i]['tuesday']) +
  //     Number(values[i]['wednesday']) +
  //     Number(values[i]['thursday']) +
  //     Number(values[i]['friday']) +
  //     Number(values[i]['saturday']) +
  //     Number(values[i]['sunday']);

  //   setFields(values);

  //   // let startYear = startDate.year();
  //   // let startMonth = startDate.month();
  //   // let endYear = endDate.year();
  //   // let endMonth = endDate.month();

  //   //     const startDate = moment(startdate, 'YYYY-MM-DD'); // Replace with your start date
  //   // const endDate = moment(enddate, 'YYYY-MM-DD'); // Replace with your end date

  //   // const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //   // let currentDay = moment(startDate);
  //   // let daysArray = [];
  //   // let daysObject = {};

  //   // for (let i = 0; i < 7; i++) {
  //   //   const dayName = dayNames[currentDay.day()];
  //   //   let value = 0;

  //   //   if (currentDay.isBetween(startDate, endDate, null, '[]') || currentDay.isSame(startDate) || currentDay.isSame(endDate)) {
  //   //     value = 1;
  //   //   }

  //   //   daysArray.push({ day: dayName, value: value });
  //   //   daysObject[dayName] = value;

  //   //   currentDay.add(1, 'day'); // Move to the next day
  //   // }

  //   // console.log('Days Array:', daysArray);
  //   // console.log('Days Object:', daysObject);
  //   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   // const startDate = moment(); // Replace with your start date
  //   // const endDate = new Date('2022-08-15'); // Replace with your end date
  //   // const startDate = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
  //   // const endDate = moment(enddate, 'YYYY-MM-DD');

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   // var gettotalsecond =  ((Number(values[i]['monday'])* daysObject['Monday']) +
  //   // (Number(values[i]['tuesday'])*daysObject['Tuesday'] )+
  //   // (Number(values[i]['wednesday']) *daysObject['Wednesday'])+
  //   // ( Number(values[i]['thursday'])*daysObject['Thursday'] )+
  //   // (Number(values[i]['friday']) *daysObject['Friday']) +
  //   // (Number(values[i]['saturday'])*daysObject['Saturday'] )+
  //   // (Number(values[i]['sunday']))*daysObject['Sunday'] )*30

  //   // var hours = Math.floor(gettotalsecond / 3600);
  //   // var min = Math.floor((gettotalsecond % 3600) / 60);
  //   // var sec = gettotalsecond%60

  //   // setweekhr(
  //   //   hours + ":" +min + ":" + sec
  //   // )

  //   // console.log(Number(values[i]['tuesday']), 'tuesday');

  //   fields[i].cost = (
  //     (Number(values[i]['monday' ]) * weekdayMonCounter +
  //       Number(values[i]['tuesday']) * weekdayTueCounter +
  //       Number(values[i]['wednesday']) * weekdayWedCounter +
  //       Number(values[i]['thursday']) * weekdayThuCounter +
  //       Number(values[i]['friday']) * weekdayFriCounter +
  //       Number(values[i]['saturday']) * weekdaySatCounter +
  //       Number(values[i]['sunday']) * weekdaySunCounter) *
  //     fields[i].rate
  //   ).toFixed(2);

  //   fields[i].discounted_cost = fields[i].cost - fields[i].discount;

  //   fields[i].cost_tax =
  //     Math.round((fields[i].discounted_cost + (fields[i].discounted_cost * 15) / 100) * 100) / 100;

  //   if (fields[i].product_type === '') {
  //     // setErrorMessage1(false);
  //   } else {
  //     // setErrorMessage1(true);
  //     setproduct_type(fields[i].product_type);
  //   }
  // }


  function handleChange(i, event, fieldname) {
    const values = [...fields];
    values[i][event.target.name] = event.target.value;
console.log(  values[i][event.target.name],'startd')

    // console.log(values,'eventbgnm,nm,')
 
    // values[i][fieldname] = event;
  
    // console.log(values[i], 'ii');

    // console.log(event.target.getAttribute('name'),'sssss')

    // if (event.target && event.target.name === 'runDates') {
    //   console.log( event.target.name,'ssasas')
    //   if (event.length === 0) {
    //     console.log('requires');
    //   } else {
    //     console.log('not');
    //   }
  
    //   if (values !== null) {
    //     setDates(
    //       values.map((item) => {
    //         return item;
    //       }),
    //     );
  
    //     const startdate = event[0].$d;
    //     const enddate = event[1].$d;
  
    //     setstartdate(startdate);
    //     setenddate(enddate);
  
    //     const valuess = [...fields];
    //     valuess[i]['runDates'] = {
    //       startdate: startdate,
    //       enddate: enddate,
    //     };
    //     setFields(valuess);
  
    //     console.log(event);
    //   }
    // }
  
   






        //  onChange={(values, event) => {
        //                                   if (event.length === 0) {
        //                                     console.log('requires');
        //                                   } else {
        //                                     console.log('not');
        //                                   }

        //                                   if (values !== null) {
        //                                     setDates(
        //                                       values.map((item) => {
        //                                         return item;
        //                                       }),
        //                                     );
        //                                    setstartdate(event[0].$d);
        //                                     setenddate(event[1].$d);

        //                                     const valuess = [...fields];
        //                                     valuess[index]['runDates'] = {
        //                                       startdate: values[0].$d,
        //                                       enddate: values[1].$d,
        //                                     };
        //                                     setFields(valuess);

        //                                     setstartdate(values[0].$d);
        //                                     setenddate(values[1].$d);

        //                                     console.log(values);
        //                                   }
        //                                 }}

   
  

   




    
    // console.log(startdate,'dssdds')
    // console.log(endate,'dssdds')
    
    
    let start = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    let end = moment(enddate, 'YYYY-MM-DD'); //right now (or define an end date yourself)
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    console.log(startdate,'123560')

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

    let startDate = moment(startdate).format('YYYY-MM-DD');
    let endDate = moment(enddate).format('YYYY-MM-DD');
    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    // console.log(startDate, 'start123');
    // console.log(endDate, 'end');

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');

      while (date < moment(endDate).endOf('month')) {
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('YYYY-MM'));

        date.add(1, 'month');
      }
    }

    for (let j = 0; j < betweenMonths.length; j++) {
      if (j == 0) {
        let eendDate = moment(startDate).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(startDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;
      } else if (j == betweenMonths.length - 1) {
        let eendDate = moment(endDate).startOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter2 = 0;
        let weekdayTueCounter2 = 0;
        let weekdayWedCounter2 = 0;
        let weekdayThuCounter2 = 0;
        let weekdayFriCounter2 = 0;
        let weekdaySatCounter2 = 0;
        let weekdaySunCounter2 = 0;

        let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
        let currentDate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter2++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter2++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter2++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter2++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter2++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter2++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter2++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter2 +
            Number(values[i]['tuesday']) * weekdayTueCounter2 +
            Number(values[i]['wednesday']) * weekdayWedCounter2 +
            Number(values[i]['thursday']) * weekdayThuCounter2 +
            Number(values[i]['friday']) * weekdayFriCounter2 +
            Number(values[i]['saturday']) * weekdaySatCounter2 +
            Number(values[i]['sunday']) * weekdaySunCounter2) *
          fields[i].rate;
      } else {
        let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD')

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(mystartDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;

        console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
      console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan']=Number(totalcost)
          console.log(totalcost)
          break;
        case 2:
          values[i]['feb']=Number(totalcost)
          console.log(totalcost)
          break;
        case 3:
          values[i]['mar']=Number(totalcost)
          console.log(totalcost)

          break;
        case 4:
          values[i]['april']=Number(totalcost)
          console.log(totalcost)
          break;
        case 5:
          values[i]['may']=Number(totalcost)
          console.log(totalcost)
          break;
        case 6:
          values[i]['june']=Number(totalcost)
          console.log(totalcost)
          break;
        case 7:
          values[i]['july']=Number(totalcost)
          console.log(totalcost)
          break;
        case 8:
          values[i]['aug']=Number(totalcost)
          console.log(totalcost)
          break;
        case 9:
          values[i]['sept']=Number(totalcost)
          console.log(totalcost)
          break;
        case 10:
          values[i]['oct']=Number(totalcost)
          console.log(totalcost)
          break;
        case 11:
          values[i]['nov']=Number(totalcost)
          console.log(totalcost)
          break;
        case 12:
          values[i]['dec']=Number(totalcost)
          
          break;

        default:
          console.log('none value selected');
      }
    }

    // let eendDate = moment(startDate).endOf('month');
    // let myendDate = eendDate.format('YYYY-MM-DD');

    // let weekdayMonCounter1 = 0;
    // let 2 = 0;
    // let weekdayWedCounter1 = 0;
    // let weekdayThuCounter1 = 0;
    // let weekdayFriCounter1 = 0;
    // let weekdaySatCounter1 = 0;
    // let weekdaySunCounter1 = 0;

    // let currentDate = moment(startDate); // Create a separate variable to iterate over the dates
    // // let enddingdate = moment(myendDate)

    // console.log(startDate, "startDate12");
    // console.log(myendDate, "endDate12");

    // while (currentDate <= enddingdate) {
    //   if (currentDate.format('ddd') === 'Mon') {
    //     weekdayMonCounter1++;
    //   } else if (currentDate.format('ddd') === 'Tue') {
    //     weekdayTueCounter1++;
    //   } else if (currentDate.format('ddd') === 'Wed') {
    //     weekdayWedCounter1++;
    //   } else if (currentDate.format('ddd') === 'Thu') {
    //     weekdayThuCounter1++;
    //   } else if (currentDate.format('ddd') === 'Fri') {
    //     weekdayFriCounter1++;
    //   } else if (currentDate.format('ddd') === 'Sat') {
    //     weekdaySatCounter1++;
    //   } else if (currentDate.format('ddd') === 'Sun') {
    //     weekdaySunCounter1++;
    //   }

    //   currentDate.add(1, 'day');
    // }

    // console.log('Monday:', weekdayMonCounter1);
    // console.log('Tuesday:', weekdayTueCounter1);
    // console.log('Wednesday:', weekdayWedCounter1);
    // console.log('Thursday:', weekdayThuCounter1);
    // console.log('Friday:', weekdayFriCounter1);
    // console.log('Saturday:', weekdaySatCounter1);
    // console.log('Sunday:', weekdaySunCounter1);
    // console.log('Sund1sa51ay:', currentDate.format('ddd'));

    /////////////////////////////////////////////////////////////////

    // let mystartDate1 = moment(enddate).startOf('month');
    // let mystartdating = mystartDate1.format('YYYY-MM-DD');

    // let weekdayMonCounter2 = 0;
    // let weekdayTueCounter2 = 0;
    // let weekdayWedCounter2 = 0;
    // let weekdayThuCounter2 = 0;
    // let weekdayFriCounter2 = 0;
    // let weekdaySatCounter2 = 0;
    // let weekdaySunCounter2 = 0;

    // let currentDate1 = moment(mystartdating); // Create a separate variable to iterate over the dates
    // let enddingdate = moment(stardate)

    // console.log(startDate, "startDate12");
    // console.log(myendDate, "endDate12");

    // while (currentDate1 <= enddingdate) {
    //   if (currentDate1.format('ddd') === 'Mon') {
    //     weekdayMonCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Tue') {
    //     weekdayTueCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Wed') {
    //     weekdayWedCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Thu') {
    //     weekdayThuCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Fri') {
    //     weekdayFriCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Sat') {
    //     weekdaySatCounter2++;
    //   } else if (currentDate1.format('ddd') === 'Sun') {
    //     weekdaySunCounter2++;
    //   }

    //   currentDate.add(1, 'day');
    // }

    // console.log('Monday:', weekdayMonCounter2);
    // console.log('Tuesday:', weekdayTueCounter2);
    // console.log('Wednesday:', weekdayWedCounter2);
    // console.log('Thursday:', weekdayThuCounter2);
    // console.log('Friday:', weekdayFriCounter2);
    // console.log('Saturday:', weekdaySatCounter2);
    // console.log('Sunday:', weekdaySunCounter2);
    // console.log('Sund1sa51ay:', currentDate.format('ddd'));

    /////////////////////////////////////////////////////////////////////

    // let currentDate = start.clone();
    // let myenddate =end.clone()
    // let monthData = [];
    // console.log(currentDate.startOf('month')._i,'start')
    // // console.log(currentDate.endOf('month'),'end')

    // while (currentDate <= myenddate) {
    //   const year = currentDate.year();
    //   const month = currentDate.month();
    //   const myday = currentDate.daysInMonth();

    //   console.log(myday,'myday')

    //   const startDateOfMonth = currentDate.startOf('month');
    //   const endDateOfMonth = currentDate.endOf('month');

    //  const endingstartDateofMonth = myenddate.startOf('month');
    //  const endingDateofMonth = myenddate.endOf('month');

    //   const daysInMonth = endDateOfMonth.diff(startDateOfMonth, 'days') + 1;

    //   console.log(startDateOfMonth,'startDateOfMonth');
    //   console.log(endDateOfMonth,'endDateOfMonth')
    //   console.log(daysInMonth,'daysInMonth')
    //   console.log(endingstartDateofMonth,'enddate')
    //   console.log(endingDateofMonth,'enddate12')

    //   let weekdayCounts = {
    //     Monday: 0,
    //     Tuesday: 0,
    //     Wednesday: 0,
    //     Thursday: 0,
    //     Friday: 0,
    //     Saturday: 0,
    //     Sunday: 0,
    //   };

    //   for (let day = 0; day < daysInMonth; day++) {
    //     const currentDay = startDateOfMonth.clone().add(day, 'days');
    //     const weekday = currentDay.format('dddd');
    //     weekdayCounts[weekday]++;
    //   }

    //   monthData.push({ year, month, weekdayCounts });

    //   currentDate.add(1, 'month');

    // }

    // console.log('Month-wise data:', monthData);

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

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

      //  setmytota values[i]['total'])
      console.log( values[i]['total'],'total123')

    setFields(values);



    fields[i].cost = (
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      fields[i].rate
    ).toFixed(2);

    fields[i].discounted_cost = fields[i].cost - fields[i].discount;

    fields[i].cost_tax =
      Math.round((fields[i].discounted_cost + (fields[i].discounted_cost * 15) / 100) * 100) / 100;

    if (fields[i].product_type === '') {
      // setErrorMessage1(false);
    } else {
      // setErrorMessage1(true);
      setproduct_type(fields[i].product_type);
    }
  }









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
                    <button className="btn update-btn" style={{ float: 'right' }} type="submit" onClick={updateAPIData}>
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
                                  {console.log(moment(field.start_date).format('YYYY-MM-DD'),'852')}

                                  var startdate = moment(field.start_date)
                                  var enddate = moment(field.end_date)
                                  
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
                                                    value={myproduct}
                                                    as="select"
                                                    name='product_type' 
                                                    id="dropdown-input"
                                                    className="dropdown"
                                                    // onChange={(e) => 
                                                  
                                                      // handleChange(index,e,'product_id')}
                                                    onChange={(e) => setmyproduct(e.target.value)}
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
                               
                                    <DateRangePicker showWeekNumbers
  defaultValue={[new Date(field.start_date),new Date(field.end_date)]}
  name="runDates"

  
  onChange={(values, event) => {
    if (event.length === 0) {
      console.log('Requires selection');
    } else {
      console.log('Selection made');
    }

    if (values !== null) {
      setDates(values);
      setstartdate(values[0]);
      setenddate(values[1]);
      console.log(setstartdate,'sdds')

      const valuess = [...fields];
      valuess[index]['runDates'] = {
        startdate: values[0],
        enddate: values[1],
      };

      setFields(valuess);

      // handle123(index,values[0],values[1])

      console.log(startdate,'sdd123456');
      console.log(values,'sdd');
      console.log(enddate,'sdd123456');
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
                                                  
                                                <DateRangePicker
                                           defaultValue={[new Date(field.starttime),new Date(field.endtime)]}
                                       
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

                                            setstarttime(event[0]);
                                            setendtime(event[1]);

                                            const valuess = [...fields];
                                            valuess[index]['runTimes'] = {
                                              starttime: values[0],
                                              endtime: values[1],
                                            };
                                            setFields(valuess);

                                            setstarttime(values[0]);
                                            setendtime(values[1]);

                                            console.log(values, 'ghm');
                                          }
                                        }}
                                        format="H:mm aa"
                                      
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
                                                      onClick={()=>handleShow(index)}
                                                    className="popup-btn"
                                                    type="total"
                                                    name="total"
                                                    // value={mytotal} 
                                                  // {console.log(field.tota)}
                                                    defaultValue={field.total}
                                                    placeholder="Select Days"
                                                  /> 
                                                  {/* </button> */}

                                                  <Modal
                                                    className="pop-btn"
                                                    // show={show}
                                                    // onHide={handleClose}
                                                    show={modalVisibility[index]} key={`modal-${index}`} onHide={() => handleClose(index)}
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
                                                            value={field.monday}
                                                            onChange={(event) =>
                                                              handleChange(index, event, 'monday')
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
                                                            onChange={(event) =>
                                                              handleChange(index, event,'tuesday')
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
                                                      
                                                            onChange={(event) =>
                                                              handleChange(index, event,'wednesday')
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
                                                            onChange={(event) =>
                                                              handleChange(index, event,'thursday')
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
                                                            onChange={(event) =>
                                                              handleChange(index, event,'friday')
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
                                                            onChange={(event) =>
                                                              handleChange(index, event,'saturday')
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
                                                            onChange={(event) =>
                                                              handleChange(index, event,'sunday')
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
                                                            // value={mytotal}
                                                            defaultValue={field.total}
                                                            onChange={(event) =>
                                                              handleChange(index, event,'total')
                                                            }
                                                            placeholder="total"
                                                          />
                                                        </Form.Group>
                                                      </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                      <Button
                                                        variant="secondary"
                                                        onClick={() => handleClose(index)}
                                                      >
                                                        Close
                                                      </Button>
                                                      {/* <Button
                                                        variant="primary"
                                                        onClick={handleClose}
                                                      >
                                                        ok
                                                      </Button> */}
                                                    </Modal.Footer>
                                                  </Modal>
                                                </div>
                                              </td>

                                              <td style={{}}>
                                                <div className="form-group">
                                                  <input
                                                    style={{ marginLeft: '-22px' }}
                                                 
                                                    defaultValue={field.rate}
                                                    onChange={(event) => handleChange(index, event)}
                                                    step="any"
                                                    name="rate "  

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
                                                    onChange={(event) => handleChange(index, event)}
                                                    name="cost"
                                                    min={0}
                                                    type="number"
                                                    className="form-control as"
                                                  />
                                                </div>
                                              </td>

                                              <td>
                                              <button className="btn update-btn" style={{ float: 'right' }} type="submit" >
                    update
                  </button>
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
                                                {/* {index !== 0 && (
                                                  <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDelete(index)}
                                                  >
                                                    X
                                                  </button>
                                                )} */}

                                           
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })
                                    }
                              </tbody>
                            </Table>

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
                   {/* <Col item xs={12} sm={7} md={7}>
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
                    </Col> */}
                    <Col item xs={12} sm={4} md={4}>
                    {/* <div className="sign-res-btn">
                      <Button className="sign-button" onClick={handleClear}>
                        Clear
                      </Button>
                    </div> */}

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
