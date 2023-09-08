import React, { useEffect ,useState} from 'react';
import { Card } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Logo from 'src/layouts/full/shared/logo/Logo';
import './Form.css';
import Swal from 'sweetalert2';





const Clickup_page = () => {
  const navigate = useNavigate();

 
const [token ,settoken ]= useState()
const [role ,setrole ]= useState()
const [code  ,setcode ]= useState()


const showAlert = () => {
  Swal.fire({
    title: "Message Sent",
    text: "Your are syn with wrong Workspace.",
    icon: "error",
    confirmButtonText: "OK",
  });
};
const showAlert1 = () => {
  Swal.fire({
    title: "Message Sent",
    text: "Your are successfully syn with US",
    icon: "success",
    confirmButtonText:"OK",
  });

};

   const code_old =new URLSearchParams(window.location.search).get('code');
  
  console.log('Code:', code_old);

  useEffect(() => {
    if (code_old!==null || code_old!=="" || code_old!==undefined) {
      settoken(localStorage.getItem('temporytoken'))
      setrole(localStorage.getItem('role'))
      setcode(code_old)
    }
  }, [code_old]);

  const handleAuth = () => {
    try {
      axios
        .post(
          'https://api.familyfm.ltd:8080/api/public/clickupauthorization',
          {
            clickup_code: code.toString(),
            // clickup_code:'BYK4LK5EYGYBREQ9DISRBYBGZ60GOB09'
                  
          },
          {
            headers: { 'x-token': localStorage.getItem('temporytoken') },
          },
        )
        .then((response) => {
          if (response.data.code === 200 ||response.data.code === 400) {
          
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.removeItem('temporytoken');
            navigate('/dashboard/home', { replace: true });
            // navigate(0)
            showAlert1()
           
          } else if (response.data.code === 404) {
            window.location.replace(
              'https://app.clickup.com/api?client_id=B731VQQSX5AYO97C1KBJIQ0URTQZ6UMW&redirect_uri=https://contract.familyfm.ltd/authorization',
            );
            toast.error('You Choose wrong Workspace', {
              position: toast.POSITION.TOP_CENTER,
            });
          }

          else if (response.data.code === 401){
            navigate('/login', { replace: true });
            localStorage.removeItem('token');
            localStorage.removeItem('temporytoken');
            toast.error('You not have Permission/Access To Create Task', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          
          else if (response.data.code ===300){
            navigate('/login', { replace: true });
            localStorage.removeItem('token');
            localStorage.removeItem('temporytoken');
            showAlert()
          }

      


        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='authorization-card' >
      <div className="clickup-div">
        <div className="clickup-img">
          <Logo />
        </div>
        <div className='clickup-heading'>Click here for Sync with ClickUp Account</div>
        <button
          onClick={() => {
            handleAuth()
          }}
          className="btn-clickup"
        >
          Sync up With Clickup
        </button>
      </div>
    </div>
  );
};

export default Clickup_page;