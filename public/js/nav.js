$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
});