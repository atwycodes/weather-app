class Display {
  constructor(data) {
    this.data = data
  }

  // helper method
  createElement(type, selector) {
    const element = document.createElement(type)
    element.classList.add(selector)
    return element
  }

  // helper method
  getElement (selector) {
    const element = document.querySelector(selector) 
    
    return element
  }

// code rendering the header
  header () {
    const main = this.getElement('#content')
    const header = this.createElement('div', 'header')
    
    const headerTitle = this.createElement('h1', 'header__title')
    headerTitle.textContent = 'Weather App'
    
    header.append(headerTitle)
    main.append(header)
  }
  

// code rendering the body
  body () {
    const main = this.getElement('#content')
    const body = this.createElement('div', 'body')
    const cardContainer = this.createElement('div', 'card-container')

    main.append(body)
    this.form()
    body.append(cardContainer)
  }

  form () {
    const body = this.getElement('.body')
    const form = this.createElement('form', 'form')
    form.addEventListener('submit', () => {
      this.formHandleSubmit()
    })
    
    const formTitle = this.createElement('input', 'form__title')
    formTitle.setAttribute('type', 'text')
    formTitle.setAttribute('required', '')
    formTitle.setAttribute('placeholder', 'Enter location...')
    formTitle.textContent = ''

    const formSearchBtn = this.createElement('button', 'form__search-btn')
    formSearchBtn.setAttribute('type', 'submit')
    formSearchBtn.textContent = 'Search'

    form.append(formTitle, formSearchBtn)
    body.append(form)
  }

  weatherCard (info) {
    const body = this.getElement('.body')
    const cardContainer = this.getElement('.card-container')
    body.append(cardContainer)

    const card = this.createElement('div', 'weather__card')

    const location = this.createElement('div', 'weather__location')
    location.textContent = info.name

    const weather = this.createElement('div', 'weather__type')
    weather.textContent = info.type

    const temperature = this.createElement('div', 'weather__temperature')
    temperature.textContent = `Temperature : ${info.temperature} °C`

    const feelsLike = this.createElement('div', 'weather__feels-like')
    feelsLike.textContent = `Feels like : ${info.feelsLike} °C`

    const humidity = this.createElement('div', 'weather__humidity')
    humidity.textContent = `Humidity : ${info.humidity} %`


    card.append(location,weather,temperature,feelsLike,humidity)
    cardContainer.append(card)
  }

  async formHandleSubmit () {
    event.preventDefault()
    await this.storeInput()
    console.log(this.data.storage[0])
    
    this.clearBody()
    this.body()
    this.weatherCard(this.data.storage[0])
  }

  clearBody () {
    const main = this.getElement('.body')

    while (main.firstChild) {
      main.removeChild(main.lastChild)
    }
  }

  async storeInput() {
    const formTitle = this.getElement('.form__title')
    await this.data.fetchData(formTitle.value)
  }

  async initialWeather () {
    await this.data.fetchData('Kuala Lumpur')
  }

// code rendering the footer
  footer () {
    const main = this.getElement('#content')
    const footer = this.createElement('div', 'footer')
    footer.textContent = 'created by @atwycodes'

    main.append(footer)
  }
 
  async initialLoad() {
    this.header()
    this.body()
    this.footer()
    await this.initialWeather()
    this.weatherCard(this.data.storage[0])
  }
}

export default Display