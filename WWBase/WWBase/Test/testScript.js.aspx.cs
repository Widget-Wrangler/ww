using System;

namespace WWBase.Test
{
    public partial class testScript : System.Web.UI.Page
    {
        public string name = "";
        public string dependsOn = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["name"] != null)
            {
                this.name = Request.QueryString["name"];
            }
            if (Request.QueryString["dependsOn"] != null)
            {
                this.dependsOn = Request.QueryString["dependsOn"];
            }

            Response.ContentType = "text/javascript";
        }
    }
}