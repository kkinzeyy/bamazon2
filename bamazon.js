//require mysql and inquirer

let mysql = require('mysql');
let inquirer = require('inquirer');

//create connection to db
let connection = mysql.createConnection({
    //host, port, user, password, database
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'khoimj15',
    database: 'bamazon'
});

// connect to db
connection.connect(function (error) {
    if (error) throw error;
    //console log if error
    console.log('Error connecting:' + error)
    //call start() after connection is successful
    startDb();
})

//set up startDb() and load products
function startDb() { 
//get items from Db SELECT * FROM products table
    connection.query('SELECT * FROM products', function (error, res){

        if(error) throw error;
        //log error for console
        console.log('Cannot connect: '+error);
        //show the table in the terminal
        console.table(res);
        //get input for transaction make whole table available
        custInput(res)
    });
}
// ask user to select item with id
function custInput(instockQty) {
    // get user input for item
    inquirer.prompt ([{
        type: 'input',
        name: 'input',
        message: 'Which item would you like to buy? or [q]uit?',
        //check to see what input was selected
        validate: function(val) {
            return !isNaN(val)  || val ==='q';
        }
    }])
    //check to see if user quit
    .then(function(val){
        userquit(val.input)
        let selection = parseInt(val.input);
        let item = qtyStock(selection, instockQty);

        //if (){} user selects an item ask for qty else {}
        if (item) {
            reqQty(item);
        }
        else {
            console.log('incorrect item id or unavailable');
            //restart db
            startDb();
        }
    })

}

// ask user for qty selected item
function qtyInput(item) {
    // get user input for item
    inquirer.prompt ([{
        type: 'input',
        name: 'qty',
        message: 'How many would you like to buy? or [q]uit?',
        //check to see what input was selected
        validate: function(val) {
            return !isNaN(val)  || val ==='q';
        }
    }])
    //check to see if user quit
    .then(function(val){
        userquit(val.qty)
        let qty = parseInt(val.qty);
        //check if(){} enough inStockqty is available, restart db, else {}
        if (qty > item.stockQty) {
            console.log('not enough sorry!')
            startDb();
        } 
        else {
        //if enough instockQty, finish purchase
        purchase(item, qty);
        }});
    }
//set up purchase()
function purchase(item, stockQty) {
    //set up connection to update db
    connection.query(
        'UPDATE products SET instockQty = stockQty -? where itemId = ?',
        [qty, item.itemId],
        function(error,res) {
            //log purchase in console restart db
            console.log('you just bought' + qty ' ' + item.itemName);
            startDb();
        }
    );
}

//function to check if user input is instock
function invCk(selection, instockQty) {
    for (let i = 0; i < instockQty.length; i++)
    {
    if (instockQty[i].itemId === input) {
        return instockQty[i];
    }
    }
    return null;
}
function userquit(input) {
    if (input === 'q') {
        console.log('later dude!');
        process.end(0);
    }
}