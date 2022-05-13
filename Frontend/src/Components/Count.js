import React, { useState } from 'react'

function Count() {
 
    const [count , setCount]= useState([])

   const  featchCount = () =>{
        axios.get(`http://localhost:7000/posts/${postData._id}`, {
            headers: {
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((response) => {
            setError("");
            setPostData(response.data);
            setComment({ ...comment, comment: "" });
          })
          .catch((error) => console.log(error));
    }
      
  return (
    <div>Count</div>
  )
}

export default Count