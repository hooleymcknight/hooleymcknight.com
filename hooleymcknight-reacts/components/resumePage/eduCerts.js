const createMarkup = (input) => {
  return { __html: input}
}

const EduCerts = (props) => {
  const data = props.data

  return (
    <div className="education-certifications">
      <h3>Education & Certifications</h3>
      {data.map((x, index) =>
        <p key={index} dangerouslySetInnerHTML={createMarkup(x)}></p>
      )}
    </div>
  )
}

export default EduCerts