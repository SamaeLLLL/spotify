import React from 'react'
import { More, ArrowDown, Download, Liked, Play, Search } from '../../assets/playlistControls'

function Controls(props: any) {
  return (
    <div className='controls' >
      <div className="left">
        <img src={Play} alt="play" className='play' />
        {
          !props.liked ? 
            <img src={Liked} alt="like" className='like' /> : "" 
        }
            <img src={Download} alt="download" title='Download' className='download' />

        {
          !props.liked ? 
          <img src={More} alt="show more" className='more' /> : ""
        }
      </div>

      <div className="right">
        <img src={Search} alt="" className='search-img' title='Search in playlist' />
        <p>Custom order</p>
        <img src={ArrowDown} alt="" className='arrow-img' />
      </div>

    </div>
  )
}

export default Controls