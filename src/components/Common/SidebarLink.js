import React from 'react'

const SidebarLink = ({ text, Icon }) => {
  return (
    <div className='text-black dark:text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 cursor-pointer px-4 py-2'>
      <Icon />
      <span className='hidden xl:inline'>{text}</span>
    </div>
  )
}

export default SidebarLink
