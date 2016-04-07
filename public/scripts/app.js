$(function(){
      console.log('app.js loaded!');
      //Bootstrap carousel functionality
      $('.carousel').carousel({
      interval: 5000
      });
      //open and close add cat popup
      $(".addCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupPost.hidden").removeClass("hidden");//opens popup to explain objective
      });
      $(".close").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupPost").addClass("hidden"); //makes popup go hidden again so you can play the game
      });
      $(".updateCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupUpdate.hidden").removeClass("hidden");//opens popup to explain objective
      });
      $(".close").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popupUpdate").addClass("hidden"); //makes popup go hidden again so you can play the game
      });
      //open update cat popup
      $(".updateCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popup.hidden").removeClass("hidden");//opens popup to explain objective
      });
      //info button functionality
      $(".info").on("click", function(){
        $(".pop.hidden").removeClass("hidden");//opens popup to explain objective
      });
      $(".close").on("click", function(){
        $(".pop").addClass("hidden"); //makes popup go hidden again so you can play the game
      });

  });
