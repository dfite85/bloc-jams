
var animatePoints = function () {
  var revealPoint = function () {
    $(this).css({
      opacity: 1,
      transform: 'scaleX(1) translateY(0)'
    });
  };
  $.each($('.point'), revealPoint);
};

$(window).load(function () {
  if ($(window).height() > 950) {
    animatePoints();
  }
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
      animatePoints();
    }
  });
});

var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) { // why is this points not point
    var revealPoint = function(index) { 
    points[index].style.opacity = 1; points[index].style.transform = "scaleX(1) translateY(0)"; 
    points[index].style.msTransform = "scaleX(1) translateY(0)"; 
    points[index].style.WebkitTransform = "scaleX(1) translateY(0)"; }

forEach(pointsArray, revealPoint);
};

window.onload = function() {

if (window.innerHeight > 950) {
    animatePoints(pointsArray);
}

var sellingPoints = document.getElementsByClassName('selling-points')[0]; var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

window.addEventListener('scroll', function(event) {
   
  
    
    
    
if (document.documentElement.srollTop || document.body.scrollTop >=
scrollDistance) { animatePoints(pointsArray); } }); }



