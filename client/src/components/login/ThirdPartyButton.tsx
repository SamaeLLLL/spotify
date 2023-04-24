import React, { ImgHTMLAttributes } from 'react'

function ThirdPartyButton(props:any) {
    const {logo, msg, color, textColor} = props
    const colorStyle = {
        backgroundColor: color
    }
    const applyTextColor = {
        color: textColor
    }
  return (
    <div style={colorStyle} className='button'>
        <img draggable='false' className='logo' src={logo} alt="" />
        <p style={applyTextColor} className='continue-with'>{msg}</p>
    </div>
  )
}

export default ThirdPartyButton