import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Logo from 'src/layouts/full/shared/logo/Logo';
import './Form.css';

const Clickup_page = () => {
  const navigate = useNavigate()
  // const { code } = useParams(); // Use useParams to get the 'code' parameter from the URL
  const code = new URLSearchParams(window.location.search).get('code');
  // return code.get('code');
  const token = localStorage.getItem('temprarytoken');
  const role = localStorage.getItem('myrole');

  localStorage.setItem('role',role)
 
  console.log(token)
  localStorage.setItem('token', token);
  const mytoken = localStorage.getItem('token');
  console.log(mytoken);

  localStorage.removeItem('token')
  localStorage.removeItem('temprarytoken')
  

  // Use the code as needed
  console.log('Code:', code);

  useEffect(() => {
    if (code) {
      handleAuth(); // Call the API when 'code' and 'token' are available
    }
  }, [code]);

  const handleAuth = () => {
    try {
      axios.post(
        'http://localhost:8080/api/public/clickupauthorization',
        {
          clickup_code: code,
        },
        // {
        //   headers: { 'x-token': localStorage.getItem('token') },
        // }
      ).then((response)=>{
               if(response.data.code ==200){
                navigate('/dashboard/home', { replace: true });
                toast.success("Authorize successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
               }

               else if(response.data.code==404){
                
                window.location.replace(
                  'https://app.clickup.com/api?client_id=2CRFJAUW4G6R9H0CH78SQUUI7QIQKXYL&redirect_uri=https://contract.familyfm.ltd/authorization',
                );
                toast.error("workspace not found", {
                  position: toast.POSITION.TOP_CENTER,
                });
              
               }
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <div className="clickup-div">
        <div className="clickup-img">
          <Logo />
        </div>
        <div>Sync with ClickUp Opportunity</div>
        <button onClick={()=>{handleAuth()}} className="btn-clickup">
          Sync with Opportunity
        </button>
      </div>
    </Card>
  );
};

export default Clickup_page;
