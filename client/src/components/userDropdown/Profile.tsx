import React, { ChangeEvent, ImgHTMLAttributes, useEffect, useState } from 'react'
import '../../static/profile.scss'
import { edit } from '../../assets'
import { Close } from '../../assets'
import { getProfilePic } from '../../handlers/getProfilePic'
import { getAccessToken } from '../../handlers/getAccessToken'

function Profile(props:any) {
    const { userInfo } = props;
    const { infoCallback } = props;
    const { ppCallback } = props;
    const [newUsername, setNewUsername ] = useState<any>(userInfo.username);
    const [pp, setPP] = useState<File>();
    const [currentPP, setCurrentPP] = useState<any>();
    const [prevImg, setPrevImg] = useState<any>();
    const { token } = props;


    const [showPopup, setShowPopup] = useState<Boolean>(false);

    useEffect(() => {
        async function fetchPP() {
            const currentProfPic = await getProfilePic();
            setCurrentPP(currentProfPic); 
            setPrevImg(currentProfPic);
            if(userInfo && userInfo.username) {
                setNewUsername(userInfo.username);
            }
        }
        fetchPP();
    },[userInfo])

    function handleUsernameChange(e: any) {
        setNewUsername(e.target.value)
    }

    function handleProfPicClick(event: any): void {
        setShowPopup(true);
    }

    function handleClose() {
        setShowPopup(false);
        setNewUsername(userInfo.username);
        setPrevImg(currentPP);
    }

    function handlePPchange(e:ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        setPP(files[0]);
        const url = URL.createObjectURL(files[0]);
        setPrevImg(url);
    }

    async function handleFormSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if(newUsername !== userInfo.username) {
            try {
                const updatedUsername = {
                    "oldUsername":userInfo.username,
                    "username":newUsername,
                    "password":userInfo.password
                }
                const res = await fetch(("/users"), {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${await getAccessToken(token)}`
                    },
                    body: JSON.stringify(updatedUsername),
                    credentials: "include"
                })
                const data = await res.json();
                console.log(data);
                infoCallback()

            } catch (error) {
                console.error("UserProfile/HandlePPSubmit: " + error)
            }
        }
        if(pp) {
            const formData = new FormData;
            formData.append('file', pp)
            try {
                const res = await fetch(("/profile/picture"), {
                    method: "POST",
                    credentials: "include",
                    body: formData
                })
                URL.revokeObjectURL(currentPP);
                setCurrentPP(prevImg);
                ppCallback()
            } catch (error) {
                console.error("UserProfile/HandlePPSubmit: " + error)
            }
        }
        setShowPopup(false);
    }

    return (
        <div className='profile'>
            <div className="top">
                <img src={currentPP} alt="" className='profilePic' />
                <button onClick={handleProfPicClick} className="set-pp">
                    <img src={edit} alt="" />
                    <p>Choose photo</p>
                </button>
                <div className="info">
                    <p className='i-profile'>Profile</p>
                    <p className='i-username'>{userInfo.username}</p>
                    <p className='i-info'>39 Public playlists • 10 followers •  22 following</p>
                </div>
            </div>

          <div className="bot">
            
          </div>
    
        {
            showPopup? 
        <div className={`popup`}>
            <div className="content">
                <div className="top-menu">
                    <p className='title'>Profile details</p>
                    <img src={Close} alt="" onClick={handleClose} />
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="parent">
                        <label htmlFor="pp-upload" className='upload-pp-label'>
                            <img src={prevImg} alt="" className='upload-pp' />
                            <div className="hover-effect">
                                <img src={edit} alt="" />
                                <p className='title'>Choose photo</p>
                            </div>
                            <input onChange={handlePPchange} type="file" id='pp-upload' name='pp-upload' accept="image/x-png,image/jpeg,image/jpg" className='upload-pp-btn' />
                        </label>
                        <div className="other-input">
                            <input required value={newUsername} onChange={handleUsernameChange} className='username-input' type="text" placeholder='Add a display name' />
                            <input className='form-submit' type="submit" value='Save' />
                        </div>
                    </div>
                

                <p className='disclaimer'>By proceeding, you agree to give Spotify access to the image you choose to upload. Please
                    make sure you have the right to upload the image.
                </p>

                </form>                
            </div>
        </div>
        : ""
        }
        </div>
      )
}

export default Profile
