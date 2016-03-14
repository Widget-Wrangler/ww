# Widget Wrangler Developer's Reference

Widget Wrangler manages "widgets" - small, self contained programs in
HTML, CSS, and JavaScript. Each widget is contained in a single HTML
element called the "widget root". For example:

    <div>  <!-- This is the widget root -->
        <div ng-controller="main as vm">
            <h1>Hello {{vm.name}}</h1>
        </div>
        <script type="text/javascript" src="pnp-ww.js"
                ww-appName="HelloWorld"
                ww-appType="Angular"
                ww-appCss='[{"src": "stylesheet.css", "priority":0}]'
                ww-appScripts='[{"src": "angular.min.js", "priority":0},
                                {"src": "script.js", "priority":1}
          ]'>
        </script>
    </div>

The Widget Wrangler is invoked via a script tag referencing pnp-ww.js; this
is always an immediate child of the widget root. Widget Wrangler loads in-line and:

 * loads the scripts and css files the widget needs (in this case stylesheet.css, angular.min.js, and script.js)
 * starts the widget, either by bootstrapping an AngularJS application or calling a developer-provied function. In either case, the widget root element is passed to the bootstrap function to allow it work with the element and its desendants.

A set of custom attributes on this script tag tells Widget Wrangler how to load the widget:

Tag | Required | Description
---|---|---
ww-appName | yes | Used to create a name for the app. In the case of an Angular widget, this is the module that will be passed to the angular.bootstrap function when starting the widget. If multiple Angular modules need to be booted, you can pass a collection of strings instead of a single string.
ww-appType | no | Currently "Angular" is the only supported framework that will auto-bind upon load completion. 
ww-appBind | no | The function to be executed when all the script files have completed loading.
ww-appCss | no | A JSON object that defines the css files the widget needs in order to run
ww-appScripts | yes | A JSON object that defines the javascript files the widget needs in order to run

NOTE: It is necessary to specify ww-apptype (for an Angular widget) OR 
ww-appbind (to do the binding yourself).

The ww-appScripts and optional ww-appCss elements contain JSON objects that tell Widget Wrangler
what scripts to load before bootstrapping the widget. This is a collection of
objects in which each object contains properties as follows:

Tag | Required | Description
---|---|---
src | yes | URL of the script to be loaded; this can be absolute, relative to the page, or by using a tilde prefix, relative to the pnp-ww.js script (for example, src=~/myscript.js)
priority | yes | An integer indicating the order in which the script should be loaded; first priority 0 scripts will be loaded, then priority 1, etc. Priorities must begin at 0 and not skip any numbers, and scripts in the collection are expected to be in priority order. Multiple scripts can be declared at the same priority level in order to load them concurrently.

A widget can either run as an AngularJS application, which is bound to the widget root,
or using a custom binding function specified in the ww-appbind attribute. In the latter
case, the widget root DOM element is passed to the binding function so the widget can
access the browser DOM relative to the widget root instead of having to find it
on the page. This helps to isolate the widget. For example, it's common practice to
hard-code an HTML element ID and then find it with jQuery; this works fine for one
widget, but prevents multiple widgets with the same ID.

Widget Wrangler has no dependencies on SharePoint or other script libraries, and works with the same
browsers as AngularJS. IE8, which is only supported by a special build of AngularJS 1.3/1.4, is not currently supported - ergo it will not work with SharePoint 2010 which forces the pages to run in IE8 emulation mode.  Widget Wrangler works with the same browsers as SharePoint 2013.

Widget Wrangler tries to load the scripts and css needed by each widget as efficiently as
possible, and will only load each script and css file once even if it's used in multiple widgets.
(NOTE: The current implementation determines what scripts are the same using their
URL; a future version may be smart enough to identify multiple versions of common
libraries at different URL's.) Use the "priority" property in the ww-appScripts
attribute to control parallel script loading; for example all priority 0 scripts will
load in parallel, followed by priority 1 scripts, etc. Priority numbers must begin at 0
and must be contiguous (i.e. 0, 1, 2...) In the example above, script.js depends on
AngularJS, so AngularJS is given priority 0 (and loads first), and script.js is loaded
only when Angular (and any other priority 0) scripts are loaded.

