from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = "54c8bd4711e1585672480df61dcc37ad"

@app.route("/", methods=["GET", "POST"])
def home():

    weather = None

    if request.method == "POST":

        city = request.form["city"]

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

        response = requests.get(url)
        data = response.json()

        if data["cod"] == 200:

            weather = {
                "city": city,
                "temp": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"]
            }

    return render_template("index.html", weather=weather)

if __name__ == "__main__":
    app.run(debug=True, port=5001)