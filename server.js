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
 * DATA *
 **********/
 var catList =[];
catList.push({
               petName: 'Baxter',
               picUrl: "http://www.pets4homes.co.uk/images/classifieds/2013/05/29/317446/large/pure-grey-cat-female-51a5dade1fd23.gif",
               locationLastSeen: 'Oakland, California',
               dateLastSeen: 'August 20, 2015'
               // owner: 'Emily'
             });
catList.push({
               petName: 'Sylvester',
               picUrl: "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-9/11057791_10103140437025912_6419939779020771536_n.jpg?oh=9cca440ec94f523d9345127530b8b70d&oe=5776A186",
               locationLastSeen: 'San Francisco, California',
               dateLastSeen: 'March 8, 2014'
               // owner: 'Bob'
               });
catList.push({
                petName: 'Sammy',
                picUrl: "https://s-media-cache-ak0.pinimg.com/736x/03/17/c1/0317c1aa041c68915b809752c3d2da10.jpg",
                locationLastSeen: 'Reno, Nevada',
                dateLastSeen: 'October 23, 2014'
                // owner: 'Geraldine'
                });



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
//all of the albums
// app.get('/api/cats', controllers.cats.index);
//show songs on page, finished the show function
// app.get('/api/cats/:catId', controllers.cats.show);
//posts and creates - saves data once its posted
// app.post('/api/cats', controllers.cats.create);
//post and create songs
// app.post('/api/cats/:catId/owners', controllers.owners.create);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
