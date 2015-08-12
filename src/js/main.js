'use strict';

var BUS = {
    servicesFunctionality : {},
    root: {},
    API: {
        servicesList: {},
        pages: [],
        initPage: function (namePage) {
            for (var i= 0; i < BUS.API.pages.length; i++) {
                BUS.API.pages[i].name == namePage ?
                    (
                        BUS.API.pages[i].pageFn(
                            (BUS.API.servicesList[BUS.API.pages[i].pageServices])()
                        )
                    ): undefined;
                //TODO:переписать это говно
            }
        }
    }
};


/**
 * This  servicesFunctionality.services , he brings together services in Singleton, and then provides access to these services COMPONENT
 */
BUS.servicesFunctionality.services = function (name,service) {
    var nameMe = name,
        serviceMe = service;

    BUS.API.servicesList[nameMe] = serviceMe;
};



/**
 * This  servicesFunctionality.pages , he brings together pages controllers , then when rout call some pages , this page init and rendering
 */
BUS.servicesFunctionality.pages = function(name,services,pageFn){
    var pageName = name,
        pageCode = pageFn,
        pageServices = services;


    BUS.API.pages.push(
        {
            name: pageName,
            pageFn: function (){
                return pageCode;
            },
            pageServices: pageServices
        }
    );
};



/**
 * This  components builder.
 */




//TODO:написать метод для проверки строк при агрегации сервисов
//TODO:написать метод для выброма ошибок и работы с ними
//TODO:сделать приватный апи для работы ядра


BUS.API.initPage('home_Page');


//document.addEventListener("DOMContentLoaded", function (){
//    BUS.router.listen();
//    BUS.router.set('/index.html');
//    BUS.router.setPage("/index2.html");
//});