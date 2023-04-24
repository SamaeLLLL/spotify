import React from 'react'
import { Close, User_add } from '../assets'
import FriendProfile from './FriendProfile'
import { Friends } from '../assets/Friends'
import '../static/rightSidebar.scss'

function RightSidebar() {
  return (
    <div className='right-sidebar'>
        <div className='friend-activity-bar'>
          <h2 className='friend-activity-title'>Friend Activity</h2>
          <div>
              <img src={User_add} alt="Add friend" />
              <img src={Close} alt="Close friend activity" />
          </div>
        </div>
        <div className='friend-list'>
          {
            Friends.map((friend, index) => (
              <FriendProfile key={index} name={friend.name} pp={friend.pp} song={friend.song} platform={friend.platform} platformName={friend.platformName} lastListen={friend.lastListen} />
            ))
          }
        </div>
    </div>
  )
}

export default RightSidebar