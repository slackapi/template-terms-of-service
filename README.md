# Slack Terms of Service / Welcome message template

Sample Slack app that presents a Terms of Service (or any other message) when a new user joins a team.

The user can accept the Terms of Service using message buttons. If a user has been presented with the Terms before and they haven't accepted, a background job can send them a reminder after a specific period of time. Eventually you can use the SCIM API to disable the user's account.

![term-of-service](https://user-images.githubusercontent.com/700173/27057196-f288527a-4f7f-11e7-84d6-23de2d521bdf.gif)

## Setup

#### Create a Slack app

1. Create an app at api.slack.com/apps
1. Navigate to the Bot Users page and add a bot user
1. Navigate to the Install App page and install the app
1. Copy the `xoxb-` token after the installation process is complete

#### Clone and run this repo
1. Clone this repo and run `npm install`
1. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_TOKEN`: Your app's `xoxb-` token (available on the Install App page)
    * `SLACK_VERIFICATION_TOKEN`: Your app's Verification Token (available on the Basic Information page)
    * `PORT`: The port that you want to run the web server on
1. Start the app (`npm start`)
1. In another windown, start ngrok on the same port as your webserver (`ngrok http $PORT`)

#### Enable the Events API
1. Go back to the app settings and click on Events Subscriptions
1. Set the Request URL to your ngrok URL + /events
1. On the same page, subscribe to the `team_join` team events

#### Enable Interactive Messages

1. In the app settings, click on Interactive Messages
1. Set the Request URL to your ngrok URL + /interactive-message
