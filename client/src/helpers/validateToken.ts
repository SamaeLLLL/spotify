import jwtDecode from 'jwt-decode';

export function validate(accessToken:string) {
    const decodedToken:any = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000; // convert to seconds

    return decodedToken.exp > currentTime;
}