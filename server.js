'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

// ----------------------------------------------
// Route Definitions
// ----------------------------------------------

app.get('/', (req, res) => {
    // Go to google and find stuff
    // Save thing in the database
    // Do other work
    // Send out something
    res.status(200).send('This server is working');
  });
app.get('/hello', helloHandler);
app.use('*', handleNotFound);
app.use(handleError);

// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

// handles any route that wasn't defined and gives a good messsage

function helloHandler(req, res){
    //RENDER THE INDEX.EJS FILE
    res.render('pages/index');

}

function handleNotFound(req, res) {
    res.status(404).send('Could Not Find What You Asked For');
}
  
  // 500 (catastrophic) error handler. Log it, and then tell the user
function handleError(error, req, res, next) {
console.error(error);
res.status(500).send('Something Bad Happened')
}


  app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
