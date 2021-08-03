const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
var items = ["Buy food", "Cook food", "Eat food"];
var workItems = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function (req, res) {
    console.log(req.body.newItem);
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.get("/work", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
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