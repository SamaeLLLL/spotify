export async function reqPlaylists(accessToken:string)
{
    try {
        const res = await fetch(("/api/savedalbums"), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }})
        return await res.json()
    } catch (err) {
        throw "reqPlaylists/reqPlaylists: " + err
    }
}


