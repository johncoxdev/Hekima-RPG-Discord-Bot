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
        defaultValue: false
    },
    money: {
        type: Sequelize.STRING,
        defaultValue: '5000000'
    },
    quests: {
        type: Sequelize.JSON,
        defaultValue: {
            "active": false,
            "level": 0,
            "time": 0
        }
    },
    prestige: {
      type: Sequelize.INTEGER,
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
    jobs: {
        type: Sequelize.JSON,
        defaultValue: {
            "lumber": {
                "level": 1,
                "exp": '0'
            },
            "mine": {
                "level": 1,
                "exp": '0'
            },
            "farm": {
                "level": 1,
                "exp": '0'
            },
            "hunt": {
                "level": 1,
                "exp": '0'
            },
            "fish": {
                "level": 1,
                "exp": '0'
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
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "bow": {
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "pickaxe": {
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "axe": {
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "fishing_rod": {
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "hoe": {
                "tier": 1,
                "level": 1,
                "exp": '0'
            },
            "helmet": {
                "tier": 1
            },
            "chestplate": {
                "tier": 1
            },
            "boots": {
                "tier": 1
            }
        }
    },
    chest: {
        type: Sequelize.JSON,
        defaultValue: {
            "common": 0,
            "uncommon": 0,
            "rare": 0,
            "epic": 0,
            "mythical": 0
        }
    }
});

module.exports = {
    PlayerDb
}
