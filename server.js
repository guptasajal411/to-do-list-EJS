const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

app.get("/", function(req, res){
    res.send("GET request successful.");
})

app.listen(3000, function(){
    console.log("Server listening to port 3000");
})