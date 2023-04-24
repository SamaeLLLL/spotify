import React from 'react'
import LeftSidebarButtons from './LeftSidebarButtons';
import { useState, useEffect } from 'react';
import { reqPlaylists } from '../helpers/reqPlaylists';
import { getAccessToken } from '../handlers/getAccessToken';
import '../static/leftSidebar.scss'
import { Link } from 'react-router-dom';

function LeftSidebar(props:any) {
  const noDeco = {
    textDecoration: 'none',
    cursor: 'default'
  }


  interface Album {
    id: number,
    title: string,
    user_id: number,
    public_playlist: boolean,
    desc: string | null,
    author: string | null,
    playlist_img: string | null,
    likes: number,
    song_amount: number,
    length: number,
    author_img: string | null
  }

  const updatedPlaylists = props.playlists;

  const [savedAlbums, setSavedAlbums] = useState<Album[]>([]);

  async function fetchAlbums() {
    setSavedAlbums(await reqPlaylists(await getAccessToken(props.token)));
  }

  useEffect(() => {
    fetchAlbums();
  },[])

    function setHide(hide:Boolean) {
      props.hidePlaylist(hide);
    }

    useEffect(() => {
      setSavedAlbums(updatedPlaylists)
    },[updatedPlaylists])

  

  return (
    <div className='left-sidebar'>
        <LeftSidebarButtons hidePlaylist={setHide} />

        <div className='divider'></div>

        <div className='scrollable'>
          <ul className='album-list'>
          {
                  savedAlbums.map && savedAlbums.map((album, index) => (
                      <Link className='no-cursor' key={index} to={`/playlist/${album.title}`} style={noDeco}>
                        <li key={index}>{album.title}</li>
                      </Link>
                  ))
                }
          </ul>
        </div>
    </div>
  )
}

export default LeftSidebar