const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const spinWheel = (e, sliceCount, setSpinRotation, setWinningGame) => {
  const spinner = e.target.closest('.spinner');
  const wheelContainer = spinner.nextElementSibling;
  const halfSliceSize = (360 / sliceCount) / 2;
  if (spinner.classList.contains('spinning')) {
    return;
  }

  // make the spinner unspinnable for now
  spinner.classList.add('spinning');
  spinner.innerText = 'Spinning';
  // return selected game (if any) to normal
  const winner = wheelContainer.querySelector('[winner]');
  if (winner) {
    wheelContainer.removeAttribute('winner');
    winner.removeAttribute('winner');
    // document.querySelector('[class*="winner-title"] p').innerText = '';
    setWinningGame('');
  }

  // spin the wheel!
  let origRot = wheelContainer.style.transform;
  if (origRot.includes('rotate')) {
    origRot = Number(origRot.match(/(\d+)/)[0]); // the current degree of rotation if it exists
  }
  else {
    origRot = 0; // 0 is fallback
  }
  const spinRot = randomNumber(origRot + (360 * 3), (origRot + (360 * 8)));
  const origStyle = wheelContainer.getAttribute('style');
  setSpinRotation(spinRot);

  // after 3 seconds, determine the winner
  setTimeout(function() {
    const currentRotation = Number(wheelContainer.style.transform.match(/(\d+)/)[0]);
    // spin arrow points 45 degrees counterclockwise from point 0, so we use 270 as the actual start point
    let sliceDeg = 270 - (currentRotation % 360);
    if (sliceDeg < 0) {
      sliceDeg += 360;
    }
    const sliceMin = sliceDeg - halfSliceSize;
    const sliceMax = sliceDeg + halfSliceSize;

    // find the slice
    Array.from(wheelContainer.querySelectorAll('.game-slice')).every((slice) => {
      const deg = Number(slice.getAttribute('slice-degrees'));
      if (deg >= sliceMin && deg < sliceMax) {
        // declare a winner
        slice.setAttribute('winner', 'true');
        wheelContainer.setAttribute('winner', 'true');
        // document.querySelector('[class*="winner-title"]').innerText = slice.innerText;
        setWinningGame(slice.innerText);

        // reset spinner
        spinner.innerText = 'Spin';
        spinner.classList.remove('spinning');
        document.querySelector('#open-filters').focus();

        // break
        return false;
      }
      return true;
    });
  }, 3200);
}

export { spinWheel }