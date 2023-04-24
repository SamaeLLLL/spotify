import React from 'react'

function HorizontalPlaylist(props: any) {
  return (
    <div className='horizontal-playlist'>
        <img className='icon' src={props.icon} alt="" />

        <p className='title'>
            {props.title}
        </p>
    </div>
  )
}

export default HorizontalPlaylist