'use strict';

var BUS = {
    servicesFunctionality : {},
    API: {
        servicesList: {}
    }
};


BUS.servicesFunctionality.services = function (name,service) {
    var nameMe = name,
        serviceMe = service;

        BUS.API.servicesList[nameMe] = serviceMe;
};




var  main = function () {
    var me = this;
    var privat = {
            privatFunction: function(){console.log("hello i privat");}
        },
        publickObj = {
            publick: function () {
                me.privat.privatFunction();
            }
        };

    return publickObj;
};