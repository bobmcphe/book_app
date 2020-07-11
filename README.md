# Project Name

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

The Bookshelf App is inteded to access Google's book api to search and store book information, based on the search query of the user. 

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
Install the following dependencies: express, cors, pg, ejs, dotenv, morgan (optional), and superagent. 

1. Set up your .env file with the local port, your api key info, and your database url.
1. Setup your database.
1. you might need to set up your schema file?
1. Run code with localhost:port in your browser, where `port` = whatever you set your port to.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

1. HTML
1. CSS3
1. Vanilla JS
1. EJS - Server side templating
1. Node.js for the server
1. Express is the framework to let us run a Javascript server
1. Cors - lets us deal with cross broswer scripting and access
1. pg - allows us to create and access SQL database
1. Superagent - necessary to access an API, in our case, Google books API

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->

07-09-2020 19:42pm - Application now has a fully-functional express server, with a GET route for the /hello, /form-with-get, and /searches/new.
07-09-2020 22:57pm - Added some very basic CSS, background coloring.
07-10-2001 15:54pm - Added Schema file and some PSQL code to it.
07-10-2020 16:54pm - Add the four grey balls in footer per wireframe.
07-10-2020 18:37pm - Added HTML template for dynamic content.
07-11-2020 16:16pm - Fixed bug with POST request
