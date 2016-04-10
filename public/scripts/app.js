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

});

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
