import { Mail } from '@mui/icons-material';
import React, { lazy, useState, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Adminaccess from 'src/theme/Adminaccess';
import Agreement from 'src/theme/Agreement';
import Clickup from 'src/theme/Clickup';
import Contract from 'src/theme/Contract';

import Customer from 'src/theme/Customer';
import Form from 'src/theme/Form';
import Invoice from 'src/theme/Invoice';
import { Termcondition } from 'src/theme/Termcondition';
import Updateform from 'src/theme/Updateform';
import Forgetpassword from 'src/views/authentication/auth/Authforgetpassword';
import AuthForgetpassword from 'src/views/authentication/auth/Authforgetpassword';
import Authforgetpassword from 'src/views/authentication/auth/Authforgetpassword';
import Authresetpassword from 'src/views/authentication/auth/Authresetpassword';
import Clickup_page from 'src/views/utilities/Clickup_page';
import Contractview from 'src/views/utilities/Contractview';
import Pdf from 'src/views/utilities/Pdf';
// import Updateform from 'src/views/utilities/Updateform';
import Viewdetail from 'src/views/utilities/Viewdetail';
// import Viewdetail from 'src/views/utilities/Viewdetail';
// import Contractlist from 'src/views/utilities/contractlist';
// import Logres from 'src/views/authentication/Logres';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
// const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Contractlist = Loadable(lazy(() => import('../views/utilities/contractlist')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

export default function Router() {
  const [Isloggin, setIsLogin] = useState();
  useEffect(() => {
    setIsLogin(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);
  // useEffect(() => {
  //   setIsLogin(localStorage.getItem("token"))
  // }, []);

  return useRoutes([
    {
      path: '/dashboard',
      element: Isloggin !== null ? <FullLayout /> : <Navigate to="/" />,

      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/home" /> },

        { path: 'home', element: <Dashboard /> },

        { path: 'agreement', element: <Form /> },
        { path: 'salesperson', element: <Adminaccess /> },
        { path: 'invoice', element: <Invoice /> },
        { path: 'agreementlist', element: <Contractlist /> },
        { path: 'contract', element: <Contract /> },
        { path: 'Customer', element: <Customer /> },
        { path: 'Mail', element: <Mail /> },
        { path: 'myclickup', element: <Clickup /> },

        { path: 'Viewdetail/:id', element: <Viewdetail /> },
        { path: 'contractview/:id', element: <Contractview /> },

        { path: 'updateagreement/:id', element: <Updateform /> },
      ],
    },
    {
      path: '/',
      element: !Isloggin ? <BlankLayout /> : <Navigate to="/dashboard" />,

      children: [
        // { path: '404', element: <Error/> },
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'authorization', element: <Clickup_page /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <AuthForgetpassword /> },
        { path: 'resetpassword', element: <Authresetpassword /> },
        { path: '404', element: <Error /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" /> },
  ]);
}
