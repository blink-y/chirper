import Image from 'next/image'
import React from 'react'

const TrendingList = ({ title, category }) => {
  return (
        <div className='mt-4 flex items-center'>
            <div>
                <Image className='rounded-3xl' src="/nextjs_icon.png" height="48" width="48" />
            </div>
            <div className="ml-4">
                <p className='text-gray-500 text-[14px] mb-1'>{category}</p>
                <h1 className='font-medium pr-2'>{title}</h1>
            </div>

        </div>
  )
}

export default TrendingList
