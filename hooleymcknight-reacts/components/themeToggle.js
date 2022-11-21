import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const ThemeToggle = (props) => {
  const toggleHandler = () => {
    if (props.theme === 'light') {
      props.onToggle('dark')
    }
    else {
      props.onToggle('light')
    }
  }

  return (
    <button className="theme-toggle" onClick={toggleHandler}>
      <div className="toggle-switch"></div>
      <FontAwesomeIcon icon={faSun} />
      <FontAwesomeIcon icon={faMoon} />
    </button>
  )
}

export default ThemeToggle