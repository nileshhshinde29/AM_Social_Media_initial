import React from "react";
//  previousPassword:"",
//   newPassword:"",
//   confirmPassword:""

const validate = (values) => {
  const errors = {};
   
  const symbol =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  
  if (values.previousPassword.length < 5) {
    
    errors.previousPassword = "Password should be greater than 4 digit";
  }
  if (!values.previousPassword) {
    errors.previousPassword = "Password is required";
  }
    if (symbol.test(values.newPassword) === false) {
      errors.newPassword =
        "password must be contain special character and numbers";
    }
  
  if (values.newPassword.length<5) {
    errors.newPassword = "newPassword should be grater than 4 digit";
  }
  if (!values.newPassword) {
    errors.newPassword = "newPassword is required";
  }
  
  if (!values.confirmPassword)
  {
    errors.confirmPassword = "conform password required";
  }    
  if (values.newPassword !== values.confirmPassword)
  {
     errors.bottomError = "new and confirm password are not matched password not matched";

  }
     
    
    
    
    
    
    
    return errors;
};
export default validate;
