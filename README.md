Widget Wrangler
=======================================

### Summary ###
The Widget Wrangler is a light weight framework for managing the loading of javascript
"widgets" on a web page. Widgets are self contained, and and can be developed in any
JavaScript framework such as AngularJS, jQuery, KnockOut, or plain JavaScript.
Widgets are easy to reuse in multiple execution environments, such as on a
SharePoint page, in a content editor web part, in a SharePoint add-in, or outside of
SharePoint entirely.

### Applies to ###
-  Office 365 Multi Tenant (MT)
-  Office 365 Dedicated (D)
-  SharePoint 2013 on-premises

### Prerequisites ###
N/A

### Solution ###
Solution | Author(s) 
---------|----------
pnp-ww.js | Bob German and Julie Turner

### Version history ###
Version  | Date | Comments
---------| -----| --------
1.0.2 | Jan 31, 2017 | Added ww-appConfig feature, Brian P. McCullough
1.0.1 | Mar 15, 2016 | Added CSS support and support for multiple Angular modules. Added TypeScript sample.
1.0.0 | Jan 1, 2016 | Initial release

### Disclaimer ###
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS 
OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR 
PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


----------


# Introduction #
Widget Wrangler started out as a way to run multiple AngularJS applications on one page so
we could use Angular in "App Script Parts" that run in Content Editor Web parts.
It also manages the efficient loading when multiple web parts on a page 
use the same javascript extension libraries (i.e. jquery.js, angular.js, knockout.js, etc).  

Over time we've discovered that this promotes code reuse of the widgets themselves into
different environments (in a web part, on a form, in an app part, etc.) - and of parts
of widgets (such as shared Angular services).

The Widget Wrangler grew out of the
["Well Tempered AngularJS Web Part"](http://bob1german.com/2015/03/21/the-well-tempered-angularjs-web-part/)
shown at [Ignite 2015](https://channel9.msdn.com/Events/Ignite/2015/BRK4125).


## Use ##

The Widget Wrangler works by adding a script tag that runs the widget wrangler as the
a child element of the "widget".  For example, a widget might live in a &lt;div&gt; element;
the ww script needs to be referenced within that element. For example,

```
<div>
  <div ng-controller="main as vm">
    <h1>Hello {{vm.name}}</h1>
  </div>
  <script type="text/javascript" src="pnp-ww.js" 
          ww-appName="HelloWorld" 
          ww-appType="Angular"
          ww-appScripts='[{"src": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js", "priority":0},
                          {"src": "script.js", "priority":1}
          ]'>
  </script> 
</div>
```

The pnp-ww script will load in-line, and will take care of loading the dependent
scripts (as declared in the ww-appScripts attribute) and bootstrapping the Angular
add-in. As you can see, the script tag has the standard "type" and "src" attributes,
which points to the copy of pnp-ww.js.  Then additional custom tags are included which
are used by the wrangler.

Tag | Required | Description
---|---|---
ww-appName | yes | Used to create a name for the app. In the case of an Angular widget, this is the module that will be passed to the angular.bootstrap function when starting the widget. If multiple Angular modules need to be booted, you can pass a collection of strings instead of a single string.
ww-appType | no | Currently "Angular" is the only supported framework that will auto-bind upon load completion. 
ww-appBind | no | The function to be executed when all the script files have completed loading.
ww-appConfig | no | A string to be passed to the ww-appBind function, use this to pass configuration information to your widget
ww-appCss | no | A JSON object that defines the css files the widget needs in order to run
ww-appScripts | yes | A JSON object that defines the javascript files the widget needs in order to run

NOTE: It is necessary to specify ww-apptype (for an Angular widget) OR 
ww-appbind (to do the binding yourself).

## Examples ##

### Angular.JS ###

This example will load an AngularJS application with many dependent scripts. Notice that the priorities begin at 0
and ascend from there, and that some of the scripts can be loaded simultaneously as defined by them having the same priority.

```
<div>  <!-- This is the widget "root" -->
    <div ng-controller="ExampleCtr">
        <div>{{my.example}}</div>
        .....
    </div>
	<script type="text/javascript"
            src="/Style%20Library/WebParts/js/pnp-ww.js"
            ww-appname="ExampleApp"
            ww-apptype="Angular"
            ww-appcss='[{"src": "~/styles.css", "priority":0}]'
            ww-appscripts='[{"src": "~/angular.1.3.15.min.js", "priority":0},
		                    {"src": "~/jquery-2.1.4.min.js", "priority":1},
							{"src": "~/BlueMetalCommon.js", "priority":1},
							{"src": "~/jquery.jcarousel.min.js", "priority":2},
							{"src": "~/jcarousel.basic.js", "priority":2},
							{"src": "~/Example.js", "priority":3}]'>
    </script>
</div>
```

### Custom Bind Function ###

This example will load an application with many dependent scripts. This may or may
not be an Angular application; instead the developer has defined a function,
My.initWidget, that will be called to start the application. This function is always
called with a single argument, which is the DOM element of the widget root.
This can be used to write widgets in plain JavaScript, jQuery, Knockout, or other
JavaScript frameworks.

```
<div> <!-- Widget root -->
    <div> <!-- Whatever else you need -->
        .....
    </div>
	<script type="text/javascript"
            src="/Style%20Library/WebParts/js/pnp-ww.js"
            ww-appname="ExampleApp"
            ww-appbind="My.initWidget"
            ww-appscripts='[{"src": "~/jquery-2.1.4.min.js", "priority":0},
							{"src": "~/BlueMetalCommon.js", "priority":0},
							{"src": "~/jquery.jcarousel.min.js", "priority":1},
							{"src": "~/jcarousel.basic.js", "priority":1},
							{"src": "~/Example.js", "priority":2}]'>
    </script>
</div>
```

### Configuration Information ###

When using Angular 1.x, configuration information can be provided via the ng-init
directive; for an example of this see http://bit.ly/ww-ng1-2. However when using
other frameworks with the ww-appBind attribute, there needs to be a way to provide
configuration information to the widget. Brian McCullough kindly added this feature
to the widget wrangler. Use the ww-appConfig attribute to pass a string to your widget.
If you pass in a JSON string, you can use JSON.parse() to parse it in your code,
as shown in this Knockout example http://bit.ly/ww-ko2.

```
<div> <!-- Widget root -->
    <div> <!-- Whatever else you need -->
        .....
    </div>
	<script type="text/javascript"
            src="/Style%20Library/WebParts/js/pnp-ww.js"
            ww-appname="ExampleApp"
            ww-appbind="My.initWidget"
            ww-appConfig='{"key1":"value1","key2","value2"}'
            ww-appscripts='[{"src": "~/jquery-2.1.4.min.js", "priority":0},
							{"src": "~/BlueMetalCommon.js", "priority":0},
							{"src": "~/jquery.jcarousel.min.js", "priority":1},
							{"src": "~/jcarousel.basic.js", "priority":1},
							{"src": "~/Example.js", "priority":2}]'>
    </script>
</div>
```

### Use in SharePoint ###
The [Provisioning.Microsurvey](https://github.com/OfficeDev/PnP/tree/master/Samples/Provisioning.MicroSurvey)
sample shows how to use the Widget Wrangler to load an application as:

 * A SharePoint hosted add-in
 * A "drag and drop" app script part that can be placed directly in a SharePoint site
 * A centrally managed app script part that can be used directly in many SharePoint sites and updated from a central location  

## Additional documentation ##
Please watch our blogs for additional writeups and documentation:
 * [Julie Turner's blog, "SharePoint Veni, Vidi, Vici"](http://sharepointvenividivici.typepad.com/)
 * [Bob German's blog, "Vantage Point"](http://bob1german.com/)

Also, check out these Plunker examples, ready for your experimentation!

 1. __[Angular Sample 1:](http://bit.ly/ww-ng1)__ 
This is a simple "Hello World" example in AngularJS
 2. __[Angular Sample 2:](http://bit.ly/ww-ng2)__ 
A simple weather widget in AngularJS, shows how to pass configuration information
into a widget (in this case, it's the city to display the weather of)
 3. __[Angular Sample 3:](http://bit.ly/ww-ng3)__
Connected widgets in AngularJS, shows how to share a service across different widgets
and illustrates the degree of isolation between Angular widgets
 4. __[Plain JavaScript Sample:](http://bit.ly/ww-js1)__
Shows how to write a widget in plain JavaScript with full isolation
 5. __[jQuery Sample:](http://bit.ly/ww-jq1)__
Shows how to convert existing jQuery code - in this case a jQuery UI example -
into a widget that can run in isolation so you can have multiple copies
on the same page
6. __[KnockoutJS Sample:](http://bit.ly/ww-ko1)__
This is a simple "Hello World" example in KnockoutJS.
7. __[KnockoutJS Sample:](http://bit.ly/ww-ko1)__
Variation on the Knockout sample passing the text labels in via the appConfig attribute

# Test Framework #

The Widget Wrangler team has a test framework to exercise
the Widget Wrangler in many combinations on a web page. The tester
checks load times, script dependencies, and AngularJS application
isolation, and is available on request from @Bob1German or @jfj1997.

# Version dependencies #

N/A

# Multilingual support #

N/A

