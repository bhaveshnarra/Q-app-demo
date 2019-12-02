const csv = require('csv-parser');
const fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var DATA = [];
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
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getArticles', function(req, res) {
    var items = getRandomArticles();
    res.json(items);
});
app.listen(8080);
