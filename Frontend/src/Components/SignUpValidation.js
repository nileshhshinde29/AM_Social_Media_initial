import React from 'react'

const validate = (values) => {
  const errors = {};
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // const symbol =
  const symbol =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
 
 
 
   if (values.firstname.length<5)
    {
        errors.firstName = "First name must be greater than 4";
    }

    if (!values.firstname)
    {
        errors.firstName = "please enter a first name";
    }
  
   if (values.lastname.length<5) {
     errors.lastName = "Last name must be greater than 4";
   }

    if (!values.lastname) {

        errors.lastName = "please enter a Last name";
    }




  if (regex.test(values.email) === false) {
    errors.email = "please enter valid email";
  }
  if (!values.email) {
    errors.email = "email text is required";
  }

  if (symbol.test(values.password) === false) {
    errors.password = "password must be contain special character and numbers";
  }
  if (Number(values.password.length) < 6) {
    errors.password = "password must be greater than 5";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default validate;

