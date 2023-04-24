import React from 'react'

function VerticalPlaylist(props:any) {
  return (
    <div className='vertical-playlist'>
        <img className='img' src={props.img} alt="playlist" />

        <p className='title'>
            {props.title}
        </p>

        <p className='desc'>
            {props.desc}
        </p>
    </div>
  )
}

export default VerticalPlaylist