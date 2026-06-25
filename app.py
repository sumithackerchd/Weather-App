from flask import Flask, render_template, request
import requests
import os
from datetime import datetime

app = Flask(__name__)

# API Key
API_KEY = os.environ.get(
    "API_KEY",
    "54c8bd4711e1585672480df61dcc37ad"
)


@app.route("/", methods=["GET", "POST"])
def home():

    weather = None
    forecast = []
    error = None

    if request.method == "POST":

        city = request.form.get("city")

        if city:

            current_url = (
                f"https://api.openweathermap.org/data/2.5/weather"
                f"?q={city}&appid={API_KEY}&units=metric"
            )

            forecast_url = (
                f"https://api.openweathermap.org/data/2.5/forecast"
                f"?q={city}&appid={API_KEY}&units=metric"
            )

            try:

                current = requests.get(current_url, timeout=10).json()

                if str(current.get("cod")) == "200":

                    weather = {

                        "city": current["name"],

                        "country": current["sys"]["country"],

                        "temp": round(current["main"]["temp"]),

                        "feels_like": round(current["main"]["feels_like"]),

                        "humidity": current["main"]["humidity"],

                        "pressure": current["main"]["pressure"],

                        "visibility": current["visibility"] // 1000,

                        "wind": current["wind"]["speed"],

                        "description": current["weather"][0]["description"].title(),

                        "icon": current["weather"][0]["icon"],

                        "sunrise": datetime.fromtimestamp(
                            current["sys"]["sunrise"]
                        ).strftime("%I:%M %p"),

                        "sunset": datetime.fromtimestamp(
                            current["sys"]["sunset"]
                        ).strftime("%I:%M %p")

                    }

                    future = requests.get(
                        forecast_url,
                        timeout=10
                    ).json()

                    if future.get("cod") == "200":

                        for item in future["list"][::8]:

                            forecast.append({

                                "date": item["dt_txt"].split()[0],

                                "temp": round(item["main"]["temp"]),

                                "icon": item["weather"][0]["icon"],

                                "desc": item["weather"][0]["description"].title()

                            })

                else:

                    error = "City Not Found."

            except Exception:

                error = "Unable to connect with Weather Server."

    return render_template(
        "index.html",
        weather=weather,
        forecast=forecast,
        error=error
    )


if __name__ == "__main__":
    app.run(debug=True,port=5001
            )