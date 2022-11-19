export const siteTitle = 'Holly Phillips'

const Layout = ({ children, page }) => {

  return (
    <main id={page}>
      {children}
    </main>
  )
}

export default Layout