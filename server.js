const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    if (currentDay == 6 || currentDay == 0){
        day = "Weekend";
    }
    else{
        day = "Weekday";
    }
    res.render("list", {kindOfDay: day});
})

app.listen(3000, function(){
    console.log("Server listening to port 3000");
})