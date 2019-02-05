# Pelican Town DB: A Command Line Node App

     ___ ___ _   ___ ___   _   _  _  _____ _____      ___  _ 
    | _ \ __| | |_ _/ __| /_\ | \| ||_   _/ _ \ \    / | \| |
    |  _/ _|| |_ | | (__ / _ \| .` |  | || (_) \ \/\/ /| .` |
    |_| |___|___|___\___/_/ \_|_|\_|  |_| \___/ \_/\_/ |_|\_|   A   S T A R D E W   V A L L E Y   I N V E N T O R Y

See what's for sale in Pelican Town and even manage the store yourself. :fishing_pole_and_fish::seedling::hatching_chick:

## What this project does ##

This project requires [`npm`](https://www.npmjs.com) to install third party libraries by using the command line. [`MySQL`](https://www.npmjs.com/package/mysql) is used to access a database and [`Inquirer`](https://www.npmjs.com/package/inquirer) is used to collect user input. [`dotenv`](https://www.npmjs.com/package/dotenv) is used to load the MYSQL password from an `.env` file. Data logged in the terminal is styled with [`Chalk`](https://www.npmjs.com/package/chalk) and [`Table`](https://www.npmjs.com/package/table). The ASCII art is made using a modification of Glenn Chappell's FIGlet font, [Small](http://www.figlet.org/fontdb_example.cgi?font=small.flf). 

## How users can get started with this project ## 

### Setup the Database: ###

1. Clone or download the [`pelicantown-db`](https://github.com/fkakatie/pelicantown-db).
2. Create the database by running the `pelicantown.sql` file in MySQL Workbench or Sequel Pro.
3. Populate the products table by importing the `products.csv` file into the `pelicantown` database.

### Run the App: ###

1. **Setup and start the app.**
    - Create a `node_modules` directory by entering `npm i` in the command line.
    - Enter `node storefront` in the command line to start the app.
	
3. **Select your account type.**
    - Customers can purchase products from the store.
    - Managers can get specific information about the store's inventory and even order more product (manager account requires password).

- **Customer Account:**
    - Select which product you would like to buy in what quantity. If the store has enough, the product(s) will be added to your cart.
    - Add as many products to your cart as you would like! 
    - When you are done shopping, begin checkout. Your cart inventory and cart total will display in the console.

- **Manager Account:**
    - After entering the manager password, select a manager function:
      - _View products for sale_ will display all store products.
      - _View low inventory_ will display all products will less than 50 stock.
      - _Update inventory_ will allow manager to increase the current stock of any item.
      - _Add new product_ will allow manager to add a new product to the store.

## Where users can get help with this project ## 

A video tutorial will be available soon, but if you have any further questions about this project, visit my portfolio and [send me a message](https://fkakatie.github.io/responsive-portfolio/contact.html).

## Who maintains this project ##

This project is lovingly (and casually) maintained by me, @[fkakatie](https://github.com/fkakatie). Thanks for checking it out. 
