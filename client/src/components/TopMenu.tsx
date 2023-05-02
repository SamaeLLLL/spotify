import React, { useEffect, useState } from 'react'
import { ArrowDeselect, ArrowSelect } from '../assets'
import UserDropdown from './UserDropdown'
import '../static/topMenu.scss'
import { SearchSearch } from '../assets'
import { useLocation, useSearchParams } from "react-router-dom";
import { useRef } from 'react'
import { debounce } from 'lodash';

function TopMenu(props:any) {
  const { userInfo, pp, search } = props;
  const location = useLocation();
  const currentPath = location.pathname;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(String);

  useEffect(() => {
    if(currentPath === '/search' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  }, [currentPath])


  const handleSearch = debounce((event: any) => {
    if(event.target.value.length > 0) {
      setQuery(event.target.value)}
    }, 300)
  
  useEffect(() => {
    search(query)
  },[query])

  return (
    <div className='top-menu'>
          <div className='arrows'>
            <img className='arrow-left' src={ArrowSelect} alt="" />
            <img className='arrow-right' src={ArrowDeselect} alt="" />
            <div className={`search ${currentPath === '/search' ? "show" : "hide"}`}>
              <img src={SearchSearch} draggable="false" alt="" />
              <input autoComplete='off' ref={inputRef} autoFocus type="text" name="search" placeholder='What do you want to listen to?' id="" onChange={handleSearch} />
            </div>
          </div>

          <div>
            <UserDropdown profPic={pp} logout={props.logout} token={props.token} userInfo={userInfo} />
          </div>
    </div>
  )
}

export default TopMenu