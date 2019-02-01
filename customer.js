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
var bad = chalk.bold.yellow;
var inverse = chalk.inverse;

// shopping cart variables
var cartItem;
var cartTotal = 0.00;
var shoppingCart = [
    [bold('PRODUCT'), bold('QUANTITY'), bold('PRICE')]
];

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
    console.log(heading('| _ \\ __| | |_ _/ __| /_\\ | \\| ||_   _/ _ \\ \\    / | \\| |'));
    console.log(heading('|  _/ _|| |_ | | (__ / _ \\| .` |  | || (_) \\ \\/\\/ /| .` |'));
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

        console.log('\n');

        accountType();

    })

}

function accountType() {

    inquirer.prompt([{
        name: 'type',
        type: 'rawlist',
        message: 'Select your account type:',
        choices: ['Customer', 'Manager', 'Supervisor']
    }]).then(function(account) {

        switch (account.type) {
            case 'Customer':
                customerFunc();
                break;
            case 'Manager':
                managerFunc();
                break;
            case 'Supervisor':
                supervisorFunc();
                break;
            default:
                break;
        }

    })

}

function readProducts(callback) {

    connection.query('SELECT * FROM pelicantown.products', 
    function (err, res) {

        if (err) throw err;

        var productArr = [];

        for (var j = 0; j < res.length; j++) {
          productArr.push(res[j].product);
        }

        callback(productArr);
        
       });

}

function customerFunc() {

    readProducts(function(productArr) {

        inquirer.prompt([{
            name: 'name',
            type: 'list',
            message: 'What would you like to buy?',
            choices: productArr
        }, {
            name: 'quantity',
            type: 'input',
            message: 'How many?',
            validate: function(value) {
                if (value.trim().length == 0 || isNaN(value) || value < 0) {
                    return false;
                }
                return true;
            }
        }]).then(function(product) {

            var item = product.name;
            var quantity = product.quantity;
            
            connection.query('SELECT * FROM pelicantown.products WHERE product = "' + item + '"', function (err, res) {

                if (err) throw err;

                var stock = res[0].stock;
                var price = res[0].price;

                if (quantity > stock) {
                    
                    console.log(
                        bad('\nInsufficient quantity in stock.') + 
                        '\nWe only have ' + stock + ' ' + item + ' right now.');

                    keepShopping();
                
                } else {

                    var newStock = stock - quantity;

                    var quantityPrice = quantity * price;

                    connection.query('UPDATE pelicantown.products SET stock = ' + newStock + ' WHERE product = "' + item + '"', function (err, res) {

                        if (err) throw err;

                        console.log('\n' +
                            bold(quantity + ' ' + item) + ' added to cart!'
                        );

                        cartItem = [
                            item, 
                            quantity, 
                            quantityPrice.toFixed(2)
                        ];

                        shoppingCart.push(cartItem);

                        keepShopping();

                    })

                }
        
            })

        })

    })

}

function keepShopping() {

    inquirer.prompt([{
        name: 'choice',
        type: 'list',
        message: ' ',
        choices: ['Keep shopping', 'Checkout now']
    }]).then(function(res) {

        switch (res.choice) {
            case 'Keep shopping':
                updateProducts();
                customerFunc();
                break;
            case 'Checkout now':
                checkout();
                break;
            default:
                break;
        }

    })

}

function updateProducts() {

    console.log('');

    let updateStream = '';

    updateStream = createStream(config);

    updateStream.write([
        bold('ID'), 
        bold('PRODUCT'), 
        bold('PRICE'), 
        bold('STOCK')
    ]);

    connection.query('SELECT * FROM pelicantown.products;', function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            updateStream.write([
                res[i].id, 
                heading(res[i].product), 
                res[i].price.toFixed(2), 
                res[i].stock
            ]);

        }

        console.log('\n');

    })

}

function checkout() {
 
    console.log(heading('\n  YOUR SHOPPING CART:'));

    for (var k = 1; k < shoppingCart.length; k++) {
        cartTotal += Number(shoppingCart[k][2]);
    }

    var totalRow = [bold('CART TOTAL:'), heading(cartTotal.toFixed(2))];

    output = table(shoppingCart, staticConfig);
    totalOutput = table([totalRow], totalConfig);

    console.log(output, totalOutput);

    console.log('Thank you for shopping local in Stardew Valley!');

    connection.end();

}