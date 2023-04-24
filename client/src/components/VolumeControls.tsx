import React from 'react'
import { Mic, Queue, Device, VolumeLow, Fullscreen } from '../assets/mediaControls/media'

function VolumeControls() {
  return (
    <div className='volume-controls'>
      <img className='lyrics' src={Mic} alt="lyrics" title='Lyrics' />
      <img className="queue" src={Queue} alt="Queue" title='Queue' />
      <img src={Device} alt="Device" title='Connect to a device' />
      <img className='volume' src={VolumeLow} alt="Mute" title='Mute' />
      <div className='progress-bar-parent'>
            <div className='progress-bar-bar'>
            </div>
            <div className='progress-bar-bar-active'>
              <div className='progress-bar-dot'></div>
            </div>
          </div>
      <img src={Fullscreen} alt="Fullscreen" title='Full screen' />
    </div>
  )
}

export default VolumeControls