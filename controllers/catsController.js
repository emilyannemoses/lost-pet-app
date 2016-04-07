/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Cat.find({}, function(err, allCats) {
    res.json(allCats);
  });
}

function create(req, res) {
  // console.log('body', req.body);
  //
  // // split at comma and remove and trailing space
  // var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;
  //
  // db.Album.create(req.body, function(err, album) {
  //   if (err) { console.log('error', err); }
  //   console.log(album);
  //   res.json(album);
  // });
}

function show(req, res) {
  // db.Album.findById(req.params.albumId, function(err, foundAlbum) {
  //   if(err) { console.log('albumsController.show error', err); }
  //   console.log('albumsController.show responding with', foundAlbum);
  //   res.json(foundAlbum);
  // });
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
