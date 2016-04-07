$(function(){
      console.log('app.js loaded!');
      //Bootstrap carousel functionality
      $('.carousel').carousel({
      interval: 5000
      });
      //***OBJECTIVE BUTTON FUNCTIONALITY***//
      $(".addCat").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popup.hidden").removeClass("hidden");//opens popup to explain objective
      });
      $(".close").on("click", function(){
        $("div.col-md-6.col-md-offset-3.popup").addClass("hidden"); //makes popup go hidden again so you can play the game
      });

  });
