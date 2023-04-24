import React from 'react'
import { Playlist, Album, Now } from '../assets'


function FriendProfile(props:any) {
    let styles = {
        marginTop: '2px'
    }

    let stylesNoDeco = {
        textDecoration: "none",
        cursor: "default",
        color: "#b6b6b6"
    }

    let imgFucker = {
        width: '15px',
        height: '15px',
        borderRadius: 0
    }

  return (
    <div className='friend-profile'>
        <div className='pp'>
            <img src={props.pp} alt="Profile Picture" />
            {
                props.lastListen == "now" ? 
                <div className='online-status'></div> :
                null
            }
        </div>

        <div className='friend-listening-info'>
            <div className='friend-name'>
                <h2>{props.name}</h2>
                {
                    props.lastListen == "now" ? <img style={imgFucker} src={Now} alt="" /> :
                    <h4 style={stylesNoDeco}>{props.lastListen}</h4>
                }
            </div>
            <h4 style={styles}>{props.song}</h4>
            <div style={styles}className='friend-album-info text-margin'>
                <img src={props.platform == "playlist" ? Playlist : Album} alt="Playing from" />
                <h3>{props.platformName}</h3>
            </div>
        </div>

    </div>
  )
}

export default FriendProfile