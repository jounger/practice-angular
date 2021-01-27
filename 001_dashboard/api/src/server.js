var express = require('express');
var app = express();
var fs = require("fs");

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// GET BILLING LIST
app.get('/user', function (req, res) {
  const data = fs.readFileSync(__dirname + "/resources/" + "user.json", 'utf8');
  const user = JSON.parse(data)
  res.end(JSON.stringify(user))
})

// GET BILLING LIST
app.get('/billing/lastmonth', function (req, res) {
  const data = fs.readFileSync(__dirname + "/resources/" + "billing.json", 'utf8');
  const billings = JSON.parse(data)
  res.end(JSON.stringify(billings))
})

// GET SERVICE LIST
app.get('/services', function (req, res) {
  const data = fs.readFileSync(__dirname + "/resources/" + "service.json", 'utf8');
  const services = JSON.parse(data)
  res.end(JSON.stringify(services))
})

// GET INSTANCE LIST BY SERVICE'S ID
app.get('/services/:id/instances', async function (req, res) {
  let instances = getInstances()
  const output = instances.filter(x => x.service == req.params.id)
  res.end(JSON.stringify(output))
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

// Other functions
function getInstances() {
  const data = fs.readFileSync(__dirname + "/resources/" + "instance.json", 'utf8');
  const res = JSON.parse(data)
  res.forEach(val => {
    val.totalHours = val.onDemandHours + val.reservedHours
    if (val.reserveHours == 0) {
      val.coverage = 0
    } else {
      val.coverage = val.reservedHours / val.reserveHours
    }
  })
  return res
}
