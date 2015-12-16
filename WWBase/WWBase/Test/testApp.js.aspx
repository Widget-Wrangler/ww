<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testApp.js.aspx.cs" Inherits="WWBase.Test.testApp" %>

(function () {

    try {
        var dependsOnQueryString = '<%=dependsOn%>';
        if (dependsOnQueryString) {
            var dependsOn = dependsOnQueryString.split(',');
            // Check to see if the scripts we depend on were loaded
            var dependenciesLoaded = true;
            var dependencyList = '';
            for (var i = 0; i < dependsOn.length; i++) {
                var checkFor = dependsOn[i].replace('(','').replace(')','');
                dependencyList += (dependencyList ? ',' : '') + checkFor;
                if (!wwTest.scriptsLoaded[checkFor]) {
                    // A script wasn't loaded and we were depending on it!
                    wwTest.logMessage('ERROR: Script for widget <%=appName%> expected script ' + checkFor + ' but it had not been loaded');
                    console.log(wwTest.message);
                    dependenciesLoaded = false;
                }
            }

            // If the dependencies were loaded, then register this script as loaded
            if (dependenciesLoaded) {
                wwTest.logMessage('Loaded script for widget <%=appName%> with depenencies ' + dependencyList);
            }
        } else {
            wwTest.logMessage('Loaded script for widget <%=appName%> with no dependencies');
        }

    } catch (e) {
        console.log("Error processing query string parameters: " + e);
        wwTest.logMessage("Error processing query string parameters: " + e);
    }

    angular
      .module('<%=appName%>', [])

      // Main controller 
      .controller('main', ['$log', '$interval',
        function controller($log, $interval) {

            var vm = this;
            vm.appName = "(<%=appName %>)";
            vm.passed = false;
            vm.highlight = ' ';
            $interval (function() {
                if (vm.highlight === ' ') {
                    vm.highlight = '*';
                } else {
                    vm.highlight = ' ';
                }
            }, 1000);


            try {
                var dependsOnQueryString = '<%=dependsOn%>';
                if (dependsOnQueryString) {
                    var dependsOn = dependsOnQueryString.split(',');
                    // Check to see if the scripts we depend on were loaded
                    var dependenciesLoaded = true;
                    for (var i = 0; i < dependsOn.length; i++) {
                        var d = dependsOn[i].replace("(","").replace(")","");
                        if (!wwTest.scriptsLoaded[d]) {

                            // A script wasn't loaded and we were depending on it!
                            wwTest.logMessage('ERROR: Widget <%=appName%> expected script ' + dependsOn[i] + ' but it had not been loaded');
                            console.log(wwTest.message);
                            dependenciesLoaded = false;
                        }
                    }

                    // If the dependencies were loaded, then register this script as loaded
                    if (dependenciesLoaded) {
                        wwTest.appsLoaded['<%=appName%>'] = true;
                        wwTest.logMessage('Bootstrapped widget <%=appName%> with depenencies ' + dependsOnQueryString);
                        vm.passed = true;
                        vm.message = "PASSED";
                    } else {
                        vm.message = "MISSING DEPENDENCY";
                    }
                } else {
                    wwTest.appsLoaded['<%=appName%>'] = true;
                    wwTest.logMessage('Bootstrapped widget <%=appName%> with no dependencies');
                    vm.passed = true;
                    vm.message = "PASSED";
                }

            } catch (e) {
                console.log("Error processing query string parameters: " + e);
                wwTest.logMessage("Error processing query string parameters: " + e);
                vm.message = "ERROR";
            }
        }
      ]) // End Main controller

}());