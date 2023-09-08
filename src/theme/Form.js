import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas';
import parsePhoneNumberFromString from 'libphonenumber-js';

import { AiOutlineLogout } from 'react-icons/ai';
import { Icon } from '@iconify/react';
import { BiSearch } from "react-icons/bi";

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
const validationSchemaforDisabled = Yup.object({
  termsAndConditions: Yup.bool().oneOf([true], 'accept the t&C'),
});
const validationSchema = Yup.object({
  Advertiser: Yup.string().required('Required'),

  name: Yup.string().required('Required'),

  address: Yup.string().required('Required'),
  company_name: Yup.string().required('Required'),

  start_date: Yup.date(),
  end_date: Yup.date().min(Yup.ref('start_date'), "end date can't be before start date"),
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
  const [paymentdue, setpaymentdue] = useState(' ');
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState(false);
  const [mystatus, setmystatus] = useState(false);
  const [editfield, seteditfield] = useState(false);
  var paymenti =
    'This payment of balance due will be billed over a two month period. The 1st in April 25th and the next on 15th may';
  const [searchValue, setSearchValue] = useState('');

  const [showInput, setShowInput] = useState(true);

  const [myoptions, setmyOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [sales_repMessage, setsales_repMessage] = useState(false);
  const [myname, setmyname] = useState('');
  const [mysalesrep, setmysalesrep] = useState('');
  const [myevent, setmyevent] = useState('');
  const [myadvertiser, setmyadvertiser] = useState('');
  const [myemail, setmyemail] = useState('');
  const [myphone, setmyphone] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showform, setShowform] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [searcherror, setSearchError] = useState(false);
  const [mycost, setmycost] = useState('');
  const [trade, settrade] = useState('');
  const [abst, setabst] = useState('');
  const [grandtotal, setgrandtotal] = useState('');
  const [abstdiscount, setabstdiscount] = useState(0);
  const [dateerror, setdateerror] = useState(false);

  const [weekhr, setweekhr] = useState('');
  const [tradeerr, settradeerr] = useState('');
  const [mycustomerid, setmycustomerid] = useState('');
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
  const [test, settest] = useState();
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [modalVisibility, setModalVisibility] = useState({});
  // const [searchvalerr,setsearchvalerr] = useState(false)
  const [paymenterr, setpaymenterr] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [custname, setcustname] = useState('');
  const [custemail, setcustemail] = useState('');
  const [custmobile, setcustmobile] = useState('');
  const [custadvetiser, setcustadvetiser] = useState('');
  const [tandc, settandc] = useState('');
  const [mydropdown, setmydropdown] = useState('Trade');
  const [nameerror, setnameerror] = useState(false);
  const [eventerror, seteventerror] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('true');
  const[salesreperor,setsalesreperror]=useState(false)

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
      discount: 0.0,
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
      sept: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      mystartdate: '',
      myenddate: '',
    },
  ]);

  const total = fields.reduce((accumulator, item) => accumulator + (parseFloat(item.cost) || 0), 0);
  // console.log(total, 'total');
  const total01 = fields.reduce(
    (accumulator, item) => accumulator + (parseFloat(item.jan) || 0),
    0,
  );
  // console.log(total01, 'january');

  const handledropdown = (event) => {
    setmydropdown(event.target.value);
  };

  // console.log(mydropdown,'dsdfdfs')

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddCustomer = (customer, resetForm) => {
    // Perform actions to add customer using values
    const phoneNumber = parsePhoneNumberFromString(customer.mobile);

    console.log(customer.mobile, 'dssdsds520');
    console.log(customer, 'dssdsds520');
    if (!phoneNumber || !phoneNumber.isValid()) {
      // Handle invalid phone number
      console.log('Invalid phone number:', customer.mobile);
      return;
    }

    const formattedPhoneNumber = phoneNumber.formatInternational();

    axios
      .post('https://api.familyfm.ltd:8080/api/public/createcustomer', {
        name: customer.name,
        email: customer.email,
        mobile: formattedPhoneNumber,
        address: customer.address,
        company_name: customer.company_name,
      })
      .then((resp) => {
        if (resp.data.code === 400) {
          // setTimeout(() => setLoading(false), 1000);

          toast.error(resp.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        if (resp.data.code === 200) {
          setmycustomerid(resp.data.data.id);
          setmyname(resp.data.data.name);
          setmyphone(resp.data.data.mobile);
          console.log(resp.data.data.mobile, 'fd');
          console.log(resp.data.data.email, 'fdemail');
          setmyemail(resp.data.data.email);
          setmyadvertiser(resp.data.data.company_name);

          console.log(resp.data.data.mobile, 'data');
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

    closeModal();
  };

  const handleSearch = async () => {
    try {
      setIsDisabled(true);
      // const condition = searchValue;

  

      await axios
        .post('https://api.familyfm.ltd:8080/api/public/checkcustomer', {searchValue}, {
          headers: { 'x-token': localStorage.getItem('token') },
        })

        .then((response) => {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });

          setmyname(response.data.name);

          setmyemail(response.data.email);
          setmyphone(response.data.mobile);
          console.log(response.data.mobile, 'fd2');
          console.log(response.data.email, 'fdemai2');
          setmyadvertiser(response.data.company_name);
          setIsDisabled(true);
          setmycustomerid(response.data.id);
          console.log(response.data.id, '1235');
        })
        .catch((error) => {});
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.post(
          'https://api.familyfm.ltd:8080/api/public/salesdropdown',
          {},
          {
            headers: { 'x-token': localStorage.getItem('token') },
          },
        );

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

  const handleOptionChange = (event) => {
    setSelectedOption1(event.target.value);
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

  const handleClose = (index) => {
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: false,
    }));
  };

  const handleShow = (index) => {
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: true,
    }));
  };

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

  function handle123(i, startdate, enddate) {
    // console.log(startdate,'ss')

    const values = [...fields];

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

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');
      while (date < moment(endDate).endOf('month')) {
        // console.log(date,"while.......")
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('MM'));

        date.add(1, 'month');
      }
    }

    values[i]['jan'] = 0.0;
    values[i]['feb'] = 0.0;
    values[i]['mar'] = 0.0;

    values[i]['april'] = 0.0;
    values[i]['may'] = 0.0;
    values[i]['sept'] = 0.0;
    values[i]['oct'] = 0.0;
    values[i]['nov'] = 0.0;
    values[i]['dec'] = 0.0;

    values[i]['jun'] = 0.0;
    values[i]['july'] = 0.0;
    values[i]['aug'] = 0.0;

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
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

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
      // switch (myresult) {
      //   case 1:
      //     values[i]['jan']=Number(totalcost)
      //     console.log(totalcost,"jan")
      //     break;
      //   case 2:
      //     values[i]['feb']=Number(totalcost)
      //     console.log(totalcost,'feb')
      //     break;
      //   case 3:
      //     values[i]['mar']=Number(totalcost)
      //     console.log(totalcost,'m')

      //     break;
      //   case 4:
      //     values[i]['april']=Number(totalcost)
      //     console.log(totalcost,'a')
      //     break;
      //   case 5:
      //     values[i]['may']=Number(totalcost)
      //     console.log(totalcost,'j')
      //     break;
      //   case 6:
      //     values[i]['june']=Number(totalcost)
      //     console.log(totalcost,'auf')
      //     break;
      //   case 7:
      //     values[i]['july']=Number(totalcost)
      //     console.log(totalcost,'sdf')
      //     break;
      //   case 8:
      //     values[i]['aug']=Number(totalcost)
      //     console.log(totalcost,'s')
      //     break;
      //   case 9:
      //     values[i]['sept']=Number(totalcost)
      //     console.log(totalcost,'sep')
      //     break;
      //   case 10:
      //     values[i]['oct']=Number(totalcost)
      //     console.log(totalcost,'oct')
      //     break;
      //   case 11:
      //     values[i]['nov']=Number(totalcost)
      //     console.log(totalcost,'nov')
      //     break;
      //   case 12:
      //     values[i]['dec']=Number(totalcost)
      //     console.log(totalcost,'DDD')
      //     break;

      //   default:
      //     // console.log('none value selected');
      // }
    }

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

        let currentDate = moment(startDate);
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
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

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
          values[i]['jan'] = Number(totalcost);
          console.log(totalcost, 'jan');
          break;
        case 2:
          values[i]['feb'] = Number(totalcost);
          console.log(totalcost, 'feb');
          break;
        case 3:
          values[i]['mar'] = Number(totalcost);
          console.log(totalcost, 'mar');

          break;
        case 4:
          values[i]['april'] = Number(totalcost);
          console.log(totalcost, 'april');
          break;
        case 5:
          values[i]['may'] = Number(totalcost);
          console.log(totalcost, 'may');
          break;
        case 6:
          values[i]['june'] = Number(totalcost);
          console.log(totalcost, 'june');
          break;
        case 7:
          values[i]['july'] = Number(totalcost);
          console.log(totalcost, 'july');
          break;
        case 8:
          values[i]['aug'] = Number(totalcost);
          console.log(totalcost, 'aug');
          break;
        case 9:
          values[i]['sept'] = Number(totalcost);
          console.log(totalcost, 'sept');
          break;
        case 10:
          values[i]['oct'] = Number(totalcost);
          console.log(totalcost, 'oct');
          break;
        case 11:
          values[i]['nov'] = Number(totalcost);
          console.log(totalcost, 'nov');
          break;
        case 12:
          values[i]['dec'] = Number(totalcost);
          console.log(totalcost, 'dec');
          break;

        default:
          console.log('none value selected');
      }
    }

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
      sept: 0,
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
  };

  let totaldiscount = total - trade;

  let myvalue = ((totaldiscount * abstdiscount) / 100).toFixed(2);

  let grand = Number(totaldiscount) + Number(myvalue);

  return (
    <>
      <Container>
        <Formik
          initialValues={{
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

            if (myname === '' || myphone === '' || (myemail === '') | (myadvertiser === '')) {
              setnameerror(true);
              console.log(setnameerror(true));

              setTimeout(() => setLoading(false), 2000);
            } else if (myevent == '') {
              seteventerror(true);
              setTimeout(() => setLoading(false), 2000);
            }

            else if(!mysalesrep){
              setsalesreperror(true)
            }
            
            
            
            else if (startdate == '' && enddate == '') {
              setdateerror(true);
              setTimeout(() => setLoading(false), 2000);
            } else {
              setnameerror(false);
              seteventerror(false);
              setdateerror(false);
              setsalesreperror(false)

              setLoading(true);
              var payload = {};
              console.log(mydropdown, '4562');

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
                  customerid: mycustomerid,
                  cost: total,
                  trade: Number(trade),
                  discountabst: abstdiscount,
                  abst: Number(myvalue),
                  grandtotal: grand,
                  discountdropdown: mydropdown,
                  monthlydistribute: selectedOption1,

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
                      jan: fields[index].jan,
                      feb: fields[index].feb,
                      mar: fields[index].mar,
                      april: fields[index].april,
                      may: fields[index].may,
                      june: fields[index].june,
                      july: fields[index].july,
                      aug: fields[index].aug,
                      sept: fields[index].sept,
                      oct: fields[index].oct,
                      nov: fields[index].nov,
                      dec: fields[index].dec,
                    })),
                  ],
                };
              } else {
                payload = {
                  sales_rep: mysalesrep,
                  advertiser: myadvetiser,
                  name: custname,
                  event: custemail,
                  phone: custmobile,
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
                  customerid: mycustomerid,
                  discountdropdown: mydropdown,

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
                      jan: fields[index].jan,
                      feb: fields[index].feb,
                      mar: fields[index].mar,
                      april: fields[index].april,
                      may: fields[index].may,
                      june: fields[index].june,
                      july: fields[index].july,
                      aug: fields[index].aug,
                      sept: fields[index].sept,
                      oct: fields[index].oct,
                      nov: fields[index].nov,
                      dec: fields[index].dec,
                    })),
                  ],
                };
              }
              axios
                .post(
                  'https://api.familyfm.ltd:8080/api/public/getdata',
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

                  if (resp.data.code == 200) {
                    toast.success(resp.data.message, {
                      position: toast.POSITION.TOP_CENTER,
                    });

                    navigate('/dashboard/agreementlist', { replace: true });
                  }

                    else if(resp.data.code == 401){
                      console.log(resp.data.code)
                      setTimeout(() => setLoading(false), 1000);
                      toast.error('You do not have Permission to make Qoutation', {
                        position: toast.POSITION.TOP_CENTER,
                      });

                    }



                })
                .catch((err) => {
                  setLoading(false);

                  

              

                  toast.error(err.message, {
                    position: toast.POSITION.TOP_CENTER,
                  });
                });
            }
          }}
        >
          {({ errors, touched, values, handleSubmit, isSubmitting }) => (
            <Form className="form-con form-inline" onSubmit={handleSubmit}>
              <div className='row form-top'>
              <div className='col-6'>
                  <div className='select-option-radio ' >
                    <label style={{  }}>
                      <input
                          style={{ }}
                          
                        type="radio"
                        value="true"
                        checked={selectedOption1 === 'true'}
                        onChange={handleOptionChange}
                      />
                     <span style={{fontWeight:'900'}}>Agency </span> 
                    </label>
                       {/* <br/> */}
                    <label>
                      <input 
                       style={{ }}
                      className='radio-container'
                        type="radio"
                        value="false"
                        checked={selectedOption1 === 'false'}
                        onChange={handleOptionChange}
                      />
                       <span style={{fontWeight:'900'}}> General</span>
                    </label>

                    {/* <p>Selected option: {selectedOption1}</p> */}
                  </div>
                  </div>
                  <div className=' col-6'>
                  <div className="add-cust-btn">
                    <button
                      className="btn create-invo"
                   
                      onClick={() => openModal()}
                    >
                      Add Customer +
                    </button>

                    <Customerpopup
                   
                      key="customer-popup-1"
                      showModal={showModal}
                      closeModal={closeModal}
                      handleAddCustomer={handleAddCustomer}
              
                    />
                  </div>
                  </div>
              </div>
              <Card className="md-4 mt-4 px-3 py-3">
          
                    <div className="label-box-form mb-4">
                      <div className='row '>
                        
                      <div className='col-12'>

                      
                        {/* <span style={{ marginLeft: '4px' }}>Select Customer With Email/Phone</span> */}
                        {showInput && (
                          <form onSubmit={handleSubmit}>
                            <p style={{  }}>
                              Search Customer
                            </p>
                            <div className='labal-content-form' style={{ }}>
                        
                                <Field
                                  className="form-control"
                                  type="text"
                                  name="emailsearch"
                                  value={searchValue}
                                  onChange={(event) => setSearchValue(event.target.value)}
                                  style={{ }}
                                />
                         

                              <Button
                                onClick={() => handleSearch()}
                                style={{
                              
                                }}
                              >
                               <BiSearch/>
                              </Button>
                            </div>
                          </form>
                        )}
                      </div>
                      </div>
                    </div>
                   
                  {/* </div> */}
                  
                {/* </div> */}

               

                <div className="form ">
                  <div className="row">
                    <Col item xs={12} sm={6} md={4}>
                      <div className="form-group">
                        <div cl style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <label htmlFor="name" className="label-con">
                            Name
                          </label>
                          {usertype === 'selectCustomer' ? (
                            <>
                              {nameerror ? (
                                <>
                                  <span className="requirederor" style={{ color: 'red' }}>
                                    required !
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="input-er-con">
                          {myname ? (
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
                              disabled={isDisabled}
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
                          {usertype === 'selectCustomer' ? (
                            <>
                              {nameerror ? (
                                <>
                                  <span className="requirederor" style={{ color: 'red' }}>
                                    required !
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="input-er-con">
                          {myphone ? (
                            <Field
                              name="phone"
                              min={0}
                              type="tel"
                              className="form-control"
                              placeholder="Phone"
                              value={myphone}
                              disabled={isDisabled}
                              onChange={(e) => setmyphone(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="phone"
                              value={custmobile}
                              min={0}
                              type="number"
                              disabled={isDisabled}
                              className="form-control"
                              placeholder="Phone"
                              onChange={(e) => setcustmobile(e.target.value)}
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
                            <>
                              {nameerror ? (
                                <>
                                  <span className="requirederor" style={{ color: 'red' }}>
                                    required !
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="input-er-con">
                          {myemail ? (
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
                              value={custemail}
                              disabled={isDisabled}
                              onChange={(e) => setcustemail(e.target.value)}
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
                            <>
                              {eventerror ? (
                                <>
                                  <span className="requirederor" style={{ color: 'red' }}>
                                    required !
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ''
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
                              onChange={(e) => setmyevent(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="event"
                              type="text"
                              className="form-control"
                              placeholder="Event"
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
                          {salesreperor ? (
                            <>
                              <span className="requirederor" style={{ color: 'red' }}>
                                required !
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="input-er-con">
                          <select
                            className=""
                            value={mysalesrep}
                           
                            onChange={(e) => setmysalesrep(e.target.value)}
                        
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
                            <>
                              {nameerror ? (
                                <>
                                  <span className="requirederor" style={{ color: 'red' }}>
                                    required !
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="input-er-con">
                          {myadvertiser ? (
                            <Field
                              // name="Advertiser"
                              type="text"
                              className="form-control"
                              placeholder="Advertiser"
                              value={myadvertiser}
                              disabled={isDisabled}
                              onChange={(e) => setmyadvertiser(e.target.value)}
                            />
                          ) : (
                            <Field
                              name="Advertiser"
                              type="text"
                              className="form-control"
                              placeholder="Advertiser"
                              // value={myadvertiser}
                              disabled={isDisabled}
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
                        <Table className="" style={{ alignItems: 'right' }}>
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
                            {fields.map((field, index) => (
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
                                      <option value="">Select product type</option>
                                      <option selected value="Spots">
                                        Spots
                                      </option>
                                      <option value="Mentions">Mentions</option>
                                      <option value="1/2 Hr Sponsorship">1/2 Hr Sponsorship</option>
                                      <option value="Outside Broadcast">Outside Broadcast</option>
                                      <option value="Carnival Package">Carnival Package</option>
                                      <option value="New Year Package">New Year Package</option>
                                      <option value="Digital Signage">Digital Signage</option>
                                      <option value="Vibz FM Promotions">Vibz FM Promotions</option>
                                         <option value="Song Release">Song Release</option>
                                    </select>
                                    {!errorMessage1 ? (
                                      <>
                                        <div className="requirederor" style={{ color: 'red' }}>
                                          Product type is required !
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
                                            handle123(index, values[0].$d, values[1].$d);
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
                                      
                                          } else {
                                            // myfunction()

                                            handle123(index, '', '');
                                            setstartdate('');
                                            setenddate('');
                                            const valuess = [...fields];
                                            valuess[index]['runDates'] = {
                                              startdate: '',
                                              enddate: '',
                                            };
                                          }
                                        }}
                                      />

                                   
                                      {dateerror ? (
                                        <>
                                          <span className="requirederor" style={{ color: 'red' }}>
                                            Please select date range
                                          </span>
                                        </>
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
                                          Please select time range
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
                                      onClick={() => handleShow(index)}
                                      className="popup-btn"
                                      type="total"
                                      // name={`total${index}`}
                                      value={field.total}
                                      placeholder="Select Days"
                                      style={{ width: '100%' }}
                                    />
                                    <Modal
                                      className="pop-btn"
                                      style={{marginTop:"50px"}}
                                      show={modalVisibility[index]}
                                      key={`modal-${index}`}
                                      onHide={() => handleClose(index)}
                                    >
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
                                            style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                              style={{height:'40px'}}
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
                                        <Button
                                          variant="secondary"
                                          onClick={() => handleClose(index)}
                                        >
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
                        </div>


                        
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
                            <select
                              className="discountdropdown"
                              // value={product_type}
                              // defaultValue="spots"
                              name="discount_type"
                              id="discount_type"
                              // className="dropdown"
                              onChange={(event) => handledropdown(event)}
                            >
                              {/* <option value="">Select discount type</option> */}
                              <option selected value="Trade">
                                Trade
                              </option>
                              <option value="Sponsorship">Sponsorship</option>
                              <option value="Discount">Discount</option>
                              <option value="Charity">Charity</option>
                            </select>

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
                  

                      {/* lllllllllllllllllll//////////////////llllllllllllllllllllllll//////llllllllllllllllllllll////////////////////llllllllllllllllllllllchatgort */}

                      <div className="col-sm-4"></div>
                    </div>
                  </div>
                </>
              </Card>
              {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* <Addrow /> */}
              <Card className="mt-5 px-3 py-3">
                <h3 className="mb-3 heading-nw"> </h3>
                <div className="signaturearea">
                  {/* {editfield ? ( */}
                  <>
                    {' '}
                    <div>
                      <p style={{ color: 'red' }}>Additional Details*</p>
                      <textarea
                        type="text"
                        className="payment_input"
                        style={{ width: '100%' }}
                        value={paymentdue}
                        onChange={handlePaymentDue}
                      />
                      {/* <Button
                          style={{ marginLeft: '15px' }}
                          onClick={() => {
                            seteditfield(false);
                          }}
                        >
                          Done
                        </Button> */}
                    </div>
                  </>

                  <>
                    {/* <span>{paymentdue}</span> */}
                    {/* <Button
                        style={{ marginLeft: '15px' }}
                        onClick={() => {
                          seteditfield(true);
                        }}
                      >
                        Edit
                      </Button> */}
                  </>

                  {/* {paymenterr ? (
                    <>
                      <div className="requirederor" style={{ color: 'red' }}>
                        this field is required !
                      </div>
                    </>
                  ) : (
                    <></>
                  )} */}
                </div>

                <Row>
                  {/* <Col item xs={12} sm={7} md={7}>
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
