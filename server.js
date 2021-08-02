const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
var items = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newListItem: items});
})

app.post("/", function(req, res) {
    console.log(req.body.newItem);
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server listening to port 3000");
})