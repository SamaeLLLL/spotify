import jwtDecode from 'jwt-decode';

export async function getAccessToken(accessToken:string): Promise<string> {
    if (checkValid(accessToken)) return accessToken;

    try {
        const response = await fetch(('/users/refresh'), {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        return data.accessToken
    } catch (err) {
        console.error("getAccessToken/getAccessToken: " + err)
        throw err
    }
}


function checkValid(accessToken:string) {
    const decodedToken:any = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; // convert to seconds

    return decodedToken.exp > currentTime;
}
