/**
 * Created by Noxval on 10.04.15.
 */

    /**
     * API:
     *
     * var router = new Router();
     *
     * router.listen();
     *
     * router.on('/some', callback);
     * router.on('/some/:foo/:bar', function(response) {
     *      response.parameters.foo
     *      response.parameters.bar
     *      response.query | {one: 'two', three: 'four'} like ?one=two&three=four
     * });
     *
     * router.set('/foo/bar');
     *
     * @returns {{on: Function, off: Function, routes: *, resetOnReload: Function, reset: Function, listen: Function, back: Function, forward: Function, set: Function}}
     * @constructor
     */

    BUS.router = function () {
        var self = this;

        this.routes = {};

        this.disabledRoutes = {};

        this.history = window.history;

        this.reseted = false;

        /**
         *
         * @param route
         * @returns {*|XML|string|void}
         */
        this.clearHash = function (route) {
            return route.replace(/#/g, '');
        };

        /**
         *
         * @param route
         * @returns {XML|string}
         */
        this.clearSlashes = function (route) {
            return route.toString().replace(/\/$/, '').replace(/^\//, '');
        };

        /**
         *
         * @param query
         * @returns {{}}
         */
        this.parseQuery = function (query) {
            var result = {};
            var search = query ? query : location.search;
            search.replace(
                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                function ($0, $1, $2, $3) {
                    result[$1] = $3;
                }
            );
            return result;
        };

        var currentRoute = this.clearHash(location.hash);


        /**
         *
         * @param fire
         * @returns {*}
         */
        this.match = function (fire) {
            var route = self.clearHash(location.hash);
            route = self.clearSlashes(route);

            var currentPath = route.split('?');

            if (self.routes.hasOwnProperty(currentPath.first())) {

                if (fire) {
                    self.routes[currentPath.first()].forEach(function (callback) {
                        callback({
                            query: currentPath[1] ? self.parseQuery(currentPath.last()) : null
                        });
                    });
                } else {
                    return {
                        query: currentPath[1] ? self.parseQuery(currentPath.last()) : null
                    }
                }
            } else {
                var routes = Object.keys(self.routes),
                    len = routes.length,
                    path,
                    keys,
                    cleanPath = currentPath.first() + '/',
                    parameters = {},
                    match,
                    i;

                for (i = 0; i < len; i++) {
                    path = routes[i];
                    keys = path.match(/:([^\/]+)/g);
                    //console.time('match');
                    //match = cleanPath.match(new RegExp(path.replace(/:([^\/]+)/g, "([^\/]*)")+'+[^]$'));
                    match = cleanPath.match(new RegExp(path.replace(/:[^\s/]+/g, '([\\w-]+)') + '+[^]$'));

                    //console.timeEnd('match');
                    if (match) {
                        match.shift();

                        /**
                         *
                         */
                        keys = keys.map(function (key) {
                            return key.replace(':', '');
                        });

                        /**
                         *
                         */
                        match.forEach(function (value, i) {
                            parameters[keys[i]] = value;
                        });

                        /**
                         *
                         */

                        if (fire) {
                            self.routes[path].forEach(function (callback) {
                                callback({
                                    parameters: parameters,
                                    query: currentPath[1] ? self.parseQuery(currentPath.last()) : null
                                });
                            });
                        } else {
                            return {
                                parameters: parameters,
                                query: currentPath[1] ? self.parseQuery(currentPath.last()) : null
                            }
                        }
                        break;
                    }
                }
            }
            return false;
        };

        /**
         *
         * @param event
         */
        this.check = function (event) {
            if (self.reseted) {
                self.reseted = false;
            } else {
                if (event && self.clearSlashes(event.oldURL) === self.clearSlashes(event.newURL)) {
                    console.log('OldURl and NewURL is equal');
                    return false;
                }
                self.match(true);
            }
        };

        return {
            test: function(){
                console.log('flsadhjflsdfllakfjlds');
            },
            /**
             *
             * @param route
             * @returns {Router}
             */
            on: function (route) {
                var callback = arguments[1];
                route = self.clearSlashes(route);

                if (callback) {
                    if (self.routes.hasOwnProperty(route)) {
                        self.routes[route].push(callback);
                    } else {
                        self.routes[route] = [callback];
                    }
                } else if (self.disabledRoutes.hasOwnProperty(route)) {
                    self.routes[route] = self.disabledRoutes[route];
                    delete self.disabledRoutes[route];
                } else {
                    console.warn('Route ' + route + ' missing')
                }
                return this;
            },

            /**
             *
             * @param route
             * @returns {Router}
             */
            off: function (route) {
                route = self.clearSlashes(route);
                self.disabledRoutes[route] = self.routes[route];
                delete self.routes[route];
                return this;
            },


            routes: self.routes,
            disabledRoutes: self.disabledRoutes,

            /**
             *
             * @param routes
             * @returns {Router}
             */
            resetOnReload: function (routes) {
                routes = Array.isArray(routes) ? routes : [];
                if (routes.indexOf(currentRoute) !== -1) {
                    location.hash = '';
                    self.reseted = true;
                }
                return this;
            },

            /**
             *
             * @returns {Router}
             */
            reset: function () {
                self.routes = {};
                window.location.href = '';
                return this;
            },

            /**
             *
             * @returns {Router}
             */
            listen: function () {
                console.log('Route changes listening');
                window.addEventListener('hashchange', self.check, false);
                return this;
            },

            check: function () {
                self.check.call();
            },

            /**
             *
             * @returns {Router}
             */
            back: function () {
                console.log('History back');
                history.back();
                return this;
            },

            /**
             *
             * @returns {Router}
             */
            forward: function () {
                history.forward();
                return this;
            },

            reload: function () {
                location.reload(true);
            },

            get: function () {
                return self.match(false);
            },

            /**
             *
             * @param path
             * @returns {Router}
             */
            set: function (path) {
                if (typeof path === "string") {
                    location.hash = '/' + self.clearSlashes(path);
                }
                return this;
            }
        }
    };
BUS.router();

