'use strict';

var BUS = {
    servicesFunctionality : {},
    API: {
        servicesList: {},
        pages: [],
        initPage: function (namePage) {
            for (var i= 0; i < BUS.API.pages.length; i++) {
                BUS.API.pages[i].name == namePage ? (BUS.API.pages[i].pageFn((BUS.API.servicesList[BUS.API.pages[i].pageServices])())): undefined;
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
 * This  servicesFunctionality.pages , he brings together pages controllers , then when routin call some pages , this page init and rendering
 */
BUS.servicesFunctionality.pages = function(name,services,pageFn){
    var pageName = name,
        pageCode = pageFn,
        pageServices = services;


    BUS.API.pages.push(
        {
            name: pageName,
            pageFn: pageCode,
            pageServices: pageServices
        }
    );
};

BUS.API.initPage('home_Page');