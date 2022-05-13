import React, { useState } from 'react'
import { TextField, Box, Grid, Container, Typography, Button } from '@mui/material';
import axios from "axios"
import validate from './EditPasswordValidation';


function EditPassword(props) {

let id =  JSON.parse(localStorage.getItem("id"))
const[error , setError]= useState('')
const [ data , setData] = useState({
  userId:id,
  previousPassword:"",
  newPassword:"",
  confirmPassword:""
})


function fetching(e) {
  axios.put(`http://localhost:7000/user/changepassword/${id}`, data , { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
    .then((response) => {
         setError('')
         props.handleClose2()
         props.handleClickk("Password successfuly updated !")
      })
      .catch((error) =>{
      
        setformErrors({ ...formErrors, bottomError:"Old Password wrong"})
        }
      )
}

  
  // ********************* validation
   const [formErrors, setformErrors] = useState({});
   let isSubmit = false;

  function AddData(e, data) {
    e.preventDefault();

    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit){
      fetching();
      isSubmit = false;
    }
  }

  
  

  return (
    <>
      <form>
        <Grid
          container
          alignItems={"center"}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Change Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) =>
                setData({ ...data, previousPassword: e.target.value })
              }
              type="password"
              value={data.previousPassword}
              label="Current Password"
              error={formErrors.previousPassword}
              helperText={formErrors.previousPassword}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              label="New Password"
              type="password" // please make change in backend in user line no 126
              error={formErrors?.newPassword} //res.status(403).json({
              // success: false,
              //  message: "please provide correct password",
              helperText={formErrors?.newPassword}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              label="Confirm Password"
              type="password"
              error={formErrors?.confirmPassword}
              helperText={formErrors?.confirmPassword}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "red" }}>
              {formErrors?.bottomError}
              {/* {error?.error} */}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => AddData(e, data)}
            >
              {" "}
              Save
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => props.handleClose2()}
            >
              {" "}
              close
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EditPassword
