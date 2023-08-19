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
        `
            <div style="text-align:center; width:250px; height:300px; margin:auto; background: rgb(33,36,0);
            background: linear-gradient(349deg, rgba(33,36,0,1) 0%, rgba(121,63,9,1) 30%, rgba(255,213,0,1) 81%); border-radius: 8px;">
                <img src=${imgURL} />
                <h2>${city}</h2>
                <h1>${temperature} <sup>o</sup>C</h1>
                <p>The weather is ${weatherDescription}</p>
            </div>
        `
      );
      res.send();
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
