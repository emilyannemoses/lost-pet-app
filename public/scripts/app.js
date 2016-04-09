console.log("Sanity Check: JS is working!");
var template;
var $catsList;
var allCats = [];

$(document).ready(function(){
  $('.email-owner.btn.btn-primary').on('click', function(){
    $('.pop1.hidden').removeClass('hidden');
  });
$('#infoImage').on('click', function(){
  $('.pop.hidden').removeClass('hidden');
});
$('.close').on('click', function(){
  $('.pop').addClass('hidden');
});

  $catsList = $('#catTarget');

  // compile handlebars template
  var source = $('#cats-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/cats',
    success: handleSuccess,
    error: handleError
  });

  $('#newCatForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/cats',
      data: $(this).serialize(),
      success: newCatSuccess,
      error: newCatError
    });
});

  $catsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/cats/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/cats/'+$(this).attr('data-id'),
      success: deleteCatSuccess,
      error: deleteCatError
    });
  });
  //calls upon cat edit click function below when edit button is clicked
  $('#catTarget').on('click', '.edit-cat', handleCatEditClick);
  //calls upon save changes function below when save button is clicked
  $('#catTarget').on('click', '.btn.btn-success.save-cat', handleSavedChangesClick);

});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $catsList.empty();

  // pass `allBooks` into the template function
  var catsHtml = template({ cats: allCats });

  // append html to the view
  $catsList.append(catsHtml);
}

function handleSuccess(json) {
  allCats = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#catTarget').text('Failed to load cats, is the server working?');
}

function newCatSuccess(json) {
  $('#newCatForm input').val('');
  allCats.push(json);
  render();
}

function newCatError() {
  console.log('newbook error!');
}

function fetchAndReRenderCatWithId(catId){
  $.get('/api/cats/' + catId,
function(data){
  $('div[data-id' + catId + ']').remove();
  renderCat(data);
});
}

function deleteCatSuccess(json) {
  var cat = json;
  console.log(json);
  var catId = cat._id;
  console.log('delete cat', catId);
  for(var index = 0; index < allCats.length; index++) {
    if(allCats[index]._id === catId) {
      allCats.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteCatError() {
  console.log('delete cat error!');
}

function handleCatEditClick(e){
  var $catRow = $(this).closest('.cat');
  var catId = $catRow.data('cat-id');
  console.log('edit cat', catId);
  //show save changes button
  $catRow.find('.save-cat').toggleClass('hidden');
  //hide the edit button
  $catRow.find('.edit-cat').toggleClass('hidden');
  //get cats name and replace with an input element
  var pictureUrl = $catRow.find('span.pictureUrl').text();
  $catRow.find('span.pictureUrl').html('<input class="edit-cat-pictureUrl" value="URL of Pet Picture"' + pictureUrl + '"></input>');

  var petName = $catRow.find('span.petName').text();
  $catRow.find('span.petName').html('<input class="edit-cat-petName" value="Pet Name"' + petName + '"></input>');

  var locationLastSeen = $catRow.find('span.locationLastSeen').text();
  $catRow.find('span.locationLastSeen').html('<input class="edit-cat-locationLastSeen" value="Location Last Seen"' + locationLastSeen + '"></input>');

  var dateLastSeen = $catRow.find('span.dateLastSeen').text();
  $catRow.find('span.dateLastSeen').html('<input class="edit-cat-dateLastSeen" value="Date Last Seen"' + dateLastSeen + '"></input>');
}

function handleSavedChangesClick(e){
  var catId = $(this).closest('.cat').data('cat-id');
  var $catRow = $('[data-id' + catId + ']');
  console.log(catId);
  var data = {
    petName: $catRow.find('#petName').val(),
    pictureUrl: $catRow.find('#pictureUrl').val(),
    locationLastSeen: $catRow.find('#locationLastSeen').val(),
    dateLastSeen: $catRow.find('#dateLastSeen').val()
  };
  console.log('PUTing data for cat', catId, 'with data', data);

  $.ajax({
      method: 'PUT',
      url: '/api/cats/' + catId,
      data: data,
      success: handleCatUpdatedResponse
    });

}

  // $.ajax({
  //   method: 'POST',
  //   url: '/api/cats/' + catId,
  //   headers: {"X-HTTP-Method-Override": "PUT"},
  //   data: data,
  //   success: function(data){
  //     console.log('things happened');
  //   }
  // });

  function handleCatUpdatedResponse(data){
    console.log('response to update', data);
    var catId = data._id;
    $('[data-id' + catId + ']').remove();
    renderCat(data);

    $('[data-id' + catId + ']');
    [0].scrollIntoView();
  }
