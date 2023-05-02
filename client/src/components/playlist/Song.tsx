import React from 'react'
import { Liked } from '../../assets/playlistControls'
import { Heroes } from '../../assets/playlistControls/playlistCover'
import { playInPlaylist } from '../../assets/mediaControls/media'

function Song(props: any) {
  const { title, img, desc, album, date, length, liked, removeSong, id, numId } = props
  function handleLikeClick() {
    removeSong(id)
  }

  return (
      <>
        <tr className='song'>
          <td className='id pd'>
            <span className='id-not-hovered'>{numId}</span>
            <a className='link' target='_blank' href={`https://www.youtube.com/results?search_query=${title}+${desc}`}>
              <img className='id-hovered' title={`Play ${title} by ${desc}`} src={playInPlaylist} />
            </a>
          </td>
          <td className='title pd'>
            <img src={img} alt="" className='cover'/>
            <div className="text">
              <p className='title-title'>{title}</p>
              <p className="desc"><span className='hover-song'>{desc}</span></p>
            </div>
          </td>
          <td className='album pd'><span className='hover-song'>{album}</span></td>
          <td className='date pd'>{date}</td>
          <td className='liked pd'><img onClick={handleLikeClick} title='Remove from your library' src={liked ? Liked : ''} alt="" /></td>
          <td className='length pd'>{length}</td>
        </tr>
        </>
  )
}

export default Song