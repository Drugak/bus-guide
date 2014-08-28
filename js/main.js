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

// START check localStoreg
    var checkLocalStoreg = function (){
        if (!localStorage.routeData){
            routeJson();
        } else {
            addBusRoute();
        }
    };
    checkLocalStoreg();
// START render bus item html

   function busItemWidget (){

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

// search
    function search (){
        var $jsSearchInput = $('.js-search-input'),
            currentSearch;

        $jsSearchInput.keyup(function (){
            $('#list-bus li').addClass('i-none');

            if ($jsSearchInput.val() == "") {
                return false;
            }
            currentSearch = $.inArray($jsSearchInput.val() , BusRouteTableArray) + 1;

//            console.log(currentSearch,'======',$("#list-bus li:nth-child("+ currentSearch +")"));

            $("#list-bus li:nth-child("+ currentSearch +")").removeClass('i-none');

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
