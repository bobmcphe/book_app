'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const { response } = require('express');

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
    res.status(200).send('This server is working');
  });
app.get('/hello', helloHandler);
// app.get('/form-with-get', handleSearch)
app.get('/searches/new', registerForm);
app.post('/searches', postSearchThing);


app.use('*', handleNotFound);
app.use(handleError);

// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

// function handleSearch (req,res) {
//     let bookObjArr = [];
//     let title = req.query.title;
//     let author = req.query.author;
//     const API = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=AIzaSyD0kg3D3tRoFiFU7V5h8BWaHlEPY1oGyUU`
//     console.log(`API call: ${API}`)
//     superagent.get(API)
//         .then(obj =>{ //obj is the response. .body is inside the envelope (obj)
//             console.log(`object.items line 50: ${obj.body.items}`);
//             obj.body.items.forEach(book =>{
//                 let bookObj = new Book(book);
//                 bookObjArr.push(bookObj);
//                 //console.log(book.volumeInfo.industryIdentifiers);
//             })
//         res.status(200).json(bookObjArr);
//         // console.log(`book object array line 56: ${bookObjArr}`);
//         })
//         .catch(error => {
//             // console.log(`error with Bookhandler: ${error}`)
//             res.status(500).send(error);
//         });
// }

function postSearchThing (req, res) {
let bookObjArr = [];
let title = req.body.title; //does body go here? It was already body below...but I thought 'get' doesn't use it?
let author = req.body.author;
const API = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=AIzaSyD0kg3D3tRoFiFU7V5h8BWaHlEPY1oGyUU`
console.log(`API call: ${API}`)
superagent.post(API)
    .then(obj =>{ //obj is the response. .body is inside the envelope (obj)
        console.log(`object.items line 50: ${obj.body.items}`);
        obj.body.items.forEach(book =>{
            let bookObj = new Book(book);
            bookObjArr.push(bookObj);
            //console.log(book.volumeInfo.industryIdentifiers);
        });
    // res.status(200).json(bookObjArr);
    res.render('pages/searches/show', {books: bookObjArr});
    // console.log(`book object array line 56: ${bookObjArr}`);
    })
    .catch(error => {
        console.log(`error with Bookhandler: ${error}`)
        res.status(500).send(error);
    });
}


function Book(obj) {
    this.book_description= obj.volumeInfo.description;
    this.author= obj.volumeInfo.authors || 'None';
    this.title = obj.volumeInfo.title;
    // this.isbn = obj.volumeInfo.industryIdentifiers.identifier || 'Error: no ISBN';
    this.thumbnail = obj.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
  }

function registerForm (req,res) {
    res.render('pages/searches/new');
}

// function handleSearch(req,res){
//     console.log(req.query);
//     res.send(`Form with GET ... ${req.query.title}`)
//     //res.render('pages/searches/new', { formdata: req.query }); added this to save
// }


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
