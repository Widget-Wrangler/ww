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
SharePoint or web development model, don't rewrite - just repackage
your widgets.

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
loading the dependent scripts (as declared in the ww-appScripts attribute)
and bootstrapping the AngularJS application. Notice the custom attributes,
which tell Widget Wrangler how to load the widget:





    ## Widgets in SharePoint

    ## Widgets and JavaScript Frameworks

    ### AngularJS Widgets
    ### Knockout Widgets
    ### jQuery Widgets
    ### Plain JavaScript Widgets

    ## The Widget Wrangler Manifesto

    ## Aspirations and Backlog

