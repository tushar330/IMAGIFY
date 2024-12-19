/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center gap-4 py-3 mt-20'>
        <img 
        onClick={()=>navigate('/')}
        src={assets.logo} alt="" width={150} className='cursor-pointer' />

        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Imagify | All right reserved.</p>

        <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} alt="" width={35} className='cursor-pointer'/>
            <img src={assets.twitter_icon} alt="" width={35} className='cursor-pointer'/>
            <img src={assets.instagram_icon} alt="" width={35} className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default Footer