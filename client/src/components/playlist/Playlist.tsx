import React, { useEffect, useState } from 'react'
import '../../static/playlist.scss'
import PlaylistInfo from './PlaylistInfo'
import Controls from './Controls'
import PlaylistContent from './PlaylistContent'
import { reqPlaylists } from '../../helpers/reqPlaylists'
import { getAccessToken } from '../../handlers/getAccessToken'
import { SamuelPP, likedPage } from '../../assets/playlistControls/playlistCover'
import { useParams } from 'react-router-dom'

function Playlist(props: any) {
  const { playlistContent } = props
  const title = useParams().id;
  
  const likedSongsInfo = {
    img: likedPage,
    pub: false,
    title: "Liked Songs",
    desc: "",
    author: "Samuel",
    authorImg: SamuelPP,
    likes: null,
    songAmount: 2039,
    length: null
  }

  interface info {
    img: string,
    pub: boolean,
    title: string,
    desc: string,
    author: string,
    authorImg: string,
    likes: number | null,
    songAmount: number,
    length: number | null
  }
  
  const likedSongs = likedSongsInfo.title == "Liked Songs";

  const [ playlistInfo, setPlaylistInfo ] = useState<info>(likedSongsInfo)

  useEffect(() => {
    async function getPlaylistInfo() {
      console.log(title)
      if (title === 'likedsongs') return;
      const token = await getAccessToken(props.accessToken)
      const allPlaylists = (await reqPlaylists(token))
      const playlist = await allPlaylists.find((playlist: any) => playlist.title === title);
      setPlaylistInfo(playlist)
      console.log("yo")
    }
    getPlaylistInfo()
  },[title])

  useEffect(() => {
    console.log(playlistInfo)

  },[playlistInfo])

  return (
    <div className='playlist'>
      <PlaylistInfo info={title === 'likedsongs' ? likedSongsInfo : playlistInfo} />

      <div className="playlist-main">
        <Controls liked={likedSongs} />
        <PlaylistContent />

      </div>


    </div>
  )
}

export default Playlist