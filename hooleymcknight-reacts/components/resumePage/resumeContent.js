import EduCerts from './eduCerts'
import IntroSection from './introSection'
import SkillsSection from './skillsSection'
import WorkExp from './workExperience'

import data from './resume_data.json'

const ResumeContent = (props) => {
  const classes = props.className

  return (
    <div className={classes}>
      <IntroSection />
      <SkillsSection data={data["Skills"]} />
      <WorkExp data={data["Work Experience"]} />
      <EduCerts data={data["Education & Certifications"]} />
    </div>
  )
}

export default ResumeContent