const express = require('express')
const bodyParser = require('body-parser')
const mathOperations = require('./server/modules/mathOperations');
const completedCalculations = require('./server/modules/completedCalculations');
const completedEquationsHistory = require('./server/modules/completedEquationsHistory')
//Convention to have imports at the top of server
const app = express();

const port = 5000;

// serve static files that live in the public folder
// static files include html, css, client-side JS
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}))
  

app.get('/mathoperation', function(req, res) {
  console.log('Request for /math was made');
  res.send(completedCalculations);
})

app.get('/completedEquationsHistory', function(req, res) {
  console.log('Request for /completedEquationsHistory was made');
  res.send(completedEquationsHistory.completedEquation);
});

app.post('/completedEquationsHistory', function(req, res) {
  completedEquationsHistory.completedEquation.push(req.body.completedEquation);
  res.sendStatus(201);
});

app.post('/mathoperation', function(req, res){
function calculate(firstNumber,secondNumber,operation,total) {
  if (operation == "divide") {
      total = firstNumber / secondNumber
  }
  if (operation == "multiply") {
      total = firstNumber * secondNumber
  }
  if (operation == "add") {
      total = Number(firstNumber) + Number(secondNumber)
  }
  if (operation == "subtract") {
    total = firstNumber - secondNumber
  }
  completedCalculations.push(total)
  }
calculate(req.body.doMath.numberinput,req.body.doMath.numberinput2,req.body.doMath.operation,req.body.doMath.total)
res.sendStatus(201)
})




app.listen(port, () => {
  console.log('listening on port', port);
})