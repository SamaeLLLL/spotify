import React from 'react'
import { Blend } from '../../assets'

function PlaylistInfo(props: any) {
  const { info } = props


  return (
    <div className='playlist-info'>
        <img src={info.img} alt="" className='playlist-image' />

        <div className="detail">
            <p className='playlist-status'>{info.pub ? "Public Playlist" : "Playlist"}</p>
            <p className='playlist-name'>{info.title}</p>
            <p className="playlist-description">{info.desc}</p>

            <div className="stats">
                <img src={info.authorImg} alt="" className='author-image' />
                <p className="author">{info.author}</p>
                <p className='dot'>•</p>
                <p className="likes">{info.likes} {info.likes ? "•" : ""}</p>
                <p className="song-amount">{info.songAmount} songs{info.length ? "," : ""}</p>
                <p className="playlist-length">{info.length}</p>
            </div>
        </div>

    </div>
  )
}

export default PlaylistInfo