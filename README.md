# Sending a Welcome Message to a New User 

> :sparkles: *Updated August 2018: As we have introduced the workspace app (currently in beta), this tutorial and the code samples have been updated using the new token model! All the changes from the previous version of this example, read the [diff.md](diff.md)*

*Learn more about the workspace app at the [Slack API doc](https://api.slack.com/workspace-apps-preview).*


Sample Slack app that presents a Terms of Service (or any other message) when a new user joins a team.

The user can accept the Terms of Service using message buttons. If a user has been presented with the Terms before and they haven't accepted, a background job can send them a reminder after a specific period of time. Eventually you can use the [SCIM API](https://api.slack.com/scim) to disable the user's account.

![term-of-service](https://user-images.githubusercontent.com/700173/27111030-42359a02-5062-11e7-9750-385ae9ca084e.png)

## Setup

#### Create a Slack app

1. Create a *workspace app* at [https://api.slack.com/apps?new_app_token=1]
2. Enable Interactive components (See *Enable Interactive Components* below)
3. Navigate to the **OAuth & Permissions** page and add the following scopes:
    * `chat:write`
    * `conversations.app_home:create`
4. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)
5. Enable the events (See *Enable the Events API* below. It doesn't let you  the Request URL until you run the code!)

#### Run locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/slack-terms-of-service-blueprint)
1. Get the code
    * Either clone this repo and run `npm install`
    * Or visit https://glitch.com/edit/#!/remix/slack-terms-of-service-blueprint
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your app's `xoxa-` token (available on the Install App page after the installation)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally:
    * Start the app (`npm start`)

#### Enable the Events API
1. Go back to the app settings and click on Events Subscriptions
1. Set the Request URL to your server (*e.g.* `https://yourname.ngrok.com`) or Glitch URL + `/events`
1. On the same page, subscribe to the `team_join` team events

#### Enable Interactive Messages
1. In the app settings, click on Interactive Messages
1. Set the Request URL to your server or Glitch URL + `/interactive-message`
