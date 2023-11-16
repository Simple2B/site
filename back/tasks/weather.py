from invoke.tasks import task


# show weather for city
@task(optional=["country_code", "state_code"])
def weather(
    c,
    city: str,
    country: str | None = None,
    state: str | None = None,
):
    """Show weather for city"""
    from app import controller as c

    info = c.get_weather_for_city(city)
    print(c.weather_to_markdown(info))
