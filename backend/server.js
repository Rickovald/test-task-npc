const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()
const app = express();

const users = require('./users')
const articles = require('./articles')


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello there" });
});

// user routes
app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)

// article routes
app.get('/articles', articles.getArticles)
app.get('/articles/:id', articles.getArticleById)
app.post('/articles', articles.createArticle)
app.put('/articles/:id', articles.updateArticle)
app.delete('/articles/:id', articles.deleteArticle)


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
