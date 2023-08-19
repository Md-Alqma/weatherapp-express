const express = require("express");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=Gumia&appid=25800ea64262097a3498c00ad2ad6563&units=metric";

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
    });
  });
  res.send("Server is up and running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
