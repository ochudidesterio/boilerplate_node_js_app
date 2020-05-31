

let express = require('express')
let MongoClient = require('mongodb').MongoClient;

let app = express()

app.use(express.static("public"))


var mongoose = require('mongoose');
var url = 'mongodb://localhost/ToDoApp';
var Item = require('./model/items');
var dbase

MongoClient.connect(url, (err, client) => {
  dbase = client.db('ToDoApp')
  app.listen(3000, function () {
    console.log("server running on port 3000")
  })
})

app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

app.get('/', function (req, res) {
  dbase.collection('items').find().toArray(function(err,items){
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="/bootstrap-4.4.1-dist/css/bootstrap-grid.min.css">
      <link rel="stylesheet" href="/bootstrap-4.4.1-dist/css/bootstrap.min.css">
    
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
          ${items.map(function(itemFromDb){
            return `
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${itemFromDb.item}</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
            `
          }).join('')}
        </ul>
        
      </div>
      
    
      <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    
    <script src="/browser.js"></script>
    <script src="/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>

    
    
    </body>
    </html>
`)
  })
  
})

app.post('/create-item', function (req, res) {
  let item = new Item(req.body);
  item.item = req.body.item;

  //MongoClient.connect(url, (err, client)=> {
  //var dbase = client.db('ToDoApp')
  dbase.collection('items').insertOne(
    item,
    function () {
      res.redirect('/')
    })
  //client.close();
  //})


})

app.post('/update-item',function(req,res){
console.log(req.body.text)
res.send("success")
})
