const { PlayerDb } = require('../databases/playerdb.js');
const { ServerDb } = require('../databases/serverdb.js');
module.exports = {
    async getOrAddServer(serverId){
        await ServerDb.findOrCreate({
            where: {
                server_id: serverId
            }
        });
    },

    async getOrAddMember(userId) {
        const foundPlayer = await PlayerDb.findOrCreate({
            where: {
                discord_user_id: userId
            }
        });
        return foundPlayer
    },

    async removeInventoryItem(playerId, itemId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerInventory = foundPlayer.inventory;

        playerInventory[itemId] -= 1;

        PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },

    async addInventoryItem(playerId, itemId){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerInventory = foundPlayer.inventory;

        playerInventory[itemId] += 1;

        PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },
    /**
     * 
     * @param {String || LongInt} playerId 
     * @param {String} chestType 
     */
    async removeChest(playerId, chestType){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerChests = foundPlayer.chest;

        playerChests[chestType] -= 1;

        PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },
    /**
     * 
     * @param {String || LongInt} playerId 
     * @param {String} chestType 
     */
    async addChest(playerId, chestType){
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerChests = foundPlayer.chest;

        playerChests[chestType] += 1;

        PlayerDb.update({
            inventory: playerInventory
        }, {
            where: {
                discord_user_id: playerId
            }
        })
    },

    /**
     * 
     * @param {*} userId 
     * @returns Array<Money:Boolean, Exp:Boolean>
     */
    async isMoneyMultiplierExpired(userId){
        let finalOutput = Array(2);
        const foundPlayer = await PlayerDb.findOne({ where: { discord_user_id: playerId } });
        const playerMultipliers = foundPlayer.multipliers;
        const currentTime = Math.floor(Date.now()/1000);
        finalOutput[0] = (currentTime > playerMultipliers['money_multiplier']['time']) ? true : false;
        finalOutput[1] = (currentTime > playerMultipliers['exp_multiplier']['time']) ? true : false;
        return finalOutput;
    }   
}



/**
 * TODO: 
 * 2) function for dealing with setting exp
 * 
 */