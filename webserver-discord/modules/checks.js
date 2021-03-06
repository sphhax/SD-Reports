require('dotenv').config();
const mod = require("./")

function checkConfig()
{
    let config = mod.config.config; // Jesus
    if (!config.PORT) {mod.logger.send('error', 'PORT is a required field')}
    if (!config.GUILD_ID) {mod.logger.send('error', 'GUILD_ID is a required field')}
    if (!config.CHANNEL_ID) {mod.logger.send('error', 'CHANNEL_ID is a required field')}
    if (!config.SERVERS) {mod.logger.send('warn', 'At least one server is required')}
    config.SERVERS.forEach(function(item, index) {
        if (!item.ROLE_ID || !item.ID) {mod.logger.send('warn', `Server number ${index + 1} is malformed`)}});
    mod.logger.send('info', 'Config check finished')
}

function checkReport(report) {
    let pass = false;
    let config = mod.config.config; // Jesus
    config.SERVERS.forEach(function(item, index) {
        if (item.ID == report.SERVER_ID) {pass = true; return;}});
    if (pass) {return true;} else {return false;}
}

function checkSecurity(key) {
    let SECURITY_KEY = process.env.SECURITY_KEY;
    if (key == SECURITY_KEY) {return true;} else {return false;}
}

function checkServer() {
    let pass = false;
    let config = mod.config.config; // Jesus
    mod.bot.client.guilds.fetch(config.GUILD_ID)
    .then(pass = true)
    .catch(error => mod.logger.send('error', `Bot not connected to guild: ${error}`));
    if (pass) {return true;} else {return false;}
}

function checkChannel() {
    let pass = false;
    let config = mod.config.config; // Jesus
    mod.bot.client.channels.fetch(config.CHANNEL_ID)
    .then(pass = true)
    .catch(error => mod.logger.send('error', `Channel not found in server: ${error}`));
    if (pass) {return true;} else {return false;}
}

module.exports = {checkConfig, checkReport, checkSecurity, checkServer, checkChannel};