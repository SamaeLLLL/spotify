import React, { ChangeEvent, useState } from 'react'

function UserProfile() {
const [profilePic, setProfilePic] = useState<File>();

function handlePP(e:ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return;
    setProfilePic(files[0])
}

async function handlePPSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if (!profilePic) return console.error("missing a picture");
    const formData = new FormData;
    formData.append('file', profilePic)
    
    try {
        const res = await fetch(("/profile/picture"), {
            method: "POST",
            credentials: "include",
            body: formData
        })
        console.log(res)
    } catch (error) {
        console.error("UserProfile/HandlePPSubmit: " + error)
    }
}


  return (
    <div>
        <h1>Profile pic</h1>
        <form onSubmit={handlePPSubmit}>
            <input type="file" name='profilePic' onChange={handlePP} required accept="image/x-png,image/jpeg,image/jpg" />
            <input type="submit" value="Submit" />
        </form>

    </div>
  )
}

export default UserProfile