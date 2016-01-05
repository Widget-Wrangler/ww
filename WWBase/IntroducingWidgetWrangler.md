# Widget Wrangler

## What’s a widget, and why should I care?
In economics, a [widget](https://en.wikipedia.org/wiki/Widget_(economics)) is a name for a generic gadget
or manufactured good; on the web, a [widget](https://en.wikipedia.org/wiki/Web_widget) is a generic
piece of web functionality running on a page.
What makes widgets special is that, unlike controls in
ASP.NET or directives in AngularJS, widgets are generally
released separately from the web page that hosts them, and
are often deployed by end users.

If you’re reading this blog, you're probably familiar with
Microsoft SharePoint, and this might sound familiar …
a widget is a lot like a web part, only much lighter weight. In fact,
widgets can easily be hosted in content editor web parts, on a
list form, in a SharePoint add-in, or outside of SharePoint.
In fact, if you're careful, you can reuse the same widget
in all those contexts! The next time Microsoft comes out with a new
SharePoint or web development model (and you know they will!),
don't rewrite - just repackage your widgets.

Any snippet of HTML with JavaScript can be considered a widget,
however good widgets have additional attributes:

* They're isolated so they won't interfere with the web page that
hosts them, or with other widgets on the page. Ideally multiple copies
of a widget can run on a page with no interference.

* They load efficiently so users don't have to wait a long time for them
to render on the page.

* They're self contained so they can be reused easily. A widget that
depends on various script tags, CSS files, and other elements on a page
is more brittle and harder to reuse than a widget that is contained within
a single HTML element.

* They're developed using the power of modern JavaScript frameworks such
as AngularJS for supportability and testability. (This is purely optional,
however, and this article will explore widgets written in jQuery or
plain JavaScript.)

## Introducing Widget Wrangler

Today my colleague [Julie Turner](https://twitter.com/jfj1997) and I
are pleased to announce a new, light-weight JavaScript library for
managing widgets called the Widget Wrangler. It's available now
[on Github](https://github.com/Widget-Wrangler/ww) for your widget
wrangling pleasure. It's also part of the new JavaScript Core in
the January 2015 release of Microsoft's
[OfficeDev Patterns and Practices](https://github.com/OfficeDev/PnP)
library (hence the filename _pnp-ww.js_).

A widget consists of a single HTML element (the _widget root_ - 
usually a &lt;div&gt;) that contains HTML for the widget and a
script tag that references the Widget Wrangler. The script tag
includes custom attributes that tell Widget Wrangler what JavaScript
to load and how to "boot" the widget.

For example:

    <div>
        <div ng-controller="main as vm">
            <h1>Hello {{vm.name}}</h1>
        </div>
        <script type="text/javascript" src="pnp-ww.js"
                ww-appname="HelloWorld"
                ww-apptype="Angular"
                ww-appscripts='[{"src": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js", "priority":0},
                          {"src": "script.js", "priority":1}
          ]'>
        </script>
    </div>

The Widget Wrangler (pnp-ww.js) will load in-line, and will take care of
loading the dependent scripts (in this case Angular and script.js)
and bootstrapping the AngularJS application. The custom attributes tell
Widget Wrangler how to load the widget:

Tag | Required | Description
---|---|---
ww-appname | yes | Used to create a name for the app. In the case of an Angular widget, this is the module that will be passed to the angular.bootstrap function when starting the widget.
ww-apptype | no | Currently "Angular" is the only supported framework that will auto-bind upon load completion. 
ww-appbind | no | The function that should be executed when all the script files have completed loading.
ww-appscripts | yes | A JSON object that will be used to load the additional javascript libraries.  Define a src property for each script containing the location of the script file (using ~/ in the source tag specifies the file is in the same location as the pnp-ww.js file specified above.  Priority is the load priority, this is a 0 based list of implied load order.  Multiple source files may have the same priority if they do not depend upon each other to execute.) Use the priority property to specify a numeric priority. Priorities must begin at 0 and be defined in order (0, 1, 2 ...). Multiple scripts can be given the same priority in order to load them concurrently.

NOTE: It is necessary to specify ww-apptype (for an Angular widget) OR 
ww-appbind (to do the binding yourself).

A widget can either run as an AngularJS application, which is bound to the widget root,
or using a custom binding function specified in the ww-appbind attribute. In the latter
case, the widget root element is passed to the binding function so the widget can
access the browser DOM relative to the widget root instead of having to find it
on the page. This helps to isolate the widget. For example, it's common practice to
hard-code an HTML element ID and then find it with jQuery; this works fine for one
widget, but prevents multiple widgets with the same ID.

Widget Wrangler has no dependencies on other script libraries, and works with the same
browsers as AngularJS. With the exception if IE8, it works with the same browsers as
SharePoint 2013.

Widget Wrangler tries to load the scripts needed by each widget as efficiently as
possible, and will only load each script once even if it's used in multiple widgets.
(NOTE: The current implementation determines what scripts are the same using their
URL; a future version may be smart enough to identify multiple versions of common
libraries at different URL's.) Use the "priority" property in the ww-appscripts
attribute to control parallel script loading; for example all priority 0 scripts will
load in parallel, followed by priority 1 scripts, etc. Priority numbers must begin at 0
and must be contiguous (e.g. 0, 1, 2...) In the example above, script.js depends on
AngularJS, so AngularJS is given priority 0 (and loads first), and script.js is loaded
only when Angular (and any other priority 0) scripts are loaded.

## Widgets and JavaScript Frameworks

Widgets can be written using any number of JavaScript frameworks; this section will
explore some of the most popular.

### AngularJS Widgets

AngularJS is a favorite framework to use with widgets, mainly because of its MV*
design pattern and rich selection of services and directives. However AngularJS
was really designed for single-page applications (SPAs) that take over an entire
web page. A typical AngularJS application is "auto-bootstrapped" using the ng-app directive;
while this is fine for SPAs, the 
[documentation](https://docs.angularjs.org/api/ng/directive/ngApp#!) clearly states
that you can only have one ng-app directive on a page.

To get around this limitation and allow many widgets on a page, the Widget Wrangler 
uses the angular.bootstrap() function; there
is no hard limit on the number of Angular apps that can run on a page using this method.

(NOTE: If you want to use Widget Wrangler in a page that already uses AngularJS,
ensure that the widget doesn't overlap the existing Angular application - i.e. it can't
be inside the element that is decorated with ng-app. Also ensure the versions of Angular
are the same or similar enough that both the SPA and widget(s) will work with either
one.)

You can find a simple AngularJS widget at [http://bit.ly/ww-ng1](http://bit.ly/ww-ng1). 
This sample uses [Plunker](http://plnkr.co/) so you can run and experiment
with the code right in your web browser. In this sample you'll see two
instances of a Hello World widget


### Knockout Widgets
### jQuery Widgets
### Plain JavaScript Widgets



    ## Widgets in SharePoint

    ## The Widget Wrangler Manifesto

    ## Aspirations and Backlog

