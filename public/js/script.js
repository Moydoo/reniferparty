(function() {
  let value = 0;
  const progressBarLabel = document.querySelector('.progressbar-label');
  const progressBar = document.querySelector('.ui-progressbar-value');
  progressBar.style.width = `${value}%`;
  progressBarLabel.innerText = '0%';
  const labels = document.querySelectorAll('label')
  labels.forEach((label, i) => {
    const input = label.querySelector('input');
    input.addEventListener('change', event => {
      if (event.target.checked) {
        value++;
      } else {
        value--;
      }
      const percentageValue = (value / labels.length) * 100
      progressBar.style.width = `${percentageValue}%`;
      progressBarLabel.innerText = `${Math.ceil(percentageValue)}%`
    })
  });
})()
