<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testScript.js.aspx.cs" Inherits="WWBase.Test.testScript" %>

'use strict';

(function () {
    
    try {
        var dependsOnQueryString = '<%=dependsOn%>';
        if (dependsOnQueryString) {
            var dependsOn = dependsOnQueryString.split(',');
            // Check to see if the scripts we depend on were loaded
            var dependenciesLoaded = true;
            for (var i = 0; i < dependsOn.length; i++) {
                if (!wwTest.scriptsLoaded[dependsOn[i]]) {
                    // A script wasn't loaded and we were depending on it!
                    wwTest.logMessage('ERROR: Script <%=name%> expected script ' + dependsOn[i] + ' but it had not been loaded');
                    console.log(wwTest.message);
                    dependenciesLoaded = false;
                }
            }

            // If the dependencies were loaded, then register this script as loaded
            if (dependenciesLoaded) {
                wwTest.scriptsLoaded['<%=name%>'] = true;
                wwTest.logMessage('Loaded script <%=name%> with depenencies ' + dependsOnQueryString);
            }
        } else {
            wwTest.scriptsLoaded['<%=name%>'] = true;
            wwTest.logMessage('Loaded script <%=name%> with no dependencies');
        }

    } catch (e) {
        console.log("Error processing query string parameters: " + e);
        wwTest.logMessage("Error processing query string parameters: " + e);
    }

})();
