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
## What I used for this project:  
Discord.js 14.2.0: [Click Here](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------)  
@discordjs/rest 1.0.1: [Click Here](https://www.npmjs.com/package/@discordjs/rest)  
Sequelize ORM 6.21.3: [Click Here](https://www.npmjs.com/package/sequelize)  
sqlite3 5.0.11: [Click Here](https://www.npmjs.com/package/sqlite3)  
dotenv 16.0.1: [Click here](https://www.npmjs.com/package/dotenv)

## Completion list

Commands:
- [x] /mine
- [ ] /farm  
- [ ] /hunt  
- [ ] /fish  
- [ ] /lumber  
- [x] /stats <tools/jobs/armor>  
- [x] /inventory  
- [x] /use_item <id>  
- [x] /boosters  
- [x] /chest  
- [x] /open_chest <type>  
- [x] /quest  
- [x] /start_quest <difficulty>    
- [ ] /shop  
- [ ] /buy_item <id>  
- [x] /prestige  
- [x] /daily  
- [x] /weekly  
- [x] /leaderboards  
- [ ] /settings
- [x] /balance  
  
Features:  
- [ ] voting api

----------
## Commands:

<> = required
```
General:
  /mine
  /farm
  /hunt
  /fish
  /lumber
  /stats <tools/jobs>
  /inventory
  /use_item <id>
  /boosters
  /chest
  /open_chest <id>
  /quest
  /start_quest <difficulty>
  /shop
  /buy_item <id>
  /prestige
  /daily
  /weekly
  /leaderboards
  /balance
Staff:
  /settings
      Options:
          set_channel <Channel>
          set_daily <Boolean>
          set_weekly <Boolean>
```
----------
