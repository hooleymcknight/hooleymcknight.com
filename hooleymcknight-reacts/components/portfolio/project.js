import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Hexagon from './hexagon'
import ProjectClickables from './clickables'

function createMarkup(input) {
  return { __html: input}
}

const toggleProject = (e) => {
  const minimizedProject = e.target.closest('.project:not([project-active])')
  const closeBtn = e.target.closest('.close-x')
  if (minimizedProject && !closeBtn) {
    minimizedProject.parentElement.querySelector('[project-active]')?.removeAttribute('project-active')
    minimizedProject.setAttribute('project-active', '')
  }
}

const closeProject = (e) => {
  const activeProject = e.target.closest('.project[project-active]')
  if (activeProject) { // this should always be true but I dont mind the extra check
    activeProject.removeAttribute('project-active')
  }
}

const focusHandler = (e) => {
  console.log(e)
  const clickable = e.target.closest('.project-clickable')
  const focused = e.target.closest('.project[focused]')
  if (clickable && !focused) {
    e.target.closest('.project').setAttribute('focused', '')
  }
}

const blurHandler = (e) => {
  const focused = e.target.closest('.project[focused]')
  const inner = e.target.closest('.project-inner')
  if (focused && !inner) {
    focused.removeAttribute('focused')
  }
}

const Project = (props) => {
  const data = props.data

  return (
    <div className="project" data-title={props.name} onMouseOver={e => focusHandler(e)} onMouseOut={e => blurHandler(e)} onFocus={e => focusHandler(e)} onBlur={e => blurHandler(e)}>
      <Hexagon />
      <button type="button" className="close-x" aria-label="minimize project details" onClick={e => closeProject(e)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ProjectClickables />

      <div className="project-inner">
        <h3>{props.name}</h3>
        <h5>{data.subtitle}</h5>

        <div className="project-content">
          <img src={`https://hooleymcknight.com/images/projects/${data.image}`} alt={props.name} />
          <p className="blurb" dangerouslySetInnerHTML={createMarkup(data.blurb)}></p>
          <a className="project-link" target="_blank" href={data.link.href} alt={data.link.alt}>{data.link.text}</a>
        </div>
      </div>

    </div>
  )
}

export default Project