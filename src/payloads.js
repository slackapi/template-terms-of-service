module.exports = {
    welcome_message: context => {
        return {
            text: `${context.notification}`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${context.header}`
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
        }
    }
}