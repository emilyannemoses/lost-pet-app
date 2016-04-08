console.log("Sanity Check: JS is working!");
var template;
var $catsList;
var allCats = [];

$(document).ready(function(){

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
  $('#catkTarget').text('Failed to load cats, is the server working?');
}

function newCatSuccess(json) {
  $('#newCatForm input').val('');
  allCats.push(json);
  render();
}

function newCatError() {
  console.log('newbook error!');
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
