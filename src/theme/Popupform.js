import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    // Contract_date: Yup.date().required("Required"),
    // sales_rep: Yup.string().required("Required"),
  
    // Advertiser: Yup.string().required("Required"),
  
    // name: Yup.string().required("Required"),
  
    // event: Yup.string().required("Required"),
  
    // phone: Yup.string()
    //   .matches(/^[0-9]{10}$/, "Invalid phone number")
    //   .required("Required"),
  
    // email: Yup.string().email("Invalid email address").required("Required"),
  
    // start_date: Yup.date(),
    // end_date: Yup.date().min(
    //   Yup.ref("start_date"),
    //   "end date can't be before start date"
    // ),
  
    // termsAndConditions: Yup.bool().oneOf([true], "accept the t&C"),
  
  
  });
  
  


const Popupform = () => {
  return (
    <div>

    </div>
  )
}

export default Popupform