const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const newItems = [];
const workItems = [];

app.get("/", function (req, res) {
  
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItems: newItems });
});

app.post("/", function (req, res) {
  let item = req.body.addItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    newItems.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work Title", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
