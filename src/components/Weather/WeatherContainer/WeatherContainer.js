import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherContainer.css';
const WeatherContainer = ({weatherData,foreCastData}) => {

    //Get All the Dates
    const dateKey = foreCastData.map((data) => {
        const date = data.dt_txt.split(/[ ]+/)[0];
        return date;
    })
    //Only Keep Distinct Dates
    const distinctDateKey = dateKey.filter((date,index,arr) => {
        return arr.indexOf(date) === index;
    })

    //Group all forecast by dates
    const groupForeCastByDate = distinctDateKey.map(date => {
        return foreCastData.filter(forecast => {
            const dateForeCast = forecast.dt_txt.split(/[ ]+/)[0];
            return date === dateForeCast;
        })
    })
    
  
    //Go to each group array and get its min temp and max temp. get the date. icon
    const foreCast = groupForeCastByDate.map(groupforecast => {
        let min = 100000;
        let max = -100000;
        let date = '';
        let icon = '';
        groupforecast.forEach(forecast => {
          
            if(Number(forecast.main.temp) < min){
                min = Math.ceil(forecast.main.temp);
            }

            if(Number(forecast.main.temp) > max){
                max = Math.ceil(forecast.main.temp);
                const temp = new Date(forecast.dt_txt.split(/[ ]+/)[0])+"";
                date = temp.split(/[ ]+/)[0];
                icon = forecast.weather[0].icon;
            }
        })
        return {
            maxTemp: max,
            minTemp: min,
            date: date,
            icon: icon
        }
    })
    console.log("weather container");
   

    return ( 
   
    <div className="weather">
        <WeatherCard 
        city={weatherData.name} 
        country={weatherData.sys.country}
        description={weatherData.weather[0].main}
        icon={weatherData.weather[0].icon}
        windSpeed={weatherData.wind.speed}
        temp={weatherData.main.temp}
        humidity={weatherData.main.humidity}
        foreCast={foreCast}
        />
    </div> 
    )
}

export default WeatherContainer;