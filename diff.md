# What's New? - Updates from the Previous Example

Now all the Blueprints examples have been updated with new Slack platform features. So what are the *diffs* in this updated example?

---
## Changes made in December 2019


## OAuth Scopes and Permission

We’ve made major improvements to the way scopes work for apps. 
The `bot` scope used to be very broad and permissive, but now you can request more specific and granular permissions for your app. 

This sample app previously needed the `bot`, and `chat:write:bot` scopes, but now you need the `users:read` scope to read user info, 
and `chat:write` and `im:write` to post messages in channels and DM respectively. But no other actions can be made unless you give more permissions. 

We recommend selecting only the scopes your app needs. Requesting too many scopes can cause your app to be restricted by a team’s Admin or App Manager.

Please read [Scopes and permissions](https://api.slack.com/scopes) to figure out which scopes you need. 

## Block Kit

We introduced Block Kit UI framework that allows you to create messages with the components called blocks. 
If you have been creating messages with the legacy "attatchment", please consider switching to Block Kit! 

Read more at: [Block Kit](https://api.slack.com/block-kit)

---
## Changes made in October 2018

## OAuth Token

Your OAuth access token should begins with `-xoxb` instead of `-xoxp`. The bot tokens will be the defaul token in future.

## Sigining Secret 

*This requires to update your code!*

Previously, you needed to verify a *verificatin token* to see if a request was coming from Slack, not from some malicious place by simply comparing a string with the legacy token with a token received with a payload. But now you must use more secure *sigining secrets*.

Basically, you need to compare the value of the `X-Slack-Signature`, the HMAC-SHA256 keyed hash of the raw request payload, with a hashed string containing your Slack signin secret code, combined with the version and `X-Slack-Request-Timestamp`. 

Learn more at [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack).

<!--
## Token rotation

OAuth refresh tokens are also introduced as a security feature, which allows the app owners to proactively rotate tokens when the tokens are compromised.

Your workspace app can use the new `apps.uninstall` method to uninstall itself from a single workspace, revoking all tokens associated with it. To revoke a workspace token without uninstalling the app, use `auth.revoke`.

Although the example of using the short-lived refresh token is *not* included in this Blurprints example since this tutorial is written for internal integration, if you are distributing your app, use a short-lived OAuth Refresh token. Implementing token rotation is required for all apps that are distributed, whether submitted for the App Directory or not.

To lean more, read [Token rotation for workspace apps](https://api.slack.com/docs/rotating-and-refreshing-credentials).


:gift: If you are using the [Node SDK](https://github.com/slackapi/node-slack-sdk/issues/617), the token refresh feature is available for you already!
-->
