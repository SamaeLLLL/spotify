import React, { useEffect, useState } from 'react'
import '../static/search.scss'
import TopMenu from './TopMenu'
import { getAccessToken } from '../handlers/getAccessToken';
import '../static/searchPage.scss'
import { albumPlaceholder, HeartGreen, More } from '../assets';
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

  useEffect(() => {
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

  return (
    <div className='search search-comp'>
      <p className='songs-heading'>Songs</p>
      <ul className='song-list'>
        {
          searchResults.map && searchResults.map((song, index) => (
            <li className='song' key={song.track_id}> 
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
                    <img className='song-like' src={like} alt="Like" title='Add to your library' />
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