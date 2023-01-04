const Sequelize = require('sequelize');
const sequelize = require('./initdb.js');

/**
 * Base layout for player data. Exporting the 
 * database & created a addMember that will
 * find duplicates or create an instance.
 */

const PlayerDb = sequelize.define('player', {
    discord_user_id: {
        type: Sequelize.STRING,
        unique: true
    },
    first_time_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    money: {
        type: Sequelize.STRING,
        defaultValue: '0'
    },
    quests: {
        type: Sequelize.JSON,
        defaultValue: {
            "active": true,
            "level": 5,
            "time": 1666170998
        }
    },
    prestige: {
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
            }
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
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "bow": {
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "pickaxe": {
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "axe": {
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "fishing_rod": {
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "hoe": {
                "tier": 0,
                "level": 0,
                "exp": 0
            },
            "helmet": {
                "tier": 0,
            },
            "chestplate": {
                "tier": 0,
            },
            "boots": {
                "tier": 0
            }
        }
    },
    chest: {
        type: Sequelize.JSON,
        defaultValue: {
            "common": 5,
            "uncommon": 0,
            "rare": 5,
            "epic": 0,
            "mythical": 0
        }
    }
});

module.exports = {
    PlayerDb
}
