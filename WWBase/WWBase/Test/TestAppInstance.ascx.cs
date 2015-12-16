using System;
using System.Collections.Generic;
using System.Web;

namespace WWBase.Test
{
    public partial class TestAppInstance : System.Web.UI.UserControl
    {
        #region Public properties

        // Name - the name of the AngularJS app; must be unique across all app instances on the page
        public string Name { get; set; }
        
        // DependsOn - a string that defines the script dependencies to be tested.
        // Use () for parallel operation - for example,
        //    s1,(s2,s3),s4 will load s1, then s2 and s3 in parallel, then s4.
        public string DependsOn { get; set; }

        // InstanceNumber - a value passed to the Angular controller to ensure it's the right one
        public string InstanceNumber { get; set; }

        // ScriptTags - the script references to be rendered prior to the app's script reference
        public string ScriptReferences { get { return scriptReferences; } }
        private string scriptReferences = "";

        // Priority - the priority to be rendered for the app's script reference
        public string Priority { get { return priority.ToString(); } }
        private int priority = 1;     // AngularJS is always priority 0 for now

        #endregion

        #region Page Load
        protected string exceptionMessage = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!String.IsNullOrEmpty(DependsOn))
                {
                    string scriptDependsOn = ",";
                    string scriptDependsOnNext = ",";
                    var tokens = Tokenize(DependsOn);
                    foreach (Token token in tokens)
                    {
                        // Render the script reference
                        if (scriptDependsOn == ",")
                        {
                            // There are no dependencies yet - render this script with no dependencies
                            scriptReferences += String.Format(@"{{""src"": ""testScript.js.aspx?name={0}"", ""priority"":{1}}},",
                                token.value, priority);
                        }
                        else
                        {
                            // There are some depedencies - render this script with the dependencies for this priority level
                            scriptReferences += String.Format(@"{{""src"": ""testScript.js.aspx?name={0}&dependsOn={2}"", ""priority"":{1}}},",
                                token.value, priority, scriptDependsOn.Trim(','));
                        }
                        // If this is a new token, add it to the dependencies for the next priority level
                        if (!scriptDependsOn.Contains("," + token.value + ",") &&
                            !scriptDependsOnNext.Contains("," + token.value + ","))
                        {
                            scriptDependsOnNext += token.value + ",";
                        }
                        // If we are changing to a new priority, add all the dependencies from the last priority
                        if (token.priorityIncrement == 1)
                        {
                            // We are going to a new priority - add all the scripts from the previous priority to the
                            // dependency list
                            scriptDependsOn = scriptDependsOn.TrimEnd(',') + scriptDependsOnNext;
                            scriptDependsOnNext = ",";
                        }
                        // Adjust the priority
                        priority += token.priorityIncrement;
                    }
                }
            }
            catch (Exception ex)
            {
                this.exceptionMessage = "ERROR in widget " + this.Name + ": " + HttpUtility.HtmlEncode(ex.Message);
            }
        }

        #endregion

        #region Tokenizing for dependency string

        // A token representing a script to be loaded
        private class Token
        {
            public Token(string value, int priorityIncrement)
            {
                this.value = value;
                this.priorityIncrement = priorityIncrement;
            }
            public string value;
            public int priorityIncrement;
        }

        // Function to tokenize comma separated items with one level of parenthesis
        // For example, "a,(b,c),d" will return 3 tokens: "a", "b,c", and "d".
        private List<Token> Tokenize(string input)
        {
            List<Token> result = new List<Token>();

            var rawTokens = input.Split(',');    // "a", "(b", "c)", "d
            
            bool inGroup = false;
            foreach (string rawToken in rawTokens)
            {
                string value = "";
                if (rawToken.StartsWith("("))
                {
                    // Start a new group
                    if (inGroup)
                    {
                        throw new Exception("Attempt to nest groups: " + input);
                    }
                    inGroup = true;
                    value = rawToken.TrimStart('(');
                }
                else if (rawToken.EndsWith(")"))
                {
                    // End a group
                    if (!inGroup)
                    {
                        throw new Exception("Unmatched closing parenthesis" + input);
                    }
                    inGroup = false;
                    value = rawToken.TrimEnd(')');
                }
                else // Token has neither a ( or )
                {
                    value = rawToken;
                }
                if (value == "")
                {
                    throw new Exception("Empty dependency name in scenario");
                }
                result.Add(new Token(value, inGroup ? 0 : 1));
            }

            if (inGroup)
            {
                throw new Exception("Unmatched opening parenthesis" + input);
            }

            return result;
        }
        #endregion
    }
}