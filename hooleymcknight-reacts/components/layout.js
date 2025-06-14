import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/navbar';
import ThemeToggle from '../components/themeToggle';

export const siteTitle = 'Holly M. Phillips';

const navExcludedPages = ['links', 'coding-hour', 'donation-links', 'emergency-vets'];

const Layout = ({ children, page, className }) => {
  const [theme, setTheme] = useState('');
  
  useEffect(() => {
    const prevTheme = localStorage.getItem('theme');
    if (!prevTheme && theme === '') {
      if (page === 'links') {
        setTheme('dark');
      }
      else {
        setTheme('light');
      }
    }
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    if (prevTheme && theme === '') {
      setTheme(prevTheme);
    }
  }, [theme]);

  return (
    <>
      {!navExcludedPages.includes(page) ?
        <Navbar />
      :
        ''
      }
      
      <main id={page} className={className}>
        {children}
      </main>

      {!navExcludedPages.includes(page) ?
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
  );
};

export default Layout;