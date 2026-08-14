import { useEffect, useState } from 'react'

export default function useShyNav() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight
      
      // Always show nav at top or bottom boundaries
      if (currentScrollY <= 0 || currentScrollY >= maxScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      lastScrollY = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isVisible
}
