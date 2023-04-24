import React from 'react'
import '../static/login.scss'
import { useState, useEffect } from 'react'
import { SpotifyLogo, FacebookLogo, GoogleLogo, AppleLogo, showPWD, hidePWD } from '../assets/loginSignup'; 
import ThirdPartyButton from './login/ThirdPartyButton';
import { Link } from 'react-router-dom';

function LoginScreen(props:any) {

  // Handle form changes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Show password
  const [showPassword, setShowPassword] = useState<Boolean>()

  // form in progress
  const [FIP, setFIP] = useState<boolean>(false);

  function handleUsernameChange(event:any) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event:any) {
    setPassword(event.target.value)
  }

  function sendToken(token:String) {
    props.onToken(token);
  }

  async function handleLoginSubmit(event:any) {
    event.preventDefault()
    setFIP(true)

    const formData = {
      user: username,
      pwd: password
    }

    try {
      const res = await fetch("/users/auth", {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      const data = await res.json()
      sendToken(await data.accessToken)
      } catch (err) {
        console.error(err);
        throw err;
      }
    } 

  return (
    <div className={`login-screen ${FIP ? "loading" : ""}`}>
      <img src={SpotifyLogo} alt="Logo" className='spotify-logo' />
      <div className='divider'></div>
      <div className="third-party">
        <p className='continue'>To continue, log in to Spotify.</p>
        <ThirdPartyButton logo={FacebookLogo} color="#1877F2" msg="CONTINUE WITH FACEBOOK" textColor="#f0f0ff" />
        <ThirdPartyButton logo={AppleLogo} color="#1D1D1D" msg="CONTINUE WITH APPLE" textColor="#DFDFDF" />
        <ThirdPartyButton logo={GoogleLogo} color="#FFFFFF" msg="CONTINUE WITH GOOGLE" textColor="#000000a1" />
      </div>

      <div className="or-divider">
        <div className="line"></div>
        <p className='or'>OR</p>
        <div className="line"></div>
      </div>

      <form onSubmit={handleLoginSubmit} className='form-login'>
        <label htmlFor="username" className='label-username'>Email address</label>
        <input onChange={handleUsernameChange} required type="email" name='username' className='input-username' placeholder='Email address' />

        <label htmlFor="password" className='label-password'>Password</label>
        <div className="parent">
          <input onChange={handlePasswordChange} required type={showPassword ? "text" : "password"} name='password' className='input-password' placeholder='Password' />
          <img src={showPassword ? hidePWD : showPWD} alt="" className='show-pwd' onClick={() => setShowPassword(prev => !prev)} />
        </div>

        <p className='forgot-password'>Forgot your password?</p>

        <div className="bottom">
          <div className='remember-me'>
            <div className="checkmark"></div>
            <p>Remember me</p>
          </div>

          <input type="submit" value={"LOG IN"} className={`form-submit ${FIP ? "loading" : ""}`} />
        </div>
      </form>

        <div className="divider-bottom"></div>

        <div className="sign-up-section">
          <p>Don't have an account?</p>
          <Link to={'/signup'}>
            <button>SING UP FOR SPOTIFY</button>
          </Link>
        </div>
    </div>
  )
}

export default LoginScreen