import React from 'react'
import { Clock } from '../../assets/playlistControls'
import Song from './Song'
import { Heroes, Spit } from '../../assets/playlistControls/playlistCover'

function PlaylistContent() {
  return (
    <div className='playlist-content'>
        <table>
          <thead>
            <tr className='header'>
              <th className='id'>#</th>
              <th className='title-header'><span className='hover'>Title</span></th>
              <th className='album'><span className='hover'>Album</span></th>
              <th className='date'><span className='hover'>Date added</span></th>
              <th className="liked"></th>
              <th className='length'><img src={Clock} alt="" className='clock' /></th>
            </tr>
          </thead>
          <tbody>
            <tr className='fake-margin'></tr>
          <Song 
          title='On time (with John Legend)' 
          desc='Metro Boomin, John Legend'
          album='HEROES & VILLAINS'
          date='Apr 14, 2023'
          length='2:49'
          liked={true}
          img={Heroes} />
          <Song 
          title='SPIT IN MY FACE!' 
          desc='ThxSoMch'
          album='SPIT IN MY FACE!'
          date='Apr 14, 2023'
          length='2:28'
          liked={true}
          img={Spit} />

          <tr className='player-margin'></tr>
          </tbody>
        </table>
        
    </div>
  )
}

export default PlaylistContent