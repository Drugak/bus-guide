'use strict';


var fs      = require('fs');
var os      = require('os');
var async   = require('async');
var csv     = require('csv');
var extend  = require('node.extend');



/**
 *
 * И вроде бы всё есть
 * И даже на жопе шерсть
 * Но вот что-то всё не то
 * И не понятно что
 * И вроде бы всё пиздато
 * И хуй с ним с блоком НАТО
 * Но вот только когда напьюсь
 * Мне снится Советский Союз
 *
 * (с) Ленинград
 *
 */

module.exports = function ( grunt) {
    var splitAndTrimRoute = function(route) {
        route = route.split(',');
        for ( var i=0; i<route.length; i++) route[i] = route[i].trim();
        return route;
    };
    function parseNumberOfTrips( numberOfTrips) {
        /*
         * examples: 15(15) в птн. 3; 200 (180/160)  ;60/60 12
         */
        //numberOfTrips = "60/60\n12";
        numberOfTrips = numberOfTrips.split("\n")[0];
        //numberOfTrips = numberOfTrips.replace(/\s+/g, '').match( /(\d+)(?:\(|\/)(\d+)/);
        numberOfTrips = numberOfTrips.replace(/\s+/g, '').match( /(\d+|-)(?:\(|\/)((?:\d+|-))/);
        return {
            workdays : numberOfTrips[1] == "-" ? null : numberOfTrips[1],
            weekdays : numberOfTrips[2] == "-" ? null : numberOfTrips[2]
        };

    }

    var columnTransformations = [
        function(routeNumber) { // the Route number aka '№ маршр. '. Column #2, example data: 108а

            return {
                "routeNumber" : routeNumber
            };
        },
        function(transportMode) { // transport mode, column #3, aka  Режим движения
            var value = transportMode ; // save source for later debuggig/log verbose
            transportMode = transportMode.replace(/\s+/g, ' '); // remove extra double whitespaces
            /*
                «мт» - режим движения «маршрутное такси»,
                «мк» – автобусы малого класса;
                «об авт» - режим движения «обычный»,
                «авт» - класс автобуса – большого класса.
             */


            // This unique implementations expecting that knownNodesMap.abbreviations[x] must be relates to transport
            // mode with ident knownNodesMap.idents[x], where 0<= x <= $length, and
            // knownNodesMap.idents.length == $length == knownNodesMap.abbreviations
            // Sorry for this probably 'not best' implementation (actually it smells like vagina of rotten corpse).
            var knownModesMap = {
                abbreviations: ["мт мк",  "об авт",  "мт",   "мк",       "об",      "авт"],
                idents       : ["taxi" ,  "standard","taxi", "smallbus", "standard","bus"]
            };
            var transportModesRepo = { // modify transportModes here - for description, idents, or so on.
                "taxi"      : "маршрутное такси",
                "smallbus"  : "автобусы малого класса",
                "standard"  : "обычный",
                "bus"       : "автобус большого класса"
                /** example expected extension: instead of string return here an object with required fields like
                 * "taxi" : {
                 *   ident: "taxi",
                 *   abbreviation : "мт мк",
                 *   name : "маршрутное такси",
                 *   description: "древние мерседес спринтеры с проперженными сидениями и водителем таджиком. Основной тип транспорта в Южной пальмире"
                  * }
                 */
            };
            var result = {
                transportModes : []
            };
            for ( var i =0; i< knownModesMap.abbreviations.length ; i++ ) {
                var abbr  = knownModesMap.abbreviations[i];  // "мт мк"
                var ident = knownModesMap.idents[i]; // "taxi"
                if ( transportMode.indexOf(abbr) >= 0 ) {
                    transportMode = transportMode.replace(abbr, '');
                    if ( !transportModesRepo.hasOwnProperty(ident) ) {
                        grunt.log.error("Logic error: опять какую то хуйню в коде написал. нет такого идента " + ident);
                    } else {
                        result.transportModes.push(transportModesRepo[ident]);
                    }
                }
            }
            if ( transportMode.replace(/\s+/g, '').length > 0 ) {
                grunt.log.warn(" Possibly unknown transport mode. Remaining " + transportMode + " source is " + value);
                return null;
            }
            return result;
        },
        function (routeName) {
            //console.log(["routeName", routeName.trim()]);
            return {
                routeName: routeName.trim()
            };
        },
        function (directRoute) {
            return {
                directRoute : splitAndTrimRoute(directRoute)
            };
        },
        function (reverseRoute) {
            return {
                reverseRoute : splitAndTrimRoute(reverseRoute)
            };
        },
        function (routeTimes) {
            // Время нач. и оконч. работы маршрута
            routeTimes = routeTimes.replace('–', '-');
            return {
                startRouteTime : routeTimes.split("-")[0].replace('.', ':'),
                endRouteTime   : routeTimes.split("-")[1].replace('.', ':')
            };
        },
        function (numberOfDirectTrips) { // количество выездов раб. (вых.)
            return {
                directTrips: parseNumberOfTrips(numberOfDirectTrips)
            };
        },
        function (numberOfReverseTrips) {
            /**
             * Кол-во оборотных рейсов Раб. (Вых.)
             */
            return {
                reverseTrips : parseNumberOfTrips(numberOfReverseTrips)
            };
        },
        function  (str) {
            // str = "63,3 км";
            return {
                routeLengthInKM: str.replace(',', '.').replace(/\s+км/ig, '') * 1.0
            };
        },
        function routeDuration (str) {
            // Время оборотн.  рейса по паспорту
            // 95 мин
            var res = {
                routeDurationInMinutes : str.replace(/\s+мин/ig, '') * 1.0
            };
            res.routeDurationInHours = res.routeDurationInMinutes / 60;
            res.routeDuration  = res.routeDurationInMinutes * 60; // in seconds
            return res;
        }
    ] ;
    grunt.registerTask('csvparser',
        'A sample task which parse CSV with official reply of Odessa Transport Department ',
        function(pathToCsv) {
            if ( arguments.length <2 ) {
                grunt.log.error(this.name + " error: not enough arguments. ");
                grunt.log.error("Usage: grunt " + this.name + ":[path-to-source-csvfile]:path-to-output-json");
                return false;
            }
            var filepath   = arguments[0];
            var outputpath = arguments[1];
            var done = this.async();

            var rownumber = 0;
            var output = [];
            setTimeout(function() {
                csv().from.stream(fs.createReadStream(filepath))
//                    .to.path(__dirname + '/../data/route-network.json')
                    .transform(function(row) {
                        rownumber++;
                        if (rownumber==1 ) return null; // skip first line ( headings)

                        row.shift(); // ignore first column "row index" aka "№ п/п"

                        var theRoute = {}, property = null;
                        for ( var i=0; i<row.length; i++) {
                            if ( typeof columnTransformations[i] != 'function') {
                                //grunt.log.error("Missing transformation function for column #" + i +
                                //" (with value '" + JSON.stringify(row[i]) + "'), ignoring it. ");
                                continue;
                            }

                            property = columnTransformations[i].call(this, row[i]);
                            if ( ! property ) {
                                grunt.log.error("Unable to transform column #" + i + " at row " + rownumber + " (value " + row[i] +"), ignored");
                                grunt.log.error("Entire row is " + JSON.stringify(row) );
                                continue;
                            }

                            theRoute = extend(true, theRoute, property);
                        }
                        //console.log(JSON.stringify(theRoute));
                        output.push(theRoute);
                        return  true;
                    })
                    .on('record', function(row, index) {
                        //grunt.log.debug('#' + index + ' ' + JSON.stringify(row));
                    })
                    .on('end', function(count) {

                        var writeStream = fs.createWriteStream(outputpath);
                        writeStream.write(JSON.stringify(output));
                        done(true);
                    })
                    .on('error', function(error){
                        grunt.log.error(error.message);
                        done(false);
                    });


            }, 1);
            return true;
        }
    );

};