# Hekima-RPG-Discord-Bot

Hekima RPG Discord bot is an upcoming project that I have been excited to make for about a month. It took roughly about 3 weeks 
of pure planning to make sure that I understood what was getting myself into, and to have a semi-detailed outline of what I was
going to be doing and what I was going to be needing. All my thoughts are in `game structure.txt` which will convey on how all 
my process of planning and current thoughts are on this project. This bot does not gain any income and is purely made for fun and 
learning pruposes.

----------
## Customization:  

If a user is going to locally/personally host the bot then they're able to customize the RPG bot to their desire within the `game-assets > gameconfig.js` file. Users are allowed to customize the icon pictures (Discord emojis), experience points for jobs, weapons, and tools, change the difficulty of quest, and much more. 

----------
## Credits:  
All images are from [craftpix](https://craftpix.net/) using their various packs. 
I do not take any credit for any of the artwork that is provided within this project.

----------
## Dependencies:  
Discord.js 14.2.0: [Click Here](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------)  
@discordjs/rest 1.0.1: [Click Here](https://www.npmjs.com/package/@discordjs/rest)  
Sequelize ORM 6.21.3: [Click Here](https://www.npmjs.com/package/sequelize)  
sqlite3 5.0.11: [Click Here](https://www.npmjs.com/package/sqlite3)  
dotenv 16.0.1: [Click Here](https://www.npmjs.com/package/dotenv)  
@napi-rs/canvas 0.1.33: [Click Here](https://www.npmjs.com/package/@napi-rs/canvas)

----------
## Commands:

<> = required
```
Crates:  
/chest  
/open_chest <type>  
/daily  
/weekly  

General:  
/balance  
/boosters  
/buy_item <ID>  
/game_help  
/inventory  
/leaderboards  
/prestige  
/settings  
  Options:
    set_daily <Boolean>
    set_weekly <Boolean>  
/shop  
/stats    
/use_item <ID>  

Jobs:  
/farm  
/fish  
/hunt  
/lumber  
/mine  

Quest:  
/quest  
/start_quest <ID>  
 ```  
 
----------
## Installation:
If you are going to host this bot yourself, all you need to do is to create a `.env` file, and have the following keys inside of it.
```
GUILD_ID = "GUILD ID"
CLIENT_ID = "BOT/CLIENT ID"
TOKEN = "BOT/CLIENT TOKEN"
```
To get your guild Id, you can right-click your Discord server, and click on "Copy ID". As for you Client_ID & Token, you are going to need to get that from the Discord Developer Application page where you have created your bot.  
After you have done that, just type `npm ci` to clean install all of the dependencies required!

----------  
# Video coming soon!
