import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Pdf from './Pdf';
// import mylogo from "../component/fm_logo.png";
import { loadImage } from 'canvas';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import mylogo from '../icons/fm_logo.png';
import './Invoice.css';
import { Modal, Button, Form } from 'react-bootstrap';
import ConfirmationModal from './ConformationModal';
import Share from './Share';
import { RWebShare } from 'react-web-share';
// import { Image } from 'canvas';

import { shortener } from 'c-url-shortener';
import Getclickupdata from './Getclickupdata';

const Viewdetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const history = useHistory();

  const [dataapi, setDataapi] = useState([]);
  const [contract, setcontract] = useState([]);
  const [invoicedata, setinvoicedata] = useState([]);
  const [signaturelist, setsignaturetlist] = useState([]);
  const [mindate, setmindate] = useState([]);
  const [maxdate, setmaxdate] = useState([]);
  const [orderamount, setorderamount] = useState([]);
  const [disorderamount, setdisorderamount] = useState([]);
  const [monthly, setmonthly] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);

  const startMonth = moment(mindate).format('MMMM, YYYY');
  const endMonth = moment(maxdate).format('MMMM, YYYY');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    axios
      .post(
        'https://api.familyfm.ltd:8080/api/public/agreementlist',
        {
          id: params.id,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setDataapi(response.data.data.details);
        setinvoicedata(response.data.data.itemlist);
        setsignaturetlist(response.data.data.signaturelist);
        setmaxdate(response.data.data.maxEndDate);
        setmindate(response.data.data.minStartDate);
        setorderamount(response.data.data.orderamount);
        setdisorderamount(response.data.data.disorderamount);
        setmonthly(response.data.data.monthlyshedule);
      });
  }, [params.id]);



  useEffect(() => {
    if (dataapi.length > 0) {
      axios
        .post(
          'https://api.familyfm.ltd:8080/api/public/getimage',
          {
            file_name: dataapi[0].signature,
          },
          {
            headers: { 'x-token': localStorage.getItem('token') },
          },
        )

        .then((response) => {
          setImageDataUrl(response.data);
        });
    }
  }, [dataapi]);

  ////////////////////////////////////////////////////////////////////////////

  const handleDeleteClick = (id) => {
    setItemId(id);

    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    axios
      .post(
        `https://api.familyfm.ltd:8080/api/public/makecontract/${itemId}`,
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          // After successful confirmation, navigate to the new route
          // ('/dashboard/contract');
          navigate('/dashboard/contract', { replace: true });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          
       
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  const handleCancel = () => {
    console.log('Deletion canceled.');
    setShowConfirmation(false);
  };

  const setarray = [];
  var monthlydistribuion;
  var arr = [];
  var myarray = [];

  if (mindate < maxdate) {
    let date = moment(mindate);
    while (date < moment(maxdate).add('month')) {
      // console.log(date,"while.......")
      arr = myarray.push(date.format('MM'));
      setarray.push(date.format('MM'));

      date.add(1, 'month');
    }
  }
  console.log(setarray, 'totalmonth');

  const onmakecontract = (id) => {
    axios
      .post(
        `https://api.familyfm.ltd:8080/api/public/makecontract/${id}`,
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        console.log(response.data.status, 'dddsx');
        if (response.status == 200) {
          toast.success(response.data.message);
        } else {
          toast.error(err.data.message);
        }
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

  const clickupcreatetask = (id) => {
    console.log(id, 'function');
    axios
      .post(`https://api.familyfm.ltd:8080/api/public/createclickuptask/${id}`)
      .then((response) => {
        console.log(response.data.status, 'dddsx');
        if (response.status == 200) {
          toast.success(response.data.message);
        } else {
          toast.error(err.data.message);
        }
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

  const myimg = loadImage('https://api.familyfm.ltd/Vibz_FM/uploads/signature-1693079730430.png');
  console.log(myimg, 'kmm');
  myimg
    .then((response) => {
      console.log(response.src, 'okk');

      // do something with im
    })
    .catch((err) => {
      console.log('oh no!', err);
    });

  useEffect(() => {
    axios
      .post(`https://api.familyfm.ltd:8080/api/public/getclickuptask`)
      .then((response) => {
        console.log(response.data.data.tasks, '123');
        setData(response.data.data.tasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setFilteredData(filtered);
  };

  return (
    <div className="main-container">
      {dataapi.map((type) => {
        var startDate = new Date(type.id);
        var endDate = new Date(type.ed_date);

        const currentDate = moment(type.createdAt);
        const futureDate = currentDate.add(30, 'days');

        return (
          <>
            <div>
              {/* Your other JSX content */}
              <button className="btn create-invo" onClick={() => handleDeleteClick(type.id)}>
                Make Contract
              </button>
              {showConfirmation && (
                <ConfirmationModal
                  message="Are you sure you want to Convert this Quotation to Contract?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
            </div>
            <>
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>exitsing task</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: '100%' }}>
                  <Form.Control type="text" placeholder="Search..." onChange={handleSearch} />
                  <ul
                    style={{
                      textDecoration: 'none',
                      listStyle: 'none',
                      padding: '0px',
                      margin: '0px',
                    }}
                  >
                    {filteredData.map((item) => (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <li key={item.id}>
                          <strong>task id</strong>-{item.id}
                        </li>
                        <li>{item.name}</li>
                      </div>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
            <div>
              {/* <div style={{ marginTop: '10px' }}>
                <div>
                  <RWebShare
                    data={{
                      text: 'html>Like humans, flamingos make friends for life',
                      url: `http://localhost/Vibz_FM/Arun%20tihaiya_VIBZ-236155-167.pdf`,
                      title: 'Qoutation pdf',
                    }}
                    onClick={() => console.log('shared successfully!')}
                  >
                    <button className="create-invo-1">Share 🔗</button>
                  </RWebShare>
                </div>
              </div> */}
              {/* <div>
            
                <button className="btn create-invo"onClick={()=>clickupgettask()} >
                  Sync with exsting opportunity
                </button>
          
            </div>   */}
              {/* <div>
           
                <button className="btn create-invo" >
                  share
                </button>
         
            </div> */}
              {/* <div>
           
                <button className="btn create-invo" onClick={() => onmakecontract(type.id)}>
                  Download
                </button>
         
            </div> */}
            </div>
            {/* <div className="btn create-invo"><Link to='/dashboard/agreement'>Create Agreement +</Link></div>   */}
            <div className="row mt-5">
              <div className=" col align-items-center mt-5">
                <img src={mylogo} alt="React Logo" className="img-con" />
              </div>

              <div className="vibzfm-add col">
                <br />
                Langsford Estate
                <br />
                P.O. Box W1102
                <br />
                All Saints Rd
                <br />
                St John's, Antigua
                <br />
                Tel (268) 560- 7578/9
                <br />
                Email: info@familyfm.ltd
                <br />
              </div>
            </div>

            <div className="invoice-heading">
              <div>Advertising Investment Quotations</div>
              <Pdf
                props={{
                  handleFunction: dataapi,
                  handleFunction2: invoicedata,
                  maxfunction: maxdate,
                  minfunction: mindate,
                  orderfunction: orderamount,
                  disorderfunction: monthly,
                  title: 'Quotation',
                  pdfimage: imageDataUrl,
                }}
              />
            </div>

            <div className="row" style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
              <div className="col">
                <p>
                  {' '}
                  Quotations date:-
                  <span style={{ marginLeft: '12px' }}>
                    {moment(type.createdAt).utc().format(' Do MMMM, YYYY')}
                  </span>
                </p>
                <p>
                  {' '}
                  Qoute Expiry Date:-
                  <span style={{ marginLeft: '12px' }}>
                    {moment(futureDate).utc().format(' Do MMMM, YYYY')}
                  </span>
                </p>

                <p>
                  Contact No:- <span style={{ marginLeft: '33px' }}>{type.phone}</span>
                </p>

                <p>
                  {' '}
                  Start date:-
                  <span style={{ marginLeft: '40px' }}>
                    {moment(mindate).format(' Do MMMM, YYYY')}
                  </span>
                </p>
              </div>
              <div className="col">
                <p>
                  Sales Rep:-
                  <span style={{ marginLeft: '10px' }}>{type.sales_rep}</span>
                </p>
                <p>
                  Name:-<span style={{ marginLeft: '39px' }}>{type.name}</span>
                </p>

                <p>
                  Email:-
                  <span style={{ marginLeft: '37px' }}>{type.email}</span>
                </p>
                <p>
                  {' '}
                  End date:-
                  <span style={{ marginLeft: '12px' }}>
                    {moment(maxdate).utc().format(' Do MMMM, YYYY')}
                  </span>
                </p>

                <p>
                  {' '}
                  Advertiser:-
                  <span style={{ marginLeft: '30px' }}>{type.advertiser}</span>
                </p>
              </div>
            </div>

            <div className="mt-3" style={{ borderBottom: '2px solid black' }}>
              <Table className="table-responsive">
                <thead className="text-center">
                  <th></th>

                  <th></th>
                  <th className="text-center" colSpan={7}>
                    {' '}
                    SPOTS OR PROGRSMMERS BY DAY{' '}
                  </th>
                </thead>
                <thead>
                  <tr>
                    <th>Dates torun</th>

                    <th>Hours TO Run</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th>Total</th>
                    {/* <th>length</th> */}
                    <th>INSTRUCTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {invoicedata.map((item) => {
                    return (
                      <>
                        <tr className="tr-invoice">
                          <td>
                            {moment(item.start_date).utc().format(' Do MMMM') +
                              '-' +
                              moment(item.end_date).utc().format(' Do MMMM')}
                          </td>
                          <td>
                            {moment(item.starttime).format('h:mma') +
                              '-' +
                              moment(item.endtime).format('h:mma')}
                          </td>

                          <td>{item.monday}</td>
                          <td>{item.tuesday}</td>
                          <td>{item.wednesday}</td>
                          <td>{item.thursday}</td>
                          <td>{item.friday}</td>
                          <td>{item.saturday}</td>
                          <td>{item.sunday}</td>

                          <td>{item.total}</td>
                          {/* <td>:30</td> */}

                          <td>{item.product_type}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            {dataapi.map((item) => {
              console.log(item.grandtotal, 'sdds');

              monthlydistribuion = (item.grandtotal / myarray.length).toFixed(2);

              console.log(monthlydistribuion, '123');
              return (
                <>
                  <div className="table-container">
                    <Table className="responsive-table">
                      <thead className="">
                        <tr className="mytable">
                          {/* <th># HR PER WK </th> */}

                          <th>TOTAL COST OF PACKAGE</th>
                          <th>{item.discountdropdown}</th>
                          {/* <th>% ABST </th> */}
                          <th>ABST</th>
                          <th>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody className="second-table-body">
                        <tr>
                          {/* <td>{item.weekhr}</td> */}

                          <td>${item.cost}</td>
                          <td>${item.trade}</td>
                          {/* <td>%{(item.discountabst)}</td> */}
                          <td>
                            ${(((item.cost - item.trade) * item.discountabst) / 100).toFixed(2)}
                          </td>
                          <td>${item.grandtotal}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  {startMonth === endMonth ? (
                    ''
                  ) : (
                    <>
                      <div style={{ borderBottom: '2px solid black', paddingBottom: '5px' }}>
                        {' '}
                        <p style={{ marginTop: '8px' }}>
                          {' '}
                          Month Projected Billing [ABST Inclusive]:
                        </p>
                        {type.monthlydistribute == 'true' ? (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'auto auto auto auto',
                              marginTop: '30px',
                              textAlign: 'center',
                              gridGap: '10px',
                            }}
                          >
                            <div>
                              <div>Jan: {monthly.jan}</div>
                              <div>Feb: ${monthly.feb}</div>
                              <div>Mar: ${monthly.mar}</div>
                            </div>
                            <div>
                              <div>April: ${monthly.april}</div>
                              <div>May: ${monthly.may}</div>
                              <div>June: ${monthly.june}</div>
                            </div>
                            <div>
                              <div>July: ${monthly.july}</div>
                              <div>Aug: ${monthly.aug}</div>
                              <div>Sept: ${monthly.sept}</div>
                            </div>
                            <div>
                              <div>Oct: ${monthly.oct}</div>
                              <div>Nov: ${monthly.nov}</div>
                              <div>Dec: ${monthly.dec}</div>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'auto auto auto auto',
                              marginTop: '30px',
                              textAlign: 'center',
                              gridGap: '10px',
                            }}
                          >
                            <div>
                              {/* {console.log(monthlydistribuion,'2555555')} */}
                              <div>
                                Jan: ${myarray.includes('01') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Feb: ${myarray.includes('02') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Mar: ${myarray.includes('03') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                April: ${myarray.includes('04') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                May: ${myarray.includes('05') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                June: ${myarray.includes('06') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                July: ${myarray.includes('07') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Aug: ${myarray.includes('08') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Sept: ${myarray.includes('09') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                Oct: ${myarray.includes('10') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Nov: ${myarray.includes('11') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Dec: ${myarray.includes('12') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {type.monthlydistribute === 'true' ? (
                        <span
                          style={{
                            marginTop: '3px',
                            float: 'right',
                            fontSize: '10px',
                            color: 'red',
                          }}
                        >
                          {' '}
                          * This {item.discountdropdown} Amount is not apply in Monthly breakdown
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              );
            })}

            {/* )})} */}

            {/* <div className=" total-amount" > <p>Ordered Amount:- ${type.cost_total}</p>
                    <p style={{borderBottom:'1px solid black',paddingBottom:'8px'}}>+ABST 2: 15%</p>
                    <p style={{marginTop:"-8px" ,fontWeight:"600"}}>Total Amount: ${type.costtax} </p></div> */}

            {/* <div className="mt-3" style={{borderBottom:"2px solid black"}} > */}
            {/* </div> */}
            <div style={{ marginTop: '80px' }}>
              <div style={{ paddingBottom: '10px' }}>
                <div className="mt-3">
                  <p style={{ textDecoration: 'underline', paddingBottom: '1px' }}>
                    Payment Schedule/Other Details:
                  </p>
                  <p>{type.paymentdue}</p>
                </div>
              </div>

              <div className="writing-field">
                <div>
                  <img
                    className="img-sign"
                    src={`https://api.familyfm.ltd/Vibz_FM/uploads/${type.signature}`}
                    alt={'signature'}
                  />

                  <div className="sing-1">Family FM Representative </div>
                </div>
                <div></div>
              </div>

              {/* <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                <p>Please make all cheques payable to Family Fm Ltd</p>
                <p style={{ textDecoration: 'underline', paddingBottom: '1px' }}>
                  Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.
                </p>
              </div> */}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Viewdetail;
