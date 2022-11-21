const createMarkup = (input) => {
  return { __html: input}
}

const WorkEntry = (props) => {
  const entry = props.entry

  return (
    <div className="work-entry">
      <p><b>{entry["job title"]},</b> {entry["start date"]} — {entry["end date"]}</p>
      <p>{entry.company}, {entry.location}</p>

      <ul>
        {entry.impact.map((x, index) => 
          typeof(x) === 'string'
          ?
          <li key={index} dangerouslySetInnerHTML={createMarkup(x)}></li>
          :
          <li key={index}>
            <span dangerouslySetInnerHTML={createMarkup(Object.keys(x)[0])}></span>
            <ul className="sublist">
              {Object.values(x)[0].map((y, index) => 
                <li key={index}>{y}</li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

export default WorkEntry