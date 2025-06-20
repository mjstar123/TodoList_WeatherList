import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./weather.css";

const fetchWeather = async (city) => {
  const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=&units=metric`);
  if (!currentRes.ok) throw new Error(currentRes.statusText);
  const currentData = await currentRes.json();
  return { current: currentData };
};
const fetchForecast = async (city) => {
  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&appid=&units=metric`);
  if (!forecastRes.ok) throw new Error(forecastRes.statusText);
  const forecastData = await forecastRes.json();
  return { forecast: forecastData };
}

export default function Weather() {
  const [city, setCity] = useState("Seoul");
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({ current: null });
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState({ forecast: null });
  const [now, setNow] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [realname, setRealname] = useState({ current: null });
  const [seoul, setSeoul] = useState(null);

  useEffect(() => {
    const fetchSeoul = async () => {
      try {
        const resSeoul = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&lang=en&appid=&units=metric`);
        if (!resSeoul.ok) throw new Error(resSeoul.statusText);
        const seouldata = await resSeoul.json();
        setSeoul(seouldata);
      } catch (err) {
        console.error("서울 날씨 불러오기 실패:", err.message);
      }
    };
    fetchSeoul();
  }, []);

  const loadWeather = (selectedCity) => {
    fetchWeather(selectedCity)
      .then(result => { setData(result); setRealname(result) })
      .catch(err => setError(err.message));

    fetchForecast(selectedCity)
      .then(result => setForecast(result))
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!data.current || !forecast.forecast || !forecast.forecast.list) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [data, forecast]);

  if (!data.current || !forecast.forecast || !forecast.forecast.list) {
    return (
      <div className="leftmargin">
        <p>Loading...</p>
        {showError &&
          <>
            <button onClick={() => window.history.back()} className='todobutton2'>Todo</button><br />
            <p>코드 내에서 api의 key값을 입력해주지 않았음</p>
            <p>코드 내에서 모든 fetch()괄호 안에 MYAPI부분 입력 해주어야함(fetch는 3개 있음)</p>
          </>
        }
      </div>
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(inputCity);
      setInputCity("");
    }
  };

  const getDateStr = (daysAhead) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split("T")[0];
  };

  const getDateDisplayStr = (daysAhead) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString();  // 날짜 오류 해결 위해서 toISOString()와 달리 또 적어줌.
  };

  const tomorrowStr1 = getDateStr(1);
  const dayAfterTomorrowStr1 = getDateStr(2);
  const thirdDayStr1 = getDateStr(3);
  const days1 = [];
  days1[1] = tomorrowStr1;
  days1[2] = dayAfterTomorrowStr1;
  days1[3] = thirdDayStr1;

  const tomorrowStr2 = getDateDisplayStr(1);
  const dayAfterTomorrowStr2 = getDateDisplayStr(2);
  const thirdDayStr2 = getDateDisplayStr(3);
  const days2 = [];
  days2[1] = tomorrowStr2;
  days2[2] = dayAfterTomorrowStr2;
  days2[3] = thirdDayStr2;

  const getForecastByDate = (dateStr) => {
    return forecast.forecast.list.filter(item => item.dt_txt.startsWith(dateStr));
  };

  const day = [];
  day[1] = getForecastByDate(tomorrowStr1);
  day[2] = getForecastByDate(dayAfterTomorrowStr1);
  day[3] = getForecastByDate(thirdDayStr1);

  if (error) {
    return (
      <div className='buttons'>
        <p>Error:{error}</p>
        <h4>Todo로 돌아가기</h4>
        <button onClick={() => window.history.back()} className='todobutton1'>Todo</button><br />
        <h4>페이지 새로 고침</h4>
        <button onClick={() => window.location.reload()} className='weatherbutton'>날씨</button>
        <p>해당 url은 존재하지 않음</p>
        <p>- 1.도시이름을 잘못 입력했음.</p>
        <p>- 2.띄어쓰기 조심해주세요(ex-New York)</p>
      </div>
    );
  }

  return (
    <figure>
      <div className='weather1'>
        <div className='weather2'>
          <div className='weather3'>
            <Link to="/">Todo</Link>
          </div>
          <div>
            <input
              type="text"
              placeholder="도시 이름 입력 후 Enter(영어로)"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className='weather4'
            />
          </div>
        </div>
        <div className='weather5'>
          <div>
            <p>{realname.current.name} ({realname.current.sys.country})</p>
            <img
              src={`https://openweathermap.org/img/wn/${realname.current.weather?.[0]?.icon}.png`}
              alt={realname.current.weather[0].main}
              className='weather6'
            />
            <figcaption>
              {realname.current.main.temp}°C - {realname.current.weather[0].description}
            </figcaption>
          </div>
        </div>
        <div className='weather7'>
          <div>
            <p>서울 날씨</p>
            <img
              src={`https://openweathermap.org/img/wn/${seoul.weather?.[0]?.icon}.png`}
              alt={seoul.weather[0].main}
              className='weather8'
            />
            <figcaption>
              {now.toLocaleDateString()} {(now.toLocaleTimeString())} <br /> {seoul.main.temp}°C - {seoul.weather[0].description}
            </figcaption>
          </div>
        </div>
      </div>
      <div className='weather9'>
        {[1, 2, 3].map(i => (
          <React.Fragment key={i} >
            <p>{i} 일 후 ({days2[i]}) ({realname.current.name})</p>
            <ul key={i} className='weather10'>
              {day[i].map(item => (
                <li key={item.dt} className='weather11'>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].main}
                  />
                  <figcaption>
                    {item.dt_txt.slice(11, 16)} - {item.main.temp}°C - {item.weather[0].description}
                  </figcaption>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </figure>

  );
}