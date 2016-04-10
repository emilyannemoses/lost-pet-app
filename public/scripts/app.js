$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/cats').success(function (cats) {
    cats.forEach(function(cat) {
      renderCat(cat);
    });
  });

  $('#newCatForm').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/cats', formData, function(cat) {
      console.log('cat after POST', cat);
      renderCat(cat);
    });
    $(this).trigger("reset");
  });

  //INFO BUTTON POPUP
  $('#infoImage').on('click', function(){
    $('.pop.hidden').removeClass('hidden');
  });
  $('.close').on('click', function(){
    $('.pop').addClass('hidden');
  });

  //get and handle click on the add owner email button
  $('#cats').on('click', '.owner-email', handleAddOwnerClick);


  $('#saveOwner').on('click', handleNewOwnerSubmit);
  $('#cats').on('click', '.delete-cat', handleDeleteCatClick);
  $('#cats').on('click', '.edit-cat', handleCatEditClick);
  $('#cats').on('click', '.save-cat', handleSaveChangesClick);

  // GOOGLE MAP API SEARCH FOR LOCATION
  // var map; // declaring map globally for later
  // var infowindow; // declaring globally for later
  // var marker; // declaring globally for later
  // JS object to hold references to future markers that are generated
  // var markers;
  // navigator.geolocation.getCurrentPosition(initialize);
  // finds user's current position and creates map and marker showing them
  // $('.search-form').on('submit', function(e){ //location input
  //   addNewMarker(e);
  // });


});

// GOOGLE MAP STUFF BELOW

// function initialize(location) {
  // markers = {};
  // Create the map
  // createMapWithUserMarker(location);
  // Initialize autocomplete form
  // setUpAutocompleteForm();
  // Add database locations to map
  // populateLocations();
// }

// Adds marker to map (and saves friend to database) via AJAX form
// function addNewMarker(e){
  // e.preventDefault();
  //
  // var data = $(e.target).serialize();
  //
  // var request = $.ajax({
  //   type: 'POST',
  //   url: '/',
  //   data: data,
  //   dataType: 'json'
  // });
  //
  // request.done(function(data){
    // Makes the new marker based on address in form submission
//     codeAddress(data);
//     $("#map").append("<li id=" + data.id + data.name + data.location + "></li>");
//     console.log("form should clear");
//     clearFriendForm();
//   });
// }
//
// function clearFriendForm() {
//   $('.search-form #locationLastSeen').val("");
// }

// Creates a initial map with marker location of current user
// function createMapWithUserMarker(location){
//   var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
//
//   var mapCanvas = document.getElementById('map-canvas');
//
//   var mapOptions = {
//     center: currentLocation,
//     zoom: 3,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   map = new google.maps.Map(mapCanvas, mapOptions);
//
//   var marker = new google.maps.Marker({
//     position: currentLocation,
//     map: map,
//     title: "You are here"
//   });

//   var infowindow = new google.maps.InfoWindow({
//     content: "You are here!"
//   });
//
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.open(map, marker);
//     setTimeout(function() {
//         infowindow.close();
//       }, 3000);
//   });
// }

// Defines search form based on Places library, biases LatLong bounds
// function setUpAutocompleteForm(){
//   var defaultBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(33.695441, -117.805632),
//     new google.maps.LatLng(45.250434, -69.377900));
//
//   var options = {
//     bounds: defaultBounds,
//     types: ['(cities)']
//   };
//
//   var input = document.getElementById('address');
//
//   var autocomplete = new google.maps.places.Autocomplete(input, options);
//
//   function fillInAddress() {
  // Get the place details from the autocomplete object.
  // var place = autocomplete.getPlace();
  //
  // for (var component in componentForm) {
  //   document.getElementById(component).value = '';
  //   document.getElementById(component).disabled = false;
  // }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
//     for (var i = 0; i < place.address_components.length; i++) {
//       var addressType = place.address_components[i].types[0];
//       if (componentForm[addressType]) {
//         var val = place.address_components[i][componentForm[addressType]];
//         document.getElementById(addressType).value = val;
//       }
//     }
//   }
// }

// Used in addNewMarker AJAX call
// var codeAddress = function(data) {
//   geoCode(data);
// };

// Used in populateLocations AJAX call
// var addMarkerFromDatabase = function(data) {
//   geoCode(data);
// };

// Finds LatLong of provided address and makes a marker at that location
// var geoCode = function(data) {
//   console.log("in geocode, data is:");
//   console.log(data);
//   var geocoder = new google.maps.Geocoder();
//   geocoder.geocode( { 'address': data.location }, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location,
//         title: data.name
//       });
//     } else {
//       console.log("Geocode was not successful for the following reason: " + status);
//     }
//
//     markers[data.id] = { "marker": marker, "data": data };
//     console.log(markers);

// Adds listener to open the marker's info window
//     google.maps.event.addListener(marker, 'click', function() {
//       infowindow.open(map,marker);
//       setTimeout(function() {
//         infowindow.close();
//       }, 3000);
//     });
//   });
// };

// gets all locations from server
// function populateLocations() {
//   var request = $.ajax({
//     type: 'GET',
//     url: '/api/cats'
//   });

//   request.done(function(data){
//     for (var i = 0; i < data.length; i++) {
//       console.log(data);
//       addMarkerFromDatabase(data[i]);
//     }
//   });
//
//   request.error(function(response){
//     console.log("errors retrieving or processing data from server", response);
//   });
// }

// GOOGLE MAP STUFF ABOVE

// when the edit button for a cat is clicked
function handleCatEditClick(e) {
  var $catRow = $(this).closest('.cat');
  var catId = $catRow.data('cat-id');
  console.log('edit cat', catId);

  $catRow.find('.save-cat').toggleClass('hidden');
  $catRow.find('.edit-cat').toggleClass('hidden');


  // get the cat name and replace its field with an input element
  var petName = $catRow.find('span.petName').text();
  $catRow.find('span.petName').html('<input class="edit-petName" value="' + petName + '"></input>');

  var pictureUrl = $catRow.find('span.pictureUrl').text();
  $catRow.find('span.pictureUrl').html('<input class="edit-pictureUrl" value="' + pictureUrl + '"></input>');

  var locationLastSeen = $catRow.find('span.locationLastSeen').text();
  $catRow.find('span.locationLastSeen').html('<input class="edit-locationLastSeen" value="' + locationLastSeen + '"></input>');

  var dateLastSeen = $catRow.find('span.dateLastSeen').text();
  $catRow.find('span.dateLastSeen').html('<input class="edit-dateLastSeen" value="' + dateLastSeen + '"></input>');
}

// after editing a cat, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var catId = $(this).parents('.cat').data('cat-id');
  var $catRow = $('[data-cat-id=' + catId + ']');

  var data = {
    petName: $catRow.find('.edit-petName').val(),
    pictureUrl: $catRow.find('.edit-pictureUrl').val(),
    locationLastSeen: $catRow.find('.edit-locationLastSeen').val(),
    dateLastSeen: $catRow.find('.edit-dateLastSeen').val()
  };
  console.log('PUTing data for cat', catId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/cats/' + catId,
    data: data,
    success: handleCatUpdatedResponse
  });
}

function handleCatUpdatedResponse(data) {
  console.log('response to update', data);

  var catId = data._id;
  $('[data-cat-id=' + catId + ']').remove();
  renderCat(data);
  $('[data-cat-id=' + catId + ']')[0].scrollIntoView();
}

// when a delete button for a cat is clicked
function handleDeleteCatClick(e) {
  var catId = $(this).parents('.cat').data('cat-id');
  console.log('someone wants to delete cat id=' + catId );
  $.ajax({
    url: '/api/cats/' + catId,
    method: 'DELETE',
    success: handleDeleteCatSuccess
  });
}

// callback after DELETE /api/cats/:id
function handleDeleteCatSuccess(data) {
  var deletedCatId = data._id;
  console.log('removing the following cat from the page:', deletedCatId);
  $('div[data-cat-id=' + deletedCatId + ']').remove();
}

function fetchAndReRenderCatWithId(catId) {
  $.get('/api/cats/' + catId, function(data) {
    $('div[data-cat-id=' + catId + ']').remove();
    renderCat(data);
  });
}

// this function takes a single cat and renders it to the page
function renderCat(cat) {
  console.log('rendering cat', cat);
  var catHtml = $('#cat-template').html();
  var catsTemplate = Handlebars.compile(catHtml);
  var html = catsTemplate(cat);
  $('#cats').prepend(html);
}

// when the add owner email button is clicked, display the modal
function handleAddOwnerClick(e) {
  console.log('owne email clicked!');
  var currentCatId = $(this).closest('.cat').data('cat-id');
  console.log('id',currentCatId);
  $('#ownerModal').data('cat-id', currentCatId);
  $('#ownerModal').modal();
}

// when the cat modal submit button is clicked:
function handleNewOwnerSubmit(e) {
  e.preventDefault();
  var $modal = $('#ownerModal');
  var $ownerEmailField = $modal.find('#ownerEmail');
  var dataToPost = {
      email: $ownerEmailField.val()
    };
  var catId = $modal.data('catId');
  console.log('retrieved ownerEmail:', ownerEmail);
  var ownerPostToServerUrl = '/api/cats/'+ catId + '/owners';
  $.post(ownerPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /owners:', data);
    $ownerEmailField.val('');
    $modal.modal('hide');
    fetchAndReRenderCatWithId(catId);
  }).error(function(err) {
    console.log('post to /api/cats/:catId/owners resulted in error', err);
  });
}
