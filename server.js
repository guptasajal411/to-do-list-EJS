const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// create items schema
const itemsSchema = {
    todo: String
}

// create new mongoose model
const Item = mongoose.model("Item", itemsSchema);

// adding items to collection
const firstTask = new Item({
    todo: "Welcome to the todo list!"
})
const secondTask = new Item({
    todo: "Hit + to create a new task"
})
const thirdTask = new Item({
    todo: "<-- Click this to delete a task" 
})
// array to contain default items
const defaultItems = [firstTask, secondTask, thirdTask];

//inserting default items to collection
Item.insertMany(defaultItems, function(err){
    if (err) {
        console.error(err);
    } else {
        console.log("Default items were successfully inserted.")
    }
}) 

app.get("/", function (req, res) {
    res.render("list", { listTitle: "Today", newListItems: items });
})

app.post("/", function (req, res) {
    console.log(req.body.newItem);
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.post("/work", function (req, res) {
    let item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function () {
    console.log("Server listening to port 3000");
})