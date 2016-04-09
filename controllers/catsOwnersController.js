var db = require('../models');

// app.get('/api/cats/:catId/owners', controllers.catsOwners.index);
function index(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    console.log('responding with owner:', foundCat.owners);
    res.json(foundCat.owners);
  });
}

// POST '/api/albums/:albumId/songs'
function create(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    console.log(req.body);
    var newOwner = new db.Owner(req.body);  // dangerous, in a real app we'd validate the incoming data
    foundCat.owners.push(newCat);
    foundCat.save(function(err, savedCat) {
      console.log('newOwner created: ', newOwner);
      res.json(newOwner);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
    });
  });
}

//app.put('/api/albums/:albumId/songs/:songId', controllers.albumsSongs.update);
function update(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    console.log(foundCat);
    // we've got the album, now find the song within it
    var correctOwner = foundCat.owners.id(req.params.ownerId);
    if (correctOwner) {
      console.log(req.body);
      correctOwner.email = req.body.email;
      foundCat.save(function(err, saved) {
        console.log('UPDATED', correctOwner, 'IN ', saved.owners);
        res.json(correctOwner);
      });
    } else {
      res.send(404);
    }
  });
}


module.exports = {
  index: index,
  create: create,
  update: update,
};
