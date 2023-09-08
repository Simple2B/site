from datetime import datetime, timedelta
import urllib.parse
import requests
from pydantic import BaseModel
from app.logger import log
from app.config import get_settings
from .markdown import md_quote

CFG = get_settings()


class Weather(BaseModel):
    id: int
    main: str
    description: str
    icon: str


class Coord(BaseModel):
    lon: float
    lat: float


class MainInfo(BaseModel):
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int


class Wind(BaseModel):
    speed: float
    deg: int
    gust: float = 0.0


class Clouds(BaseModel):
    all: int


class Sys(BaseModel):
    type: int = 0
    id: int = 0
    country: str
    sunrise: datetime
    sunset: datetime


class WeatherInfo(BaseModel):
    coord: Coord
    weather: list[Weather]
    base: str
    main: MainInfo
    visibility: float
    wind: Wind
    clouds: Clouds
    dt: datetime
    sys: Sys
    timezone: int
    id: int
    name: str
    cod: int


def get_weather_for_city(name: str, country_code: str = None, state_code: str = None):
    name = urllib.parse.quote(name)
    if country_code:
        if state_code:
            name += f",{urllib.parse.quote(state_code)}"
        name += f",{urllib.parse.quote(country_code)}"

    url = f"https://api.openweathermap.org/data/2.5/weather?q={name}&appid={CFG.WEATHER_API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return WeatherInfo.model_validate(response.json())
    else:
        log(log.INFO, "URL: [%s]", url)
        log(log.ERROR, "Error getting weather for [%s] - %s", name, response.text)
        return None


def weather_to_unicode_symbol(weather: WeatherInfo):
    return {
        "01d": "\U0001F31E",  # clear sky - day
        "02d": "\U0001F324",  # few clouds - day
        "03d": "\U0001F325",  # scattered clouds - day
        "04d": "\U0001F325\U0001F325",  # broken clouds - day
        "09d": "\U0001F326",  # shower rain - day
        "10d": "\U0001F327",  # rain - day
        "11d": "\U0001F329",  # thunderstorm - day
        "13d": "\U0001F328",  # snow - day
        "50d": "\u2635",  # mist - day
        "01n": "\U0001F31A",  # clear sky - night
        "02n": "\U0001F324",  # few clouds - night
        "03n": "\u2601",  # scattered clouds - night
        "04n": "\u2601\u2601",  # broken clouds - night
        "09n": "\U0001F326",  # shower rain - night
        "10n": "\U0001F327",  # rain - night
        "11n": "\U0001F329",  # thunderstorm - night
        "13n": "\U0001F328",  # snow - night
        "50n": "\u2635",  # mist - night
    }[weather.weather[0].icon]


def weather_to_markdown(weather: WeatherInfo):
    if not weather:
        return "City not found"
    return (
        f"{weather_to_unicode_symbol(weather)} *{md_quote(weather.name)}* "
        f"_{weather.weather[0].main}_ "
        f"{round(weather.main.temp)}\u2103 "
        f"Feels like {round(weather.main.feels_like)}\u2103\n"
    )


def weather_to_markdown_full(weather: WeatherInfo):
    sunrise = weather.sys.sunrise + timedelta(seconds=weather.timezone)
    sunset = weather.sys.sunset + timedelta(seconds=weather.timezone)
    return (
        f"{weather_to_unicode_symbol(weather)} *{md_quote(weather.name)}*"
        f"*{weather.weather[0].main}*\n"
        f"{round(weather.main.temp)}\u2103\n"
        f"Feels like {round(weather.main.feels_like)}\u2103\n"
        f"Humidity {weather.main.humidity}%\n"
        f"Wind {weather.wind.speed} m/s\n"
        f"Clouds {weather.clouds.all}%"
        f"Sunrise {sunrise.strftime('%H:%M')}\n"
        f"Sunset {sunset.strftime('%H:%M')}"
    )
