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