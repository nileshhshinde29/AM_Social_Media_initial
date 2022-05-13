import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import CardHeader from "@mui/material/CardHeader";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';


import {
  Collapse,
  CardContent,
  TextField,
  Typography,
  Avatar,
  Skeleton,
} from "@mui/material";


function Comment(props) {

  const [postData, setPostData] = useState(props.el);
  const [loading, setLoding] = useState(true)
  const [error, setError] = useState("");
  // const []
  const { comment, setComment } = props

  // const [comment, setComment] = useState({
  //   comment: "",
  //   userId: JSON.parse(localStorage.getItem("id")),
  // });





  const getComments = () => {
    setLoding(true)
    axios
      .get(`http://localhost:7000/posts/${postData._id}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
         setError("");
        props.setMyComments(response.data.comments.length);
        setPostData(response.data);
         setTimeout(function () {
           setLoding(false);
         }, 500);
        //  setComment({ ...comment, comment: "" })
      });
  }

  useEffect(() => {
    getComments()
  },[])





  

  function CommentFun(myId) {
    if (comment.comment.length > 0) {
      setLoding(true)
      axios
        .put(`http://localhost:7000/posts/${myId}/comment`, comment, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          // props.setMyComments(postData.comments.length+1);
          // setPostData(prev => ({...prev, comments: [...prev.comments, comment]}));
          // setComment({ ...comment, comment: "" });
          axios
            .get(`http://localhost:7000/posts/${postData._id}`, {
              headers: {
                authorization: JSON.parse(localStorage.getItem("token")),
              },
            })
            .then((response) => {
              setError("");
              props.setMyComments(response.data.comments.length)
              setPostData(response.data);
               setTimeout(function () {
                
                 setLoding(false);
               }, 500);
              setComment({ ...comment, comment: "" });
            })
            .catch((error) => console.log(error));
        })
      .catch ((error) => console.log(error));
    }
    else {
      setError("comment not provided")

    }
  }
  return (
    <div>


      <hr style={{ border: "1px solid orange" }} />
      <br />
      <Typography paragraph>
        <TextField
          id="outlined-basic"
          sx={{ width: "23vw" }}

          value={comment.comment}
          onChange={(e) => setComment({ ...comment, comment: e.target.value })}
          label="Add Comment"
          variant="standard"
        />
        <SendIcon
          sx={{
            height: "30px",
            color: "black",
            width: "30px",
            marginLeft: "20px",
            marginTop: "20px"
          }}
          type='submit'
          onClick={() => CommentFun(postData._id)}
        />{" "}
        <p>{error}</p>
      </Typography>
      <ul style={{ listStyleType: "none"}}>
        {postData &&
          postData?.comments.map((itms, i) => {
            const tdata = props.allUsers.filter(
              (items) => items._id == itms.userId && items
            );

            return (
              <>
                <li>
                  {" "}
                  {!loading ? (
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-controls={"basic-menu"}
                          aria-haspopup="true"
                          alt=""
                          src={
                            "http://localhost:7000/" +
                              tdata[0]?.profilePicture || ""
                          }
                        />
                      }
                      title={
                        <div
                          style={{
                            float: "left",
                            // marginRight: "11vw",
                            fontSize: "20px",
                            fontFamily: "times",
                          }}
                        >
                          {itms.user + ": "+" "}
                          <span style={{color:"Gray"}}>{itms?.comment}</span>
                        </div>
                      }
                      // title={itms.user}
                      // subheader={itms?.comment}
                    />
                  ) : (
                    <CardHeader
                      avatar={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={50}
                          height={50}
                        />
                      }
                      // action={
                      //   loading ? null : (
                      //     <IconButton aria-label="settings">
                      //       <MoreVertIcon />
                      //     </IconButton>
                      //   )
                      // }
                      title={
                        <Skeleton
                          animation="wave"
                          height={20}
                          width="80%"
                          style={{ marginBottom: 6 }}
                        />
                      }
                      subheader={
                        <Skeleton animation="wave" height={20} width="40%" />
                      }
                    />
                  )}
                </li>
              </>
            );
          })}
      </ul>
      {/* </CardContent>
      </Collapse> */}
    </div>
  );
}

export default (Comment);
