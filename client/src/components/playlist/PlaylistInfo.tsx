import React, { useEffect, useState } from 'react'
import { Blend } from '../../assets'
import { getAccessToken } from '../../handlers/getAccessToken';
import { albumPlaceholder } from '../../assets';

function PlaylistInfo(props: any) {
  const { info, accessToken, songAmount } = props;
  const [authorImageLink, setAuthorImageLink] = useState<string>();
  const [playlistImg, setPlaylistImg] = useState(String);

  // Get the author image
  useEffect(() => {
    async function fetchAuthorImage() {
      if (!info.img) { setPlaylistImg(albumPlaceholder) }
      else { setPlaylistImg(info.img) } 
      if (!info.author_img) return;
      try {
        const reqBody = {
          "authorImg":info.author_img
        }
        const res = await fetch(("/api/savedalbums/authorimg"), {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${await getAccessToken(accessToken)}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        });
        const data = await res.blob();
        const url = URL.createObjectURL(new Blob([data]));
        setAuthorImageLink(url)
    
      } catch (error) {
        console.error("PlaylistInfo/FetchAuthorImage: " + error)
      }
    }
    fetchAuthorImage()
  },[info])

  return (
    <div className='playlist-info'>
        <img src={playlistImg} alt="" className='playlist-image' />

        <div className="detail">
            <p className='playlist-status'>{info.pub ? "Public Playlist" : "Playlist"}</p>
            <p className='playlist-name'>{info.title}</p>
            <p className="playlist-description">{info.desc}</p>

            <div className="stats">
                <img src={authorImageLink} alt="" className='author-image' title={info.author} />
                <p className="author">{info.author}</p>
                <p className='dot'>•</p>
                <p className="likes">{info.likes} {info.likes ? "likes •" : ""}</p>
                <p className="song-amount">{songAmount} songs{info.length ? "," : ""}</p>
                <p className="playlist-length">{info.length ? info.length : ""}</p>
            </div>
        </div>
    </div>
  )
}

export default PlaylistInfo