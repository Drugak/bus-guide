var busGuide = function () {

    var BusRoute;

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
        $('#list-bus').html(html);

        // open item bus
        $( "li.js-bus-item" ).click(function() {
            $(this).toggleClass('open');
        });
    };


// search
    var search = function () {
        var $jsBusItem = $('li.js-bus-item'),
            $jsCancelSearch = $('.js-cancel-search');


        $jsCancelSearch.removeClass('i-none');
        $jsBusItem.addClass('i-none');


        var searchItem = function (){
            $("[data-bus-number='"+ 4/2 +"']").removeClass('i-none');
        };

        var changeSearch = function (){
            var filter = $('input.js-search-input').val(),
                count = 0;

            var regex = new RegExp(filter, "i");
            // Loop through the comment list
            $(".commentlist li").each(function(){

                // If the list item does not contain the text phrase fade it out
                if ($(this).text().search(regex) < 0) {
                    $(this).hide();

                    // Show the list item if the phrase matches and increase the count by 1
                } else {
                    $(this).show();
                    count++;
                }
            });

        };



        changeSearch();

        //== cansel search
        var canselSearch = function (){
            $jsBusItem.removeClass('i-none');
            $jsCancelSearch.addClass('i-none');
        };
    };



    $('input.js-search-input').on('focus', function (){
        search();
    });
    $('div.js-cancel-search').on('click', function (){
        search.canselSearch();
    });
};


//====================================================================================



$( document ).ready(function (){
    busGuide();
});
