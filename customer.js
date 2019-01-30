// required packages
require('dotenv').config();
var my = require('./my.js');

var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');

// create connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: my.pass.word,
    database: 'pelicantown'
});

connection.connect(function (err) {
    if (err) throw err;
    // inquirer function
});

// connection query
// function () {
//     connection.query('SELECT * FROM products;', function (err, res) {

//         if (err) throw err;

//         connection.end();

//     })
// }