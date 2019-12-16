const axios = require('axios');
const JsonDB = require('node-json-db');

const db = new JsonDB('users', true, false);

const apiUrl = 'https://slack.com/api';


const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  text: 'Welcome to the team! We\'re glad you\'re here.',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Welcome to the team! We\'re glad you\'re here* :tada:'
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*What is Slack?*\nSlack is where work happens. If this is your first time using Slack, take some time to read the <https://get.slack.help|help docs> and our internal wiki. If you have any questions, jump into #help-slack and we\'ll help you out'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Code of Conduct*\nOur goal is to maintain a safe, helpful and friendly community for everyone, regardless of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other defining characteristic. Please take the time to read through <https://code.localhost|Code of Conduct> before continuing.'
      }
    },
    {
      type: 'actions',
      elements: [
        {
          action_id: 'accept',
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Accept',
            emoji: true
          },
          style: 'primary',
          value: 'accept'
        }
      ]
    }
  ]
};

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
