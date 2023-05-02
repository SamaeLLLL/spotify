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
  const { playlistContent, accessToken, userInfo } = props
  const title = useParams().id;
  
  const defaultValues = {
    img: likedPage,
    pub: false,
    title: "Loading",
    desc: "",
    author: "..",
    author_img: SamuelPP,
    likes: null,
    songAmount: 0,
    length: null
  }

  const likedSongsInfo = {
    img: likedPage,
    pub: false,
    title: "Liked Songs",
    desc: "",
    author: userInfo.username,
    author_img: userInfo.user_img,
    likes: null,
    songAmount: 0,
    length: null
  }

  interface info {
    img: string,
    pub: boolean,
    title: string,
    desc: string,
    author: string,
    author_img: string,
    likes: number | null,
    songAmount: number,
    length: number | null
  }
  
  const likedSongs = title == "likedsongs";

  const [ playlistInfo, setPlaylistInfo ] = useState<info>(defaultValues)

  useEffect(() => {
    async function getPlaylistInfo() {
      if (likedSongs) {setPlaylistInfo(likedSongsInfo); return;}
      const token = await getAccessToken(props.accessToken)
      const allPlaylists = (await reqPlaylists(token))
      const playlist = await allPlaylists.find((playlist: any) => playlist.title === title);
      setPlaylistInfo(playlist)
    }
    getPlaylistInfo()
  },[title, userInfo])

  return (
    <div className='playlist'>
      <PlaylistInfo info={playlistInfo} accessToken={accessToken} />

      <div className="playlist-main">
        <Controls liked={likedSongs} />
        <PlaylistContent />

      </div>


    </div>
  )
}

export default Playlist