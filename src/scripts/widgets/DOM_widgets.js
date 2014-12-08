var test = function (s) {
    var API = {
        selector: s.slice(1),
        searchIdSelector: function () {
            return document.getElementById(API.selector);
        },
        searchClassSelector: function () {
            return document.getElementsByClassName(API.selector);
        }
    };

    var classOrId = (function () {
        if (s.charAt(0) == "#") {
            API.searchIdSelector(API.selector);
        } else if (s.charAt(0) == ".") {
            API.searchClassSelector(API.selector);
        }
    }(s));
}

// take DOM element
