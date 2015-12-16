<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestPage.aspx.cs" Inherits="WWBase.Test.TestPage" %>
<%@ Register Src="~/Test/testEnvironment.js.ascx" TagPrefix="testAppControl" TagName="testEnvironmentjs" %>
<%@ Reference Control="~/Test/TestAppInstance.ascx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Widget Wrangler Test Harness</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <link rel="stylesheet" href="testPage.css" />
    <testAppControl:testEnvironmentjs runat="server" ID="testEnvironmentjs" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <img class="wwLogo" src="../wwLogo.png" />
            <h1>Widget Wrangler Tester&nbsp;&nbsp;&nbsp;</h1>
            <div class="container header">
                <div class="row">
                    <div class="col-sm-3">
                        SCENARIO
                    </div>
                    <div class="col-sm-3">
                        WIDGETS
                    </div>
                    <div class="col-sm-6">
                        LOG MESSAGES
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <asp:TextBox ID="scenarioTextBox" runat="server" TextMode="MultiLine" Height="300" CssClass="scenarioTextBox" />
                        <br />
                        <asp:Button ID="runScenario" runat="server" Text="RUN" OnClick="runScenario_Click" />
                    </div>
                    <div class="col-sm-3">
                        <asp:Panel ID="AppInstances" runat="server"></asp:Panel>
                    </div>
                    <div class="col-sm-6">
                        <ul id="messageList"></ul>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
