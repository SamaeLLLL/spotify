import React, { useEffect } from 'react'
import HorizontalPlaylist from './HorizontalPlaylist'
import { LikedIcon, Blend, Bangers, TPAB, Damn, GKMC } from '../assets'
import { DailyMixes } from './DailyMixes'
import { JumpBackList } from '../assets/JumpBackList'
import VPlaylistSection from './VPlaylistSection'
import '../static/home.scss'

function Home(props:any) {
  return (
    <>
        <div className='good-day-section'>
        <p className='title'>
          Good evening
        </p>

        <div className='horizontal-playlist-list'>
          <HorizontalPlaylist icon={LikedIcon} title="Liked Songs" />
          <HorizontalPlaylist icon={Bangers} title="Bangers 🔥" />
          <HorizontalPlaylist icon={TPAB} title="To Pimp a Butterly" />
          <HorizontalPlaylist icon={Damn} title="DAMN." />
          <HorizontalPlaylist icon={Blend} title="Duudly + Samuel" />
          <HorizontalPlaylist icon={GKMC} title="good kid, m.A.A.d city (Deluxe)" />
        </div>

      </div>

      <VPlaylistSection title={`Made for ${props.userInfo.username}`} playlists={DailyMixes}/>
      <VPlaylistSection title="Jump back in" playlists={JumpBackList}/>

      <div className='media-player-margin'>

      </div>
    </>
  )
}

export default Home