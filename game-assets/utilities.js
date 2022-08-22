const { PlayerDb } = require('../databases/playerdb');

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