import React from 'react'
import { Play, Pause, PrevTrack, NextTrack, ShuffleEnabled, RepeatDisabled } from '../assets/mediaControls/media'

function MediaControls() {
  return (
    <div className='media-controls'>
        <div className='controls'>
          <img title="Disable shuffle" className='shuffle' src={ShuffleEnabled} alt="" />
          <img title="Previous track" src={PrevTrack} alt="" />
          <img className='play' title='Play' src={Play} alt="" />
          <img title="Next track" src={NextTrack} alt="" />
          <img title="Enable repeat" src={RepeatDisabled} alt="" />
        </div>

        <div className='progress-bar'>
          <p className='time-remaining'>4:19</p>
          <div className='progress-bar-parent'>
            <div className='progress-bar-bar'>
            </div>
            <div className='progress-bar-bar-active'>
              <div className='progress-bar-dot'></div>
            </div>
          </div>
          <p className='time-total'>6:31</p>
        </div>
    </div>
  )
}

export default MediaControls