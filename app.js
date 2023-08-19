const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  //   console.log(req.body);
  const query = req.body.cityName || "Gumia";
  const apiKey = "25800ea64262097a3498c00ad2ad6563";
  const unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;

      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in ${city} is ${temperature} <sup>o</sup>Celcius.</h1>`
      );
      res.write(`<p>The weather is ${weatherDescription}</p>`);
      res.write(`<img src=${imgURL} />`);
      res.send();
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
