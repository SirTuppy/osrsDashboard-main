import { totalXpForLevel } from "./calculations.js";

export const skillRequirements = [
    // Skill         Current Required Levels   XP Needed XP/Hour          Boost Info
    { skill: "Runecraft", current: 1, required: 91, xpPerHour: 40000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Cooking", current: 1, required: 90, xpPerHour: 600000, boost: "+5 Chef's delight(m)", levels: 0, xpNeeded: 0 },
    { skill: "Fishing", current: 1, required: 91, xpPerHour: 67000, boost: "+5 Admiral pie", levels: 0, xpNeeded: 0 },
    { skill: "Slayer", current: 1, required: 93, xpPerHour: 60000, boost: "+5 Wild pie", levels: 0, xpNeeded: 0 },
    { skill: "Fletching", current: 1, required: 91, xpPerHour: 2500000, boost: "+4 Spicy stew", levels: 0, xpNeeded: 0 },
    { skill: "Woodcutting", current: 1, required: 87, xpPerHour: 70000, boost: "+3 Axeman's folly(m)", levels: 0, xpNeeded: 0 },
    { skill: "Herblore", current: 1, required: 86, xpPerHour: 300000, boost: "+4 Botanical pie", levels: 0, xpNeeded: 0 },
    { skill: "Thieving", current: 1, required: 91, xpPerHour: 150000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Agility", current: 1, required: 85, xpPerHour: 50000, boost: "+6 Summer pie", levels: 0, xpNeeded: 0 },
    { skill: "Farming", current: 1, required: 88, xpPerHour: 200000, boost: "+3 Garden pie", levels: 0, xpNeeded: 0 },
    { skill: "Crafting", current: 1, required: 80, xpPerHour: 300000, boost: "+4 Mushroom pie", levels: 0, xpNeeded: 0 },
    { skill: "Firemaking", current: 1, required: 90, xpPerHour: 450000, boost: "+5 Spicy stew", levels: 0, xpNeeded: 0 },
    { skill: "Mining", current: 1, required: 82, xpPerHour: 70000, boost: "+3 Dwarven stout(m)", levels: 0, xpNeeded: 0 },
    { skill: "Smithing", current: 1, required: 87, xpPerHour: 350000, boost: "+4 Spicy stew", levels: 0, xpNeeded: 0 },
    { skill: "Prayer", current: 1, required: 85, xpPerHour: 700000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Construction", current: 1, required: 78, xpPerHour: 150000, boost: "+3 Crystal saw, +5 Spicy stew", levels: 0, xpNeeded: 0 },
    { skill: "Magic", current: 1, required: 96, xpPerHour: 200000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Ranged", current: 1, required: 70, xpPerHour: 150000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Strength", current: 1, required: 70, xpPerHour: 100000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Hunter", current: 1, required: 1, xpPerHour: 100000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Attack", current: 1, required: 1, xpPerHour: 100000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Defence", current: 1, required: 1, xpPerHour: 100000, boost: "N/A", levels: 0, xpNeeded: 0 },
    { skill: "Hitpoints", current: 10, required: 1, xpPerHour: 0, boost: "N/A", levels: 0, xpNeeded: 0 } // Start HP at 10
];

export let customSkillXPRates = {}; // To store loaded custom rates

// Diary Data (Only Elite for now, as per original code)
export const diaries = {
    "ardougne": { name: "Ardougne Diary", tasks: { "elite": ["Catch a manta ray in the Fishing Trawler and cook it in Port Khazard","Successfully picklock the door to the basement of Yanille Agility Dungeon","Pickpocket a hero","Make a rune crossbow yourself from scratch within Witchaven or Yanille","Imbue a salve amulet at Nightmare Zone, or equip a salve amulet(i) that was imbued there","Pick some torstol from the patch north of East Ardougne","Complete a lap of Ardougne's rooftop agility course","Cast Ice Barrage on another player within Castle Wars"]}, requirements: ["Fishing 91", "Cooking 95", "Thieving 82", "Fletching 91", "Farming 85", "Agility 90", "Magic 94"] },
    "desert": { name: "Desert Diary", tasks: { "elite": ["Bake a wild pie at the Nardah clay oven","Cast Ice Barrage against a foe in the Desert (outside of desert cities)","Fletch some Dragon darts at the Bedabin Camp","Speak to the Kq head in your POH","Steal from the Grand Gold Chest in the final room of Pyramid Plunder","Restore at least 85 Prayer points when praying at the altar in Sophanem"]}, requirements: ["Cooking 85", "Magic 94", "Fletching 95", "Construction 78", "Thieving 91", "Prayer 85"] },
    "falador": { name: "Falador Diary", tasks: { "elite": ["Craft 252 Air Runes simultaneously from Essence without the use of Extracts","Purchase a white 2h sword from Sir Vyvin","Find at least 3 magic roots at once when digging up your magic tree in Falador","Perform a Skillcape or Quest cape emote at the top of Falador Castle","Jump over the strange floor in Taverley Dungeon","Mix a Saradomin brew in Falador east bank"]}, requirements: ["Runecraft 88", "Farming 91", "Agility 80", "Herblore 81"] },
    "fremennik": { name: "Fremennik Diary", tasks: { "elite": ["Kill each of the Dagannoth Kings","Craft 56 astral runes simultaneously from Essence without the use of Extracts","Create a dragonstone amulet in the Neitiznot furnace","Complete a lap of the Rellekka Rooftop Course","Kill the generals of Armadyl, Bandos, Saradomin, and Zamorak in the God Wars Dungeon","Slay a Spiritual mage within the God Wars Dungeon"]}, requirements: ["Runecraft 82", "Crafting 80", "Agility 80", "Slayer 83"] },
    "kandarin": { name: "Kandarin Diary", tasks: { "elite": ["Read the blackboard at Barbarian Assault after reaching level 5 in every role","Pick some dwarf weed from the herb patch at Catherby","Fish and cook 5 sharks in Catherby using the Cooking gauntlets","Mix a Stamina mix on top of the Seers' Village bank","Smith a rune hasta at Otto's Grotto","Construct a pyre ship from magic logs","Teleport to Catherby"]}, requirements: ["Farming 79", "Fishing 76", "Cooking 80", "Herblore 86", "Smithing 90", "Firemaking 85", "Magic 87"] },
    "karamja": { name: "Karamja Diary", tasks: { "elite": ["Craft 56 nature runes simultaneously from Essence without the use of Extracts","Equip a fire cape or infernal cape in the TzHaar City","Check the health of a palm tree in Brimhaven","Create an antivenom potion whilst standing in the horse shoe mine","Check the health of your Calquat tree patch"]}, requirements: ["Runecraft 91", "Farming 72", "Herblore 87"] },
    "kourend": { name: "Kourend & Kebos Diary", tasks: { "elite": ["Craft one or more Blood runes from Dark essence fragments","Chop some redwood logs","Defeat Skotizo in the Catacombs of Kourend","Catch an anglerfish and cook it whilst in Great Kourend","Kill a hydra in the Karuulm Slayer Dungeon","Create an Ape Atoll teleport tablet","Complete a raid in the Chambers of Xeric","Create your own battlestaff from scratch within the Farming Guild"]}, requirements: ["Runecraft 77", "Woodcutting 90", "Fishing 82", "Cooking 84", "Slayer 95", "Magic 90", "Farming 85"] },
    "lumbridge": { name: "Lumbridge & Draynor Diary", tasks: { "elite": ["Steal from a Dorgesh-Kaan rich chest","Grapple across a pylon on the Dorgesh-Kaan Agility Course","Chop some magic logs at the Mage Training Arena","Smith an adamant platebody down in Draynor Sewer","Craft 140 or more Water runes simultaneously from Essence without the use of Extracts","Perform the Quest point cape emote in the Wise Old Man's house"]}, requirements: ["Thieving 78", "Agility 80", "Strength 70", "Ranged 70", "Woodcutting 75", "Smithing 88", "Runecraft 76"] },
    "morytania": { name: "Morytania Diary", tasks: { "elite": ["Catch a shark in Burgh de Rott with your bare hands","Cremate any Shade remains on a Magic or Redwood pyre","Fertilize the Morytania herb patch using Lunar Magic","Craft a Black dragonhide body in the Canifis bank","Kill an Abyssal demon in the Slayer Tower","Loot the Barrows chest while wearing any complete barrows set"]}, requirements: ["Fishing 96", "Firemaking 95", "Magic 87", "Farming 78", "Crafting 84", "Slayer 85"] },
    "varrock": { name: "Varrock Diary", tasks: { "elite": ["Create a Super combat potion in Varrock West Bank","Use Lunar magic to make 20 mahogany planks in the Varrock Lumber Yard","Bake a summer pie in the Cooking Guild","Smith and fletch ten rune darts within Varrock","Craft 100 or more earth runes simultaneously from Essence without the use of Extracts"]}, requirements: ["Herblore 90", "Magic 86", "Woodcutting 75", "Cooking 95", "Smithing 89", "Fletching 81", "Runecraft 78"] },
    "western": { name: "Western Provinces Diary", tasks: { "elite": ["Fletch a magic longbow in Tirannwn","Kill the Thermonuclear smoke devil","Have Prissy Scilla protect your magic tree","Use the Elven overpass advanced cliffside shortcut","Equip any complete void set","Claim a Chompy bird hat from Rantz after registering at least 1,000 kills","Pickpocket an elf"]}, requirements: ["Fletching 85", "Slayer 93", "Farming 75", "Agility 85", "Ranged 70", "Thieving 85"] },
    "wilderness": { name: "Wilderness Diary", tasks: { "elite": ["Kill Callisto, Venenatis, and Vet'ion","Teleport to Ghorrock","Fish and cook a dark crab in the Resource Area","Smith a rune scimitar from scratch in the Resource Area","Steal from the Rogues' castle chest","Kill a spiritual mage inside the Wilderness God Wars Dungeon","Cut and burn some magic logs in the Resource Area"]}, requirements: ["Magic 96", "Fishing 85", "Cooking 90", "Mining 85", "Smithing 90", "Thieving 84", "Slayer 83", "Woodcutting 75", "Firemaking 75"] }
};
window.diaries = diaries; // Keep global if needed, though direct use is better

// Milestone Goal Data (FILL THESE IN!)
export const milestoneGoalsData = {
    easy: {
        name: "Easy Goals", color: "#3b82f6", 
        goals: [
            { name: "Graceful Outfit", info: "260 Marks of Grace", achieved: false },
            { name: "Rogue Equipment", info: "", achieved: false }, // Only one not checked in image
            { name: "Fairy Rings", info: "", achieved: false },
            { name: "Magic Secateurs", info: "", achieved: false },
            { name: "Ardougne Cloak 1", info: "", achieved: false },
            { name: "Bird House Trapping", info: "", achieved: false },
            { name: "Dorgeshuun Crossbow", info: "", achieved: false },
            { name: "Climbing Boots", info: "", achieved: false },
            { name: "Elemental Shield", info: "Or Mind Shield", achieved: false },
            { name: "Ava's Attractor", info: "", achieved: false },
            { name: "Protection Prayers", info: "43 Prayer", achieved: false },
            { name: "Quests/Free-to-Play", info: "Finish all F2P Quests", achieved: false },
            { name: "High Level Alchemy", info: "", achieved: false },
            { name: "Alfred Grimhand's Barcrawl", info: "", achieved: false },
            { name: "Amulet of Strength", info: "", achieved: false },
            { name: "Fremmenik Trials", info: "", achieved: false },
            { name: "Iban's Staff", info: "", achieved: false },
            { name: "Ardougne Cloak 2", info: "Herb Run Teleport", achieved: false }, // Assuming this is Cloak 2 based on position
            { name: "Camelot Teleport", info: "Herb Run Teleport", achieved: false },
            { name: "Explorer's Ring 2", info: "Herb Run Teleport", achieved: false },
            { name: "Kourend Castle Teleport", info: "Herb Run Teleport", achieved: false },
            { name: "Ectophial", info: "Herb Run Teleport", achieved: false },
            { name: "Farming Guild", info: "Herb Run Teleport", achieved: false }, // Assuming Farming Guild Teleport
            { name: "Trollheim Teleport", info: "Herb Run Teleport", achieved: false },
        ]
    },
    medium: {
        name: "Medium Goals", color: "#4caf50", 
        goals: [
            { name: "Dragon Scimitar", info: "", achieved: false },
            { name: "Dragon Battleaxe", info: "", achieved: false },
            { name: "Salve Amulet", info: "", achieved: false },
            { name: "Fighter Torso", info: "", achieved: false },
            { name: "Prayer Potions", info: "", achieved: false },
            { name: "Black Mask", info: "", achieved: false },
            { name: "Rune Crossbow", info: "", achieved: false },
            { name: "Proselyte Armor", info: "", achieved: false },
            { name: "Magic Shortbow", info: "", achieved: false },
            { name: "Dragon Defender", info: "", achieved: false },
            { name: "Helm of Neitiznot", info: "", achieved: false },
            { name: "Void Knight Equipment", info: "1250 Pest Control Points", achieved: false },
            { name: "Broad Bolts", info: "300 Slayer Points", achieved: false },
            { name: "Barrows Gloves", info: "", achieved: false },
            { name: "Ancient Magicks", info: "Unlock the Spellbook", achieved: false },
            { name: "Medium STASH", info: "Unlock all Medium STASH Units", achieved: false },
            { name: "Crystal Saw", info: "Eyes of Glouphrie Quest", achieved: false },
            { name: "Herb Sack", info: "750 Slayer Points", achieved: false },
            { name: "Amulet of Glory", info: "", achieved: false },
            { name: "Anglers Outfit", info: "", achieved: false },
            { name: "Prospector Kit", info: "", achieved: false },
            { name: "Lumberjack Outfit", info: "", achieved: false },
            { name: "Medium Diary", info: "All", achieved: false },
            { name: "Ectoplasmator", info: "250 Soul Wars points", achieved: false },
            { name: "Holy Wrench", info: "", achieved: false },
            { name: "Bone Crusher", info: "", achieved: false },
            { name: "Piety", info: "", achieved: false },
            { name: "Construction", info: "Level 55 / Portal Chambers", achieved: false },
            { name: "Karambwan Fishing", info: "", achieved: false },
            { name: "Ava's Accumulator", info: "", achieved: false }
        ]
    },
    hard: {
        name: "Hard Goals", color: "#f44336", 
        goals: [
            { name: "Slayer Helm (i)", info: "", achieved: false },
            { name: "Elite Void Knight Equipment", info: "400 Pest Control Points", achieved: false },
            { name: "Dragon Boots", info: "", achieved: false },
            { name: "Abyssal Whip", info: "", achieved: false },
            { name: "Imbued God Cape", info: "", achieved: false },
            { name: "Teleport to House (Tablet)", info: "Create 1,500+", achieved: false },
            { name: "Lunar Spellbook", info: "", achieved: false },
            { name: "Ranger Boots", info: "Medium Clue Scrolls", achieved: false },
            { name: "Rune Pouch", info: "", achieved: false },
            { name: "Blessed D'Hide Armour", info: "", achieved: false },
            { name: "Fire Cape", info: "", achieved: false },
            { name: "Super Potions", info: "Herblore 66", achieved: false },
            { name: "Crystal Shield", info: "", achieved: false },
            { name: "Infinity Boots", info: "", achieved: false },
            { name: "Hard Diary", info: "All", achieved: false },
            { name: "Barrows", info: "Relevant Gearsets", achieved: false },
            { name: "Zombie Axe", info: "", achieved: false },
            { name: "Amulet of Fury", info: "", achieved: false },
            { name: "God Books Completed", info: "", achieved: false },
            { name: "Dagannoth Imbued Rings", info: "", achieved: false },
            { name: "Trident of the Seas", info: "", achieved: false },
            { name: "Combat", info: "Base 85+ Combat Stats", achieved: false },
            { name: "Quest Cape", info: "", achieved: false },
            { name: "Ava's Assembler", info: "", achieved: false },
            { name: "Gauntlet", info: "First Unique", achieved: false },
            { name: "Dragon Sword", info: "", achieved: false }
        ]
    },
    elite: {
        name: "Elite Goals", color: "#FFC107", 
        goals: [
            { name: "Construction", info: "Level 83 / Max- POH", achieved: false },
            { name: "Toxic Blowpipe", info: "78 Fletching", achieved: false },
            { name: "Trident of the Swamps", info: "", achieved: false },
            { name: "Kree'arra", info: "First Unique", achieved: false },
            { name: "General Graardor", info: "First Unique", achieved: false },
            { name: "K'ril Tsutsaroth", info: "First Unique", achieved: false },
            { name: "Dragon Warhammer", info: "", achieved: false },
            { name: "Full Crystal Armour", info: "", achieved: false },
            { name: "Bow of Faerdhinen (c)", info: "", achieved: false },
            { name: "Abyssal Tentacle", info: "", achieved: false },
            { name: "Occult Necklace", info: "", achieved: false },
            { name: "Dragon Crossbow", info: "", achieved: false },
            { name: "Chambers of Xeric", info: "First Unique", achieved: false },
            { name: "Elite Diary", info: "Most", achieved: false } // Assuming "Most" means not all yet
        ]
    },
    master: {
        name: "Master Goals", color: "#9c27b0", 
        goals: [
            { name: "Construction", info: "Level 87 / Max+ POH", achieved: false },
            { name: "Achievement Diary Cape", info: "Refer to diary page", achieved: false }
        ]
    }
};

// --- GEAR PROGRESSION DATA ---
export const gearProgressionData = {
    early: {
        name: "Early Game",
        color: "#64b5f6",
        items: [
            // Melee
            { name: "Helm of Neitiznot", style: "attack", achieved: false, itemId: 10828, price: 0 },
            { name: "Fighter Torso", style: "attack", achieved: false, itemId: 10551, price: 0 }, // Untradeable
            { name: "Obsidian platelegs", style: "attack", achieved: false, itemId: 21304, price: 0 },
            { name: "Climbing Boots", style: "attack", achieved: false, itemId: 3105, price: 0 },
            { name: "Mixed Hide Cape", style: "attack", achieved: false, itemId: 6568, price: 0 }, // Assumed Obsidian Cape
            { name: "Dragon Scimitar", style: "attack", achieved: false, itemId: 4587, price: 0 },
            { name: "Ring of Dueling", style: "attack", achieved: false, itemId: 2552, price: 0 }, // (8) Charges
            { name: "Unholy Book", style: "attack", achieved: false, itemId: 3844, price: 0 }, // Completed
            // Ranged
            { name: "Archer Helm", style: "ranged", achieved: false, itemId: 1169, price: 0 },
            { name: "Mixed Hide Armour", style: "ranged", achieved: false, itemId: 1131, price: 0 }, // Assumed Green d'hide body
            { name: "Rune Crossbow", style: "ranged", achieved: false, itemId: 9185, price: 0 },
            { name: "Magic Shortbow (i)", style: "ranged", achieved: false, itemId: 12788, price: 0 },
            { name: "Ava's Attractor", style: "ranged", achieved: false, itemId: 10498, price: 0 }, // Untradeable
            { name: "Book of Law", style: "ranged", achieved: false, itemId: 12612, price: 0 }, // Completed
            { name: "Shayzien Boots (5)", style: "ranged", achieved: false, itemId: 13337, price: 0 },
            // Magic
            { name: "Farseer Helm", style: "magic", achieved: false, itemId: 3755, price: 0 },
            { name: "Mystic Robes", style: "magic", achieved: false, itemId: 4091, price: 0 }, // Assumed Mystic robe top (blue)
            { name: "Iban's Staff", style: "magic", achieved: false, itemId: 12658, price: 0 }, // Assumed (u)
            { name: "Beacon Ring", style: "magic", achieved: false, itemId: 2413, price: 0 }, // Untradeable
            { name: "Book of Darkness", style: "magic", achieved: false, itemId: 12608, price: 0 }, // Completed
            { name: "God Capes", style: "magic", achieved: false, itemId: 2412, price: 0 }, // Assumed Saradomin Cape (others similar price)
            // Other
            { name: "Blessing", style: "prayer", achieved: false, itemId: 12637, price: 0 }, // Assumed Holy Blessing
            { name: "Ardougne Cape 1", style: "prayer", achieved: false, itemId: 6107, price: 0 }, // Untradeable
            { name: "Amulet of Glory", style: "all", achieved: false, itemId: 1712, price: 0 } // (4) Charges
        ]
    },
    mid: {
        name: "Mid Game",
        color: "#81c784",
        items: [
            // Melee
            { name: "Fire Cape", style: "attack", achieved: false, itemId: 6570, price: 0 }, // Untradeable
            { name: "Dragon Boots", style: "attack", achieved: false, itemId: 11840, price: 0 },
            { name: "Dharok's Platelegs", style: "attack", achieved: false, itemId: 4722, price: 0 },
            { name: "Blood Moon Armour", style: "attack", achieved: false, itemId: 28951, price: 0 }, // Assumed Chestplate
            { name: "Abyssal Whip", style: "attack", achieved: false, itemId: 4151, price: 0 },
            { name: "Dragon Defender", style: "attack", achieved: false, itemId: 12954, price: 0 }, // Untradeable
            { name: "Dragon Dagger", style: "attack", achieved: false, itemId: 5698, price: 0 }, // Assumed (p++)
            { name: "Arclight", style: "attack", achieved: false, itemId: 19675, price: 0 }, // Untradeable
            // Ranged
            { name: "Ava's Accumulator", style: "ranged", achieved: false, itemId: 10499, price: 0 }, // Untradeable
            { name: "Hunters' Sunlight Crossbow", style: "ranged", achieved: false, itemId: 28963, price: 0 }, // Assumed Hunter's crossbow
            { name: "Karil the Tainted's Equipment", style: "ranged", achieved: false, itemId: 4736, price: 0 }, // Assumed Leathertop
            { name: "Eclipse Moon Armour", style: "ranged", achieved: false, itemId: 28957, price: 0 }, // Assumed Chestplate
            // Magic
            { name: "Ahrim the Blighted's Equipment", style: "magic", achieved: false, itemId: 4712, price: 0 }, // Assumed Robetop
            { name: "Blue Moon Armour", style: "magic", achieved: false, itemId: 28960, price: 0 }, // Assumed Chestplate
            { name: "Warped Sceptre (uncharged)", style: "magic", achieved: false, itemId: 28620, price: 0 },
            { name: "Mage Book", style: "magic", achieved: false, itemId: 6889, price: 0 },
            { name: "Ancient Staff", style: "magic", achieved: false, itemId: 4675, price: 0 },
            { name: "Infinity Boots", style: "magic", achieved: false, itemId: 6920, price: 0 },
             // Other
            { name: "Blessed D'Hide Armour", style: "prayer", achieved: false, itemId: 10370, price: 0 }, // Assumed Saradomin body
            { name: "Crystal Shield", style: "all", achieved: false, itemId: 4224, price: 900000 }, // Full shield
            { name: "Barrows Gloves", style: "all", achieved: false, itemId: 7462, price: 0 }, // Untradeable
            { name: "Void Knight Equipment", style: "all", achieved: false, itemId: 11665, price: 0 } // Melee helm, Untradeable
        ]
    },
    late: {
        name: "Late Game",
        color: "#ff8a65",
        items: [
             // Melee
            { name: "Neitiznot Faceguard", style: "attack", achieved: false, itemId: 24477, priceSourceItemId: 24268, price: 0 },
            { name: "Abyssal Tentacle", style: "attack", achieved: false, itemId: 12006, priceSourceItemId:4151,  price: 0 },
            { name: "Bandos Armour", style: "attack", achieved: false, itemId: 11832, price: 0 }, // Assumed Chestplate
            { name: "Berserker Ring (i)", style: "attack", achieved: false, itemId: 11773, price: 0 },
            { name: "Amulet of Torture", style: "attack", achieved: false, itemId: 19553, price: 0 },
            { name: "Primordial Boots", style: "attack", achieved: false, itemId: 13239, price: 0 },
            { name: "Osmumten's Fang", style: "attack", achieved: false, itemId: 26219, price: 0 },
            { name: "Dragon Warhammer", style: "attack", achieved: false, itemId: 13576, price: 0 },
            { name: "Bandos Godsword", style: "attack", achieved: false, itemId: 11810, price: 0 },
            { name: "Burning Claws", style: "attack", achieved: false, itemId: 28999, price: 0 },
            { name: "Emberlight", style: "attack", achieved: false, itemId: 28996, priceSourceItemId: 29580, price: 0 }, // Assumed Vambraces
             // Ranged
            { name: "Ava's Assembler", style: "ranged", achieved: false, itemId: 22109, price: 0 }, // Untradeable
            { name: "Crystal Armour", style: "ranged", achieved: false, itemId: 23975, price: 0 }, // Assumed Body (Finished)
            { name: "Bow of Faerdhinen", style: "ranged", achieved: false, itemId: 25867, priceSourceItemId: 25859, price: 0 }, // Corrupted
            { name: "Toxic Blowpipe", style: "ranged", achieved: false, itemId: 12924, priceSourceItemId: 12922, price: 0 }, // Empty
            { name: "Necklace of Anguish", style: "ranged", achieved: false, itemId: 19547, price: 0 },
            { name: "Archers Ring (i)", style: "ranged", achieved: false, itemId: 11771, price: 0 },
            { name: "Armadyl Armour", style: "ranged", achieved: false, itemId: 11826, price: 0 }, // Assumed Chestplate
            { name: "Pegasian Boots", style: "ranged", achieved: false, itemId: 13237, price: 0 },
            // Magic
            { name: "Imbued God Cape", style: "magic", achieved: false, itemId: 21795, price: 0 }, // Assumed Zamorak, Untradeable
            { name: "Trident of the Swamp", style: "magic", achieved: false, itemId: 12899, priceSourceItemId: 12900, price: 0 }, // Uncharged
            { name: "Seers Ring (i)", style: "magic", achieved: false, itemId: 11770, price: 0 },
            { name: "Tormented Bracelet", style: "magic", achieved: false, itemId: 19544, price: 0 },
            { name: "Eternal Boots", style: "magic", achieved: false, itemId: 13235, price: 0 },
            { name: "Virtus Robes", style: "magic", achieved: false, itemId: 28233, price: 0 }, // Assumed Robe top
            // Other
            { name: "Rada's Blessing 4", style: "prayer", achieved: false, itemId: 22943, price: 0 }, // Untradeable
            { name: "Elite Void Knight Equipment", style: "all", achieved: false, itemId: 11665, price: 0 } // Melee helm, Untradeable
        ]
    },
    end: {
        name: "End Game",
        color: "#ffd54f",
        items: [
            // Melee
            { name: "Torva platebody", style: "attack", achieved: false, itemId: 26384, price: 0 }, // Platebody
            { name: "Scythe of Vitur", style: "attack", achieved: false, itemId: 22486, price: 0 },
            { name: "Infernal Cape", style: "attack", achieved: false, itemId: 21295, price: 0 }, // Untradeable
            { name: "Amulet of Rancour", style: "attack", achieved: false, itemId: 28275, price: 0 },
            { name: "Ferocious Gloves", style: "attack", achieved: false, itemId: 22981, priceSourceItemId: 22983, price: 0 },
            { name: "Avernic Defender", style: "attack", achieved: false, itemId: 22322, priceSourceItemId: 22477, price: 0 },
            { name: "Elder Maul", style: "attack", achieved: false, itemId: 21003, price: 0 },
            { name: "Dragon Claws", style: "attack", achieved: false, itemId: 13652, price: 0 },
            { name: "Ultor Ring", style: "attack", achieved: false, itemId: 28307, price: 0 },
            // Ranged
            { name: "Fortified Masori Armour", style: "ranged", achieved: false, itemId: 27232, price: 0 }, // Body (f)
            { name: "Dizana's Quiver", style: "ranged", achieved: false, itemId: 28917, price: 0 },
            { name: "Zaryte Vambraces", style: "ranged", achieved: false, itemId: 26378, price: 0 },
            { name: "Zaryte Crossbow", style: "ranged", achieved: false, itemId: 26374, price: 0 },
            { name: "Twisted Bow", style: "ranged", achieved: false, itemId: 20997, price: 0 },
            { name: "Venator Ring", style: "ranged", achieved: false, itemId: 27591, price: 0 },
            // Magic
            { name: "Kodai Wand", style: "magic", achieved: false, itemId: 21006, price: 0 },
            { name: "Tumeken's Shadow", style: "magic", achieved: false, itemId: 27277, price: 0 },
            { name: "Occult Necklace", style: "magic", achieved: false, itemId: 12002, price: 0 },
            { name: "Ancestral Robes", style: "magic", achieved: false, itemId: 21018, price: 0 }, // Assumed Robe top
            { name: "Magus Ring", style: "magic", achieved: false, itemId: 28281, price: 0 },
            { name: "Elidinis' Ward", style: "magic", achieved: false, itemId: 27245, price: 0 }, // Assumed (f)
            // Other
            { name: "Sunfire Fanatic Armour", style: "prayer", achieved: false, itemId: 28909, price: 0 } // Assumed Cuirass
        ]
    },
    niche: {
        name: "Niche",
        color: "#ce93d8",
        items: [
            // Melee / Spec
            { name: "Serpentine Helm", style: "attack", achieved: false, itemId: 12929, price: 0 }, // Uncharged
            { name: "Keris Partisan", style: "attack", achieved: false, itemId: 25949, price: 0 }, // Default
            { name: "Voidwaker", style: "attack", achieved: false, itemId: 27660, price: 0 },
            { name: "Inquisitor's Armour", style: "attack", achieved: false, itemId: 24419, price: 0 }, // Assumed Great Helm
            { name: "Inquisitor's mace", style: "attack", achieved: false, itemId: 24417, price: 0 },
            { name: "Justiciar Armour", style: "attack", achieved: false, itemId: 22326, price: 0 }, // Assumed Chestguard
            // Ranged / Spec
            { name: "Scorching Bow", style: "ranged", achieved: false, itemId: 28901, priceSourceItemId: 29580, price: 0 }, // Tonalztics of ralos
            { name: "Venator bow", style: "ranged", achieved: false, itemId: 27654, price: 0 },
            // Magic / Spec
            { name: "Nightmare Staff", style: "magic", achieved: false, itemId: 24422, price: 0 }, // Base staff
            { name: "Tome of Fire", style: "magic", achieved: false, itemId: 20714, price: 0 }, // Full
            { name: "Tome of Water", style: "magic", achieved: false, itemId: 25581, price: 0 }, // Full
            { name: "Tome of Earth", style: "magic", achieved: false, itemId: 28903, price: 0 }, // Untradeable
            // Prayer / Other
            { name: "Ring of the Gods (i)", style: "prayer", achieved: false, itemId: 13182, price: 0 },
            { name: "Bonecrusher Necklace", style: "prayer", achieved: false, itemId: 25572, price: 0 },
            { name: "Ancient Mace", style: "prayer", achieved: false, itemId: 6745, price: 0 },
            { name: "Proselyte Armour", style: "prayer", achieved: false, itemId: 9674, price: 0 }, // Assumed Hauberk
            // Utility / All
            { name: "Slayer Helm (i)", style: "all", achieved: false, itemId: 11865, price: 0 }, // Untradeable
            { name: "Lightbearer", style: "all", achieved: false, itemId: 25975, price: 0 },
            { name: "Crystal Shield", style: "all", achieved: false, itemId: 4224, price: 0 }, // Duplicate from Mid Game
            { name: "Salve Amulet (ei)", style: "all", achieved: false, itemId: 12018, price: 0 }, // Untradeable
            { name: "Ring of Suffering (i)", style: "all", achieved: false, itemId: 20657, price: 0 },
            { name: "Amulet of Blood Fury", style: "all", achieved: false, itemId: 24789, priceSourceItemId: 24777, price: 0 }
        ]
    }
};

export let miscellaneousGoals = []; // Array to store miscellaneous goals
export let currentUsername = ''; // Default or load from storage

export const HISCORE_SKILL_ORDER = [
    "Overall", "Attack", "Defence", "Strength", "Hitpoints", "Ranged",
    "Prayer", "Magic", "Cooking", "Woodcutting", "Fletching", "Fishing",
    "Firemaking", "Crafting", "Smithing", "Mining", "Herblore", "Agility",
    "Thieving", "Slayer", "Farming", "Runecraft", "Hunter", "Construction"
];

export const DEFAULT_SKILL_RATES = {}; // To store original rates for reset
skillRequirements.forEach(skill => {
    DEFAULT_SKILL_RATES[skill.skill] = skill.xpPerHour;
    // Initial calculation based on reset levels (optional but good practice)
    if (skill.required > 1) {
        skill.levels = Math.max(0, skill.required - skill.current);
        skill.xpNeeded = Math.max(0, totalXpForLevel(skill.required) - totalXpForLevel(skill.current));
    } else {
        skill.levels = 0;
        skill.xpNeeded = 0;
    }
});