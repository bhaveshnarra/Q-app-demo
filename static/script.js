$(document).ready(function(){
  $.get( "./getArticles", function( data ) {
      console.log(data);
      });
  $("#trig").submit(function(e){
    e.preventDefault();
    $.get( "./getArticles", function( data ){
        $("#newsboxes").empty();
        for(i=0;i<data.length;i++){
          console.log(data[i]["title"]);
          console.log(data[i]["author"]);
          console.log(data[i]["date"]);
          console.log(data[i]["publication"]);

          $("#newsboxes").append(" <div class='card news' style='width: 30rem;'> <div class=\"card-body\"> <h5 class=\"card-title\">"+data[i]["title"]+"</h5> <h6 class=\"card-subtitle mb-2 text-muted\">"+data[i]["publication"]+"</h6> <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p> <a href=\"#\" class=\"card-link\">"+data[i]["date"]+"</a> <a href=\"#\" class=\"card-link\">"+data[i]["author"]+"</a> </div> </div> ");
        }
        });
  });
});
