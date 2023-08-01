import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Pdf from './Pdf';
// import mylogo from "../component/fm_logo.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import mylogo from '../icons/fm_logo.png';
import './Invoice.css';
import { RWebShare } from "react-web-share";

const Contractview = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [dataapi, setDataapi] = useState([]);
  const [contract, setcontract] = useState([]);
  const [invoicedata, setinvoicedata] = useState([]);
  const[mindate,setmindate] =useState([])
  const[maxdate,setmaxdate] =useState([])
  const[orderamount,setorderamount] =useState([])
  const[disorder,setdisorder] =useState([])
  const[monthly,setmonthly] = useState([])
  

  useEffect(() => {
    axios
      .post('http://192.168.29.28:8080/api/public/agreementlist', {
        id: params.id,
      }, {
        headers: {'x-token': localStorage.getItem('token') },
      }
      )

      .then((response) => {
        setDataapi(response.data.data.details);

        setinvoicedata(response.data.data.itemlist);
        console.log(response.data.data.itemlist, 'responses');
        setmaxdate(response.data.data.maxEndDate);
         setmindate(response.data.data.minStartDate);
         setorderamount(response.data.data.orderamount);
         setdisorder(response.data.data.disorderamount);
         setmonthly(response.data.data.monthlyshedule)
      });
  }, [params.id]);

  ////////////////////////////////////////////////////////////////////////////

  const onmakecontract = (id) => {
    axios
      .post(`http://192.168.29.28:8080/api/public/makecontract/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.code !== 200) {
          // setcontract(!contract)
          // getdata()
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

  ////////////////////////////////////////////////////////////////

  return (
    <div className="main-container">
      {dataapi.map((type) => {
        var startDate = new Date(type.st_date);
        var endDate = new Date(type.ed_date);


        const startMonth = moment(mindate).format('MMMM, YYYY');
        const endMonth = moment(maxdate).format('MMMM, YYYY');


        return (
          <>
            {/* <div>
              <Link to="/dashboard/contract">
                <button className="btn create-invo" onClick={() => onmakecontract(type.id)}>
                  Make Contract
                </button>
              </Link>
            </div> */}
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
              <div>Advertising Investment Contract</div>


              <Pdf props={{ handleFunction: dataapi , handleFunction2:invoicedata , minfunction:mindate, maxfunction:maxdate, orderfunction:orderamount ,disorderfunction:monthly}} />
            </div>

            <div>
            <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: `http://192.168.29.28/Vibz_FM/${type.contract_pdf}`,
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="create-invo-12" >Share 🔗</button>
      </RWebShare>
      </div>



            <div className="row" style={{ borderBottom: '2px solid black' }}>
              <div className="col">
                <p>
                    {" "}
                    Contract Dates:-
                    <span style={{ marginLeft: "12px", textAlign: "center" }}>
                      {moment(type.contractdate).utc().format(" Do MMMM, YYYY")}
                    </span>
                  </p>
                <p>
                  {' '}
                  Advertiser:-
                  <span style={{ marginLeft: '45px' }}>{type.advertiser}</span>
                </p>

                <p>
                  Contact No:- <span style={{ marginLeft: '33px' }}>{type.phone}</span>
                </p>

                <p>
                  Start date:-
                  <span style={{ marginLeft: '40px' }}>
                    {moment(mindate).format(' Do MMMM, YYYY')}
                  </span>{' '}
                </p>

                {/* <p>
                    Product Protect:-
                    <span style={{ marginLeft: "7px" }}>Event</span>
                  </p> */}
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
              </div>
            </div>

{
            invoicedata.map((item) => {
                      return (
                        <>

            <div className="mt-3" style={{ borderBottom: '2px solid black' }}>



              <Table className="">
                <thead className="text-center">
                  <th></th>

                  <th></th>
                  <th className="text-center" colSpan={7}>
                    {' '}
                    SPOTS OR PROGRSMMERS BY DAY{' '}
                  </th>
                  {/* <th>Wks</th> */}
                  {/* <th >SPECIAL</th> */}
                  {/* <th></th>
                    <th></th>
                    <th></th>
                    <th></th> */}
                  {/* <th>Discounted</th> */}
                  {/* <th>Total</th> */}
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
                     <th>length</th>
                    <th>INSTRUCTIONS</th>
                  </tr>
                </thead>

                <tbody>
                
                  
                  
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
                            <td>:30</td>

                           
                            <td>{item.product_type}</td>
                          </tr>
                    
                </tbody>
              </Table>
            </div>

            <div className='table-container'>
              <Table className='responsive-table' >


              {
dataapi.map((item) => {
    return (
      <>
                <thead className='' >
                  <tr className='mytable'>
                   
                  
                   
                    <th >TOTAL COST OF PACKAGE</th>
                    <th>{item.discountdropdown}</th>
                    <th>% ABST </th>
                    <th>ABST </th>
                    <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className='second-table-body'>


<tr  >
  {/* <td>{item.weekhr}</td> */}
 
 
  <td>${item.cost}</td>
  <td>${item.trade}</td>
 <td>%{item.discountabst}</td>
 <td>${(((item.cost-item.trade)*item.discountabst)/100).toFixed(2)}</td>
<td>${item.grandtotal}</td>

</tr>
</tbody>

</>
    )})}


              </Table>
            </div>

</>
);
})
}

{startMonth === endMonth ? (
              ''
            ) : (
              <div style={{ borderBottom: '2px solid black', paddingBottom: '5px' }}>
                {' '}
                <p style={{ marginTop: '8px' }}> Month Projected Billing [ABST Inclusive]:</p>
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
                    <div>Jan: ${monthly.jan}</div>
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
              </div>
            )}

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

                {/* <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                  <p>Please make all cheques payable to Family Fm Ltd</p>
                  <p style={{ textDecoration: 'underline', paddingBottom: '1px' }}>
                    Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.
                  </p>
                </div> */}
              </div>

              {/* <div className="mt-5">
                <div style={{ textAlign: 'left', fontSize: '20px', fontWeight: '500' }}>
                  {' '}
                  Family FM Ltd. (VIBZ FM HD) –Terms and Conditions of Contract{' '}
                </div>
                <p>ABST# 0484956</p>
                <p>
                  <b>1.</b> Billing terms are net 30 days from date of invoice. Cancellation notice
                  is two weeks prior to run date. The normal deadline period for radio advertising
                  material is two (2) working days before broadcast. In exceptional cases, material
                  may be submitted on shorter deadlines however it must be negotiated with the
                  General Manager. There will be no guarantee on the flight of material submitted
                  less than 48 weekday hours prior to run date.
                </p>
                <p>
                  <b>2.</b> Cancellation is subject to written notice, ten (10) working days prior
                  to broadcast. Cancellations within ten (10) working days prior to broadcast, will
                  incur a penalty of 10% of the published rate for spots cancelled within this
                  period. Cancellations within two (2) working days of broadcast will be charged at
                  full rate.
                </p>

                <p>
                  <b>3.</b>We reserve the right not to air any material supplied to us which in our
                  opinion may be defamatory, objectionable to our listeners, discriminatory,
                  misleading or deceptive or would infringe any law or expose us to any liability.
                </p>

                <p>
                  <b>4.</b> The positioning of your advertisement is at our discretion, unless
                  stated otherwise been agreed between us in writing.
                </p>

                <p>
                  <b>5.</b>We may act on a Booking Order if you are advertising agency acting on
                  behalf of the advertiser. In this case, you must provide a copy of these terms and
                  conditions to the advertiser and the warranties and indemnities contained in these
                  terms and conditions given by you will be deemed to also have been given by the
                  advertiser. The placing of a Booking Order constitutes a request by you for us to
                  transmit an advertisement as contained in the Booking Order on these terms and
                  conditions.
                </p>

                <p>
                  <b>6.</b>You warrant to us, our employees and agents that the advertisement is not
                  in contravention of any law and the relevant fair trading legislation nor does it
                  infringe the rights of any person (including without limitation, third party’s
                  intellectual property rights).
                </p>

                <p>
                  <b>7.</b>Your indemnity will keep us, our employees and agents indemnified against
                  all costs, expenses, claims, demands, damages and loss of any kind in connection
                  with us accepting a Booking Order or airing your advertising material or otherwise
                  acting upon your instructions.
                </p>

                <p>
                  <b>8.</b>Except as may be set out in these terms and conditions, we make no other
                  warranties or representations in relation to the transmission of your
                  advertisement.
                </p>

                <p>
                  <b>9.</b>You agree that Family FM Ltd. will not be liable to you for loss of
                  profit, indirect, consequential or incidental loss, damage or injury which you may
                  suffer under or in connection with your advertisement.
                </p>

                <p>
                  <b>10.</b>Family FM Ltd. reserves the right to reject, refuse or discontinue any
                  contract for reasons satisfactory to itself, or remove without notice, material it
                  considers not in the public’s interest.
                </p>

                <p>
                  <b>11.</b>Rates are charged for spots no longer than 45 seconds. Commercials of a
                  longer length must have prior approval form the Station Manager. If this is not
                  done (a) the advertiser will be charged at a higher rate or (b) the commercial
                  will not be broadcast.
                </p>

                <p className="term-12">
                  <b>12.</b>For annual contracts: Given that your annual rates are discounted, the
                  contents of this contract can only be used for the client. The client is not
                  allowed to transfer spots, sponsorship and/or mentions to a third party unless
                  that third party takes out a separate contract with Family FM. If the client does
                  not comply, he/she will be charged the full amount for spots, mention etc Saved
                  image png Client Signature
                </p>
              </div> */}

              <div className="writing-field">
                <div >
                <img className="img-sign"src={`http://192.168.29.28/Vibz_FM/uploads/${type.signature}`} alt={"signature"}/>


                  <div className="sing-1">Family FM Representative </div>
                </div>
                {/* <div>
                  <img className="img-sign" src={type.sign} alt="example" />
                  <div className="sing-1">Client</div>
                </div> */}
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

export default Contractview;
