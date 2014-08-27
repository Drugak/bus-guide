var busGuide = function () {

    var BusRoute,
        BusRouteTableArray = [];

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
    function search () {
        var $jsBusItem = $('.js-bus-item'),
            $jsCancelSearch = $('.js-cancel-search'),
            $jsSearchInput = $('.js-search-input'),
            $jsCancelSearch = $('.js-cancel-search'),
            busNumber;

        $jsCancelSearch.removeClass('i-none');
        $jsBusItem.addClass('i-none');

        var runSearch = setInterval(function (){
            (function (){
                if ($jsSearchInput.val() == "") {                                                  ч
                    return false;
                }
                busNumber = $jsSearchInput.val();
                $jsBusItem.addClass('i-none');
                $("[data-bus-number=" + busNumber + "]").removeClass('i-none');
            })();
        },1000);

        $jsCancelSearch.on('click', function (){
            $jsSearchInput.val('');
            $(this).addClass('i-none');
            $jsBusItem.removeClass('i-none');
            clearInterval(runSearch);
        });

    }
    $('input.js-search-input').on('focus', function (){
        search();
    });

    console.log(BusRouteTableArray);

};


//====================================================================================



$( document ).ready(function (){
    busGuide();
});
