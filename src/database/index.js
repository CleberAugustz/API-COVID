"use strict";
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function () {
    console.log("Connected Database");
});
