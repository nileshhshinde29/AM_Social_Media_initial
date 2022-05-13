import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import '../App.css'
// import MuiPhoneNumber from "mui-phone-number";
import { TextField, Box, Grid, Container, Typography, FormControl ,FormLabel ,Button, TextareaAutosize, Radio ,RadioGroup, FormControlLabel } from '@mui/material';

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { LocalizationProvider , DatePicker} from '@mui/lab'
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Header from './Header'
import Login from "./Login";
import validate from "./EditProfileValidation"




const Edit = (props) => {
  const navigate = useNavigate();
  const formData = new FormData();
  let id = JSON.parse(localStorage.getItem("id"));
  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));
  const [userDetails, setUserDetails] = useState({});
  const [edit, setEdit] = useState(false);
  const [selectedImage, setImage] = useState("");
  const [formErrors, setformErrors] = useState({});
  let isSubmit = false;
  const [photo, setPhoto] = useState({
    image: "",
    userId: id,
  });

  const formData2 = new FormData();
  const [obj, setObj] = useState({
    userId: id,
    bio: userDetails.bio && userDetails.bio,
    gender: "",
    image: "",
    username: "",
    dob: "",
    email: "",
    mobile: "",
  }); 

  const getData = () => {
    axios
      .get(`http://localhost:7000/user/${id}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        props.setProfileImage(resp.data.profilePicture);
        setObj({ ...obj, ...resp.data });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = () => {
    
    formData.append("userId", obj.userId);
    formData.append("bio", obj.bio);
    formData.append("gender", obj.gender);
    // formData.append("image", obj.image);
    formData.append("username", obj.username);
    formData.append("dob", obj.dob);
    formData.append("email", obj.email);
    formData.append("mobile", obj.mobile);

    axios
      .put(`http://localhost:7000/user/${id}`, formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        formData.delete("bio");
        formData.delete("gender");
        formData.delete("image");
        formData.delete("userName");
        formData.delete("dob");
        formData.delete("email");
        formData.delete("mobile");

        props.handleClick("Profile updated Successfuly!")
        

        navigate("/");
      }) .catch((response) => {
        // error.response.data.keyValue.email && setformErrors({backendError:"email is already in use"})
        // const errors = response.response.data.details[0].message;
        setformErrors({ backendError:"user is already in use please enter the another email id"})
       
      });
      
      
      
      
      
    //   .catch = (err) => {
       
    //     setformErrors({ backendError: "user is already in use please enter the another email id" })
    //     //  console.log(err);
    // };
  };

  const updatePhoto = () => {
    formData.append("image", photo.image);
    formData.append("userId", photo.userId);

    axios
      .put(`http://localhost:7000/user/edit-profile-picture/${id}`, formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        formData.delete("image");
        formData.delete("userId");
        getData();
        setImage("");
         props.handleClick("Profile photo updated Successfuly!");
      }).catch = (err) => {
      console.log(err);
    };
  };
  const deletePhoto = () => {
    formData.append("userId", id);

    axios
      .put(
        `http://localhost:7000/user/delete-profile-picture/${id}`,
        formData,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((resp) => {
        // formData.delete("image");
        formData.delete("userId");
        getData();
         props.handleClick("Profile Photo Deleted Successfuly!");
      }).catch = (err) => {
      console.log(err);
    };
  };

  function handleChange(e) {
    setPhoto({ ...photo, image: e.target.files[0] });
    setImage(URL.createObjectURL(e.target.files[0]));
  }
 
//**************validation******************************************* */



function AddData(e, data) {
  e.preventDefault();

  isSubmit = true;

  const errors = validate(data);
  setformErrors(validate(data));

  if (Object.keys(errors).length == 0 && isSubmit) {
    updateUser();
    isSubmit = false;
  }
}


  return (
    <div
      style={{
        margin: "100px 20% 0 20%",
        border: "1px solid orange",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      {" "}
      <br />
      <br />
      <br />
      {/* <form> */}
      <Grid container alignItems={"center"} spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Edit Profile
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              height="200px"
              width="200px"
              style={{ borderRadius: "50%" }}
              alt={`post`}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {obj.profilePicture ? (
            <>
              <img
                src={"http://localhost:7000/" + obj.profilePicture}
                height="200px"
                width="200px"
                style={{ borderRadius: "50%" }}
                alt={`post`}
              />
              <br />
              <br />
              <Grid
                item
                container
                xs={12}
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item sx={6}>
                  <Button variant="contained" onClick={() => setEdit(!edit)}>
                    {" "}
                    Edit Photo
                  </Button>{" "}
                </Grid>
                <Grid item sx={6}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setEdit(false);
                      deletePhoto();
                    }}
                  >
                    {" "}
                    Delete
                  </Button>
                </Grid>
              </Grid>

              <br />

              {edit && (
                <>
                  <br />
                  <br />
                  <input
                    fullWidth
                    // onChange={(e) => setObj({ ...obj, profilePicture: e.target.value })}
                    type="file"
                    accept="image/*"
                    // value={`http://localhost:7000/${obj?.profilePicture}`}
                    label="Upload Photo"
                    onChange={(e) =>
                      setPhoto({ ...photo, image: e.target.files[0] })
                    }
                    // error={formErrors.email && true}
                    // helperText={formErrors.email}
                    variant="outlined"
                  />
                  <br />
                  <br />

                  <Grid
                    item
                    container
                    // sx={12}
                    spacing={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Grid item sx={6}>
                      <Button
                        variant="contained"
                        onClick={async () => {
                          updatePhoto();
                          setEdit(!edit);
                          await getData();
                        }}
                      >
                        {" "}
                        upload
                      </Button>{" "}
                    </Grid>
                    <Grid item sx={6}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setEdit(!edit);
                        }}
                      >
                        {" "}
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              <input
                fullWidth
                // onChange={(e) => setObj({ ...obj, profilePicture: e.target.value })}
                type="file"
                accept="image/*"
                // value={`http://localhost:7000/${obj?.profilePicture}`}
                label="Upload Photo"
                onChange={(e) =>
                  // setPhoto({ ...photo, image: e.target.files[0] })
                  handleChange(e)
                }
                // error={formErrors.email && true}
                // helperText={formErrors.email}
                variant="outlined"
              />
              <br />
              <br />
              <Button variant="contained" onClick={() => updatePhoto()}>
                {" "}
                Save
              </Button>
            </>
          )}
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={{ marginRight: "20px" }}
              id="outlined-basic"
              // onChange={(e) => setData({ ...data, password: e.target.value })}
              label="userName"
              value={obj.username}
              onChange={(e) => setObj({ ...obj, username: e.target.value })}
              error={formErrors?.username}
              helperText={formErrors?.username}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              fullWidth
              aria-label="empty textarea"
              placeholder="Bio"
              value={obj.bio}
              onChange={(e) => setObj({ ...obj, bio: e.target.value })}
              minRows={3}
              error={formErrors?.bio}
              helperText={formErrors?.bio}
              //  labal="Bio"
              style={{ width: "100%" }}
            />
            <p className="red">{formErrors?.bio}</p>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          
        </Grid> */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={obj.gender}
                onChange={(e) => setObj({ ...obj, gender: e.target.value })}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <p className="red">{formErrors.gender}</p>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Date Of Birth"
                value={obj.dob}
                openTo="year"
                views={["year", "month", "day"]}
                // value={AllEmployeData.DOB}
                onChange={(newValue) => {
                  setObj({ ...obj, dob: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              onChange={(e) => setObj({ ...obj, email: e.target.value })}
              value={obj.email}
              label="Email"
              type="email"
              error={formErrors?.email}
              helperText={formErrors?.email}
              variant="outlined"
            />
            <p className="red">{formErrors?.backendError}</p>
          </Grid>
          <Grid item xs={6}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              onChange={(value) => setObj({ ...obj, mobile: value })}
              // defaultValue={obj.mobile}
              // error={formErrors?.mobile}
              // helperText={formErrors?.mobile}
              value={JSON.stringify(obj.mobile)}
            />
            <p className="red">{formErrors?.mobile}</p>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={(e) => AddData(e, obj)}
            >
              {" "}
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={() => navigate("/")}>
              {" "}
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "red" }}>
            {/* {formErrors.backendError} */}
          </Typography>
        </Grid>
      </Grid>
      {/* </form> */}
    </div>
  );
};
export default Edit;
