(function () {
  document.querySelectorAll('.tlen, .swiat, .reactor').forEach(element => {
    element.addEventListener("click", () => {
      element.classList.toggle("greyscale1")
      const name = element.getAttribute('data-name')
      const state = element.classList.contains('greyscale1')
      setState(name, state)
    })
  })
  document.addEventListener("keydown", event => {
    const element = document.querySelector(`[data-key="${event.key}"]`)
    if (element) {
      element.click()
    }
  })

  const getData = () =>
    fetch('/get')
      .then(response => response.json())

  const getState = () =>
    fetch('/getstate')
      .then(response => response.json())

  const setValue = (id, value) =>
    fetch(`/set/${id}/${value ? 'true' : 'false'}`)
      .then(response => response.json())

  const setState = (id, value) =>
    fetch(`/state/${id}/${value ? 'true' : 'false'}`)
      .then(response => response.json())

  const setPercentage = percentageValue => {
    const progressBarLabel = document.querySelector('.progressbar-label')
    const progressBar = document.querySelector('.ui-progressbar-value')
    progressBar.style.width = `${percentageValue}%`
    progressBarLabel.innerText = `${Math.ceil(percentageValue)}%`
  }

  const update = data => {
    const values = Object.values(data)
    const count = values.reduce((sum, curr) => sum + (curr ? 1 : 0), 0)
    const percentageValue = 100 * count / values.length
    setPercentage(percentageValue)

    Object.keys(data).map((key => {
      const value = data[key]
      const input = document.querySelector(`[name="${key}"]`)
      if (input) {
        input.checked = value
      }
    }))
  }

  const updateState = state => {
    Object.keys(state).map((key => {
      const value = state[key]
      const element = document.querySelector(`[data-name="${key}"]`)
      if (element) {
        if (value) {
          element.classList.add('greyscale1')
        } else {
          element.classList.remove('greyscale1')
        }
      }
    }))
  }

  setInterval(() => {
    getState().then(updateState)
    getData().then(update)
  }, 3e3)

  document.querySelectorAll('label input').forEach(
    input => input.addEventListener('click', event => {
      event.preventDefault()
      event.stopPropagation()
      const id = event.target.getAttribute('name')
      const value = event.target.checked
      console.log(id, value)

      setValue(id, !!value).then(update)
    })
  )
})()
