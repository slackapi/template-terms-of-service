const axios = require('axios');
const JsonDB = require('node-json-db');
const payloads = require('./payloads');

const db = new JsonDB('users', true, false);
const apiUrl = 'https://slack.com/api';

const initialMessage = (teamId, userId) => {
  let data = false;
  // try fetch team/user pair. This will throw an error if nothing exists in the db
  try { data = db.getData(`/${teamId}/${userId}`); } catch (error) {
    console.error(error);
  }

  // `data` will be false if nothing is found or the user hasn't accepted the ToS
  if (!data) {
    // open a DM channel with that user and send the default message as a DM to the user
    axios.post(`${apiUrl}/im.open`, {
      user: userId
    }, {
      headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
    })
      .then(result => {
        let channelId = result.data.channel.id;
        let message = payloads.welcome_message({
          notification: 'Welcome to the team! We\'re glad you\'re here.',
          header: '*Welcome to the team! We\'re glad you\'re here* :tada:'
        });
        message.channel = channelId;
        return axios.post(`${apiUrl}/chat.postMessage`, message, {
          headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
        })
      })
      .then((result => {
        console.log(result.data);
        // add or update the team/user record if sending message was successful
        if (result.data.ok) db.push(`/${teamId}/${userId}`, false);
      }));
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
          axios.post(`${apiUrl}/im.open`, {
            user: user
          }, {
            headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
          })
            .then(result => {
              let channelId = result.data.channel.id;
              let message = payloads.welcome_message({
                notification: 'REMINDER.',
                header: ':bellhop_bell: *REMINDER*'
              });
              message.channel = channelId;
              message.text = 'REMINDER';
              return axios.post(`${apiUrl}/chat.postMessage`, message, {
                headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
              })
            })
            .then((result => {
              console.log(result.data);
            }));
        }
      });
    });
  } catch (error) { console.error(error); }
};

module.exports = { initialMessage, accept, remind };
