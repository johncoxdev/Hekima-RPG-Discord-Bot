module.exports = {
    "color": {
        "lumber": "543413",
        "farming": "ff9b0f",
        "mining": "858585",
        "hunting": "8f3b3b",
        "fishing": "297eff",
        "success": "1aff00",
        "failed": "c90000"
    },
    "message": {
        "server_not_found": "Server not found!",
        "player_not_found": "User not found!",
        "banned": "You are banned from using this command!",
        "no_permission": "You do not have the permissions to execute this command!",
        "not_booster": "You are not a server booster! Only server boosters are allowed to use this command!",
        "quest_active": "You already have an active quest!",
        "multiplier_active": "You already have an active multiplier!"
    },
    "event": {
        "quest": {
            "1": {
               "time": 3600,
               "survival_rate":  25,
               "reward_amount": 1,
               "reward": ["common"]
            },
            "2": {
                "time": 21600,
                "survival_rate": 20,
                "reward_amount": 1,
                "reward": ["common", "uncommon"]
             },
            "3": {
                "time": 43200,
                "survival_rate": 15,
                "reward_amount": 2,
                "reward": ["uncommon", "rare", "epic"]
             },
            "4": {
                "time": 86400,
                "survival_rate": 10,
                "reward_amount": 2,
                "reward": ["rare", "epic"]
             },
            "5": {
                "time": 172800,
                "survival_rate": 5,
                "reward_amount": 3,
                "reward": ["epic", "mythical"]
             }
        },
        "lumber": {
            "exp": {
                "wood": 5
            }
        },
        "hunting": {
            "chances": {
                "nothing": 40,
                "egg": 30,
                "lamb": 20,
                "beef":  10
            },
            "exp": {
                "nothing": 5,
                "egg": 15,
                "lamb": 30,
                "beef": 50
            }
        },
        "fishing": {
            "chances": {
                "shrimp": 55,
                "trout": 25,
                "nothing": 13,
                "grouper": 7
            },
            "exp": {
                "shrimp": 8,
                "trout": 35,
                "nothing": 5,
                "grouper": 75
            }
        },
        "mining": {
            "tier": {
                "1": {
                    "stone": 87,
                    "coal": 8,
                    "copper": 5
                },
                "2": {
                    "stone": 59,
                    "coal": 15,
                    "copper": 13,
                    "iron": 8,
                    "gold": 5
                },
                "3": {
                    "coal": 54,
                    "copper": 20,
                    "iron": 15,
                    "gold": 8,
                    "silver": 3

                },
                "4": {
                    "copper": 54,
                    "iron": 20,
                    "gold": 15,
                    "silver": 8,
                    "platinum": 3

                },
                "5": {
                    "iron": 33,
                    "copper": 22,
                    "gold": 19,
                    "silver": 15,
                    "platinum": 8,
                    "vibrance": 3
                },
                "6": {
                    "iron": 26,
                    "gold": 22,
                    "silver": 18,
                    "copper": 15,
                    "platinum": 13,
                    "vibrance": 6
                },
                "7": {
                    "gold": 28,
                    "iron": 26,
                    "silver": 22,
                    "platinum": 14,
                    "vibrance": 8,
                    "diamond": 2
                },
                "8": {
                    "silver": 25,
                    "gold": 23,
                    "platinum": 18,
                    "iron": 15,
                    "vibrance": 9,
                    "diamond": 5,
                    "raw steel": 3,
                    "emerald": 2
                },
                "9": {
                    "silver": 21,
                    "platinum": 17,
                    "gold": 16,
                    "iron": 15,
                    "vibrance": 11,
                    "diamond": 8,
                    "raw steel": 5,
                    "emerald": 4,
                    "firestone": 2,
                    "crystal": 1
                },
                "10": {
                    "platinum": 18,
                    "silver": 17,
                    "vibrance": 16,
                    "gold": 15,
                    "iron": 13,
                    "diamond": 10,
                    "raw steel": 5,
                    "emerald": 3,
                    "firestone": 2,
                    "crystal": 1
                }
            },
            "prices": {
                "stone": 0.25,
                "coal": 0.5,
                "copper": 1,
                "iron": 5,
                "gold": 10,
                "silver": 25,
                "platinum": 50,
                "vibrance": 100,
                "diamond": 500,
                "raw steel": 1000,
                "emerald": 1500,
                "firestone": 1750,
                "crystal": 2500
            },
            "exp": {
                "stone": 1,
                "coal": 3,
                "copper": 5,
                "iron": 10,
                "gold": 15,
                "silver": 17,
                "platinum": 20,
                "vibrance": 100,
                "diamond": 250,
                "raw steel": 500,
                "emerald": 1000,
                "firestone": 1500,
                "crystal": 2500 
            }
        }
    },
    "crate": {
        "common": {
            "loottable": {
                "common": 73,
                "uncommon": 25,
                "rare": 2
            },
            "min": 1,
            "max": 1
        },
        "uncommon": {
            "loottable": {
                "common": 55,
                "uncommon": 40,
                "rare": 5
            },
            "min": 1,
            "max": 1
        },
        "rare": {
            "loottable": {
                "uncommon": 55,
                "common": 35,
                "rare": 10
            },
            "min": 1,
            "max": 1
        },
        "epic": { 
            "loottable": {
                "uncommon": 60,
                "common": 25,
                "rare": 15
            },
            "min": 1,
            "max": 2
        },
        "mythical": {
            "loottable": {
                "uncommon": 60,
                "rare": 30,
                "common": 10
            },
            "min": 1,
            "max": 2
        }
    },
    "loottable": {
        "common": [1, 2, 3],
        "uncommon": [4, 7, 9],
        "rare": [5, 6, 8, 10, 11]
    },
    "level_exp": {
        "x_exp_per_level": 0.044,
        "y_gap_per_level": 1.99
    },
    "upgrade": {
        "all": {
            "money": {
                "x_exp_per_level": 0.07,
                "y_gap_per_level": 4.037
            }
        },
        "sword": {
            "exp": {
                "x_exp_per_level": 0.09,
                "y_gap_per_level": 1.84
            }
        },
        "bow": {
            "exp": {
                "x_exp_per_level": 0.09,
                "y_gap_per_level": 1.84
            }
        },
        "pickaxe": {
            "exp": {
                "x_exp_per_level": 0.044,
                "y_gap_per_level": 2.01
            }
        },
        "axe": {
            "exp": {
                "x_exp_per_level": 0.0225,
                "y_gap_per_level": 1.31
            }
        },
        "fishing rod": {
            "exp": {
                "x_exp_per_level": 0.343,
                "y_gap_per_level": 2.03
            }
        },
        "hoe": {
            "exp": {
                "x_exp_per_level": 0.09,
                "y_gap_per_level": 1.898
            }
        }
    }
}