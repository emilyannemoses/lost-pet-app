var db = require('../models');

function index(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    console.log('responding with owner:', foundCat.owners);
    res.json(foundCat.owners);
  });
}

// POST '/api/cats/:catId/owners'
function create(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    var newOwner = new db.Owner(req.body);  // dangerous, in a real app we'd validate the incoming data
    foundCat.owners.push(newOwner);
    foundCat.save(function(err, savedCat) {
      console.log('newOwner created: ', newOwner);
      res.json(newOwner);
    });
  });
}

//app.put('/api/cats/:catId/owners/:ownerId', controllers.catsOwners.update);
function update(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    console.log(foundCat);
    var correctOwner = foundCat.owners.id(req.params.ownerId);
    if (correctOwner) {
      console.log(req.body);
      correctOwner.email = req.body.email;
      foundCat.save(function(err, saved) {
        console.log('UPDATED', correctowner, 'IN ', saved.owners);
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
