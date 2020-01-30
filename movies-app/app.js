const express = require("express");
const app = express();
const hbs = require("hbs");
const moviesJSON = require("./movies.json");

app.set("view engine", "hbs");
app.use(express.static("public"));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (request, response) => {
  // console.log([{ a: moviesJSON }]) ❌;
  // response.send([{ a: moviesJSON }]) ✅ only for debugging;
  response.render("index.hbs", {
    moviesList: moviesJSON
  });
});

app.get("/shawshank-redemption", (request, response) => {
  response.render("movie.hbs", {
    data: moviesJSON[0]
  });
});

app.listen(5555);
