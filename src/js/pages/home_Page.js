/**
 * Created by Noxval on 22.04.15.
 */
'use strict';

BUS.servicesFunctionality.pages("home_Page", ['storage'], function (storage){

    publish.onsubmit = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/publish", true);
        xhr.send(JSON.stringify({message: this.elements.message.value}));
        this.elements.message.value = '';
        return false;
    };
    subscribe();
    function subscribe() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/subscribe", true);
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                setTimeout(subscribe, 500);
                return;
            }
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(this.responseText));
            messages.appendChild(li);
            subscribe();
        };
        xhr.send(null);
    }

});