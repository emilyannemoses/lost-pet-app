$(function(){
      console.log('app.js loaded!');
      //Bootstrap carousel functionality
      $('.carousel').carousel({
      interval: 5000
      });
      //open and close add cat popup
      $(".addCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupPost.hidden").removeClass("hidden");//opens popup
      });
      $(".addCatToDb").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupPost").addClass("hidden"); //makes popup go hidden
      });
      $(".updateCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupUpdate.hidden").removeClass("hidden");//opens popup
      });
      $(".updateCatToDb").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupUpdate").addClass("hidden"); //makes popup go hidden again
      });
      //info button functionality
      $(".info").on("click", function(){
        $(".pop.hidden").removeClass("hidden");//opens popup
      });
      $(".close").on("click", function(){
        $(".pop").addClass("hidden"); //makes popup go hidden 
      });
      //GETTING ONE CAT ON THE PAGE
      $.get('/api/cats').success(function (cats) {
        cats.forEach(function(cat) {
        renderCat(cat);
        });
      });
      $('#cat-form-add form').on('submit', function(e) {
      e.preventDefault();
      var formData = $(this).serialize();
      console.log('formData', formData);
      $.post('/api/cats', formData, function(cat) {
        console.log('cat after POST', cat);
        renderCat(cat);  //render the server's response
      });
      $(this).trigger("reset");
      });
      //DELETE CAT
      $('#cats').on('click', '.deleteCat', handleDeleteCatClick);
});

  // this function takes a single cat and renders it to the page
  function renderCat(cat) {
    var carouselArray = [];
    console.log('rendering cat', cat);
    var catHtml = $('#cat-template').html();
    var catsTemplate = Handlebars.compile(catHtml);
    var html = catsTemplate(cat);
    $('#cats').prepend(html);
    carouselArray.push(html);
  }

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
