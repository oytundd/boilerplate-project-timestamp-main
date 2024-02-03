// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/:date',(req,res) => {
  const dateParam = req.params.date;
const unixTimesampRE = /^\d{13}$/g
  if( !isNaN( new Date(dateParam) ) ){
    console.log(`This date is valid: ${dateParam}`);
    const newDate = new Date(dateParam);
    console.log(newDate.toUTCString());
    res.json({ unix: Math.floor(newDate.getTime() ), utc: newDate.toUTCString() })
  }else if(dateParam.match(unixTimesampRE)){
    console.log(`Unix timestamp detected: ${dateParam}`);
    const newDate = new Date(parseInt(dateParam));
    console.log(newDate.toUTCString());
    res.json({unix: parseInt(dateParam), utc: newDate.toUTCString()});
  }else{
    console.log(`Invalid date detected: ${dateParam}`);
    res.json({error:'Invalid Date'});
  }
});

app.get("/api/", function (req, res) {
  const newDate = new Date();
  const timeStamp = newDate.getTime();
  res.json({unix: timeStamp, utc: newDate.toUTCString()});
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
