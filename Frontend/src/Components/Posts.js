import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Posts(props) {
  const {setData}= props
  const formData = new FormData();
  const imgRef = React.useRef();
  const [selectedImage, setImage] = useState("");

  const [obj, setObj] = useState({
    caption: "",
    image: "",
    userId: JSON.parse(localStorage.getItem("id")),
  });

  const uploaddata = async () => {
    formData.append("image", obj.img);
    formData.append("caption", obj.caption);
    formData.append("userId", obj.userId);

    axios
      .post("http://localhost:7000/posts/create", formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((resp) => {
        props.handleClick("Image Posted Successfuly!");

        formData.delete("image");
        formData.delete("caption");
        formData.delete("userId");

        imgRef.current.value = null;
        // props.setPage(1)
        // const mydata =props.data.slice(0,-1)
        // const 
        setData(prv=> [resp.data.post ,...prv.slice(0,-1)])

        setObj({ ...obj, img: "", caption: "" });

        // 
        // props.fetch();
        setImage('')


        //
      }).catch = (err) => {
      console.log(err);
    };
  };

   function handleChange(e) {
     setObj({ ...obj, img: e.target.files[0] });
     setImage(URL.createObjectURL(e.target.files[0]));
   }
  
  
  const Cancel = () => {
    imgRef.current.value = null;
    setImage("")
    setObj({ ...obj, image: "", caption: "", img: '' })
    setformErrors('')
  }
  
  //************************************************************************************ */
  const [formErrors, setformErrors] = useState({});
  let isSubmit = false;

  function AddData(e, data) {
    e.preventDefault();

    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit) {
      uploaddata();
      isSubmit = false;
    }
  }
  const validate = (values) => {
    const errors = {};

    if (!values.caption) {
      errors.caption = "caption is required";
    }
    if (!values.img) {
      errors.img = "image is require ";
    }

    return errors;
  };

  return (
    <div className="App">
      {" "}
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            className="container"
            sx={{
              minWidth: 600,
              minHeight: 300,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                height="200px"
                width="400px"
                style={{ borderRadius: "1%" }}
                border-radius="50%"
                alt={`post`}
              />
            ) : (
              <img
                src={"blank_image.jpg"}
                height="200px"
                width="400px"
                style={{ borderRadius: "1%", border: "1px black dashed" }}
                border-radius="50%"
                alt={`post`}
              />
            )}
            <h4>Upload Image: </h4>
            <input
              // style={{ marginLeft: "60px" }}
              type="file"
              name="image"
              ref={imgRef}
              multiple
              accept="image/*"
              // onChange={(e) => setObj({ ...obj, img: e.target.files[0] })}
              onChange={(e) => handleChange(e)}
            />
            <p className="red">{formErrors?.img}</p>
            {/* <br /> */}
            {/* <br /> */}
            <label>Caption: </label>
            {/* <br /> */}
            <br />
            <textarea
              value={obj.caption}
              onChange={(e) => setObj({ ...obj, caption: e.target.value })}
              type="text"
              style={{ width: "250px", height: "70px" }}
            />
            <p className="red">{formErrors?.caption}</p>
            {/* <CardContent></CardContent> */}
            <CardActions>
              <Button size="small" onClick={(e) => AddData(e, obj)}>
                + Upload Post
              </Button>
              <Button size="small" onClick={()=>Cancel()}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </div>
  );
}

export default Posts;
// axios
//   .get("http://localhost:7000/posts/", {
//     // headers: {
//     //   authorization: JSON.parse(localStorage.getItem("token")),
//     // },
//   })
// .then((resp) => console.log(resp.data));
