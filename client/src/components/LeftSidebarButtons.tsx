import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Home, Library, More, Search, Add, Liked, Episodes } from '../assets'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function LeftSidebarButtons(props:any) {
    const stylesMore = { 
        marginTop: 0
    };

    function setHide(hide:Boolean) {
        props.hidePlaylist(hide);
    }


  return (
    <div>
        <div>
            <PrimaryButton icon={More} styles={stylesMore} />
            <PrimaryButton 
            icon={Home}
            title="Home"
            link="/"
            location={useLocation().pathname} />

            <PrimaryButton
            icon={Search}
            title="Search"
            link="/search"
            location={useLocation().pathname} />

            <PrimaryButton
            icon={Library}
            title="Your Library"
            link="/library"
            location={useLocation().pathname} />
        </div>

        <div className='left-buttons-2'>
            <PrimaryButton
            icon={Add}
            title="Create Playlist"
            hide={setHide}
            location={useLocation().pathname} />

            <PrimaryButton 
            icon={Liked}
            title="Liked Songs"
            link="/playlist/likedsongs"
            location={useLocation().pathname} />

            <PrimaryButton 
            icon={Episodes} 
            title="Your Episodes"
            link="/episodes"
            location={useLocation().pathname} />
        </div>
    </div>
  )
}

export default LeftSidebarButtons