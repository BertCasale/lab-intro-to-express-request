const express = require("express")
const app = express();
const pokemon = require("./models/pokemon.json");

app.get("/", (req, res) => {
  res.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adjective/:noun", (req, res) => {
  const {verb, adjective, noun} = req.params;
  res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`);
});

app.get("/bugs", (req, res) => {
  res.send(`<h1>99 little bugs in the code</h1><a href="/bugs/101" >pull one down, patch it around</a>`);
});

app.get("/bugs/:numberOfBugs", (req, res) => {
  const {numberOfBugs} = req.params;

  if (numberOfBugs >= 200) {
    res.send(`<a href="/bugs" >Too many bugs!! Start over!</a>`);
  } else {
    res.send(`${numberOfBugs} little bugs in the code<a href="/bugs/${Number(numberOfBugs) + 2}" >Pull one down, patch it around</a>`);
  }
});

app.get("/pokemon", (req, res) => {
  res.send(pokemon);
});

app.get("/pokemon/search", (req, res) => {
  const reqName = req.query.name;
  const foundPokemon = pokemon.find((singleMon) => singleMon.name.toLowerCase() === reqName.toLowerCase());

  if (foundPokemon) {
    res.send([foundPokemon]);
  } else {
    res.send([]);
  }
});

app.get("/pokemon/:indexOfArray", (req, res) => {
  const {indexOfArray} = req.params;

  if (pokemon[indexOfArray]){
    res.send(pokemon[indexOfArray]);
  } else {
    res.send(`Sorry, no pokemon found at ${indexOfArray}`);
  }
});

app.get("/pokemon-pretty", (req, res) => {
  res.send(`<ul>${pokemon.map((singleMon, index) => {
    return `<li><a href=/pokemon-pretty/${index} >${singleMon.name}</a></li>`;
  })}</ul>`);
});

app.get("/pokemon-pretty/:indexOfArray", (req, res) => {
  const {indexOfArray} = req.params;
  res.send(`<h1>${pokemon[indexOfArray].name}</h1>
  <img alt=${pokemon[indexOfArray].name} src=${pokemon[indexOfArray].img} />`)
})

app.get("*", (req, res) => {
  res.status(404).send("This is not the page you are looking for");
});

module.exports = app;