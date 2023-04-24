import React from 'react'
import { Liked } from '../../assets/playlistControls'
import { Heroes } from '../../assets/playlistControls/playlistCover'

function Song(props: any) {
  const { title, img, desc, album, date, length, liked } = props

  return (
      <>
        <tr className='song'>
          <td className='id pd'>1</td>
          <td className='title pd'>
            <img src={img} alt="" className='cover'/>
            <div className="text">
              <p className='title-title'>{title}</p>
              <p className="desc"><span className='hover-song'>{desc}</span></p>
            </div>
          </td>
          <td className='album pd'><span className='hover-song'>{album}</span></td>
          <td className='date pd'>{date}</td>
          <td className='liked pd'><img src={liked ? Liked : ''} alt="" /></td>
          <td className='length pd'>{length}</td>
        </tr>
        </>
  )
}

export default Song