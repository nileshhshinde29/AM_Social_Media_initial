import { IconButton} from "@mui/material";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo } from "react";
import Heart from "react-animated-heart";

function Likes(props) {

    const [likes, setLikes] = useState(props.initialLikes);

   useEffect(()=>{
     fetchInitialLikes()
   },[])
       
   
  const fetchInitialLikes = () => {
     axios
       .get(`http://localhost:7000/posts/${props.postId}`, {
         headers: {
           authorization: JSON.parse(localStorage.getItem("token")),
         },
       })
       .then((response) => {
         setLikes(response.data.likes);
       });
  }
  
  
  
    async function Like(postId, userId) {
      // console.log(postId, userId)
      
      axios
        .put(
          `http://localhost:7000/posts/${postId}/like`,
          { userId },
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
            // setLikes((prv) =>
            //   prv.includes(userId + "")
            //     ? prv.filter((user) => user !== userId)
            //     : [...prv, userId]
            // ); 

            axios
              .get(`http://localhost:7000/posts/${postId}`, {
                headers: {
                  authorization: JSON.parse(localStorage.getItem("token")),
                },
              })
                .then((response) => {
                setLikes(response.data.likes)
                  
              
              })
              .catch((error) => console.log(error));
          
        })

        .catch((error) => console.log(error));
    }
const [isClick, setClick] = useState(false);
    function trueFalse(){
        if(likes.includes(props.userId))
        {
          return (
            <>
              {likes.length}{" "}
              <FavoriteIcon
                sx={{height:40, width:40}}
                color="error"
                onClick={() => Like(props.postId, props.userId)}
              />
              {/* <Heart isClick={likes.includes(props.userId)} onClick={() => Like(props.postId, props.userId)} />{" "} */}
            </>
          );
        }
        else
        {
          return (
            <>
              {likes.length}{" "}
              <FavoriteBorderIcon
                sx={{ height: 40, width: 40 }}
                onClick={() => Like(props.postId, props.userId)}
              />
              {/* <Heart isClick={likes.includes(props.userId)} onClick={() => Like(props.postId, props.userId) } /> */}
            </>
          );
        }

    }


  return (
    <div style={{margin:"0 5px 5px 15px"}}>
      <IconButton aria-label="add to favorites">
        {/* {likes.length}{" "} */}
        {/* {likes.includes(props.userId) ? (
          <FavoriteIcon
            color="error"
            onClick={() => Like(props.postId, props.userId)}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => Like(props.postId, props.userId)}
          />
        )} */}
           {trueFalse()}
        {" Likes"}
        {/* {likes.length}{" "}
        <FavoriteBorderIcon onClick={() => Like(props.postId, props.userId)} /> */}
      </IconButton>
    </div>
  );
}

export default memo(Likes)