import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from '../../../styles/projects/Portfolio.module.scss'

// import { toggleProject, focusHandler, blurHandler } from '../portfolio/projectTileEvents'

const createMarkup = (input) => {
    return { __html: input}
}

const Project = (props) => {
    const data = props.data;

    const expandProject = (e) => {
        const proj = e.target.closest('[data-type="project"]');
        if (proj.dataset.active == 'true') {
            proj.dataset.active = 'false';
        }
        else {
            const otherActiveProject = e.target.closest('.projects-section').querySelector('[data-type="project"][data-active="true"]');
            if (otherActiveProject) {
                otherActiveProject.dataset.active = 'false';
            }
            proj.dataset.active = 'true';
        }
    }

    // const closeProject = (e) => {
    //     const proj = e.target.closest('[data-type="project"]');
    // }

    return (
        <div className={styles.project} data-type="project" data-title={props.name} tabIndex="0">
            <div className="static-project">
                <div className="hex-base" onClick={(e) => expandProject(e)}>
                    <div className="hex-inner"></div>

                    <div className="project-inner">
                        <h3>{props.name}</h3>
                        <h5>{data.subtitle}</h5>
                    </div>
                </div>
            </div>

            <div className="dynamic-project">
                <button type="button" className="close-x" aria-label="minimize project details" onClick={e => expandProject(e)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="box-shadow-circle"></div>
                <div className="hex-base" onClick={(e) => expandProject(e)}>
                    <div className="hex-inner"></div>
                    

                    <div className="project-inner">
                        <h3>{props.name}</h3>
                        <h5>{data.subtitle}</h5>

                        <div className="project-content">
                            <LazyLoadImage src={`https://hooleymcknight.com/images/projects/${data.image}`} alt={props.name} />
                            <p className="blurb" dangerouslySetInnerHTML={createMarkup(data.blurb)}></p>
                            {data.link ? 
                                <Link href={data.link.href} passHref>
                                    <a className="project-link" tabIndex="0" target={!data.link.href.startsWith('/') ? "_blank" : ''} alt={data.link.alt}>{data.link.text}</a>
                                </Link>
                            : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;