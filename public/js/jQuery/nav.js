$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

$('.dropdown a').on('click', function (event) {
    $(this).parent().toggleClass('open');
});

