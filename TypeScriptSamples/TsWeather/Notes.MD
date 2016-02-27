1. To build - ctrl+shift+b in VS Code
2. To run - open console in this directory and run http-server. Then browse to http://localhost:8080




To make a type definition for a RESTful service -

- get working with any
- intercept the success response and error reason in the Chrome browser
- for each one - use Chrome's built-in copy function in the console while at a breakpoint and the response or reason are in scope. For example type copy(response). The JSON is now on your clipboard.
- use http://json2ts.com/ to translate the json into a type definition