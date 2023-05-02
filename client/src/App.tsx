import LeftSidebar from './components/LeftSidebar'
import DownBar from './components/DownBar'
import RightSidebar from './components/RightSidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import Content from './components/Content'
import { getAccessToken } from './handlers/getAccessToken'
import { getUserInfo } from './handlers/getUserInfo'
import CreatePlaylist from './components/CreatePlaylist'
import { validate } from './helpers/validateToken'
import { Routes, Route, redirect } from 'react-router-dom'
import Signup from './components/login/Signup'
import { useNavigate } from 'react-router-dom'

function App() {
  const [auth, setAuth ] = useState(false)
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [userInfo, setUserInfo] = useState({});
  const [playlists, setPlaylists] = useState([{}]);
  const navigate = useNavigate();

  const [hidePlaylist, setHidePlaylist] = useState<Boolean>();

  useEffect(() => {
    async function fetchUserInfo() {
      if (accessToken && validate(accessToken)) {
        setAuth(true);
        setUserInfo(await getUserInfo(accessToken));
      } else if (accessToken) {
        setAccessToken(await getAccessToken(accessToken));
      } else {
        setAuth(false);
      }
    }
    fetchUserInfo()
  }, [accessToken])
  
  
  async function refreshUserInfo() {
    if(accessToken) {
      setUserInfo(await getUserInfo(await getAccessToken(accessToken)));
    }
  }

  function getLocalAccessToken(token:string) {
    setAccessToken(token)
  }

  function logout() {
    setAccessToken(undefined)
    setRefreshToken(undefined)
    fetch(('/users/logout'), {
      method: 'GET',
      credentials: 'include'
    })
    .then(() => navigate('/'))
  }

  useEffect(() => {
    fetch(('/users/refresh'), {
      method: 'GET',
      credentials: 'include'
    })
    .then (response => response.json())
    .then (data => setAccessToken(data.accessToken))
    .then (() => setAuth(true))
    .catch (SyntaxError)
    .catch (err => console.log(err))
  },[])

  function setHide(hide:Boolean) {
    setHidePlaylist(hide);
  }

  function updatePlaylists(p:any) {
    setPlaylists(p)
  }

  return (
    <>
    {
      auth ? 
        <div className="App">
          <CreatePlaylist accessToken={accessToken} hide={hidePlaylist} onHide={() => setHidePlaylist(false)} updatePlaylists={updatePlaylists} />
          <div className='app-body'>
            <LeftSidebar token={accessToken} hidePlaylist={setHide} playlists={playlists} />
            <Content infoCallbackMain={refreshUserInfo} logout={logout} token={accessToken} userInfo={userInfo} />
            <RightSidebar />
          </div>
          <DownBar />
        </div>
       :
      (
        <Routes>
          <Route path='/' element={<LoginScreen onToken={getLocalAccessToken} />} />
          <Route path='/signup' element={<Signup onToken={getLocalAccessToken} />} />
        </Routes>
        
      )
    }
  </>
  )
}

export default App
