const moment = require('moment')

function formatMessages(username, text, position){
    return{
        username,
        text,
        time: moment().format("h:mm:a"),
        position
    }
}

module.exports = formatMessages;