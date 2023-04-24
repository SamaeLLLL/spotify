export async function getUserInfo(accessToken:string) {
    try {
        const res = await fetch(('/users/getUser'), {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = await res.json();
        return data
    } catch (err) {
        console.error(err)
        throw err
    }

}