import Project from './project'
import projectsData from '../portfolio/projects.json'
import styles from '../../../styles/projects/Portfolio.module.scss'

const Portfolio = (props) => {
  return (
    <div className={styles.portfolio} id="portfolio">
      <h2>Code Portfolio</h2>
      <div className="projects-section">
        {Object.keys(projectsData).map((x, index) =>
          <Project key={x} name={x} data={projectsData[x]} gridId={index} />
        )}
        {Object.keys(projectsData).length % 3 !== 0 ?
            <div className={styles.project} data-type="project" data-hidden="true"></div>
        : ''}
      </div>
    </div>
  )
}

export default Portfolio