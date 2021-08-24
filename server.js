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


app.get("/", function (req, res) {
    Item.find({}, function (err, item) {
        if(err){
            console.log(err);
        } else {
            if (item.length === 0){
                // // adding items to collection only if database is empty
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
            } else {
                res.render("list", { listTitle: "Today", newListItems: item });
            }
        }
    })
})

app.post("/", function (req, res) {
    const newTask = new Item({
        todo: req.body.newItem
    });
    newTask.save();
    res.redirect("/");
})

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndDelete(checkedItemId, function (err){
        if (err) {
            console.log(err);
        } else {
            console.log("Item with ID: " + checkedItemId + " was successfully removed.");
        }
    });
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