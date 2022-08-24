const Sequelize = require('sequelize');
const sequelize = require('./initdb.js');

/**
 * Base layout for player data. Exporting the 
 * database & created a addMember that will
 * find duplicates or create an instance.
 */

const PlayerDb = sequelize.define('player', {
    discord_user_id: {
        type: Sequelize.BIGINT,
        unique: true
    },
    first_time_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    money: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    multipliers: {
        type: Sequelize.JSON,
        defaultValue: {
            "exp_multiplier": {
                "active": false,
                "amount": 0.0,
                "time": 0
            },
            "money_multiplier": {
                "active": false,
                "amount": 0.0,
                "time": 0
            }
        }
    },
    times: {
        type: Sequelize.JSON,
        defaultValue: {
            "daily_claim": 0,
            "weekly_claim": 0,
        }
    },
    perm_levels: {
        type: Sequelize.JSON,
        defaultValue: {
            "lumber": {
                "level": 0,
                "exp": 0
            },
            "mining": {
                "level": 0,
                "exp": 0
            },
            "farming": {
                "level": 0,
                "exp": 0
            },
            "hunting": {
                "level": 0,
                "exp": 0
            },
            "fishing": {
                "level": 0,
                "exp": 0
            },
            "prestige": 0
        }
    },
    inventory: {
        type: Sequelize.JSON,
        defaultValue: {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0
        }
    },
    items: {
        type: Sequelize.JSON,
        defaultValue: {
            "sword": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "bow": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "pickaxe": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "axe": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "fishing_rod": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "hoe": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "helmet": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "chesplate": {
                "tier": 1,
                "level": 0,
                "exp": 0
            },
            "boots": {
                "tier": 1,
                "level": 0,
                "exp": 0
            }
        }
    },
    chest: {
        type: Sequelize.JSON,
        defaultValue: {
            "common": 1,
            "uncommon": 0,
            "rare": 0,
            "epic": 0,
            "mythical": 0
        }
    }
});

module.exports = PlayerDb;
