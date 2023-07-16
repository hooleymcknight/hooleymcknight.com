const createMarkup = (input) => {
  return { __html: input}
}

const boldenSkills = (skillset) => {
  const newSkillset = []
  skillset.forEach((skill) => {
    if (skill.startsWith('!')) {
      skill = `<b>${skill.replace('!', '')}</b>`
    }
    newSkillset.push(skill)
  })
  return newSkillset
}

const SkillsSection = (props) => {
  const skills = props.data

  return (
    <div className="skills-section">
      <h3>Skills</h3>
      {Object.keys(skills).map((x, index) =>
        <div key={index} className="skill-line">
          <b className="skill-header">{x}:</b>
          <p className="skills" dangerouslySetInnerHTML={createMarkup(boldenSkills(skills[x]).join(', '))}></p>
        </div>
      )}
    </div>
  )
}

export default SkillsSection