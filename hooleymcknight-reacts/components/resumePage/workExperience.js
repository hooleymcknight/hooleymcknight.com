import WorkEntry from "./workEntry"

const WorkExp = (props) => {

  return (
    <div className="work-experience">
      <h3>Work Experience</h3>
      {props.data.map((x, index) =>
        <WorkEntry key={index} entry={x}/>
      )}
    </div>
  )
}

export default WorkExp