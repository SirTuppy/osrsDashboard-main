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
export let diaryCompletionState = {};

export const questUnlocksData = {
    skills: {
        name: "Skill Unlocks",
        quests: [
            { name: "Druidic Ritual", unlock: "Herblore", completed: false },
            { name: "Rune Mysteries", unlock: "Runecraft", completed: false },
            { name: "Tears of Guthix", unlock: "Weekly XP Minigame", completed: false },
            { name: "Desert Treasure I", unlock: "Ancient Magicks", completed: false },
            { name: "A Kingdom Divided", unlock: "Arceuus Spell Upgrades", completed: false },
            { name: "Lunar Diplomacy", unlock: "Lunar Spellbook", completed: false },
            { name: "Dream Mentor", unlock: "Misc Lunar Spells", completed: false },
            { name: "King's Ransom", unlock: "Piety/Chivalry Prayers", completed: false },
        ]
    },
    areas: {
        name: "Area Unlocks",
        quests: [
            // { name: "Children of the Sun", unlock: "Varlamore (partial)", completed: false }, // Add when relevant
            { name: "Priest In Peril", unlock: "Morytania", completed: false },
            { name: "Bone Voyage", unlock: "Fossil Island", completed: false },
            { name: "Throne of Miscellania", unlock: "Miscellania Kingdom", completed: false },
            { name: "Regicide", unlock: "Tirannwn", completed: false },
            { name: "Mourning's End Part I", unlock: "Lletya", completed: false },
            { name: "Song of the Elves", unlock: "Prifddinas", completed: false },
            { name: "Making Friends with My Arm", unlock: "Weiss", completed: false },
            { name: "Sins of the Father", unlock: "Darkmeyer", completed: false },
            { name: "Cabin Fever", unlock: "Mos Le'Harmless", completed: false },
            // { name: "Perilous Moons", unlock: "Cam Torum / Neypotzli", completed: false }, // Add when relevant
        ]
    },
    transport: {
        name: "Transportation",
        quests: [
            { name: "Plague City", unlock: "Ardougne Teleport", completed: false },
            { name: "Enlightened Journey", unlock: "Balloon Transport", completed: false },
            { name: "Fairy Tale II (Start)", unlock: "Fairy Rings", completed: false },
            { name: "Tree Gnome Village", unlock: "Spirit Trees", completed: false },
            { name: "The Grand Tree", unlock: "Gnome Gliders", completed: false },
            { name: "Ghosts Ahoy", unlock: "Ectophial", completed: false },
            { name: "Watchtower", unlock: "Watchtower Teleport", completed: false },
            { name: "A Taste of Hope", unlock: "Drakan's Medallion", completed: false },
            { name: "Eadgar's Ruse", unlock: "Trollheim Teleport", completed: false },
            { name: "Shilo Village", unlock: "Shilo Cart System", completed: false },
            { name: "Client of Kourend", unlock: "Kourend Castle Teleport", completed: false },
            // { name: "Twilight's Promise", unlock: "Quetzal Transport", completed: false }, // Add when relevant
        ]
    },
    equipment: {
        name: "Equipment Unlocks",
        quests: [
            { name: "The Great Brain Robbery", unlock: "Barrelchest Anchor", completed: false },
            { name: "Dwarf Cannon", unlock: "Dwarf Multicannon", completed: false },
            { name: "Dragon Slayer I", unlock: "Rune Platebody / Green d'hide body", completed: false },
            { name: "Dragon Slayer II", unlock: "Ava's Assembler", completed: false },
            { name: "Family Crest", unlock: "Steel Gauntlets", completed: false },
            { name: "Animal Magnetism", unlock: "Ava's Devices", completed: false },
            { name: "The Slug Menace", unlock: "Proselyte Armour", completed: false },
            { name: "Recipe for Disaster (Subquests)", unlock: "Culinaromancer's Gloves", completed: false },
            { name: "Lost City", unlock: "Dragon Dagger/Longsword", completed: false },
            { name: "Monkey Madness I", unlock: "Dragon Scimitar", completed: false },
            { name: "Monkey Madness II", unlock: "Heavy Ballista", completed: false },
            { name: "The Fremennik Isles", unlock: "Helm of Neitiznot", completed: false },
            { name: "The Fremennik Exiles", unlock: "Neitiznot Faceguard", completed: false },
            { name: "Haunted Mine", unlock: "Salve Amulet", completed: false },
            { name: "Beneath Cursed Sands", unlock: "Keris Partisan", completed: false },
        ]
    }
};

export const majorMilestonesData = [
    { name: "Recipe for Disaster (Full)", info: "Barrows Gloves", completed: false },
    { name: "Dragon Slayer II", info: "Myths' Guild / Vorkath", completed: false },
    { name: "Song of the Elves", info: "Prifddinas / Zalcano / Gauntlet", completed: false },
    { name: "Desert Treasure II", info: "Ancient Bosses / Rings", completed: false },
    { name: "Quest Point Cape", info: "Access to Area / Emote", completed: false },
    // Add others? Theatre of Blood entry?
];

// State variable for quest completion (using quest name as key)
export let questCompletionState = {};

export const diaries = {
    "ardougne": {
        name: "Ardougne Diary",
        tasks: {
            easy: [
                { "description": "Have Wizard Cromperty teleport you to the Rune essence mine (right-click him to Teleport).", "requires": ["Quest Rune Mysteries"] },
                { "description": "Steal a cake from the East Ardougne market stalls.", "requires": ["Thieving 5"] },
                { "description": "Sell silk to the Silk trader in East Ardougne for 60 coins each.", "requires": ["Thieving 20?"] },
                { "description": "Use the altar in East Ardougne's church (requires less than full Prayer points).", "requires": [] },
                { "description": "Go out fishing on the Fishing Trawler (you only need to start the minigame)", "requires": [] },
                { "description": "Enter the Combat Training Camp north of West Ardougne.", "requires": ["Quest Biohazard"] },
                { "description": "Have Tindel Marchant identify a rusty sword for you.", "requires": [] },
                { "description": "Use the Ardougne lever to teleport to the Wilderness (you may pull the lever there to return).", "requires": [] },
                { "description": "View Aleck's Hunter Emporium in Yanille.", "requires": [] },
                { "description": "Check what pets you have insured with Probita in East Ardougne (right-click her to Check).", "requires": [] }
            ],
            medium: [
                { "description": "Enter the unicorn pen in Ardougne Zoo using Fairy rings (BIS).", "requires": ["Quest Started Fairytale II - Cure a Queen"] },
                { "description": "Grapple over Yanille's south wall and jump off.", "requires": ["Agility 39", "Strength 38", "Ranged 21"] },
                { "description": "Harvest some strawberries from the Ardougne farming patch.", "requires": ["Farming 31"] },
                { "description": "Cast the Ardougne Teleport spell.", "requires": ["Quest Plague City", "Magic 51"] },
                { "description": "Travel to Castle Wars by Hot Air Balloon.", "requires": ["Quest Enlightened Journey", "Firemaking 50"] },
                { "description": "Claim buckets of sand from Bert in Yanille.", "requires": ["Quest The Hand in the Sand"] },
                { "description": "Catch any fish on the Fishing Platform.", "requires": ["Quest Started Sea Slug"] },
                { "description": "Pickpocket the master farmer north of East Ardougne.", "requires": ["Thieving 38"] },
                { "description": "Collect some cave nightshade from the Skavid caves (can be found in the northernmost cave).", "requires": ["Quest Watchtower"] },
                { "description": "Kill a swordchick in the Tower of Life (south-west in the basement).", "requires": ["Quest Tower of Life"] },
                { "description": "Equip an Iban's upgraded staff or upgrade an Iban's staff.", "requires": ["Quest Underground Pass"] },
                { "description": "Visit the island east of the Necromancer Tower (AIR).", "requires": ["Quest Started Fairytale II - Cure a Queen"] }
            ],
            hard: [
                { "description": "Recharge some jewellery at the Totem pole in the Legends' Guild.", "requires": ["Quest Legends' Quest"] },
                { "description": "Enter the Magic Guild.", "requires": ["Magic 66"] },
                { "description": "Steal from a chest in Ardougne Castle.", "requires": ["Thieving 72"] },
                { "description": "Have a zookeeper put you in Ardougne Zoo's monkey cage.", "requires": ["Quest Monkey Madness I"] },
                { "description": "Teleport to the Watchtower.", "requires": ["Quest Watchtower", "Magic 58"] },
                { "description": "Catch a Red Salamander.", "requires": ["Hunter 59"] },
                { "description": "Check the health of a palm tree near Tree Gnome Village (the patch next to Gileth).", "requires": ["Farming 68"] },
                { "description": "Pick some poison ivy berries from the patch south of East Ardougne (Near the Ardougne Monastery).", "requires": ["Farming 70"] },
                { "description": "Smith a Mithril platebody near Ardougne (the Port Khazard, Yanille, or West Ardougne anvil).", "requires": ["Smithing 68"] },
                { "description": "Enter your POH from Yanille.", "requires": ["Construction 50"] },
                { "description": "Smith a Dragon sq shield in West Ardougne.", "requires": ["Quest Plague City?", "Smithing 60"] },
                { "description": "Craft some Death runes from Essence.", "requires": ["Quest Mourning's End Part II", "Runecraft 65"] }
            ],
            elite: [
                { "description": "Catch a manta ray in the Fishing Trawler and cook it in Port Khazard.", "requires": ["Fishing 81", "Cooking 91"] },
                { "description": "Successfully picklock the door to the basement of Yanille Agility Dungeon.", "requires": ["Thieving 82"] },
                { "description": "Pickpocket a hero.", "requires": ["Thieving 80"] },
                { "description": "Make a rune crossbow yourself from scratch within Witchaven or Yanille.", "requires": ["Crafting 10", "Smithing 91", "Fletching 69"] },
                { "description": "Imbue a salve amulet at Nightmare Zone, or equip a salve amulet(i) that was imbued there.", "requires": ["Quest Haunted Mine"] },
                { "description": "Pick some torstol from the patch north of East Ardougne.", "requires": ["Farming 85"] },
                { "description": "Complete a lap of Ardougne's rooftop agility course.", "requires": ["Agility 90"] },
                { "description": "Cast Ice Barrage on another player within Castle Wars. Splashing does not count.", "requires": ["Quest Desert Treasure I", "Magic 94"] }
            ]
        }
    },
    "desert": {
        name: "Desert Diary",
        tasks: {
            easy: [
                { "description": "Catch a golden warbler.", "requires": ["Hunter 5"] },
                { "description": "Mine five clay in the north-eastern desert.", "requires": [] },
                { "description": "Enter the Kalphite Lair.", "requires": [] },
                { "description": "Enter the Desert with a set of desert robes equipped.", "requires": [] },
                { "description": "Kill a vulture (can be found north-west of Agility Pyramid).", "requires": [] },
                { "description": "Have the Nardah herbalist (Zahur) clean a herb for you.", "requires": [] },
                { "description": "Collect 5 Potato Cactus from the Kalphite Hive.", "requires": [] },
                { "description": "Sell some artefacts to Simon Templeton.", "requires": [] },
                { "description": "Open the sarcophagus in the first room of Pyramid Plunder.", "requires": ["Quest Started Icthlarin's Little Helper", "Thieving 21"] },
                { "description": "Cut a desert cactus open to fill a waterskin.", "requires": [] },
                { "description": "Travel from the Shantay Pass to Pollnivneach by magic carpet.", "requires": [] }
            ],
            medium: [
                { "description": "Climb to the summit of the Agility Pyramid.", "requires": ["Agility 30"] },
                { "description": "Slay a desert lizard.", "requires": ["Slayer 22"] },
                { "description": "Catch an orange salamander.", "requires": ["Hunter 47"] },
                { "description": "Steal a Phoenix feather from the Desert phoenix.", "requires": ["Thieving 25"] },
                { "description": "Travel to Uzer via magic carpet.", "requires": ["Quest The Golem"] },
                { "description": "Travel to the desert via the Eagle transport system.", "requires": ["Quest Eagles' Peak"] },
                { "description": "Pray at the Elidinis Statuette in Nardah (requires less than full Prayer points).", "requires": ["Quest Spirits of the Elid"] },
                { "description": "Create a combat potion in the desert (outside of desert cities).", "requires": ["Herblore 36"] },
                { "description": "Teleport to Enakhra's Temple with the Camulet.", "requires": ["Quest Enakhra's Lament"] },
                { "description": "Visit the genie (achieved during Spirits of the Elid).", "requires": ["Quest Spirits of the Elid"] },
                { "description": "Teleport to Pollnivneach with a redirected teleport to house tablet.", "requires": ["Construction 20"] },
                { "description": "Chop some teak logs near Uzer (the northern tree, south-east of the ruins).", "requires": ["Woodcutting 35"] }
            ],
            hard: [
                { "description": "Knock out and pickpocket a Menaphite Thug.", "requires": ["Quest The Feud", "Thieving 65"] },
                { "description": "Mine some granite.", "requires": ["Mining 45"] },
                { "description": "Refill your waterskins in the Desert using Lunar spells (outside the desert cities).", "requires": ["Quest Dream Mentor", "Magic 68"] },
                { "description": "Kill the Kalphite Queen.", "requires": [] },
                { "description": "Complete a lap of the Pollnivneach Rooftop Course.", "requires": ["Agility 70"] },
                { "description": "Slay a Dust devil in the desert cave with a Slayer helmet equipped.", "requires": ["Quest Started Desert Treasure I", "Slayer 65", "Defence 10"] },
                { "description": "Activate Ancient Magicks at the altar in the Ancient Pyramid.", "requires": ["Quest Desert Treasure I"] },
                { "description": "Defeat a locust rider with Keris.", "requires": ["Quest Contact!", "Attack 50"] },
                { "description": "Burn some yew logs on the Nardah Mayor's balcony.", "requires": ["Firemaking 60"] },
                { "description": "Create a Mithril platebody in Nardah.", "requires": ["Smithing 68"] }
            ],
            elite: [
                { "description": "Bake a wild pie at the Nardah clay oven.", "requires": ["Cooking 85"] },
                { "description": "Cast Ice Barrage against a foe in the Desert (outside of desert cities). It must not splash.", "requires": ["Quest Desert Treasure I", "Magic 94"] },
                { "description": "Fletch some Dragon darts at the Bedabin Camp.", "requires": ["Fletching 95"] },
                { "description": "Speak to the Kq head in your POH.", "requires": ["Quest Priest in Peril", "Construction 78"] },
                { "description": "Steal from the Grand Gold Chest in the final room of Pyramid Plunder.", "requires": ["Quest Started Icthlarin's Little Helper", "Thieving 91"] },
                { "description": "Restore at least 85 Prayer points when praying at the altar in Sophanem.", "requires": ["Quest Started Icthlarin's Little Helper", "Prayer 85"] }
            ]
        }
    },
    "falador": {
        name: "Falador Diary",
        tasks: {
            easy: [
                { "description": "Find out what your family crest is from Sir Renitee.", "requires": ["Construction 16"] },
                { "description": "Climb over the western Falador wall.", "requires": ["Agility 5"] },
                { "description": "Browse Sarah's Farming Shop.", "requires": [] },
                { "description": "Get a haircut from the Falador hairdresser.", "requires": [] },
                { "description": "Fill a bucket from the pump north of Falador west bank.", "requires": [] }, // Item req
                { "description": "Kill a duck in Falador Park.", "requires": [] },
                { "description": "Make a mind tiara.", "requires": [] }, // Item reqs
                { "description": "Take the boat to Entrana.", "requires": [] }, // Item restrictions
                { "description": "Repair a broken strut in the Motherlode Mine.", "requires": [] }, // Item reqs
                { "description": "Claim a security book from the Security Guard upstairs at Port Sarim jail.", "requires": [] },
                { "description": "Smith some Blurite limbs on Doric's anvil.", "requires": ["Quest The Knight's Sword", "Quest Doric's Quest", "Mining 10", "Smithing 13"] }
            ],
            medium: [
                { "description": "Light a bullseye lantern at the Chemist's in Rimmington.", "requires": ["Firemaking 49"] },
                { "description": "Telegrab some Wine of zamorak at the Chaos Temple just outside the Wilderness.", "requires": ["Magic 33"] },
                { "description": "Unlock the crystal chest in Taverley.", "requires": [] }, // Item req (key)
                { "description": "Place a Scarecrow in the Falador farm flower patch.", "requires": ["Farming 23"] },
                { "description": "Kill a Mogre at Mudskipper Point.", "requires": ["Quest Skippy and the Mogres", "Slayer 32"] },
                { "description": "Visit the Port Sarim Rat Pits.", "requires": ["Quest Ratcatchers"] }, // Partial completion
                { "description": "Grapple up and then jump off the north Falador wall.", "requires": ["Agility 11", "Strength 37", "Ranged 19"] },
                { "description": "Pickpocket a Falador guard.", "requires": ["Thieving 40"] },
                { "description": "Pray at the Altar of Guthix in Taverley whilst wearing full Initiate armour.", "requires": ["Quest Recruitment Drive", "Prayer 10", "Defence 20"] },
                { "description": "Mine some gold ore at the Crafting Guild.", "requires": ["Crafting 40", "Mining 40"] }, // Brown apron item req
                { "description": "Squeeze through the crevice in the Dwarven Mines.", "requires": ["Agility 42"] },
                { "description": "Chop and burn some willow logs in Taverley (can cut and burn willows just south along water)", "requires": ["Woodcutting 30", "Firemaking 30"] },
                { "description": "Craft a basket on the Falador farm loom.", "requires": ["Crafting 36"] },
                { "description": "Teleport to Falador.", "requires": ["Magic 37"] }
            ],
            hard: [
                { "description": "Craft 140 mind runes simultaneously from Essence.", "requires": ["Runecraft 56"] }, // Highest base level req
                { "description": "Change your family crest to the Saradomin symbol.", "requires": ["Prayer 70"] },
                { "description": "Kill the Giant Mole beneath Falador Park.", "requires": [] },
                { "description": "Kill a Skeletal Wyvern in the Asgarnia Ice Dungeon.", "requires": ["Slayer 72"] },
                { "description": "Complete a lap of the Falador Rooftop Agility Course.", "requires": ["Agility 50"] },
                { "description": "Enter the Mining Guild while wearing a prospector helmet.", "requires": ["Mining 60"] }, // Prospector helm item req
                { "description": "Kill the blue dragon under the Heroes' Guild.", "requires": ["Quest Heroes' Quest"] },
                { "description": "Crack a wall safe within Rogues' Den.", "requires": ["Thieving 50"] },
                { "description": "Recharge your Prayer in the Port Sarim church while wearing full Proselyte.", "requires": ["Quest The Slug Menace", "Defence 30", "Prayer 20"] }, // Proselyte armour req
                { "description": "Enter the Warriors' Guild.", "requires": ["Attack/Strength 130 total or 99"] }, // Special combined req
                { "description": "Equip a Dwarven helmet within the Dwarven Mines.", "requires": ["Quest Grim Tales", "Defence 50"] }
            ],
            elite: [
                { "description": "Craft 252 Air Runes simultaneously from Essence without the use of Extracts.", "requires": ["Runecraft 88"] }, // Highest base level req
                { "description": "Purchase a white 2h sword from Sir Vyvin.", "requires": ["Quest Wanted!"] }, // And kill score
                { "description": "Find at least 3 magic roots at once when digging up your magic tree in Falador.", "requires": ["Farming 91", "Woodcutting 75"] },
                { "description": "Perform a Skillcape or Quest cape emote at the top of Falador Castle.", "requires": ["Quest All Quests or Skill 99"] },
                { "description": "Jump over the strange floor in Taverley Dungeon.", "requires": ["Agility 80"] },
                { "description": "Mix a Saradomin brew in Falador east bank.", "requires": ["Herblore 81"] }
            ]
        }
    }, // End of Falador
    "fremennik": {
        name: "Fremennik Diary",
        tasks: {
            easy: [
                { "description": "Catch a cerulean twitch (found north of Fairy ring code DKS).", "requires": ["Hunter 11"] },
                { "description": "Change your boots at Yrsa's Shoe Store.", "requires": ["Quest The Fremennik Trials"] },
                { "description": "Kill 5 Rock Crabs.", "requires": [] },
                { "description": "Craft a tiara from scratch in Rellekka.", "requires": ["Quest The Fremennik Trials", "Crafting 23", "Mining 20", "Smithing 20"] },
                { "description": "Browse the Stonemason's shop (in west Keldagrim, right-click him to Trade).", "requires": ["Quest Started The Giant Dwarf"] },
                { "description": "Collect 5 snape grass on Waterbirth Island.", "requires": ["Quest The Fremennik Trials"] },
                { "description": "Steal from the Keldagrim crafting or baker's stall (located in the central building of Eastern Keldagrim)", "requires": ["Quest Started The Giant Dwarf", "Thieving 5"] },
                { "description": "Fill a bucket with water at the Rellekka well (near the entrance of the town).", "requires": [] },
                { "description": "Enter the Troll Stronghold.", "requires": ["Quest Troll Stronghold", "Quest Death Plateau"] },
                { "description": "Chop and burn some oak logs in the Fremennik Province (near the house portal).", "requires": ["Woodcutting 15", "Firemaking 15"] }
            ],
            medium: [
                { "description": "Slay a brine rat.", "requires": ["Quest Olaf's Quest", "Slayer 47"] },
                { "description": "Travel to the Snowy Hunter Area via Eagle.", "requires": ["Quest Eagles' Peak"] },
                { "description": "Mine some coal in Rellekka.", "requires": ["Quest The Fremennik Trials", "Mining 30"] },
                { "description": "Steal from the Rellekka fish stalls.", "requires": ["Quest The Fremennik Trials", "Thieving 42"] },
                { "description": "Travel to Miscellania by fairy ring (CIP).", "requires": ["Quest The Fremennik Trials", "Quest Started Fairytale II - Cure a Queen"] },
                { "description": "Catch a Snowy knight (just north-west of DKS).", "requires": ["Hunter 35"] },
                { "description": "Pick up your pet rock from your POH menagerie.", "requires": ["Quest The Fremennik Trials", "Construction 37"] },
                { "description": "Visit the Lighthouse from Waterbirth Island.", "requires": ["Quest Horror from the Deep", "Quest Started The Fremennik Trials"] },
                { "description": "Mine some gold at the Arzinian Mine (achieved during Between a Rock...).", "requires": ["Quest Between a Rock...", "Mining 40"] }
            ],
            hard: [
                { "description": "Teleport to Trollheim.", "requires": ["Quest Eadgar's Ruse", "Magic 61"] },
                { "description": "Catch a Sabre-toothed kyatt.", "requires": ["Hunter 55"] },
                { "description": "Mix a Super defence potion in the Fremennik Province (only in or near Rellekka).", "requires": ["Herblore 66"] },
                { "description": "Steal from the Keldagrim Gem Stall.", "requires": ["Quest Started The Giant Dwarf", "Thieving 75"] },
                { "description": "Craft a Neitiznot shield on Neitiznot.", "requires": ["Quest The Fremennik Isles", "Woodcutting 56"] },
                { "description": "Mine 5 adamantite ores on Jatizso.", "requires": ["Quest The Fremennik Isles", "Mining 70"] },
                { "description": "Obtain 100% support from your kingdom subjects.", "requires": ["Quest Throne of Miscellania"] },
                { "description": "Teleport to Waterbirth Island.", "requires": ["Quest Lunar Diplomacy", "Magic 72"] },
                { "description": "Obtain the Blast Furnace Foreman's permission to use the Blast Furnace for free.", "requires": ["Quest Started The Giant Dwarf", "Smithing 60"] }
            ],
            elite: [
                { "description": "Kill each of the Dagannoth Kings (logging out or switching worlds will not reset your progress).", "requires": [] },
                { "description": "Craft 56 astral runes simultaneously from Essence without the use of Extracts.", "requires": ["Quest Lunar Diplomacy", "Runecraft 82"] },
                { "description": "Create a dragonstone amulet in the Neitiznot furnace.", "requires": ["Quest The Fremennik Isles", "Crafting 80"] },
                { "description": "Complete a lap of the Rellekka Rooftop Course.", "requires": ["Agility 80"] },
                { "description": "Kill the generals of Armadyl, Bandos, Saradomin, and Zamorak in the God Wars Dungeon.", "requires": ["Quest Troll Stronghold?", "Agility 70", "Strength 70", "Hitpoints 70", "Ranged 70"] },
                { "description": "Slay a Spiritual mage within the God Wars Dungeon.", "requires": ["Quest Troll Stronghold?", "Slayer 83"] }
            ]
        }
    }, // End of Fremennik
    "kandarin": {
        name: "Kandarin Diary",
        tasks: {
            easy: [
                { "description": "Catch a mackerel at Catherby.", "requires": ["Fishing 16"] },
                { "description": "Buy a candle from the candle maker in Catherby.", "requires": [] },
                { "description": "Collect 5 flax from the Seers' Village flax field.", "requires": [] },
                { "description": "Play the Church organ in the Seers' Village church.", "requires": [] },
                { "description": "Plant jute seeds in the farming patch north of McGrubor's Wood.", "requires": ["Farming 13"] },
                { "description": "Have Galahad make you a cup of tea (found in the house west of McGrubor's Wood).", "requires": [] },
                { "description": "Defeat one of each elemental in the Elemental Workshop.", "requires": ["Quest Started Elemental Workshop I"] },
                { "description": "Get a pet fish from Harry in Catherby.", "requires": [] },
                { "description": "Buy a stew from the Seers' Village pub.", "requires": [] },
                { "description": "Speak to Sherlock between the Sorcerer's Tower and Keep Le Faye.", "requires": [] },
                { "description": "Cross the Coal truck log shortcut.", "requires": ["Agility 20"] }
            ],
            medium: [
                { "description": "Complete a lap of the Barbarian Agility course.", "requires": ["Quest Alfred Grimhand's Barcrawl", "Agility 35"] },
                { "description": "Create a Superantipoison potion from scratch in the Seers' Village/Catherby area.", "requires": ["Herblore 48"] },
                { "description": "Enter the Ranging Guild.", "requires": ["Ranged 40"] },
                { "description": "Use the grapple shortcut to get from the water obelisk to Catherby shore.", "requires": ["Agility 36", "Strength 22", "Ranged 39"] },
                { "description": "Catch and cook a bass in Catherby.", "requires": ["Fishing 46", "Cooking 43"] },
                { "description": "Teleport to Camelot.", "requires": ["Magic 45"] },
                { "description": "String a maple shortbow in Seers' Village bank.", "requires": ["Fletching 50"] },
                { "description": "Pick some limpwurt root from the farming patch in Catherby.", "requires": ["Farming 26"] },
                { "description": "Create a mind helmet (achieved during Elemental Workshop II).", "requires": ["Quest Elemental Workshop II"] },
                { "description": "Kill a fire giant in the Waterfall Dungeon.", "requires": ["Quest Waterfall Quest"] },
                { "description": "Complete a wave of Barbarian Assault.", "requires": [] },
                { "description": "Steal from the chest in Hemenster (between the range and anvil).", "requires": ["Thieving 47"] },
                { "description": "Travel to McGrubor's Wood by Fairy ring (ALS).", "requires": ["Quest Started Fairytale II - Cure a Queen"] },
                { "description": "Mine some coal near the coal trucks.", "requires": ["Mining 30"] }
            ],
            hard: [
                { "description": "Catch a leaping sturgeon (above the Baxtorian Falls).", "requires": ["Fishing 70", "Agility 45", "Strength 45"] },
                { "description": "Complete a lap of the Seers' Village Rooftop Course.", "requires": ["Agility 60"] },
                { "description": "Create a yew longbow from scratch around Seers' Village.", "requires": ["Fletching 70", "Woodcutting 60"] },
                { "description": "Enter the Seers' Village courthouse with Piety turned on.", "requires": ["Quest King's Ransom", "Prayer 70", "Defence 70"] },
                { "description": "Charge a water orb.", "requires": ["Magic 56"] },
                { "description": "Burn some maple logs with a bow in Seers' Village.", "requires": ["Firemaking 65"] },
                { "description": "Kill a shadow hound in the Shadow Dungeon.", "requires": ["Quest Started Desert Treasure I", "Thieving 53"] },
                { "description": "Kill a Mithril dragon.", "requires": [] },
                { "description": "Purchase and equip a granite body from Barbarian Assault.", "requires": ["Strength 50", "Defence 50"] },
                { "description": "Have the Seers' Village estate agent decorate your house with Fancy Stone (you must finish the dialogue).", "requires": ["Construction 50"] },
                { "description": "Smith an adamant spear at Otto's Grotto.", "requires": ["Smithing 75"] }
            ],
            elite: [
                { "description": "Read the blackboard at Barbarian Assault after reaching level 5 in every role.", "requires": [] },
                { "description": "Pick some dwarf weed from the herb patch at Catherby.", "requires": ["Farming 79"] },
                { "description": "Fish and cook 5 sharks in Catherby (at the range east of the bank) using the Cooking gauntlets.", "requires": ["Quest Family Crest", "Fishing 76", "Cooking 80"] },
                { "description": "Mix a Stamina mix on top of the Seers' Village bank.", "requires": ["Herblore 86", "Agility 60"] },
                { "description": "Smith a rune hasta at Otto's Grotto.", "requires": ["Smithing 90"] },
                { "description": "Construct a pyre ship from magic logs (chewed bones must be used).", "requires": ["Firemaking 85", "Crafting 85"] },
                { "description": "Teleport to Catherby", "requires": ["Quest Lunar Diplomacy", "Magic 87"] }
            ]
        }
    }, // End of Kandarin
    "karamja": {
        name: "Karamja Diary",
        tasks: {
            easy: [
                { "description": "Pick 5 bananas from the plantation located east of the volcano.", "requires": [] },
                { "description": "Use the rope swing to travel to the Moss Giant Island north-west of Karamja.", "requires": ["Agility 10"] },
                { "description": "Mine some gold from the rocks on the north-west peninsula of Karamja.", "requires": ["Mining 40"] },
                { "description": "Travel to Port Sarim via the dock, east of Musa Point.", "requires": [] },
                { "description": "Travel to Ardougne via the port near Brimhaven.", "requires": [] },
                { "description": "Explore Cairn Isle to the west of Karamja.", "requires": ["Agility 15"] },
                { "description": "Use the fishing spots north of the banana plantation (any one of them).", "requires": [] },
                { "description": "Collect 5 seaweed from anywhere on Karamja.", "requires": [] },
                { "description": "Attempt the TzHaar Fight Pits or Fight Cave.", "requires": [] },
                { "description": "Kill a jogre in the Pothole Dungeon.", "requires": [] }
            ],
            medium: [
                { "description": "Claim a ticket from the Agility arena in Brimhaven.", "requires": [] },
                { "description": "Discover hidden wall in the dungeon below the volcano.", "requires": ["Quest Dragon Slayer I"] },
                { "description": "Visit the Isle of Crandor via the dungeon below the volcano.", "requires": ["Quest Dragon Slayer I"] },
                { "description": "Use Vigroy and Hajedy's cart service.", "requires": ["Quest Shilo Village"] },
                { "description": "Earn 100% favour in the Tai Bwo Wannai Cleanup minigame.", "requires": ["Quest Jungle Potion", "Woodcutting 10"] },
                { "description": "Cook a Spider on stick.", "requires": ["Cooking 16"] },
                { "description": "Charter the Lady of the Waves from south of Cairn Isle to Port Khazard", "requires": ["Quest Shilo Village"] },
                { "description": "Cut a log from a teak tree.", "requires": ["Quest Jungle Potion", "Woodcutting 35"] },
                { "description": "Cut a log from a mahogany tree.", "requires": ["Quest Jungle Potion", "Woodcutting 50"] },
                { "description": "Catch a karambwan.", "requires": ["Quest Tai Bwo Wannai Trio", "Fishing 65"] },
                { "description": "Exchange gems for a machete.", "requires": ["Quest Jungle Potion"] },
                { "description": "Use the gnome glider to travel to Karamja.", "requires": ["Quest The Grand Tree"] },
                { "description": "Grow a healthy fruit tree in the patch near Brimhaven.", "requires": ["Farming 27"] },
                { "description": "Trap a Horned Graahk.", "requires": ["Hunter 41"] },
                { "description": "Chop the vines to gain deeper access to Brimhaven Dungeon.", "requires": ["Woodcutting 10"] },
                { "description": "Cross the lava using the stepping stones within Brimhaven Dungeon (south-west of pipe squeeze with moss giants).", "requires": ["Woodcutting 10?", "Agility 12"] },
                { "description": "Climb the stairs within Brimhaven Dungeon.", "requires": ["Woodcutting 10?"] },
                { "description": "Charter a ship from the shipyard in the far east of Karamja.", "requires": ["Quest The Grand Tree"] },
                { "description": "Mine a red topaz from a gem rock.", "requires": ["Quest Jungle Potion", "Mining 40"] }
            ],
            hard: [
                { "description": "Become the champion of the Fight Pit.", "requires": [] },
                { "description": "Kill a Ket-Zek in the Fight Caves.", "requires": [] },
                { "description": "Eat an oomlie wrap.", "requires": ["Cooking 50"] },
                { "description": "Craft some nature runes from Essence.", "requires": ["Runecraft 44"] },
                { "description": "Cook a raw karambwan thoroughly.", "requires": ["Quest Tai Bwo Wannai Trio", "Cooking 30"] },
                { "description": "Kill a death wing in the dungeon under the Kharazi Jungle.", "requires": ["Quest Legends' Quest"] },
                { "description": "Use the crossbow shortcut south of the volcano.", "requires": ["Agility 53", "Ranged 42", "Strength 21"] },
                { "description": "Collect 5 palm leaves.", "requires": ["Quest Legends' Quest"] },
                { "description": "Be assigned a Slayer task by the Slayer Master in Shilo Village.", "requires": ["Quest Shilo Village", "100 Combat level", "Slayer 50"] },
                { "description": "Kill a metal dragon in Brimhaven Dungeon.", "requires": ["Woodcutting 10?"] }
            ],
            elite: [
                { "description": "Craft 56 nature runes simultaneously from Essence without the use of Extracts.", "requires": ["Runecraft 91"] },
                { "description": "Equip a fire cape or infernal cape in the TzHaar City.", "requires": [] },
                { "description": "Check the health of a palm tree in Brimhaven.", "requires": ["Farming 68"] },
                { "description": "Create an antivenom potion whilst standing in the horse shoe mine.", "requires": ["Herblore 87"] },
                { "description": "Check the health of your Calquat tree patch.", "requires": ["Farming 72"] }
            ]
        }
    }, // End of Karamja
    "kourend": {
        name: "Kourend & Kebos Diary",
        tasks: {
            easy: [
                { "description": "Mine some iron ore at the Mount Karuulm mine.", "requires": ["Mining 15"] },
                { "description": "Kill a Sand Crab.", "requires": [] },
                { "description": "Hand in a book at the Arceuus Library.", "requires": [] },
                { "description": "Steal from a Hosidius Fruit Stall.", "requires": ["Thieving 25"] },
                { "description": "Browse the Warrens General Store.", "requires": [] },
                { "description": "Take a boat to Land's End.", "requires": [] },
                { "description": "Pray at the altar on the top floor of the Kourend Castle.", "requires": [] },
                { "description": "Dig up some saltpetre (south-west of Hosidius).", "requires": [] },
                { "description": "Enter your player-owned house from Hosidius.", "requires": ["Construction 25"] },
                { "description": "Do a lap of either tier of the Shayzien Agility Course.", "requires": ["Agility 1"] },
                { "description": "Create a strength potion in the Lovakengj pub.", "requires": ["Quest Druidic Ritual", "Herblore 12"] },
                { "description": "Fish a Trout from the River Molch (south-east of the Farming Guild).", "requires": ["Fishing 20"] }
            ],
            medium: [
                { "description": "Travel to the fairy ring south of Mount Karuulm (CIR).", "requires": ["Quest Started Fairytale II - Cure a Queen"] },
                { "description": "Kill a lizardman.", "requires": [] },
                { "description": "Use Kharedst's memoirs to teleport to all five cities in Great Kourend.", "requires": ["Quest The Depths of Despair", "Quest The Queen of Thieves", "Quest Tale of the Righteous", "Quest The Forsaken Tower", "Quest The Ascent of Arceuus"] },
                { "description": "Mine some volcanic sulphur.", "requires": ["Mining 42"] },
                { "description": "Enter the Farming Guild (by walking through the main entrance).", "requires": ["Farming 45"] },
                { "description": "Switch to the Arceuus Spellbook at Tyss.", "requires": [] },
                { "description": "Repair a crane within Port Piscarilius.", "requires": ["Crafting 30", "Construction 30"] },
                { "description": "Deliver some intelligence to Captain Ginea.", "requires": [] },
                { "description": "Catch a Bluegill on Lake Molch.", "requires": ["Fishing 43", "Hunter 35"] },
                { "description": "Use the boulder leap shortcut in the dense essence mine (north-east by the bright crystals).", "requires": ["Agility 49"] },
                { "description": "Subdue the Wintertodt (earn at least 500 points).", "requires": ["Firemaking 50"] },
                { "description": "Catch a chinchompa in the Kourend Woodland.", "requires": ["Quest Eagles' Peak", "Hunter 53"] },
                { "description": "Chop some mahogany logs north of the Farming Guild.", "requires": ["Woodcutting 50"] }
            ],
            hard: [
                { "description": "Enter the Woodcutting Guild.", "requires": ["Woodcutting 60"] },
                { "description": "Smelt an adamantite bar in The Forsaken Tower.", "requires": ["Quest The Forsaken Tower", "Smithing 70"] },
                { "description": "Kill a lizardman shaman in the Lizardman Temple.", "requires": [] },
                { "description": "Mine some Lovakite ore.", "requires": ["Mining 65"] },
                { "description": "Plant some Logavano seeds at the Tithe Farm.", "requires": ["Farming 74"] },
                { "description": "Kill a zombie in the Shayzien Crypts.", "requires": [] },
                { "description": "Teleport to Xeric's Heart using Xeric's talisman.", "requires": [] },
                { "description": "Deliver an artefact to Captain Khaled.", "requires": ["Thieving 49"] },
                { "description": "Kill a wyrm in the Karuulm Slayer Dungeon.", "requires": ["Slayer 62"] },
                { "description": "Cast Monster Examine on a mountain troll south of Mount Quidamortem.", "requires": ["Quest Dream Mentor", "Magic 66"] }
            ],
            elite: [
                { "description": "Craft one or more Blood runes from Dark essence fragments.", "requires": ["Runecraft 77", "Mining 38", "Crafting 38"] },
                { "description": "Chop some redwood logs.", "requires": ["Woodcutting 90"] },
                { "description": "Defeat Skotizo in the Catacombs of Kourend.", "requires": [] },
                { "description": "Catch an anglerfish and cook it whilst in Great Kourend.", "requires": ["Fishing 82", "Cooking 84"] },
                { "description": "Kill a hydra in the Karuulm Slayer Dungeon.", "requires": ["Slayer 95"] },
                { "description": "Create an Ape Atoll teleport tablet.", "requires": ["Magic 90"] },
                { "description": "Complete a raid in the Chambers of Xeric.", "requires": [] },
                { "description": "Create your own battlestaff from scratch within the Farming Guild.", "requires": ["Farming 85", "Fletching 40"] }
            ]
        }
    }, // End of Kourend
    "lumbridge": { // The one we completed properly
        name: "Lumbridge & Draynor Diary",
        tasks: {
            easy: [
                 { "description": "Complete a lap of the Draynor Village Rooftop Course.", "requires": ["Agility 10"] },
                 { "description": "Slay a cave bug in the Lumbridge Swamp Caves.", "requires": ["Slayer 7"] },
                 { "description": "Have Archmage Sedridor teleport you to the Rune essence mine.", "requires": ["Quest Rune Mysteries"] },
                 { "description": "Craft some water runes from Essence.", "requires": ["Runecraft 5"] },
                 { "description": "Learn your age from Hans in Lumbridge.", "requires": [] },
                 { "description": "Pickpocket a man or woman in Lumbridge.", "requires": [] },
                 { "description": "Chop and burn some oak logs in Lumbridge.", "requires": ["Woodcutting 15", "Firemaking 15"] },
                 { "description": "Kill a zombie in the Draynor Sewers.", "requires": [] },
                 { "description": "Catch some anchovies in Al-Kharid.", "requires": ["Fishing 15"] },
                 { "description": "Bake some bread on the Lumbridge castle kitchen range.", "requires": ["Quest Cook's Assistant"] },
                 { "description": "Mine some iron ore at the Al-Kharid mine.", "requires": ["Mining 15"] },
                 { "description": "Enter the H.A.M. Hideout.", "requires": [] }
            ],
            medium: [
                { "description": "Complete a lap of the Al Kharid Rooftop Course.", "requires": ["Agility 20"] },
                { "description": "Grapple across the River Lum.", "requires": ["Agility 8", "Strength 19", "Ranged 37"] }, // Corrected Agility
                { "description": "Purchase an upgraded device from Ava.", "requires": ["Quest Animal Magnetism", "Ranged 50"] },
                { "description": "Travel to the Wizards' Tower by Fairy ring (DIS).", "requires": ["Quest Started Fairytale II - Cure a Queen"] },
                { "description": "Cast the Lumbridge Teleport spell.", "requires": ["Magic 31"] },
                { "description": "Catch some salmon in Lumbridge.", "requires": ["Fishing 30"] },
                { "description": "Craft a coif (not cowl) in the Lumbridge cow pen.", "requires": ["Crafting 38"] },
                { "description": "Chop some willow logs in Draynor Village.", "requires": ["Woodcutting 30"] },
                { "description": "Pickpocket Martin the Master Gardener.", "requires": ["Thieving 38"] },
                { "description": "Get a Slayer task from Chaeldar.", "requires": ["Quest Lost City", "70 Combat level"] },
                { "description": "Catch an essence or eclectic impling in Puro-Puro.", "requires": ["Hunter 42"] },
                { "description": "Craft some Lava runes at the fire altar in Al Kharid.", "requires": ["Runecraft 23"] }
            ],
            hard: [
                { "description": "Cast Bones to Peaches in Al Kharid Palace.", "requires": ["Quest Mage Training Arena miniquest", "Magic 60"] },
                { "description": "Squeeze past the jutting wall on your way to the Cosmic Altar.", "requires": ["Quest Lost City", "Agility 46"] }, // Corrected Agility
                { "description": "Craft 56 Cosmic runes simultaneously from Essence without the use of Extracts.", "requires": ["Quest Lost City", "Runecraft 59"] },
                { "description": "Travel from Lumbridge to Edgeville on a waka canoe.", "requires": ["Woodcutting 57"] },
                { "description": "Collect at least 100 Tears of Guthix in one visit.", "requires": ["Quest Tears of Guthix", "150 Quest Points"] },
                { "description": "Take the train from Dorgesh-Kaan to Keldagrim.", "requires": ["Quest Another Slice of H.A.M."] },
                { "description": "Purchase some Barrows gloves from the Culinaromancer's Chest.", "requires": ["Quest Recipe for Disaster"] },
                { "description": "Pick some belladonna from the farming patch at Draynor Manor.", "requires": ["Farming 63"] },
                { "description": "Light your mining helmet in the Lumbridge Castle basement.", "requires": ["Firemaking 65"] },
                { "description": "Recharge your prayer at Emir's Arena with Smite activated.", "requires": ["Prayer 52"] },
                { "description": "Craft, string and enchant an amulet of power in Lumbridge (not upstairs in castle).", "requires": ["Crafting 70", "Magic 57"] }
            ],
            elite: [
                { "description": "Steal from a Dorgesh-Kaan rich chest.", "requires": ["Quest Death to the Dorgeshuun", "Thieving 78"] },
                { "description": "Grapple across a pylon on the Dorgesh-Kaan Agility Course.", "requires": ["Quest Death to the Dorgeshuun", "Agility 70", "Ranged 70", "Strength 70"] }, // Corrected Agility
                { "description": "Chop some magic logs at the Mage Training Arena.", "requires": ["Woodcutting 75"] },
                { "description": "Smith an adamant platebody down in Draynor Sewer.", "requires": ["Smithing 88"] },
                { "description": "Craft 140 or more Water runes simultaneously from Essence without the use of Extracts.", "requires": ["Runecraft 76"] },
                { "description": "Perform the Quest point cape emote in the Wise Old Man's house.", "requires": ["Quest All Quests"] }
            ]
        }
    },
    "morytania": {
        name: "Morytania Diary",
        tasks: {
            easy: [
                { "description": "Craft any snelm from scratch in Morytania.", "requires": ["Crafting 15"] },
                { "description": "Cook a thin snail on the Port Phasmatys range.", "requires": ["Cooking 12"] },
                { "description": "Get a Slayer task from Mazchna.", "requires": ["20 Combat level"] },
                { "description": "Kill a banshee in the Slayer Tower.", "requires": ["Slayer 15"] },
                { "description": "Have Sbott tan something for you.", "requires": [] },
                { "description": "Enter Mort Myre Swamp.", "requires": ["Quest Nature Spirit"] },
                { "description": "Kill a ghoul.", "requires": [] },
                { "description": "Place a Scarecrow in the Morytania flower patch.", "requires": ["Farming 23"] },
                { "description": "Offer some Bonemeal at the Ectofuntus.", "requires": [] },
                { "description": "Kill a Werewolf in its human form using the Wolfbane dagger.", "requires": ["Quest Priest in Peril"] },
                { "description": "Restore your prayer points at the altar of nature.", "requires": ["Quest Nature Spirit"] }
            ],
            medium: [
                { "description": "Catch a swamp lizard.", "requires": ["Hunter 29"] },
                { "description": "Complete a lap of the Canifis agility course.", "requires": ["Agility 40"] },
                { "description": "Obtain some Bark from a Hollow tree.", "requires": ["Woodcutting 45"] },
                { "description": "Travel to Dragontooth Isle.", "requires": ["Quest Ghosts Ahoy?"] },
                { "description": "Kill a Terror Dog.", "requires": ["Quest Lair of Tarn Razorlor", "Slayer 40"] },
                { "description": "Complete a game of trouble brewing.", "requires": ["Quest Cabin Fever", "Cooking 40"] },
                { "description": "Board the Swampy boat at the Hollows.", "requires": ["Quest Nature Spirit"] },
                { "description": "Make a batch of cannonballs at the Port Phasmatys furnace.", "requires": ["Quest Dwarf Cannon", "Smithing 35"] },
                { "description": "Kill a Fever Spider on Braindeath Island.", "requires": ["Quest Rum Deal", "Slayer 42"] },
                { "description": "Use an ectophial to return to Port Phasmatys.", "requires": ["Quest Ghosts Ahoy"] },
                { "description": "Mix a Guthix Balance potion while in Morytania.", "requires": ["Quest In Aid of the Myreque", "Herblore 22"] }
            ],
            hard: [
                { "description": "Enter the Kharyrll portal in your POH.", "requires": ["Quest Desert Treasure I", "Magic 66", "Construction 50"] },
                { "description": "Climb the advanced spike chain within Slayer Tower.", "requires": ["Agility 71"] },
                { "description": "Harvest some Watermelon from the allotment patch on Harmony Island.", "requires": ["Quest The Great Brain Robbery", "Farming 47"] },
                { "description": "Chop and burn some mahogany logs on Mos Le'Harmless.", "requires": ["Quest Cabin Fever", "Woodcutting 50", "Firemaking 50"] },
                { "description": "Complete a temple trek with a hard companion.", "requires": ["Quest In Aid of the Myreque"] },
                { "description": "Kill a Cave Horror.", "requires": ["Quest Cabin Fever", "Slayer 58"] },
                { "description": "Harvest some Bittercap Mushrooms from the patch in Canifis.", "requires": ["Farming 53"] },
                { "description": "Pray at the Altar of Nature with Piety activated.", "requires": ["Quest Nature Spirit", "Quest King's Ransom?", "Prayer 70", "Defence 70"] },
                { "description": "Use the shortcut to get to the bridge over the Salve. Note: Only counts when going downwards.", "requires": ["Agility 65"] },
                { "description": "Mine some mithril ore in the Abandoned Mine.", "requires": ["Quest Haunted Mine", "Mining 55"] }
            ],
            elite: [
                { "description": "Catch a shark in Burgh de Rott with your bare hands.", "requires": ["Quest In Aid of the Myreque", "Fishing 96", "Strength 76"] },
                { "description": "Cremate any Shade remains on a Magic or Redwood pyre.", "requires": ["Quest Shades of Mort'ton", "Firemaking 80"] },
                { "description": "Fertilize the Morytania herb patch using Lunar Magic.", "requires": ["Quest Lunar Diplomacy", "Magic 83", "Farming?"] },
                { "description": "Craft a Black dragonhide body in the Canifis bank.", "requires": ["Crafting 84"] },
                { "description": "Kill an Abyssal demon in the Slayer Tower.", "requires": ["Slayer 85"] },
                { "description": "Loot the Barrows chest while wearing any complete barrows set.", "requires": ["Defence 70"] }
            ]
        }
    }, // End of Morytania
    "varrock": {
        name: "Varrock Diary",
        tasks: {
            easy: [
                { "description": "Browse Thessalia's store.", "requires": [] },
                { "description": "Have Aubury teleport you to the Essence mine (right-click to Teleport).", "requires": ["Quest Rune Mysteries"] },
                { "description": "Mine some iron in the south-east Varrock mine.", "requires": ["Mining 15"] },
                { "description": "Make a normal plank at the Sawmill.", "requires": [] },
                { "description": "Enter the second level of the Stronghold of Security.", "requires": [] },
                { "description": "Jump over the fence south of Varrock.", "requires": ["Agility 13"] },
                { "description": "Chop down a dying tree in the Lumber Yard.", "requires": [] },
                { "description": "Buy a newspaper.", "requires": [] },
                { "description": "Give a dog a bone!", "requires": [] },
                { "description": "Spin a bowl on the pottery wheel and fire it in the oven in Barbarian Village.", "requires": ["Crafting 8"] },
                { "description": "Speak to Haig Halen after obtaining at least 50 Kudos.", "requires": ["50 Kudos"] },
                { "description": "Craft some Earth runes from Essence.", "requires": ["Runecraft 9"] },
                { "description": "Catch some trout in the River Lum at Barbarian Village.", "requires": ["Fishing 20"] },
                { "description": "Steal from the tea stall in Varrock.", "requires": ["Thieving 5"] }
            ],
            medium: [
                { "description": "Have the Apothecary in Varrock make you a Strength potion.", "requires": [] },
                { "description": "Enter the Champions' Guild.", "requires": ["32 Quest Points"] },
                { "description": "Select a colour for your kitten.", "requires": ["Quest Gertrude's Cat", "Quest Garden of Tranquillity"] },
                { "description": "Use the Spirit tree in the north-eastern corner of Grand Exchange.", "requires": ["Quest Tree Gnome Village"] },
                { "description": "Perform the 4 emotes from the Stronghold of Security.", "requires": [] },
                { "description": "Enter the Tolna dungeon after completing A Soul's Bane.", "requires": ["Quest A Soul's Bane"] },
                { "description": "Teleport to the digsite using a Digsite pendant.", "requires": ["Quest The Dig Site"] },
                { "description": "Cast the teleport to Varrock spell.", "requires": ["Magic 25"] },
                { "description": "Get a Slayer task from Vannaka.", "requires": ["40 Combat level"] },
                { "description": "Make 20 mahogany planks in one go (at the Lumber Yard).", "requires": [] },
                { "description": "Pick a white tree fruit.", "requires": ["Quest Garden of Tranquillity", "Farming 25"] },
                { "description": "Use the balloon to travel from Varrock.", "requires": ["Quest Enlightened Journey", "Farming 30", "Firemaking 40"] },
                { "description": "Complete a lap of the Varrock Rooftop Course.", "requires": ["Agility 30"] }
            ],
            hard: [
                { "description": "Trade furs with the Fancy Dress Seller for a Spottier cape and equip it.", "requires": ["Hunter 66"] },
                { "description": "Speak to Orlando Smith when you have achieved 153 Kudos.", "requires": ["153 Kudos"] },
                { "description": "Make a Waka canoe near Edgeville.", "requires": ["Woodcutting 57"] },
                { "description": "Teleport to Paddewwa.", "requires": ["Quest Desert Treasure I", "Magic 54"] },
                { "description": "Teleport to Barbarian Village with a Skull sceptre.", "requires": [] },
                { "description": "Chop some yew logs in Varrock and burn them at the top of the Varrock church.", "requires": ["Woodcutting 60", "Firemaking 60"] },
                { "description": "Have the Varrock estate agent decorate your house with Fancy Stone (complete the dialogue).", "requires": ["Construction 50"] },
                { "description": "Collect at least 2 yew roots from the tree patch in Varrock Palace.", "requires": ["Farming 68", "Woodcutting 60"] },
                { "description": "Pray at the altar in Varrock Palace (2nd floor[US]) with Smite active.", "requires": ["Prayer 52"] },
                { "description": "Squeeze through the obstacle pipe in Edgeville Dungeon.", "requires": ["Agility 51"] }
            ],
            elite: [
                { "description": "Create a Super combat potion in Varrock West Bank.", "requires": ["Quest Druidic Ritual?", "Herblore 90"] },
                { "description": "Use Lunar magic to make 20 mahogany planks in the Varrock Lumber Yard (inside the fences).", "requires": ["Quest Dream Mentor", "Magic 86"] },
                { "description": "Bake a summer pie in the Cooking Guild.", "requires": ["Cooking 95"] },
                { "description": "Smith and fletch ten rune darts within Varrock.", "requires": ["Quest The Tourist Trap", "Smithing 89", "Fletching 81"] },
                { "description": "Craft 100 or more earth runes simultaneously from Essence without the use of Extracts.", "requires": ["Runecraft 78"] }
            ]
        }
    }, // End of Varrock
    "western": {
        name: "Western Provinces Diary",
        tasks: {
            easy: [
                { "description": "Catch a copper longtail (south of fairy ring AKQ).", "requires": ["Hunter 9"] },
                { "description": "Complete a novice game of Pest Control.", "requires": ["40 Combat level"] },
                { "description": "Mine some iron ore near Piscatoris (north-east of fairy ring AKQ).", "requires": ["Mining 15"] },
                { "description": "Complete a lap of the Gnome Agility Course.", "requires": [] },
                { "description": "Score a goal in a Gnome Ball match.", "requires": [] },
                { "description": "Claim any Chompy bird hat from Rantz.", "requires": ["Quest Big Chompy Bird Hunting"] },
                { "description": "Teleport to Pest Control using the Minigame teleports.", "requires": ["40 Combat level"] },
                { "description": "Collect a swamp toad at the Gnome Stronghold (from the north swamp pen).", "requires": [] },
                { "description": "Have Brimstail teleport you to the Essence mine (right-click him to Teleport).", "requires": ["Quest Rune Mysteries"] },
                { "description": "Fletch an oak shortbow in the Gnome Stronghold (oak tree just north of the bank by Nieve/Steve).", "requires": ["Fletching 20"] },
                { "description": "Kill a terrorbird in the terrorbird enclosure.", "requires": [] }
            ],
            medium: [
                { "description": "Take the agility shortcut from the Grand Tree to Otto's Grotto.", "requires": ["Quest Tree Gnome Village", "Quest The Grand Tree", "Agility 37"] },
                { "description": "Travel to the Gnome Stronghold by Spirit tree.", "requires": ["Quest Tree Gnome Village"] },
                { "description": "Trap a Spined larupia (south of fairy ring AKS).", "requires": ["Hunter 31"] },
                { "description": "Fish some Raw bass on Ape Atoll.", "requires": ["Quest Monkey Madness I", "Fishing 46"] },
                { "description": "Chop and burn some teak logs on Ape Atoll.", "requires": ["Quest Monkey Madness I", "Woodcutting 35", "Firemaking 35"] },
                { "description": "Complete an intermediate game of Pest Control.", "requires": ["70 Combat level"] },
                { "description": "Travel to the Feldip Hills by Gnome glider.", "requires": ["Quest The Grand Tree", "Quest One Small Favour"] },
                { "description": "Claim a Chompy bird hat from Rantz after registering at least 125 kills.", "requires": ["Quest Big Chompy Bird Hunting"] },
                { "description": "Travel from Eagles' Peak to the Feldip Hills by Eagle.", "requires": ["Quest Eagles' Peak"] },
                { "description": "Make a Chocolate bomb at the Grand Tree.", "requires": ["Cooking 42"] },
                { "description": "Complete a delivery for the Gnome Restaurant.", "requires": ["Cooking 29?"] },
                { "description": "Turn your crystal saw seed into a crystal saw (must enchant it yourself with the singing bowl).", "requires": ["Quest The Eyes of Glouphrie"] },
                { "description": "Mine some gold ore underneath the Grand Tree.", "requires": ["Quest The Grand Tree", "Mining 40"] }
            ],
            hard: [
                { "description": "Kill an elf with a crystal bow.", "requires": ["Quest Roving Elves", "Ranged 70"] },
                { "description": "Catch and cook a monkfish in the Piscatoris Fishing Colony.", "requires": ["Quest Swan Song", "Fishing 62", "Cooking 62"] },
                { "description": "Complete a veteran game of Pest Control.", "requires": ["100 Combat level"] },
                { "description": "Catch a dashing kebbit.", "requires": ["Hunter 69"] },
                { "description": "Complete a lap of the Ape Atoll Agility Course.", "requires": ["Quest Monkey Madness I", "Agility 48"] },
                { "description": "Chop and burn some mahogany logs on Ape Atoll.", "requires": ["Quest Monkey Madness I", "Woodcutting 50", "Firemaking 50"] },
                { "description": "Mine some adamantite ore in Tirannwn.", "requires": ["Quest Started Regicide", "Mining 70"] },
                { "description": "Check the health of your palm tree in Lletya.", "requires": ["Quest Started Mourning's End Part I", "Farming 68"] },
                { "description": "Claim a Chompy bird hat from Rantz after registering at least 300 kills.", "requires": ["Quest Big Chompy Bird Hunting"] },
                { "description": "Build an Isafdar painting in your POH Quest Hall.", "requires": ["Quest Roving Elves", "Construction 65"] },
                { "description": "Kill Zulrah.", "requires": ["Quest Started Regicide"] },
                { "description": "Teleport to Ape Atoll.", "requires": ["Quest Recipe for Disaster (Awowogei)", "Magic 64"] },
                { "description": "Pickpocket a gnome.", "requires": ["Thieving 75"] }
            ],
            elite: [
                { "description": "Fletch a magic longbow in Tirannwn.", "requires": ["Quest Started Regicide", "Fletching 85"] },
                { "description": "Kill the Thermonuclear smoke devil.", "requires": ["Slayer 93"] },
                { "description": "Have Prissy Scilla protect your magic tree.", "requires": ["Farming 75"] },
                { "description": "Use the Elven overpass advanced cliffside shortcut.", "requires": ["Quest Underground Pass", "Agility 85"] },
                { "description": "Equip any complete void set.", "requires": ["40 Combat level", "Prayer 22", "Attack 42", "Strength 42", "Defence 42", "Hitpoints 42", "Ranged 42", "Magic 42"] },
                { "description": "Claim a Chompy bird hat from Rantz after registering at least 1,000 kills.", "requires": ["Quest Big Chompy Bird Hunting"] },
                { "description": "Pickpocket an elf.", "requires": ["Quest Started Mourning's End Part I", "Thieving 85"] }
            ]
        }
    }, // End of Western Provinces
    "wilderness": {
        name: "Wilderness Diary",
        tasks: {
            easy: [
                { "description": "Cast Low Alchemy at the Fountain of Rune.", "requires": ["Magic 21"] },
                { "description": "Enter the Wilderness from the Ardougne or Edgeville lever.", "requires": [] },
                { "description": "Pray at the Chaos Altar in level 38, western Wilderness.", "requires": [] },
                { "description": "Enter the Chaos Runecrafting temple (entering through the Tunnel of Chaos or Guardians of the Rift will not complete the task).", "requires": [] },
                { "description": "Kill a mammoth (south-east of the Ferox Enclave).", "requires": [] },
                { "description": "Kill an earth warrior in the Wilderness beneath Edgeville.", "requires": ["Agility 15"] },
                { "description": "Restore some Prayer points at the Demonic Ruins.", "requires": [] },
                { "description": "Enter the King Black Dragon Lair.", "requires": [] },
                { "description": "Collect 5 red spider's eggs from the Wilderness (can be found in the northern part of the Edgeville Dungeon).", "requires": [] },
                { "description": "Mine some iron ore in the Wilderness.", "requires": ["Mining 15"] },
                { "description": "Have the Mage of Zamorak teleport you to the Abyss.", "requires": ["Quest Enter the Abyss"] },
                { "description": "Equip any team cape in the Wilderness (entering the Wilderness with one already equipped does not count).", "requires": [] }
            ],
            medium: [
                { "description": "Mine some mithril ore in the Wilderness.", "requires": ["Mining 55"] },
                { "description": "Chop some yew logs from an ent (must be within the Wilderness).", "requires": ["Woodcutting 61"] },
                { "description": "Enter the Wilderness God Wars Dungeon.", "requires": ["Agility 60 or Strength 60"] },
                { "description": "Complete a lap of the Wilderness Agility Course.", "requires": ["Agility 52"] },
                { "description": "Kill a green dragon (must be within the Wilderness).", "requires": [] },
                { "description": "Kill an ankou in the Wilderness.", "requires": [] },
                { "description": "Charge an earth orb.", "requires": ["Magic 60"] },
                { "description": "Kill a bloodveld in the Wilderness God Wars Dungeon.", "requires": ["Slayer 50"] },
                { "description": "Talk to the Emblem Trader in Edgeville about emblems.", "requires": [] },
                { "description": "Smith a Gold helmet in the Resource Area.", "requires": ["Quest Between a Rock...", "Smithing 50"] },
                { "description": "Open the muddy chest in the Lava Maze.", "requires": [] }
            ],
            hard: [
                { "description": "Cast any of the three God spells against another player in the Wilderness (splashing does not count).", "requires": ["Quest Mage Arena I", "Magic 60?"] },
                { "description": "Charge an air orb.", "requires": ["Magic 66"] },
                { "description": "Catch a black salamander.", "requires": ["Hunter 67"] },
                { "description": "Smith an adamant scimitar in the Resource Area.", "requires": ["Smithing 75"] },
                { "description": "Kill a lava dragon on Lava Dragon Isle.", "requires": [] },
                { "description": "Kill the Chaos Elemental.", "requires": [] },
                { "description": "Kill the Crazy archaeologist, Chaos Fanatic & Scorpia.", "requires": [] },
                { "description": "Take the Agility shortcut from Trollheim into the Wilderness.", "requires": ["Agility 64", "Quest Troll Stronghold?"] },
                { "description": "Kill a spiritual warrior in the Wilderness God Wars Dungeon.", "requires": ["Slayer 68"] },
                { "description": "Fish some raw lava eel in the Wilderness.", "requires": ["Fishing 53", "Herblore 25?"] }
            ],
            elite: [
                { "description": "Kill Callisto, Venenatis, and Vet'ion.", "requires": [] },
                { "description": "Teleport to Ghorrock.", "requires": ["Quest Desert Treasure I", "Magic 96"] },
                { "description": "Fish and cook a dark crab in the Resource Area.", "requires": ["Fishing 85", "Cooking 90"] },
                { "description": "Smith a rune scimitar from scratch in the Resource Area.", "requires": ["Mining 85", "Smithing 90"] },
                { "description": "Steal from the Rogues' castle chest.", "requires": ["Thieving 84"] },
                { "description": "Kill a spiritual mage inside the Wilderness God Wars Dungeon.", "requires": ["Slayer 83", "Agility 60 or Strength 60"] },
                { "description": "Cut and burn some magic logs in the Resource Area.", "requires": ["Woodcutting 75", "Firemaking 75"] }
            ]
        }
    } // End of Wilderness
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

export const combatAchievementTiers = ["easy", "medium", "hard", "elite", "master", "grandmaster"];
export const combatAchievementTypes = ["Kill Count", "Mechanical", "Perfection", "Restriction", "Speed", "Stamina"];
export const combatAchievementPointsMap = { 1: "easy", 2: "medium", 3: "hard", 4: "elite", 5: "master", 6: "grandmaster" };

export const combatAchievementsData = {
    "aberrant_spectre": {
        "name": "Aberrant Spectre",
        "tasks": [
            {
                "name": "Noxious Foe",
                "description": "Kill an Aberrant Spectre.",
                "boss": "Aberrant Spectre",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Noxious%20Foe",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "barrows": {
        "name": "Barrows",
        "tasks": [
            {
                "name": "Faithless Crypt Run",
                "description": "Kill all six Barrows Brothers and loot the Barrows chest without ever having more than 0 prayer points.",
                "boss": "Barrows",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Faithless%20Crypt%20Run",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Just Like That",
                "description": "Kill Karil using only damage dealt by special attacks.",
                "boss": "Barrows",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Just%20Like%20That",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Barrows Champion",
                "description": "Open the Barrows chest 25 times.",
                "boss": "Barrows",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Barrows%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Can't Touch Me",
                "description": "Kill Dharok, Verac, Torag and Guthan without letting them attack you with melee.",
                "boss": "Barrows",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%27t%20Touch%20Me",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Pray for Success",
                "description": "Kill all six Barrows Brothers and loot the Barrows chest without taking any damage from any of the brothers.",
                "boss": "Barrows",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Pray%20for%20Success",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Barrows Novice",
                "description": "Open the Barrows chest 10 times.",
                "boss": "Barrows",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Barrows%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Defence? What Defence?",
                "description": "Kill any Barrows Brother using only magical damage.",
                "boss": "Barrows",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Defence%3F%20What%20Defence%3F",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "black_dragon": {
        "name": "Black Dragon",
        "tasks": [
            {
                "name": "Big, Black and Fiery",
                "description": "Kill a Black Dragon.",
                "boss": "Black Dragon",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Big%2C%20Black%20and%20Fiery",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "bloodveld": {
        "name": "Bloodveld",
        "tasks": [
            {
                "name": "The Demonic Punching Bag",
                "description": "Kill a Bloodveld.",
                "boss": "Bloodveld",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Demonic%20Punching%20Bag",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "bryophyta": {
        "name": "Bryophyta",
        "tasks": [
            {
                "name": "Bryophyta Champion",
                "description": "Kill Bryophyta 5 times.",
                "boss": "Bryophyta",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Bryophyta%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Quick Cutter",
                "description": "Kill all 3 of Bryophyta's growthlings within 3 seconds of the first one dying.",
                "boss": "Bryophyta",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Quick%20Cutter",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "A Slow Death",
                "description": "Kill Bryophyta with either poison or venom being the final source of damage.",
                "boss": "Bryophyta",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Slow%20Death",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Bryophyta Novice",
                "description": "Kill Bryophyta once.",
                "boss": "Bryophyta",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Bryophyta%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Fighting as Intended II",
                "description": "Kill Bryophyta on a free to play world.",
                "boss": "Bryophyta",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fighting%20as%20Intended%20II",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Preparation Is Key",
                "description": "Kill Bryophyta without suffering any poison damage.",
                "boss": "Bryophyta",
                "type": "Perfection",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Preparation%20Is%20Key",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Protection from Moss",
                "description": "Kill Bryophyta with the Protect from Magic prayer active.",
                "boss": "Bryophyta",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Protection%20from%20Moss",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "deranged_archaeologist": {
        "name": "Deranged Archaeologist",
        "tasks": [
            {
                "name": "Deranged Archaeologist Champion",
                "description": "Kill the Deranged Archaeologist 25 times.",
                "boss": "Deranged Archaeologist",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Deranged%20Archaeologist%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "I'd Rather Be Illiterate",
                "description": "Kill the Deranged Archaeologist without anyone being hit by his \"Learn to Read\" attack.",
                "boss": "Deranged Archaeologist",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%27d%20Rather%20Be%20Illiterate",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Mage of the Swamp",
                "description": "Kill the Deranged Archaeologist with only magical attacks.",
                "boss": "Deranged Archaeologist",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mage%20of%20the%20Swamp",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Deranged Archaeologist Novice",
                "description": "Kill the Deranged Archaeologist 10 times.",
                "boss": "Deranged Archaeologist",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Deranged%20Archaeologist%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "fire_giant": {
        "name": "Fire Giant",
        "tasks": [
            {
                "name": "The Walking Volcano",
                "description": "Kill a Fire Giant.",
                "boss": "Fire Giant",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Walking%20Volcano",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "giant_mole": {
        "name": "Giant Mole",
        "tasks": [
            {
                "name": "Hard Hitter",
                "description": "Kill the Giant Mole with 4 or fewer instances of damage.",
                "boss": "Giant Mole",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hard%20Hitter",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Whack-a-Mole",
                "description": "Kill the Giant Mole within 10 seconds of her resurfacing.",
                "boss": "Giant Mole",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whack-a-Mole",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Why Are You Running?",
                "description": "Kill the Giant Mole without her burrowing more than 2 times.",
                "boss": "Giant Mole",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Why%20Are%20You%20Running%3F",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Avoiding Those Little Arms",
                "description": "Kill the Giant Mole without her damaging anyone.",
                "boss": "Giant Mole",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Avoiding%20Those%20Little%20Arms",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Giant Mole Champion",
                "description": "Kill the Giant mole 25 times.",
                "boss": "Giant Mole",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Giant%20Mole%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Giant Mole Novice",
                "description": "Kill the Giant Mole 10 times.",
                "boss": "Giant Mole",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Giant%20Mole%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "greater_demon": {
        "name": "Greater Demon",
        "tasks": [
            {
                "name": "A Greater Foe",
                "description": "Kill a Greater Demon.",
                "boss": "Greater Demon",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Greater%20Foe",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Not So Great After All",
                "description": "Finish off a Greater Demon with a demonbane weapon.",
                "boss": "Greater Demon",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Not%20So%20Great%20After%20All",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "hellhound": {
        "name": "Hellhound",
        "tasks": [
            {
                "name": "A Demon's Best Friend",
                "description": "Kill a Hellhound.",
                "boss": "Hellhound",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Demon%27s%20Best%20Friend",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "king_black_dragon": {
        "name": "King Black Dragon",
        "tasks": [
            {
                "name": "Who Is the King Now?",
                "description": "Kill The King Black Dragon 10 times in a private instance without leaving the instance.",
                "boss": "King Black Dragon",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Who%20Is%20the%20King%20Now%3F",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Antifire Protection",
                "description": "Kill the King Black Dragon with an antifire potion active and an antidragon shield equipped.",
                "boss": "King Black Dragon",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Antifire%20Protection",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Claw Clipper",
                "description": "Kill the King Black Dragon with the Protect from Melee prayer activated.",
                "boss": "King Black Dragon",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Claw%20Clipper",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Hide Penetration",
                "description": "Kill the King Black Dragon with a stab weapon.",
                "boss": "King Black Dragon",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hide%20Penetration",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "King Black Dragon Champion",
                "description": "Kill the King Black Dragon 25 times.",
                "boss": "King Black Dragon",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/King%20Black%20Dragon%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "King Black Dragon Novice",
                "description": "Kill the King Black Dragon 10 times.",
                "boss": "King Black Dragon",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/King%20Black%20Dragon%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "lizardman_shaman": {
        "name": "Lizardman Shaman",
        "tasks": [
            {
                "name": "A Scaley Encounter",
                "description": "Kill a Lizardman Shaman.",
                "boss": "Lizardman Shaman",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Scaley%20Encounter",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Shayzien Protector",
                "description": "Kill a Lizardman Shaman in Molch which has not dealt damage to anyone. (excluding its Spawns)",
                "boss": "Lizardman Shaman",
                "type": "Perfection",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Shayzien%20Protector",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "n_a": {
        "name": "General/Multiple",
        "tasks": [
            {
                "name": "Sit Back and Relax",
                "description": "Deal 100 damage to creatures using undead thralls.",
                "boss": "N/A",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sit%20Back%20and%20Relax",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Into the Den of Giants",
                "description": "Kill a Hill Giant, Moss Giant and Fire Giant in the Giant Cave within the Shayzien region.",
                "boss": "N/A",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Into%20the%20Den%20of%20Giants",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "obor": {
        "name": "Obor",
        "tasks": [
            {
                "name": "Back to the Wall",
                "description": "Kill Obor without being pushed back more than one square by his knockback attack.",
                "boss": "Obor",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Back%20to%20the%20Wall",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Obor Champion",
                "description": "Kill Obor 5 times.",
                "boss": "Obor",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Obor%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Squashing the Giant",
                "description": "Kill Obor without taking any damage off prayer.",
                "boss": "Obor",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Squashing%20the%20Giant",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Fighting as Intended",
                "description": "Kill Obor on a free to play world.",
                "boss": "Obor",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fighting%20as%20Intended",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Obor Novice",
                "description": "Kill Obor once.",
                "boss": "Obor",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Obor%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Sleeping Giant",
                "description": "Kill Obor whilst he is immobilized.",
                "boss": "Obor",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sleeping%20Giant",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "sarachnis": {
        "name": "Sarachnis",
        "tasks": [
            {
                "name": "Inspect Repellent",
                "description": "Kill Sarachnis without her dealing damage to anyone.",
                "boss": "Sarachnis",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Inspect%20Repellent",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Ready to Pounce",
                "description": "Kill Sarachnis without her using her range attack twice in a row.",
                "boss": "Sarachnis",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ready%20to%20Pounce",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Newspaper Enthusiast",
                "description": "Kill Sarachnis with a crush weapon.",
                "boss": "Sarachnis",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Newspaper%20Enthusiast",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Sarachnis Champion",
                "description": "Kill Sarachnis 25 times.",
                "boss": "Sarachnis",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sarachnis%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Sarachnis Novice",
                "description": "Kill Sarachnis 10 times.",
                "boss": "Sarachnis",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sarachnis%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "scurrius": {
        "name": "Scurrius",
        "tasks": [
            {
                "name": "Efficient Pest Control",
                "description": "Kill 6 Giant Rats within Scurrius' lair in 3 seconds",
                "boss": "Scurrius",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Efficient%20Pest%20Control",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Perfect Scurrius",
                "description": "Kill Scurrius in a private instance without taking damage from the following attacks: Tail Swipe and Falling Bricks. Pray correctly against the following attacks: Flying Fur and Bolt of Electricity.",
                "boss": "Scurrius",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Scurrius",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Scurrius Champion",
                "description": "Kill Scurrius 10 times.",
                "boss": "Scurrius",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Scurrius%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Scurrius Novice",
                "description": "Kill Scurrius once.",
                "boss": "Scurrius",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Scurrius%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Sit Rat",
                "description": "Finish off Scurrius with a ratbane weapon in a private instance.",
                "boss": "Scurrius",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sit%20Rat",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "tempoross": {
        "name": "Tempoross",
        "tasks": [
            {
                "name": "Dress Like You Mean It",
                "description": "Subdue Tempoross while wearing any variation of the angler outfit.",
                "boss": "Tempoross",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dress%20Like%20You%20Mean%20It",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Why Cook?",
                "description": "Subdue Tempoross, getting rewarded with 10 reward permits from a single Tempoross fight.",
                "boss": "Tempoross",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Why%20Cook%3F",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Tempoross Champion",
                "description": "Subdue Tempoross 10 times.",
                "boss": "Tempoross",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tempoross%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "The Lone Angler",
                "description": "Subdue Tempoross alone without getting hit by any fires, torrents or waves.",
                "boss": "Tempoross",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Lone%20Angler",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Calm Before the Storm",
                "description": "Repair either a mast or a totem pole.",
                "boss": "Tempoross",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Calm%20Before%20the%20Storm",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Fire in the Hole!",
                "description": "Attack Tempoross from both sides by loading both cannons on both ships.",
                "boss": "Tempoross",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fire%20in%20the%20Hole%21",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Master of Buckets",
                "description": "Extinguish at least 5 fires during a single Tempoross fight.",
                "boss": "Tempoross",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Master%20of%20Buckets",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Tempoross Novice",
                "description": "Subdue Tempoross 5 times.",
                "boss": "Tempoross",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tempoross%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "wintertodt": {
        "name": "Wintertodt",
        "tasks": [
            {
                "name": "Why Fletch?",
                "description": "Subdue the Wintertodt after earning 3000 or more points.",
                "boss": "Wintertodt",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Why%20Fletch%3F",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Can We Fix It?",
                "description": "Subdue the Wintertodt without allowing all 4 braziers to be broken at the same time.",
                "boss": "Wintertodt",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%20We%20Fix%20It%3F",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Leaving No One Behind",
                "description": "Subdue the Wintertodt without any of the Pyromancers falling.",
                "boss": "Wintertodt",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leaving%20No%20One%20Behind",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Wintertodt Champion",
                "description": "Subdue the Wintertodt 10 times.",
                "boss": "Wintertodt",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Wintertodt%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Cosy",
                "description": "Subdue the Wintertodt with four pieces of warm equipment equipped.",
                "boss": "Wintertodt",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Cosy",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Handyman",
                "description": "Repair a brazier which has been destroyed by the Wintertodt.",
                "boss": "Wintertodt",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Handyman",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Mummy!",
                "description": "Heal a pyromancer after they have fallen.",
                "boss": "Wintertodt",
                "type": "Mechanical",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mummy%21",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Wintertodt Novice",
                "description": "Subdue the Wintertodt 5 times.",
                "boss": "Wintertodt",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Wintertodt%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "wyrm": {
        "name": "Wyrm",
        "tasks": [
            {
                "name": "A Slithery Encounter",
                "description": "Kill a Wyrm.",
                "boss": "Wyrm",
                "type": "Kill Count",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Slithery%20Encounter",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "royal_titans": {
        "name": "Royal Titans",
        "tasks": [
            {
                "name": "No time to pray",
                "description": "Kill the Royal Titans without losing any prayer points.",
                "boss": "Royal Titans",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20time%20to%20pray",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "I need room",
                "description": "Kill the Royal Titans while extinguish all fires and melting all icicles before they dissipate naturally.",
                "boss": "Royal Titans",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20need%20room",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Perfect Royal Titan",
                "description": "Kill the Royal Titans without getting hit by any avoidable damage. This includes: Melee attacks, Explosions from the ice or fire elemental, Icicle or fire spawn damage, and Ice or fire pulse attacks.",
                "boss": "Royal Titans",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Royal%20Titan",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Royal Titan Speed-Runner",
                "description": "Kill the Royal Titans in less than 1:30 minutes.",
                "boss": "Royal Titans",
                "type": "Speed",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Royal%20Titan%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Titan Killer",
                "description": "Kill the Royal Titans 15 times without anyone leaving the instance. If a player joins the fight, the current streak will be reset to 0. If a player leaves the fight, the task will be failed and a new instance will need to be created.",
                "boss": "Royal Titans",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Titan%20Killer",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "It takes too long",
                "description": "Kill both Royal Titans while they are charging up their area attack. Both titans must die during the same charging phase.",
                "boss": "Royal Titans",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/It%20takes%20too%20long",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Royal Titan Adept",
                "description": "Kill the Royal Titans 25 times.",
                "boss": "Royal Titans",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Royal%20Titan%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Royal Titan Champion",
                "description": "Kill the Royal Titans 10 times.",
                "boss": "Royal Titans",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Royal%20Titan%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Elemental Company",
                "description": "Kill the Royal Titans without attacking any elements.",
                "boss": "Royal Titans",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Elemental%20Company",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "Let them fight",
                "description": "Kill the Royal Titans while having the Royal Titans kill a total of 10 elementals.",
                "boss": "Royal Titans",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/Let%20them%20fight",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            },
            {
                "name": "One by one",
                "description": "Kill one Titan at a time, without attacking the other.",
                "boss": "Royal Titans",
                "type": "Restriction",
                "points": 1,
                "wikiLink": "https://oldschool.runescape.wiki/w/One%20by%20one",
                "notes": "",
                "achieved": false,
                "tier": "easy"
            }
        ]
    },
    "amoxliatl": {
        "name": "Amoxliatl",
        "tasks": [
            {
                "name": "Amoxliatl Speed-Chaser",
                "description": "Kill Amoxliatl in less than 30 seconds.",
                "boss": "Amoxliatl",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Amoxliatl%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Without Ralos' Light",
                "description": "Kill Amoxliatl without losing any prayer points.",
                "boss": "Amoxliatl",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Without%20Ralos%27%20Light",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Amoxliatl Adept",
                "description": "Kill Amoxliatl 20 times.",
                "boss": "Amoxliatl",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Amoxliatl%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Amoxliatl Speed-Trialist",
                "description": "Kill Amoxliatl in less than 1 minute.",
                "boss": "Amoxliatl",
                "type": "Speed",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Amoxliatl%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Kemo Makti",
                "description": "Kill Amoxliatl 10 times without leaving her chamber.",
                "boss": "Amoxliatl",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kemo%20Makti",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Nagua Negation",
                "description": "Kill Amoxliatl without taking any damage.",
                "boss": "Amoxliatl",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nagua%20Negation",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Totally Shattered",
                "description": "Kill Amoxliatl without any of her unstable ice shattering.",
                "boss": "Amoxliatl",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Totally%20Shattered",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Amoxliatl Champion",
                "description": "Kill Amoxliatl once.",
                "boss": "Amoxliatl",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Amoxliatl%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Temotli Triumph",
                "description": "Kill Amoxliatl using only glacial temotli as a weapon.",
                "boss": "Amoxliatl",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Temotli%20Triumph",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "brutal_black_dragon": {
        "name": "Brutal Black Dragon",
        "tasks": [
            {
                "name": "Brutal, Big, Black and Firey",
                "description": "Kill a Brutal Black Dragon.",
                "boss": "Brutal Black Dragon",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Brutal%2C%20Big%2C%20Black%20and%20Firey",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "chaos_fanatic": {
        "name": "Chaos Fanatic",
        "tasks": [
            {
                "name": "Chaos Fanatic Adept",
                "description": "Kill the Chaos Fanatic 25 times.",
                "boss": "Chaos Fanatic",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chaos%20Fanatic%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Praying to the Gods",
                "description": "Kill the Chaos Fanatic 10 times without drinking any potion which restores prayer or leaving the Wilderness.",
                "boss": "Chaos Fanatic",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Praying%20to%20the%20Gods",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Chaos Fanatic Champion",
                "description": "Kill the Chaos Fanatic 10 times.",
                "boss": "Chaos Fanatic",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chaos%20Fanatic%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Sorry, What Was That?",
                "description": "Kill the Chaos Fanatic without anyone being hit by his explosion attack.",
                "boss": "Chaos Fanatic",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sorry%2C%20What%20Was%20That%3F",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "crazy_archaeologist": {
        "name": "Crazy Archaeologist",
        "tasks": [
            {
                "name": "Crazy Archaeologist Adept",
                "description": "Kill the Crazy Archaeologist 25 times.",
                "boss": "Crazy Archaeologist",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Crazy%20Archaeologist%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Crazy Archaeologist Champion",
                "description": "Kill the Crazy Archaeologist 10 times.",
                "boss": "Crazy Archaeologist",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Crazy%20Archaeologist%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "I'd Rather Not Learn",
                "description": "Kill the Crazy Archaeologist without anyone being hit by his \"Rain of Knowledge\" attack.",
                "boss": "Crazy Archaeologist",
                "type": "Perfection",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%27d%20Rather%20Not%20Learn",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Mage of the Ruins",
                "description": "Kill the Crazy Archaeologist with only magical attacks.",
                "boss": "Crazy Archaeologist",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mage%20of%20the%20Ruins",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "dagannoth_prime": {
        "name": "Dagannoth Prime",
        "tasks": [
            {
                "name": "Death to the Seer King",
                "description": "Kill Dagannoth Prime whilst under attack by Dagannoth Supreme and Dagannoth Rex.",
                "boss": "Dagannoth Prime",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Death%20to%20the%20Seer%20King",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "From One King to Another",
                "description": "Kill Prime using a Rune Thrownaxe special attack, bounced off Dagannoth Rex.",
                "boss": "Dagannoth Prime",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/From%20One%20King%20to%20Another",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Dagannoth Prime Adept",
                "description": "Kill Dagannoth Prime 25 times.",
                "boss": "Dagannoth Prime",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Prime%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Dagannoth Prime Champion",
                "description": "Kill Dagannoth Prime 10 times.",
                "boss": "Dagannoth Prime",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Prime%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "dagannoth_rex": {
        "name": "Dagannoth Rex",
        "tasks": [
            {
                "name": "Death to the Warrior King",
                "description": "Kill Dagannoth Rex whilst under attack by Dagannoth Supreme and Dagannoth Prime.",
                "boss": "Dagannoth Rex",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Death%20to%20the%20Warrior%20King",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Toppling the Diarchy",
                "description": "Kill Dagannoth Rex and one other Dagannoth king at the exact same time.",
                "boss": "Dagannoth Rex",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Toppling%20the%20Diarchy",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Dagannoth Rex Adept",
                "description": "Kill Dagannoth Rex 25 times.",
                "boss": "Dagannoth Rex",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Rex%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "A Frozen King",
                "description": "Kill Dagannoth Rex whilst he is immobilized.",
                "boss": "Dagannoth Rex",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Frozen%20King",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Dagannoth Rex Champion",
                "description": "Kill Dagannoth Rex 10 times.",
                "boss": "Dagannoth Rex",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Rex%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "dagannoth_supreme": {
        "name": "Dagannoth Supreme",
        "tasks": [
            {
                "name": "Death to the Archer King",
                "description": "Kill Dagannoth Supreme whilst under attack by Dagannoth Prime and Dagannoth Rex.",
                "boss": "Dagannoth Supreme",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Death%20to%20the%20Archer%20King",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Rapid Succession",
                "description": "Kill all three Dagannoth Kings within 9 seconds of the first one.",
                "boss": "Dagannoth Supreme",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Rapid%20Succession",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Dagannoth Supreme Adept",
                "description": "Kill Dagannoth Supreme 25 times.",
                "boss": "Dagannoth Supreme",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Supreme%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Dagannoth Supreme Champion",
                "description": "Kill Dagannoth Supreme 10 times.",
                "boss": "Dagannoth Supreme",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dagannoth%20Supreme%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "gargoyle": {
        "name": "Gargoyle",
        "tasks": [
            {
                "name": "A Smashing Time",
                "description": "Kill a Gargoyle.",
                "boss": "Gargoyle",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Smashing%20Time",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "hueycoatl": {
        "name": "Hueycoatl",
        "tasks": [
            {
                "name": "Hueycoatl Speed-Runner",
                "description": "Kill the Hueycoatl in 2:30 with three or fewer players.",
                "boss": "Hueycoatl",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Hueycoatl Speed-Chaser",
                "description": "Kill the Hueycoatl in 2:30 with five or fewer players.",
                "boss": "Hueycoatl",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Is it a bird?",
                "description": "Kill the Hueycoatl using only Dragonbane weaponry.",
                "boss": "Hueycoatl",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Is%20it%20a%20bird%3F",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Hueycoatl Speed-Trialist",
                "description": "Kill the Hueycoatl in 2:30.",
                "boss": "Hueycoatl",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hueycoatl Veteran",
                "description": "Kill the Hueycoatl 25 times.",
                "boss": "Hueycoatl",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Hueycoatl",
                "description": "Kill the Hueycoatl perfectly 5 times without leaving. To get a perfect kill, you must not take any avoidable damage from the Hueycoatl's lightning attack, tail slam attack, or off-prayer projectile attacks.",
                "boss": "Hueycoatl",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Hueycoatl",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hueycoatl Adept",
                "description": "Kill the Hueycoatl 10 times.",
                "boss": "Hueycoatl",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "I'm your son",
                "description": "Kill the whilst wearing two pieces of Hueycoatl armour.",
                "boss": "Hueycoatl",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%27m%20your%20son",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Pillar Lover",
                "description": "Kill the Hueycoatl whilst it is vulnerable.",
                "boss": "Hueycoatl",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Pillar%20Lover",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Hueycoatl Champion",
                "description": "Kill the Hueycoatl once.",
                "boss": "Hueycoatl",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hueycoatl%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "You're a wizard",
                "description": "Kill the Hueycoatl using only earth spells.",
                "boss": "Hueycoatl",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/You%27re%20a%20wizard",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "kurask": {
        "name": "Kurask",
        "tasks": [
            {
                "name": "Master of Broad Weaponry",
                "description": "Kill a Kurask.",
                "boss": "Kurask",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Master%20of%20Broad%20Weaponry",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "moons_of_peril": {
        "name": "Moons of Peril",
        "tasks": [
            {
                "name": "High Hitter",
                "description": "Defeat a Moon before they start their second special attack.",
                "boss": "Moons of Peril",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/High%20Hitter",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Betrayal",
                "description": "Defeat a Moon using its associated weapon drop.",
                "boss": "Moons of Peril",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Betrayal",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Fat of the Land",
                "description": "Defeat 30 Moons of Peril without leaving the dungeon.",
                "boss": "Moons of Peril",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fat%20of%20the%20Land",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Fortified",
                "description": "Defeat a Moon without consuming any supplies.",
                "boss": "Moons of Peril",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fortified",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Moons of Peril Speed-Chaser",
                "description": "Defeat all three Moons in one run in under 6 minutes.",
                "boss": "Moons of Peril",
                "type": "Speed",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Moons%20of%20Peril%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Perilous Champion",
                "description": "Open the Reward Chest 25 times.",
                "boss": "Moons of Peril",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perilous%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Perilous Dancer",
                "description": "Defeat all the Moons in one run while only taking damage from regular attacks.",
                "boss": "Moons of Peril",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perilous%20Dancer",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "The Clone Zone",
                "description": "Defeat the Eclipse moon by only attacking its clones.",
                "boss": "Moons of Peril",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Clone%20Zone",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Back to Our Roots",
                "description": "Defeat all three Moons in one run using only a Dragon Scimitar.",
                "boss": "Moons of Peril",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Back%20to%20Our%20Roots",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Lunar Triplet",
                "description": "Open the Reward Chest after defeating all three Moons.",
                "boss": "Moons of Peril",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Lunar%20Triplet",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Moons of Peril Speed-Trialist",
                "description": "Defeat all three Moons in one run in under 8 minutes.",
                "boss": "Moons of Peril",
                "type": "Speed",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Moons%20of%20Peril%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Perilous Novice",
                "description": "Open the Reward Chest 5 times.",
                "boss": "Moons of Peril",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perilous%20Novice",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "skeletal_wyvern": {
        "name": "Skeletal Wyvern",
        "tasks": [
            {
                "name": "A Frozen Foe from the Past",
                "description": "Kill a Skeletal Wyvern",
                "boss": "Skeletal Wyvern",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Frozen%20Foe%20from%20the%20Past",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "skotizo": {
        "name": "Skotizo",
        "tasks": [
            {
                "name": "Precise Positioning",
                "description": "Kill Skotizo with the final source of damage being a Chinchompa explosion.",
                "boss": "Skotizo",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Precise%20Positioning",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Demon Evasion",
                "description": "Kill Skotizo without taking any damage.",
                "boss": "Skotizo",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demon%20Evasion",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Up for the Challenge",
                "description": "Kill Skotizo without equipping a demonbane weapon.",
                "boss": "Skotizo",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Up%20for%20the%20Challenge",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Skotizo Adept",
                "description": "Kill Skotizo 5 times.",
                "boss": "Skotizo",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Skotizo%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Demonbane Weaponry",
                "description": "Kill Skotizo with a demonbane weapon equipped.",
                "boss": "Skotizo",
                "type": "Restriction",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonbane%20Weaponry",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Demonic Weakening",
                "description": "Kill Skotizo with no altars active.",
                "boss": "Skotizo",
                "type": "Mechanical",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonic%20Weakening",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            },
            {
                "name": "Skotizo Champion",
                "description": "Kill Skotizo once.",
                "boss": "Skotizo",
                "type": "Kill Count",
                "points": 2,
                "wikiLink": "https://oldschool.runescape.wiki/w/Skotizo%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "medium"
            }
        ]
    },
    "abyssal_sire": {
        "name": "Abyssal Sire",
        "tasks": [
            {
                "name": "Abyssal Veteran",
                "description": "Kill the Abyssal Sire 50 times.",
                "boss": "Abyssal Sire",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Abyssal%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Demonic Rebound",
                "description": "Use the Vengeance spell to reflect the damage from the Abyssal Sire's explosion back to him.",
                "boss": "Abyssal Sire",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonic%20Rebound",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Sire",
                "description": "Kill the Abyssal Sire without taking damage from the external tentacles, miasma pools, explosion or damage from the Abyssal Sire without praying the appropriate protection prayer.",
                "boss": "Abyssal Sire",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Sire",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Respiratory Runner",
                "description": "Kill the Abyssal Sire after only stunning him once.",
                "boss": "Abyssal Sire",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Respiratory%20Runner",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Abyssal Adept",
                "description": "Kill the Abyssal Sire 20 times.",
                "boss": "Abyssal Sire",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Abyssal%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Don't Stop Moving",
                "description": "Kill the Abyssal Sire without taking damage from any miasma pools.",
                "boss": "Abyssal Sire",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Don%27t%20Stop%20Moving",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Don't Whip Me",
                "description": "Kill the Abyssal Sire without being hit by any external tentacles.",
                "boss": "Abyssal Sire",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Don%27t%20Whip%20Me",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "They Grow Up Too Fast",
                "description": "Kill the Abyssal Sire without letting any Scion mature.",
                "boss": "Abyssal Sire",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/They%20Grow%20Up%20Too%20Fast",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "callisto": {
        "name": "Callisto",
        "tasks": [
            {
                "name": "Callisto Veteran",
                "description": "Kill Callisto 20 times.",
                "boss": "Callisto",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Callisto%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Callisto Adept",
                "description": "Kill Callisto 10 times.",
                "boss": "Callisto",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Callisto%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "chaos_elemental": {
        "name": "Chaos Elemental",
        "tasks": [
            {
                "name": "Chaos Elemental Veteran",
                "description": "Kill the Chaos Elemental 25 times.",
                "boss": "Chaos Elemental",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chaos%20Elemental%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Chaos Elemental Adept",
                "description": "Kill the Chaos Elemental 10 times.",
                "boss": "Chaos Elemental",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chaos%20Elemental%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Hoarder",
                "description": "Kill the Chaos Elemental without it unequipping any of your items.",
                "boss": "Chaos Elemental",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hoarder",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "The Flincher",
                "description": "Kill the Chaos Elemental without taking any damage from it's attacks.",
                "boss": "Chaos Elemental",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Flincher",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "commander_zilyana": {
        "name": "Commander Zilyana",
        "tasks": [
            {
                "name": "Animal Whisperer",
                "description": "Kill Commander Zilyana in a private instance without taking any damage from the boss or bodyguards.",
                "boss": "Commander Zilyana",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Animal%20Whisperer",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Peach Conjurer",
                "description": "Kill Commander Zilyana 50 times in a privately rented instance without leaving the room.",
                "boss": "Commander Zilyana",
                "type": "Stamina",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Peach%20Conjurer",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Moving Collateral",
                "description": "Kill Commander Zilyana in a private instance without attacking her directly.",
                "boss": "Commander Zilyana",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Moving%20Collateral",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Commander Zilyana Veteran",
                "description": "Kill Commander Zilyana 100 times.",
                "boss": "Commander Zilyana",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Commander%20Zilyana%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Reminisce",
                "description": "Kill Commander Zilyana in a private instance with melee only.",
                "boss": "Commander Zilyana",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Reminisce",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Commander Showdown",
                "description": "Finish off Commander Zilyana while all of her bodyguards are dead.",
                "boss": "Commander Zilyana",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Commander%20Showdown",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Commander Zilyana Adept",
                "description": "Kill Commander Zilyana 50 times.",
                "boss": "Commander Zilyana",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Commander%20Zilyana%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "general_graardor": {
        "name": "General Graardor",
        "tasks": [
            {
                "name": "Defence Matters",
                "description": "Kill General Graardor 2 times consecutively in a private instance without taking any damage from his bodyguards.",
                "boss": "General Graardor",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Defence%20Matters",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Keep Away",
                "description": "Kill General Graardor in a private instance without taking any damage from the boss or bodyguards.",
                "boss": "General Graardor",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Keep%20Away",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Ourg Killer",
                "description": "Kill General Graardor 15 times in a private instance without leaving the room.",
                "boss": "General Graardor",
                "type": "Stamina",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ourg%20Killer",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "General Graardor Veteran",
                "description": "Kill General Graardor 100 times.",
                "boss": "General Graardor",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/General%20Graardor%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Ourg Freezer II",
                "description": "Kill General Graardor without him attacking any players.",
                "boss": "General Graardor",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ourg%20Freezer%20II",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "General Graardor Adept",
                "description": "Kill General Graardor 50 times.",
                "boss": "General Graardor",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/General%20Graardor%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "General Showdown",
                "description": "Finish off General Graardor whilst all of his bodyguards are dead.",
                "boss": "General Graardor",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/General%20Showdown",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Ourg Freezer",
                "description": "Kill General Graardor whilst he is immobilized.",
                "boss": "General Graardor",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ourg%20Freezer",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "grotesque_guardians": {
        "name": "Grotesque Guardians",
        "tasks": [
            {
                "name": "Grotesque Guardians Speed-Runner",
                "description": "Kill the Grotesque Guardians in less than 1:20 minutes.",
                "boss": "Grotesque Guardians",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Grotesque%20Guardians%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "... 'til Dawn",
                "description": "Kill the Grotesque Guardians 20 times without leaving the instance.",
                "boss": "Grotesque Guardians",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/...%20%27til%20Dawn",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Grotesque Guardians Speed-Chaser",
                "description": "Kill the Grotesque Guardians in less than 1:40 minutes.",
                "boss": "Grotesque Guardians",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Grotesque%20Guardians%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Grotesque Guardians II",
                "description": "Kill the Grotesque Guardians 5 times in a row without leaving the instance, whilst completing the Perfect Grotesque Guardians task every time.",
                "boss": "Grotesque Guardians",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Grotesque%20Guardians%20II",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Done before Dusk",
                "description": "Kill the Grotesque Guardians before Dusk uses his prison attack for a second time.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Done%20before%20Dusk",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "From Dusk...",
                "description": "Kill the Grotesque Guardians 10 times without leaving the instance.",
                "boss": "Grotesque Guardians",
                "type": "Stamina",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/From%20Dusk...",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Grotesque Guardians Speed-Trialist",
                "description": "Kill the Grotesque Guardians in less than 2 minutes.",
                "boss": "Grotesque Guardians",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Grotesque%20Guardians%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Grotesque Guardians Veteran",
                "description": "Kill the Grotesque Guardians 50 times.",
                "boss": "Grotesque Guardians",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Grotesque%20Guardians%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Grotesque Guardians",
                "description": "Kill the Grotesque Guardians whilst completing the \"Don't look at the eclipse\", \"Prison Break\", \"Granite Footwork\", \"Heal no more\", \"Static Awareness\" and \"Done before dusk\" tasks.",
                "boss": "Grotesque Guardians",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Grotesque%20Guardians",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Don't Look at the Eclipse",
                "description": "Kill the Grotesque Guardians without taking damage from Dusk's blinding attack.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Don%27t%20Look%20at%20the%20Eclipse",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Granite Footwork",
                "description": "Kill the Grotesque Guardians without taking damage from Dawn's rockfall attack.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Granite%20Footwork",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Grotesque Guardians Adept",
                "description": "Kill the Grotesque Guardians 25 times.",
                "boss": "Grotesque Guardians",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Grotesque%20Guardians%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Heal No More",
                "description": "Kill the Grotesque Guardians without letting Dawn receive any healing from her orbs.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Heal%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Prison Break",
                "description": "Kill the Grotesque Guardians without taking damage from Dusk's prison attack.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Prison%20Break",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Static Awareness",
                "description": "Kill the Grotesque Guardians without being hit by any lightning attacks.",
                "boss": "Grotesque Guardians",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Static%20Awareness",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "hespori": {
        "name": "Hespori",
        "tasks": [
            {
                "name": "Hespori Speed-Chaser",
                "description": "Kill the Hespori in less than 36 seconds.",
                "boss": "Hespori",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hespori%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Hespori Speed-Trialist",
                "description": "Kill the Hespori in less than 48 seconds.",
                "boss": "Hespori",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hespori%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Plant-Based Diet",
                "description": "Kill Hespori without losing any prayer points.",
                "boss": "Hespori",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Plant-Based%20Diet",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hespori Adept",
                "description": "Kill Hespori 5 times.",
                "boss": "Hespori",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hespori%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Hesporisn't",
                "description": "Finish off Hespori with a special attack.",
                "boss": "Hespori",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hesporisn%27t",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Weed Whacker",
                "description": "Kill all of Hesporis flowers within 5 seconds.",
                "boss": "Hespori",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Weed%20Whacker",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "kril_tsutsaroth": {
        "name": "K'ril Tsutsaroth",
        "tasks": [
            {
                "name": "Ash Collector",
                "description": "Kill K'ril Tsutsaroth 20 times in a private instance without leaving the room.",
                "boss": "K'ril Tsutsaroth",
                "type": "Stamina",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ash%20Collector",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Demon Whisperer",
                "description": "Kill K'ril Tsutsaroth in a private instance without ever being hit by his bodyguards.",
                "boss": "K'ril Tsutsaroth",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demon%20Whisperer",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Demonic Defence",
                "description": "Kill K'ril Tsutsaroth in a private instance without taking any of his melee hits.",
                "boss": "K'ril Tsutsaroth",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonic%20Defence",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "K'ril Tsutsaroth Veteran",
                "description": "Kill K'ril Tsutsaroth 100 times.",
                "boss": "K'ril Tsutsaroth",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/K%27ril%20Tsutsaroth%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "The Bane of Demons",
                "description": "Defeat K'ril Tsutsaroth in a private instance using only demonbane spells.",
                "boss": "K'ril Tsutsaroth",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Bane%20of%20Demons",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Demonbane Weaponry II",
                "description": "Finish off K'ril Tsutsaroth with a demonbane weapon.",
                "boss": "K'ril Tsutsaroth",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonbane%20Weaponry%20II",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Demonic Showdown",
                "description": "Finish off K'ril Tsutsaroth whilst all of his bodyguards are dead.",
                "boss": "K'ril Tsutsaroth",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Demonic%20Showdown",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "K'ril Tsutsaroth Adept",
                "description": "Kill K'ril Tsutsaroth 50 times.",
                "boss": "K'ril Tsutsaroth",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/K%27ril%20Tsutsaroth%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Yarr No More",
                "description": "Receive kill-credit for K'ril Tsutsaroth without him using his special attack.",
                "boss": "K'ril Tsutsaroth",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Yarr%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "kalphite_queen": {
        "name": "Kalphite Queen",
        "tasks": [
            {
                "name": "Insect Deflection",
                "description": "Kill the Kalphite Queen by using the Vengeance spell as the finishing blow.",
                "boss": "Kalphite Queen",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Insect%20Deflection",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Kalphite Queen Veteran",
                "description": "Kill the Kalphite Queen 50 times.",
                "boss": "Kalphite Queen",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kalphite%20Queen%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Prayer Smasher",
                "description": "Kill the Kalphite Queen using only the Verac's Flail as a weapon.",
                "boss": "Kalphite Queen",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Prayer%20Smasher",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Chitin Penetrator",
                "description": "Kill the Kalphite Queen while her defence was last lowered by you.",
                "boss": "Kalphite Queen",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chitin%20Penetrator",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Kalphite Queen Adept",
                "description": "Kill the Kalphite Queen 25 times.",
                "boss": "Kalphite Queen",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kalphite%20Queen%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "kraken": {
        "name": "Kraken",
        "tasks": [
            {
                "name": "One Hundred Tentacles",
                "description": "Kill the Kraken 100 times in a private instance without leaving the room.",
                "boss": "Kraken",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/One%20Hundred%20Tentacles",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Ten-tacles",
                "description": "Kill the Kraken 50 times in a private instance without leaving the room.",
                "boss": "Kraken",
                "type": "Stamina",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ten-tacles",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Krakan't Hurt Me",
                "description": "Kill the Kraken 25 times in a private instance without leaving the room.",
                "boss": "Kraken",
                "type": "Stamina",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Krakan%27t%20Hurt%20Me",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Kraken Adept",
                "description": "Kill the Kraken 20 times.",
                "boss": "Kraken",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kraken%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Unnecessary Optimization",
                "description": "Kill the Kraken after killing all four tentacles.",
                "boss": "Kraken",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Unnecessary%20Optimization",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "kreearra": {
        "name": "Kree'arra",
        "tasks": [
            {
                "name": "Feather Hunter",
                "description": "Kill Kree'arra 30 times in a private instance without leaving the room.",
                "boss": "Kree'arra",
                "type": "Stamina",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Feather%20Hunter",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "The Worst Ranged Weapon",
                "description": "Kill Kree'arra by only dealing damage to him with a salamander.",
                "boss": "Kree'arra",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Worst%20Ranged%20Weapon",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Collateral Damage",
                "description": "Kill Kree'arra in a private instance without ever attacking him directly.",
                "boss": "Kree'arra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Collateral%20Damage",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Swoop No More",
                "description": "Kill Kree'arra in a private instance without taking any melee damage from the boss or his bodyguards.",
                "boss": "Kree'arra",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Swoop%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Kree'arra Veteran",
                "description": "Kill Kree'arra 100 times.",
                "boss": "Kree'arra",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kree%27arra%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Airborne Showdown",
                "description": "Finish off Kree'arra whilst all of his bodyguards are dead.",
                "boss": "Kree'arra",
                "type": "Mechanical",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Airborne%20Showdown",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Kree'arra Adept",
                "description": "Kill Kree'arra 50 times.",
                "boss": "Kree'arra",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kree%27arra%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "phantom_muspah": {
        "name": "Phantom Muspah",
        "tasks": [
            {
                "name": "Phantom Muspah Manipulator",
                "description": "Kill the Phantom Muspah whilst completing Walk Straight Pray True, Space is Tight & Can't Escape.",
                "boss": "Phantom Muspah",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Manipulator",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Phantom Muspah Speed-Runner",
                "description": "Kill the Phantom Muspah in less than 1 minute and 30 seconds without a slayer task.",
                "boss": "Phantom Muspah",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Essence Farmer",
                "description": "Kill the Phantom Muspah 10 times in one trip.",
                "boss": "Phantom Muspah",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Essence%20Farmer",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "More than just a ranged weapon",
                "description": "Kill the Phantom Muspah by only dealing damage to it with a salamander.",
                "boss": "Phantom Muspah",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/More%20than%20just%20a%20ranged%20weapon",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Phantom Muspah Master",
                "description": "Kill the Phantom Muspah 50 times.",
                "boss": "Phantom Muspah",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Phantom Muspah Speed-Chaser",
                "description": "Kill the Phantom Muspah in less than 2 minutes without a slayer task.",
                "boss": "Phantom Muspah",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Space is Tight",
                "description": "Kill the Phantom Muspah whilst it is surrounded by spikes.",
                "boss": "Phantom Muspah",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Space%20is%20Tight",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Walk Straight Pray True",
                "description": "Kill the Phantom Muspah without taking any avoidable damage.",
                "boss": "Phantom Muspah",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Walk%20Straight%20Pray%20True",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Can't Escape",
                "description": "Kill the Phantom Muspah without running.",
                "boss": "Phantom Muspah",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%27t%20Escape",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Phantom Muspah Speed-Trialist",
                "description": "Kill the Phantom Muspah in less than 3 minutes without a slayer task.",
                "boss": "Phantom Muspah",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Phantom Muspah Veteran",
                "description": "Kill the Phantom Muspah 25 times.",
                "boss": "Phantom Muspah",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Versatile Drainer",
                "description": "Drain the Phantom Muspah's Prayer with three different sources in one kill.",
                "boss": "Phantom Muspah",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Versatile%20Drainer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Phantom Muspah Adept",
                "description": "Kill the Phantom Muspah.",
                "boss": "Phantom Muspah",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phantom%20Muspah%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "scorpia": {
        "name": "Scorpia",
        "tasks": [
            {
                "name": "Scorpia Veteran",
                "description": "Kill Scorpia 25 times.",
                "boss": "Scorpia",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Scorpia%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Guardians No More",
                "description": "Kill Scorpia without killing her guardians.",
                "boss": "Scorpia",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Guardians%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "I Can't Reach That",
                "description": "Kill Scorpia without taking any damage from her.",
                "boss": "Scorpia",
                "type": "Perfection",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20Can%27t%20Reach%20That",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Scorpia Adept",
                "description": "Kill Scorpia 10 times.",
                "boss": "Scorpia",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Scorpia%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "the_nightmare": {
        "name": "The Nightmare",
        "tasks": [
            {
                "name": "A Long Trip",
                "description": "Kill the Nightmare without any player losing any prayer points.",
                "boss": "The Nightmare",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Long%20Trip",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nightmare (5-Scale) Speed-Runner",
                "description": "Defeat the Nightmare (5-scale) in less than 3:30 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%285-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nightmare (Solo) Speed-Runner",
                "description": "Defeat the Nightmare (Solo) in less than 16 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%28Solo%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Terrible Parent",
                "description": "Kill the Nightmare solo without the Parasites healing the boss for more than 100 health.",
                "boss": "The Nightmare",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Terrible%20Parent",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nightmare (5-Scale) Speed-Chaser",
                "description": "Defeat the Nightmare (5-scale) in less than 4 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%285-Scale%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Nightmare (Solo) Speed-Chaser",
                "description": "Defeat the Nightmare (Solo) in less than 19 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%28Solo%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Nightmare Master",
                "description": "Kill The Nightmare 50 times.",
                "boss": "The Nightmare",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Nightmare",
                "description": "Kill the Nightmare without any player taking damage from the following attacks: Nightmare rifts, an un-cured parasite explosion, Corpse flowers or the Nightmare's Surge. Also, no player can take damage off prayer or have their attacks slowed by the Nightmare spores.",
                "boss": "The Nightmare",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Nightmare",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Explosion!",
                "description": "Kill two Husks at the same time.",
                "boss": "The Nightmare",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Explosion%21",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nightmare (5-Scale) Speed-Trialist",
                "description": "Defeat the Nightmare (5-scale) in less than 5 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%285-Scale%29%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nightmare (Solo) Speed-Trialist",
                "description": "Defeat the Nightmare (Solo) in less than 23 minutes.",
                "boss": "The Nightmare",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20%28Solo%29%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nightmare Veteran",
                "description": "Kill The Nightmare 25 times.",
                "boss": "The Nightmare",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Sleep Tight",
                "description": "Kill the Nightmare solo.",
                "boss": "The Nightmare",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sleep%20Tight",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nightmare Adept",
                "description": "Kill The Nightmare once.",
                "boss": "The Nightmare",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nightmare%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "theatre_of_blood_entry_mode": {
        "name": "Theatre of Blood: Entry Mode",
        "tasks": [
            {
                "name": "Theatre of Blood: SM Speed-Chaser",
                "description": "Complete the Theatre of Blood: Entry Mode in less than 17 minutes.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%3A%20SM%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Anticoagulants",
                "description": "Defeat the Maiden of Sugadinti in the Theatre of Blood: Entry Mode without letting any bloodspawn live for longer than 10 seconds.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Anticoagulants",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Appropriate Tools",
                "description": "Defeat the Pestilent Bloat in the Theatre of Blood: Entry Mode with everyone having a salve amulet equipped.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Appropriate%20Tools",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Attack, Step, Wait",
                "description": "Survive Verzik Vitur's second phase in the Theatre of Blood: Entry Mode without anyone getting bounced by Verzik.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Attack%2C%20Step%2C%20Wait",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Chally Time",
                "description": "Defeat the Pestilent Bloat in the Theatre of Blood: Entry Mode by using a crystal halberd special attack as your final attack.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chally%20Time",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Don't Look at Me!",
                "description": "Kill Xarpus in the Theatre of Blood: Entry Mode without him reflecting any damage to anyone.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Don%27t%20Look%20at%20Me%21",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Just To Be Safe",
                "description": "Defeat Sotetseg in the Theatre of Blood: Entry Mode after having split the big ball with your entire team. This must be done with a group size of at least 2.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Just%20To%20Be%20Safe",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "No-Pillar",
                "description": "Survive Verzik Vitur's pillar phase in the Theatre of Blood: Entry Mode without losing a single pillar.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/No-Pillar",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nylocas, On the Rocks",
                "description": "In the Theatre of Blood: Entry Mode, freeze any 4 Nylocas with a single Ice Barrage spell.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nylocas%2C%20On%20the%20Rocks",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Pass It On",
                "description": "In the Theatre of Blood: Entry Mode, successfully pass on the green ball to a team mate.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Pass%20It%20On",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "They Won't Expect This",
                "description": "In the Theatre of Blood: Entry Mode, enter the Pestilent Bloat room from the opposite side.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/They%20Won%27t%20Expect%20This",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Theatre of Blood: SM Adept",
                "description": "Complete the Theatre of Blood: Entry Mode 1 time.",
                "boss": "Theatre of Blood: Entry Mode",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%3A%20SM%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "tombs_of_amascut_entry_mode": {
        "name": "Tombs of Amascut: Entry Mode",
        "tasks": [
            {
                "name": "Novice Tomb Raider",
                "description": "Complete the Tombs of Amascut in Entry mode (or above) 50 times.",
                "boss": "Tombs of Amascut: Entry Mode",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Novice%20Tomb%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Confident Raider",
                "description": "Complete a Tombs of Amascut raid at level 100 or above.",
                "boss": "Tombs of Amascut: Entry Mode",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Confident%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Movin' on up",
                "description": "Complete a Tombs of Amascut raid at level 50 or above.",
                "boss": "Tombs of Amascut: Entry Mode",
                "type": "Restriction",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Movin%27%20on%20up",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Novice Tomb Explorer",
                "description": "Complete the Tombs of Amascut in Entry mode (or above) once.",
                "boss": "Tombs of Amascut: Entry Mode",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Novice%20Tomb%20Explorer",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            },
            {
                "name": "Novice Tomb Looter",
                "description": "Complete the Tombs of Amascut in Entry mode (or above) 25 times.",
                "boss": "Tombs of Amascut: Entry Mode",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Novice%20Tomb%20Looter",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "venenatis": {
        "name": "Venenatis",
        "tasks": [
            {
                "name": "Venenatis Veteran",
                "description": "Kill Venenatis 20 times.",
                "boss": "Venenatis",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Venenatis%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Venenatis Adept",
                "description": "Kill Venenatis 10 times.",
                "boss": "Venenatis",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Venenatis%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "vetion": {
        "name": "Vet'ion",
        "tasks": [
            {
                "name": "Vet'eran",
                "description": "Kill Vet'ion 20 times.",
                "boss": "Vet'ion",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vet%27eran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Vet'ion Adept",
                "description": "Kill Vet'ion 10 times.",
                "boss": "Vet'ion",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vet%27ion%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "zulrah": {
        "name": "Zulrah",
        "tasks": [
            {
                "name": "Zulrah Speed-Runner",
                "description": "Kill Zulrah in less than 54 seconds, without a slayer task.",
                "boss": "Zulrah",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Zulrah",
                "description": "Kill Zulrah whilst taking no damage from the following: Snakelings, Venom Clouds, Zulrah's Green or Crimson phase.",
                "boss": "Zulrah",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Zulrah",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Zulrah Master",
                "description": "Kill Zulrah 150 times.",
                "boss": "Zulrah",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Zulrah Speed-Chaser",
                "description": "Kill Zulrah in less than 1 minute, without a slayer task.",
                "boss": "Zulrah",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Snake Rebound",
                "description": "Kill Zulrah by using the Vengeance spell as the finishing blow.",
                "boss": "Zulrah",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Snake%20Rebound",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Snake. Snake!? Snaaaaaake!",
                "description": "Kill 3 Snakelings simultaneously.",
                "boss": "Zulrah",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Snake.%20Snake%21%3F%20Snaaaaaake%21",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Zulrah Speed-Trialist",
                "description": "Kill Zulrah in less than 1 minute 20 seconds, without a slayer task.",
                "boss": "Zulrah",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Zulrah Veteran",
                "description": "Kill Zulrah 75 times.",
                "boss": "Zulrah",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Zulrah Adept",
                "description": "Kill Zulrah 25 times.",
                "boss": "Zulrah",
                "type": "Kill Count",
                "points": 3,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zulrah%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "hard"
            }
        ]
    },
    "alchemical_hydra": {
        "name": "Alchemical Hydra",
        "tasks": [
            {
                "name": "Alchemical Speed-Runner",
                "description": "Kill the Alchemical Hydra in less than 1 minute 20 seconds.",
                "boss": "Alchemical Hydra",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Alchemical%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "No Pressure",
                "description": "Kill the Alchemical Hydra using only Dharok's Greataxe as a weapon whilst having no more than 10 Hitpoints throughout the entire fight.",
                "boss": "Alchemical Hydra",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20Pressure",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Alchemical Master",
                "description": "Kill the Alchemical Hydra 150 times.",
                "boss": "Alchemical Hydra",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Alchemical%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Alchemical Speed-Chaser",
                "description": "Kill the Alchemical Hydra in less than 1 minute 45 seconds.",
                "boss": "Alchemical Hydra",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Alchemical%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Alcleanical Hydra",
                "description": "Kill the Alchemical Hydra without taking any damage.",
                "boss": "Alchemical Hydra",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Alcleanical%20Hydra",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Don't Flame Me",
                "description": "Kill the Alchemical Hydra without being hit by the flame wall attack.",
                "boss": "Alchemical Hydra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Don%27t%20Flame%20Me",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Lightning Lure",
                "description": "Kill the Alchemical Hydra without being hit by the lightning attack.",
                "boss": "Alchemical Hydra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Lightning%20Lure",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Mixing Correctly",
                "description": "Kill the Alchemical Hydra without empowering it.",
                "boss": "Alchemical Hydra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mixing%20Correctly",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "The Flame Skipper",
                "description": "Kill the Alchemical Hydra without letting it spawn a flame wall attack.",
                "boss": "Alchemical Hydra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Flame%20Skipper",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Unrequired Antipoisons",
                "description": "Kill the Alchemical Hydra without being hit by the acid pool attack.",
                "boss": "Alchemical Hydra",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Unrequired%20Antipoisons",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Working Overtime",
                "description": "Kill the Alchemical Hydra 15 times without leaving the room.",
                "boss": "Alchemical Hydra",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Working%20Overtime",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Alchemical Veteran",
                "description": "Kill the Alchemical Hydra 75 times.",
                "boss": "Alchemical Hydra",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Alchemical%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "araxxor": {
        "name": "Araxxor",
        "tasks": [
            {
                "name": "Araxxor Speed-Runner",
                "description": "Kill Araxxor 6 times in 10:00",
                "boss": "Araxxor",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxxor%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Araxxor 2",
                "description": "Kill Araxxor perfectly without damaging the boss during the enrage phase.",
                "boss": "Araxxor",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Araxxor%202",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Swimming in Venom",
                "description": "Kill Araxxor without the boss ever moving.",
                "boss": "Araxxor",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Swimming%20in%20Venom",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Arachnid Lover",
                "description": "Kill Araxxor 10 times without leaving.",
                "boss": "Araxxor",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Arachnid%20Lover",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Araxxor Master",
                "description": "Kill Araxxor 75 times.",
                "boss": "Araxxor",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxxor%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Araxxor Speed-Chaser",
                "description": "Kill Araxxor 5 times in 10:00",
                "boss": "Araxxor",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxxor%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Araxyte Betrayal",
                "description": "Have an Araxyte kill three other Araxytes.",
                "boss": "Araxxor",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxyte%20Betrayal",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Let it seep in",
                "description": "Kill Araxxor without ever having venom or poison immunity.",
                "boss": "Araxxor",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Let%20it%20seep%20in",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Araxxor",
                "description": "Kill Araxxor perfectly.",
                "boss": "Araxxor",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Araxxor",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Araxxor Speed-Trialist",
                "description": "Kill Araxxor 4 times in 10:00",
                "boss": "Araxxor",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxxor%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Araxxor Veteran",
                "description": "Kill Araxxor 25 times.",
                "boss": "Araxxor",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Araxxor%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Relaxed Gamer",
                "description": "Kill Araxxor after destroying six eggs.",
                "boss": "Araxxor",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Relaxed%20Gamer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "basilisk_knight": {
        "name": "Basilisk Knight",
        "tasks": [
            {
                "name": "Reflecting on This Encounter",
                "description": "Kill a Basilisk Knight.",
                "boss": "Basilisk Knight",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Reflecting%20on%20This%20Encounter",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "cerberus": {
        "name": "Cerberus",
        "tasks": [
            {
                "name": "Arooo No More",
                "description": "Kill Cerberus without any of the Summoned Souls being spawned.",
                "boss": "Cerberus",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Arooo%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Cerberus Master",
                "description": "Kill Cerberus 150 times.",
                "boss": "Cerberus",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Cerberus%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Anti-Bite Mechanics",
                "description": "Kill Cerberus without taking any melee damage.",
                "boss": "Cerberus",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Anti-Bite%20Mechanics",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Cerberus Veteran",
                "description": "Kill Cerberus 75 times.",
                "boss": "Cerberus",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Cerberus%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Ghost Buster",
                "description": "Kill Cerberus after successfully negating 6 or more attacks from Summoned Souls.",
                "boss": "Cerberus",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ghost%20Buster",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Unrequired Antifire",
                "description": "Kill Cerberus without taking damage from any lava pools.",
                "boss": "Cerberus",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Unrequired%20Antifire",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "chambers_of_xeric": {
        "name": "Chambers of Xeric",
        "tasks": [
            {
                "name": "Chambers of Xeric (5-Scale) Speed-Runner",
                "description": "Complete a Chambers of Xeric (5-scale) in less than 12 minutes and 30 seconds.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%285-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric (Solo) Speed-Runner",
                "description": "Complete a Chambers of Xeric (Solo) in less than 17 minutes.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%28Solo%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric (Trio) Speed-Runner",
                "description": "Complete a Chambers of Xeric (Trio) in less than 14 minutes and 30 seconds.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%28Trio%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric Grandmaster",
                "description": "Complete the Chambers of Xeric 150 times.",
                "boss": "Chambers of Xeric",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "A Not So Special Lizard",
                "description": "Kill the Great Olm in a solo raid without letting him use any of the following special attacks in his second to last phase: Crystal Burst, Lightning Walls, Teleportation Portals or left-hand autohealing.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Not%20So%20Special%20Lizard",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Anvil No More",
                "description": "Kill Tekton before he returns to his anvil for a second time after the fight begins.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Anvil%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Blind Spot",
                "description": "Kill Tekton without taking any damage.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Blind%20Spot",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric (5-Scale) Speed-Chaser",
                "description": "Complete a Chambers of Xeric (5-scale) in less than 15 minutes.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%285-Scale%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric (Solo) Speed-Chaser",
                "description": "Complete a Chambers of Xeric (Solo) in less than 21 minutes.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%28Solo%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric (Trio) Speed-Chaser",
                "description": "Complete a Chambers of Xeric (Trio) in less than 16 minutes and 30 seconds.",
                "boss": "Chambers of Xeric",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20%28Trio%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric Master",
                "description": "Complete the Chambers of Xeric 75 times.",
                "boss": "Chambers of Xeric",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "No Time for Death",
                "description": "Clear the Tightrope room without Killing any Deathly Mages or Deathly Rangers.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20Time%20for%20Death",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Olm (Solo)",
                "description": "Kill the Great Olm in a solo raid without taking damage from any of the following: Teleport portals, Fire Walls, Healing pools, Crystal Bombs, Crystal Burst or Prayer Orbs. You also cannot let his claws regenerate or take damage from the same acid pool back to back.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Olm%20%28Solo%29",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Olm (Trio)",
                "description": "Kill the Great Olm in a trio raid without any team member taking damage from any of the following: Teleport portals, Fire Walls, Healing pools, Crystal Bombs, Crystal Burst or Prayer Orbs. You also cannot let his claws regenerate or take damage from the same acid pool back to back.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Olm%20%28Trio%29",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Playing with Lasers",
                "description": "Clear the Crystal Crabs room without wasting an orb after the first crystal has been activated.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Playing%20with%20Lasers",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Putting It Olm on the Line",
                "description": "Complete a Chambers of Xeric solo raid with more than 40,000 points.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Putting%20It%20Olm%20on%20the%20Line",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Stop Drop and Roll",
                "description": "Kill Vasa Nistirio before he performs his teleport attack for the second time.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Stop%20Drop%20and%20Roll",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Undying Raider",
                "description": "Complete a Chambers of Xeric solo raid without dying.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Undying%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Blizzard Dodger",
                "description": "Receive kill-credit for the Ice Demon without activating the Protect from Range prayer.",
                "boss": "Chambers of Xeric",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Blizzard%20Dodger",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Chambers of Xeric Veteran",
                "description": "Complete the Chambers of Xeric 25 times.",
                "boss": "Chambers of Xeric",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Cryo No More",
                "description": "Receive kill-credit for the Ice Demon without taking any damage.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Cryo%20No%20More",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Dancing with Statues",
                "description": "Receive kill-credit for a Stone Guardian without taking damage from falling rocks.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dancing%20with%20Statues",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Kill It with Fire",
                "description": "Finish off the Ice Demon with a fire spell.",
                "boss": "Chambers of Xeric",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Kill%20It%20with%20Fire",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Mutta-diet",
                "description": "Kill the Muttadile without letting her or her baby recover hitpoints from the meat tree.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mutta-diet",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfectly Balanced",
                "description": "Kill the Vanguards without them resetting their health.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfectly%20Balanced",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Redemption Enthusiast",
                "description": "Kill the Abyssal Portal without forcing Vespula to land.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Redemption%20Enthusiast",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Shayzien Specialist",
                "description": "Receive kill-credit for a Lizardman Shaman without taking damage from any shamans in the room.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Shayzien%20Specialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Together We'll Fall",
                "description": "Kill the Vanguards within 10 seconds of the first one dying.",
                "boss": "Chambers of Xeric",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Together%20We%27ll%20Fall",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Undying Raid Team",
                "description": "Complete a Chambers of Xeric raid without anyone dying.",
                "boss": "Chambers of Xeric",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Undying%20Raid%20Team",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "chambers_of_xeric_challenge_mode": {
        "name": "Chambers of Xeric: Challenge Mode",
        "tasks": [
            {
                "name": "Chambers of Xeric: CM (5-Scale) Speed-Runner",
                "description": "Complete a Chambers of Xeric: Challenge Mode (5-scale) in less than 25 minutes.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%285-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric: CM (Solo) Speed-Runner",
                "description": "Complete a Chambers of Xeric: Challenge Mode (Solo) in less than 38 minutes and 30 seconds.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%28Solo%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric: CM (Trio) Speed-Runner",
                "description": "Complete a Chambers of Xeric: Challenge Mode (Trio) in less than 27 minutes.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%28Trio%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric: CM Grandmaster",
                "description": "Complete the Chambers of Xeric: Challenge Mode 25 times.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Chambers of Xeric: CM (5-Scale) Speed-Chaser",
                "description": "Complete a Chambers of Xeric: Challenge Mode (5-scale) in less than 30 minutes.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%285-Scale%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric: CM (Solo) Speed-Chaser",
                "description": "Complete a Chambers of Xeric: Challenge Mode (Solo) in less than 45 minutes.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%28Solo%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric: CM (Trio) Speed-Chaser",
                "description": "Complete a Chambers of Xeric: Challenge Mode (Trio) in less than 35 minutes.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20%28Trio%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chambers of Xeric: CM Master",
                "description": "Complete the Chambers of Xeric: Challenge Mode 10 times.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chambers%20of%20Xeric%3A%20CM%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Immortal Raid Team",
                "description": "Complete a Chambers of Xeric: Challenge mode raid without anyone dying.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Immortal%20Raid%20Team",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Immortal Raider",
                "description": "Complete a Chambers of Xeric Challenge mode (Solo) raid without dying.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Immortal%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Dust Seeker",
                "description": "Complete a Chambers of Xeric Challenge mode raid in the target time.",
                "boss": "Chambers of Xeric: Challenge Mode",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dust%20Seeker",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "corporeal_beast": {
        "name": "Corporeal Beast",
        "tasks": [
            {
                "name": "Corporeal Beast Master",
                "description": "Kill the Corporeal Beast 50 times.",
                "boss": "Corporeal Beast",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corporeal%20Beast%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chicken Killer",
                "description": "Kill the Corporeal Beast solo.",
                "boss": "Corporeal Beast",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chicken%20Killer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Corporeal Beast Veteran",
                "description": "Kill the Corporeal Beast 25 times.",
                "boss": "Corporeal Beast",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corporeal%20Beast%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Finding the Weak Spot",
                "description": "Finish off the Corporeal Beast with a Crystal Halberd special attack.",
                "boss": "Corporeal Beast",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Finding%20the%20Weak%20Spot",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hot on Your Feet",
                "description": "Kill the Corporeal Beast without anyone killing the dark core or taking damage from the dark core.",
                "boss": "Corporeal Beast",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hot%20on%20Your%20Feet",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "corrupted_hunllef": {
        "name": "Corrupted Hunllef",
        "tasks": [
            {
                "name": "Corrupted Gauntlet Grandmaster",
                "description": "Complete the Corrupted Gauntlet 50 times.",
                "boss": "Corrupted Hunllef",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Gauntlet%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Corrupted Gauntlet Speed-Runner",
                "description": "Complete a Corrupted Gauntlet in less than 6 minutes and 30 seconds.",
                "boss": "Corrupted Hunllef",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Gauntlet%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Egniol Diet II",
                "description": "Kill the Corrupted Hunllef without making an egniol potion within the Corrupted Gauntlet.",
                "boss": "Corrupted Hunllef",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Egniol%20Diet%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Wolf Puncher II",
                "description": "Kill the Corrupted Hunllef without making more than one attuned weapon.",
                "boss": "Corrupted Hunllef",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Wolf%20Puncher%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Corrupted Gauntlet Master",
                "description": "Complete the Corrupted Gauntlet 10 times.",
                "boss": "Corrupted Hunllef",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Gauntlet%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Corrupted Gauntlet Speed-Chaser",
                "description": "Complete a Corrupted Gauntlet in less than 7 minutes and 30 seconds.",
                "boss": "Corrupted Hunllef",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Gauntlet%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Corrupted Warrior",
                "description": "Kill the Corrupted Hunllef with a full set of perfected corrupted armour equipped.",
                "boss": "Corrupted Hunllef",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Warrior",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Defence Doesn't Matter II",
                "description": "Kill the Corrupted Hunllef without making any armour within the Corrupted Gauntlet.",
                "boss": "Corrupted Hunllef",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Defence%20Doesn%27t%20Matter%20II",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Corrupted Hunllef",
                "description": "Kill the Corrupted Hunllef without taking damage from: Tornadoes, Damaging Floor or Stomp Attacks. Also, do not take damage off prayer and do not attack the Corrupted Hunllef with the wrong weapon.",
                "boss": "Corrupted Hunllef",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Corrupted%20Hunllef",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "3, 2, 1 - Mage",
                "description": "Kill the Corrupted Hunllef without taking damage off prayer.",
                "boss": "Corrupted Hunllef",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/3%2C%202%2C%201%20-%20Mage",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Corrupted Gauntlet Veteran",
                "description": "Complete the Corrupted Gauntlet 5 times.",
                "boss": "Corrupted Hunllef",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Corrupted%20Gauntlet%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "crystalline_hunllef": {
        "name": "Crystalline Hunllef",
        "tasks": [
            {
                "name": "Gauntlet Speed-Runner",
                "description": "Complete the Gauntlet in less than 4 minutes.",
                "boss": "Crystalline Hunllef",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Gauntlet%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Defence Doesn't Matter",
                "description": "Kill the Crystalline Hunllef without making any armour within the Gauntlet.",
                "boss": "Crystalline Hunllef",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Defence%20Doesn%27t%20Matter",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Gauntlet Master",
                "description": "Complete the Gauntlet 20 times.",
                "boss": "Crystalline Hunllef",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Gauntlet%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Gauntlet Speed-Chaser",
                "description": "Complete the Gauntlet in less than 5 minutes.",
                "boss": "Crystalline Hunllef",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Gauntlet%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Crystalline Hunllef",
                "description": "Kill the Crystalline Hunllef without taking damage from: Tornadoes, Damaging Floor or Stomp Attacks. Also, do not take damage off prayer and do not attack the Crystalline Hunllef with the wrong weapon.",
                "boss": "Crystalline Hunllef",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Crystalline%20Hunllef",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "3, 2, 1 - Range",
                "description": "Kill the Crystalline Hunllef without taking damage off prayer.",
                "boss": "Crystalline Hunllef",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/3%2C%202%2C%201%20-%20Range",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Crystalline Warrior",
                "description": "Kill the Crystalline Hunllef with a full set of perfected armour equipped.",
                "boss": "Crystalline Hunllef",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Crystalline%20Warrior",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Egniol Diet",
                "description": "Kill the Crystalline Hunllef without making an egniol potion within the Gauntlet.",
                "boss": "Crystalline Hunllef",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Egniol%20Diet",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Gauntlet Veteran",
                "description": "Complete the Gauntlet 5 times.",
                "boss": "Crystalline Hunllef",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Gauntlet%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Wolf Puncher",
                "description": "Kill the Crystalline Hunllef without making more than one attuned weapon.",
                "boss": "Crystalline Hunllef",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Wolf%20Puncher",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "demonic_gorilla": {
        "name": "Demonic Gorilla",
        "tasks": [
            {
                "name": "Hitting Them Where It Hurts",
                "description": "Finish off a Demonic Gorilla with a demonbane weapon.",
                "boss": "Demonic Gorilla",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hitting%20Them%20Where%20It%20Hurts",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "If Gorillas Could Fly",
                "description": "Kill a Demonic Gorilla.",
                "boss": "Demonic Gorilla",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/If%20Gorillas%20Could%20Fly",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "duke_sucellus": {
        "name": "Duke Sucellus",
        "tasks": [
            {
                "name": "Duke Sucellus Sleeper",
                "description": "Kill Awakened Duke Sucellus.",
                "boss": "Duke Sucellus",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Sleeper",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Duke Sucellus Speed-Runner",
                "description": "Kill Duke Sucellus in less than 1:20 minutes without a slayer task.",
                "boss": "Duke Sucellus",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Mirror Image",
                "description": "Kill Duke Sucellus whilst only attacking the boss on the same tick Duke attacks you.",
                "boss": "Duke Sucellus",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mirror%20Image",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Cold Feet",
                "description": "Kill Duke Sucellus without taking any avoidable damage, whilst also never running.",
                "boss": "Duke Sucellus",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Cold%20Feet",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Duke Sucellus Master",
                "description": "Kill Duke Sucellus 50 times.",
                "boss": "Duke Sucellus",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Duke Sucellus Speed-Chaser",
                "description": "Kill Duke Sucellus in less than 1:30 minutes without a slayer task.",
                "boss": "Duke Sucellus",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Duke Sucellus",
                "description": "Kill Duke Sucellus without taking any avoidable damage 5 times without leaving.",
                "boss": "Duke Sucellus",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Duke%20Sucellus",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Duke Sucellus Adept",
                "description": "Kill Duke Sucellus once.",
                "boss": "Duke Sucellus",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Duke Sucellus Speed-Trialist",
                "description": "Kill Duke Sucellus in less than 1:45 minutes without a slayer task.",
                "boss": "Duke Sucellus",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Duke%20Sucellus%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "fortis_colosseum": {
        "name": "Fortis Colosseum",
        "tasks": [
            {
                "name": "Colosseum Grand Champion",
                "description": "Defeat Sol Heredit 10 times.",
                "boss": "Fortis Colosseum",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Colosseum%20Grand%20Champion",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Colosseum Speed-Runner",
                "description": "Complete the Colosseum with a total time of 24:00 or less.",
                "boss": "Fortis Colosseum",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Colosseum%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Footwork",
                "description": "Defeat Sol Heredit without taking any damage from his Spear, Shield, Grapple or Triple Attack.",
                "boss": "Fortis Colosseum",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Footwork",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Reinforcements",
                "description": "Defeat Sol Heredit with \"Bees II\", \"Quartet\" and \"Solarflare II\" modifiers active.",
                "boss": "Fortis Colosseum",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Reinforcements",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Slow Dancing in the Sand",
                "description": "Defeat Sol Heredit without running during the fight with him.",
                "boss": "Fortis Colosseum",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Slow%20Dancing%20in%20the%20Sand",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Colosseum Speed-Chaser",
                "description": "Complete the Colosseum with a total time of 28:00 or less.",
                "boss": "Fortis Colosseum",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Colosseum%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "I Brought Mine Too",
                "description": "Defeat Sol Heredit using only Zamorakian hasta or spear.",
                "boss": "Fortis Colosseum",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20Brought%20Mine%20Too",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "One-off",
                "description": "Complete Wave 11 with either 'Red Flag', 'Dynamic Duo', or 'Doom II' active.",
                "boss": "Fortis Colosseum",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/One-off",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Showboating",
                "description": "Defeat Sol Heredit after using Fortis Salute to the north, east, south and west of the arena while he is below 10% hitpoints.",
                "boss": "Fortis Colosseum",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Showboating",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Sportsmanship",
                "description": "Defeat Sol Heredit once.",
                "boss": "Fortis Colosseum",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Sportsmanship",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Denied",
                "description": "Complete Wave 7 without the Minotaur ever healing other enemies.",
                "boss": "Fortis Colosseum",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Denied",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Furball",
                "description": "Complete Wave 4 without taking avoidable damage from a Manticore.",
                "boss": "Fortis Colosseum",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Furball",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "I was here first!",
                "description": "Kill a Jaguar Warrior using a Claw-type weapon special attack.",
                "boss": "Fortis Colosseum",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20was%20here%20first%21",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "fragment_of_seren": {
        "name": "Fragment of Seren",
        "tasks": [
            {
                "name": "Fragment of Seren Speed-Trialist",
                "description": "Kill The Fragment of Seren in less than 4 minutes.",
                "boss": "Fragment of Seren",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fragment%20of%20Seren%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "galvek": {
        "name": "Galvek",
        "tasks": [
            {
                "name": "Galvek Speed-Trialist",
                "description": "Kill Galvek in less than 3 minutes.",
                "boss": "Galvek",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Galvek%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "glough": {
        "name": "Glough",
        "tasks": [
            {
                "name": "Glough Speed-Trialist",
                "description": "Kill Glough in less than 2 minutes and 30 seconds.",
                "boss": "Glough",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Glough%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "leviathan": {
        "name": "Leviathan",
        "tasks": [
            {
                "name": "Leviathan Sleeper",
                "description": "Kill the Awakened Leviathan.",
                "boss": "Leviathan",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Sleeper",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Leviathan Speed-Runner",
                "description": "Kill the Leviathan in less than 1:10 without a slayer task.",
                "boss": "Leviathan",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Unconventional",
                "description": "Kill the Leviathan using only Mithril ammunition whilst having no more than 25 Hitpoints throughout the entire fight.",
                "boss": "Leviathan",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Unconventional",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Leviathan Master",
                "description": "Kill the Leviathan 50 times.",
                "boss": "Leviathan",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Leviathan Speed-Chaser",
                "description": "Kill the Leviathan in less than 1:25 without a slayer task.",
                "boss": "Leviathan",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Leviathan",
                "description": "Kill the Leviathan perfectly 5 times without leaving.",
                "boss": "Leviathan",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Leviathan",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Serpentine Solo",
                "description": "Kill the Leviathan without stunning the boss more than once.",
                "boss": "Leviathan",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Serpentine%20Solo",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Leviathan Adept",
                "description": "Kill the Leviathan once.",
                "boss": "Leviathan",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Leviathan Speed-Trialist",
                "description": "Kill the Leviathan in less than 1:50 without a slayer task.",
                "boss": "Leviathan",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Leviathan%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "nex": {
        "name": "Nex",
        "tasks": [
            {
                "name": "I should see a doctor",
                "description": "Kill Nex whilst a player is coughing.",
                "boss": "Nex",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20should%20see%20a%20doctor",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nex Duo",
                "description": "Kill Nex with two or less players at the start of the fight.",
                "boss": "Nex",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nex%20Duo",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Nex",
                "description": "Kill Nex whilst completing the requirements for \"There is no escape\", \"Shadows move\", \"A siphon will solve this\", and \"Contain this!\"",
                "boss": "Nex",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Nex",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "A siphon will solve this",
                "description": "Kill Nex without letting her heal from her Blood Siphon special attack.",
                "boss": "Nex",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20siphon%20will%20solve%20this",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Contain this!",
                "description": "Kill Nex without anyone taking damage from any Ice special attack.",
                "boss": "Nex",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Contain%20this%21",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Nex Master",
                "description": "Kill Nex 25 times.",
                "boss": "Nex",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nex%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Nex Trio",
                "description": "Kill Nex with three or less players at the start of the fight.",
                "boss": "Nex",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nex%20Trio",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Shadows Move...",
                "description": "Kill Nex without anyone being hit by the Shadow Smash attack.",
                "boss": "Nex",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Shadows%20Move...",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "There is no escape!",
                "description": "Kill Nex without anyone being hit by the Smoke Dash special attack.",
                "boss": "Nex",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/There%20is%20no%20escape%21",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Nex Survivors",
                "description": "Kill Nex without anyone dying.",
                "boss": "Nex",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nex%20Survivors",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Nex Veteran",
                "description": "Kill Nex once.",
                "boss": "Nex",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nex%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "phosanis_nightmare": {
        "name": "Phosani's Nightmare",
        "tasks": [
            {
                "name": "Can't Wake Up",
                "description": "Kill Phosani's Nightmare 5 times in a row without leaving Phosani's Dream.",
                "boss": "Phosani's Nightmare",
                "type": "Stamina",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%27t%20Wake%20Up",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Phosani's Nightmare",
                "description": "Kill Phosani's Nightmare while only taking damage from husks, power blasts and weakened Parasites. Also, without having your attacks slowed by the Nightmare Spores or letting a Sleepwalker reach Phosani's Nightmare.",
                "boss": "Phosani's Nightmare",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Phosani%27s%20Nightmare",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Phosani's Grandmaster",
                "description": "Kill Phosani's Nightmare 25 times.",
                "boss": "Phosani's Nightmare",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phosani%27s%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Phosani's Speedrunner",
                "description": "Defeat Phosani's Nightmare within 7:30 minutes.",
                "boss": "Phosani's Nightmare",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phosani%27s%20Speedrunner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Crush Hour",
                "description": "Kill Phosani's Nightmare while killing every parasite and husk in one hit.",
                "boss": "Phosani's Nightmare",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Crush%20Hour",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Dreamland Express",
                "description": "Kill Phosani's Nightmare without a sleepwalker reaching her during her desperation phase.",
                "boss": "Phosani's Nightmare",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dreamland%20Express",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "I Would Simply React",
                "description": "Kill Phosani's Nightmare without allowing your prayer to be disabled.",
                "boss": "Phosani's Nightmare",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%20Would%20Simply%20React",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Phosani's Master",
                "description": "Kill Phosani's Nightmare 5 times.",
                "boss": "Phosani's Nightmare",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phosani%27s%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Phosani's Speedchaser",
                "description": "Defeat Phosani's Nightmare within 9 minutes.",
                "boss": "Phosani's Nightmare",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phosani%27s%20Speedchaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Phosani's Veteran",
                "description": "Kill Phosani's Nightmare once.",
                "boss": "Phosani's Nightmare",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Phosani%27s%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "the_mimic": {
        "name": "The Mimic",
        "tasks": [
            {
                "name": "Mimic Veteran",
                "description": "Kill the Mimic once.",
                "boss": "The Mimic",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Mimic%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "theatre_of_blood": {
        "name": "Theatre of Blood",
        "tasks": [
            {
                "name": "Morytania Only",
                "description": "Complete the Theatre of Blood without any member of the team equipping a non-barrows weapon (except Dawnbringer).",
                "boss": "Theatre of Blood",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Morytania%20Only",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Theatre",
                "description": "Complete the Theatre of Blood without anyone dying through any means and whilst everyone in the team completes the following Combat Achievement tasks in a single run: \"Perfect Maiden\", \"Perfect Bloat\", \"Perfect Nylocas\", \"Perfect Sotetseg\", \"Perfect Xarpus\" and \"Perfect Verzik\".",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Theatre",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre (4-Scale) Speed-Runner",
                "description": "Complete the Theatre of Blood (4-scale) in less than 15 minutes.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%284-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre (5-Scale) Speed-Runner",
                "description": "Complete the Theatre of Blood (5-scale) in less than 14 minutes and 15 seconds.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%285-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre (Duo) Speed-Runner",
                "description": "Complete the Theatre of Blood (Duo) in less than 26 minutes.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%28Duo%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre (Trio) Speed-Runner",
                "description": "Complete the Theatre of Blood (Trio) in less than 17 minutes and 30 seconds.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%28Trio%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre of Blood Grandmaster",
                "description": "Complete the Theatre of Blood 150 times.",
                "boss": "Theatre of Blood",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "A Timely Snack",
                "description": "Kill Sotetseg after surviving at least 3 ball attacks without sharing the damage and without anyone dying throughout the fight.",
                "boss": "Theatre of Blood",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Timely%20Snack",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Back in My Day...",
                "description": "Complete the Theatre of Blood without any member of the team equipping a Scythe of Vitur.",
                "boss": "Theatre of Blood",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Back%20in%20My%20Day...",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Can You Dance?",
                "description": "Kill Xarpus without anyone in the team using a ranged or magic weapon.",
                "boss": "Theatre of Blood",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%20You%20Dance%3F",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Can't Drain This",
                "description": "Kill The Maiden of Sugadinti without anyone in the team losing any prayer points.",
                "boss": "Theatre of Blood",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Can%27t%20Drain%20This",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Bloat",
                "description": "Kill the Pestilent Bloat without anyone in the team taking damage from the following sources: Pestilent flies, Falling body parts or The Pestilent Bloats stomp attack.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Bloat",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Maiden",
                "description": "Kill The Maiden of Sugadinti without anyone in the team taking damage from the following sources: Blood Spawn projectiles and Blood Spawn trails. Also, without taking damage off prayer and without letting any of the Nylocas Matomenos heal The Maiden.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Maiden",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Nylocas",
                "description": "Kill the Nylocas Vasilias without anyone in the team attacking any Nylocas with the wrong attack style, without letting a pillar collapse and without getting hit by any of the Nylocas Vasilias attacks whilst off prayer.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Nylocas",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Sotesteg",
                "description": "Kill Sotetseg without anyone in the team stepping on the wrong tile in the maze, without getting hit by the tornado and without taking any damage from Sotetseg's attacks whilst off prayer.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Sotesteg",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Verzik",
                "description": "Defeat Verzik Vitur without anyone in the team taking damage from Verzik Vitur's attacks other than her spider form's correctly prayed against regular magical and ranged attacks.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Verzik",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Xarpus",
                "description": "Kill Xarpus without anyone in the team taking any damage from Xarpus' attacks and without letting an exhumed heal Xarpus more than twice.",
                "boss": "Theatre of Blood",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Xarpus",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Pop It",
                "description": "Kill Verzik without any Nylocas being frozen and without anyone taking damage from the Nylocas.",
                "boss": "Theatre of Blood",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Pop%20It",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Theatre (4-Scale) Speed-Chaser",
                "description": "Complete the Theatre of Blood (4-scale) in less than 17 minutes.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%284-Scale%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Theatre (5-Scale) Speed-Chaser",
                "description": "Complete the Theatre of Blood (5-scale) in less than 16 minutes.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%285-Scale%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Theatre (Trio) Speed-Chaser",
                "description": "Complete the Theatre of Blood (Trio) in less than 20 minutes.",
                "boss": "Theatre of Blood",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20%28Trio%29%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Theatre of Blood Master",
                "description": "Complete the Theatre of Blood 75 times.",
                "boss": "Theatre of Blood",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Two-Down",
                "description": "Kill the Pestilent Bloat before he shuts down for the third time.",
                "boss": "Theatre of Blood",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Two-Down",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Theatre of Blood Veteran",
                "description": "Complete the Theatre of Blood 25 times.",
                "boss": "Theatre of Blood",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "thermonuclear_smoke_devil": {
        "name": "Thermonuclear Smoke Devil",
        "tasks": [
            {
                "name": "Hazard Prevention",
                "description": "Kill the Thermonuclear Smoke Devil without it hitting anyone.",
                "boss": "Thermonuclear Smoke Devil",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hazard%20Prevention",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Spec'd Out",
                "description": "Kill the Thermonuclear Smoke Devil using only special attacks.",
                "boss": "Thermonuclear Smoke Devil",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Spec%27d%20Out",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Thermonuclear Veteran",
                "description": "Kill the Thermonuclear Smoke Devil 20 times.",
                "boss": "Thermonuclear Smoke Devil",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Thermonuclear%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tombs_of_amascut": {
        "name": "Tombs of Amascut",
        "tasks": [
            {
                "name": "Better get movin'",
                "description": "Defeat Elidinis' Warden in phase three of the Wardens fight with 'Aerial Assault', 'Stay vigilant' and 'Insanity' invocations activated and without dying yourself.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Better%20get%20movin%27",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Chompington",
                "description": "Defeat Zebak using only melee attacks and without dying yourself.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Chompington",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Akkha",
                "description": "Complete Akkha in a group of two or more, without anyone taking any damage from the following: Akkha's attacks off-prayer, Akkha's special attacks (orbs, memory, detonate), exploding shadow timers, orbs in the enrage phase or attacking Akkha with the wrong style. You must have all Akkha invocations activated.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Akkha",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Ba-Ba",
                "description": "Defeat Ba-Ba in a group of two or more, without anyone taking any damage from the following: Ba-Ba's Attacks off-prayer, Ba-Ba's slam, rolling boulders, rubble attack or falling rocks. No sarcophagi may be opened. You must have all Ba-Ba invocations activated.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Ba-Ba",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Kephri",
                "description": "Defeat Kephri in a group of two or more, without anyone taking any damage from the following: egg explosions, Kephri's attacks, Exploding Scarabs, Bodyguards, dung attacks. No eggs may hatch throughout the fight.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Kephri",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Scabaras",
                "description": "Complete the Scabaras room in less than a minute without anyone taking any damage from puzzles.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Scabaras",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Wardens",
                "description": "Defeat The Wardens in a group of two or more, without anyone taking avoidable damage from the following: Warden attacks, obelisk attacks, lightning attacks in phase three, skull attack in phase three, Demi god attacks in phase three. You must have all Wardens invocations activated.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Wardens",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Zebak",
                "description": "Defeat Zebak without anyone taking any damage from: poison, Zebak's basic attacks off-prayer, blood spawns and waves. You also must not push more than two jugs on the roar attack during the fight (you may destroy stationary ones). You must have all Zebak invocations activated.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Zebak",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Tomb Looter",
                "description": "Complete the Tombs of Amascut 25 times.",
                "boss": "Tombs of Amascut",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tomb%20Looter",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Tomb Raider",
                "description": "Complete the Tombs of Amascut 50 times.",
                "boss": "Tombs of Amascut",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tomb%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Tombs Speed Runner",
                "description": "Complete the Tombs of Amascut (normal) within 18 mins at any group size.",
                "boss": "Tombs of Amascut",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tombs%20Speed%20Runner",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "You are not prepared",
                "description": "Complete a full Tombs of Amascut raid only using supplies given inside the tomb and without anyone dying.",
                "boss": "Tombs of Amascut",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/You%20are%20not%20prepared",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Down Do Specs",
                "description": "Defeat the Wardens after staggering the boss a maximum of twice during phase two, without dying yourself.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Down%20Do%20Specs",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Dropped the ball",
                "description": "Defeat Akkha without dropping any materialising orbs and without dying yourself.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dropped%20the%20ball",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hardcore Raiders",
                "description": "Complete the Tombs of Amascut in a group of two or more without anyone dying.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hardcore%20Raiders",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Hardcore Tombs",
                "description": "Complete the Tombs of Amascut solo without dying.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hardcore%20Tombs",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Helpful spirit who?",
                "description": "Complete the Tombs of Amascut without using any supplies from the Helpful Spirit and without anyone dying. Honey locusts are included in this restriction.",
                "boss": "Tombs of Amascut",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Helpful%20spirit%20who%3F",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "I'm in a rush",
                "description": "Defeat Ba-Ba after destroying four or fewer rolling boulders in total without dying yourself.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/I%27m%20in%20a%20rush",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "No skipping allowed",
                "description": "Defeat Ba-Ba after only attacking the non-weakened boulders in the rolling boulder phase, without dying yourself. The Boulderdash invocation must be activated.",
                "boss": "Tombs of Amascut",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20skipping%20allowed",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Apmeken",
                "description": "Complete the Apmeken room in a group of two or more, without anyone allowing any dangers to trigger, standing in venom or being hit by a volatile baboon. You must complete this room in less than three minutes.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Apmeken",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Crondis",
                "description": "Complete the Crondis room without letting a crocodile get to the tree, without anyone losing water from their container and in under one minute.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Crondis",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Perfect Het",
                "description": "Complete the Het room without taking any damage from the light beam and orbs. You must destroy the core after one exposure.",
                "boss": "Tombs of Amascut",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Het",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Tomb Explorer",
                "description": "Complete the Tombs of Amascut once.",
                "boss": "Tombs of Amascut",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tomb%20Explorer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tombs_of_amascut_expert_mode": {
        "name": "Tombs of Amascut: Expert Mode",
        "tasks": [
            {
                "name": "Akkhan't Do it",
                "description": "Defeat Akkha with all Akkha invocations activated and the path levelled up to at least four, without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Akkhan%27t%20Do%20it",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "All Praise Zebak",
                "description": "Defeat Zebak without losing a single prayer point. You must also meet the conditions of the 'Rockin' Around The Croc' achievement.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/All%20Praise%20Zebak",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Amascut's Remnant",
                "description": "Complete the Tombs of Amascut at raid level 500 or above without anyone dying.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Amascut%27s%20Remnant",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Expert Tomb Raider",
                "description": "Complete the Tombs of Amascut (Expert mode) 50 times.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Expert%20Tomb%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Insanity",
                "description": "Complete 'Perfect Wardens' at expert or above.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Insanity",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Maybe I'm the boss.",
                "description": "Complete a Tombs of Amascut raid with every single boss invocation activated and without anyone dying.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Maybe%20I%27m%20the%20boss.",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfection of Apmeken",
                "description": "Complete 'Perfect Apmeken' and 'Perfect Ba-Ba' in a single run of the Tombs of Amascut.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfection%20of%20Apmeken",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfection of Crondis",
                "description": "Complete 'Perfect Crondis' and 'Perfect Zebak' in a single run of the Tombs of Amascut.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfection%20of%20Crondis",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfection of Het",
                "description": "Complete 'Perfect Het' and 'Perfect Akkha' in a single run of the Tombs of Amascut.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfection%20of%20Het",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfection of Scabaras",
                "description": "Complete 'Perfect Scabaras' and 'Perfect Kephri' in a single run of Tombs of Amascut.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfection%20of%20Scabaras",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Tombs Speed Runner II",
                "description": "Complete the Tombs of Amascut (expert) within 20 mins at any group size.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tombs%20Speed%20Runner%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Tombs Speed Runner III",
                "description": "Complete the Tombs of Amascut (expert) within 18 mins in a group of 8.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tombs%20Speed%20Runner%20III",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "All out of medics",
                "description": "Defeat Kephri without letting her heal above 25% after the first down. The 'Medic' invocation must be activated. You must do this without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/All%20out%20of%20medics",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Ba-Bananza",
                "description": "Defeat Ba-Ba with all Ba-Ba invocations activated and the path levelled up to at least four, without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Ba-Bananza",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "But... Damage",
                "description": "Complete the Tombs of Amascut without anyone in your party wearing or holding any equipment at tier 75 or above.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/But...%20Damage",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Doesn't bug me",
                "description": "Defeat Kephri with all Kephri invocations activated and the path levelled up to at least four, without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Doesn%27t%20bug%20me",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Expert Tomb Looter",
                "description": "Complete the Tombs of Amascut (Expert mode) 25 times.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Expert%20Tomb%20Looter",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Fancy feet",
                "description": "Complete phase three of The Wardens in a group of two or more, using only melee attacks and without dying yourself. The 'Insanity' invocation must be activated.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fancy%20feet",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Resourceful Raider",
                "description": "Complete the Tombs of Amascut with the \"On a diet\" and \"Dehydration\" invocations activated and without anyone dying.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Resourceful%20Raider",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Rockin' around the croc",
                "description": "Defeat Zebak with all Zebak invocations activated and the path levelled up to at least four, without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Rockin%27%20around%20the%20croc",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Something of an expert myself",
                "description": "Complete the Tombs of Amascut raid at level 350 or above without anyone dying.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Something%20of%20an%20expert%20myself",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Warden't you believe it",
                "description": "Defeat the Wardens with all Wardens invocations activated, at expert level and without dying yourself.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Warden%27t%20you%20believe%20it",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Expert Tomb Explorer",
                "description": "Complete the Tombs of Amascut (Expert mode) once.",
                "boss": "Tombs of Amascut: Expert Mode",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Expert%20Tomb%20Explorer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tormented_demons": {
        "name": "Tormented Demons",
        "tasks": [
            {
                "name": "Three Times the Thrashing",
                "description": "Kill three Tormented Demons within 3 seconds.",
                "boss": "Tormented Demons",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Three%20Times%20the%20Thrashing",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Rapid Reload",
                "description": "Hit three Tormented Demons within 3 seconds using a ballista or a crossbow",
                "boss": "Tormented Demons",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Rapid%20Reload",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Through Fire and Flames",
                "description": "Kill a Tormented Demon whilst their shield is inactive.",
                "boss": "Tormented Demons",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Through%20Fire%20and%20Flames",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Two Times the Torment",
                "description": "Kill two Tormented Demons within 2 seconds.",
                "boss": "Tormented Demons",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Two%20Times%20the%20Torment",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Unending Torment",
                "description": "Kill a Tormented Demon.",
                "boss": "Tormented Demons",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Unending%20Torment",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tzhaar_ket_raks_challenges": {
        "name": "TzHaar-Ket-Rak's Challenges",
        "tasks": [
            {
                "name": "It Wasn't a Fluke",
                "description": "Complete TzHaar-Ket-Rak's fifth and sixth challenges back to back without failing.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/It%20Wasn%27t%20a%20Fluke",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "The VI Jad Challenge",
                "description": "Complete TzHaar-Ket-Rak's sixth challenge.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20VI%20Jad%20Challenge",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "TzHaar-Ket-Rak's Speed-Runner",
                "description": "Complete TzHaar-Ket-Rak's fifth challenge in less than 5 minutes.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Facing Jad Head-on IV",
                "description": "Complete TzHaar-Ket-Rak's fourth challenge with only melee.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Facing%20Jad%20Head-on%20IV",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Multi-Style Specialist",
                "description": "Complete TzHaar-Ket-Rak's third challenge while using a different attack style for each JalTok-Jad.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Multi-Style%20Specialist",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Supplies? Who Needs 'em?",
                "description": "Complete TzHaar-Ket-Rak's third challenge without having anything in your inventory.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Supplies%3F%20Who%20Needs%20%27em%3F",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "The IV Jad Challenge",
                "description": "Complete TzHaar-Ket-Rak's fourth challenge.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20IV%20Jad%20Challenge",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "TzHaar-Ket-Rak's Speed-Chaser",
                "description": "Complete TzHaar-Ket-Rak's third challenge in less than 3 minutes.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Facing Jad Head-on III",
                "description": "Complete TzHaar-Ket-Rak's second challenge with only melee.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Facing%20Jad%20Head-on%20III",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "The II Jad Challenge",
                "description": "Complete TzHaar-Ket-Rak's second challenge.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20II%20Jad%20Challenge",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "TzHaar-Ket-Rak's Speed-Trialist",
                "description": "Complete TzHaar-Ket-Rak's first challenge in less than 45 seconds.",
                "boss": "TzHaar-Ket-Rak's Challenges",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tzkal_zuk": {
        "name": "TzKal-Zuk",
        "tasks": [
            {
                "name": "Budget Setup",
                "description": "Kill Tzkal-Zuk without equipping a Twisted Bow within the Inferno.",
                "boss": "TzKal-Zuk",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Budget%20Setup",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Facing Jad Head-on II",
                "description": "Kill Tzkal-Zuk without equipping any range or mage weapons before wave 69.",
                "boss": "TzKal-Zuk",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Facing%20Jad%20Head-on%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Inferno Grandmaster",
                "description": "Complete the Inferno 5 times.",
                "boss": "TzKal-Zuk",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Inferno%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Inferno Speed-Runner",
                "description": "Complete the Inferno in less than 65 minutes.",
                "boss": "TzKal-Zuk",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Inferno%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Jad? What Are You Doing Here?",
                "description": "Kill Tzkal-Zuk without killing the JalTok-Jad which spawns during wave 69.",
                "boss": "TzKal-Zuk",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Jad%3F%20What%20Are%20You%20Doing%20Here%3F",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nibbler Chaser",
                "description": "Kill Tzkal-Zuk without using any magic spells during any wave in the Inferno.",
                "boss": "TzKal-Zuk",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nibbler%20Chaser",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "No Luck Required",
                "description": "Kill Tzkal-Zuk without being attacked by TzKal-Zuk and without taking damage from a JalTok-Jad.",
                "boss": "TzKal-Zuk",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20Luck%20Required",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Playing with Jads",
                "description": "Complete wave 68 of the Inferno within 30 seconds of the first JalTok-Jad dying.",
                "boss": "TzKal-Zuk",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Playing%20with%20Jads",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "The Floor Is Lava",
                "description": "Kill Tzkal-Zuk without letting Jal-ImKot dig during any wave in the Inferno.",
                "boss": "TzKal-Zuk",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Floor%20Is%20Lava",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Wasn't Even Close",
                "description": "Kill Tzkal-Zuk without letting your hitpoints fall below 50 during any wave in the Inferno.",
                "boss": "TzKal-Zuk",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Wasn%27t%20Even%20Close",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nibblers, Begone!",
                "description": "Kill Tzkal-Zuk without letting a pillar fall before wave 67.",
                "boss": "TzKal-Zuk",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nibblers%2C%20Begone%21",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Half-Way There",
                "description": "Kill a Jal-Zek within the Inferno.",
                "boss": "TzKal-Zuk",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Half-Way%20There",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "tztok_jad": {
        "name": "TzTok-Jad",
        "tasks": [
            {
                "name": "Denying the Healers II",
                "description": "Complete the Fight Caves without TzTok-Jad being healed by a Yt-HurKot.",
                "boss": "TzTok-Jad",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Denying%20the%20Healers%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Fight Caves Speed-Runner",
                "description": "Complete the Fight Caves in less than 26 minutes and 30 seconds.",
                "boss": "TzTok-Jad",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fight%20Caves%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "No Time for a Drink",
                "description": "Complete the Fight Caves without losing any prayer points.",
                "boss": "TzTok-Jad",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/No%20Time%20for%20a%20Drink",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Denying the Healers",
                "description": "Complete the Fight caves without letting any of the Yt-MejKot heal.",
                "boss": "TzTok-Jad",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Denying%20the%20Healers",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Fight Caves Master",
                "description": "Complete the Fight Caves 5 times.",
                "boss": "TzTok-Jad",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fight%20Caves%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Fight Caves Speed-Chaser",
                "description": "Complete the Fight Caves in less than 30 minutes.",
                "boss": "TzTok-Jad",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fight%20Caves%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "You Didn't Say Anything About a Bat",
                "description": "Complete the Fight Caves without being attacked by a Tz-Kih.",
                "boss": "TzTok-Jad",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/You%20Didn%27t%20Say%20Anything%20About%20a%20Bat",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "A Near Miss!",
                "description": "Complete the Fight Caves after surviving a hit from TzTok-Jad without praying.",
                "boss": "TzTok-Jad",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/A%20Near%20Miss%21",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Facing Jad Head-on",
                "description": "Complete the Fight Caves with only melee.",
                "boss": "TzTok-Jad",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Facing%20Jad%20Head-on",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Fight Caves Veteran",
                "description": "Complete the Fight Caves once.",
                "boss": "TzTok-Jad",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Fight%20Caves%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "vardorvis": {
        "name": "Vardorvis",
        "tasks": [
            {
                "name": "Axe Enthusiast",
                "description": "Kill Vardorvis after surviving for 3 minutes of Vardorvis' max speed, and never leaving the centre 25 tiles.",
                "boss": "Vardorvis",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Axe%20Enthusiast",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Vardorvis Sleeper",
                "description": "Kill Awakened Vardorvis.",
                "boss": "Vardorvis",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Sleeper",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Vardorvis Speed-Runner",
                "description": "Kill Vardorvis in less than 0:55 without a slayer task.",
                "boss": "Vardorvis",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Budget Cutter",
                "description": "Kill Vardorvis with gear worth 2m or less in total.",
                "boss": "Vardorvis",
                "type": "Restriction",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Budget%20Cutter",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Perfect Vardorvis",
                "description": "Kill the Vardorvis perfectly 5 times without leaving.",
                "boss": "Vardorvis",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Vardorvis",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Vardorvis Master",
                "description": "Kill Vardorvis 50 times.",
                "boss": "Vardorvis",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Vardorvis Speed-Chaser",
                "description": "Kill Vardorvis in less than 1:05 without a slayer task.",
                "boss": "Vardorvis",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Vardorvis Adept",
                "description": "Kill Vardorvis once.",
                "boss": "Vardorvis",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Vardorvis Speed-Trialist",
                "description": "Kill Vardorvis in less than 1:15 minutes without a slayer task.",
                "boss": "Vardorvis",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vardorvis%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "vorkath": {
        "name": "Vorkath",
        "tasks": [
            {
                "name": "Faithless Encounter",
                "description": "Kill Vorkath without losing any prayer points.",
                "boss": "Vorkath",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Faithless%20Encounter",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "The Fremennik Way",
                "description": "Kill Vorkath with only your fists.",
                "boss": "Vorkath",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Fremennik%20Way",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Vorkath Speed-Runner",
                "description": "Kill Vorkath in less than 54 seconds.",
                "boss": "Vorkath",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vorkath%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Dodging the Dragon",
                "description": "Kill Vorkath 5 times without taking any damage from his special attacks and without leaving his area.",
                "boss": "Vorkath",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dodging%20the%20Dragon",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Extended Encounter",
                "description": "Kill Vorkath 10 times without leaving his area.",
                "boss": "Vorkath",
                "type": "Stamina",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Extended%20Encounter",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "The Walk",
                "description": "Hit Vorkath 12 times during the acid special without getting hit by his rapid fire or the acid pools.",
                "boss": "Vorkath",
                "type": "Mechanical",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Walk",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Vorkath Master",
                "description": "Kill Vorkath 100 times.",
                "boss": "Vorkath",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vorkath%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Vorkath Speed-Chaser",
                "description": "Kill Vorkath in less than 1 minute and 15 seconds.",
                "boss": "Vorkath",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vorkath%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Stick 'em With the Pointy End",
                "description": "Kill Vorkath using melee weapons only.",
                "boss": "Vorkath",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Stick%20%27em%20With%20the%20Pointy%20End",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Vorkath Veteran",
                "description": "Kill Vorkath 50 times.",
                "boss": "Vorkath",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Vorkath%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Zombie Destroyer",
                "description": "Kill Vorkath's zombified spawn without using crumble undead.",
                "boss": "Vorkath",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zombie%20Destroyer",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "whisperer": {
        "name": "Whisperer",
        "tasks": [
            {
                "name": "Dark Memories",
                "description": "Kill the Whisperer whilst spending less than 6 seconds in the pre-enrage shadow realm.",
                "boss": "Whisperer",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Dark%20Memories",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Whispered",
                "description": "Kill the Awakened Whisperer.",
                "boss": "Whisperer",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whispered",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Whisperer Speed-Runner",
                "description": "Kill the Whisperer in less than 2:00 without a slayer task.",
                "boss": "Whisperer",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whisperer%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Perfect Whisperer",
                "description": "Kill the Whisperer without taking avoidable damage 5 times without leaving.",
                "boss": "Whisperer",
                "type": "Perfection",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Whisperer",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Whisperer Master",
                "description": "Kill the Whisperer 50 times.",
                "boss": "Whisperer",
                "type": "Kill Count",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whisperer%20Master",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Whisperer Speed-Chaser",
                "description": "Kill the Whisperer in less than 2:25 without a slayer task.",
                "boss": "Whisperer",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whisperer%20Speed-Chaser",
                "notes": "",
                "achieved": false,
                "tier": "master"
            },
            {
                "name": "Tentacular",
                "description": "Kill the Whisperer whilst only being on the Arceuus spellbook.",
                "boss": "Whisperer",
                "type": "Restriction",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Tentacular",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Whisperer Adept",
                "description": "Kill the Whisperer once.",
                "boss": "Whisperer",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whisperer%20Adept",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Whisperer Speed-Trialist",
                "description": "Kill the Whisperer in less than 3:00 without a slayer task.",
                "boss": "Whisperer",
                "type": "Speed",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Whisperer%20Speed-Trialist",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "zalcano": {
        "name": "Zalcano",
        "tasks": [
            {
                "name": "Perfect Zalcano",
                "description": "Kill Zalcano 5 times in a row without leaving or getting hit by the following: Falling rocks, rock explosions, Zalcano powering up, or standing in a red symbol.",
                "boss": "Zalcano",
                "type": "Perfection",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Perfect%20Zalcano",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Team Player",
                "description": "Receive imbued tephra from a golem.",
                "boss": "Zalcano",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Team%20Player",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "The Spurned Hero",
                "description": "Kill Zalcano as the player who has dealt the most damage to her.",
                "boss": "Zalcano",
                "type": "Mechanical",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/The%20Spurned%20Hero",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            },
            {
                "name": "Zalcano Veteran",
                "description": "Kill Zalcano 25 times.",
                "boss": "Zalcano",
                "type": "Kill Count",
                "points": 4,
                "wikiLink": "https://oldschool.runescape.wiki/w/Zalcano%20Veteran",
                "notes": "",
                "achieved": false,
                "tier": "elite"
            }
        ]
    },
    "theatre_of_blood_hard_mode": {
        "name": "Theatre of Blood: Hard Mode",
        "tasks": [
            {
                "name": "Harder Mode I",
                "description": "Defeat Sotetseg in the Theatre of Blood: Hard Mode without anyone sharing the ball with anyone, without anyone dying, and without anyone taking damage from any of its other attacks or stepping on the wrong tile in the maze.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Harder%20Mode%20I",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Harder Mode II",
                "description": "Defeat Xarpus in the Theatre of Blood: Hard Mode after letting the exhumeds heal him to full health and without anyone in the team taking any damage.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Perfection",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Harder%20Mode%20II",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Harder Mode III",
                "description": "Defeat Verzik Vitur in the Theatre of Blood: Hard Mode without anyone attacking her with a melee weapon during her third phase.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Harder%20Mode%20III",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Nylo Sniper",
                "description": "Defeat Verzik Vitur's in the Theatre of Blood: Hard Mode without anyone in your team causing a Nylocas to explode by getting too close.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Nylo%20Sniper",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Pack Like a Yak",
                "description": "Complete the Theatre of Blood: Hard Mode within the challenge time, with no deaths and without anyone buying anything from a supply chest.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Restriction",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Pack%20Like%20a%20Yak",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Personal Space",
                "description": "Defeat the Pestilent Bloat in the Theatre of Blood: Hard Mode with a least 3 people in the room, without anyone in your team standing on top of each other.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Personal%20Space",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Royal Affairs",
                "description": "In the Theatre of Blood: Hard Mode, complete the Nylocas room without ever letting the Nylocas Prinkipas change styles.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Royal%20Affairs",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Stop Right There!",
                "description": "Defeat the Maiden of Sugadinti in the Theatre of Blood: Hard Mode without letting blood spawns create more than 15 blood trails.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Stop%20Right%20There%21",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Team Work Makes the Dream Work",
                "description": "When Verzik Vitur in the Theatre of Blood: Hard Mode uses her yellow power blast attack while the tornadoes are active, have everyone get through the attack without taking damage. This cannot be completed with one player alive",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Mechanical",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Team%20Work%20Makes%20the%20Dream%20Work",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre of Blood: HM Grandmaster",
                "description": "Complete the Theatre of Blood: Hard Mode 50 times.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Kill Count",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%20of%20Blood%3A%20HM%20Grandmaster",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre: HM (4-Scale) Speed-Runner",
                "description": "Complete the Theatre of Blood: Hard Mode (4-scale) with an overall time of less than 21 minutes.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%3A%20HM%20%284-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre: HM (5-Scale) Speed-Runner",
                "description": "Complete the Theatre of Blood: Hard Mode (5-scale) with an overall time of less than 19 minutes.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%3A%20HM%20%285-Scale%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Theatre: HM (Trio) Speed-Runner",
                "description": "Complete the Theatre of Blood: Hard Mode (Trio) with an overall time of less than 23 minutes.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Speed",
                "points": 6,
                "wikiLink": "https://oldschool.runescape.wiki/w/Theatre%3A%20HM%20%28Trio%29%20Speed-Runner",
                "notes": "",
                "achieved": false,
                "tier": "grandmaster"
            },
            {
                "name": "Hard Mode? Completed It",
                "description": "Complete the Theatre of Blood: Hard Mode within the challenge time.",
                "boss": "Theatre of Blood: Hard Mode",
                "type": "Speed",
                "points": 5,
                "wikiLink": "https://oldschool.runescape.wiki/w/Hard%20Mode%3F%20Completed%20It",
                "notes": "",
                "achieved": false,
                "tier": "master"
            }
        ]
    }
};