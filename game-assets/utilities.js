const { PlayerDb } = require('../databases/playerdb.js');
const { ServerDb } = require('../databases/serverdb.js');
const { baseAmountGathered, event } = require('./gameconfig.js');
module.exports = {
    /**
     * 
     * @param {String} serverId 
     */
    async getOrAddServer(serverId){
        await ServerDb.findOrCreate({
            where: {
                server_id: serverId
            }
        });
    },

    /**
     * 
     * @param {String} userId 
     * @returns Array<ModelInstance, Boolean>
     */
    async getOrAddMember(userId) {
        const foundPlayer = await PlayerDb.findOrCreate({
            where: {
                discord_user_id: userId
            }
        });
        return foundPlayer
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
        const playerMoney = foundPlayer['money'];
        const randomMoneyAmt = Math.floor(Math.random() * 500);
        await PlayerDb.update( {
            money: playerMoney + randomMoneyAmt
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
      const amountItemGotten = baseAmountGathered + ((toolTier+1)*2);
      if (jobType === "mine") {
        const eventType = event['mine']['tier'][toolTier]
      }

      else if (jobType === "farm") {

      }

      else if (jobType === "fish") {

      }

      else if (jobType === "lumber") {

      }

      else if (jobType === "hunt") {

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
            itemsGathered[itemType] += 1
            break;
          }else{
            randomNumber -= chance
          }
        }
      }
      return itemsGathered

    },

    getItemMoneyAndExp(eventType, itemsRetrieved, moneyBoost, expBoost){
      itemInfo = {
        'money': 0,
        'exp': 0
      }
      for ( const [item, amount] of Object.entries(itemsRetrieved)) {
        moneyTotal = (event[eventType]['money'][item] * amount);
        expTotal = (event[eventType]['exp'][item] * amount);
        itemInfo['money'] += ( moneyTotal + (moneyTotal * moneyBoost))
        itemInfo['exp'] += (expTotal + (expTotal * expBoost))
      }
      return itemInfo
    },
    
    checkIfToolPassLevel(){
      ;
    }
}


/**
 * TODO: 
 * 1) function for dealing with setting exp.
 */