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
          <body style=" background-color: #1A2421; height: 100vh;display: flex; justify-content: center; align-items: center;">
            <div style=" color:#fd4;text-align:center; width:250px; height:300px; background: rgb(255,255,255);
            background: linear-gradient(193deg, rgba(255,255,255,1) 9%, rgba(162,162,135,1) 41%, rgba(0,0,0,1) 90%); border-radius: 8px; ">
                <img src=${imgURL} />
                <h2>${city}</h2>
                <h1>${temperature} <sup>o</sup>C</h1>
                <p>The weather is ${weatherDescription}</p>
            </div>
            </body>
        `
      );
      res.send();
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
