import react from "react";
import * as React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Header from "./Components/Header";
import EditProfile2 from "./Components/EditProfile2";
import Feed2 from "./Components/Feed2";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [image, setProfileImage] = useState("");
  const [AuthorisationLink, setAuthorisationLink] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : ""
  );

  const [login, setLogin] = useState(() =>
    localStorage.getItem("token") ? true : false
  );

  //*************************************************************** */
  const [open, setOpen] = React.useState({
    show: false,
    message: "",
  });

  const handleClick = (msg) => {
    setOpen({ show: true, message: msg });
  };

  // const handleClose = (
  //   event: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };
  var handleClose = function (event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <Snackbar
        open={open.show}
        autoHideDuration={5000}
        onClose={handleClose}
        message={open.message}
        action={action}
      />
      <BrowserRouter>
        {!AuthorisationLink ? (
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate to="/login"></Navigate>}
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  handleClick={handleClick}
                  setToken={setAuthorisationLink}
                />
              }
            />
            <Route
              path="/signup"
              element={<Signup handleClick={handleClick} />}
            />
          </Routes>
        ) : (
          <>
            {AuthorisationLink && (
              <Header setToken={setAuthorisationLink} image={image} />
            )}
            <Routes>
              <Route path="/" element={<Feed2 handleClick={handleClick} />} />
              <Route
                path="/login"
                element={<Login setToken={setAuthorisationLink} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/edit"
                element={
                  <EditProfile2
                    handleClick={handleClick}
                    setProfileImage={setProfileImage}
                  />
                }
              />
              {/* <Route path='/header' element={<Header />} /> */}
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
