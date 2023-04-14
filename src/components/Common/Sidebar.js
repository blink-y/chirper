import React from 'react'
import { signOut } from 'next-auth/react'
import { BiHash } from 'react-icons/bi'
import { BsTwitter, BsBell, BsBookmark, BsThreeDots } from 'react-icons/bs'
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { useRouter } from 'next/router'

import SidebarLink from './SidebarLink'

const Sidebar = () => {
  const router = useRouter()
  const user_tag = localStorage.getItem("tag")
  if(typeof window === 'undefined') return null
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full border-r border-gray-400 pr-0 xl:pr-8 bg-white dark:bg-black text-black dark:text-white'>
      <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0 xl:ml-24' onClick={()=>router.push('/')}>
        <BsTwitter className='text-blue-400 dark:text-white text-[34px]'/>
      </div>
      <div className='space-y-2 mt-4 mb-2.5 xl:ml-24'>
        <div onClick={()=>router.push('/')}>
          <SidebarLink text='Home' Icon={AiFillHome}/>
        </div>
        <SidebarLink text='Explore' Icon={BiHash}/>
        {/* <SidebarLink text='Notifications' Icon={BsBell}/> */}
        <SidebarLink text='Messages' Icon={AiOutlineInbox}/>
        {/* <SidebarLink text='Bookmarks' Icon={BsBookmark}/>
        <SidebarLink text='List' Icon={HiOutlineClipboardList}/> */}

        {user_tag ?
        <div onClick={() => router.push(`/profile/${user_tag}`)}>
          <SidebarLink text='Profile' Icon={AiOutlineUser}/>
        </div> : null
        }
        
        <SidebarLink text='More' Icon={HiOutlineDotsCircleHorizontal}/>
      </div>
      {/* <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]'>
        Tweet
      </button> */}
      <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect xl:ml-auto xl:-mr-5 px-4 py-2' onClick={()=>{
        localStorage.clear();
        signOut({callbackUrl: '/login'})
      }}>
        <img src={localStorage.userImg} alt="" className='h-10 w-10 rounded-full xl:mr-2.5'/>
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold text-black dark:text-white'>{localStorage.getItem('username')}</h4>
          <h4 className='text-[#6e767d]'>@{localStorage.getItem('tag')}</h4>
        </div>
        <BsThreeDots className='h-5 hidden xl:inline ml-10'/>
      </div>
    </div>
  )
}

export default Sidebar
