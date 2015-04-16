
   /**
     * Each template must be stored to a <script id="template-$$template-name" type="text/jstemplate">
     * Refer original author page for usage. 
     * small example:
     * Template: 
     *    <script type="text/jstemplate" id="channelWidget">  
     *          <li class="arrow channelWidget playlistWidget" channel_id="<%=id%>"><a href="javascript:;">
     *                <img class="channel_logo" style="width: 148px; height: 148px;" src="<%=big_logo%>" />
     *                <span class="channel_title"><%=title%> 
     *          </a></li>
     *    </script>
     * Usage in JS: 
     *    Bus.template("channelWidget", channelToRender).appendTo('#playlist') ;
     * You can also retrieve plain html instead of jquery object by passing optional third parameter as true
     *    document.getElementById('channelView').innerHTML =
     *        Bus.template("channelView", channelToRender, true);
     * Regards.  
     */
    ;(function theTemplateCore($) {
       BUS = typeof BUS == "undefined" ? {} : BUS;


        var cache = {};
       BUS.template = function template(str, data, plain_html) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str)
                ? cache[str] = cache[str] || template(document.getElementById('template-' + str).innerHTML)

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            : new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +
                    // Convert the template into pure JavaScript
                    str
                      .replace(/[\r\t\n]/g, " ")
                      .split("<%").join("\t")
                      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                      .replace(/\t=(.*?)%>/g, "',$1,'")
                      .split("\t").join("');")
                      .split("%>").join("p.push('")
                      .split("\r").join("\\'")
                        + "');}return p.join('');");

            // Provide some basic currying to the user
            return data
                    ? ( plain_html ? fn( data ) : $(fn(data)) )
                            : fn;
        };
    })(jQuery);


