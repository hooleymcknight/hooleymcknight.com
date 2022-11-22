import { monthChange, formSubmit } from './timeCalcEvents'
import data from './timecalc_data.json'

const tsLink = 'https://www.typescriptlang.org/play?#code/PTAEEsDsAcFcBdTwBYFNQBMCGBPY9wBbdHAe1lAHctJE0AnVALgCgBjUyAZ0QFlOUoALygA5L1yj2nHqAAiuJqABKNADwBmAIwA+YaABMADmndEAFSLNQPelADm+0Vq1Nj0QlI5nQALU7oIqIAClhs4ABm4GxeMogAyuDwqADyERFcqIhBALQAbFIsIJicoohsyDT26CiomaAARghIaDhU4AA2HaD2sOAYJOT0oKTQBDKgEaTDtaBYDaQAbqgs8DjQ6Py0yE4AUjSioAA+YgBiqA2HJ+JY9FdiAILQd8diEjj3oruwkJ-fHZ8HrB7J94qhoJ8Umx4J8AHJLT5yVAxVbrdD+SCBMShcJRGKvcTkWhYKCfADCqFo9CwAIJAFEsDxUPRfqiNqBEsk0hksk4cgAWT45ACsQoKBJyAHYhUZCsUhArFUrlSrVYqimAGqgOqRKBAuC10BEftDwJwaaAOAM2ehVJA1OZQKgAB7JSAYA2QWCELX0PQiL0+5lO12Uj2gR0AflAgd9oCYAH07dUHQAaUAAbQAujoANw20BJqqoB0ht3h2PM9PKMthg0-ADWkF1kGz-pUGdEHUp9hQoiztfdBqjHcr9AHSiLkBT5nTGeUne7077WfTADoN8oc-mWKZZJRphgtoIRBmxPtfunROdLleJHcr08H29JFfvpfz7AAY-gaIr2CISvKEYSveFFj-MQkXxLNd28WRSHSTJ4AxOolBoNoRAAbxYUAxAFUQlGw3DcNEORzAIx5iDsNgsGAWFUEoBMAE1pgbP8cNAABfVMONEEUKKI4jRHicilFEB4qOiWj6MYlj6DYnjiMg0TKOZKTgDJZApPsUh2Nw7jePyASOJIkSKPEySaI0rSaJ0vShLI8yJLUqykUgZYHw4gySKlYylOElSLJc2i3I8+ySMcsTnOo2iABlSC4BMHmnbU6ns7y8NlQiTLEMyossuKEqSlLuy4dKeM42C4h6LJzFuap4CY1Bbn0AAKTJu2hVAjwEZAlFsBwAEphD0QS4MQeBSGwDCYwY+QsGSVrBo47sJvqrImpakRJumtcGtOL8Ok2+glo48abG1Y9kAASXdF19APegeu2NcoAGZ00na1KuuelBlo4yJQFanbcD2rIrqW0A9A6q7bve4bBNw+B1sa5rhgAahELQvN3XDGHgWAWSQFHjpYSq9wm0gDH5ZBhhEYGrH6+A7GnYahFGnLAYZ4hXsgNgOlgAYuFa0QsE8QaEZypT8cJyAkCsNdGGgDowlQEWxYg0RREGtdmaIU6lMqpTtXqLmCB5qB+cFuoRY8bXJaUpTVtAZAhn0WFvV9bnUDXLhlaSEWmG1jMAAYs2Wx3iNdwnQEx0AtAMKXiJlomAAMABJMOj+hOKYTPzZ9v2OgDgjg60LNFfBFW2DV0Q7avbXdbsQgls41OcqN4iTfQFO5YLsmqp8Bq5BEtrsGSJQFGSNmObxrJZcwBafcm+I9enJbff9+ARZFwaM3Lzfi+3w5LGIYOw8PkuxD3g+KluB5t5D4b0bEciB4pyZpkIeJYAaQgkjajPUAiNLTVWRvQBqx19ANTqhAjaaNWpXQjsRYolBUBdm6HARAUBQAACIRK4IgH3NAs1XSgGLpiHIOQICIAwKQOoMZSCIEIAtZI9A1w0PaF0UAvdDSgPoIwaE8hR5IQINOHK50R6OhEMPESrVMR6inmrDOmErqcVAJnBQOBuIaMwuAyBaN1H5ypjTE6p9UCDSMZhFCa4770Afq1J+nERKpwlrjYi519G1V8PoBCPJkIBC4BmTkqREJZCzBmKRMElLnWLsscx+gFHzUWiotRuitE6PziTQxujJrU1pq1cxljdE2LsQ4pxmiRJtx1pNeKNFuyrxZvYEWlIcgAFV4gQUwvLYgKElBePgOYXw6ZCC9TElwV29AQKLxwGJQMLkII4DRnM70Cz0zZxWZZCC-8vQTzEAYHIGBwD2CSIcTi-1pbzyJnE1A5j37nWmMcqANIlH6FSb1KxGT0yZxgdk24iDerFOMfksxVggXWICLYyo9jH6WJcR-XuvA6hcCwNUN55hSAXUQGQGOyRZCTR4T8EYctM6PJOZAF5S91GUCSDsLANgkjoD8UhEYERdEhO5EhHROKbDRw6BgGwFRupfnQAAqYwxM7iu-r-f+29LFrnbnuUg3Y1w6maYi5FqKLFAA'

const TimeCalc = (props) => {

  return (
    <div className={props.className}>
      <h1>Time Conversion Calculator</h1>
      <p>This app was built originally for use in scheduling tests for clients through CRO A/B testing apps. The use of this calculator may seem confusing here. This is only just a display of a tool I built.</p>
      <a href={tsLink} alt="link to this project in a TypeScript playground">Click here to see a bare-bones version of this project in a TypeScript playground.</a>

      <form id="time-conversion" onSubmit={e => formSubmit(e)}>
        <div className="form-section">

          <div className="select-wrapper">
            <label htmlFor="month">month</label>
            <select id="month" name="month" defaultValue="" onChange={e => monthChange(e)}>
              <option disabled value="">Select Month</option>
              {data.months.map(x => 
                <option key={x.value} value={x.value}>{x.display}</option>
              )}
            </select>
          </div>

          <div className="select-wrapper">
            <label htmlFor="day">day</label>
            <select id="day" name="day" defaultValue="">
              <option disabled value="">Select Day</option>
              {[...Array(31).keys()].map(x => 
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              )}
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="input-wrapper">
            <label htmlFor="time">time</label>
            <input id="time" type="time" />
          </div>

          <div className="select-wrapper">
            <label htmlFor="timezone">timezone</label>
            <select id="timezone" name="timezone">
              {data.timezones.map((x, index) => 
                <option key={x.value} value={x.value}>{x.display}</option>
              )}
            </select>
          </div>
        </div>

        <div className="form-section" btn-section="">
          <div className="select-wrapper" offset-wrapper="">
            <label htmlFor="site-offset">output timezone offset</label>
            <select id="site-offset" name="site-offset" defaultValue="-6">
              {data.offsets.map(x =>
                <option key={x} value={x}>{x}</option>
              )}
            </select>
          </div>

          <button type="submit" id="get-time">Get Output Time</button>
        </div>
      </form>

      <p className="results">The time to set in the scheduler is: <b></b></p>
    </div>
  )
}

export default TimeCalc