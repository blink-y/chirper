import { useTheme } from 'next-themes'
import { HiOutlineSun, HiMoon } from 'react-icons/hi'
import React from 'react'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return (
        <div className="absolute right-4 lg:right-6 bottom-4 lg:bottom-6">
            {theme === 'light'
              ? (
                <HiOutlineSun className="text-yellow-400 h-8 w-8 cursor-pointer" onClick={() => setTheme('dark')} />
                )
              : (
                <HiMoon className="text-yellow-400 h-8 w-8 cursor-pointer" onClick={() => setTheme('light')} />
                )}
        </div>
  )
}
export default ThemeButton
