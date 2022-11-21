import { monthChange, formSubmit } from './timeCalcEvents'
import data from './timecalc_data.json'

const TimeCalc = (props) => {

  return (
    <div className={props.className}>
      <h1>Time Conversion Calculator</h1>
      <p>This app was built originally for use in scheduling tests for clients through CRO A/B testing apps. The use of this calculator may seem confusing here. This is only just a display of a tool I built.</p>

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