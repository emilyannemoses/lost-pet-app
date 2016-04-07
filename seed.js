var db = require("./models");

// var ownerList = [];
// ownerList.push({
//               ownerName: 'Emily',
//               ownerEmail: 'e.a.moses@gmail.com',
//               petName: 'Baxter'
// });

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

// catList.forEach(function(cat){
//   cat.owner = ownerList;
// });

db.Cat.remove({}, function(err, cats){

  db.Cat.create(catList, function(err, cats){
    if (err) { return console.log('ERROR', err); }
    console.log("all cats:", cats);
    console.log("created", cats.length, "cats");
    process.exit();
  });

});
