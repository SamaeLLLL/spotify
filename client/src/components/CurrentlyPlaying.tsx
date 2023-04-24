import React from 'react'
import { HotelCalifornia, HeartGreen } from '../assets'

function CurrentlyPlaying() {
  return (
    <div className='currently-playing'>
        <img className='img' src={HotelCalifornia} alt="Currently Playing" />

        <div className='currently-playing-info'>
            <p className='title'>Hotel California - 2013 Remaster</p>
            <p className='desc'>Eagles</p>
        </div>

        <img className='like-btn' src={HeartGreen} alt="Liked" title="Remove from your library" />
    </div>
  )
}

export default CurrentlyPlaying