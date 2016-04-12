/************************
* SERVER-SIDE JAVASCRIPT*
************************/
var express = require('express'),
    db = require('./models'),
    bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended:true}));
app.use('/vendor', express.static(__dirname + '/bower_components'));
var controllers = require('./controllers');

/****************
 * HTML Endpoints*
 *****************/
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*********************
 * JSON API Endpoints*
 *********************/
 app.get('/api', controllers.api.index);
 app.get('/api/cats', controllers.cats.index);
 app.get('/api/cats/:catId', controllers.cats.show);
 app.post('/api/cats', controllers.cats.create);
 app.delete('/api/cats/:catId', controllers.cats.destroy);
 app.put('/api/cats/:catId', controllers.cats.update);
 app.get('/api/cats/:catId/owners', controllers.catsOwners.index);
 app.post('/api/cats/:catId/owners', controllers.catsOwners.create);
 app.put('/api/cats/:catId/owners/:ownerId', controllers.catsOwners.update);

/**********
 * SERVER *
 **********/
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
