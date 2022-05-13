import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Button, Grid, TextField } from "@mui/material";
import { fontSize } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfiniteScroll from "react-infinite-scroller";
import Likes from "./Likes";
import Comment from "./Comment";
import { styled } from "@mui/material/styles";
import ForumIcon from "@mui/icons-material/Forum";
import TotalComments from "./TotalComments";
import image from '../Components/blank_image.jpg'

import "../App.css";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Cards(props) {
  // const {comment, setComment} = props
  const [myData, setmydata] = useState(props.myData);
  const [el, setEl] = useState(props.el);
  const id = JSON.parse(localStorage.getItem("id"));
  const [allUsers, setAllUsers] = useState(props.allUsers);
  const [myComments, setMyComments] = useState(props.el.comments.length);
   var http = new XMLHttpRequest();

  const [expanded, setExpanded] = React.useState(false);
  useEffect(() => {
    setMyComments(el.comments.length);
  }, [el.comments]);

  const handleExpandClick = (id) => {
    setExpanded((expanded) => (expanded ? false : id));
  };

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);


  // check image is exist or not
  // function checkImage(url) {
  //   var request = new XMLHttpRequest();
  //   request.open("GET", url, true);
  //   request.send();
  //   request.onload = function () {
  //     // status = request.status;
  //     if (request.status == 200) {
      
        
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  // }
  const [comment, setComment] = useState({
    comment: "",
    userId: JSON.parse(localStorage.getItem("id")),
  });
  return (
    <div>
      {
        <Card
          className="container"
          sx={{ minWidth: 600, minHeight: 300, border: "0px solid " }}
        >
          <CardHeader
            sx={{ backgroundColor: "aliceblue" }}
            avatar={
              <Avatar
                sx={{ height: "50px", width: "50px" }}
                aria-controls={"basic-menu"}
                aria-haspopup="true"
                src={
                  (myData.length &&
                    ("http://localhost:7000/" + myData[0].profilePicture ||
                      "")) ||
                  ""
                }
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <h2
                style={{
                  marginRight: "5vw",
                  fontSize: "30px",
                  fontFamily: "times",
                }}
              >
                {capitalize(myData[0].firstname) +
                  " " +
                  capitalize(myData[0].lastname)}
              </h2>
            }
          />
          <br />
          <img
            src={ "http://localhost:7000/" + el.img }
            // onError={image}
            // src={"blank_image.jpg"}
            height="300px"
            width="100%"
            alt={`post`}
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary" fontSize={25}>
              {el.caption}
            </Typography>
          </CardContent>

          <CardActions sx={{ backgroundColor: "" }} disableSpacing>
            <Likes postId={el._id} userId={id} initialLikes={el.likes} />

            <ExpandMore
              sx={{ color: "black" }}
              expand={expanded == el._id}
              onClick={() => handleExpandClick(el._id)}
              aria-expanded={expanded == el._id}
            >
              <ForumIcon />
            </ExpandMore>
            <TotalComments myComments={myComments} />
          </CardActions>

          <Collapse in={expanded == el._id} timeout="auto" unmountOnExit>
            <CardContent>
              <Comment
                el={el}
                comment={comment}
                setComment={setComment}
                expanded={expanded}
                allUsers={allUsers}
                setMyComments={setMyComments}
              />
            </CardContent>
          </Collapse>
        </Card>
      }
    </div>
  );
}

export default (Cards)



 