import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { toggleProject, closeProject, focusHandler, blurHandler, copyableHandler } from './projectTileEvents'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Hexagon from './hexagon'
import ProjectClickables from './clickables'

const createMarkup = (input) => {
  return { __html: input}
}

const Project = (props) => {
  const data = props.data

  return (
    <div className="project" data-title={props.name} tabIndex="0" onClick={e => toggleProject(e)} onKeyUp={e => toggleProject(e)} onMouseOver={e => focusHandler(e)} onMouseOut={e => blurHandler(e)}>
      <Hexagon />
      <button type="button" className="close-x" aria-label="minimize project details" onClick={e => closeProject(e)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ProjectClickables />

      <div className="project-inner">
        <h3>{props.name}</h3>
        <h5>{data.subtitle}</h5>

        <div className="project-content">
          <LazyLoadImage src={`https://hooleymcknight.com/images/projects/${data.image}`} alt={props.name} />
          <p className="blurb" dangerouslySetInnerHTML={createMarkup(data.blurb)} onClick={e => copyableHandler(e)} onKeyUp={e => copyableHandler(e)}></p>
          {data.link ? 
            <Link href={data.link.href} passHref>
                <a className="project-link" tabIndex="0" target={!data.link.href.startsWith('/') ? "_blank" : ''} alt={data.link.alt}>{data.link.text}</a>
            </Link>
          : ""}
        </div>
      </div>

    </div>
  )
}

export default Project