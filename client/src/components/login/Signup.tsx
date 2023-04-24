import React from 'react'
import '../../static/login.scss'
import '../../static/signup.scss'
import { useState, useEffect } from 'react'
import { SpotifyLogo, FacebookLogo, GoogleLogo, AppleLogo, showPWD, hidePWD } from '../../assets/loginSignup'; 
import ThirdPartyButton from '../login/ThirdPartyButton';
import { Link, useNavigate } from 'react-router-dom';

function Signup(props:any) {

    let navigate = useNavigate()

    const loginLinkStyles = {
        textDecoration: 'underline',
        color: '#00A861'
    }

  // Handle form changes
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  // Show password
  const [showPassword, setShowPassword] = useState<Boolean>()

  // form in progress
  const [FIP, setFIP] = useState<boolean>(false);

  function handleUsernameChange(event:any) {
    setUsername(event.target.value)
  }
  function handleEmailChange(event:any) {
    setEmail(event.target.value)
  }
  function handleEmailConfirmChange(event:any) {
    setConfirmEmail(event.target.value)
  }

  function handlePasswordChange(event:any) {
    setPassword(event.target.value)
  }

  function sendToken(token:String) {
    props.onToken(token);
  }

    async function handleRegisterSubmit (event:any) {
        event.preventDefault()
        setFIP(true);

        const formData = {
            email: email,
            confirmEmail: confirmEmail,
            user: username,
            pwd: password
        }

        try {
            const res = await fetch("/users/register", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            const data = await res.json()
            sendToken(await data.accessToken)
            navigate('/');
        } catch (err) {
            console.error(err);
            throw err;
        }

    
    }
  

  return (
    <div className={`login-screen ${FIP ? "loading" : ""} signup`}>
      <img src={SpotifyLogo} alt="Logo" className='spotify-logo' />
      <p className='title'>Sign up for free to start listening.</p>
      <div className="third-party">
        <ThirdPartyButton logo={FacebookLogo} color="#3D639B" msg="Sign up with Facebook" textColor="#FFFFFF" />
        <ThirdPartyButton logo={GoogleLogo} color="#FFFFFF" msg="Sign up with Google" textColor="#000000a1" />
      </div>

      <div className="or-divider">
        <div className="line"></div>
        <p className='or'>OR</p>
        <div className="line"></div>
      </div>

      <p className='signup-title'>Sign up with your email address</p>

      <form onSubmit={handleRegisterSubmit} className='form-login register'>
        <label htmlFor="email" className='label-email'>What's your email?</label>
        <input onChange={handleEmailChange} maxLength={50} minLength={5} required autoComplete='email' type="email" name='email' className='input-email' placeholder='Enter your email.' />

        <label htmlFor="emailConfirm" className='label-email email-confirm'>Confirm your email</label>
        <input onChange={handleEmailConfirmChange} maxLength={50} minLength={5} autoComplete='off' required type="email" name='emailConfirm' className='input-email' placeholder='Enter your email again.' />
        
        <label htmlFor="password" className='label-password'>Create a password</label>
        <div className="parent">
          <input onChange={handlePasswordChange} minLength={7} autoComplete='off' maxLength={250} required type={showPassword ? "text" : "password"} name='password' className='input-password' placeholder='Create a password.' />
          <img src={showPassword ? hidePWD : showPWD} alt="" className='show-pwd' onClick={() => setShowPassword(prev => !prev)} />
        </div>

        <label htmlFor="usernameRegister" className='label-username'>What should we call you?</label>
        <input onChange={handleUsernameChange} minLength={5} maxLength={30} required type="text" name='usernameRegister' className='input-username' placeholder='Enter a profile name.' />
        <p className='username-disclaimer'>This appears on your profile.</p>

        <div className="bottom signup">
          <p className='signup-disclaimer'>By clicking on sign-up, you agree to <a href="https://www.spotify.com/cz/legal/end-user-agreement/">Spotify's Terms and
          Conditions of Use</a>.</p>
          <p className='signup-disclaimer two'>To learn more about how Spotify collects, uses, shares and protects your
          personal data, please see <a href="https://www.spotify.com/cz/legal/privacy-policy/">Spotify's Privacy Policy</a>.</p>

          <input type="submit" value={"Sign up"} className={`form-submit register ${FIP ? "loading" : ""}`} />
        </div>
      </form>

        <div className="divider-bottom"></div>

        <p className='login-link'>Have an account? <Link style={loginLinkStyles} to={'/'}>Log in.</Link></p>
    </div>
  )
}

export default Signup