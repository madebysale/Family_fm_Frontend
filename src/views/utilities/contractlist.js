import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { RotatingLines } from 'react-loader-spinner';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Pdf from './Pdf';

// import React, { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';
import { Descriptions } from 'antd';

// import "./Adminpanel.css";
// import mylogo from "../component/fm_logo.png";
// import view from "../component/view.png.png";
// import{AiOutlineLogout} from 'react-icons/ai'4
import { FiArrowRight } from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrOverview } from 'react-icons/gr';
import { CiEdit } from 'react-icons/ci';
import ConfirmationModal from './ConformationModal';

import { Input, Select } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Field } from 'formik';
import { Option } from 'antd/es/mentions';
import { Grid, Container, Typography } from '@mui/material';

// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row } from 'react-bootstrap';
import { Card } from '@material-ui/core';

function Contractlist(props) {
  const navigate = useNavigate();
  const modeluseref = useRef();

  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const [mainloader, setmainloader] = useState(false);
  const [totalrow, settotalrow] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [mypdf, setmypdf] = useState('');
  const [mypdfinvoice, setmypdfinvoice] = useState('');

  const [pdfdata, setpdfdata] = useState([]);
  const [pdfdata1, setpdfdata1] = useState([]);

  const [pdfdata2, setpdfdata2] = useState([]);
  const [pdfdata3, setpdfdata3] = useState([]);
  const [pdfdata4, setpdfdata4] = useState([]);
  const [pdfdata5, setpdfdata5] = useState([]);
  const [pdfdata6, setpdfdata6] = useState([]);

  useEffect(() => {
    setIsrole(parseInt(localStorage.getItem('role')));
    setTimeout(() => setmainloader(false), 2000);

    axios
      .post(
        'http://localhost:8080/api/public/list',
        {
          page: currentPage,
          limit: itemsPerPage,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data.results);
        settotalrow(response.data.totalRows);
        console.log(response.data.totalRows, 'pa');
        setmainloader(true);
      })
      .catch((error) => {
        if (error.response.status == 500) {
          navigate('/login', { replace: true });
          localStorage.removeItem('token');
        }
        console.log(error.response.status, 'errod');
        setmainloader(false);
        toast.error(error.response.data.message);
      });
  }, [Delete, currentPage]);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');

  const handleSort = (column) => {
    if (column === sortColumn) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (rowIndex) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = Data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(item.contract_date)
        .utc()
        .format('Do MMMM, YYYY')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.phone).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.sales_rep).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.event).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.orderid).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function onpdf(id) {
    axios.post(`http://localhost:8080/api/public/pdf/${id}`).then((res) => {
      setmypdf(res.data.data);
      setmypdfinvoice(res.data.data.fields[0][0]);
      console.log(res.data.data.fields[0][0]);
    });
  }

  const handleDeleteClick = (id) => {
    setItemIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (itemIdToDelete) {
      axios
        .post(`http://localhost:8080/api/public/delete/${itemIdToDelete}`)

        .then((response) => {
          console.log(response.data);
          if (response.code !== 200) {
            setDelete(!Delete);
            // Perform any necessary actions on delete failure
          }
          toast.success(response.data.message);
        })
        .catch((error) => {
          // Handle error if API request fails
        });
      console.log('Item deleted!');
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    console.log('Deletion canceled.');
    setShowConfirmation(false);
  };

  // const onDelete = (id) => {
  //   axios
  //     .post(`http://localhost:8080/api/public/delete/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       if(response.code!==200){
  //         setDelete(!Delete)

  //       }
  //       toast.success(response.data.message);
  //     })
  //     .catch((error) => {
  //       if (error.response) {

  //         console.log(error.response.status);
  //         console.log(error.response.data);
  //       } else if (error.request) {
  //         console.log(error.request);
  //       } else {
  //         console.log(error.message);
  //       }
  //     });
  // };

  const sortedData = filteredData.sort((a, b) => {
    console.log(filteredData, 's45dsx');
    const columnA = a.name.toLowerCase();
    const columnB = b.name.toLowerCase();

    if (columnA < columnB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const generatePDF = (invoiceid) => {
    axios.post(`http://localhost:8080/api/public/pdf/${invoiceid}`).then((res) => {


      if ( res.data.data !== undefined|| res.data.data !== null|| res.data.data.details!== undefined || res.data.data.itemlist !== undefined || res.data.data.monthlyshedule!==undefined) {
       
        console.log(res.data.data.details)
        setpdfdata(res.data.data.details);
        setpdfdata1(res.data.data.itemlist);
        setpdfdata6(res.data.data.monthlyshedule);
        setpdfdata3(res.data.data.minStartDate);
        setpdfdata4(res.data.data.maxEndDate);
        console.log(res.data.data.itemlist, '525');


        const doc = new jsPDF('p', 'mm', 'a4', true);


        const tableData = [
          [
            'Run Dates',
            'Run Times',
            'Run Weeks',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'sun',
            'Wks Total',
            'Description',
            'Qty',
            'item Cost',
            'Total Cost',
          ],
        ];
        const startX = 5;
        const startY = 100;

      

        const tablerow = [];
        const tablerow2 = [];
       

        doc.setFontSize(11);
       

        doc.text(``, 70, 0, { setFontSize: '20' });
    
        doc.setFontSize(12).setFont(undefined, 'bold');
        doc.text(`FAMILY FM LTD`, 60, 30, { fontSize: '18' });

        doc.setFontSize(12).setFont(undefined, 'normal');

        doc.text(`Langsford Estate`, 60, 35);
        doc.text(`P.O. Box W1102`, 60, 40);
        doc.text(`All Saints Rd`, 60, 45);
        doc.text(`St John's, Antigua`, 60, 50);
        doc.text(`Tel (268) 560- 7578/9`, 60, 55);
        doc.text(`Email: info@familyfm.ltd`, 60, 60);

        doc.text(`name:${pdfdata.name}`, 60, 70);
        doc.text(`phone:${pdfdata.phone}`, 60, 75);
        doc.text(`Email:${pdfdata.email}`, 60, 80);

        doc.setFontSize(14).setFont(undefined, 'bold');

        doc.text(`Family FM , Vibz FM Order Confirmation`, 110, 15);
        doc.text(`${pdfdata.orderid}`, 115, 20);

        doc.setFontSize(11).setFont(undefined, 'normal');

        doc.text(`Estimate/PO:`, 120, 30);

        doc.text(`AccountRep:${pdfdata.sales_rep}`, 120, 35);
        doc.text(
          `Run Dates :${moment(pdfdata3).utc().format('Do MMMM, YYYY')} - ${moment(pdfdata4)
            .utc()
            .format('Do MMMM, YYYY')}`,
          120,
          40,
        );
        doc.text(`Gross : $${pdfdata.cost}`, 120, 45);
        doc.text(`+Abst 2 : ${pdfdata.discountabst} %`, 120, 50);
        doc.text(`${pdfdata.discountdropdown}: $${pdfdata.trade}`, 120, 55);
        doc.text(`Total Amount : $${pdfdata.grandtotal}`, 120, 60);

        doc.text('Payment Schedule/Other Details:', 5, 245);
        doc.text(`${pdfdata.paymentdue}`, 5, 250);
        doc.text('Please make all cheques payable to Family Fm Ltd', 115, 260);
        doc.text(
          'Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.',
          70,
          265,
        );

        for (let insidedataindex = 0; insidedataindex < pdfdata1.length; insidedataindex++) {
          console.log(pdfdata1.length, '7825');
          console.log(pdfdata1[insidedataindex], '555');

          const item = pdfdata1[insidedataindex];
          console.log(item.monday, 'ffdvvcitem');

          tablerow.push([
            moment(item.start_date).utc().format('Do MMMM') +
              '-' +
              moment(item.end_date).utc().format('Do MMMM'),
            moment(item.starttime).format('h:mma') + '-' + moment(item.endtime).format('h:mma'),
            'ALL WEEKS',

            item.monday,
            item.tuesday,
            item.wednesday,
            item.thursday,
            item.friday,
            item.saturday,
            item.sunday,
            item.total,
            item.product_type,
            item.qty,
            '[Package]',
            `$${item.cost}`,
          ]);
        }

        doc.setLineWidth(0.5);
        doc.line(5, 203, 205, 203);
        doc.line(5, 164, 205, 164);
        doc.line(5, 144, 205, 144);

        doc.setFontSize(12).setFont(undefined, 'bold');
        doc.text(`Calender Month Projected Billing [Net+Tax]:`, 10, 172);
        console.log(pdfdata6.july, 'july');
        doc.setFontSize(9).setFont(undefined, 'normal');
        doc.text(`Jan `, 10, 180);
        doc.text(`$${pdfdata6.jan}`, 37.14, 180);
        doc.text(`Feb `, 64.28, 180);
        doc.text(`$${pdfdata6.feb}`, 91.42, 180);
        doc.text(`Mar `, 118.56, 180);
        doc.text(`$${pdfdata6.mar}`, 145.7, 180);
        doc.text(`Q1-2023`, 172.84, 180);
        doc.text(
          `$${Number(pdfdata6.jan) + Number(pdfdata6.feb) + Number(pdfdata6.mar)}`,
          190,
          180,
        );
        doc.text(`April `, 10, 186);
        doc.text(`$${pdfdata6.april}`, 37.14, 186);
        doc.text(`May `, 64.28, 186);
        doc.text(`$${pdfdata6.may}`, 91.42, 186);
        doc.text(`June `, 118.56, 186);
        doc.text(`$${pdfdata6.june}`, 145.7, 186);
        doc.text(`Q2-2023`, 172.84, 186);
        doc.text(
          `$${Number(pdfdata6.april) + Number(pdfdata6.may) + Number(pdfdata6.june)}`,
          190,
          186,
        );
        doc.text(`July `, 10, 192);
        doc.text(`$${pdfdata6.july}`, 37.14, 192);
        doc.text(`Aug `, 64.28, 192);
        doc.text(`$${pdfdata6.aug}`, 91.42, 192);
        doc.text(`Sept `, 118.56, 192);
        doc.text(`$${pdfdata6.sept}`, 145.7, 192);
        doc.text(`Q3-2023`, 172.84, 192);
        doc.text(
          `$${Number(pdfdata6.july) + Number(pdfdata6.aug) + Number(pdfdata6.sept)}`,
          190,
          192,
        );
        doc.text(`Oct `, 10, 198);
        doc.text(`$${pdfdata6.oct}`, 37.14, 198);
        doc.text(`Nov `, 64.28, 198);
        doc.text(`$${pdfdata6.nov}`, 91.42, 198);
        doc.text(`Dec `, 118.56, 198);
        doc.text(`$${pdfdata6.dec}`, 145.7, 198);
        doc.text(`Q4-2023`, 172.84, 198);
        doc.text(
          `$${Number(pdfdata6.oct) + Number(pdfdata6.nov) + Number(pdfdata6.dec)}`,
          190,
          198,
        );

        tablerow2.push([
          `$${pdfdata.cost}`,
          `$${pdfdata.trade}`,
          `$${(((pdfdata.cost - pdfdata.trade) * pdfdata.discountabst) / 100).toFixed(2)}`,
          `$${pdfdata.grandtotal}`,
        ]);

        const tableData2 = [
          ['TOTAL COST OF PACKAGE', `${pdfdata.discountdropdown}`, 'ABST', 'TOTAL'],
        ];

        doc.autoTable({
          head: tableData,
          body: tablerow,
          startY: 100, // Change this to adjust the vertical position
          margin: { top: 10, right: 5, bottom: 40, left: 5 },
          tableWidth: 'auto',
          styles: {
            overflow: 'linebreak',
            cellWidth: 'wrap',
            cellPadding: 1,
            fontSize: 6,
          },
          theme: 'grid',
        });

        doc.autoTable({
          head: tableData2,
          body: tablerow2,
          startY: 150, // Change this to adjust the vertical position
          margin: { top: 30, right: 5, bottom: 40, left: 5 },
          tableWidth: 'auto',
          styles: {
            overflow: 'linebreak',
            cellWidth: 'wrap',
            cellPadding: 1,
            fontSize: 8,
          },
          theme: 'grid',
        });

        doc.save(`${pdfdata.name}_${pdfdata.orderid}.pdf`);

        doc.addPage();

        doc.text(`ABST# 0484956`, 8, 7);

        doc.setFontSize(14).setFont(undefined, 'bold');

        doc.text(`Family FM Ltd. (VIBZ FM HD) –Terms and Conditions of Contract`, 25, 13);

        doc.setFontSize(10).setFont(undefined, 'normal');

        doc.text(
          `1. Billing terms are net 30 days from date of invoice. Cancellation notice is two weeks prior to run date.The normal deadline 
             period for radio advertising material is two (2) working days before broadcast.In exceptional cases, material may be
             submitted on shorter deadlines however it must be negotiated with the General Manager. There will be no guarantee on
             the flight of material submitted less than 48 weekday hours prior to run date.`,
          6,
          20,
        );

        doc.text(
          `2. Cancellation is subject to written notice, ten (10) working days prior to broadcast. Cancellations within ten (10) working days 
             prior to broadcast, will incur a penalty of 10% of the published rate for spots cancelled within this period. Cancellations
             within two (2) working days of broadcast will be charged at full rate.`,
          6,
          40,
        );

        doc.text(
          `3.We reserve the right not to air any material supplied to us which in our opinion may be defamatory, objectionable to our listeners,
             discriminatory, misleading or deceptive or would infringe any law or expose us to any liability.`,
          6,
          55,
        );
        doc.text(
          `4. The positioning of your advertisement is at our discretion, unless stated otherwise been agreed between us in writing.`,
          6,
          68,
        );
        doc.text(
          `5.We may act on a Booking Order if you are advertising agency acting on behalf of the advertiser. In this case, you must
             provide a copy of these terms and conditions to the advertiser and the warranties and indemnities contained in these terms 
             and conditions given by you will be deemed to also have been given by the advertiser. The placing of a Booking Order
             constitutes a request by you for us to transmit an advertisement as contained in the Booking Order on these terms 
             and conditions`,
          6,
          74,
        );
        doc.text(
          `6.You warrant to us, our employees and agents that the advertisement is not in contravention of any law and the relevant 
             fair trading legislation nor does it infringe the rights of any person (including without limitation, third party’s intellectual property 
             rights).`,
          6,
          94,
        );
        doc.text(
          `7.Your indemnity will keep us, our employees and agents indemnified against all costs, expenses, claims, demands, damages
             and loss of any kind in connection with us accepting a Booking Order or airing your advertising material or otherwise 
             acting upon your instructions`,
          6,
          110,
        );
        doc.text(
          `8.Except as may be set out in these terms and conditions, we make no other warranties or representations in relation to the 
             transmission of your advertisement.`,
          6,
          125,
        );
        doc.text(
          `9.You agree that Family FM Ltd. will not be liable to you for loss of profit, indirect, consequential or incidental loss, damage or
             injury which you may suffer under or in connection with your advertisement.`,
          6,
          135,
        );
        doc.text(
          `10.Family FM Ltd. reserves the right to reject, refuse or discontinue any contract for reasons satisfactory to itself, or remove 
             without notice, material it considers not in the public’s interest.`,
          6,
          145,
        );
        doc.text(
          `11.Rates are charged for spots no longer than 45 seconds. Commercials of a longer length must have prior approval form the 
             Station Manager. If this is not done (a) the advertiser will be charged at a higher rate or (b) the commercial will not 
             be broadcast.`,
          6,
          155,
        );
        doc.setTextColor('red');
        //  doc.setLineWdth(0.1);
        doc.text(
          `12.For annual contracts: Given that your annual rates are discounted, the contents of this contract can only be used for the client. 
             The client is not allowed to transfer spots, sponsorship and/or mentions to a third party unless that third party takes out
             a separate contract with Family FM. If the client does not comply, he/she will be charged the full amount for spots, 
             mention etc Saved image png Client Signature`,
          6,
          170,
        );

        doc.setTextColor('black');

        // doc.addImage( `http://localhost/Vibz_FM/uploads/${data.signature}`, 10, 190, 50, 25);
        // }

        const columnWidth = 65;
        const rowHeight = 5;

        // doc.line(15, 215, 60, 215);

        doc.text(`Family FM Representation`, 15, 220);

        //   doc.autoTable({

        //     head: tableData,
        //     body: tablerow,
        //     startY: 100, // Change this to adjust the vertical position
        //     margin: { top:50, right: 10, bottom: 10, left: 10 },
        //     tableWidth: 'auto',
        //     styles: {
        //     overflow: 'linebreak', cellWidth: 'wrap', cellPadding: 1, fontSize: 6 },
        //     theme: 'grid'
        //   });
        //  doc.save(`table.pdf`);

        doc.output('dataurlnewwindow', { compress: true });
      }
    });
  };

  return (
    <>
      <Container maxWidth="xl dashhead">
        {/* <h3 className='mt-5 heading-nw'>Quotations List</h3> */}

        <div className="header-div"></div>

        <Card className="mt-3 py-3 px-3">
          <div className="mt-3  img-con-ad">
            <div className="btn create-invo">
              <Link to="/dashboard/agreement">Create Quotation +</Link>
            </div>
          </div>
          <div className="search-admin">
            <Input
              placeholder="Search"
              className="col-3 mt-2 mb-1 mx-3 input"
              value={searchTerm}
              onChange={handleSearch}
            ></Input>

            {mainloader ? (
              <RotatingLines type="Oval" strokeColor="grey" height={150} width={150} />
            ) : (
              <Table className="ad-table " style={{}}>
                <thead>
                  <tr className="head-row">
                    <th>ID</th>
                    <th className="header-cell" onClick={() => handleSort('first_name')}>
                      <div className="header-content">
                        <span>Name</span>
                        {sortColumn === 'first_name' && (
                          <Icon
                            icon={sortOrder === 'asc' ? 'carbon:arrow-up' : 'carbon:arrow-down'}
                            className="sort-icon"
                          />
                        )}
                      </div>
                    </th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Event</th>
                    <th>Sales rep</th>

                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr onClick={() => handleRowClick(index)}>
                          <td>{item.orderid}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.event}</td>
                          <td>{item.sales_rep}</td>
                          {/* <td>{moment(item.contract_date).utc().format('MM/DD/YY')}</td> */}
                          {/* <td>
                      <Icon style={{color:'green',fontSize: '19px'}} icon="akar-icons:edit" onClick={() =>navigate(`/dashboard/updateagreement/${item.id}`)} />
                          </td> */}
                          <td>
                            {/* <img src={view} alt="React view"className="view-img" onClick={()=>navigate(`/admin/viewdetail/${item.id}`,{replace:true})}/> */}
                            <Icon
                              style={{ color: 'blue', fontSize: '19px', cursor: 'pointer' }}
                              icon="carbon:view"
                              onClick={() => navigate(`/dashboard/viewdetail/${item.id}`)}
                            />
                            {/* <i
                          style={{ color: '#4570EA', cursor: 'pointer' }}
                         
                        >
                          <GrOverview size={25} />
                        </i> */}
                          </td>
                          {/* <td>
                            <Icon
                              style={{ color: 'blue', fontSize: '19px', cursor: 'pointer' }}
                              icon="bi:file-pdf"
                              onClick={() => generatePDF(item.id)}
                            />
                          </td> */}
                          <td>
                            <Icon
                              style={{ color: 'red', fontSize: '19px', cursor: 'pointer' }}
                              icon="fluent:delete-32-regular"
                              onClick={() => {
                                handleDeleteClick(item.id);
                              }}
                            />
                          </td>

                          <div>
                            {/* <Pdf props={{handleFunction: mypdf,handleFunction2:mypdfinvoice }} /> */}
                          </div>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>

          <Pagination
            style={{ alignItems: 'center' }}
            itemsPerPage={itemsPerPage}
            totalItems={totalrow}
            paginate={paginate}
          />
        </Card>
      </Container>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this Quotation?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          itemId={itemId}
        />
      )}
    </>
  );

  function Pagination({ itemsPerPage, totalItems, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className="page-link"
                disabled={number === currentPage}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Contractlist;
