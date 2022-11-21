import Project from './project'
import projectsData from './projects.json'
import styles from '../../../styles/Portfolio.module.scss'

const Portfolio = (props) => {
  return (
    <div className={styles.portfolio} id="portfolio">
      <h2>Code Portfolio</h2>
      <div className="projects-section">
        {Object.keys(projectsData).map((x, index) =>
          <Project key={x} name={x} data={projectsData[x]} gridId={index} />
        )}
      </div>
    </div>
  )
}

export default Portfolio