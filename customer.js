// required packages
require('dotenv').config();
var my = require('./my.js');

var mysql = require('mysql');
var inquirer = require('inquirer');

// table setup
var {createStream} = require('table');
var {getBorderCharacters} = require('table');

let config,
    stream;
 
config = {
    border: getBorderCharacters(`norc`),
    columnDefault: {
        width: 30,
        alignment: 'right'
    },
    columnCount: 4,
    columns: {
        0: {width: 2},
        1: {alignment: 'left'},
        2: {width: 7},
        3: {width: 5}
    }
};
 
stream = createStream(config);

// chalk setup
var chalk = require('chalk');

var heading = chalk.bold.blue;
var bgheading = chalk.bold.yellow.bgBlue;
var bold = chalk.bold;
var muted = chalk.gray;
var inverse = chalk.inverse;

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
    intro();
});

function intro() {
    console.log(heading(' ___ ___ _   ___ ___   _   _  _  _____ _____      ___  _ '));
    console.log(heading('| _ | __| | |_ _/ __| /_\\ | \\| ||_   _/ _ \\ \\    / | \\| |'));
    console.log(heading('|  _| _|| |_ | | (__ / _ \\| .` |  | || (_) \\ \\/\\/ /| .` |'));
    console.log(heading('|_| |___|___|___\\___/_/ \\_|_|\\_|  |_| \\___/ \\_/\\_/ |_|\\_|'));
    console.log(bold('   A   S T A R D E W   V A L L E Y   I N V E N T O R Y'));

    displayProducts();
}

function displayProducts() {

    stream.write([
        bold('ID'), 
        bold('PRODUCT'), 
        bold('PRICE'), 
        bold('STOCK')
    ]);

    connection.query('SELECT * FROM pelicantown.products;', function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            // console.log(res);

            stream.write([
                res[i].id, 
                heading(res[i].product), 
                res[i].price.toFixed(2), 
                res[i].stock
            ]);

        }

        connection.end();

    })

}