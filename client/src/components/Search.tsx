import React, { MouseEventHandler, useEffect, useState } from 'react'
import '../static/search.scss'
import TopMenu from './TopMenu'
import { getAccessToken } from '../handlers/getAccessToken';
import '../static/searchPage.scss'
import { albumPlaceholder, HeartGreen, Liked, LikedIcon, More } from '../assets';
import { Play, like } from '../assets/playlistControls';
import { playInPlaylist } from '../assets/mediaControls/media';

function Search(props: any) {

  interface Song {
    track_id: string,
    title: string,
    release: string,
    artist_id: string,
    artist_name: string,
    duration: number,
    year: number
  }

  const { query, accessToken } = props;
  const [ searchResults, setSearchResults ] = useState<Song[]>([]);
  const [liked, setLiked] = useState<any>();

  useEffect(() => {
    const fetchLiked = async () => {
      const res = await fetch(("/api/likedsongs"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${await getAccessToken(accessToken)}`
        }
      })
      const data = await res.json();
      setLiked(data);
    }
    fetchLiked()
  },[])

  useEffect(() => {
    if(!query) return;
    const fetchSongs = async () => {
      try {
        const res = await fetch((`/api/search?query=${query}`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await getAccessToken(accessToken)}`
          }
        });
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search: " + error);
      }
    }
    fetchSongs()
  },[query])

  const handleLikeSong = async (id: string) => {
    try {
      const reqBody = {
        "song_id":id
      }
      const res = await fetch(("/api/likedsongs"), {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            'Authorization': `Bearer ${await getAccessToken(accessToken)}`,
            'Content-Type': 'application/json'
          }
      });
      const data = await res.json();
      setLiked((prevLiked: any) => [...prevLiked, data])
    } catch (error) {
      console.error("Search: " + error)
    }
  }


  const handleRemoveSong = async (id: string) => {
    try {
      const reqBody = {
        "song_id":id
      }
      const res = await fetch(("/api/likedsongs"), {
          method: "DELETE",
          body: JSON.stringify(reqBody),
          headers: {
            'Authorization': `Bearer ${await getAccessToken(accessToken)}`,
            'Content-Type': 'application/json'
          }
      });
      const data = await res.json();
      setLiked((prevLiked: any[]) => prevLiked.filter(song => song.song_id !== id))

    } catch (error) {
      console.error("Search: " + error)
    }
  }

  return (
    <div className='search search-comp'>
      <p className='songs-heading'>Songs</p>
      <ul className='song-list'>
        {
          searchResults.map && searchResults.map((song, index) => (
            <li className='song' key={index}> 
                  <div className="left">
                    <a target='_blank' href={`https://www.youtube.com/results?search_query=${song.title}+${song.artist_name}`}>
                      <div className="thing">
                        <img className='song-image' src={albumPlaceholder} alt="album" />
                        <img className='hover-play' src={playInPlaylist} alt="" />
                      </div>
                    </a>
                    <div className="song-info">
                      <p className='song-title'>{song.title}</p>
                      <p className='song-artist'>{song.artist_name}</p>
                    </div>
                  </div>
                  <div className="right">
                    <img className={`song-like ${liked.some((likedSong:any) => likedSong.song_id === song.track_id) ? "song-liked" : ""}`} src={ liked.some((likedSong:any) => likedSong.song_id === song.track_id) ? HeartGreen : like } alt="Like" title={ liked.some((likedSong:any) => likedSong.song_id === song.track_id) ? 'Remove from your library' : 'Add to your library'} onClick={() => liked.some((likedSong:any) => likedSong.song_id === song.track_id) ? handleRemoveSong(song.track_id) : handleLikeSong(song.track_id)} />
                    <p className='song-duration'>{Math.floor(song.duration / 60)}:{(Math.round((song.duration / 60 - Math.floor(song.duration / 60)) * 60)).toString().length === 1 ? "0" : ""}{Math.round((song.duration / 60 - Math.floor(song.duration / 60)) * 60)}</p>
                    <img className='song-more' src={More} alt="" title={`More options for ${song.title} by ${song.artist_name}`} />
                  </div>
                </li>
          ))
        }
        
      </ul>
    </div>
  )
}

export default Search