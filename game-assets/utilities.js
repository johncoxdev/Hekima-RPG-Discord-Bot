const { EmbedBuilder } = require('discord.js');
const { PlayerDb } = require('../databases/playerdb.js');
const { ServerDb } = require('../databases/serverdb.js');
const { baseAmountGathered, event, upgrade, level_exp } = require('./gameconfig.js');
module.exports = {
    /**
     * 
     * @param {String} serverId 
     */
    async getOrAddServer(serverId){
      try{
        await ServerDb.findOrCreate({
            where: {
                server_id: serverId
            }
        });
      } catch (error) {
        console.log("Warn: table wasn't synced yet!")
      }
    },

    /**
     * 
     * @param {String} userId 
     * @returns Array<ModelInstance, Boolean>
     */
    async getOrAddMember(userId) {
      try {
        const foundPlayer = await PlayerDb.findOrCreate({
            where: {
                discord_user_id: userId
            }
        });
        return foundPlayer
      } catch (error) {
        console.log("Warn: table wasn't synced yet!")
      }
    },

    /**
     * 
     * @param {String} playerId 
     * @param {Int} itemId 
     */
    async removeInventoryItem(playerId, itemId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerInventory = foundPlayer.inventory;

        playerInventory[itemId] -= 1;

        await PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },

    /**
     * 
     * @param {String} playerId 
     * @param {Int} itemId 
     */
    async addInventoryItem(playerId, itemId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerInventory = foundPlayer.inventory;

        playerInventory[itemId] += 1;

        await PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },
    /**
     * 
     * @param {String} playerId 
     * @param {String} chestType 
     */
    async removeChest(playerId, chestType){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerChests = foundPlayer.chest;

        playerChests[chestType] -= 1;

        await PlayerDb.update({
            chest: playerChests
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },
    /**
     * 
     * @param {String} playerId 
     * @param {String} chestType 
     */
    async addChest(playerId, chestType){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerChests = foundPlayer.chest;

        playerChests[chestType] += 1;

        await PlayerDb.update({
            chest: playerChests
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },

    /**
     * 
     * @param {String} userId 
     */
    async updateBoosterInfo(userId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: userId } });
        const playerMultipliers = foundPlayer.multipliers;
        const currentTime = Math.floor(Date.now()/1000);
        const moneyTime = playerMultipliers['money_multiplier']['time']
        const expTime = playerMultipliers['exp_multiplier']['time']
        isMoneyMultiDone = (currentTime > moneyTime) ? true : false;
        isExpMultiDone = (currentTime > expTime) ? true : false;
        
        if (isMoneyMultiDone && moneyTime > 1){
            playerMultipliers['money_multiplier'] = {   
                "active": false,
                "amount": 0.0,
                "time": 0
            }
        }
        if (isExpMultiDone && moneyTime > 1){
            playerMultipliers['exp_multiplier'] = {
                "active": false,
                "amount": 0.0,
                "time": 0
            }
        }
        if (isExpMultiDone || isMoneyMultiDone){
            await PlayerDb.update({
                multipliers: playerMultipliers
            }, { where: {
                discord_user_id: userId
                }
            });
        }
    },

    /**
     * 
     * @param {String} userId 
     * @param {String} type 
     * @returns Number
     */
    async giveItemExp(userId, type) {
        //
    },

    async giveRandomMoney(userId) {
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: userId } });
        const playerMoney = BigInt(foundPlayer['money']);
        const randomMoneyAmt = Math.floor(Math.random() * 500);
        await PlayerDb.update( {
            money: playerMoney + BigInt(randomMoneyAmt)
        }, {
            where: { discord_user_id: userId }
        });
        return randomMoneyAmt;
    },

    /**
     * Mine command works differently compared the other jobs. It has a different config layout.
     * @param {String} jobType 
     * @param {Number} toolTier 
     * @returns dict<itemType : amount>
     * 
     */
    getJobItems(jobType, toolTier) {
      let eventType = "";
      const max = (baseAmountGathered + ((toolTier+1)*2)) * 2;
      const min = baseAmountGathered + ((toolTier+1)*2);
      const amountItemGotten = Math.floor(Math.random() * (max - min + 1) + min)
      if (jobType === "mine") {
        eventType = event['mine']['tier'][toolTier];
      }

      else if (jobType === "farm") {
        eventType = event['farm']['chances'];
      }

      else if (jobType === "fish") {
        eventType = event['fish']['chances'];
      }

      else if (jobType === "lumber") {
        eventType = event['lumber']['chances'];
      }

      else if (jobType === "hunt") {
        eventType = event['hunt']['chances'];
      }
      let itemsGathered = {};
      let total_weight = 0;
      for (let [itemType, chance] of Object.entries(eventType)){
        total_weight += chance
      }
      for (currItem = 0; currItem < amountItemGotten; currItem++){
        let randomNumber = Math.floor(Math.random() * total_weight)
        for (const [itemType, chance] of Object.entries(eventType)) {
          if (randomNumber <= chance) {
            itemsGathered[itemType] = (itemsGathered[itemType]+1) || 1;
            break;
          }else{
            randomNumber -= chance
          }
        }
      }
      return itemsGathered

    },

    /**
     * 
     * @param {string} eventType 
     * @param {Object} itemsRetrieved 
     * @param {double} moneyBoost 
     * @param {double} expBoost 
     * @returns Object<money: number, exp: number, boostMoney: number, boostExp: number>
     */
    getItemMoneyAndExp(eventType, itemsRetrieved, moneyBoost, expBoost){
        let moneyTotal = 0;
        let expTotal = 0;
        itemInfo = {
            'money': 0,
            'exp': 0,
            'boostMoney': 0,
            'boostExp': 0
        }
        for ( const [item, amount] of Object.entries(itemsRetrieved)) {
            moneyTotal += (event[eventType]['money'][item] * amount);
            expTotal += (event[eventType]['exp'][item] * amount);
        }
        itemInfo['money'] = Math.floor((moneyTotal + (moneyTotal * moneyBoost)));
        itemInfo['exp'] = Math.floor((expTotal + (expTotal * expBoost)));
        itemInfo['boostMoney'] = Math.floor((itemInfo['boostMoney'] * moneyBoost));
        itemInfo['boostExp'] = Math.floor((expTotal * expBoost));
        return itemInfo
    },
    
    checkIfToolPassLevel(toolType, toolExp, toolLevel){
        if (toolLevel === 100) return false;
        const levelX = upgrade[toolType]['exp']['x_exp_per_level'];
        const levelY = upgrade[toolType]['exp']['y_gap_per_level'];
        const levelMaxExp = (toolLevel/levelX)**levelY;
        return toolExp >= levelMaxExp
    },

    checkIfJobPassLevel(jobLevel, jobExp){
        const jobX = level_exp['x_exp_per_level'];
        const jobY = level_exp['y_gap_per_level'];
        const jobMaxExp = (jobLevel/jobX)**jobY;
        return jobExp >= jobMaxExp
    },

    actionJobEmbedBuilder(actionColor, actionTitle, actionDesc){
        const actionEmbed = new EmbedBuilder()
        actionEmbed.setColor(actionColor)
        actionEmbed.setTitle(actionTitle)
        actionEmbed.setDescription(actionDesc)
        return actionEmbed 
    },

    loadToolImage(tool, tier) {
      const loadedImages = {
        "helmet": `./game-assets/game-images/armor/tier ${tier}/1.png`,
        "chestplate": `./game-assets/game-images/armor/tier ${tier}/2.png`,
        "boots": `./game-assets/game-images/armor/tier ${tier}/3.png`,
        "axe": `./game-assets/game-images/tool/axe/${tier}.png`,    
        "fishing_rod": `./game-assets/game-images/tool/fishing rod/${tier}.png`,
        "hoe": `./game-assets/game-images/tool/hoe/${tier}.png`,
        "pickaxe": `./game-assets/game-images/tool/pickaxe/${tier}.png`,
        "sword": `./game-assets/game-images/weapon/sword/${tier}.png`,
        "bow": `./game-assets/game-images/weapon/bow/${tier}.png`
      };
      return loadedImages[tool];
    }
}