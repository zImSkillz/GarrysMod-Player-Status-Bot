# GarrysMod-Player-Status-Bot
This is a Discord Bot written in Discord.JS that displays the number of players from your Garrys Mod Server

# Addon-Installation:
1. Add the addon to your Garrys Mod Server
2. Go to the file: "status_bot\lua\autorun\init.lua" and open the file
3. Set the value "Config.ApiIp" to the server IP on which the discord bot will run
4. Set the value "Config.ApiPort" to any port on which the Discord Bot will run
5. Set the value "Config.AuthCode" to a random word/password (no one should know this AuthCode)

# Important to know:
- Your server should have "sv_hibernate_think" enabled

# DiscordBot-Installation
1. Install NodeJS v18 (check with ``node -v``)
2. Go into the folder "GMod-Server-Stats"
3. Execute the Command "npm install"
4. Go to the file: "GMod-Server-Stats\src\config.js" and open the file
5. Configure everything to your liking

# How to Start
- Just use ``node index.js``

# Status Message Setup
1. Go to the channel you want the message in
2. Use the Command: "/setup"
3. Fill in all fields

# Privileged Gateway Intents
- What the Discord Bot needs: PRESENCE INTENT, SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT

# Create a news:
- Just use the command: "/setupnews"

# Screenshots:
![image](https://i.imgur.com/zhFhzHL.png)
![image](https://i.imgur.com/sjTrztk.png)
