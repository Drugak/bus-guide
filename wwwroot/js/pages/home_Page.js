"use strict";BUS.servicesFunctionality.pages("home_Page",["storage"],function(){function e(){var t=new XMLHttpRequest;t.open("GET","/subscribe",!0),t.onreadystatechange=function(){if(4==this.readyState){if(200!=this.status)return void setTimeout(e,500);var t=document.createElement("li");t.appendChild(document.createTextNode(this.responseText)),messages.appendChild(t),e()}},t.send(null)}publish.onsubmit=function(){var e=new XMLHttpRequest;return e.open("POST","/publish",!0),e.send(JSON.stringify({message:this.elements.message.value})),this.elements.message.value="",!1},e()});