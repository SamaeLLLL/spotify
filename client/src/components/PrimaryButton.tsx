import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import '../static/primaryButton.scss'

function PrimaryButton(props: any) {
  const [handling, setHandling] = useState(Boolean);
  let noDeco = {
    textDecoration: 'none'
  }

  function handleCreatePlaylist() {
    setHandling(true)
    props.hide(true)
    setHandling(false)
  }
 

  function handleThreeDots() {

  }

  return (
    <>
    {
    props.link && (
    <Link to={props.link} style={noDeco}>
      <div className={`primary-button`} style={props.styles}>
          <img src={props.icon} className={`${props.location == props.link ? props.link != '/likedsongs' ? "selected-img" : "liked-img" : "" }`} alt="icon" />

          <p className={`${props.location == props.link ? "selected" : "" }`}>  {props.title}</p>
      </div>
    </Link>
    )}
    {!props.link && (
      <div className={`primary-button`} style={props.styles} onClick={props.title === "Create Playlist" ? handleCreatePlaylist : handleThreeDots}>
          <img src={props.icon} className={`${handling ? "selected-img" : ""}`}  alt="icon" />
          <p className={`${handling ? "selected" : "" }`}>  {props.title}</p>
      </div>
    )}
    </>
  )
}

export default PrimaryButton