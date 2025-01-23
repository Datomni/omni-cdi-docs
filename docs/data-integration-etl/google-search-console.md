---
sidebar_position: 4
---

# Config: Google Search Console 

Here you will find specific details related to enabling the Omni ETL micro-application to run regular data syncs from Google Search Console.

## Authorizing Google Search Console

Once you have deployed your Omni ETL GSC instance to the domain of your choice, you need to ensure that you have the proper credentials to access the Google Search Console API.

First, create or open a project in Google Cloud Console.

In the Google Cloud Console, navigate to the "APIs & Services" > "Library" section. Search for "Google Search Console API" and enable it for your project.

Next, in the Google Cloud Console, navigate to "APIs & Services" > "Credentials". Click on "Create credentials" and select "OAuth client ID".

Choose "web application" as the application type and set the authorized redirect URIs to the domain that identifies your deployed Omni ETL application. After granting access, Google will redirect users back to this site with an authorization code.

Once created, note down the Client ID and Client Secret, and add them to your `.env` file with `GOOGLE_KEY` and `GOOGLE_SECRET` keys.