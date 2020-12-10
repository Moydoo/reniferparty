(function () {
  const getData = () => fetch('/get').then(response => response.json())
  const setPercentage = percentageValue => {
    const progressBarLabel = document.querySelector('.progressbar-label');
    const progressBar = document.querySelector('.ui-progressbar-value');
    progressBar.style.width = `${percentageValue}%`;
    progressBarLabel.innerText = `${Math.ceil(percentageValue)}%`
  }

  const update = () => {

    getData().then(data => {
      const values = Object.values(data)
      const count = values.reduce((sum, curr) => sum + (curr ? 1 : 0), 0)
      console.log(count, values.length)
      const percentageValue = 100 * count / values.length
      setPercentage(percentageValue)

      Object.keys(data).map((key => {
        const value = data[key]
        const input = document.querySelector(`[name="${key}"]`)
        if (input) {
          input.checked = value
        }

        console.log(input)
      }))
    })
  }
  update()
})()
