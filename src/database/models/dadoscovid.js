const mongoose = require("mongoose");

module.exports = mongoose.model("covidPiracicaba", {
  city: { type: String },
  city_ibge_code: { type: String },
  confirmed: { type: Number },
  confirmed_per_100k_inhabitants: { type: Number },
  date: { type: Date },
  death_rate: { type: Number },
  deaths: { type: Number },
  estimated_population: { type: Number },
  estimated_population_2019: { type: Number },
  is_last: { type: Boolean },
  order_for_place: { type: Number },
  place_type: { type: String },
  state: { type: String },
});
