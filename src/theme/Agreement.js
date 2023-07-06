import React, { useEffect, useState } from "react";
// import mylogo from "../component/fm_logo.png";
// import "./invoice.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Card from 'react-bootstrap/Card'


import { AiOutlineLogout } from "react-icons/ai";

// import Pdf from "./Pdf";
import { useNavigate,useParams } from "react-router-dom";
import { Termcondition } from "./Termcondition";

const Agreement = (props) => {
  const navigate = useNavigate();

  const [apidata, setapidata] = useState([]);
  // const [finaldata, setfinaldata] = useState("");
  const params = useParams();
  console.log(params.id,'ds')
const[dataapi,setDataapi] = useState([])
const[itemlist,Setitemlist] = useState([])


    useEffect(() => {
        
        axios
          .post("http://3.142.245.136:8080/api/public/agreementlist",
          {
            id: params.id
          })
    
          .then((response) => {
            
            setDataapi(response.data.data.details);
            Setitemlist(response.data.data.itemlist)
            // console.log(response.data.data.details, "responses");
            console.log(response.data.data.itemlist, "respons454es");

          });
        },[params.id] );



  return (
    <div className="main-container">
      {dataapi.map((type) => {
          // type.details && type.details.map((item)=>{
          //   console.log(item,"sd")
          //   return(
          //     <>
           
          //     </>
          //   )
          // })
        console.log(type, "type");
        // console.log(type[0].signature, "signature");

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

         

            <div className="row" style={{ borderBottom: "2px solid black" }}>
              <div className="col">
                {/* <p>
                  {" "}
                  Contract Dates:-
                  <span style={{ marginLeft: "12px", textAlign: "center" }}>
                    {moment(type.contract_date).utc().format(" Do MMMM, YYYY")}
                  </span>
                </p> */}
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
                    
                </tbody>
              </Table>
            </div>


            

          

            
            
                  
          </>
        );
    
    })}

     
    </div>
  );
};

export default Agreement;
