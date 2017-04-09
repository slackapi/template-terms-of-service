const qs = require('querystring');
const axios = require('axios');
const JsonDB = require('node-json-db');

const db = new JsonDB('users', true, false);

const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  token: process.env.SLACK_TOKEN,
  as_user: true,
  text: 'Welcome to the team!',
  attachments: JSON.stringify([{
    text: 'Before you continue, we need you to accept our Terms of Service.',
    callback_id: 'terms-of-service',
    actions: [{
      name: 'accept',
      text: 'Accept',
      type: 'button',
      value: 'accept',
    }],
  }]),
};

const initialMessage = (teamId, userId) => {
  let data = false;
  // try fetch team/user pair. This will throw an error if nothing exists in the db
  try { data = db.getData(`/${teamId}/${userId}`); } catch (error) {
    console.error(error);
  }

  // `data` will be false if nothing is found or the user hasn't accepted the ToS
  if (!data) {
    // add or update the team/user record
    db.push(`/${teamId}/${userId}`, false);

    // send the default message as a DM to the user
    message.channel = userId;
    const params = qs.stringify(message);
    const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);
    sendMessage.then(postResult);
  } else {
    console.log('Already onboarded');
  }
};

// set the team/user record to true to indicate that they've accepted the ToS
// you might want to store the date/time that the terms were accepted

const accept = (userId, teamId) => db.push(`/${teamId}/${userId}`, true);

// find all the users who've been presented the ToS and send them a reminder to accept.
// the same logic can be applied to find users that need to be removed from the team
const remind = () => {
  try {
    const data = db.getData('/');
    Object.keys(data).forEach((team) => {
      Object.keys(data[team]).forEach((user) => {
        if (!data[team][user]) {
          message.channel = user;
          message.text = 'REMIND I am a test message';

          const params = qs.stringify(message);
          const sendMessage = axios.post('https://slack.com/api/chat.postMessage', params);

          sendMessage.then(postResult);
        }
      });
    });
  } catch (error) { console.error(error); }
};

module.exports = { initialMessage, accept, remind };
