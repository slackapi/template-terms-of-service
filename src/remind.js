// run this file periodically to find users who have not accepted the ToS
require('dotenv').config();
const onboard = require('./onboard');

onboard.remind();
