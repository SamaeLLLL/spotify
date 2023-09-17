import React, { SetStateAction, useEffect, useState } from 'react'
import { Clock } from '../../assets/playlistControls'
import Song from './Song'
import { Heroes, Spit } from '../../assets/playlistControls/playlistCover'
import { getAccessToken } from '../../handlers/getAccessToken'
import { useParams } from 'react-router-dom'
import { albumPlaceholder } from '../../assets'

function PlaylistContent(props: any) {
  const { accessToken, amountCB } = props;
  const title = useParams().id;
  const [songs, setSongs] = useState<Song[]>()
  const [songAmount, setSongAmount] = useState<any>(0);

  interface Song {
    song_id: string,
    title: string,
    release: string,
    artist_name: string,
    year: number,
    duration: number,
    date_added: string
  }

  useEffect(() => {
    if (title !== "likedsongs") {
      const fetchPlaylist = async () => {
        const res = await fetch((`/api/albums/${title}`), {
          method: "GET",
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${await getAccessToken(accessToken)}`
          }
        });
        const data = await res.json();
        setSongs(data);
      }
      fetchPlaylist();
      return;
    }
    const fetchLiked = async () => {
      const res = await fetch(('/api/likedsongs'), {
        method: "GET",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${await getAccessToken(accessToken)}`
        }
      });
      const data = await res.json();
      setSongs(data);
    }
    fetchLiked()
  },[title])

  useEffect(() => {
    setSongAmount(songs?.length)
  },[songs])

  useEffect(() => {
    amountCB(songAmount)
  },[songAmount])

  function removeSong(id: string) {
    const fetchDB = async () => {
      try {
        const reqBody = {
          "song_id":id
        }
        console.log(reqBody);
        const res = await fetch((title === 'likedsongs' ? "/api/likedsongs" : `/api/albums/${title}`), {
            method: "DELETE",
            body: JSON.stringify(reqBody),
            headers: {
              'Authorization': `Bearer ${await getAccessToken(accessToken)}`,
              'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        setSongs(prevSongs => prevSongs?.filter(song => song.song_id !== id))
  
      } catch (error) {
        console.error("Search: " + error)
      }
    }
    fetchDB()
  }

  return (
    <div className='playlist-content'>
        <table>
          <thead>
            <tr className='header'>
              <th className='id'>#</th>
              <th className='title-header'><span className='hover'>Title</span></th>
              <th className='album'><span className='hover'>Album</span></th>
              <th className='date'><span className='hover'>Date added</span></th>
              <th className="liked"></th>
              <th className='length'><img src={Clock} alt="" className='clock' /></th>
            </tr>
          </thead>
          <tbody>
            <tr className='fake-margin'></tr>
          {
            songs && songs.map((song, index) => (
              <Song key={index} numId={index + 1} id={song.song_id} title={song.title} desc={song.artist_name} album={song.release} date={song.date_added} length={`${Math.floor(song.duration / 60)}:${(Math.round((song.duration / 60 - Math.floor(song.duration / 60)) * 60)).toString().length === 1 ? "0" : ""}${Math.round((song.duration / 60 - Math.floor(song.duration / 60)) * 60)}`} liked={true} img={albumPlaceholder} removeSong={removeSong} />
            ))
          }

          <tr className='player-margin'></tr>
          </tbody>
        </table>
        
    </div>
  )
}

export default PlaylistContent