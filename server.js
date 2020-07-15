'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const { response } = require('express');

const client = new pg.Client(process.env.POSTGRES);

const app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');

app.use(cors());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

// ----------------------------------------------
// Route Definitions
// ----------------------------------------------

app.get('/', retrieveBooks);
app.get('/searches/new', registerForm);
app.post('/searches', postSearchThing); //line 72
app.get('/books/:id', singleBookHandler);
app.post('/addBook', addBook); //line 120
app.get('/update', showForm);
// app.post('/update', updateBook);
app.put('/update/books/:id');
app.use('*', handleNotFound);
app.use(handleError);

function showForm(req, res) {
    res.render('pages/edit')
}

function updateBook(req, res){
    res.render('pages')
}

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
superagent.get(API)
    .then(obj => { //obj is the response. .body is inside the envelope (obj)
        console.log(`object.items line 50: ${obj.body.items}`);
        obj.body.items.forEach(book =>{
            let bookObj = new Book(book);
            bookObjArr.push(bookObj);
            console.log(book.volumeInfo.industryIdentifiers);
        });
    console.log(bookObjArr);
    // res.status(200).json(bookObjArr);
    res.render('pages/searches/show', {books: bookObjArr});
    // console.log(`book object array line 56: ${bookObjArr}`);
    })
    .catch(error => {
        console.log(`error with postsearchthing: ${error}`)
        res.status(500).send(error);
    });
}
//result = binaryCondition ? valueReturnedIfTrue : valueReturnedIfFalse;
//below uses short circuits and ternary operators
function Book(obj) {
    this.title = (obj.volumeInfo.title) ? obj.volumeInfo.title : 'no title';
    this.book_description = (obj.volumeInfo.description) ? obj.volumeInfo.description : 'no description';
    this.author = (obj.volumeInfo.authors) ? obj.volumeInfo.authors : 'None';
    this.title = (obj.volumeInfo.title) ? obj.volumeInfo.title : 'No title';
    this.isbn = (obj.volumeInfo.industryIdentifiers) ? obj.volumeInfo.industryIdentifiers[0].identifier : 'Error: no ISBN';

    //this.isbn = (typeof(obj.volumeInfo.industryIdentifiers) !=='undefined' ? obj.volumeInfo.industryIdentifiers.identifier : 'no isbn');
    this.thumbnail = (obj.volumeInfo.imageLinks) ? obj.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
}
function registerForm (req,res) {
    res.render('pages/searches/new');
}
// function handleSearch(req,res){
//     console.log(req.query);
//     res.send(`Form with GET ... ${req.query.title}`)
//     //res.render('pages/searches/new', { formdata: req.query }); added this to save
// }
function addBook(req, res) {
    console.log(req.body);
    let SQL = 'INSERT INTO bookdb (author, title, book_description, isbn) VALUES ($1, $2, $3, $4) RETURNING *;';

    let param = [req.body.author, req.body.title, req.body.book_description, req.body.isbn];

    client.query(SQL, param)
        .then(results => {
        res.redirect(`/books/${results.rows[0].id}`)
        })
        .catch(err => handleError(err, res));
    };

    // res.direct is for routes
    // res.render is for templates



 //https://alligator.io/nodejs/req-object-in-expressjs/
    //USE PARAMS IF YOU ARE ACCESSING DATA FROM THE ROUTE I.E. /Filepath/Books:id

function retrieveBooks(req, res) {
    //create query
    const SQL = 'SELECT * from bookdb';

    //give our SQL query to our pg 'agent'
    client.query(SQL)
        .then (results => {
          res.render('pages/index', {books:results.rows})
            // res.status(200).json(results);
        })
        .catch(error => {res.status(500).send(error)});    
}

function singleBookHandler(req, res) {
//pull book from database
//render detail page
    console.log(req.params)
    let SQL = `SELECT * FROM bookdb WHERE id = $1`;
    let param = [req.params.id];

    client.query(SQL, param)
        .then (results => {
            res.render('pages/books/detail', {books:results.rows})
        })
        .catch(error => {res.status(500).send(error)});
}

// function getDetailHandler(req, res){
//     console.log(req.params)
//     let SQL = `SELECT * FROM tasks WHERE id = $1`;
//     let param = [req.params.task_id];

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
//   app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

client.connect()
    .then( () => {
    app.listen(PORT, ()=> console.log('server running on port', PORT));
    })
    .catch(err => {
        throw `PG startuperror: ${err.message}`;
});