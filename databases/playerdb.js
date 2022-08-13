const Sequelize = require('sequelize');
const sequelize = require('./initdb.js');

const Player = sequelize.define('player', {
    discord_user_id: {
        type: Sequelize.STRING,
        unique: true
    },
    game_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    chosen_class: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    class_weapon: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    storage_type: {
        type: Sequelize.STRING,
        defaultValue: "Pocket"
    },
    storage_level: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },
    storage_size: {
        type: Sequelize.STRING,
        defaultValue: "100"
    },
    storage_stored: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },
    weapon_level: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },
    total_gold: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },
    gold_flat_rate: {
        type: Sequelize.STRING,
        defaultValue: "1"
    },
    time_checked: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    prestige_level: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },
    multiplier: {
        type: Sequelize.JSON,
        defaultValue: {
            "boost_active": false,
            "boost_start_time": "",
            "boost": 0.0
        }
    },
    quest: {
        type: Sequelize.JSON,
        defaultValue: {
            "quest_active": false,
            "quest_difficulty": 1,
            "quest_start_time": ""
        }
    },
    crates: {
        type: Sequelize.JSON,
        defaultValue: {
            "common_crate": 0,
            "uncommon_crate": 0,
            "rare_crate": 0,
            "epic_crate": 0,
            "mystical_crate": 0
        }
    },
    inventory: {
        type: Sequelize.JSON,
        defaultValue: {
            "1.5": 0,
            "1.2": 0,
            "1.25": 0,
            "2": 0,
            "2.25": 0,
            "3": 0
        }
    }
});

module.exports = {
    Player,
    addMemberDatabase(discordMember) {
        Player.create({
            discord_user_id: discordMember.id
        })
    }
};