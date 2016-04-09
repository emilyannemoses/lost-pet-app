/// SERVER-SIDE JAVASCRIPT
//require express in our app
var express = require('express'),
//require models
    db = require('./models'),
    //require body parser
    bodyParser = require('body-parser');
// generate a new express app and call it 'app'
var app = express();
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended:true}));
// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));
//require the controllers folder since those have all of the functions
var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
//required get function
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */
//the index
 app.get('/api', controllers.api.index);
 // all of the cats
 app.get('/api/cats', controllers.cats.index);
 // show cats on page, finished the show function
 app.get('/api/cats/:catId', controllers.cats.show);
 // posts and creates - saves data once its posted
 app.post('/api/cats', controllers.cats.create);
 //delete cat postings - class is
 app.delete('/api/cats/:catId', controllers.cats.destroy);
 //update cat
 app.put('/api/cats/:catId', controllers.cats.update);
 //create/save owner
 app.get('/api/cats/:catId/owners', controllers.catsOwners.index);
 //save owner
 app.post('/api/cats/:catId/owners', controllers.catsOwners.create);
 //update owner
 app.put('/api/cats/:catId/owners/:ownerId', controllers.catsOwners.update);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
