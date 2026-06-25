from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)

# OpenWeather API Key
API_KEY = os.environ.get("API_KEY", "54c8bd4711e1585672480df61dcc37ad")


@app.route("/", methods=["GET", "POST"])
def home():

    weather = None
    error = None

    if request.method == "POST":

        city = request.form.get("city")

        if city:

            url = (
                f"https://api.openweathermap.org/data/2.5/weather"
                f"?q={city}&appid={API_KEY}&units=metric"
            )

            try:
                response = requests.get(url, timeout=10)
                data = response.json()

                if response.status_code == 200:

                    weather = {
                        "city": data["name"],
                        "temp": round(data["main"]["temp"]),
                        "description": data["weather"][0]["description"].title(),
                        "humidity": data["main"]["humidity"],
                        "feels_like": round(data["main"]["feels_like"]),
                        "pressure": data["main"]["pressure"],
                        "wind": data["wind"]["speed"],
                        "icon": data["weather"][0]["icon"],
                    }

                else:
                    error = "City not found."

            except Exception:
                error = "Unable to fetch weather data."

    return render_template(
        "index.html",
        weather=weather,
        error=error
    )


if __name__ == "__main__":
    app.run()