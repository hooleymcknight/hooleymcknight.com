import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFilter, faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';



const Filters = (props) => {
  // const [sliderData, setSliderData] = useState(props.numberOfPlayers);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    props.onApply('playerCount', props.sliderData, null, document.querySelector('input[name="player-count"]'));
  }, []);

  function updateSlider(value) {
    props.onApply('playerCount', value, null, document.querySelector('input[name="player-count"]'));
  }

  function toggleCheckbox(e) {
    const checkbox = e.target.closest('.filter-checkbox').querySelector('input');
    checkbox.click();
  }

  function applyFilter(e) {
    const type = e.target.closest('.filter-checkbox').getAttribute('data-type');
    const data = e.target.value;
    const dataValue = e.target.checked;
    props.onApply(type, data, dataValue, e.target);
  }

  function toggleDropdown(e) {
    const filterSet = e.target.closest('.filter-set');
    if (filterSet.classList.contains('open-filter')) {
      filterSet.classList.remove('open-filter');
    }
    else {
      // const prevFilter = document.querySelector('.filter-set.open-filter');
      // if (prevFilter) prevFilter.classList.remove('open-filter');
      filterSet.classList.add('open-filter');
    }
  }

  function toggleFilterTray(e) {
    if (e.target.closest('#open-filters')) {
      if (window.outerWidth <= 500) {
        document.documentElement.dataset.scrollLocked = true;
      }
      setFiltersOpen(true);
    }
    else if (e.target.closest('#close-filters')) {
      document.documentElement.dataset.scrollLocked = false;
      setFiltersOpen(false);
    }
  }

  function resetAllFilters() {
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      if (input.type === 'range') {
        return;
      }
      input.checked = true;

      const type = input.closest('.filter-checkbox').getAttribute('data-type');
      const data = input.value;
    });
    props.resetFilters();
  }

  const confettiToggleHandler = () => {
    if (props.confettiAllowed) {
      props.onToggleConfetti(false);
    }
    else {
      props.onToggleConfetti(true);
    }
  }

  return (
    <>
      <button
        className={props.toggleClassName}
        type="button" id="open-filters"
        aria-roledescription="open the filter tray"
        onClick={(e) => toggleFilterTray(e)}
      >
        <FontAwesomeIcon icon={faSliders} />
        Filters &amp; Options
      </button>
      <div className={props.className} data-open={filtersOpen}>
        <div className="filters-top-bar">
          <h1>Filters & Options</h1>
          <button
            type="button" id="close-filters"
            aria-roledescription="close the filter tray"
            onClick={(e) => toggleFilterTray(e)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div id="player-count-set" className="filter-set">
          <label>Number of Players</label>
          <div>
            <input type="range" name="player-count" min="1" max="10" onChange={(e) => {updateSlider(e.target.value)}} defaultValue={props.defaultPlayerCount} />
            <span>{props.sliderData}</span>
          </div>
        </div>

        <div id="reset-filters" className="filter-set">
          <button onClick={resetAllFilters}>
            Reset Filters
          </button>
        </div>

        <div id="game-pack-set" className="filter-set open-filter">
          <label onClick={(e) => toggleDropdown(e)}>Party Packs <FontAwesomeIcon icon={faChevronDown} /></label>
          <div className="filter-dropdown">
            {props.partyPacks.map(x =>  // change this stuff
              <div key={x} className="filter-checkbox" data-type="pack">
                <input type="checkbox" defaultChecked="true" value={x} onChange={(e) => applyFilter(e)} />
                <label htmlFor={x} onClick={(e) => toggleCheckbox(e)}>{x}</label>
              </div>
            )}
          </div>
        </div>

        <div id="category-set" className="filter-set open-filter">
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

        <div id="playStyle-set" className="filter-set open-filter">
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

        <div className="filter-set open-filter" data-confetti-allowed={props.confettiAllowed}>
        <label onClick={(e) => toggleDropdown(e)}>Options <FontAwesomeIcon icon={faChevronDown} /></label>
          <div className="filter-dropdown">
            <div id="confetti-toggle-container">
              <p>Toggle Confetti</p>
              <button className="confetti-toggle" onClick={confettiToggleHandler}>
                <div className="toggle-switch"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;