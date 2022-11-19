import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Hexagon from './hexagon'
import ProjectClickables from './clickables'

function createMarkup(input) {
  return { __html: input}
}

const Project = (props) => {
  const data = props.data
// /images/projects/
  return (
    <div className="project" data-title={props.name}>
      <Hexagon />
      <button type="button" class="close-x" aria-label="minimize project details">
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