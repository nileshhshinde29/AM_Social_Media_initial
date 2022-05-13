import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Posts from "./Posts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import { Button, Grid, TextField, Box } from "@mui/material";
import Cards from "./Cards";

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

function Feed2(props) {
  const [data, setData] = useState([]);
  let id = JSON.parse(localStorage.getItem("id"));
  const [loading, setLoding] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPost]=useState(0)
  

  const myFunctionOfFetching = (page) => {
    
    setLoding(true)
    axios
      .get(`http://localhost:7000/posts?limit=2&page=${page}`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((res) => {
        setTimeout(function () {
          setData([...data, ...res.data.posts]);
          setLoding(false);
        }, 1000);
      });
  };

  useEffect(() => {
    myFunctionOfFetching(page);
    //  getAllPost();
  }, [page]);

  const scrollEnd = () => {
    setPage(page + 1);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      scrollEnd();
    }
  };

  const getAllPost = () => {
     axios
       .get(`http://localhost:7000/posts` ,{
         headers: { authorization: JSON.parse(localStorage.getItem("token")) },
       })
       .then((res) => {
        setAllPost(res.data.posts.length)
       });
  }
 



  function fetch() {
    setPage(1);
    setData([]);
    axios
      .get(`http://localhost:7000/posts?limit=1&page=${1}`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        setData([...response.data.posts, ...data]);
      })
      .catch((error) => console.log(error));
  }

  const [expanded, setExpanded] = React.useState(false);

  async function fetching(myId) {
    axios
      .get(`http://localhost:7000/user/all`, {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="App2 bg">
      <Posts
        fetch={fetch}
        setPage={setPage}
        data={data}
        handleClick={props.handleClick}
        setData={setData}
      />
      <br />
      <br />
      {data?.map((el, i) => {
        const myData = allUsers.filter((itms) => itms._id == el.userId && itms);
        return (
          <Box
            key={el._id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Cards el={el} myData={myData} allUsers={allUsers} />
          </Box>
        );
      })}

      {(loading ) &&  (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Card sx={{ minWidth: 600, m: 2, minHeight: 600 }}>
              {/* <Skeleton animation="wave" variant="text" width={600} height={30}   sx={{margin:1}}/> */}
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={50}
                    height={50}
                  />
                }
                action={
                  loading ? null : (
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  )
                }
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
              {
                <Skeleton
                  sx={{ height: 400 , margin: 1 }}
                  animation="wave"
                  variant="rectangular"
                />
              }

              <CardContent>
                {
                  <React.Fragment>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                    />

                    <Skeleton animation="wave" height={10}  />
                  </React.Fragment>
                }
              </CardContent>
              {/* <Grid container justifyContent={"space-between"} xs={12}>
                <Grid item xs={2}>
                  <Skeleton animation="wave" height={50} width="100%" />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton animation="wave" height={50} width="100%" />
                </Grid>
              </Grid> */}
            </Card>
          </div>
        </Box>
      )}
    </div>
  );
}

export default Feed2;
