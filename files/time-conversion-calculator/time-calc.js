(function timeConversionCalculator() {
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('form#time-conversion')
    if (form) {
      e.preventDefault()

      const month = form.querySelector('select#month').value
      const day = form.querySelector('select#day').value
      const time = form.querySelector('input#time').value
      const zone = form.querySelector('select#timezone').value
      const siteOffset = form.querySelector('select#site-offset').value

      const targetYear = getTargetYear(month)
      // we'll put in "ST" in the next line-- it does not matter. it will return the correct DST setting
      const DST = getDST(new Date(`${month} ${day}, ${targetYear} ${time} ${zone}ST`))

      const targetTZ = offsetZones[siteOffset][DST]
      const liveTime = new Date(`${month} ${day}, ${targetYear} ${time} ${zone}${DST}`).toLocaleString('en-US', { timeZone: targetTZ, month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })

      const results = document.querySelector('p.results')
      results.querySelector('span').innerText = liveTime
      results.classList.add('shown')
    }
  })

  document.addEventListener('change', (e) => {
    // on month change
    const month = e.target.closest('form#time-conversion select#month')
    if (month) {
      const daySelect = document.querySelector('form#time-conversion select#day')
      const selectedMonth = month.value

      const targetYear = getTargetYear(selectedMonth)

      // disable dates that will not apply for the selected month
      switch (selectedMonth) {
        case "Feb":
          if (targetYear % 4 !== 0) {
            // disable 29
            daySelect.querySelector('option[value="29"]').setAttribute('disabled', 'true')
            if (daySelect.value.length && Number(daySelect.value) > 28) {
              daySelect.value = '28'
            }
          }
          else if (daySelect.value.length && Number(daySelect.value) > 29) {
            daySelect.value = '29'
          }
          // disable 30, 31
          daySelect.querySelector('option[value="30"]').setAttribute('disabled', 'true')
          daySelect.querySelector('option[value="31"]').setAttribute('disabled', 'true')
          break
        case "Apr":
        case "Jun":
        case "Sep":
        case "Nov":
          // enable 29, 30
          daySelect.querySelector('option[value="29"]').removeAttribute('disabled')
          daySelect.querySelector('option[value="30"]').removeAttribute('disabled')
          // disable 31
          daySelect.querySelector('option[value="31"]').setAttribute('disabled', 'true')
          if (daySelect.value.length && Number(daySelect.value) > 30) {
            daySelect.value = '30'
          }
          break
        default:
          // enable all
          daySelect.querySelector('option[value="29"]').removeAttribute('disabled')
          daySelect.querySelector('option[value="30"]').removeAttribute('disabled')
          daySelect.querySelector('option[value="31"]').removeAttribute('disabled')
          break
      }
    }
  })

})()

const wordMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

const offsetZones = {
  '-4': {
    'DT': 'America/New_York',
  },
  '-5': {
    'ST': 'America/New_York',
    'DT': 'America/Chicago',
  },
  '-6': {
    'ST': 'America/Chicago',
    'DT': 'America/Denver',
  },
  '-7': {
    'ST': 'America/Denver',
    'DT': 'America/Los_Angeles',
  },
  '-8': {
    'ST': 'America/Los_Angeles',
  },
}

function getTargetYear(selectedMonth) {
  const today = new Date()
  let targetYear = today.getFullYear()
  const selMonthIndex = wordMonth.indexOf(selectedMonth)

  if (today.getMonth() > selMonthIndex) {
    targetYear += 1
  }

  return targetYear
}

function getDST(date) {
  return date.toString().split('(')[1].split(' Time')[0].split(' ')[1].charAt(0) + 'T'
}