import { useState, useEffect } from 'react'
import Navbar from '../components/navbar/navbar'
import ThemeToggle from '../components/themeToggle'

export const siteTitle = 'Holly Phillips'

const Layout = ({ children, page, className }) => {
  const [theme, setTheme] = useState('')
  
  useEffect(() => {
    const prevTheme = sessionStorage.getItem('theme')
    if (!prevTheme && theme === '') {
      if (page === 'links') {
        setTheme('dark')
      }
      else {
        setTheme('light')
      }
    }
    document.documentElement.dataset.theme = theme
    sessionStorage.setItem('theme', theme)

    if (prevTheme && theme === '') {
      setTheme(prevTheme)
    }
  }, [theme])

  return (
    <>
      {page !== 'links' ?
        <Navbar />
      :
        ''
      }
      
      <main id={page} className={className}>
        {children}
      </main>

      {page !== 'links' ?
        <ThemeToggle theme={theme} onToggle={(theme) => setTheme(theme)} />
      :
        ''
      }
      
      {page !== 'privacy-policy' ? 
        <footer>
          <a href="/privacy-policy" alt="Privacy Policy" className="privacy-policy">Privacy Policy</a>
        </footer>
        : ""
      }
    </>
  )
}

export default Layout