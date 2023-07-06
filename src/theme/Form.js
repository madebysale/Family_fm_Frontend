import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas';

import { AiOutlineLogout } from 'react-icons/ai';

import { DatePicker, Select } from 'antd';
import 'antd/dist/reset.css';
import { Formik, Field } from 'formik';
import { TimePicker } from 'antd';
import { ErrorMessage } from 'formik';

import axios from 'axios';
import SignaturePad from './SignaturePad';
import moment from 'moment';
import * as Yup from 'yup';
import { Grid, Typography } from '@mui/material';
import { Col, Row, Container } from 'react-bootstrap';
// import TimePickerWithDelete from './TimePickerWithDelete';

import './Form.css';
// import mylogo from "../component/fm_logo.png";

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';

// import Footer from "./Footer";

import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import { Termcondition } from './Termcondition';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Customerpopup from './Customerpopup';

const { RangePicker } = DatePicker;
// const {  Space, TimePicker  }
const validationSchema = Yup.object({
  // Contract_date: Yup.date().required("Required"),
  // sales_rep: Yup.string().required('Required'),
});
const validationSchemaforDisabled = Yup.object({
  // Contract_date: Yup.date().required("Required"),
  // sales_rep: Yup.string().required('Required'),

  Advertiser: Yup.string().required('Required'),

  name: Yup.string().required('Required'),

  event: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  company_name: Yup.string().required('Required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Required'),

  email: Yup.string().email('Invalid email address').required('Required'),

  start_date: Yup.date(),
  end_date: Yup.date().min(Yup.ref('start_date'), "end date can't be before start date"),

  termsAndConditions: Yup.bool().oneOf([true], 'accept the t&C'),

});

const Foam = () => {
  const navigate = useNavigate();

  const [product_type, setproduct_type] = useState('');
  const [show, setShow] = useState(false);



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
  const [paymentdue, setpaymentdue] = useState("This payment of balance due will be billed over a two month period. The 1st in April 25th and the next on 15th may");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState(false);
  const [mystatus, setmystatus] = useState(false);
  const [editfield, seteditfield] = useState(false);
   var paymenti ="This payment of balance due will be billed over a two month period. The 1st in April 25th and the next on 15th may"
  const [searchValue, setSearchValue] = useState('');

  const [showInput, setShowInput] = useState(true);

  const [myoptions, setmyOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [sales_repMessage, setsales_repMessage] = useState(false);
  const [myname, setmyname] = useState(null);
  const [mysalesrep, setmysalesrep] = useState(null);
  const [myevent, setmyevent] = useState(null);
  const [myadvertiser, setmyadvertiser] = useState(null);
  const [myemail, setmyemail] = useState(null);
  const [myphone, setmyphone] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showform, setShowform] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [searcherror, setSearchError] = useState(false);
  const [mycost, setmycost] = useState('');
  const [trade, settrade] = useState('');
  const [abst, setabst] = useState('');
  const [grandtotal, setgrandtotal] = useState('');
  const [abstdiscount, setabstdiscount] = useState(0);

  const [weekhr, setweekhr] = useState('');
  const [tradeerr, settradeerr] = useState('');
  const [customerid, setcustomerid] = useState('');
  // const [monthDiff, setMonthDiff] = useState(null);
  const [myjan, setmyjan] = useState('');
  const [myfeb, setmyfeb] = useState('');
  const [mymar, setmymar] = useState('');
  const [myapril, setmyapril] = useState('');
  const [mymay, setmymay] = useState('');
  const [myjune, setmyjune] = useState('');
  const [myjuly, setmyjuly] = useState('');
  const [myaug, setmyaug] = useState('');
  const [mysept, setmysept] = useState('');
  const [myoct, setmyoct] = useState('');
  const [mynov, setmynov] = useState('');
  const [mydec, setmydec] = useState('');
  const[test,settest]=useState()
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [modalVisibility, setModalVisibility] = useState({});
  // const [searchvalerr,setsearchvalerr] = useState(false)
  const [paymenterr,setpaymenterr] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const[custname,setcustname]=useState('')

  // const [inputValues, setInputValues] = useState({
  //   sales_rep:"",
  //   advertiserr:"",
  //   name: "",
  //   event: "",
  //   phonee: "",
  //   email: "",
  // });

  const [fields, setFields] = useState([
    {
      product_type: '',
      runDates: '',
      perWeeks: '',
      rate: '',
     discount:0.00,
      cost: '',
      cost_tax: '',
      discounted_cost: '',
      total: '',
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      qty: '',
      runTimes: '',
      weekhr: weekhr,
      jan: 0,
      feb: 0,
      mar: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      aug: 0,
      sept:0,
      oct: 0,
      nov: 0,
      dec: 0,
      mystartdate:'',
      myenddate:"",
    },
  ]);

  const total = fields.reduce((accumulator, item) => accumulator + (parseFloat(item.cost) || 0), 0);
  // console.log(total, 'total');
  const total01 = fields.reduce((accumulator, item) => accumulator + (parseFloat(item.jan) || 0), 0);
  // console.log(total01, 'january');
 
 

  const openModal = () => {
    setShowModal(true);
 
  };

  const closeModal = () => {
    setShowModal(false);
    // console.log('sdsdsfd')
  };

  const handleAddCustomer = (values, { resetForm }) => {
    // Perform actions to add customer using values
    // console.log(values);

    axios.post(
      'http://3.142.245.136:8080/api/public/createcustomer',
         {
          name:values.name,
          email:values.email,
          mobile:values.mobile,
          address:values.address,
          company_name:values.company_name
         },


    
    )
    .then((resp) => {
      
      if (resp.data.code === 400) {
        // setTimeout(() => setLoading(false), 1000);
   
        toast.error(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
  


     
       if (resp.data.code === 200) {
    
        console.log(resp.data.name,'sbc2')
       
     
      
        toast.success(resp.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
       
      
       
      }
    })
    .catch((err) => {
      // setLoading(false);

      // console.log(err.response, 'err-message');

      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });

    resetForm();
    closeModal()
  };


  const handleSearch = async () => {
    try {
      setIsDisabled(true);
      const condition = {};

      if (searchValue) {
        condition[searchValue.includes('@') ? 'email' : 'mobile'] = searchValue;
      }

      await axios
        .post('http://3.142.245.136:8080/api/public/checkcustomer', condition, {
          headers: { 'x-token': localStorage.getItem('token') },
        })

        .then((response) => {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          // console.log(response.data.id, 'mydata');
          setmyname(response.data.name);
          // setmysalesrep(response.data[0].sales_rep);
          // setmyevent(response.data[0].event);
          // setmyadvertiser(response.data[0].advertiser);
          setmyemail(response.data.email);
          setmyphone(response.data.mobile);
          setIsDisabled(true);
          setcustomerid(response.data.id);
        })
        .catch((error) => {
          // Handle error
          // setIsDisabled(false);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.post(
          'http://3.142.245.136:8080/api/public/salesdropdown',
          {},
          {
            headers: { 'x-token': localStorage.getItem('token') },
          },
        );
        // console.log(response.data, 'saLESDROP');
        setmyOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, []);
  /////////////////////////////////////////////////////

  // const handleOpen = () => {
  //   setShowform(true);
  // };

  // const handleClose1 = () => {
  //   setShowform(false);
  //   setInputValues({
  //     name: '',
  //     sales_rep: '',
  //     advertiserr: '',
  //     event: '',
  //     email: '',
  //     phonee: '',
  //   });
  //   setValidationErrors({});
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit1 = (e) => {
  //   e.preventDefault();
  //   const errors = validateInputs(inputValues);
  //   if (Object.keys(errors).length === 0) {
  //     // Handle successful form submission
  //     console.log('Form submitted:', inputValues);
  //     handleClose1();
  //   } else {
  //     setValidationErrors(errors);
  //     console.log(errors,'sdsdserrror')
  //   }
  // };

  // const validateInputs = (values) => {
  //   let errors = {};
  //   // Add your validation logic here
  //   if (values.name.trim() === '') {
  //     errors.name = 'Name is required';
  //   }
  //   if (values.sales_rep.trim() === '') {
  //     errors.sales_rep = 'Sales Rep is required';
  //   }
  //   if (values.advertiserr.trim() === '') {
  //     errors.advertiserr = 'Advertiser is required';
  //   }
  //   if (values.event.trim() === '') {
  //     errors.event = 'Event is required';
  //   }
  //   if (values.email.trim() === '') {
  //     errors.email = 'Email is required';
  //   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //     errors.email = 'Email is invalid';
  //   }
  //   if (values.phonee.trim() === '') {
  //     errors.phonee = 'Phone is required';
  //   }

  //   return errors;
  // };

  //////////////////////////////////////////////////////////




 
  


















  const enableform = () => {
    setmyname('');
    setmysalesrep('');
    setmyevent('');
    setmyadvertiser('');
    setmyemail('');
    setmyphone('');
    setIsDisabled(false);
  };

  const disableform = () => {
    setIsDisabled(true);
  };

  const [usertype, setusertype] = useState('selectCustomer');
  const handleRadioChange = (event) => {
    setShowInput(event.target.value === 'selectCustomer');

    setusertype(event.target.value);
  };

  const signRef = useRef();
  const handleClear = () => {
    // console.log(signRef.current.clear());
    setmysign('');
  };

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  const handle = () => {
    if (
      signRef.current === '' ||
      signRef.current === undefined ||
      signRef.current === null ||
      signRef.current.isEmpty()
    ) {
      return;
    } else {
      setmysign(signRef.current.toDataURL());
    }
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

  var calrate;
  const ratecaculate = () => {
    calrate = event * rate;
    setcost(calrate);

    return calrate;
  };

  
  //   const startdate = '2022-07-20';
  //   const enddate = '2022-08-15';

  //   const startDate = moment(startdate, 'YYYY-MM-DD');
  //   const endDate = moment(enddate, 'YYYY-MM-DD');

  //   const startYear = startDate.year();
  //   const startMonth = startDate.month();
  //   const endYear = endDate.year();
  //   const endMonth = endDate.month();

  //   let currentDate = startDate.clone();
  //   let monthData = [];

  //   while (currentDate <= endDate) {
  //     const year = currentDate.year();
  //     const month = currentDate.month();

  //    const daysInMonth = currentDate.daysInMonth();
  //     let weekdayCounts = {
  //       Monday: 0,
  //       Tuesday: 0,
  //       Wednesday: 0,
  //       Thursday: 0,
  //       Friday: 0,
  //       Saturday: 0,
  //       Sunday: 0,
  //     };
  //    for (let day = 1; day <= daysInMonth; day++) {

  //         currentDate.date(day);
  //         const weekday = currentDate.format('dddd');

  //         weekdayCounts[weekday]++;
  //       }

  //       monthData.push({ year, month, weekdayCounts });

  //     currentDate = currentDate.clone().add(1, 'month').date(1);
  //   }

  //   console.log('Month-wise data:', monthData);
  // };

  function handle123(i,startdate,enddate) {
    // console.log(startdate,'ss')

    const values = [...fields];

 
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

   
  

   




    
    // console.log(startdate,'dssdds123')
    // console.log(enddate,'dssdds123')
    
    
    let start = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    let end = moment(enddate, 'YYYY-MM-DD'); //right now (or define an end date yourself)
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

    let startDate = moment(startdate).format('YYYY-MM-DD');
    let endDate = moment(enddate).format('YYYY-MM-DD');
    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    // console.log(startDate, 'start123');
    // console.log(endDate, 'end');
    // console.log(startDate,'startdate132')
    if (startDate < endDate) {

     
      let date = moment(startDate).startOf('month');

      while (date < moment(endDate).endOf('month')) {
        // console.log(date,"while.......")
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('YYYY-MM'));

        date.add(1, 'month');
      }
    }


    values[i]['jan']= 0.00
    values[i]['feb']= 0.00
    values[i]['mar']= 0.00

    values[i]['april']= 0.00
    values[i]['may']= 0.00
    values[i]['sept']= 0.00
    values[i]['oct']= 0.00
    values[i]['nov']= 0.00
    values[i]['dec']= 0.00

    values[i]['jun']= 0.00
    values[i]['july']= 0.00
    values[i]['aug']= 0.00

    for (let j = 0; j < betweenMonths.length; j++) {

      // console.log("for loop.......")

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

        // console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
      // console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 2:
          values[i]['feb']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 3:
          values[i]['mar']=Number(totalcost)
          // console.log(totalcost)

          break;
        case 4:
          values[i]['april']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 5:
          values[i]['may']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 6:
          values[i]['june']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 7:
          values[i]['july']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 8:
          values[i]['aug']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 9:
          values[i]['sept']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 10:
          values[i]['oct']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 11:
          values[i]['nov']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 12:
          values[i]['dec']=Number(totalcost)
          
          break;

        default:
          // console.log('none value selected');
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

    setFields(values);

    // let startYear = startDate.year();
    // let startMonth = startDate.month();
    // let endYear = endDate.year();
    // let endMonth = endDate.month();

    //     const startDate = moment(startdate, 'YYYY-MM-DD'); // Replace with your start date
    // const endDate = moment(enddate, 'YYYY-MM-DD'); // Replace with your end date

    // const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // let currentDay = moment(startDate);
    // let daysArray = [];
    // let daysObject = {};

    // for (let i = 0; i < 7; i++) {
    //   const dayName = dayNames[currentDay.day()];
    //   let value = 0;

    //   if (currentDay.isBetween(startDate, endDate, null, '[]') || currentDay.isSame(startDate) || currentDay.isSame(endDate)) {
    //     value = 1;
    //   }

    //   daysArray.push({ day: dayName, value: value });
    //   daysObject[dayName] = value;

    //   currentDay.add(1, 'day'); // Move to the next day
    // }

    // console.log('Days Array:', daysArray);
    // console.log('Days Object:', daysObject);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const startDate = moment(); // Replace with your start date
    // const endDate = new Date('2022-08-15'); // Replace with your end date
    // const startDate = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    // const endDate = moment(enddate, 'YYYY-MM-DD');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // var gettotalsecond =  ((Number(values[i]['monday'])* daysObject['Monday']) +
    // (Number(values[i]['tuesday'])*daysObject['Tuesday'] )+
    // (Number(values[i]['wednesday']) *daysObject['Wednesday'])+
    // ( Number(values[i]['thursday'])*daysObject['Thursday'] )+
    // (Number(values[i]['friday']) *daysObject['Friday']) +
    // (Number(values[i]['saturday'])*daysObject['Saturday'] )+
    // (Number(values[i]['sunday']))*daysObject['Sunday'] )*30

    // var hours = Math.floor(gettotalsecond / 3600);
    // var min = Math.floor((gettotalsecond % 3600) / 60);
    // var sec = gettotalsecond%60

    // setweekhr(
    //   hours + ":" +min + ":" + sec
    // )

    // console.log(Number(values[i]['tuesday']), 'tuesday');

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
      setErrorMessage1(false);
    } else {
      setErrorMessage1(true);
      setproduct_type(fields[i].product_type);
    }
  }




  function handleChange(i, event, fieldname) {
    const values = [...fields];
    values[i][event.target.name] = event.target.value;


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

        // console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
      // console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 2:
          values[i]['feb']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 3:
          values[i]['mar']=Number(totalcost)
          // console.log(totalcost)

          break;
        case 4:
          values[i]['april']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 5:
          values[i]['may']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 6:
          values[i]['june']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 7:
          values[i]['july']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 8:
          values[i]['aug']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 9:
          values[i]['sept']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 10:
          values[i]['oct']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 11:
          values[i]['nov']=Number(totalcost)
          // console.log(totalcost)
          break;
        case 12:
          values[i]['dec']=Number(totalcost)
          
          break;

        default:
          // console.log('none value selected');
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

    setFields(values);

    // let startYear = startDate.year();
    // let startMonth = startDate.month();
    // let endYear = endDate.year();
    // let endMonth = endDate.month();

    //     const startDate = moment(startdate, 'YYYY-MM-DD'); // Replace with your start date
    // const endDate = moment(enddate, 'YYYY-MM-DD'); // Replace with your end date

    // const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // let currentDay = moment(startDate);
    // let daysArray = [];
    // let daysObject = {};

    // for (let i = 0; i < 7; i++) {
    //   const dayName = dayNames[currentDay.day()];
    //   let value = 0;

    //   if (currentDay.isBetween(startDate, endDate, null, '[]') || currentDay.isSame(startDate) || currentDay.isSame(endDate)) {
    //     value = 1;
    //   }

    //   daysArray.push({ day: dayName, value: value });
    //   daysObject[dayName] = value;

    //   currentDay.add(1, 'day'); // Move to the next day
    // }

    // console.log('Days Array:', daysArray);
    // console.log('Days Object:', daysObject);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const startDate = moment(); // Replace with your start date
    // const endDate = new Date('2022-08-15'); // Replace with your end date
    // const startDate = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    // const endDate = moment(enddate, 'YYYY-MM-DD');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // var gettotalsecond =  ((Number(values[i]['monday'])* daysObject['Monday']) +
    // (Number(values[i]['tuesday'])*daysObject['Tuesday'] )+
    // (Number(values[i]['wednesday']) *daysObject['Wednesday'])+
    // ( Number(values[i]['thursday'])*daysObject['Thursday'] )+
    // (Number(values[i]['friday']) *daysObject['Friday']) +
    // (Number(values[i]['saturday'])*daysObject['Saturday'] )+
    // (Number(values[i]['sunday']))*daysObject['Sunday'] )*30

    // var hours = Math.floor(gettotalsecond / 3600);
    // var min = Math.floor((gettotalsecond % 3600) / 60);
    // var sec = gettotalsecond%60

    // setweekhr(
    //   hours + ":" +min + ":" + sec
    // )

    // console.log(Number(values[i]['tuesday']), 'tuesday');

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
      setErrorMessage1(false);
    } else {
      setErrorMessage1(true);
      setproduct_type(fields[i].product_type);
    }
  }

  // console.log(startdate, enddate, 'startdate');

  function handleAdd() {
    const newrow = {
      product_type: '',
      runDates: '',
      perWeeks: '',
      rate: '',
      discount: '',
      cost: '',
      cost_tax: '',
      discounted_cost: '',
      total: '',
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      qty: '',
      runTimes: '',
      jan: 0,
      feb: 0,
      mar: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      aug: 0,
      sept:0,
      oct: 0,
      nov: 0,
      dec: 0,
    };
    setFields([...fields, newrow]);
  }

  const handleDelete = (index1) => {
    const values = fields.filter((data, i) => i !== index1);

    setFields(values);
  };

  var orderid =
    'VIBZ' +
    '-' +
    Math.floor(100000 + Math.random() * 900000) +
    '-' +
    Math.floor(100 + Math.random() * 90);

  // console.log(orderid);

  const handlePaymentDue = (event) => {
    const value = event.target.value;
    setpaymentdue(value);
  
    setpaymenterr(value.trim() === "");
  
  };


   
 

  let totaldiscount = total - trade;



  let myvalue = ((totaldiscount * abstdiscount) / 100).toFixed(2);

  let grand = Number(totaldiscount)+Number(myvalue)
  // + Number(myvalue);

  return (
    <>
      <Container>
        <Formik
          initialValues={{
            // sales_rep: '',
            Advertiser: '',
            name: '',
            event: '',
            phone: '',
            email: '',
            start_date: '',
            end_date: '',
            product_type: '',
            termsAndConditions: false,
          }}
          validationSchema={
            usertype === 'selectCustomer' ? validationSchemaforDisabled : validationSchema
          }
          onSubmit={(values) => {
            setLoading(true);

            // console.log(values, 'okkkk');
          
             if(mysign === '' || mysign === undefined || mysign === null) {
              setmysignerror(true);
              
              setTimeout(() => setLoading(false), 2000);
            } 
            
            
            else {
              setmysignerror(false);
           

              var payload = {};

              if (usertype === 'selectCustomer') {
                payload = {
                  sales_rep: mysalesrep,
                  advertiser: myadvertiser,
                  name: myname,
                  event: myevent,
                  phone: myphone,
                  email: myemail,
                  orderid: orderid,
                  sign: mysign,
                  paymentdue: paymentdue,
                  user_type: usertype,
                  weekhr: weekhr,
                  customerid: customerid,
                  cost: total,
                  trade: Number(trade),
                  discountabst: abstdiscount,
                  abst: Number(myvalue),
                  grandtotal: grand,

                  fields: [
                    fields.map((item, index) => ({
                      product_type: fields[index].product_type,
                      rate: fields[index].rate,
                      discount: Number(fields[index].discount),
                      start_date: moment(fields[index].runDates.startdate, 'YY-MM-DD'),
                      end_date: moment(fields[index].runDates.enddate, 'YY-MM-DD'),
                      discounted_cost: fields[index].discounted_cost,
                      cost: fields[index].cost,
                      cost_tax: fields[index].cost_tax,
                      monday: fields[index].monday,
                      tuesday: fields[index].tuesday,
                      wednesday: fields[index].wednesday,
                      thursday: fields[index].thursday,
                      friday: fields[index].friday,
                      saturday: fields[index].saturday,
                      sunday: fields[index].sunday,
                      qty: fields[index].qty,
                      total: fields[index].total,
                      starttime: moment(fields[index].runTimes.starttime, 'HH-MM'),
                      endtime: moment(fields[index].runTimes.endtime, 'HH-MM'),
                      jan:fields[index].jan,
                      feb: fields[index].feb,
                      mar:fields[index].mar,
                      april:fields[index].april,
                      may:fields[index].may,
                      june: fields[index].june,
                      july: fields[index].july,
                      aug: fields[index].aug,
                      sept:fields[index].sept,
                      oct: fields[index].oct,
                      nov: fields[index].nov,
                      dec: fields[index].dec,
                    })),
                  ],
                };
              } else {
                payload = {
                  sales_rep: mysalesrep,
                  advertiser: values.Advertiser,
                  name: values.name,
                  event: values.event,
                  phone: values.phone,
                  email: values.email,
                  orderid: orderid,
                  sign: mysign,
                  paymentdue: paymentdue,
                  user_type: usertype,
                  weekhr: weekhr,
                  cost: total,
                  trade: Number(trade),
                  discountabst: abstdiscount,
                  abst: Number(myvalue),
                  grandtotal: grand,

                  fields: [
                    fields.map((item, index) => ({
                      product_type: fields[index].product_type,
                      rate: fields[index].rate,
                      discount: Number(fields[index].discount),
                      start_date: moment(fields[index].runDates.startdate, 'YY-MM-DD'),
                      end_date: moment(fields[index].runDates.enddate, 'YY-MM-DD'),

                      discounted_cost: fields[index].discounted_cost,
                      cost: fields[index].cost,
                      cost_tax: fields[index].cost_tax,
                      monday: fields[index].monday,
                      tuesday: fields[index].tuesday,
                      wednesday: fields[index].wednesday,
                      thursday: fields[index].thursday,
                      friday: fields[index].friday,
                      saturday: fields[index].saturday,
                      sunday: fields[index].sunday,
                      qty: fields[index].qty,
                      total: fields[index].total,
                      starttime: moment(fields[index].runTimes.starttime, 'HH-MM'),
                      endtime: moment(fields[index].runTimes.endtime, 'HH-MM'),
                      jan:fields[index].jan,
                      feb: fields[index].feb,
                      mar:fields[index].mar,
                      april:fields[index].april,
                      may:fields[index].may,
                      june: fields[index].june,
                      july: fields[index].july,
                      aug: fields[index].aug,
                      sept:fields[index].sept,
                      oct: fields[index].oct,
                      nov: fields[index].nov,
                      dec: fields[index].dec,
                    })),
                  ],
                };
              }
              axios
                .post(
                  'http://3.142.245.136:8080/api/public/getdata',
                  payload,

                  {
                    headers: { 'x-token': localStorage.getItem('token') },
                  },
                )
                .then((resp) => {
                  if (resp.data.code == 400) {
                    setTimeout(() => setLoading(false), 1000);
                    toast.error(resp.data.message, {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }

                  // console.log(resp.data.message, 'hjjhjhj');
                  if (resp.data.code == 200) {
                    toast.success(resp.data.message, {
                      position: toast.POSITION.TOP_CENTER,
                    });

                    navigate('/dashboard/agreementlist', { replace: true });
                  }
                })
                .catch((err) => {
                  setLoading(false);

                  // console.log(err.response, 'err-message');

                  toast.error(err.message, {
                    position: toast.POSITION.TOP_CENTER,
                  });
                });
            }
          }}
        >
          {({ errors, touched, values, handleSubmit, isSubmitting }) => (
            <Form className="form-con form-inline" onSubmit={handleSubmit}>
              <Card className="mb-3 px-3 py-3">
                {/* <h3 className="mb-3 heading-nw"> Customer Info</h3> */}
               <div className='row'> 
                <div className=" col-4">
                  <div className="mb-2">
                    <label>
                      {/* <input
                        type="radio"
                        name="radio"
                        value="selectCustomer"
                        checked={showInput}
                        onClick={disableform}
                        onChange={handleRadioChange}
                      /> */}
                      {/* <span style={{ marginLeft: '4px' }}>Select Customer With Email/Phone</span> */}
                      {showInput && (
                        <form onSubmit={handleSubmit}>
                          <p style={{ marginTop: '5px' }}>Search Customer with Email/Phone</p>
                          <div style={{ display: 'flex' }}>
                            <div>
                              <Field
                                className="form-control"
                                type="text"
                                name="emailsearch"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                style={{ width: '110%', marginTop: '-17px' }}
                              />
                            </div>
                           

                            <Button
                              // type='submit'
                              // disable={isDisabled}
                              onClick={() => handleSearch()}
                              style={{ marginLeft: '30px', marginTop: '-16px' }}
                            >
                              search
                            </Button>

               
                          </div>




                                          
                        </form>
                      )}
                    </label>
                  </div>
                  <div style={{ alignItems: 'center' }}>
                    <label>
                      {/* <input
                        type="radio"
                        name="radio"
                        value="addNew"
                        onClick={enableform}
                        checked={!showInput}
                        onChange={handleRadioChange}
                      /> */}
                      {/* <span style={{ marginLeft: '4px' }}>Add New Customer</span> */}
                    </label>
                  </div>
                </div>
   <div className='add-cust-btn col-8'>
 <div className="btn create-invo" onClick={()=>openModal()}>
        Add Customer +
      </div>

<Customerpopup
       key="customer-popup-1" 
       showModal ={showModal}
        closeModal={closeModal}
        handleAddCustomer={handleAddCustomer}
        // onClick={()=>openModal()}
      />
      </div>

                </div>
                
                {/*
                <div >
      <div className="btn create-invo" onClick={() => setShowModal(true)}>
        Add Customer +
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
            onSubmit={handleAddCustomer}
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
                  <Form.Label>mobile</Form.Label>
                  <Field
                    type="text"
                    name="mobile"
                    className={`form-control ${
                      touched.mobile && errors.mobile ? 'is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="invalid-feedback"
                  />
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
    </div>  */}
   
                <div className="form ">
                  <div className="row">
                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="name" className="label-con">
                            Name
                          </label>
                          {usertype === 'selectCustomer' ? (
                            ''
                          ) : (
                            <>
                              {errors.name && touched.name ? (
                                <div className="error-message">{errors.name}</div>
                              ) : null}
                            </>
                          )}
                        </div>
                      
                        <div className="input-er-con">
                          {isDisabled ? (
                            <Field
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              value={myname}
                              disabled={isDisabled}
                              onChange={(e) => setmyname(e.target.value)}
                            />
                          ) : ( 
                            <Field
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              value={custname}
                              // disabled={isDisabled}
                              onChange={(e) => setcustname(e.target.value)}
                             
                            />
                         )} 
                        </div>
                      </div>
                    </Col>
                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="phone" className="label-con">
                            Phone
                          </label>
                          {usertype === 'selectCustomer' ? null : (
                            <>
                              {errors.phone && touched.phone ? (
                                <div className="error-message">{errors.phone}</div>
                              ) : null}
                            </>
                          )}
                        </div>
                        <div className="input-er-con">
                          {isDisabled ? (
                            <Field
                              //  name="phone"
                              min={0}
                              type="number"
                              className="form-control"
                              placeholder="Phone"
                              value={myphone}
                              disabled={isDisabled}
                              onChange={(e) => setmyphone(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="phone"
                              min={0}
                              type="number"
                              className="form-control"
                              placeholder="Phone"
                            />
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="email" className="label-con">
                            Email
                          </label>
                          {usertype === 'selectCustomer' ? (
                            ''
                          ) : (
                            <>
                              {' '}
                              {errors.email && touched.email ? (
                                <div className="error-message">{errors.email}</div>
                              ) : null}
                            </>
                          )}
                        </div>
                        <div className="input-er-con">
                          {isDisabled ? (
                            <Field
                              // name="email"
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              value={myemail}
                              disabled={isDisabled}
                              onChange={(e) => setmyemail(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="email"
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              // value={myemail}
                              // disabled={isDisabled}
                              // onChange={(e) => setmyemail(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    </Col>

                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="event" className="label-con">
                            Event
                          </label>
                          {usertype === 'selectCustomer' ? (
                            ''
                          ) : (
                            <>
                              {errors.event && touched.event ? (
                                <div className="error-message">{errors.event}</div>
                              ) : null}
                            </>
                          )}
                        </div>
                        <div className="input-er-con">
                          {isDisabled ? (
                            <Field
                              // name="event"
                              type="text"
                              className="form-control"
                              placeholder="Event"
                              value={myevent}
                              // disabled={isDisabled}
                              onChange={(e) => setmyevent(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="event"
                              type="text"
                              className="form-control"
                              placeholder="Event"
                              // value={myevent}
                              // // disabled={isDisabled}
                              // onChange={(e) => setmyevent(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="sales_rep" className="label-con">
                            Sales Rep
                          </label>
                          {/* {errors.sales_rep && touched.sales_rep ? (
                      <div className="error-message">{errors.sales_rep}</div>
                    ) : null} */}
                          {/* {(!sales_repMessage)?<><div className="requirederor" style={{color:"red"}}>sales rep is required !</div></>:<></>} */}
                        </div>
                        <div className="input-er-con">
                          {/* <Field
                      name="sales_rep"
                      type="text"
                      className="form-control"
                      placeholder="Sales Rep"
                      value={values.sales_rep}
                    /> */}

                          <select
                            className="dropdown"
                            value={mysalesrep}
                            // disabled={isDisabled}
                            onChange={(e) => setmysalesrep(e.target.value)}
                            //  onChange={handleOptionChange}
                          >
                            <option value="">Select an option</option>
                            {myoptions.map((option) => (
                              <option key={option.id} defaultValue={mysalesrep}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </Col>
                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="Advertiser" className="label-con">
                            Advertiser
                          </label>
                          {usertype === 'selectCustomer' ? (
                            ''
                          ) : (
                            <>
                              {errors.Advertiser && touched.Advertiser ? (
                                <div className="error-message">{errors.Advertiser}</div>
                              ) : null}
                            </>
                          )}
                        </div>

                        <div className="input-er-con">
                          {isDisabled ? (
                            <Field
                              // name="Advertiser"
                              type="text"
                              className="form-control"
                              placeholder="Advertiser"
                              value={myadvertiser}
                              // disabled={isDisabled}
                              onChange={(e) => setmyadvertiser(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="Advertiser"
                              type="text"
                              className="form-control"
                              placeholder="Advertiser"
                              // value={myadvertiser}
                              // // disabled={isDisabled}
                              // onChange={(e) => setmyadvertiser(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </Card>





              <Card className="mb-3 px-3 py-3">
                <h3 className="mb-3 heading-nw"> Product Details</h3>
                {/* /////////////////////////////////////////////////////////////////////// */}

                <>
                  {/* <button className="button-b" style={{ padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: "mystatus" ? '#2ecc71' : '#e74c3c',
                  cursor: 'pointer'
                }}
                 >
      </button> */}

                  {/* <div
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  background:"orangered",
                  color:"white",
                  borderRadius:'10px',
                  marginRight:'50px',
                  paddingLeft:'10px',
                }}
              >
                Item :-
              </div> */}

                  <div className="container">
                    <Button
                      type="button"
                      style={{ float: 'right' }}
                      className="btn btn-outline-success add-btn"
                      onClick={() => handleAdd()}
                    >
                      Add Item +
                    </Button>
                    <div className="">
                      <div className="table-responsive " id="style-2">
                        <Table className="">
                          <thead className="tr-row">
                            <tr className="text-center">
                              <th>Product Type</th>
                              <th>Run Dates</th>
                              <th>Run Time</th>
                              <th className="th-perwk">Per Weeks</th>
                              <th>Rate</th>
                              {/* <th>Discount</th> */}
                              <th>Cost</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {fields.map((field, index) =>
                             
                             (
                            
                              <tr key={index}>
                                 {/* {console.log(index,'ddsdgv')} */}
                                <td>
                                  <div className="form-group" style={{ width: '' }}>
                                    <select
                                      value={field.product_type}
                                      defaultValue="spots"
                                      name="product_type"
                                      id="product_type"
                                      className="dropdown"
                                      onChange={(event) => handleChange(index, event)}
                                    >
                                      <option value="">select product type</option>
                                      <option selected value="spots">
                                        spots
                                      </option>
                                      <option value="Mentions">Mentions</option>
                                      <option value="Half Hours">Half Hours</option>
                                      <option value="outside Broadcast">outside Broadcast</option>
                                    </select>
                                    {!errorMessage1 ? (
                                      <>
                                        <div className="requirederor" style={{ color: 'red' }}>
                                          product type is required !
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </td>

                                <td colspan="1" className="form-group">
                                  <div
                                    // style={{ width: "130px" }}
                                    className="form-group"
                                  >
                                    <div style={{ border: 'none' }} className="date-range">
                                      <RangePicker
                                        name="runDates"
                                        // onChange={(event) => handleChange(index, event,)}
                                        onChange={(values, event) => {

                                          // console.log(event)
                                          if (event.length === 0) {
                                            // console.log('requires');
                                          } else {
                                            // console.log('not');
                                            
                                          }

                                          if (values !== null) {
                                            handle123(index,values[0].$d,values[1].$d)
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
                                            // handle123(index,values[0].$d,values[1].$d)
                                            // console.log(startdate);
                                          }
                                          else{
                                        // fields[index].cost = 0
                                        handle123(index,'','')
                                        setstartdate('')
                                        setenddate('')
                                        const valuess = [...fields];
                                        valuess[index]['runDates'] = {
                                          startdate: '',
                                          enddate: '',
                                        };
                                            
                                          }
                                        }}
                                      />

                                      {/* </div> */}
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

                                <td colspan="1">
                                  <div className="form-group">
                                    <div
                                      //  style={{width:"120px"}}
                                      className="date-range"
                                    >
                                      <TimePicker.RangePicker
                                        name="runTimes"
                                        onChange={(values, event) => {
                                          if (event.length === 0) {
                                            // console.log('requires');
                                          } else {
                                            // console.log('not');
                                          }

                                          if (values !== null) {
                                            // console.log(values.length);
                                            // console.log(event.length, 'event');

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

                                            // console.log(values, 'ghm');
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
                                  </div>
                                </td>

                                <td>
                                  <div
                                    className="form-group"
                                    // style={{ width: "10px"  }}
                                  >
                                    <Form.Control
                                      onClick={()=>handleShow(index)}
                                      className="popup-btn"
                                      type="total"
                                      // name={`total${index}`}
                                      value={field.total}
                                      placeholder="Select Days"
                                      style={{ width: '100%' }}
                                    
                                    />
                                    {/* </button> */}

                                    <Modal className="pop-btn"   show={modalVisibility[index]} key={`modal-${index}`} onHide={() => handleClose(index)}>
                                      {/* {console.log(`modal-${index}`,'modal index')} */}
                                      <Modal.Header closeButton>
                                        <Modal.Title>select Days</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <Form className="popup-container" validated={false}>
                                          <Form.Group
                                            className="popup-grp mb-3 px-3"
                                            id="mon"
                                            controlId="exampleForm.ControlInput1"
                                          >
                                            <div className="label-con1">1</div>
                                            <Form.Label name="monday" className="label-con1">
                                              Monday
                                            </Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="number"
                                              min={0}
                                              value={field.monday}
                                              onChange={(event) => handleChange(index, event)}
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
                                            <Form.Label className="label-con1">Tuesday</Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="number"
                                              min={0}
                                              value={field.tuesday}
                                              onChange={(event) => handleChange(index, event)}
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
                                              value={field.wednesday}
                                              onChange={(event) => handleChange(index, event)}
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
                                            <Form.Label className="label-con1">Thursday</Form.Label>
                                            <Form.Control
                                              type="number"
                                              min={0}
                                              className="popup-control"
                                              value={field.thursday}
                                              onChange={(event) => handleChange(index, event)}
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
                                            <Form.Label className="label-con1">Friday</Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="number"
                                              min={0}
                                              value={field.friday}
                                              onChange={(event) => handleChange(index, event)}
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
                                            <Form.Label className="label-con1">Saturday</Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="number"
                                              min={0}
                                              value={field.saturday}
                                              onChange={(event) => handleChange(index, event)}
                                              name="saturday"
                                              placeholder="saturday"
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="popup-grp mb-3 px-3"
                                            controlId="exampleForm.ControlInput1"
                                          >
                                            <div className="label-con1">7</div>
                                            <Form.Label className="label-con1">Sunday</Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="number"
                                              min={0}
                                              value={field.sunday}
                                              onChange={(event) => handleChange(index, event)}
                                              name="sunday"
                                              placeholder="sunday"
                                            />
                                          </Form.Group>
                                          <Form.Group
                                            className="popup-grp mb-3 px-3"
                                            controlId="exampleForm.ControlInput1"
                                          >
                                            <div className="label-con1">8</div>
                                            <Form.Label className="label-con1">Total</Form.Label>
                                            <Form.Control
                                              className="popup-control"
                                              type="total"
                                              name="total"
                                              min={1}
                                              value={field.total}
                                              onChange={(event) => handleChange(index, event)}
                                              placeholder="total"
                                            />
                                          </Form.Group>
                                        </Form>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary"  onClick={() => handleClose(index)}>
                                          Close
                                        </Button>
                                        {/* <Button variant="primary"  onClick={() => handleClose()}>
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
                                      value={field.rate}
                                      onChange={(event) => handleChange(index, event)}
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
                                      value={field.discount}
                                      onChange={(event) => handleChange(index, event)}
                                      step="any"
                                      name="discount"
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
                                      value={field.cost}
                                      onChange={(event) => handleChange(index, event)}
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
                                      //  style={{marginLeft:"-22px"}}
                                      step="0.01"
                                      value={field.discounted_cost}
                                      onChange={(event) => handleChange(index, event)}
                                      name="discounted_cost"
                                      min={0}
                                      type="number"
                                      className="form-control as"
                                    />
                                  </div>
                                </td> */}
                                {/* 
                                <td style={{}}>
                                  <div className="form-group">
                                    <input
                                      style={{ marginLeft: '-22px' }}
                                      step="0.01"
                                      value={field.cost_tax}
                                      onChange={(event) => handleChange(index, event)}
                                      name="cost_tax"
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
                            ))}
                          </tbody>
                        </Table>

                        <div style={{ float: 'right' }}>
                          <div>
                            <span className="totalcosttext">cost:</span>
                            <input
                              className="totalcost1"
                              type="number"
                              Value={total}
                              onChange={(e) => setmycost(e.target.value)}
                              disabled={isDisabled}
                              readOnly
                            />
                          </div>
                          <div>
                            <span className="totalcosttext">Trade:</span>

                            <input
                              className="totalcost2"
                              type="number"
                              Value={trade}
                              onChange={(e) => settrade(e.target.value)}
                            />
                          </div>
                          <div>
                            <span className="totaltext" style={{ paddingRight: '5px' }}>
                              Abst%:
                            </span>
                            <input
                              className="totalcost5"
                              type="number"
                              Value={abstdiscount}
                              onChange={(e) => setabstdiscount(e.target.value)}
                            />
                            <input
                              className="totalcost3"
                              type="number"
                              Value={myvalue}
                              onChange={(e) => setabst(e.target.value)}
                              disabled={isDisabled}
                            />
                          </div>
                          <div>
                            <span className="totalcosttext">Total:</span>
                            <input
                              className="totalcost4"
                              type="number"
                              Value={grand}
                              onChange={(e) => setgrandtotal(e.target.value)}
                              disabled={isDisabled}
                              readOnly
                            />
                          </div>
                        </div>
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
                <h3 className="mb-3 heading-nw"> Payment Condition</h3>
                <div className="signaturearea">
                  {editfield ? (
                    <>
                      {' '}
                      <div>
                        <input
                          type="text"
                          style={{ width: '950px' }}
                          value={paymentdue}
                          onChange={handlePaymentDue}
                        />
                        <Button
                          style={{ marginLeft: '15px' }}
                          onClick={() => {
                            seteditfield(false);
                          }}
                        >
                          Done
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{paymentdue}</span>
                      <Button
                        style={{ marginLeft: '15px' }}
                        onClick={() => {
                          seteditfield(true);
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}

                  {paymenterr ? (
                    <>
                      <div className="requirederor" style={{ color: 'red' }}>
                        this field is required !
                      </div>
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
                          <span className="requirederor" style={{ color: 'red' }}>
                            Signature is required !
                          </span>
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
                        {loading ? 'Loading....' : 'Submit'}
                      </Button>
                    </div>

                    {/* <div>
      <button onClick={calculateMonthsAndWeekdays}>Calculate</button>
    </div> */}
                  </Col>
                </Row>
              </Card>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Foam;
