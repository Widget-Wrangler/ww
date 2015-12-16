using System;

namespace WWBase.Test
{
    public partial class TestPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void runScenario_Click(object sender, EventArgs e)
        {
            if (!String.IsNullOrEmpty(scenarioTextBox.Text))
            {
                var scenarios = scenarioTextBox.Text.Split('\n');
                int i = 1;
                foreach (string scenario in scenarios)
                {
                    if (!String.IsNullOrWhiteSpace(scenario))
                    {
                        var scenarioDetails = scenario.TrimEnd('\r').Split(':');
                        if (scenarioDetails.Length == 1 || scenarioDetails.Length == 2)
                        {
                            var appInstanceControl = (WWBase.Test.TestAppInstance)LoadControl("~/Test/TestAppInstance.ascx");
                            appInstanceControl.Name = scenarioDetails[0];
                            appInstanceControl.DependsOn = scenarioDetails.Length == 2 ? scenarioDetails[1] : "";
                            appInstanceControl.InstanceNumber = (i++).ToString();
                            AppInstances.Controls.Add(appInstanceControl);
                        }
                    }
                }
            }
        }
    }
}