/**
 * Created by Noxval on 22.04.15.
 */
'use strict';

BUS.servicesFunctionality.pages("busInfo_Page", ['storage','mediator'], function (storage, mediator){
    this._storage = storage;
    this._mediator = mediator;

    console.log(_storage, _mediator);
    _storage.clearAll();
    var API = {

        },
        SETTINGS = {

        };
});
