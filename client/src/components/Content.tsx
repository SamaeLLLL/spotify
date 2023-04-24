import Home from './Home'
import TopMenu from './TopMenu'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'
import { useEffect, useState } from 'react'
import Playlist from './playlist/Playlist'
import '../static/center.scss'
import { likedPage, SamuelPP } from '../assets/playlistControls/playlistCover'
import { useLocation } from 'react-router-dom'
import UserProfile from './UserProfile'
import Profile from './userDropdown/Profile'
import { getProfilePic } from '../handlers/getProfilePic'

function Content(props:any) {
  interface relBG {
    'background': string;
  }
  const { infoCallbackMain } = props;
  const { token } = props;
  const [relativeBG, setRelativeBG] = useState<relBG>();
  const [profilePic, setProfilePic] = useState<any>();
 
  const location = useLocation();
  const currentPath = location.pathname;

  const inPlaylist = currentPath.includes("/playlist");

  useEffect(() => {
    if(currentPath.includes('/userProfile')) {
      setRelativeBG({'background':'linear-gradient(180deg, #45562A 0%, #202020 49.48%)'});
    }
  },[currentPath])

  function infoCallback() {
    infoCallbackMain()
  }
  async function ppCallback() {
    setProfilePic(await getProfilePic())
  }
  


  return (
    <div style={relativeBG} className={`center ${inPlaylist ? "playlist-things" : ""}`}>
      <TopMenu pp={profilePic} logout={props.logout} token={props.token} userInfo={props.userInfo} />
      <Routes>
        <Route path='/' element={<Home userInfo={props.userInfo} />} />
        <Route path='/search' element={<Search />} />
        <Route path='/playlist/:id' element={<Playlist accessToken={token} />} />
        <Route path='/userProfile' element={<Profile infoCallback={infoCallback} ppCallback={ppCallback} token={props.token} userInfo={props.userInfo} />} />
        <Route path='/account' element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default Content