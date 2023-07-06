// import React from 'react'
import './Form.css'
import Card from 'react-bootstrap/Card'




import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

 export const Termcondition = () =>  {
  const [show, setShow] = useState(false);
  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     
      <div onClick={() => setShow(true)}> term and condition</div>



      <Modal
        
           fullscreen={fullscreen}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-70w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title classnName="text-center" id="example-custom-modal-styling-title">
            Term and Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{width:"100%"}} >
          <p>
          <Card className='term-con'>
       <div style={{textAlign:'center',fontSize:'20px',fontWeight:'500'}}> Family FM Ltd. (VIBZ FM HD) –Terms and Conditions of Contract </div>
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

   <div className='last-term' style={{textAlign:'right',fontFamily:'600',marginTop:"10px",fontSize:'16px'}}>
Please make all cheques payable to Family Fm Ltd<br/>
Payments that exceed 60 day credit will be subjected to a 2.5% finance charge.
</div>
        
    </Card>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>

      </Modal>
    </>
  );
}

