import React from 'react'
import VerticalPlaylist from './VerticalPlaylist'

function VPlaylistSection(props:any) {
  return (
    <div className='v-playlist-section'>
        <div className='title-row'>
          <p className='title'>
            {props.title}
          </p>

          <p className='show-all'>
            Show all
          </p>
        </div>

        <div className='vertical-playlist-list'>
        {
            props.playlists.map((playlist:any, index:number) => (
                <VerticalPlaylist key={index} title={playlist.title} desc={playlist.desc} img={playlist.img} />
            ))
        }
        </div>
    </div>
  )
}

export default VPlaylistSection