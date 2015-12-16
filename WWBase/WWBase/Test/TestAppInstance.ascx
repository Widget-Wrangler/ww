<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TestAppInstance.ascx.cs" ClassName="TestAppInstance" Inherits="WWBase.Test.TestAppInstance" %>
<div>
    
    <% 
       if (String.IsNullOrEmpty(exceptionMessage))
       { 
    %>
    <div ng-controller="main as vm" ng-class="{'passed': vm.passed, 'failed': !vm.passed}" ng-init="vm.counter='<%=InstanceNumber %>'">
        Widget {{vm.counter}} {{vm.appName}} {{vm.message}} {{vm.highlight}}
    </div>
    
    <script type="text/javascript"
            src="../pnp-ww.js"
            ww-appname="<%=Name %>"
            ww-apptype="Angular"
            ww-appscripts='[{"src": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js", "priority":0},
                    <%=ScriptReferences %>
                    {"src": "testApp.js.aspx?name=<%=Name %>&dependsOn=<%=DependsOn %>", "priority":<%=Priority %>}
        ]'>
    </script>
    <% 
       }
       else
       {
    %>
    <div class="failed"><%=exceptionMessage %></div>
    <% 
        }
    %>
</div>
