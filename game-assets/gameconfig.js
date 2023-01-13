module.exports = {
    "color": {
        "lumber": "543413",
        "farm": "ff9b0f",
        "mine": "858585",
        "hunt": "8f3b3b",
        "fish": "297eff",
        "success": "1aff00",
        "failed": "c90000",
        "other": "d0ff8a"
    },
    "IconEmoji": {
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
            "11": "<:crystal:1007503842948165652>",
            "common": "<:common:1007039905077141564>",
            "uncommon": "<:uncommon:1007039908218675391>",
            "rare": "<:rare:1007503664954486784>",
            "epic": "<:epic:1007039907279155220>",
            "mythical": "<:mythical:1007039906167672852>",
            "quest1": "<:quest_1:1007763075774025749> ",
            "quest2": "<:quest_2:1007763077040713768> ",
            "quest3": "<:quest_3:1007763077711806505>",
            "quest4": "<:quest_4:1007763079234334720> ",
            "quest5": "<:quest_5:1007763080068989037>",
            "stone": "<:stone:1007503851202556005>",
            "coal": "<:coal:1007503840846823565> ",
            "copper": "<:copper:1007503841937330266>",
            "iron": "<:iron:1007503847700299776>",
            "gold": "<:gold:1007503846601392138>",
            "silver": "<:silver:1007503850367885372>",
            "platinum": "<:platinum:1007503848669188116>",
            "vibrance": "<:vibrance:1007503852402114590>",
            "diamond": "<:diamond:1007503843703148554>",
            "rawsteel": "<:rawsteel:1007503849457721494>",
            "emerald": "<:emerald:1007503844286136392>",
            "firestone": "<:firestone:1007503845808676896>",
            "crystal": "<:crystal:1007503842948165652>",
            "wood": "<:wood:1008629458669944862>",
            "egg": "<:egg:1008629433030164520>",
            "lamb": "<:lamb:1008629434112282644>",
            "beef": "<:beef:1008629431771873401>",
            "shrimp": "<:shrimp:1008629406408904796>",
            "trout": "<:trout:1008629407478464532>", 
            "grouper": "<:grouper:1008629404974469191>", 
            "chili": "<:chili:1008629379116576879>", 
            "carrot": "<:carrot:1008629374263762984>", 
            "potato": "<:potato:1008629376323170304>", 
            "tomato": "<:tomato:1008629379917684796>", 
            "pumpkin": "<:pumpkin:1008629377258491904>",
            "nothing": "\u200B"
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
            "common": "Common Chest",
            "uncommon": "Uncommon Chest",
            "rare": "Rare Chest",
            "epic": "Epic Chest",
            "mythical": "Mythical Chest"
        },
        "info": {
            "1": {
                "min": 10,
                "max": 15,
                "exp_amount": 1.25
            },
            "2": {
                "min": 10,
                "max": 20,
                "exp_amount": 1.5
            },
            "3": {
                "min": 10,
                "max": 25,
                "exp_amount": 2
            },
            "4": {
                "min": 15,
                "max": 20,
                "exp_amount": 2.5
            },
            "5": {
                "min": 15,
                "max": 25,
                "exp_amount": 3
            },
            "6": {
                "min": 15,
                "max": 30,
                "exp_amount": 5
            },
            "7": {
                "min": 10,
                "max": 20,
                "money_amount": 1.5
            },
            "8": {
                "min": 15,
                "max": 30,
                "money_amount": 2
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
        "multiplier_active": "You already have that type of multipler active! Check /boosters"
    },
    "baseAmountGathered": 10,
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
            "chances" : {
              "wood": 100
            },
            "exp": {
              "wood": 5
            }, 
            "money": { 
              "wood": 50
            }
        },
        "hunt": {
            "chances": {
                "nothing": 40,
                "egg": 30,
                "lamb": 20,
                "beef":  10
            },
            "exp": {
                "nothing": 1,
                "egg": 3,
                "lamb": 5,
                "beef": 10
            },
            "money": {
                "nothing": 0,
                "egg": 25,
                "lamb": 40,
                "beef": 50
            }
        },
        "fish": {
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
            },
            "money": {
              "shrimp": 5,
              "trout": 20,
              "nothing": 0,
              "grouper": 100
            }
        },
        "farm": {
            "chances": {
                "chili": 45,
                "carrot": 25,
                "potato": 15,
                "tomato": 10,
                "pumpkin": 5
            },
            "exp": {
                "chili": 5,
                "carrot": 15,
                "potato": 25,
                "tomato": 75,
                "pumpkin": 100
            },
            "money": {
              "chili": 5,
              "carrot": 15,
              "potato": 25,
              "tomato": 50,
              "pumpkin": 250
          }
        },
        "mine": {
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
                    "rawsteel": 3,
                    "emerald": 2
                },
                "9": {
                    "silver": 21,
                    "platinum": 17,
                    "gold": 16,
                    "iron": 15,
                    "vibrance": 11,
                    "diamond": 8,
                    "rawsteel": 5,
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
                    "rawsteel": 5,
                    "emerald": 3,
                    "firestone": 2,
                    "crystal": 1
                }
            },
            "money": {
                "stone": 1,
                "coal": 2,
                "copper": 5,
                "iron": 7,
                "gold": 10,
                "silver": 25,
                "platinum": 50,
                "vibrance": 100,
                "diamond": 500,
                "rawsteel": 1000,
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
                "rawsteel": 500,
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
        "y_gap_per_level": 2.01
    },
    "shopFlatAmount": 100000,
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
        "fishing_rod": {
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
        },
        "helmet": {
            "exp": {
                "x_exp_per_level": 0.044,
                "y_gap_per_level": 1.99
            }
        },
        "chestplate": {
            "exp": {
                "x_exp_per_level": 0.044,
                "y_gap_per_level": 1.99
            }
        },
        "boots": {
            "exp": {
                "x_exp_per_level": 0.044,
                "y_gap_per_level": 1.99
            }
        }
    }
}