//all imports are in ES6 format
import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import { url } from './config/db';

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
MongoClient.connect(url, (err,database) => {
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
