import React, { useEffect, useState } from 'react'

function TotalComments(props) {
const [comments, setComments]= useState(props.myComments)
useEffect(()=>{
    setComments(props.myComments)
},[props])

  return (
    <h5>{comments}</h5>
  )
}

export default TotalComments
