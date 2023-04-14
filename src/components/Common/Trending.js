import React from 'react'
import { FiSearch } from 'react-icons/fi'
import TrendingList from './TrendingList'

const Trending = () => {
  const proceedSearch = (e) => {
    if (e.keyCode === 13) {
      window.location.href = `/search/${e.target.value}`
    }
  }
  return (
        <div className='hidden lg:block w-[350px] mt-2'>

            <div className='bg-slate-100 dark:bg-[#16181C] flex gap-2 rounded-full py-2 px-4 text-black dark:text-white items-center text-[20px] sticky top-1 z-10'>
                <FiSearch />
                <input className='bg-transparent w-[100%] outline-none' type="text" placeholder='Search Chirper' onKeyDown={proceedSearch} />
            </div>

            <div className='bg-slate-100 dark:bg-[#16181C] rounded-[20px] text-black dark:text-white mt-4 px-4 py-4'>
                <h1 className='text-[20px] font-medium'>What's Happening</h1>

                <TrendingList title="Michael Lyu is funny" category="Comedy" />
                <TrendingList title="HTML is a programming language" category="Conspiracy" />
                <TrendingList title="End this semester" category="Suffering" />
                <TrendingList title="Anyone finished HW3?" category="Academic" />
                <TrendingList title="Get Some Sleep" category="Health and Self-care" />

            </div>

        </div>
  )
}

export default Trending
