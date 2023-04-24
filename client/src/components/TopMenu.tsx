import React, { useEffect } from 'react'
import { ArrowDeselect, ArrowSelect } from '../assets'
import UserDropdown from './UserDropdown'
import '../static/topMenu.scss'
import { SearchSearch } from '../assets'
import { useLocation } from "react-router-dom";
import { useRef } from 'react'

function TopMenu(props:any) {
  const { userInfo, pp } = props;
  const location = useLocation();
  const currentPath = location.pathname;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(currentPath === '/search' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentPath])


  return (
    <div className='top-menu'>
          <div className='arrows'>
            <img className='arrow-left' src={ArrowSelect} alt="" />
            <img className='arrow-right' src={ArrowDeselect} alt="" />
            <div className={`search ${currentPath === '/search' ? "show" : "hide"}`}>
              <img src={SearchSearch} draggable="false" alt="" />
              <input autoComplete='off' ref={inputRef} autoFocus type="text" name="search" placeholder='What do you want to listen to?' id="" />
            </div>
          </div>

          <div>
            <UserDropdown profPic={pp} logout={props.logout} token={props.token} userInfo={userInfo} />
          </div>
    </div>
  )
}

export default TopMenu