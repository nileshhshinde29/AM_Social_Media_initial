import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Box,
  Grid,
  Container,
  Typography,
  Button,
} from "@mui/material";
import EditPassword from "./EditPassword";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ButtonAppBar(props) {
  let id = JSON.parse(localStorage.getItem("id"));
  const [state, setState] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    if (id) {
      fetching();
    }
  }, [props.image]);

  function fetching() {
    axios
      .get(`http://localhost:7000/user/${id}`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }

  var _a = React.useState(null),
    anchorEl = _a[0],
    setAnchorEl = _a[1];
  var open = Boolean(anchorEl);
  var handleClick = function (event) {
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function () {
    setAnchorEl(null);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const Logout = () => {
    if (window.confirm("are you sure want to logout")) {
      localStorage.clear();
      props.setToken("");
      navigate("/login");
    }
  };

  const [openn, setOpenn] = React.useState({
    open: false,
    message: "updated",
  });

  const handleClickk = (msg) => {
    setOpenn({ open: true, message: msg });
  };

  const handleClosee = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenn({ ...openn, open: false });
  };

  // useEffect(() => {
  //   console.log(props.)
  // },[props.state])

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosee}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //
  const getInitials = () => {
    return data.firstname[0].toUpperCase() + data.lastname[0].toUpperCase();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Button onClick={handleClickk}>Open simple snackbar</Button> */}
      <Snackbar
        open={openn.open}
        autoHideDuration={3000}
        onClose={handleClosee}
        message={openn.message}
        action={action}
      />
      <AppBar position="fixed" sx={{ height: "80px", marginBottom: "10px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            AM SOCIAL FEED
          </Typography>

          <Avatar
            sx={{ height: "50px", width: "50px" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            alt="nemy Sharp"
            src={data && "http://localhost:7000/" + data?.profilePicture} //data?.profilePicture
            // src={() => showAvtar(data)} //data?.profilePicture
            // src={props.image === true ?("http://localhost:7000/"+ props.image ) : ("http://localhost:7000/" + data?.profilePicture)}
          >
            {data && getInitials()}

            {/* {data && console.log(data)} */}
          </Avatar>

          {/* <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/edit");
                handleClose();
              }}
            >
              Edit Profile
            </MenuItem>
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <EditProfile handleClickk={handleClickk} /> */}
              </Box>
            </Modal>
            <MenuItem onClick={handleOpen2}>Change Password</MenuItem>
            <Modal
              open={open2}
              // onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditPassword
                  handleClickk={handleClickk}
                  handleClose2={handleClose2}
                />
              </Box>
            </Modal>
            <MenuItem onClick={() => Logout()}>Logout</MenuItem>
          </Menu>

          <Button onClick={handleClick} color="inherit">
            {data && data.firstname + " " + data.lastname}{" "}
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
