const toggleProject = (e) => {
  if (e.type === 'keyup' && e.key !== 'Enter') return

  const minimizedProjectTarget = e.target.closest('.project:not([project-active]), .project-clickable, .project:not([project-active]) .project-inner')
  const closeBtn = e.target.closest('.close-x')

  if (minimizedProjectTarget && !closeBtn) {
    const minimizedProject = minimizedProjectTarget.closest('.project')
    
    const prevProject = minimizedProject.parentElement.querySelector('[project-active]')
    if (prevProject) {
      prevProject.removeAttribute('project-active')
      prevProject.setAttribute('tabIndex', '0')
    }
    
    minimizedProject.setAttribute('project-active', '')
    minimizedProject.setAttribute('tabIndex', '-1')

    if (e.type === 'keyup') {
      minimizedProject.querySelector('button.close-x').focus()
    }
  }
}

const closeProject = (e) => {
  const activeProject = e.target.closest('.project[project-active]')
  if (activeProject) { // this should always be true but I dont mind the extra check
    activeProject.removeAttribute('project-active')
    activeProject.setAttribute('tabIndex', '0')
  }
}

const focusHandler = (e) => {
  const clickable = e.target.closest('.project-clickable, .project-inner')
  const focused = e.target.closest('.project[focused]')
  if (clickable && !focused) {
    e.target.closest('.project').setAttribute('focused', '')
  }
}

const blurHandler = (e) => {
  const focused = e.target.closest('.project[focused]')
  if (focused) {
    focused.removeAttribute('focused')
  }
}

const copyableHandler = (e) => {
  const target = e.target.closest('.copyable')
  if (!target) return
  if (e.type === 'keyup' && e.key !== 'Enter') return

  const copied = target.closest('.blurb').querySelector('.copied')
  const copyText = target.innerText
  if (copied) {
    copied.remove()
  }
  const sampleTextarea = document.createElement("textarea")
  document.body.appendChild(sampleTextarea)
  sampleTextarea.value = copyText
  sampleTextarea.select()
  document.execCommand("copy")
  document.body.removeChild(sampleTextarea)

  // pop-up saying "copied!"
  target.insertAdjacentHTML('beforeend', '<span class="copied">Copied!</span>')

  target.focus()

  setTimeout(function() {
    const newCopied = target.closest('.blurb').querySelector('.copied')
    newCopied.classList.add('fading')
    setTimeout(() => { newCopied.remove() }, 3100)
  }, 1200)
}

export { toggleProject, closeProject, focusHandler, blurHandler, copyableHandler }