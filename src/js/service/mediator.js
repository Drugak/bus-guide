/**
 * Created by Noxval on 10.04.15.
    BUS.mediator.subscribe('nameChange', function(arg) {
    console.log(this.name);
    this.name = arg;
    console.log(this.name);
   });

   BUS.mediator.publish('nameChange', 'david'); //tim, david
 */

"use strict"

BUS.servicesFunctionality.services('mediator', function() {
    var listen = function (channel,fn) {
            if(!mediator.channels[channel])
                mediator.channels[channel] = [];

            mediator.channels[channel].push({
                context: this,
                callback: fn
            });

            return this;
        },

        publish = function(channel) {
            if (!mediator.channels[channel]) return false;
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
                var subscription = mediator.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }

            return this;
        }



    return {
        channels: {},
        publish: publish,
        listen: listen,
        installTo: function(obj) {
            obj.listen = listen;
            obj.publish = publish;
        }
    };
});