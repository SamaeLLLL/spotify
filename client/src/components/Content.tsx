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
import { getAverageBgColor } from '../helpers/getAverageBgColor'

function Content(props:any) {
  interface relBG {
    'background': string;
  }
  const { infoCallbackMain } = props;
  const { token } = props;
  const [relativeBG, setRelativeBG] = useState<relBG>();
  const [profilePic, setProfilePic] = useState<any>();
  const [changeBG, setChangeBG] = useState<Boolean>(false);
  const [searchQuery, setSearchQuery] = useState(String);
 
  const location = useLocation();
  const currentPath = location.pathname;

  const inPlaylist = currentPath.includes("/playlist");

  useEffect(() => {
    async function fetchProf() {
      setProfilePic(await getProfilePic());
    }
    fetchProf();
  },[])

  useEffect(() => {
    if(currentPath.includes('/userProfile')) {
      setChangeBG(true);
      if (profilePic) {
        let img = new Image();
        img.src = profilePic;
        img.onload = async () => {
          setRelativeBG({'background':`linear-gradient(180deg, ${await getAverageBgColor(img)} 0%, #202020 50%`});
        };
      }
    } else {
      setChangeBG(false);
    }
  },[currentPath, profilePic])

  function infoCallback() {
    infoCallbackMain()
  }
  async function ppCallback() {
    setTimeout(async () => {
      setProfilePic(await getProfilePic());
    }, 100)
    console.log("test")
    let img = new Image();
    img.onload = async () => {
      setRelativeBG({'background':`linear-gradient(180deg, ${await getAverageBgColor(img)} 0%, #202020 50%`});
    };
    img.src = profilePic;
  }
  
  function handleSearchValue(value: string) {
    setSearchQuery(value);
  }


  return (
    <div style={changeBG ? relativeBG : undefined} className={`center ${inPlaylist ? "playlist-things" : ""}`}>
      <TopMenu pp={profilePic} logout={props.logout} token={props.token} userInfo={props.userInfo} search={handleSearchValue} />
      <Routes>
        <Route path='/' element={<Home userInfo={props.userInfo} />} />
        <Route path='/search' element={<Search query={searchQuery} accessToken={token} />} />
        <Route path='/playlist/:id' element={<Playlist accessToken={token} userInfo={props.userInfo} />} />
        <Route path='/userProfile' element={<Profile infoCallback={infoCallback} ppCallback={ppCallback} token={props.token} userInfo={props.userInfo} />} />
        <Route path='/account' element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default Content