import React, { useEffect, useRef, useState } from 'react'
import '../static/createPlaylist.scss'
import { Close } from '../assets';
import { getAccessToken } from '../handlers/getAccessToken';
import { reqPlaylists } from '../helpers/reqPlaylists';

function CreatePlaylist(props:any) {
    const { hide, onHide, accessToken } = props;
    const [playlistName, setPlaylistName] = useState<string>('')
    const playlistRef = useRef<HTMLInputElement>(null);

    function handleNameChange(event:any) {
        setPlaylistName(event.target.value);
    }

    useEffect(() => {
        if(hide && playlistRef.current) {
            playlistRef.current.focus();
        }
    },[hide])

    async function handleSubmit(event:any) {
        event.preventDefault();
        

        async function needAsync() {
            fetch("/api/savedalbums", {
                method: "POST",
                body: JSON.stringify({'playlistName':playlistName}),
                headers: {
                    'Authorization': `Bearer ${await getAccessToken(accessToken)}`,
                    'Content-Type': "application/json",
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error("CreatePlaylist/handleSubmit: " + err));
        }
        await needAsync();
        onHide();

        setTimeout(async () => {
            props.updatePlaylists(await reqPlaylists(await getAccessToken(accessToken)));
        }, 50);
        setPlaylistName('');
    }

  return (
    <div className={`create-playlist ${!hide ? "hide" : "show"}`}>
        <div className='popup'>
            <img src={Close} alt="" onClick={() => {onHide(); setPlaylistName('')}} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="playlistName">Create playlist</label>
                <input autoFocus ref={playlistRef} autoComplete='off' type="text" placeholder='Playlist name' maxLength={70} name="playlistName"  value={playlistName} required id="" onChange={handleNameChange}/>

                <div className='uselessDiv'>
                    <input type="submit" value="Create" className='submit' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreatePlaylist