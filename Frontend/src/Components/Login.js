import React from "react";
import {
  TextField,
  Box,
  Grid,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import validate from "./ValidationLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
// import { Box, paper , Grid ,} from "@material-ui/core";
const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props) {
  const [formErrors, setformErrors] = useState({});
  let isSubmit = false;
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log(data);

  const postLoginData = () => {
    axios
      .post("http://localhost:7000/login", data)
      .then((res) => {
        console.log(res.data.user);

        res.data.token &&
          localStorage.setItem("token", JSON.stringify(res.data.token));
        res.data.token &&
          localStorage.setItem("id", JSON.stringify(res.data.user._id));
        props.setToken(res.data.token);
        props?.handleClick("Login Successful !");
        navigate("/");
      })
      .catch((error) => {
        error.response.data &&
          setformErrors({ backendError: error.response.data });
        console.error(error);
      });
    //
  };

  const responseGoogle = (res) => {
    console.log(res);
    // console.log(res.Lu.Bv);
    axios
      .post("http://localhost:7000/google-login", { email: res.Lu.Bv })
      .then((res) => {
        if (res.data.status !== false) {
          if (res !== "user not found" && res.data.token !== "undefined") {
            console.log(res);
            res.data.token &&
              localStorage.setItem("token", JSON.stringify(res.data.token));
            res.data.token &&
              localStorage.setItem("id", JSON.stringify(res.data.user._id));
            props?.setToken(res.data.token);
            props?.handleClick("Login Successful !");
            navigate("/");
          }
        } else {
          // todo snack
          alert("Gmail Account Not Found");
        }
      });
  };

  function AddData(e, data) {
    e.preventDefault();

    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit) {
      postLoginData();
      isSubmit = false;
    }
  }

  return (
    <>
      <Box
        sx={{ display: "flex", margin: "40px 20% 0 20%", backgroundColor:'white', padding: "20px" }}
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
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="outlined-basic"
                label="Email"
                error={formErrors.email && true}
                helperText={formErrors.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                label="Password"
                type="password"
                error={formErrors.password && true}
                helperText={formErrors.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: "red" }}>
                {formErrors.backendError}
              </Typography>
            </Grid>
            <Grid container item alignItems={"center"} spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  onClick={(e) => AddData(e, data)}
                >
                  {" "}
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Sign up
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Button fullWidth variant="outlined">
                {" "}
                Login With Google
              </Button> */}
              <GoogleLogin
                clientId={clientId}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Login;
