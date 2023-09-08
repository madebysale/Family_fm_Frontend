import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Card from 'react-bootstrap/Card'


import { AiOutlineLogout } from "react-icons/ai";

// import Pdf from "./Pdf";
import { useNavigate } from "react-router-dom";


const Invoice = (props) => {
  const navigate = useNavigate();

  const [apidata, setapidata] = useState([]);
  // const [finaldata, setfinaldata] = useState("");
  useEffect(() => {
    axios
      .post("https://api.familyfm.ltd:8080/api/public/invoice")

      .then((response) => {
        setapidata(response.data.data);

        console.log(response, "responsesssss");

       
      });
  }, []);



  return (
    <div className="main-container">
      {apidata.map((type) => {
       
        console.log(type, "type");
        console.log(type.signature, "signature");

        var startDate = new Date(type.st_date);
        var endDate = new Date(type.ed_date);
         return (
          <>


            <div className="row mt-5">
              <div className=" col align-items-center mt-5">
                {/* <img src={mylogo} alt="React Logo" className="img-con" /> */}
                {/* <p className="order-id">OrderID: {type.orderid}</p> */}
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
              <div>Advertising Investment Agreement</div>
              {/* <div>{type.name}</div> */}
            </div>

            {/* <div className="invoice-con-address">
                  <div className="bill-div">Bill To: <span className="bill-span" >{type.name}</span></div>
                   <p><span className="span-detail">Sponsor:</span></p> 
                    <p><span className="span-detail-1">Phone:</span>{type.phone}</p>
                    <p><span className="span-detail-2">Email:</span>{type.email}</p>
                    <p><span className="span-detail-3">BillingCycle:</span>Calendar Month</p>
                    <p><span className="span-detail-4">InvoiceType:</span>Times/Rates</p>
                    <p><span className="span-detail-5">Run Dates:</span>{moment(type.st_date).utc().format('L')+"-"+moment(type.ed_date).utc().format('L')} </p>
                    
                    <p> <span className="span-detail-6">Items Ordered:</span>{type.qty_total}</p>
                    
                  {/* </div> */}

            <div className="row" style={{ borderBottom: "2px solid black" }}>
              <div className="col">
                <p>
                  {" "}
                  Contract Dates:-
                  <span style={{ marginLeft: "12px", textAlign: "center" }}>
                    {moment(type.contract_date).utc().format(" Do MMMM, YYYY")}
                  </span>
                </p>
                <p>
                  {" "}
                  Advertiser:-
                  <span style={{ marginLeft: "45px" }}>{type.advertiser}</span>
                </p>
                {/* <p>Advertiser:-<span style={{marginLeft:'40px'}}>Antigua and Barbuda Tourism Authority</span> </p>  */}
                <p>
                  Contact No:-{"      "}
                  <span style={{ marginLeft: "33px" }}>{type.phone}</span>
                </p>
                <p>
                  Start date:-
                  <span style={{ marginLeft: "50px" }}>
                 {moment(type.st_date).format(" Do MMMM, YYYY")}

                  </span>{" "}
                </p>
                <p>
                  Product Protect:-
                  <span style={{ marginLeft: "7px" }}>Event</span>
                </p>
              </div>
              <div className="col">
                <p>
                  Sales Rep:-
                  <span style={{ marginLeft: "10px" }}>{type.sales_rep}</span>
                </p>
                <p>
                  Name:-<span style={{ marginLeft: "32px" }}>{type.name}</span>
                </p>

                <p>
                  Email:-
                  <span style={{ marginLeft: "37px" }}>{type.email}</span>
                </p>
                <p>
                  {" "}
                  End date:-
                  <span style={{ marginLeft: "12px" }}>
                    {moment(type.ed_date).utc().format(" Do MMMM, YYYY")}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-3" style={{ borderBottom: "2px solid black" }}>
              <Table className="text-center table-responsive" >
                <thead>
                  <th>DATES</th>
                  <th>HOURS</th>
                  <th className="text-center" colSpan={7}> SPOTS OR PROGRSMMERS BY DAY </th>
                  <th>Wks</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Discounted</th>
                  <th>Total</th>
                  <th >SPECIAL</th>
                </thead>
                <thead>
                  <tr>
                    <th>TO RUN</th>
                    <th>TO Run</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th>Total</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Cost</th>
                    <th>Discount</th>
                    <th> Cost</th>
                  <th>cost</th> 
                    <th>INSTRUCTIONS</th>
                  </tr>
                </thead>

                <tbody>
              {
                  type.fields &&
                    type.fields.map((items) => {
                      return (
                        items &&
                        items.map((item) => {
                          console.log(item, "dds55");
                          return (
                            <>
                              <tr className="tr-invoice">
                                <td>
                                  {moment(item.start_date)
                                    .utc()
                                    .format(" Do MMMM") +
                                    "-" +
                                    moment(item.end_date)
                                      .utc()
                                      .format(" Do MMMM")}
                                </td>
                                <td>
                                  {moment(item.starttime).format("h:mma") +
                                    "-" +
                                    moment(item.endtime).format("h:mma")}
                                </td>

                                {/* <td >ALL WEEKS</td> */}
                                {/* <td >{item.product_type}</td> */}

                                <td>{item.monday}</td>
                                <td>{item.tuesday}</td>
                                <td>{item.wednesday}</td>
                                <td>{item.thursday}</td>
                                <td>{item.friday}</td>
                                <td>{item.saturday}</td>
                                <td>{item.sunday}</td>

                                <td >{item.total}</td>
                               
                                <td >{item.qty}</td>
                                <td >{item.rate}</td>
                                <td >{item.cost}</td>
                                <td >{item.discount}</td>
                                <td >{item.discounted_cost}</td>
                                <td >{item.cost_tax}</td>
                                <td>{item.product_type}</td> 
                              </tr>
                            </>
                          );
                        })
                      );
                    })}
                </tbody>
              </Table>
            </div>


            <div className="mt-3" style={{borderBottom:"2px solid black"}} >
                       </div>
            <div style={{paddingBottom:'10px'}}>
            <div className="mt-3">
              <p style={{textDecoration:"underline" ,paddingBottom:"1px"}}>Payment Schedule/Other Details:</p>
              <p >This payment of balance due will be billed over a two month period. The 1st in April 25th and the next on 15 may</p>
            </div>


            <div style={{marginBottom:'10px' ,textAlign:'right'}} >
              <p>Please make all cheques payable to Family Fm Ltd</p>
              <p style={{textDecoration:"underline",paddingBottom:"1px"}}>Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.</p>
            </div>
            </div>
              
            <div className="mt-5" >
       <div style={{textAlign:'left',fontSize:'20px',fontWeight:'500'}}> Family FM Ltd. (VIBZ FM HD) –Terms and Conditions of Contract </div>
    <p>ABST# 0484956</p>
  <p>
 <b>1.</b> Billing terms are net 30 days from date of invoice. Cancellation notice is two weeks prior to run date. The normal deadline period for radio advertising material is two (2) working days before broadcast. In exceptional cases, material may be submitted on shorter deadlines however it must be negotiated with the General Manager. There will be no guarantee on the flight of material submitted less than 48 weekday hours prior to run date.
  </p>
  <p>
 <b>2.</b> Cancellation is subject to written notice, ten (10) working days prior to broadcast. Cancellations within ten (10) working days prior to broadcast, will incur a penalty of 10% of the published rate for spots cancelled within this period. Cancellations within two (2) working days of broadcast will be charged at full rate.
  </p>

  <p>
  <b>3.</b>We reserve the right not to air any material supplied to us which in our opinion may be defamatory, objectionable to our listeners, discriminatory, misleading or deceptive or would infringe any law or expose us to any liability.
  </p>

  <p>
  <b>4.</b> The positioning of your advertisement is at our discretion, unless stated otherwise been agreed between us in writing.
  </p>

<p>
<b>5.</b>We may act on a Booking Order if you are advertising agency acting on behalf of the advertiser. In this case, you must provide a copy of these terms and conditions to the advertiser and the warranties and indemnities contained in these terms and conditions given by you will be deemed to also have been given by the advertiser. The placing of a Booking Order constitutes a request by you for us to transmit an advertisement as contained in the Booking Order on these terms and conditions.
</p>

<p>
<b>6.</b>You warrant to us, our employees and agents that the advertisement is not in contravention of any law and the relevant fair trading legislation nor does it infringe the rights of any person (including without limitation, third party’s intellectual property rights).
</p>

<p>
<b>7.</b>Your indemnity will keep us, our employees and agents indemnified against all costs, expenses, claims, demands, damages and loss of any kind in connection with us accepting a Booking Order or airing your advertising material or otherwise acting upon your instructions.
</p>

<p>
<b>8.</b>Except as may be set out in these terms and conditions, we make no other warranties or representations in relation to the transmission of your advertisement.
</p>

<p>
<b>9.</b>You agree that Family FM Ltd. will not be liable to you for loss of profit, indirect, consequential or incidental loss, damage or injury which you may suffer under or in connection with your advertisement.

</p>

<p>
<b>10.</b>Family FM Ltd. reserves the right to reject, refuse or discontinue any contract for reasons satisfactory to itself, or remove without notice, material it considers not in the public’s interest.
</p>

<p>
<b>11.</b>Rates are charged for spots no longer than 45 seconds. Commercials of a longer length must have prior approval form the Station Manager. If this is not done (a) the advertiser will be charged at a higher rate or (b) the commercial will not be broadcast.
</p>

<p className='term-12'>
<b>12.</b>For annual contracts: Given that your annual rates are discounted, the contents of this contract can only be used for the client. The client is not allowed to transfer spots, sponsorship and/or mentions to a third party unless that third party takes out a separate contract with Family FM. If the client does not comply, he/she will be charged the full amount for spots, mention etc
Saved image png
Client Signature


</p>

</div>
            {/* <div className="mt-3 logout" style={{ marginRight: "2px" }}>
              <p
                style={{ border: "none", marginTop: "-5px" }}
                onClick={handleLogout}
              >
             
                <i style={{ color: "red" }}>
                  <AiOutlineLogout size={35} />
                </i>
              </p>
            </div> */}

            {/* <table
              role={'table'}
                className="table-invoice"
               
                bordered
                hover
                variant="light"
              >
                
                <thead className="table-head-invoice" role={'rowgroup'}>
                  <tr className="tr-invoice"  >
                    <th className="th-invoice"  role={"columnheader"} >Run Dates</th>
                    <th className="th-invoice"  role={"columnheader"} >Run Times</th>
                    
                    <th className="th-invoice" role={"columnheader"}>RUN WKS</th>
                    <th className="th-invoice" role={"columnheader"}>Product type</th>
                       
                    <th className="th-invoice" role={"columnheader"}>Mon</th>
                    <th className="th-invoice" role={"columnheader"}>Tue</th>
                    <th className="th-invoice" role={"columnheader"}>Wed</th>
                    <th className="th-invoice" role={"columnheader"}>Thu</th>
                    <th className="th-invoice" role={"columnheader"} >Fri</th>
                    <th className="th-invoice" role={"columnheader"}>Sat</th>
                    <th className="th-invoice" role={"columnheader"}>Sun</th>
                   
                    <th className="th-invoice" role={"columnheader"}>Wks Total</th>
                    <th className="th-invoice" role={"columnheader"}>Length</th>
                    <th className="th-invoice" role={"columnheader"}>Qty</th>
                    <th className="th-invoice" role={"columnheader"}>Rate</th>
                    <th className="th-invoice" role={"columnheader"}>Cost</th>
                    <th className="th-invoice" role={"columnheader"}>Discount</th>
                    <th className="th-invoice" role={"columnheader"}>Discounted Cost</th>
                    <th className="th-invoice" role={"columnheader"}>Total cost</th>
                  </tr>
                </thead>
              


                
                <tbody className="tbody-invoice" role={'rowgroup'}>

                {

                type.fields && type.fields.map((items)=> {
                return(
                  items && items.map((item)=> {
                  console.log(item,"dds55")
           return ( 
              <>
                  <tr className="tr-invoice" >
                 
                    <td className="td-invoice">{moment(item.start_date).utc().format('MM/DD/YY')+"-"+ moment(item.end_date).utc().format('MM/DD/YY')}</td>
                    <td className="td-invoice">{moment(item.starttime).format('h:mma')+"-"+ moment(item.endtime).format('h:mma')}</td>

                    <td className="td-invoice">ALL WEEKS</td>
                    <td className="td-invoice">{item.product_type}</td>
                   
                    <td  className="td-invoice">{item.monday}</td> 
                    <td className="td-invoice">{item.tuesday}</td> 
                    <td className="td-invoice">{item.wednesday}</td> 
                     <td className="td-invoice">{item.thursday}</td> 
                     <td className="td-invoice">{item.friday}</td>
                     <td className="td-invoice">{item.saturday}</td>
                    <td className="td-invoice">{item.sunday}</td>
                    
                    <td className="td-invoice">{item.total}</td>
                    <td className="td-invoice">:33</td>
                     <td className="td-invoice">{item.qty}</td>
                    <td className="td-invoice">{item.rate}</td>
                    <td className="td-invoice">{item.cost}</td>
                    <td className="td-invoice">{item.discount}</td>
                    <td className="td-invoice">{item.discounted_cost}</td>
                    <td className="td-invoice">{item.cost_tax}</td>
                  </tr>




  

               </>
           
           )
                  
        }  )
                )
      } )
      }
                 

            </tbody>



              </table> */}

            {/* <div className="row text-center mt-5 " style={{borderTop:'2px solid black',borderBottom:'2px solid black'}} >
             <div className="col">
              <p>jan2023</p>
              <p>april2023</p>
              <p>July2023</p>
              <p>Oct2023</p>
                </div>
                
                
                 <div className="col ">
                  <p>feb2023</p>
              <p>May2023</p>
              <p>Aug2023</p>
              <p>Nov2023</p>
                  </div>  

                  <div  className="col ">
                  <p>March2023</p>
              <p>June2023</p>
              <p>Sept2023</p>
              <p>Dec2023</p>
                  </div>
                 
            
             
             <div className="col">
              <p>Q1</p>
              <p>Q2</p>
              <p>Q3</p>
              <p>Q4</p>

             </div>
             

             </div> */}

            {/* 
              <div className=" total-amount" > <p>Ordered Amount:- ${type.cost_total}</p>
                    <p style={{borderBottom:'1px solid black',paddingBottom:'8px'}}>+ABST 2: 15%</p>
                    <p style={{marginTop:"-8px"}}>Total Amount:-${type.costtax} </p></div> */}

            <div className="writing-field">
              {/* <div>
                <img className="img-sign" src={type.signature} alt="signature" />

                <div className="sing-1">Family FM Representative </div>
              </div> */}
              <div>
                <img className="img-sign" src={type.sign} alt="example" />
                <div className="sing-1">Client</div>
              </div>
            </div>

            <div style={{marginBottom:'10px' ,textAlign:'right'}} >
              <p>Please make all cheques payable to Family Fm Ltd</p>
              <p style={{textDecoration:"underline",paddingBottom:"1px"}}>Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.</p>
            </div>
            
                  
          </>
        );
    
    })}

     
    </div>
  );
};

export default Invoice;
