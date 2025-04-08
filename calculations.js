import { skillRequirements } from './data.js'; // Needs access to skillRequirements

/**
 * Calculates the OSRS combat level based on skill levels.
 * @param {object} levels - An object containing skill levels (e.g., { Attack: 99, Strength: 99, ... })
 * @returns {number} The calculated combat level (integer).
 */
export function calculateCombatLevel(levels) {
    const attack = levels.Attack || 1;
    const strength = levels.Strength || 1;
    const defence = levels.Defence || 1;
    const hitpoints = levels.Hitpoints || 10;
    const prayer = levels.Prayer || 1;
    const ranged = levels.Ranged || 1;
    const magic = levels.Magic || 1;

    const base = 0.25 * (defence + hitpoints + Math.floor(prayer / 2));
    const melee = 0.325 * (attack + strength);
    const range = 0.325 * (Math.floor(ranged * 1.5));
    const mage = 0.325 * (Math.floor(magic * 1.5));

    const combatLevel = base + Math.max(melee, range, mage);

    return Math.floor(combatLevel);
}

export function totalXpForLevel(level) {
    let points = 0;
    let output = 0;
    for (let lvl = 1; lvl < level; lvl++) {
        points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
        output = Math.floor(points / 4);
    }
    return output;
}

export function xpBetweenLevels(currentLevel, requiredLevel) {
    if (currentLevel >= requiredLevel) return 0;
    // Calculate XP at the start of the required level
    const xpAtRequired = totalXpForLevel(requiredLevel);
    // Get current XP based on current level
    const currentXP = totalXpForLevel(currentLevel); // Assumes you don't store exact XP, only level

    // This isn't quite right if you don't store exact XP.
    // A simpler way for level-based display:
    // return totalXpForLevel(requiredLevel) - totalXpForLevel(currentLevel);
    // But the original function might be closer if you intend to store exact XP later.
    // For now, let's stick to the level difference calculation for simplicity unless exact XP is stored/fetched.
    return Math.max(0, totalXpForLevel(requiredLevel) - totalXpForLevel(currentLevel));
}


export function formatXp(xp) {
    if (xp <= 0) return "0";
    if (xp >= 1000000000) return (xp / 1000000000).toFixed(1) + "B";
    if (xp >= 1000000) return (xp / 1000000).toFixed(1) + "M";
    if (xp >= 1000) return (xp / 1000).toFixed(1) + "K";
    return xp.toLocaleString();
}

export function calculateHoursNeeded(xpNeeded, xpPerHour) {
    if (xpNeeded <= 0 || xpPerHour <= 0) return 0;
    return xpNeeded / xpPerHour;
}

export function parseBoostAmount(boostString) {
    if (!boostString || boostString === "N/A") return 0;
    const match = boostString.match(/^\+(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

export function recalculateSkillNeeds() {
    skillRequirements.forEach(skill => {
        if (skill.required > 1) {
            skill.levels = Math.max(0, skill.required - skill.current);
            // Ensure xpBetweenLevels exists in this file or is imported
            skill.xpNeeded = xpBetweenLevels(skill.current, skill.required);
        } else {
            skill.levels = 0;
            skill.xpNeeded = 0;
        }
    });
}