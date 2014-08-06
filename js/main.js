;

var BusRoute;

var busGuide = function () {

// START download route.jsone
   var routeJson = function (){
       $.ajax("data/route.json" )
           .done(function(data) {
               whriteRoute(data);
           })
           .fail(function() {
               console.log("fail download route.json");
           }
       );
   };
// END download route.jsone


// START whrite route.jsone
    var whriteRoute = function (data) {
        localStorage.setItem('routeData', JSON.stringify(data));
        addBusRoute();
    };
// END whrite route.jsone


// BusRoute
    function addBusRoute(){
        BusRoute = JSON.parse(localStorage.getItem('routeData'));
        busItemWidget();
    }
// BusRoute


// START check localStoreg
    var checkLocalStoreg = function (){
        if (!localStorage.routeData){
            routeJson();
        } else {
            routeJson();
        }
    };
    checkLocalStoreg();
// END check localStoreg
};


//====================================================================================

;
// START render bus item html
    var busItemWidget = function (){
        var html = "";

        for (var i = 0; i < BusRoute.length; i++) {
            html += Bus.template("busItemWidget", BusRoute[i],true);
        };
        $('#list-bus').html(html);
    };
// END render bus item html

$( document ).ready(function (){
    busGuide();
});
