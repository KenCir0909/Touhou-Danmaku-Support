const { Client } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ activity: { name: '幻想地底国 東方弾幕Bot' }, status: 'dnd' });
}