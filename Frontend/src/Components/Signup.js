import React, { useState } from "react";
import {
  TextField,
  Box,
  Grid,
  Container,
  Typography,
  Button,
} from "@mui/material";
import validate from "./SignUpValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [formErrors, setformErrors] = useState({});
  let isSubmit = false;
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const postSignUpData = () => {
    axios
      .post("http://localhost:7000/sign-up", data)
      .then((res) => {
        props?. handleClick("User ragisteration successful!")
        navigate("/login");
      })
      .catch((response) => {
        // error.response.data.keyValue.email && setformErrors({backendError:"email is already in use"})
        // const errors = response.response.data.details[0].message;
        setformErrors({ backendError:"user is already in use please enter the another email id"})
       
      });
    //
  };

  // axios.get(`http://admin.liveexamcenter.in/api/questions?page=${pageNo}&limit=${limit}&term=${search}&topic=${topic}`, { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
  //           .then((response) => {
  //               setAllData(response.data)
  //           })
  //           .catch((error) =>
  //               console.log(error)
  //           )

  function AddData(e, data) {
    e.preventDefault();

    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit) {
      postSignUpData();

      isSubmit = false;
    }
  }

  return (
    <>
      <Box
        sx={{ display: "flex", margin: "40px 20% 0 20%", padding: "40px" ,backgroundColor:"white" }}
        border={1}
      >
        <form onSubmit={(e) => AddData(e, data)}>
          <Grid
            container
            alignItems={"center"}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            spacing={2}
            // xs={12}
          >
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
                label="First Name"
                variant="outlined"
                error={formErrors.firstName && true}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                error={formErrors.lastName && true}
                helperText={formErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                error={formErrors.email && true}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, password: e.target.value })}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                error={formErrors.password && true}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: "red" }}>
                {formErrors.backendError}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit" onClick={(e)=>AddData(e,data)}>
                {" "}
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" onClick={()=>navigate('/')}>
                {" "}
                Already have account ?
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Signup;
