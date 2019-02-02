// required packages
require('dotenv').config();
var my = require('./my.js');

var mysql = require('mysql');
var inquirer = require('inquirer');

// table setup
var {table} = require('table');
var {createStream} = require('table');
var {getBorderCharacters} = require('table');

let config,
    staticConfig,
    output,
    totalOutput,
    stream;
 
config = {
    border: getBorderCharacters(`norc`),
    columnDefault: {width: 30, alignment: 'right'},
    columnCount: 4,
    columns: {
        0: {width: 2},
        1: {alignment: 'left'},
        2: {width: 7},
        3: {width: 5}
    }
};

staticConfig = {
    border: getBorderCharacters(`norc`),
    columnDefault: {alignment: 'right'},
    columns: {
        0: {width: 30, alignment: 'left'},
        1: {width: 8},
        2: {width: 10}
    }
};

totalConfig = {
    border: getBorderCharacters(`void`),
    columnDefault: {alignment: 'right'},
    columns: {
        0: {width: 42},
        1: {width: 11}
    }
}
 
stream = createStream(config);

// chalk setup
var chalk = require('chalk');

var heading = chalk.bold.cyan;
var bgheading = chalk.bold.yellow.bgBlue;
var bold = chalk.bold;
var muted = chalk.gray;
var bad = chalk.bold.magenta;
var inverse = chalk.inverse;

// shopping cart variables
var cartItem;
var cartTotal = 0.00;
var shoppingCart = [
    [bold('PRODUCT'), bold('QUANTITY'), bold('PRICE')]
];

// password variables
var incorrectGuesses = 0;

// create connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: my.pass.word,
    database: 'pelicantown'
});

function validateManager() {

    console.log('');

    inquirer.prompt([{
        name: 'word',
        type: 'password',
        message: 'Enter the manager password:',
        mask: true
    }]).then(function(pass) {

        if (pass.word === 'managerpass') {

            incorrectGuesses = 0;

            console.log('\nCorrect!');

        } else if (incorrectGuesses == 2) {

            incorrectGuesses = 0;

            console.log(bad('\nToo many failed attempts.'));
            console.log('Please try again later.');

        } else {

            incorrectGuesses++;

            console.log(bad('\nIncorrect password.'));
            console.log('Try again.');

            validateManager();

        }


    })

}