# Microsurvey Sample

This is a sample AngularJS application that uses the Widget Wrangler.
For details, see https://github.com/OfficeDev/PnP/tree/master/Samples/Provisioning.MicroSurvey

To use:

1. Modify Get-Settings.ps1 with the settings for your installation. The ScriptSiteUrl is the location
   of a site or site collection that will hold your application scripts; it should be readable by
   everyone and writable only by the account(s) that will update the scripts.

2. Use Install-Microsurvey to install the application into the Script Site

3. Use Add-Microsurvey -Url {siteUrl} to add the Microsurvey to a site with the same host name
   as the Script Site

