// storage.js
// Description: Handles loading from and saving data to localStorage.

// --- IMPORTS ---
// Data structures to load into or save from
import {
    skillRequirements, miscellaneousGoals, milestoneGoalsData, gearProgressionData,
    DEFAULT_SKILL_RATES, customSkillXPRates, combatAchievementsData,
    diaryCompletionState,
    questCompletionState // <--- Import the new state variable for quests
} from './data.js';

// Calculation functions needed for data processing
import { recalculateSkillNeeds } from './calculations.js';

// --- Skill Levels & Rates ---

export function loadSkillLevels() {
    const savedLevels = localStorage.getItem('skillLevels');
    let loadedSomething = false;
    if (savedLevels) {
        try {
            const levels = JSON.parse(savedLevels);
            if (Array.isArray(levels)) {
                levels.forEach(savedSkill => {
                    const skill = skillRequirements.find(s => s.skill === savedSkill.skill);
                    if (skill && typeof savedSkill.level === 'number') {
                        skill.current = Math.max(1, Math.min(99, savedSkill.level));
                        if (skill.skill === "Hitpoints" && skill.current < 10) skill.current = 10;
                    }
                });
                loadedSomething = true;
            } else {
                console.warn("Stored skillLevels is not an array, ignoring.");
                localStorage.removeItem('skillLevels');
            }
        } catch (e) {
            console.error("Error parsing skillLevels from localStorage:", e);
            localStorage.removeItem('skillLevels');
        }
    }
    if (!loadedSomething) {
        const hpSkill = skillRequirements.find(s => s.skill === "Hitpoints");
        if (hpSkill && hpSkill.current < 10) hpSkill.current = 10;
    }
    recalculateSkillNeeds();
    console.log("Skill levels loaded into data state.");
}

export function loadCustomXPRates() {
    const savedRates = localStorage.getItem('customSkillXPRates');
    let loadedRates = {};
    let usingCustom = false;
    if (savedRates) {
        try {
            const parsedRates = JSON.parse(savedRates);
            if (typeof parsedRates === 'object' && parsedRates !== null) {
                loadedRates = parsedRates;
            } else localStorage.removeItem('customSkillXPRates');
        } catch (e) {
            console.error("Error parsing customSkillXPRates:", e);
            localStorage.removeItem('customSkillXPRates');
        }
    }
    // Clear and repopulate the imported customSkillXPRates object
    for (const key in customSkillXPRates) {
        if (Object.prototype.hasOwnProperty.call(customSkillXPRates, key)) delete customSkillXPRates[key];
    }
    for (const key in loadedRates) {
        if (Object.prototype.hasOwnProperty.call(loadedRates, key)) customSkillXPRates[key] = loadedRates[key];
    }
    // Apply rates to skillRequirements
    skillRequirements.forEach(skill => {
        if (Object.prototype.hasOwnProperty.call(customSkillXPRates, skill.skill)) {
            const customRate = parseInt(customSkillXPRates[skill.skill]);
            if (!isNaN(customRate) && customRate >= 0) {
                skill.xpPerHour = customRate;
                if (customRate !== DEFAULT_SKILL_RATES[skill.skill]) usingCustom = true;
            } else {
                delete customSkillXPRates[skill.skill];
                skill.xpPerHour = DEFAULT_SKILL_RATES[skill.skill];
            }
        } else {
            skill.xpPerHour = DEFAULT_SKILL_RATES[skill.skill];
        }
    });
    console.log("Custom XP rates loaded. Using custom:", usingCustom);
}

export function persistCustomXPRates() {
    const ratesToSave = {};
    let ratesChanged = false;
    skillRequirements.forEach(skill => {
        if (skill.xpPerHour !== DEFAULT_SKILL_RATES[skill.skill]) {
            if (typeof skill.xpPerHour === 'number' && !isNaN(skill.xpPerHour) && skill.xpPerHour >= 0) {
                ratesToSave[skill.skill] = skill.xpPerHour;
                ratesChanged = true;
            } else console.warn(`Invalid XP rate (${skill.xpPerHour}) for ${skill.skill}. Not saving.`);
        }
    });
    localStorage.setItem('customSkillXPRates', JSON.stringify(ratesToSave));
    // Update the exported variable to match saved state
    for (const key in customSkillXPRates) {
        if (Object.prototype.hasOwnProperty.call(customSkillXPRates, key)) delete customSkillXPRates[key];
    }
    for (const key in ratesToSave) {
        if (Object.prototype.hasOwnProperty.call(ratesToSave, key)) customSkillXPRates[key] = ratesToSave[key];
    }
    if (ratesChanged) console.log('Persisted custom XP rates:', ratesToSave);
    else console.log('No custom rates differ from default.');
    return ratesChanged;
}

export function persistSkillLevels() {
    localStorage.setItem('skillLevels', JSON.stringify(
        skillRequirements.map(skill => ({ skill: skill.skill, level: skill.current }))
    ));
    console.log("Persisted skill levels.");
}

export function saveSkillLevelsFromModal() {
    let levelsChanged = false, ratesChanged = false;
    skillRequirements.forEach(skill => {
        const levelInput = document.getElementById(`skill-${skill.skill.toLowerCase()}`);
        const rateInput = document.getElementById(`rate-${skill.skill.toLowerCase()}`);
        if (levelInput) {
            let newLevel = parseInt(levelInput.value);
            if (!isNaN(newLevel) && newLevel >= 1 && newLevel <= 99) {
                if (skill.skill === "Hitpoints" && newLevel < 10) newLevel = 10;
                if (skill.current !== newLevel) { skill.current = newLevel; levelsChanged = true; }
            }
        }
        if (rateInput) {
            const rawValue = rateInput.value.replace(/,/g, '');
            const newRate = parseInt(rawValue);
            if (!isNaN(newRate) && newRate >= 0) {
                if (skill.xpPerHour !== newRate) skill.xpPerHour = newRate;
            }
        }
    });
    if (levelsChanged) recalculateSkillNeeds();
    ratesChanged = persistCustomXPRates();
    if (levelsChanged) persistSkillLevels();
    console.log('Skill save from modal complete.');
    return { levelsChanged, ratesChanged };
}

export function resetSkillLevels() {
    let levelsChanged = false, ratesChanged = false;
    skillRequirements.forEach(skill => {
        const defaultLevel = (skill.skill === "Hitpoints" ? 10 : 1);
        const defaultRate = DEFAULT_SKILL_RATES[skill.skill];
        if (skill.current !== defaultLevel) { skill.current = defaultLevel; levelsChanged = true; }
        if (skill.xpPerHour !== defaultRate) { skill.xpPerHour = defaultRate; ratesChanged = true; }
    });
    for (const key in customSkillXPRates) {
        if (Object.prototype.hasOwnProperty.call(customSkillXPRates, key)) delete customSkillXPRates[key];
    }
    if (levelsChanged) recalculateSkillNeeds();
    localStorage.removeItem('skillLevels');
    localStorage.removeItem('customSkillXPRates');
    console.log("Skill levels/rates reset.");
}

// --- Combat Achievement Storage ---

export function saveCombatAchievements() {
    const saveData = {};
    for (const bossKey in combatAchievementsData) {
        if (combatAchievementsData[bossKey]?.tasks) {
            saveData[bossKey] = combatAchievementsData[bossKey].tasks.map(task => task.achieved);
        }
    }
    localStorage.setItem('combatAchievementsProgress', JSON.stringify(saveData));
}

export function loadCombatAchievements() {
    const savedProgress = localStorage.getItem('combatAchievementsProgress');
    if (savedProgress) {
        try {
            const loadedData = JSON.parse(savedProgress);
            for (const bossKey in loadedData) {
                if (combatAchievementsData[bossKey]?.tasks && Array.isArray(loadedData[bossKey])) {
                    combatAchievementsData[bossKey].tasks.forEach((task, index) => {
                        task.achieved = loadedData[bossKey][index] === true; // Ensure boolean
                    });
                }
            }
            console.log("CA progress loaded.");
        } catch (e) {
            console.error("Error parsing CA progress:", e);
            localStorage.removeItem('combatAchievementsProgress');
        }
    }
}

// --- Miscellaneous Goals ---

export function saveMiscellaneousGoals() {
    localStorage.setItem('miscellaneousGoals', JSON.stringify(miscellaneousGoals));
}

export function loadMiscellaneousGoals() {
    const savedGoals = localStorage.getItem('miscellaneousGoals');
    let loadedData = [];
    if (savedGoals) {
        try {
            const parsedGoals = JSON.parse(savedGoals);
            if (Array.isArray(parsedGoals) && parsedGoals.every(g => typeof g === 'object' && 'description' in g && 'completed' in g)) {
                loadedData = parsedGoals;
            } else localStorage.removeItem('miscellaneousGoals');
        } catch (e) {
            console.error("Error parsing misc goals:", e);
            localStorage.removeItem('miscellaneousGoals');
        }
    }
    miscellaneousGoals.length = 0; // Clear existing array reference
    miscellaneousGoals.push(...loadedData);
    console.log("Misc goals loaded.");
}

export function reorderMiscellaneousGoals(oldIndex, newIndex) {
    if (oldIndex < 0 || oldIndex >= miscellaneousGoals.length || newIndex < 0) return;
    const item = miscellaneousGoals.splice(oldIndex, 1)[0];
    miscellaneousGoals.splice(newIndex, 0, item);
    saveMiscellaneousGoals();
    console.log(`Reordered misc goal from ${oldIndex} to ${newIndex}`);
}

// --- Milestone Goals ---

export function saveMilestoneGoals() {
    const saveData = {};
    for (const tierKey in milestoneGoalsData) {
        if (milestoneGoalsData[tierKey]?.goals) { // Add check
            saveData[tierKey] = milestoneGoalsData[tierKey].goals.map(g => g.achieved);
        }
    }
    localStorage.setItem('milestoneGoalsProgress', JSON.stringify(saveData));
}

export function loadMilestoneGoals() {
    const savedProgress = localStorage.getItem('milestoneGoalsProgress');
    if (savedProgress) {
        try {
            const loadedData = JSON.parse(savedProgress);
            for (const tierKey in loadedData) {
                if (milestoneGoalsData[tierKey]?.goals && Array.isArray(loadedData[tierKey])) {
                    milestoneGoalsData[tierKey].goals.forEach((goal, index) => {
                        goal.achieved = loadedData[tierKey][index] === true; // Ensure boolean
                    });
                }
            }
            console.log("Milestone goal progress loaded.");
        } catch (e) {
            console.error("Error loading milestone goal progress:", e);
            localStorage.removeItem('milestoneGoalsProgress');
        }
    }
}

// --- Gear Progression ---

export function saveGearProgression() {
    const saveData = {};
    for (const stageKey in gearProgressionData) {
        if (gearProgressionData[stageKey]?.items) { // Add check
            saveData[stageKey] = gearProgressionData[stageKey].items.map(item => item.achieved);
        }
    }
    localStorage.setItem('gearProgressionState', JSON.stringify(saveData));
}

export function loadGearProgression() {
    const savedState = localStorage.getItem('gearProgressionState');
    if (savedState) {
        try {
            const loadedData = JSON.parse(savedState);
            for (const stageKey in loadedData) {
                if (gearProgressionData[stageKey]?.items && Array.isArray(loadedData[stageKey])) {
                    gearProgressionData[stageKey].items.forEach((item, index) => {
                        item.achieved = loadedData[stageKey][index] === true; // Ensure boolean
                    });
                }
            }
            console.log("Gear progression loaded.");
        } catch (e) {
            console.error("Error loading gear progression:", e);
            localStorage.removeItem('gearProgressionState');
        }
    }
}

// --- Diary Progress ---

// Saves BOTH diaries AND misc goals (called from diary/misc event handlers)
export function saveProgressToLocalStorage() {
    localStorage.setItem('diaryProgress', JSON.stringify(diaryCompletionState));
    saveMiscellaneousGoals(); // Save misc goals array too
}

// --- Quest Progress (NEW) ---

/**
 * Loads quest completion status from localStorage into the questCompletionState object.
 */
export function loadQuestCompletion() {
    const savedState = localStorage.getItem('questCompletionState');
    let loadedData = {}; // Default to empty
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            if (parsedState && typeof parsedState === 'object' && !Array.isArray(parsedState)) {
                loadedData = parsedState;
            } else {
                console.warn("Invalid format for questCompletionState in localStorage. Ignoring.");
                localStorage.removeItem('questCompletionState');
            }
        } catch (e) {
            console.error("Error parsing questCompletionState:", e);
            localStorage.removeItem('questCompletionState');
        }
    }
    // Clear and repopulate the imported questCompletionState object
    for (const key in questCompletionState) {
        if (Object.prototype.hasOwnProperty.call(questCompletionState, key)) delete questCompletionState[key];
    }
    for (const key in loadedData) {
        if (Object.prototype.hasOwnProperty.call(loadedData, key)) {
            questCompletionState[key] = !!loadedData[key]; // Ensure boolean
        }
    }
    console.log("Quest completion state loaded.");
}

/**
 * Saves the current quest completion status (from questCompletionState object) to localStorage.
 */
export function saveQuestCompletion() {
    localStorage.setItem('questCompletionState', JSON.stringify(questCompletionState));
    // console.log("Quest completion state saved."); // Optional logging
}


// --- Core Data Loader & Exporter ---

/**
 * Loads ALL core data from localStorage into their respective state variables.
 */
export async function loadCoreDataFromStorage() {
    console.log("Loading core data from localStorage...");
    loadSkillLevels();
    loadCustomXPRates();
    loadCombatAchievements();
    loadMiscellaneousGoals();
    loadMilestoneGoals();
    loadGearProgression();

    // Load diary state into the diaryCompletionState variable
    const savedDiaryProgress = localStorage.getItem('diaryProgress');
    let loadedDiaryData = {};
    if (savedDiaryProgress) {
        try {
            const progress = JSON.parse(savedDiaryProgress);
            if (progress && typeof progress === 'object') loadedDiaryData = progress;
            else localStorage.removeItem('diaryProgress');
        } catch (e) { console.error("Error parsing diaryProgress:", e); localStorage.removeItem('diaryProgress'); }
    }
    for (const key in diaryCompletionState) delete diaryCompletionState[key];
    for (const key in loadedDiaryData) diaryCompletionState[key] = loadedDiaryData[key];
    console.log("Diary progress data loaded.");

    // Load Quest state
    loadQuestCompletion(); // <-- INTEGRATED CALL

    console.log("Core data loading sequence complete.");
}

/**
 * Aggregates all relevant data from localStorage for export.
 */
export function getCurrentDashboardData() {
    return {
        diaryProgress: JSON.parse(localStorage.getItem('diaryProgress') || '{}'),
        miscellaneousGoals: JSON.parse(localStorage.getItem('miscellaneousGoals') || '[]'),
        milestoneGoalsProgress: JSON.parse(localStorage.getItem('milestoneGoalsProgress') || '{}'),
        gearProgressionState: JSON.parse(localStorage.getItem('gearProgressionState') || '{}'),
        skillLevels: JSON.parse(localStorage.getItem('skillLevels') || '[]'),
        customSkillXPRates: JSON.parse(localStorage.getItem('customSkillXPRates') || '{}'),
        combatAchievementsProgress: JSON.parse(localStorage.getItem('combatAchievementsProgress') || '{}'),
        questCompletionState: JSON.parse(localStorage.getItem('questCompletionState') || '{}'), // <-- INTEGRATED EXPORT
        rsUsername: localStorage.getItem('rsUsername') || '',
        activeView: localStorage.getItem('activeView') || 'dashboard-view',
        theme: localStorage.getItem('theme') || 'light'
    };
}

/**
 * Triggers the download of the current dashboard data as a JSON file.
 */
export function exportData() {
    const exportButton = document.getElementById('export-data-button');
    if (!exportButton) return;
    const originalText = exportButton.textContent;
    try {
        exportButton.textContent = 'Exporting...'; exportButton.disabled = true;
        const dataToExport = getCurrentDashboardData();
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');
        const playerName = (dataToExport.rsUsername || 'player').replace(/[^a-zA-Z0-9_]+/g, '_').substring(0, 20);
        const filename = `rs_dashboard_backup_${playerName}_${timestamp}.json`;
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('Data exported.');
        exportButton.textContent = 'Exported!';
        setTimeout(() => { exportButton.textContent = originalText; exportButton.disabled = false; }, 2000);
    } catch (error) {
        console.error("Error during data export:", error);
        alert("An error occurred while exporting data.");
        exportButton.textContent = originalText; exportButton.disabled = false;
    }
}

/**
 * Handles the file input change event for importing data.
 */
export function handleFileImport(event) {
    const file = event.target.files[0];
    const fileInput = event.target;
    const importButton = document.getElementById('import-data-button');
    if (!file || !fileInput || !importButton) return;
    const originalText = importButton.textContent;
    if (file.type !== 'application/json') {
        alert('Invalid file type.'); fileInput.value = null; return;
    }
    importButton.textContent = 'Importing...'; importButton.disabled = true;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && typeof importedData === 'object') {
                // Selectively set items
                if (importedData.diaryProgress !== undefined) localStorage.setItem('diaryProgress', JSON.stringify(importedData.diaryProgress));
                if (importedData.miscellaneousGoals !== undefined) localStorage.setItem('miscellaneousGoals', JSON.stringify(importedData.miscellaneousGoals));
                if (importedData.milestoneGoalsProgress !== undefined) localStorage.setItem('milestoneGoalsProgress', JSON.stringify(importedData.milestoneGoalsProgress));
                if (importedData.gearProgressionState !== undefined) localStorage.setItem('gearProgressionState', JSON.stringify(importedData.gearProgressionState));
                if (importedData.skillLevels !== undefined) localStorage.setItem('skillLevels', JSON.stringify(importedData.skillLevels));
                if (importedData.customSkillXPRates !== undefined) localStorage.setItem('customSkillXPRates', JSON.stringify(importedData.customSkillXPRates));
                if (importedData.combatAchievementsProgress !== undefined) localStorage.setItem('combatAchievementsProgress', JSON.stringify(importedData.combatAchievementsProgress));
                if (importedData.questCompletionState !== undefined) localStorage.setItem('questCompletionState', JSON.stringify(importedData.questCompletionState)); // <-- INTEGRATED IMPORT
                if (importedData.rsUsername !== undefined) localStorage.setItem('rsUsername', importedData.rsUsername);
                if (importedData.activeView !== undefined) localStorage.setItem('activeView', importedData.activeView);
                if (importedData.theme !== undefined) localStorage.setItem('theme', importedData.theme);
                console.log('Data imported successfully.');
                alert('Data imported successfully! Reloading dashboard...');
                window.location.reload();
            } else throw new Error('Invalid JSON structure.');
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error importing data. File might be corrupted or invalid.\n' + error.message);
            importButton.textContent = originalText; importButton.disabled = false;
        } finally { fileInput.value = null; }
    };
    reader.onerror = function() {
        console.error('Error reading file.'); alert('Error reading the selected file.');
        importButton.textContent = originalText; importButton.disabled = false; fileInput.value = null;
    };
    reader.readAsText(file);
}