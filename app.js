const csv = require('csv-parser');
const fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var DATA = [];
var USERS = [];
fs.createReadStream('articles1.csv')
  .pipe(csv())
  .on('data', (row) => {
    DATA.push(row);
  })
  .on('end', () => {
    // console.log(DATA.length);
    // var items=getRandomArticles();
    // console.log(items);
  });
function generateUsers(){
    for(i=0;i<5;i++){
      var obj = {
        1:0.2,
        2:0.2,
        3:0.2,
        4:0.2,
        5:0.2
      };
      USERS.push(obj);
    }
}

function getRandomArticles(){
  var items = [];

  for(i=0;i<10;i++){
    var idx = Math.floor((Math.random()*5000));
    // console.log(idx);
    var obj = {};
    obj = DATA[idx]
    obj["color"] = Math.ceil((Math.random()*5));
    items.push(obj)
  }
  return items;
}

app.use(express.static('static'))
// viewed at http://localhost:8080
generateUsers();
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getArticles', function(req, res) {
    var items = getRandomArticles();
    res.json(items);
});

app.get('/getUsers', function(req, res) {
    res.json(USERS);
});
app.listen(8080);
