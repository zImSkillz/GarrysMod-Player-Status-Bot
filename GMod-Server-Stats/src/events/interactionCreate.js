const { Events, InteractionType } = require("discord.js");

const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const fs = require('fs');

const express = require('express')

const { mainClient } = require('../../index.js');
const { main } = require("json");

const IP = require('ip');

let cacheCfg = false

fs.readFile('cache.json', (err, data) => {
    if (err) throw err;
    cacheCfg = JSON.parse(data);
});

module.exports = {
    name: Events.InteractionCreate,
    execute: async(interaction) => {
        let client = interaction.client;

        console.log(interaction.type);

        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;
            try {
                const command = client.slashcommands.get(interaction.commandName)
                command.run(client, interaction)
            } catch (e) {
                console.error(e)
                interaction.reply({ content: "A problem was encountered while running the command! Please try again.", ephemeral: true })
            }
        } else if (interaction.customId === "setupnews") {
            if (!cacheCfg == false) {
                cacheCfg.lastNews = interaction.fields.getTextInputValue('news');
                fs.writeFileSync('cache.json', JSON.stringify(cacheCfg));

                interaction.reply({ content: "News Updated!", ephemeral: true });
            }
        } else if (interaction.customId === "setup") {
            if (!cacheCfg == false) {
                const statusEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('ModernLifeRP | Status')
                    .setDescription('# Status: Offline :x: \n\n- Server is Offline!')
                    .setTimestamp()
                    .setFooter({ text: 'Created by zImSkillz', iconURL: 'https://cdn.discordapp.com/attachments/1060300155183706213/1138552751471722596/512x.png' });

                let message = await interaction.channel.send({ embeds: [statusEmbed], ephemeral: false });


                console.log("Creating Cache..")

                cacheCfg.cachedChannel = message.channelId
                cacheCfg.cachedGuildId = message.guildId
                cacheCfg.cachedMessage = message.id
                cacheCfg.cachedIp = interaction.fields.getTextInputValue('serverip');
                cacheCfg.cachedPort = interaction.fields.getTextInputValue('serverport');
                cacheCfg.authPort = interaction.fields.getTextInputValue('authport');
                cacheCfg.authKey = interaction.fields.getTextInputValue('authkey');
                cacheCfg.lastNews = "No Information"
                cacheCfg.lastUpdated = Date.now()

                fs.writeFileSync('cache.json', JSON.stringify(cacheCfg));

                console.log("Cache Created!")

                interaction.reply({ content: "Status Message Created!", ephemeral: true });
            }
        }
    }
}

var setupDone = false
var server = false

function setupHttpsServer() {
    const app = express()

    if (setupDone == true) {
        return;
    }

    if (cacheCfg == false) {
        return;
    }

    if (!server == false) {
        server.close();
    }

    app.post('/redirect', (req, res) => {
        function sendStatus(statusCode) {
            return res.sendStatus(statusCode);
        }

        if (req.query.ip) {
            if (req.query.port) {
                res.redirect('steam://connect/' + req.query.ip + ":" + req.query.port);
            } else {
                sendStatus(403)
            }
        } else {
            sendStatus(403)
        }
    })

    app.post('/update', (req, res) => {
        function sendStatus(statusCode) {
            return res.sendStatus(statusCode);
        }

        if (req.query.authcode == cacheCfg.authKey) {
            if (req.query.players) {
                if (req.query.maxplayers) {
                    if (req.query.admins) {
                        if (req.query.map) {
                            res.send("OK - Updated ")

                            const channelId = cacheCfg.cachedChannel;
                            const messageId = cacheCfg.cachedMessage;

                            mainClient.channels.fetch(channelId).then(channel => {
                                channel.messages.fetch(messageId).then(message => {
                                    const statusEmbed = new EmbedBuilder()
                                        .setColor(0x00ff00)
                                        .setTitle('ModernLifeRP | Status')
                                        .setDescription('# Status: Online :white_check_mark: \n\n- Server is Online!')
                                        .setTimestamp()
                                        .setImage('https://lyxos.de/api/v2/progressbar.php?players=' + req.query.players + '&maxplayers=' + req.query.maxplayers)
                                        .addFields({ name: 'User Information:', value: 'Online Players: ' + req.query.players + "/" + req.query.maxplayers + "\nOnline Admins: " + req.query.admins + "\nCurrent Map: " + req.query.map }, { name: "Last News:", value: '```' + cacheCfg.lastNews + '```', inline: true })
                                        .setFooter({ text: 'Created by zImSkillz', iconURL: 'https://cdn.discordapp.com/attachments/1060300155183706213/1138552751471722596/512x.png' });

                                    const join = new ButtonBuilder()
                                        .setLabel('Join Server')
                                        .setURL('http://' + IP.address() + ":" + cacheCfg.authPort + "/redirect?ip=" + cacheCfg.cachedIp + '&port=' + cacheCfg.cachedPort)
                                        .setStyle(ButtonStyle.Link);

                                    const row = new ActionRowBuilder()
                                        .addComponents(join);

                                    message.edit({ embeds: [statusEmbed], components: [row] });

                                    cacheCfg.lastUpdated = Date.now()
                                });
                            });
                        } else {
                            sendStatus(403)
                        }
                    } else {
                        sendStatus(403)
                    }
                } else {
                    sendStatus(403)
                }
            } else {
                sendStatus(403)
            }
        } else {
            sendStatus(403)
        }
    })

    app.get('/', (req, res) => {})

    server = app.listen(cacheCfg.authPort, () => {})

    var lastUpdatedCheck = cacheCfg.lastUpdated - Date.now();

    if (lastUpdatedCheck < -32000) {
        const channelId = cacheCfg.cachedChannel;
        const messageId = cacheCfg.cachedMessage;

        mainClient.channels.fetch(channelId).then(channel => {
            channel.messages.fetch(messageId).then(message => {
                const statusEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle('ModernLifeRP | Status')
                    .setDescription('# Status: Offline :x: \n\n- Server is Offline!')
                    .setTimestamp()
                    .setFooter({ text: 'Created by zImSkillz', iconURL: 'https://cdn.discordapp.com/attachments/1060300155183706213/1138552751471722596/512x.png' });

                message.edit({ embeds: [statusEmbed], components: [] });
            });
        });
    }

    console.log(lastUpdatedCheck);
}

setInterval(setupHttpsServer, 15000);