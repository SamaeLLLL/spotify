import React from 'react'
import DropdownArrow from '../assets/DropdownArrow.svg'
import '../static/userDropdown.scss'
import { useState, useEffect } from 'react'
import { getUserInfo } from '../handlers/getUserInfo'
import { getAccessToken } from '../handlers/getAccessToken'
import { Link } from 'react-router-dom'
import { getProfilePic } from '../handlers/getProfilePic'

function UserDropdown(props:any) {

  const { userInfo, profPic } = props;

  const [pp, setPP] = useState<any>();
  const [dropdown, setDropdown] = useState<boolean>(false);

  function handleDropdown() {
    setDropdown(prev => !prev)
  }

  useEffect(() => {
    function handleDocumentClick(event:any) {
      if (!event.target.closest('.user-dropdown')) {
        setDropdown(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => {
    document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if(profPic) {
      setPP(profPic)
      return;
    }
    async function fetchPP() {
      setPP(await getProfilePic())
    }
    fetchPP()
  },[profPic])

  function handleLogout() {
    props.logout()
  }
  async function handleAccount() {
    const newToken = await getAccessToken(props.token)
    const userInfo = await getUserInfo(newToken);
    console.log(userInfo);
  }

  return (
    <div className='dropdown-container'>
    <div className='user-dropdown' onClick={handleDropdown}>
        <img className='user-pp' src={pp} alt="" />
        <p className='name' >{userInfo.username}</p>
        <img className={`dropdown-arrow ${dropdown ? "rotate" : ''}`} src={DropdownArrow} alt="" />
    </div>

    <div className="container">
      <div className={`dropdown-interface ${dropdown ? 'show' : 'hide'}`}>
        <ul>
          <Link style={{'textDecoration':"none",'color':"white"}} to="/account" >
            <li className='account' onClick={handleAccount} >Account</li>
          </Link>
          <Link style={{'textDecoration':"none",'color':"white"}} to="/userProfile">
            <li>Profile</li>
          </Link>
          <li>Private session</li>
          <li>Settings</li>
          <li className='line'></li>
          <li className='logout' onClick={handleLogout}>Log out</li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default UserDropdown