const csv = require('csv-parser');
const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var DATA = [];
var USERS = [];
colors = {};
var cur_user = 2;
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

function generateColors(){
  for(i=0;i<5;i++){
    colors[i.toString()] = [0,0,1,1,2,2,3,3,4,4]
  }
}

function setColors(id){
  var sum = 0;
  var idx = 1;
  var prob = Math.ceil(USERS[id][idx.toString()]*10);
  for(i=0;i<10;i++){
    if(i < prob){
        colors[id.toString()][i] = idx;
    }else{
      idx++;
      prob = prob + Math.ceil(USERS[id][idx.toString()]*10);
    }

  }
  console.log(colors[id.toString()]);
}

function getRandomArticles(){
  var items = [];

  for(i=0;i<10;i++){
    var idx = Math.floor((Math.random()*5000));
    // console.log(idx);
    var obj = {};
    obj = DATA[idx]
    var rand = Math.floor((Math.random()*10));
    console.log(rand);
    obj["color"] = colors[cur_user.toString()][rand];
    items.push(obj)
  }
  return items;
}

function getcolor(id){
  var rand = Math.random();
  var sum = 0.00;
  for(i=0;i<5;i++){
    sum = sum + USERS[id][(i+1).toString()];
    console.log(sum);
  }


  return 0;
}
function agent(id,color){
  USERS[id][color.toString()] += 0.1;
  var sum = USERS[id]["1"] +USERS[id]["2"] + USERS[id]["3"] + USERS[id]["4"] + USERS[id]["5"];
  USERS[id]["1"] /= sum;
  USERS[id]["2"] /= sum;
  USERS[id]["3"] /= sum;
  USERS[id]["4"] /= sum;
  USERS[id]["5"] /= sum;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'))
// viewed at http://localhost:8080
generateUsers();
generateColors();
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
app.get('/getColor', function(req, res) {
    res.json(parseInt(req.query));
});

app.post('/updateProbs',function(req,res){
  var color = req.body.color;
  var id = req.body.id;
  cur_user = id;
  agent(id,color);
  setColors(cur_user);
  console.log(color + " " + id);
  res.json("Hallelujah");
});
app.listen(8080);
