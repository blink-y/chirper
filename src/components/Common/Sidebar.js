import React from 'react'
import { signOut } from 'next-auth/react'
import { GiEgyptianBird } from 'react-icons/gi'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillHome, AiOutlineInbox, AiOutlineUser, AiOutlineSetting, AiOutlineYuque } from 'react-icons/ai'
import { useRouter } from 'next/router'

import SidebarLink from './SidebarLink'

const Sidebar = () => {
  const router = useRouter()
  const userTag = localStorage.getItem('tag')
  if (typeof window === 'undefined') return null
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full border-r border-gray-400 pr-0 xl:pr-8 bg-white dark:bg-black text-black dark:text-white'>
      <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0 xl:ml-24' onClick={() => router.push('/')}>
        <GiEgyptianBird className='text-white-400 dark:text-white text-[34px]'/>
      </div>
      <div className='space-y-2 mt-4 mb-2.5 xl:ml-24'>
        <div onClick={() => router.push('/')}>
          <SidebarLink text='Feed' Icon={AiFillHome}/>
        </div>
        <SidebarLink text='Messages' Icon={AiOutlineInbox}/>

        {userTag
          ? <div onClick={() => router.push(`/profile/${userTag}`)}>
            <SidebarLink text='Profile' Icon={AiOutlineUser}/>
          </div>
          : null
        }
        {userTag
          ? <div onClick={() => router.push(`/settings/${userTag}/`) }>
          <SidebarLink text='Settings' Icon={AiOutlineSetting}/>
        </div>
          : null
        }
        {userTag === 'admin'
          ? <div  onClick={() => router.push('/admin/')}>
          <SidebarLink text='Admin' Icon={AiOutlineYuque} />
        </div>
          : null
        }
      </div>
      <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect xl:ml-auto xl:-mr-5 px-4 py-2' onClick={() => {
        localStorage.clear()
        signOut({ callbackUrl: '/login' })
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
