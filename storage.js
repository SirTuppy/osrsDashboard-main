// storage.js
// Description: Handles loading from and saving data to localStorage.
// Does NOT interact directly with UI update functions.

// --- IMPORTS ---
// Import data structures that need to be loaded into or saved from
import {
    skillRequirements,
    miscellaneousGoals,
    milestoneGoalsData,
    gearProgressionData,
    DEFAULT_SKILL_RATES,
    customSkillXPRates // Note: This is a 'let' export, we can modify it
} from './data.js';

// Import calculation functions needed for data processing during load/save
import { recalculateSkillNeeds } from './calculations.js';

/**
 * Loads skill levels from localStorage into the skillRequirements array.
 */
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
                         // Ensure Hitpoints is at least 10
                         if (skill.skill === "Hitpoints" && skill.current < 10) {
                             skill.current = 10;
                         }
                    }
                });
                loadedSomething = true; // Flag that we successfully loaded data
            } else {
                 console.warn("Stored skillLevels is not an array, ignoring.");
                 localStorage.removeItem('skillLevels'); // Clean up invalid data
            }
        } catch (e) {
            console.error("Error parsing skillLevels from localStorage:", e);
            localStorage.removeItem('skillLevels'); // Clean up invalid data
        }
    }

    // Ensure HP is 10 if nothing valid was loaded and current HP is < 10
    if (!loadedSomething) {
         const hpSkill = skillRequirements.find(s => s.skill === "Hitpoints");
         if(hpSkill && hpSkill.current < 10) hpSkill.current = 10;
    }

    recalculateSkillNeeds(); // Recalculate XP/levels needed based on loaded levels
    console.log("Skill levels loaded into data state.");
}

/**
 * Loads custom XP rates from localStorage into skillRequirements and customSkillXPRates.
 */
// storage.js

export function loadCustomXPRates() {
    const savedRates = localStorage.getItem('customSkillXPRates');
    let loadedRates = {}; // Use a temporary object to hold parsed data
    let usingCustom = false;

    if (savedRates) {
        try {
            const parsedRates = JSON.parse(savedRates);
            if (typeof parsedRates === 'object' && parsedRates !== null) {
                loadedRates = parsedRates; // Assign parsed rates to temporary object
            } else {
                localStorage.removeItem('customSkillXPRates');
            }
        } catch (e) {
            console.error("Error parsing customSkillXPRates:", e);
            localStorage.removeItem('customSkillXPRates');
        }
    }

    // --- MODIFICATION START ---
    // 1. Clear the properties of the existing imported object
    for (const key in customSkillXPRates) {
        if (customSkillXPRates.hasOwnProperty(key)) {
            delete customSkillXPRates[key];
        }
    }
    // 2. Copy properties from the loaded object into the imported object
    for (const key in loadedRates) {
        if (loadedRates.hasOwnProperty(key)) {
            customSkillXPRates[key] = loadedRates[key];
        }
    }
    // --- MODIFICATION END ---


    // Apply loaded rates (or defaults) to the main skillRequirements array
    // (This part remains the same - it reads the now-updated customSkillXPRates)
    skillRequirements.forEach(skill => {
        if (customSkillXPRates.hasOwnProperty(skill.skill)) {
            const customRate = parseInt(customSkillXPRates[skill.skill]);
            if (!isNaN(customRate) && customRate >= 0) {
                skill.xpPerHour = customRate;
                 if(customRate !== DEFAULT_SKILL_RATES[skill.skill]) usingCustom = true;
            } else {
                delete customSkillXPRates[skill.skill];
                skill.xpPerHour = DEFAULT_SKILL_RATES[skill.skill];
            }
        } else {
             skill.xpPerHour = DEFAULT_SKILL_RATES[skill.skill];
        }
    });

    console.log("Custom XP rates loaded into data state. Using custom:", usingCustom);
    // DO NOT update the UI indicator here
}

/**
 * Saves custom XP rates based *only* on the current values in skillRequirements.
 * NOTE: This assumes skillRequirements has been updated elsewhere (e.g., by saveSkillLevels).
 * It filters out rates that match the default.
 * @returns {boolean} - True if any rates were actually different from default and saved.
 */
export function persistCustomXPRates() {
    const ratesToSave = {};
    let ratesChanged = false;

    skillRequirements.forEach(skill => {
        // Only save if the current rate is different from the DEFAULT rate
        if (skill.xpPerHour !== DEFAULT_SKILL_RATES[skill.skill]) {
             // Basic validation on the rate itself before saving
             if(typeof skill.xpPerHour === 'number' && !isNaN(skill.xpPerHour) && skill.xpPerHour >= 0) {
                ratesToSave[skill.skill] = skill.xpPerHour;
                ratesChanged = true;
             } else {
                 console.warn(`Invalid XP rate (${skill.xpPerHour}) for ${skill.skill} found in data. Not saving.`);
             }
        }
    });

    // Save the filtered custom rates object to localStorage
    localStorage.setItem('customSkillXPRates', JSON.stringify(ratesToSave));
    // Update the exported variable to match exactly what was saved
    customSkillXPRates = ratesToSave;

    if (ratesChanged) {
        console.log('Persisted custom XP rates to localStorage:', ratesToSave);
    }
    // DO NOT update UI indicator here
    return ratesChanged; // Indicate if any custom rate was actually saved
}

/**
 * Persists the current skill levels from skillRequirements array to localStorage.
 */
export function persistSkillLevels() {
    localStorage.setItem('skillLevels', JSON.stringify(
        skillRequirements.map(skill => ({ skill: skill.skill, level: skill.current }))
    ));
    console.log("Persisted skill levels to localStorage.");
}

/**
 * Updates skillRequirements based on modal inputs and saves levels/rates.
 * Called by the Skill Editor Save button handler. Reads directly from DOM modal inputs.
 * @returns {object} - { levelsChanged: boolean, ratesChanged: boolean }
 */
export function saveSkillLevelsFromModal() {
    let levelsChanged = false;
    let ratesChanged = false;

    // 1. Update skillRequirements based on Input Values
    skillRequirements.forEach(skill => {
        const levelInput = document.getElementById(`skill-${skill.skill.toLowerCase()}`);
        const rateInput = document.getElementById(`rate-${skill.skill.toLowerCase()}`);

        // Update Level
        if (levelInput) {
            let newLevel = parseInt(levelInput.value);
            if (!isNaN(newLevel) && newLevel >= 1 && newLevel <= 99) {
                 if (skill.skill === "Hitpoints" && newLevel < 10) newLevel = 10;
                 if (skill.current !== newLevel) {
                    skill.current = newLevel;
                    levelsChanged = true;
                 }
            }
            // No else needed, assume input validation happened before calling save or keep old value
        }

        // Update XP Rate
        if (rateInput) {
            const rawValue = rateInput.value.replace(/,/g, '');
            const newRate = parseInt(rawValue);
            if (!isNaN(newRate) && newRate >= 0) {
                if (skill.xpPerHour !== newRate) {
                    skill.xpPerHour = newRate;
                    // Rate change detection happens inside persistCustomXPRates
                }
            }
             // No else needed, assume input validation or keep old value
        }
    });

    // 2. Recalculate dependent values if levels changed
    if (levelsChanged) {
        recalculateSkillNeeds();
    }

    // 3. Persist Rates (this also updates customSkillXPRates variable)
    ratesChanged = persistCustomXPRates();

    // 4. Persist Levels if they changed
    if (levelsChanged) {
        persistSkillLevels();
        console.log('Skill levels saved from modal.');
    }

    console.log('Skill save from modal complete.');
    // DO NOT call UI updates or closeSkillEditor here.
    return { levelsChanged, ratesChanged }; // Return status
}


/**
 * Resets skill levels and XP rates to default in data state and localStorage.
 */
export function resetSkillLevels() {
    let levelsChanged = false;
    let ratesChanged = false;

    skillRequirements.forEach(skill => {
        const defaultLevel = (skill.skill === "Hitpoints" ? 10 : 1); // Use base levels
        const defaultRate = DEFAULT_SKILL_RATES[skill.skill];

        if (skill.current !== defaultLevel) {
            skill.current = defaultLevel;
            levelsChanged = true;
        }
        if (skill.xpPerHour !== defaultRate) {
            skill.xpPerHour = defaultRate;
            ratesChanged = true;
        }
    });

    // Reset in-memory custom rates object
    // This modification logic for customSkillXPRates needs care if it's imported directly
    // A safer way might be to have a dedicated function in data.js to reset it
    Object.keys(customSkillXPRates).forEach(key => delete customSkillXPRates[key]);
    if (Object.keys(customSkillXPRates).length > 0) ratesChanged = true; // If it wasn't empty


    if (levelsChanged) {
        recalculateSkillNeeds();
    }

    localStorage.removeItem('skillLevels');
    localStorage.removeItem('customSkillXPRates');
    console.log("Skill levels/rates reset in data and localStorage.");
    // UI update should be triggered by the caller (app.js)
}


// --- Miscellaneous Goals ---

/**
 * Saves the current miscellaneousGoals array to localStorage.
 */
export function saveMiscellaneousGoals() {
    localStorage.setItem('miscellaneousGoals', JSON.stringify(miscellaneousGoals));
    // console.log("Misc goals saved."); // Optional log
}

/**
 * Loads miscellaneous goals from localStorage into the miscellaneousGoals array.
 */
export function loadMiscellaneousGoals() {
    const savedGoals = localStorage.getItem('miscellaneousGoals');
    let loadedData = []; // Start with empty array

    if (savedGoals) {
        try {
             const parsedGoals = JSON.parse(savedGoals);
             // Basic validation
             if (Array.isArray(parsedGoals) && parsedGoals.every(g => typeof g === 'object' && 'description' in g && 'completed' in g)) {
                 loadedData = parsedGoals;
             } else {
                 console.warn("Invalid format for miscellaneousGoals in localStorage. Resetting.");
                 localStorage.removeItem('miscellaneousGoals');
             }
        } catch (e) {
            console.error("Error parsing miscellaneousGoals from localStorage:", e);
            localStorage.removeItem('miscellaneousGoals');
        }
    }

    // Update the exported 'let' array - clear and push new content
    miscellaneousGoals.length = 0; // Clear the existing array preserving reference
    miscellaneousGoals.push(...loadedData); // Add loaded items

    console.log("Misc goals loaded into data state.");
    // DO NOT call populateMiscellaneousGoals here
}


// --- Milestone Goals ---

/**
 * Saves the achieved status of milestone goals to localStorage.
 */
export function saveMilestoneGoals() {
    const saveData = {};
    for (const tierKey in milestoneGoalsData) {
        // Only save completion status array
        saveData[tierKey] = milestoneGoalsData[tierKey].goals.map(g => g.achieved);
    }
    localStorage.setItem('milestoneGoalsProgress', JSON.stringify(saveData));
    console.log("Milestone goal progress saved.");
}

/**
 * Loads milestone goal progress from localStorage into the milestoneGoalsData object.
 */
export function loadMilestoneGoals() {
    const savedProgress = localStorage.getItem('milestoneGoalsProgress');
     if (savedProgress) {
        try {
            const loadedData = JSON.parse(savedProgress);
            for (const tierKey in loadedData) {
                // Update the 'achieved' status in the imported milestoneGoalsData object
                if (milestoneGoalsData[tierKey] && Array.isArray(loadedData[tierKey])) {
                    milestoneGoalsData[tierKey].goals.forEach((goal, index) => {
                        if (loadedData[tierKey][index] !== undefined) {
                            goal.achieved = loadedData[tierKey][index];
                        }
                    });
                }
            }
             console.log("Milestone goal progress loaded into data state.");
        } catch (e) {
            console.error("Error loading milestone goal progress:", e);
            localStorage.removeItem('milestoneGoalsProgress');
        }
    }
    // DO NOT call populateMilestoneGoals or updateCumulativeGoalProgress here
}


// --- Gear Progression ---

/**
 * Saves the achieved status of gear progression items to localStorage.
 */
export function saveGearProgression() {
    const saveData = {};
    for (const stageKey in gearProgressionData) {
        saveData[stageKey] = gearProgressionData[stageKey].items.map(item => item.achieved);
    }
    localStorage.setItem('gearProgressionState', JSON.stringify(saveData));
    console.log("Gear progression saved.");
}

/**
 * Loads gear progression state from localStorage into the gearProgressionData object.
 */
export function loadGearProgression() {
    const savedState = localStorage.getItem('gearProgressionState');
    if (savedState) {
        try {
            const loadedData = JSON.parse(savedState);
            for (const stageKey in loadedData) {
                // Update the 'achieved' status in the imported gearProgressionData object
                if (gearProgressionData[stageKey] && Array.isArray(loadedData[stageKey])) {
                    gearProgressionData[stageKey].items.forEach((item, index) => {
                        if (loadedData[stageKey][index] !== undefined) {
                            item.achieved = loadedData[stageKey][index];
                        }
                    });
                }
            }
            console.log("Gear progression loaded into data state.");
        } catch (e) {
            console.error("Error loading gear progression:", e);
            localStorage.removeItem('gearProgressionState');
        }
    }
     // DO NOT call populateGearProgression or updateCumulativeGearProgress here
}


// --- Diary Progress ---

/**
 * Saves the current checked state of diary tasks to localStorage.
 * Reads directly from DOM checkboxes. Called by main Save button.
 */
export function saveProgressToLocalStorage() {
    const progress = {};
    document.querySelectorAll('.task-checkbox:checked').forEach(checkbox => {
        const diary = checkbox.dataset.diary;
        const difficulty = checkbox.dataset.difficulty;
        const index = parseInt(checkbox.dataset.index);
        if (!progress[diary]) progress[diary] = {};
        if (!progress[diary][difficulty]) progress[diary][difficulty] = [];
        progress[diary][difficulty].push(index);
    });
    // Sort indices for consistency (optional but nice)
    for (const diary in progress) {
        for (const difficulty in progress[diary]) {
            progress[diary][difficulty].sort((a, b) => a - b);
        }
    }
    localStorage.setItem('diaryProgress', JSON.stringify(progress));

    // Explicitly save misc goals as well, as they save on change but this guarantees it
    saveMiscellaneousGoals();

    console.log('Main diary/misc progress saved via button.');
}

/**
 * Loads core data (skills, rates, misc/milestone/gear DATA) from localStorage.
 * Reads diary progress but returns it instead of applying to DOM.
 * return promise object - A promise that resolves with the parsed diaryProgress object.
 */
export async function loadCoreDataFromStorage() { // Renamed function
    console.log("Loading core data from localStorage...");
    let loadedDiaryProgressData = {}; // Variable to hold the result

    // --- Load Order is Important ---
    // 1. Load Skills/Rates first
    loadSkillLevels();       // Loads into skillRequirements array
    loadCustomXPRates();     // Loads into customSkillXPRates and skillRequirements

    // 2. Load Diary checkbox states FROM STORAGE (but don't apply yet)
    const savedDiaryProgress = localStorage.getItem('diaryProgress');
    // *** REMOVE THIS LINE: document.querySelectorAll('.task-checkbox').forEach(cb => { cb.checked = false; });
    if (savedDiaryProgress) {
        try {
            const progress = JSON.parse(savedDiaryProgress);
            // Basic validation - check if it's an object
            if (progress && typeof progress === 'object') {
                loadedDiaryProgressData = progress; // Store the parsed data
                console.log("Diary progress data loaded from storage.");
            } else {
                console.warn("Invalid format for diaryProgress in localStorage. Ignoring.");
                localStorage.removeItem('diaryProgress');
            }
        } catch (e) {
            console.error("Error parsing diaryProgress from localStorage:", e);
            localStorage.removeItem('diaryProgress');
        }
    }

    // 3. Load miscellaneous goals DATA
    loadMiscellaneousGoals(); // Loads data into miscellaneousGoals array

    // 4. Load milestone goals DATA
    loadMilestoneGoals(); // Loads data into milestoneGoalsData

    // 5. Load gear progression DATA
    loadGearProgression(); // Loads data into gearProgressionData

    console.log("Core data loading sequence complete.");
    // DO NOT call ANY UI update functions here.
    return loadedDiaryProgressData; // Return the loaded progress
}


// --- Import / Export ---

/**
 * Aggregates all relevant data from localStorage for export.
 * @returns {object} - Object containing all dashboard data.
 */
export function getCurrentDashboardData() {
    // Read directly from localStorage to get the most recently saved state
    return {
        diaryProgress: JSON.parse(localStorage.getItem('diaryProgress') || '{}'),
        miscellaneousGoals: JSON.parse(localStorage.getItem('miscellaneousGoals') || '[]'),
        milestoneGoalsProgress: JSON.parse(localStorage.getItem('milestoneGoalsProgress') || '{}'),
        gearProgressionState: JSON.parse(localStorage.getItem('gearProgressionState') || '{}'),
        skillLevels: JSON.parse(localStorage.getItem('skillLevels') || '[]'),
        customSkillXPRates: JSON.parse(localStorage.getItem('customSkillXPRates') || '{}'),
        rsUsername: localStorage.getItem('rsUsername') || '',
        activeView: localStorage.getItem('activeView') || 'dashboard-view'
    };
}

/**
 * Triggers the download of the current dashboard data as a JSON file.
 */
export function exportData() {
    const exportButton = document.getElementById('export-data-button');
    if(!exportButton) return;
    const originalText = exportButton.textContent;
    try {
        exportButton.textContent = 'Exporting...';
        exportButton.disabled = true;

        const dataToExport = getCurrentDashboardData(); // Get current stored data
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const playerName = (document.getElementById('player-name')?.textContent.trim() || 'player').replace(/\s+/g, '_'); // Read player name from DOM for filename
        const filename = `rs_dashboard_backup_${playerName}_${timestamp}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Data exported.');
        exportButton.textContent = 'Exported!';
        setTimeout(() => { exportButton.textContent = originalText; exportButton.disabled = false; }, 2000);

    } catch (error) {
         console.error("Error during data export:", error);
         alert("An error occurred while exporting data.");
         exportButton.textContent = originalText;
         exportButton.disabled = false;
    }
}

/**
 * Handles the file input change event for importing data.
 * Reads the file, validates, updates localStorage, and reloads.
 * @param {Event} event - The file input change event.
 */
export function handleFileImport(event) {
    const file = event.target.files[0];
    const fileInput = event.target;
    const importButton = document.getElementById('import-data-button');
    if (!file || !fileInput || !importButton) return;
    const originalText = importButton.textContent;

    if (file.type !== 'application/json') {
        alert('Invalid file type. Please select a .json file.');
        fileInput.value = null; // Reset file input
        return;
    }

    importButton.textContent = 'Importing...';
    importButton.disabled = true;
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            // Basic Validation (check if it's an object)
            if (importedData && typeof importedData === 'object') {

                // Selectively set localStorage items based on presence in imported file
                if(importedData.diaryProgress !== undefined) localStorage.setItem('diaryProgress', JSON.stringify(importedData.diaryProgress));
                if(importedData.miscellaneousGoals !== undefined) localStorage.setItem('miscellaneousGoals', JSON.stringify(importedData.miscellaneousGoals));
                if(importedData.milestoneGoalsProgress !== undefined) localStorage.setItem('milestoneGoalsProgress', JSON.stringify(importedData.milestoneGoalsProgress));
                if(importedData.gearProgressionState !== undefined) localStorage.setItem('gearProgressionState', JSON.stringify(importedData.gearProgressionState));
                if(importedData.skillLevels !== undefined) localStorage.setItem('skillLevels', JSON.stringify(importedData.skillLevels));
                if(importedData.customSkillXPRates !== undefined) localStorage.setItem('customSkillXPRates', JSON.stringify(importedData.customSkillXPRates));
                if(importedData.rsUsername !== undefined) localStorage.setItem('rsUsername', importedData.rsUsername);
                if(importedData.activeView !== undefined) localStorage.setItem('activeView', importedData.activeView);

                console.log('Data imported successfully to localStorage.');
                alert('Data imported successfully! Reloading dashboard...');
                window.location.reload(); // Reload to apply all changes cleanly from loaded storage
            } else {
                throw new Error('Invalid JSON structure (must be an object).');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error importing data. File might be corrupted or invalid.\n\n' + error.message);
            importButton.textContent = originalText;
            importButton.disabled = false;
        } finally {
             fileInput.value = null; // Reset input regardless of outcome
        }
    };
    reader.onerror = function() {
        console.error('Error reading file.');
        alert('Error reading the selected file.');
        importButton.textContent = originalText;
        importButton.disabled = false;
         fileInput.value = null;
    };
    reader.readAsText(file);
}

export function reorderMiscellaneousGoals(oldIndex, newIndex) {
    // Get the item being dragged
    const item = miscellaneousGoals.splice(oldIndex, 1)[0];
    // Insert it at the new position
    miscellaneousGoals.splice(newIndex, 0, item);
    // Save the new order
    saveMiscellaneousGoals();
}