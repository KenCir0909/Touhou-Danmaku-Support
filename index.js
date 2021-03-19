require('dotenv').config();
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL }, fetchAllMembers: true });

fs.readdir(__dirname + "/events/process/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(__dirname + `/events/process/${file}`);
        let eventName = file.split(".")[0];
        process.on(eventName, event.bind(null, client))
        console.log(`Process ${eventName} event is Loading completed`);
    });
});

fs.readdir(__dirname + "/events/discord", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(__dirname + `/events/discord/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Discord ${eventName} event is Loading completed`);
    });
});

client.login();