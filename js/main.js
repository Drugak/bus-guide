var BusRoute,
    BusRouteTableArray = [];

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
// START whrite route.jsone
    var whriteRoute = function (data) {
        localStorage.setItem('routeData', JSON.stringify(data));
        addBusRoute();
    };
// BusRoute
    function addBusRoute(){
        BusRoute = JSON.parse(localStorage.getItem('routeData'));
        (function (){
            for (var i = 0; i < BusRoute.length; i++){
                BusRouteTableArray.push(BusRoute[i].routeNumber);
            }
        })();
        busItemWidget();
    }
// START check localStoreg
    var checkLocalStoreg = function (){
        if (!localStorage.routeData){
            routeJson();
        } else {
            routeJson();
        }
    };
    checkLocalStoreg();
// START render bus item html

    var busItemWidget = function (){

        var html = "";

        for (var i = 0; i < BusRoute.length; i++) {
            html += Bus.template("busItemWidget", BusRoute[i],true);
        };
        $('#list-bus').removeClass('loading').html(html);

        // open item bus
        $( "li.js-bus-item" ).click(function() {
            $(this).toggleClass('open');
        });
    };


// search
    function search (){
        var $jsBusItem = $('.js-bus-item'),
            $jsSearchInput = $('.js-search-input')
        $jsSearchInput.keyup(function (){
            if ($jsSearchInput.val() == "") {
                return false;
            }
            console.log($.inArray($jsSearchInput.val() , BusRouteTableArray));
        });
    };

    $('input.js-search-input').on('focus', function (){
        search();
    });



};
//====================================================================================



$( document ).ready(function (){
    busGuide();
});
