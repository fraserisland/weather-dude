import React from 'react'
import axios from 'axios'

class Report extends React.Component{
    state = {
        city: '',
        tempHigh: '',
        tempLow: '',
        conditionDay: '',
        conditionNight: '',
    }

    componentDidMount(){
        if(this.props.location.state){
            let recentSearch = this.props.location.state.recentSearch
            this.searchWeather(recentSearch)
        }
    }

   currentCondition = (condition) => {
       let text;
       switch(condition){
        case "Sunny": 
            text = "sunny"
            break;
        case "Mostly sunny" || "Partly Sunny":
            text = "mostly-sunny"
            break;
        case "Mostly Cloudy" || "Cloudy" || "Intermittent Clouds":
            text = "mostly-cloudy"
            break;
        case "Rain": 
            text = "rain"
            break;
        case "T-Storms": 
            text = "storms"
            break;
        case "Partly Sunny w/ T-Storms" || "Partly Sunny w/ Showers": 
            text = "sunny-storm"
            break;
        default: 
            text = "default-weather"
       }
       return text
   }

    toCelsius = (f) => {
        return Math.round((5/9) * (f-32))
    }

    addToLocal = (city) => {
        let uniqueArr

        if(localStorage.getItem('cities')){
            uniqueArr = JSON.parse(localStorage.getItem('cities')).filter(n => n)
        } else {
            uniqueArr = []
        }
        let modifiedArr = Array.from(new Set(uniqueArr.concat(city)))

        localStorage.setItem('cities', JSON.stringify(modifiedArr))
    }  

    searchWeather = (e = this.state.recentSearch) => {
        let normCity
        let city
        if(e.target){
            e.preventDefault()
            normCity = [e.target.elements.city.value.trim()]
            city = e.target.elements.city.value.split(' ').join('')
        } else {
            normCity = e.trim()
            city = e.split(' ').join('')
        }

        this.setState({ city: normCity })
        this.addToLocal(normCity)

            axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=qaXkj39UqGgoT3RUaqCFGwAReq04tElD&q=${city}&language=en&details=false&offset=0 HTTP/1.1`)
            .then((results) => { 

                axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${results.data["0"].Key}?apikey=qaXkj39UqGgoT3RUaqCFGwAReq04tElD&language=en`)
                .then((forecast) => {

                    let report = forecast.data.DailyForecasts["0"]

                    this.setState({tempHigh: this.toCelsius(report.Temperature.Maximum.Value),
                                   tempLow: this.toCelsius(report.Temperature.Minimum.Value),
                                   conditionDay: report.Day.IconPhrase,
                                   conditionNight: report.Night.IconPhrase})
                })
            })
            .catch((err) => { console.log('error: ' + err.message) })
    }

    render(){
        const { city, tempHigh, tempLow, conditionDay, conditionNight } = this.state
        return (
            <div className="report">
                <form className= "report--form" onSubmit={this.searchWeather}>
                    <input className="report--input" name="city" />
                </form>
                <div className= "report--results">
                { tempLow || this.props.location.state ? 
                    <div className= "report--results--exists">
                        <p> Heres the report for { city } </p>
                        <div className={this.currentCondition( conditionDay)}>
                            <p> Day time condition: { conditionDay } </p>
                            <p> Temp High: { tempHigh } ℃ </p>
                            <p> Night time condition: { conditionNight } </p>
                            <p> Temp Low: { tempLow } ℃ </p>
                        </div>
                    </div>
                :  <p> Search anywhere! </p> }
                </div>
            </div>
        )
    }
}

export default Report