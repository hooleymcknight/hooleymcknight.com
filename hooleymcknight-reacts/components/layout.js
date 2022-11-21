import { useState, useEffect } from 'react'
import Navbar from '../components/navbar/navbar'
import ThemeToggle from '../components/themeToggle'

export const siteTitle = 'Holly Phillips'

const Layout = ({ children, page }) => {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <>
      <Navbar />
      <main id={page}>
        {children}
      </main>
      <ThemeToggle theme={theme} onToggle={(theme) => setTheme(theme)} />
    </>
  )
}

export default Layout