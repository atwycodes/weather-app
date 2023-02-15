class Data {
  constructor() {
    this.storage = []
  }
  
  async fetchData(city) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6bfadd084bcc2070bb7a4fd60cf21eb3`, {
        mode:"cors"
      })

      const data = await response.json()

      console.log(data)
      
      const info = {
        name: data.name,
        type: data.weather[0].main,
        temperature: Math.round(data.main.temp - 273.15), // convert to celcius
        feelsLike: Math.round(data.main.feels_like - 273.15), // convert to celcius
        humidity: Math.round(data.main.humidity) // in %
      }

      this.storage.shift()
      this.storage.push(info)
      console.log(this.storage[0])
            
      return this.storage[0]
    
    } catch (error) {
      return alert(`Error! City: ${city} not found. Try another city.`)
    }
  }
}

export default Data