const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  messageTwo.textContent = 'Loading...'
  messageOne.textContent = ''

  fetch(`/weather?address=${searchInput.value}`)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
          }
          else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          }
        })
    })
})
