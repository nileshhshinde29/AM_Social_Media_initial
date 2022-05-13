import React from "react";


//  userId: id,
//     bio: userDetails.bio && userDetails.bio,
//     gender: "",
//     image: "",
//     username: "",
//     dob: "",
//     email: "",
//     mobile: "",


const validate = (values) => {
  const errors = {};
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // const symbol =
  if (!values.bio) {
    errors.bio = "bio is required";
  }
  if (!values.gender) {
    errors.gender = "gender is required";
  }

  if (!values.username) {
    errors.username = "username is required";
  }
  if (values.username.length < 5) {
    errors.username = "username is must be greater than 5 digit";
  }

  if (!values.email) {
    errors.email = "please provide email";
  }
  if (regex.test(values.email) === false) {
    errors.email = "please enter valid email";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile No is required";
  }
  if (values.mobile.length < 15) {
    errors.mobile = "10 no must be required";
  }

  if (values.newPassword !== values.confirmPassword) {
    errors.bottomError =
      "new and confirm password are not matched password not matched";
  }

  return errors;
};;
export default validate;
