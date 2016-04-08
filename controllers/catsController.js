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
  console.log('body', req.body);
  db.Cat.create(req.body, function(err, cat) {
    if (err) { console.log('error', err); }
    console.log(cat);
    res.json(cat);
  });
}

function show(req, res) {
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    if(err) { console.log('catsController.show error', err); }
    console.log('catsController.show responding with', foundCat);
    res.json(foundCat);
  });
}

function destroy(req, res) {
  db.Cat.findOneAndRemove({ _id: req.params.catId }, function(err, foundCat){
    res.json(foundCat);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Cat.findById(req.params.catId, function(err, foundCat) {
    if(err) { console.log('catsController.update error', err); }
    foundCat.PetName = req.body.petName;
    foundCat.pictureUrl = req.body.pictureUrl;
    foundCat.locationLastSeen = req.body.locationLastSeen;
    foundCat.dateLastSeen = req.body.dateLastSeen;
    foundCat.save(function(err, savedCat) {
      if(err) { console.log('saving altered cat failed'); }
      res.json(savedCat);
    });
  });

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
