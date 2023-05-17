import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const defaultPlayerCount = 6

const Filters = (props) => {
  const [sliderData, setSliderData] = useState(defaultPlayerCount)

  useEffect(() => {
    props.onApply('playerCount', sliderData, null)
  }, [sliderData])

  function updateSlider(e) {
    const value = e.target.value
    setSliderData(value)
  }

  function toggleCheckbox(e) {
    const checkbox = e.target.closest('.filter-checkbox').querySelector('input')
    checkbox.click()
  }

  function applyFilter(e) {
    const type = e.target.closest('.filter-checkbox').getAttribute('data-type')
    const data = e.target.value
    const dataValue = e.target.checked
    props.onApply(type, data, dataValue)
  }

  function toggleDropdown(e) {
    const filterSet = e.target.closest('.filter-set')
    if (filterSet.classList.contains('open-filter')) {
      filterSet.classList.remove('open-filter')
    }
    else {
      const prevFilter = document.querySelector('.filter-set.open-filter')
      if (prevFilter) prevFilter.classList.remove('open-filter')
      filterSet.classList.add('open-filter')
    }
  }

  return (
    <div className={props.className}>
      <div id="player-count-set" className="filter-set">
        <label>Number of Players</label>
        <input type="range" name="player-count" min="1" max="10" onChange={(e) => {updateSlider(e)}} defaultValue={defaultPlayerCount} />
        <span>{sliderData}</span>
      </div>

      <div id="category-set" className="filter-set">
        <label onClick={(e) => toggleDropdown(e)}>Categories <FontAwesomeIcon icon={faChevronDown} /></label>
        <div className="filter-dropdown">
          {props.categories.map(x => 
            <div key={x} className="filter-checkbox" data-type="category">
              <input type="checkbox" defaultChecked="true" value={x} onChange={(e) => applyFilter(e)} />
              <label htmlFor={x} onClick={(e) => toggleCheckbox(e)}>{x}</label>
            </div>
          )}
        </div>
      </div>

      <div id="playStyle-set" className="filter-set">
        <label onClick={(e) => toggleDropdown(e)}>Play Styles <FontAwesomeIcon icon={faChevronDown} /></label>
        <div className="filter-dropdown">
          {props.playStyles.map(x => 
            <div key={x} className="filter-checkbox" data-type="playStyle">
              <input type="checkbox" defaultChecked="true" value={x} onChange={(e) => applyFilter(e)} />
              <label htmlFor={x} onClick={(e) => toggleCheckbox(e)}>{x}</label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Filters