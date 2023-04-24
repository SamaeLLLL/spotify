export async function getProfilePic() {
    try {
        const res = await fetch(("/profile/picture"), {
            method: "GET",
            credentials: "include"
        });
        const data = await res.blob();
        const url = URL.createObjectURL(new Blob([data]));
        console.log(data)
        console.log(url)
        return url

    } catch (err) {
        console.error("UserProfile.tsx/handleShowPP: " + err)
    }

}