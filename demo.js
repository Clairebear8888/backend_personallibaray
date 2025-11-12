// demo.js

const prisma = require("./db/index");

const newCountry = {
  name: "Japan", // Changed to a new country
  favoriteCity: "Tokyo",
  favoriteFood: "Ramen",
  visitedDate: new Date("2023-05-15"),
  flagEmoji: "🇯🇵",
};

prisma.country
  .create({ data: newCountry })
  .then((country) => {
    console.log("Success... a new country was created!!");
    console.log(country);
  })
  .catch((error) => {
    console.log("Something went wrong...");
    console.log(error);
  });
