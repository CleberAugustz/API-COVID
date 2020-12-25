require("dotenv").config({
  path: ".env",
});
require("./database/connectiondb");
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const dadoscovid = require("./database/models/dadoscovid");

const app = express();

app.use(express.json());

app.get("/dados", async (req, res) => {
  try {
    let retorno = await dadoscovid.findOne({}).sort({ field: "asc", _id: -1 });
    return res.status(200).json(retorno);
  } catch (error) {
    console.log(error.message);
    return res.status(error.status);
  }
});

cron.schedule("00 00 08 * * *", async () => {
  console.log("as 8 da manhã");
  await axios({
    method: "GET",
    url: process.env.DADOSCOVID,
    headers: {
      Authorization: `token ${process.env.DEV_KEY}`,
    },
  })
    .then(async (response) => {
      let results = response.data.results;
      let retorno = await new dadoscovid({
        city: results[0].city,
        city_ibge_code: results[0].city_ibge_code,
        confirmed: results[0].confirmed,
        confirmed_per_100k_inhabitants:
          results[0].confirmed_per_100k_inhabitants,
        date: results[0].date,
        death_rate: results[0].death_rate,
        deaths: results[0].deaths,
        estimated_population: results[0].estimated_population,
        estimated_population_2019: results[0].estimated_population_2019,
        is_last: results[0].is_last,
        order_for_place: results[0].order_for_place,
        place_type: results[0].place_type,
        state: results[0].state,
      });
      await retorno.save();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Online");
});
