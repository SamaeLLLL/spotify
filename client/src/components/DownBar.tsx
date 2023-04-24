import React from 'react'
import CurrentlyPlaying from './CurrentlyPlaying'
import MediaControls from './MediaControls'
import VolumeControls from './VolumeControls'
import '../static/downBar.scss'

function DownBar() {
  return (
    <div className='media-player'>
        <CurrentlyPlaying />
        <MediaControls />
        <VolumeControls />
    </div>
  )
}

export default DownBar