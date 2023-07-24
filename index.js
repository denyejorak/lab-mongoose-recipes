const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Chicken Katsu Curry",
      level: "Amateur Chef",
      ingredients: [
        "4 Chicken breast",
        "2 Cup of rice",
        "2 Potatoes",
        "2 Carrots",
        "2 Golden Curry blocks",
        "4 eggs",
        "Panko Breadcrumbs",
        "500ml of water",
      ],
      cuisine: "Japanese",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef Me",
    });
  })
  .then((recipe) => {
    console.log(`This Recipe: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log("-", recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log(`Recipe Deleted`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    console.log(`Bon Appetit - Disconnected`);
    mongoose.disconnect();
  });
