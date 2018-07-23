//all imports are in ES5 format as NodeJS does not support ES6 at the time of development of this project
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8000;

// to deal with json requests
app.use(bodyParser.json({extended:true}));

//To enable CORS(Cross Origin Resource Sharing)
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connect to database and start listening for HTTP requests
MongoClient.connect(db.url, { useNewUrlParser: true },(err,database) => {
    if(err)
        return console.log(err);
    //Add the Database Name here and not collection name
    database = database.db("demo_ecommerce_db");

    // import the routes with app(express framework instance) and database as arguments
    require('./app/routes')(app,database);

    //listen to Http requests;
    app.listen(process.env.PORT || port, () => {
        console.log("We are live on port "+ port);
    });
});
