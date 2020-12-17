(function () {
  const getData = () =>
    fetch('/get')
      .then(response => response.json())

  const setValue = (id, value) =>
    fetch(`/set/${id}/${value ? 'true' : 'false'}`)
      .then(response => response.json())

  const setPercentage = percentageValue => {
    const progressBarLabel = document.querySelector('.progressbar-label');
    const progressBar = document.querySelector('.ui-progressbar-value');
    progressBar.style.width = `${percentageValue}%`;
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

  setInterval(() => getData().then(update), 3e3)

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
