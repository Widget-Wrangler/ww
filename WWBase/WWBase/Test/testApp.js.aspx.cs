using System;

namespace WWBase.Test
{
    public partial class testApp : System.Web.UI.Page
    {
        public string appName = null;
        public string dependsOn = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["name"] != null)
            {
                this.appName = Request.QueryString["name"];
            }
            if (Request.QueryString["dependsOn"] != null)
            {
                this.dependsOn = Request.QueryString["dependsOn"];
            }

            Response.ContentType = "text/javascript";
        }
    }
}