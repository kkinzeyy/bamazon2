//deps
let mysql= require('mysql');
let inquirer= require('inquirer');

//connect to db
let connection = mysql.createConnection({
    //host, port, user, password, database
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'khoimj15',
    database: 'bamazon'
});

// connect to db
connection.connect((error)=>{
    //log error if occurs
    if (error) throw error;
    //call start() after connection is successful
    bamazon();
});

//function to start app and show table
function bamazon(){
    connection.query('SELECT * FROM products', function(error,table){
        if (error) throw error;
        console.table(table);
        custInput(table);
    })
}

function custInput(){
    inquirer.prompt({
        name:'itemSelection',
        type: 'input',
        message: 'select an item to purchase with item ID'
    })
    .then((answer)=>{
        connection.query('SELECT * FROM products',function(error,res){
            if (error) throw error;
            else console.log('\n you chose: '+res[answer.itemSelection].item_name)
            askQty();
        })
    })
}
function askQty(){
    inquirer.prompt({
        name: 'custQty',
        type: 'input',
        message: 'how many would you like to buy?'
    })
    .then((answer)=>{
        connection.query('SELECT * FROM products', function(error, res){
            if (error) throw error;
            if(res[answer.custQty].qty<answer.qty){
                console.log('not enough in stock');
            }
            console.log('\n you ordered: '+res[answer.custQty].item_name+'!!')
            bamazon();
        })
    })
}
