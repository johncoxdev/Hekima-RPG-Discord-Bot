const { PlayerDb } = require('../databases/playerdb.js');
const { ServerDb } = require('../databases/serverdb.js');
module.exports = {
    /**
     * 
     * @param {String | BigInt} serverId 
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
     * @param {String | BigInt} userId 
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
     * @param {String | BigInt} playerId 
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
     * @param {String | BigInt} playerId 
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
     * @param {String | BigInt} playerId 
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
     * @param {String | BigInt} playerId 
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
     * @param {BigInt} userId 
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
                "amonut": 0.0,
                "time": 0
            }
            console.log("Called1")
        }
        if (isExpMultiDone && moneyTime > 1){
            playerMultipliers['exp_multiplier'] = {
                "active": false,
                "amonut": 0.0,
                "time": 0
            }
            console.log("called")
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
    async isQuestComplete(userId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: userId} });
        const playerQuest = foundPlayer.quests;
        const currentTime = Math.floor(Date.now()/1000);
        const questActive = playerQuest['active'];
        const questTime = playerQuest['time'];
        
        if (questActive && (currentTime > questTime)) return true;
        return false;
    },

    async getQuestLevel(userId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: userId} });
        const playerQuest = foundPlayer.quests;
        const questLevel = playerQuest['level'];
        return questLevel
    }
}



/**
 * TODO: 
 * 1) function for dealing with setting exp.
 * 2) check if player survived their quest based on their armor level.
 */