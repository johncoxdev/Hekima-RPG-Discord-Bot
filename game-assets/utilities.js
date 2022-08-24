const { PlayerDb } = require('../databases/playerdb.js');
const { ServerDb } = require('../databases/serverdb.js');

async function getOrAddServer(serverId){
    await ServerDb.findOrCreate({
        where: {
            server_id: serverId
        }
    });
};

async function getOrAddMember(userId) {
    const foundPlayer = await PlayerDb.findOrCreate({
        where: {
            discord_user_id: userId
        }
    });
    return foundPlayer
};

async function removeInventoryItem(playerId, itemId){
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
};

async function addInventoryItem(playerId, itemId){
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
};

async function removeChest(playerId, chestType){
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
};

async function addChest(playerId, chestType){
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
};

/**
 * TODO: 
 * 2) function for dealing with setting exp
 * 3) function for checking if the exp has expired (will be used for the job's commands)
 * 
 */