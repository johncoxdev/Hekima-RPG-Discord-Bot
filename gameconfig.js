module.exports = {
    "color": {
        "lumber": "543413",
        "farming": "ff9b0f",
        "mining": "858585",
        "hunting": "8f3b3b",
        "fishing": "297eff",
        "success": "1aff00",
        "failed": "c90000",
        "other": "d0ff8a"
    },
    "invitems": {
        "emoji": {
            "1": "<:ID_1:1007754508329287720>",
            "2": "<:ID_2:1007754509688254525>",
            "3": "<:ID_3:1007754510711656518>",
            "4": "<:ID_4:1007754511475032105>",
            "5": "<:ID_5:1007754512666206381>",
            "6": "<:ID_6:1007754513828020304>",
            "7": "<:ID_7:1007754558203777077>",
            "8": "<:ID_8:1007754559931809812>",
            "9": "<:emerald:1007503844286136392>",
            "10": "<:firestone:1007503845808676896>",
            "11": "<:crystal:1007503842948165652>"
        },
        "name": {
            "1": "Booster exp 1.25x (10-15 mins)",
            "2": "Booster exp 1.5x (10-20 mins)",
            "3": "Booster exp 2x (10-25 mins)",
            "4": "Booster exp 2.5x (15-20 mins)",
            "5": "Booster exp 3x (15-25 mins)",
            "6": "Booster exp 5x (15-30 mins)",
            "7": "Money Boost 1.5x (10-20 mins)",
            "8": "Money Boost 2x (15-30 mins)",
            "9": "Emerald",
            "10": "Firestone",
            "11": "Crystal",
        },
        "info": {
            "1": {
                "min": 10,
                "max": 15
            },
            "2": {
                "min": 10,
                "max": 20
            },
            "3": {
                "min": 10,
                "max": 25
            },
            "4": {
                "min": 15,
                "max": 20
            },
            "5": {
                "min": 15,
                "max": 25
            },
            "6": {
                "min": 15,
                "max": 30
            },
            "7": {
                "min": 10,
                "max": 20
            },
            "8": {
                "min": 15,
                "max": 30
            },
            "9": {
                "money": 1500,
                "exp": 1000
            },
            "10": {
                "money": 1750,
                "exp": 1500
            },
            "11": {
                "money": 3000,
                "exp": 2500
            },
        }
    },
    "message": {
        "not_booster": "You are not a server booster! Only server boosters are allowed to use this command!",
        "quest_active": "You already have an active quest!",
        "multiplier_active": "You already have an active multiplier!",
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
                "crystal": 3000
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
            "amount": 1,
            "emoji": "<:common:1007039905077141564>"
        },
        "uncommon": {
            "loottable": {
                "common": 55,
                "uncommon": 40,
                "rare": 5
            },
            "amount": 1,
            "emoji": "<:uncommon:1007039908218675391>"
        },
        "rare": {
            "loottable": {
                "uncommon": 55,
                "common": 35,
                "rare": 10
            },
            "amount": 2,
            "emoji": "<:rare:1007503664954486784>"
        },
        "epic": { 
            "loottable": {
                "uncommon": 60,
                "common": 25,
                "rare": 15
            },
            "amount": 2,
            "emoji": "<:epic:1007039907279155220> "
        },
        "mythical": {
            "loottable": {
                "uncommon": 60,
                "rare": 30,
                "common": 10
            },
            "amount": 3,
            "emoji": "<:mythical:1007039906167672852>"
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