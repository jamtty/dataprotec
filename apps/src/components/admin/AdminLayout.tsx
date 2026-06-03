import { useEffect } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prev = document.documentElement.style.fontSize
    document.documentElement.style.fontSize = '10px'
    return () => {
      document.documentElement.style.fontSize = prev
    }
  }, [])

  return <>{children}</>
}
