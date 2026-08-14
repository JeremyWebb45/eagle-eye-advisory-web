import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 1024

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches)

    mediaQuery.addEventListener('change', handleChange)

    // ensure state is in sync on mount
    setIsMobile(mediaQuery.matches)
    setLoading(false)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return { isLoading: loading, isMobile }
}
