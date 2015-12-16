<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="testEnvironment.js.ascx.cs" Inherits="WWBase.Test.testEnvironment_js" %>
<script>
    'use strict';

    var wwTest = window.wwTest || function () {

        function zeroPad(num, places) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        }

        return {
            scriptsLoaded: [],
            appsLoaded: [],
            startTime: (new Date()).getTime(),
            logMessage: function (message) {
                var interval = (new Date()).getTime() - wwTest.startTime;
                var ul = document.getElementById('messageList');
                ul.appendChild(document.createElement('li')).innerText = '[' + zeroPad(interval, 5) + '] ' + message;
            }
        };

    }();
</script>