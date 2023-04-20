import React, { useEffect, useState } from 'react'
import c from './Weather.module.scss'
import axios from 'axios'

const Weather = () => {
  const [data, setData] = useState({ celcius: 10, name: 'London', humidity: 10, speed: 2, image: '', country: 'UK', img: './../../../images/sunny.svg' })
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let date = new Date()
  let day = date.getDay()
  const [search, setSearch] = useState('')
  const searchCity = () => {
    if (search !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&appid=5a7167e86d4190d0c7cac2841298eee8&units=metric`
      axios.get(apiUrl)
        .then(res => {
          let imagePath = './../../../images/sunny.svg'
          if (res.data.weather[0].main === 'Clouds') imagePath = './../../../images/cloudy.svg'
          if (res.data.weather[0].main === 'Clear') imagePath = './../../../images/sunny.svg'
          if (res.data.weather[0].main === 'Rain') imagePath = './../../../images/rainy.svg'
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            country: res.data.sys.country,
            img: imagePath
          })
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div className={c.container}>
      <div className={c.search}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <div className={c.loupe} onClick={searchCity}>
          <img src="./../../../images/loupe.svg" alt="" />
        </div>
      </div>
      <div className={c.date}>
        <span>{days[day]}</span>
        <span>{date.getHours()}:{String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + date.getMinutes()}</span>
      </div>
      <div className={c.city}>{data.name}, {data.country}</div>
      <div className={c.temp}>{Math.round(data.celcius)}°С</div>
      <div className={c.image}>
        <img src={data.img} alt="" />
      </div>
      <div className={c.other}>
        <div className={c.humidity}>Влажность {data.humidity}%</div>
        <div className={c.wind}>Ветер {Math.round(data.speed)} м/с</div>
      </div>
    </div>
  )
}

export default Weather