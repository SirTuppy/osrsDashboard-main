// ui.js
// Description: Functions related to updating the User Interface (DOM manipulation).

// --- IMPORTS ---
// Import data needed to display information
import { skillRequirements, miscellaneousGoals, milestoneGoalsData, gearProgressionData, diaries } from './data.js';
// Import calculation functions used for display logic
import { totalXpForLevel, formatXp, calculateHoursNeeded, parseBoostAmount, calculateCombatLevel } from './calculations.js';
// Import specific event handlers needed for attaching listeners IN this module
import { handleDragStart, handleDragOver, handleDragEnd, handleDragLeave, handleDrop, handleMilestoneGoalChange, handleGearItemChange, handleMiscGoalCheck, handleMiscGoalDescChange, handleMiscGoalDescKey, handleMiscGoalRemove, handleDiaryTaskChange, handleCompleteAllToggle } from './events.js';
// NOTE: We import handlers that are attached *during UI population*.
// Handlers attached directly in app.js (like navigation, main save button) don't need to be imported here.

let loadedGlobalDiaryProgress = {};

function formatGP(amount) {
    if (amount <= 0) return "0 gp";
    if (amount >= 1000000000) return (amount / 1000000000).toFixed(2) + "b gp";
    if (amount >= 1000000) return (amount / 1000000).toFixed(2) + "m gp";
    if (amount >= 1000) return (amount / 1000).toFixed(1) + "k gp";
    return amount.toLocaleString() + " gp";
}
// --- EXPORTED FUNCTIONS ---

/**
 * Populates the skill summary table in the DOM.
 * @param {string} [sortBy='level'] - The criteria to sort by ('name', 'level', 'hours').
 */
export function populateSkillSummary(sortBy = 'level') {
    const skillSummaryElement = document.getElementById('skill-summary');
    if (!skillSummaryElement) return;
    skillSummaryElement.innerHTML = ''; // Clear previous content

    let sortedSkills = [...skillRequirements];
    sortedSkills = sortedSkills.filter(skill => skill.required > 1); // Only show skills with actual reqs > 1

    // Sorting logic based on sortBy parameter
    if (sortBy === 'name') {
        sortedSkills.sort((a, b) => a.skill.localeCompare(b.skill));
    } else if (sortBy === 'level') {
        sortedSkills.sort((a, b) => (b.levels - a.levels) || (a.current - b.current));
    } else if (sortBy === 'hours') {
        sortedSkills.sort((a, b) => {
            const hoursA = calculateHoursNeeded(a.xpNeeded, a.xpPerHour);
            const hoursB = calculateHoursNeeded(b.xpNeeded, b.xpPerHour);
            return (hoursB - hoursA) || (b.levels - a.levels);
        });
    }

    // Create and append HTML for each skill
    sortedSkills.forEach(skill => {
        const skillProgress = document.createElement('div');
        skillProgress.className = 'skill-progress';

        // Calculate display values
        const currentXp = totalXpForLevel(skill.current);
        const requiredXpForCalc = totalXpForLevel(skill.required);
        const baseXp = totalXpForLevel(1);
        const totalXpRange = Math.max(1, requiredXpForCalc - baseXp);
        const gainedXp = Math.max(0, currentXp - baseXp);
        const progressPercentage = skill.current >= skill.required ? 100 :
            Math.min(100, Math.max(0, Math.floor((gainedXp / totalXpRange) * 100)));
        const hoursNeeded = calculateHoursNeeded(skill.xpNeeded, skill.xpPerHour);
        const isMet = skill.current >= skill.required;
        const boostAmount = parseBoostAmount(skill.boost);
        const canBoostMeet = !isMet && boostAmount > 0 && (skill.current + boostAmount >= skill.required);
        const boostIndicatorHTML = canBoostMeet ? `<span class="required-level-indicator" title="Boostable">(B)</span>` : '';

        // Set innerHTML (event listeners for skill name click are handled by delegation in app.js)
        skillProgress.innerHTML = `
            <div class="skill-name clickable" data-skill-name="${skill.skill}">${skill.skill}</div>
            <div class="skill-level">
                <span class="editable-level" data-skill="${skill.skill}">${skill.current}</span>/${skill.required}${boostIndicatorHTML}
            </div>
            <div class="skill-progress-container tooltip">
                <div class="skill-progress-bar" style="width: ${progressPercentage}%"></div>
                ${skill.xpNeeded > 0 ? `<div class="xp-info">${formatXp(skill.xpNeeded)} XP</div>` : ''}
                ${skill.boost && skill.boost !== 'N/A' ? `<span class="tooltiptext">Boost: ${skill.boost}</span>` : ''}
            </div>
            ${isMet ?
                '<div class="completed-indicator">✓</div>' :
                (hoursNeeded > 0 ? `<div class="training-time" title="${skill.xpPerHour.toLocaleString()} XP/hr">${hoursNeeded.toFixed(1)} hrs</div>` : '<div class="training-time">-</div>')
            }
        `;
        skillSummaryElement.appendChild(skillProgress);
    });

    // Add listener for clicking the level itself to open editor
    skillSummaryElement.querySelectorAll('.editable-level').forEach(element => {
        element.addEventListener('click', openSkillEditor); // Call the UI function directly
    });
}

/**
 * Updates the overall statistics displayed below the main header.
 */
export function updateOverallStats() {
    let totalLevelsNeeded = 0;
    let totalXpNeeded = 0;
    let totalHoursNeeded = 0;

    // Calculate totals based on current skill requirements data
    skillRequirements.forEach(skill => {
        if (skill.current < skill.required && skill.required > 1) {
            totalLevelsNeeded += skill.levels;
            totalXpNeeded += skill.xpNeeded;
            totalHoursNeeded += calculateHoursNeeded(skill.xpNeeded, skill.xpPerHour);
        }
    });

    // Update DOM elements
    document.getElementById('total-levels-needed').textContent = totalLevelsNeeded;
    document.getElementById('total-xp-needed').textContent = formatXp(totalXpNeeded);
    document.getElementById('total-time').textContent = totalHoursNeeded.toFixed(1);
}

/**
 * Populates the diaries grid with cards for each diary region.
 */
export function populateDiaries() {
    const diariesGrid = document.querySelector('#diaries-view .diaries-grid'); // Target the new grid
    if (!diariesGrid) {
        console.error("Diary grid container '#diaries-view .diaries-grid' not found!");
        return;
    }
    diariesGrid.innerHTML = ''; // Clear previous content

    const diariesData = window.diaries || diaries;
    const difficulties = ["easy", "medium", "hard", "elite"]; // Define order

    for (const [diaryKey, diary] of Object.entries(diariesData)) {
        // --- Create the Diary Card Structure ---
        const diaryCard = document.createElement('div');
        diaryCard.className = 'diary-card';

        // --- Create Header (Largely Unchanged, but update progress calculation later) ---
        const diaryHeader = document.createElement('div');
        diaryHeader.className = 'diary-header';
        diaryHeader.dataset.diary = diaryKey;

        // Calculate TOTAL tasks across ALL difficulties for the header display
        let totalTasksAllDifficulties = 0;
        difficulties.forEach(diff => {
             totalTasksAllDifficulties += diary.tasks[diff]?.length || 0;
        });

        diaryHeader.innerHTML = `
            <div class="diary-title-row">
                <span class="diary-name">${diary.name}</span>
                <span class="diary-progress">
                    <span class="diary-percentage">0%</span>
                    <span class="diary-tasks-count">0/${totalTasksAllDifficulties} Total</span> <!-- Show total count -->
                </span>
            </div>
            <div class="diary-progress-bar-container">
                <div class="diary-progress-bar progress-${diaryKey}" style="width: 0%;"></div> <!-- Start at 0% -->
            </div>
        `;

        // --- Create Content Div ---
        const diaryContent = document.createElement('div');
        diaryContent.className = 'diary-content';
        diaryContent.id = `${diaryKey}-diary`;

        // --- Create Difficulty Tabs ---
        const difficultyTabs = document.createElement('div');
        difficultyTabs.className = 'difficulty-tabs';
        difficulties.forEach((diff, index) => {
            // Only create tab if tasks exist for this difficulty
            if (diary.tasks[diff] && diary.tasks[diff].length > 0) {
                 const button = document.createElement('button');
                 button.className = 'diff-button filter-button'; // Reuse filter-button style
                 // Make 'Elite' active by default for now, or maybe 'Easy'?
                 if (diff === 'elite') button.classList.add('active-diff');
                 button.dataset.diary = diaryKey;
                 button.dataset.difficulty = diff;
                 button.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
                 difficultyTabs.appendChild(button);
            }
        });
        diaryContent.appendChild(difficultyTabs);

        // --- Create Areas for Dynamic Content ---
        const tasksArea = document.createElement('div');
        tasksArea.className = 'tasks-area';
        diaryContent.appendChild(tasksArea);

        // --- ADD BACK Skill Req Area Placeholder ---
        const skillReqArea = document.createElement('div');
        skillReqArea.className = 'skill-requirements-area'; // Area to hold the generated list
        diaryContent.appendChild(skillReqArea);
        // -----------------------------------------

        // --- Append Header and Content to Card, Card to Grid ---
        diaryCard.appendChild(diaryHeader);
        diaryCard.appendChild(diaryContent);
        diariesGrid.appendChild(diaryCard);

        // --- Load Initial Difficulty Content (e.g., Elite) ---
        loadDiaryDifficultyContent(diaryKey, 'elite'); // Load elite content by default

    } // End loop through diaries

    console.log("Diary cards and tab structure populated.");
    // Global progress update will happen after applyLoadedDiaryProgress
}

// ui.js

// --- RE-IMPLEMENT HELPER FUNCTION ---
/**
 * Creates the HTML for the consolidated skill requirements section for a specific difficulty.
 * @param {string} diaryKey
 * @param {string} difficulty
 * @returns {HTMLElement | null} - The container div or null if no skill requirements.
 */
function createSkillRequirementsSection(diaryKey, difficulty) {
    const diaryData = diaries[diaryKey];
    const tasksForDifficulty = diaryData?.tasks?.[difficulty];
    if (!tasksForDifficulty) return null; // No tasks, no reqs

    // Aggregate unique skill requirements and highest level needed
    const aggregatedSkillReqs = new Map(); // Map<string, number> -> { "Agility": 70, "Herblore": 55 }
    const skillReqRegex = /^([a-zA-Z]+)\s+(\d+)$/; // Simple Skill Level regex

    tasksForDifficulty.forEach(task => {
        task.requires.forEach(reqStr => {
            const match = reqStr.match(skillReqRegex);
            if (match) {
                const skillName = match[1].trim();
                const level = parseInt(match[2]);
                // Store the highest level required for this skill in this difficulty
                if (!aggregatedSkillReqs.has(skillName) || level > aggregatedSkillReqs.get(skillName)) {
                    aggregatedSkillReqs.set(skillName, level);
                }
            }
            // Ignore Quest/QP/Combat reqs for this specific list
        });
    });

    if (aggregatedSkillReqs.size === 0) {
        return null; // No *skill* requirements found for this difficulty
    }

    // Build the HTML container
    const reqContainer = document.createElement('div');
    reqContainer.className = 'skill-requirements'; // Reuse existing class
    reqContainer.dataset.difficulty = difficulty;
    reqContainer.innerHTML = `<h4>Skill Requirements (${difficulty})</h4>`;

    // Sort skills alphabetically for consistent display
    const sortedSkillNames = Array.from(aggregatedSkillReqs.keys()).sort();

    sortedSkillNames.forEach(skillName => {
        const levelRequired = aggregatedSkillReqs.get(skillName);
        const skillData = skillRequirements.find(s => s.skill === skillName); // Find player's skill data
        const currentLevel = skillData ? skillData.current : 1;
        const isMet = currentLevel >= levelRequired;
        const boost = skillData?.boost; // Get boost info from main skill data
        const boostAmount = parseBoostAmount(boost);
        const canBoostMeet = !isMet && boostAmount > 0 && (currentLevel + boostAmount >= levelRequired);

        // Create the individual requirement div (same as before)
        const reqDiv = document.createElement('div');
        reqDiv.className = 'skill-requirement';

        const skillNameSpan = document.createElement('span');
        skillNameSpan.textContent = `${skillName} ${levelRequired}`; // Display "Skill Level"
         if (boost && boost !== 'N/A') {
            skillNameSpan.classList.add('tooltip');
            skillNameSpan.innerHTML += `<span class="tooltiptext">Boost: ${boost}</span>`;
         }

        const skillLevelSpan = document.createElement('span');
        skillLevelSpan.className = isMet ? 'skill-met' : 'skill-not-met';
        skillLevelSpan.textContent = `${currentLevel}/${levelRequired}`; // Show Current/Required
         if (!isMet && canBoostMeet) {
            skillLevelSpan.innerHTML += ` <span style="color: var(--accent-yellow); font-size:0.9em;" title="Boostable">(B)</span>`;
         }

        reqDiv.appendChild(skillNameSpan);
        reqDiv.appendChild(skillLevelSpan);
        reqContainer.appendChild(reqDiv);
    });

    return reqContainer;
}

// --- NEW HELPER FUNCTION ---
/**
 * Loads the tasks and requirements for a specific difficulty into the diary card.
 * @param {string} diaryKey
 * @param {string} difficulty
 */
// ui.js -> loadDiaryDifficultyContent
export function loadDiaryDifficultyContent(diaryKey, difficulty) {
    const diaryContent = document.getElementById(`${diaryKey}-diary`);
    if (!diaryContent) {
        console.error(`Diary content area not found for ${diaryKey}-diary`);
        return;
    }

    const tasksArea = diaryContent.querySelector('.tasks-area');
    const skillReqArea = diaryContent.querySelector('.skill-requirements-area'); // Area for bottom skill list

    // Ensure both areas exist before proceeding
    if (!tasksArea || !skillReqArea) {
         console.error(`Tasks or Skill Req area missing within ${diaryKey}-diary`);
         return;
    }

    // Clear previous content from both areas
    tasksArea.innerHTML = '';
    skillReqArea.innerHTML = '';

    // Create and append new task content (which includes inline reqs)
    const taskSection = createTaskSection(diaryKey, difficulty);
    if (taskSection) { // Check if task section was successfully created
         tasksArea.appendChild(taskSection);
    } else {
         console.warn(`Failed to create task section for ${diaryKey} - ${difficulty}`);
    }


    // Create and append the separate Skill Requirement Section at the bottom
    const skillSection = createSkillRequirementsSection(diaryKey, difficulty);
    if (skillSection) {
        skillReqArea.appendChild(skillSection);
    }

    // Apply saved check states specifically to the checkboxes just added
    applyLoadedChecksToDifficulty(diaryKey, difficulty);

    // Update the UI elements for the newly loaded content
    updateTaskProgressDisplay(diaryKey, difficulty);      // Update progress bar/text for this difficulty
    updateCompleteAllCheckboxState(diaryKey, difficulty); // Set initial state of the master checkbox
    updateAllDiarySkillReqs();                           // Update highlighting in the bottom skill req section
}

// --- NEW HELPER FUNCTION ---
/**
 * Applies loaded checkbox states specifically to a newly loaded difficulty section.
 * Reads from the module-scoped loadedGlobalDiaryProgress variable.
 * @param {string} diaryKey
 * @param {string} difficulty
 */
function applyLoadedChecksToDifficulty(diaryKey, difficulty) {
    // --- Read from the stored global progress data ---
    const difficultyIndices = loadedGlobalDiaryProgress?.[diaryKey]?.[difficulty];
    // -------------------------------------------------

    const taskSection = document.querySelector(`#${diaryKey}-diary .task-category[data-difficulty="${difficulty}"]`);
    if (!taskSection) {
         // console.warn(`Task section not found for applying checks: ${diaryKey}-${difficulty}`);
         return; // Section not rendered yet
    }

    // --- Reset checks in this specific section FIRST ---
    taskSection.querySelectorAll('.task-checkbox').forEach(checkbox => {
         checkbox.checked = false;
         checkbox.closest('.task')?.classList.remove('task-completed');
    });
    // ---------------------------------------------------


    if (Array.isArray(difficultyIndices)) {
        difficultyIndices.forEach(index => {
            const checkbox = taskSection.querySelector(`.task-checkbox[data-index="${index}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest('.task')?.classList.add('task-completed');
            } else {
                  // console.warn(`Checkbox with index ${index} not found in ${diaryKey}-${difficulty}`);
            }
        });
    }
    // else { console.log(`No saved indices found for ${diaryKey}-${difficulty}`); }
}

/**
 * Updates the displayed skill levels in the diary requirements sections.
 */
export function updateAllDiarySkillReqs() {
   document.querySelectorAll('.skill-requirement').forEach(reqDiv => {
        // ... (Existing logic to find spans, parse req, get skill data) ...
        const skillNameSpan = reqDiv.querySelector('span:first-child');
        const skillLevelSpan = reqDiv.querySelector('span:last-child');
        if (!skillNameSpan || !skillLevelSpan) return;
        const requirementText = skillNameSpan.textContent.split('<span')[0].trim();
        const match = requirementText.match(/^([a-zA-Z\s]+)\s(\d+)$/);
        if (!match) return;
        const skillName = match[1].trim();
        const levelRequired = parseInt(match[2]);
        const skillData = skillRequirements.find(s => s.skill === skillName);
        const currentLevel = skillData ? skillData.current : 1;
        const isMet = currentLevel >= levelRequired;
        const boost = skillData?.boost;
        const boostAmount = parseBoostAmount(boost);
        const canBoostMeet = !isMet && boostAmount > 0 && (currentLevel + boostAmount >= levelRequired);

        // Update DOM elements
        skillLevelSpan.textContent = `${currentLevel}/${levelRequired}`;
        let boostIndicator = skillLevelSpan.querySelector('span[title="Boostable"]');
        if (!isMet && canBoostMeet) {
             if (!boostIndicator) {
                 boostIndicator = document.createElement('span');
                 boostIndicator.style.color = 'var(--accent-yellow)';
                 boostIndicator.style.fontSize = '0.9em';
                 boostIndicator.title = 'Boostable';
                 boostIndicator.textContent = ' (B)';
                 skillLevelSpan.appendChild(boostIndicator);
             }
         } else {
              boostIndicator?.remove();
         }
         skillLevelSpan.className = isMet ? 'skill-met' : 'skill-not-met';
    }); 
}

// --- MODIFY applyLoadedDiaryProgress ---
// This function might not be needed anymore if checks are applied dynamically
// by loadDiaryDifficultyContent. OR, it could loop through all diaries/difficulties
// and ensure the initial default view (e.g., Elite) is correctly checked.
// For now, let's simplify it to just update overall progress after population.
export function applyLoadedDiaryProgress(loadedProgressData) {
    console.log("Storing loaded diary progress and triggering initial UI updates...");
    // Store the loaded data globally within this module
    loadedGlobalDiaryProgress = loadedProgressData || {};

    // The actual checks are applied when loadDiaryDifficultyContent calls applyLoadedChecksToDifficulty.
    // We just need to ensure the header/global stats reflect the overall SAVED state initially.
    Object.keys(diaries).forEach(diaryKey => {
        updateDiaryHeaderProgress(diaryKey); // Update header based on the initially loaded data
    });
    updateGlobalProgress(); // Update global stats based on initially loaded data
    updateDashboardSummaryProgress(); // Update summary based on initially loaded data
    console.log("Initial diary progress UI updated based on loaded state.");
}

/**
 * Updates the progress bar and text for a specific task category (difficulty).
 * @param {string} diaryKey
 * @param {string} difficulty
 */
export function updateTaskProgressDisplay(diaryKey, difficulty) {
    const diaryContent = document.getElementById(`${diaryKey}-diary`);
    if (!diaryContent) return;
    // Find the SPECIFIC task category for this difficulty
    const categoryContainer = diaryContent.querySelector(`.task-category[data-difficulty="${difficulty}"]`);
    if (!categoryContainer) {
         // console.warn(`Task category not found for ${diaryKey} - ${difficulty}`);
         return; // Category might not be loaded yet
    }
    const progressBar = categoryContainer.querySelector('.progress-bar');
    const progressText = categoryContainer.querySelector('.progress-text');
    // Find tasks ONLY within this category
    const tasks = categoryContainer.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`);

    const completed = Array.from(tasks).filter(task => task.checked).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.floor((completed / total) * 100) : 0;

    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${completed}/${total} tasks completed`;
}

/**
 * Updates the main header progress for a specific diary card based on ALL difficulties.
 * @param {string} diaryKey - The key for the diary.
 */
export function updateDiaryHeaderProgress(diaryKey) {
    const diaryHeader = document.querySelector(`.diary-header[data-diary="${diaryKey}"]`);
    if (!diaryHeader) return;

    // --- Calculate OVERALL progress for this diary from SAVED state ---
    let totalTasksAcrossDifficulties = 0;
    let completedTasksAcrossDifficulties = 0;
    const difficulties = ["easy", "medium", "hard", "elite"];
    const diaryData = diaries[diaryKey]; // From data.js for total counts
    const savedProgress = loadedGlobalDiaryProgress; // Use the loaded data

    if (diaryData && diaryData.tasks) {
        difficulties.forEach(diff => {
            totalTasksAcrossDifficulties += diaryData.tasks[diff]?.length || 0;
            completedTasksAcrossDifficulties += savedProgress?.[diaryKey]?.[diff]?.length || 0; // Count saved checks
        });
    }

    const overallPercentage = totalTasksAcrossDifficulties > 0 ? Math.floor((completedTasksAcrossDifficulties / totalTasksAcrossDifficulties) * 100) : 0;

    // --- Update Header DOM (same as before) ---
    // ... (update percentageSpan, countSpan, progressBar) ...
     const percentageSpan = diaryHeader.querySelector('.diary-percentage');
    const countSpan = diaryHeader.querySelector('.diary-tasks-count');
    const progressBar = diaryHeader.querySelector('.diary-progress-bar');
     if (percentageSpan) percentageSpan.textContent = `${overallPercentage}%`;
    if (countSpan) countSpan.textContent = `${completedTasksAcrossDifficulties}/${totalTasksAcrossDifficulties} Total`;
    if (progressBar) progressBar.style.width = `${overallPercentage}%`;
}


/**
 * Updates the global OVERALL diary progress display based on SAVED data.
 */
export function updateGlobalProgress() {
    let grandTotalTasks = 0;
    let grandTotalCompleted = 0;
    const difficulties = ["easy", "medium", "hard", "elite"];
    const savedProgress = loadedGlobalDiaryProgress; // Use loaded data

    for (const diaryKey in diaries) {
        const diaryData = diaries[diaryKey];
        if (diaryData && diaryData.tasks) {
            difficulties.forEach(diff => {
                grandTotalTasks += diaryData.tasks[diff]?.length || 0;
                grandTotalCompleted += savedProgress?.[diaryKey]?.[diff]?.length || 0; // Count saved checks
            });
        }
    }

    const overallPercentage = grandTotalTasks > 0 ? Math.floor((grandTotalCompleted / grandTotalTasks) * 100) : 0;

    // --- Update Overall Stats Header (same as before) ---
    // ... (update eliteCompletedSpan, eliteTotalSpan, overallProgressSpan) ...
     const eliteCompletedSpan = document.getElementById('elite-completed');
    const eliteTotalSpan = document.getElementById('elite-total');
    const overallProgressSpan = document.getElementById('overall-progress');
     if (eliteCompletedSpan) eliteCompletedSpan.textContent = grandTotalCompleted;
    if (eliteTotalSpan) eliteTotalSpan.textContent = grandTotalTasks;
    if (overallProgressSpan) overallProgressSpan.textContent = overallPercentage;
}


/**
 * Updates the combat level display in the header.
 */
export function updateCombatLevelDisplay() {
    const combatLevelElement = document.getElementById('combat-level-display');
    if (!combatLevelElement) {
        console.error("Combat level display element not found!");
        return;
    }
    // Get levels from the data module
    const currentLevels = {};
    skillRequirements.forEach(skill => {
        if (["Attack", "Strength", "Defence", "Hitpoints", "Prayer", "Ranged", "Magic"].includes(skill.skill)) {
             currentLevels[skill.skill] = skill.current || 1;
        }
    });
     if (currentLevels.Hitpoints && currentLevels.Hitpoints < 10) currentLevels.Hitpoints = 10;

    // Calculate and update display
    const requiredSkills = ["Attack", "Strength", "Defence", "Hitpoints", "Prayer", "Ranged", "Magic"];
    const hasAllSkills = requiredSkills.every(skillName => currentLevels.hasOwnProperty(skillName));
    if (hasAllSkills) {
        const combatLevel = calculateCombatLevel(currentLevels); // Use imported calculation
        combatLevelElement.textContent = `Combat Level: ${combatLevel}`;
    } else {
        console.warn("Missing skills for combat level calculation.");
        combatLevelElement.textContent = `Combat Level: ??`;
    }
}

/**
 * Populates the miscellaneous goals list in the DOM.
 * Attaches event listeners for goal interaction.
 */
export function populateMiscellaneousGoals() {
    const goalsContainer = document.getElementById('miscellaneous-goals');
    if(!goalsContainer) return;
    goalsContainer.innerHTML = ''; // Clear existing

    // Display placeholder if no goals
    if (miscellaneousGoals.length === 0) {
        goalsContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 10px 0;">No miscellaneous goals added yet.</p>';
        return;
    }

    // Create elements for each goal
    miscellaneousGoals.forEach((goal, index) => {
        const goalDiv = document.createElement('div');
        goalDiv.className = 'task'; // Reuse task styling
        if (goal.completed) goalDiv.classList.add('task-completed');
        
        // Add draggable attributes and classes for styling
        goalDiv.draggable = true;
        goalDiv.classList.add('draggable-goal');
        goalDiv.dataset.index = index;
        
        goalDiv.innerHTML = `
            <div class="drag-handle" title="Drag to reorder">☰</div>
            <input type="checkbox" class="goal-checkbox" id="misc-goal-${index}" data-index="${index}" ${goal.completed ? 'checked' : ''}>
            <input type="text" class="task-description" value="${goal.description}" placeholder="Enter goal..." data-index="${index}">
            <button class="remove-goal-button" data-index="${index}" title="Remove goal">×</button>
        `;
        
        // Attach IMPORTED event handlers
        goalDiv.querySelector('.goal-checkbox').addEventListener('change', handleMiscGoalCheck);
        goalDiv.querySelector('input[type="text"]').addEventListener('change', handleMiscGoalDescChange);
        goalDiv.querySelector('input[type="text"]').addEventListener('keypress', handleMiscGoalDescKey);
        goalDiv.querySelector('.remove-goal-button').addEventListener('click', handleMiscGoalRemove);
        
        // Add drag events
        goalDiv.addEventListener('dragstart', handleDragStart);
        goalDiv.addEventListener('dragover', handleDragOver);
        goalDiv.addEventListener('dragleave', handleDragLeave);
        goalDiv.addEventListener('dragend', handleDragEnd);
        goalDiv.addEventListener('drop', handleDrop);
        
        goalsContainer.appendChild(goalDiv);
    });
}

/**
 * Updates the progress bar and percentage for a specific milestone goal tier.
 * @param {string} tierKey - Key of the tier (e.g., 'easy', 'medium').
 */
export function updateMilestoneTierProgress(tierKey) {
    const tierData = milestoneGoalsData[tierKey];
    if (!tierData) return;
    const totalGoals = tierData.goals.length;
    if (totalGoals === 0) return;

    // Calculate progress from data
    const completedGoals = tierData.goals.filter(goal => goal.achieved).length;
    const percentage = Math.floor((completedGoals / totalGoals) * 100);

    // Find and update DOM elements
    const container = document.getElementById(`${tierKey}-goals-container`);
    if (!container) return;
    const progressBar = container.querySelector('.goal-progress-bar');
    const percentageSpan = container.querySelector('.goal-percentage');
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (percentageSpan) percentageSpan.textContent = `${percentage}%`;
}

/**
 * Populates the milestone goals view with tiers and goals.
 * Attaches event listeners for goal checkboxes.
 */
export function populateMilestoneGoals() {
    const goalsGrid = document.querySelector('#goals-view .goals-grid');
    if (!goalsGrid) return;
    goalsGrid.innerHTML = ''; // Clear previous

    // Loop through data and create DOM elements
    for (const tierKey in milestoneGoalsData) {
        const tierData = milestoneGoalsData[tierKey];
        const tierContainer = document.createElement('div');
        tierContainer.className = 'goal-tier-container container';
        tierContainer.id = `${tierKey}-goals-container`;

        // Header
        const header = document.createElement('div');
        header.className = 'goal-tier-header';
        // --- FIX 1: Restore header HTML ---
        header.innerHTML = `
            <h3>${tierData.name}</h3>
            <div class="goal-progress-container">
                <div class="goal-progress-bar" style="background-color: ${tierData.color || 'var(--accent-blue)'};"></div>
            </div>
            <span class="goal-percentage" id="${tierKey}-goal-percentage">0%</span>
        `;
        // --- END FIX 1 ---

        // Goal List
        const goalList = document.createElement('div');
        goalList.className = 'tasks goal-list';
        tierData.goals.forEach((goal, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
             if (goal.achieved) taskDiv.classList.add('task-completed');

            // --- FIX 2: Restore goal item HTML ---
            taskDiv.innerHTML = `
                <input type="checkbox" class="milestone-goal-checkbox" id="mg-${tierKey}-${index}"
                       data-tier="${tierKey}" data-index="${index}" ${goal.achieved ? 'checked' : ''}>
                <label class="task-description" for="mg-${tierKey}-${index}">${goal.name}</label>
                ${goal.info ? `<span class="goal-info">${goal.info}</span>` : ''}
            `;
            // --- END FIX 2 ---

            // Attach IMPORTED event handler (This should work now)
            taskDiv.querySelector('.milestone-goal-checkbox').addEventListener('change', handleMilestoneGoalChange);
            goalList.appendChild(taskDiv);
        });

        tierContainer.appendChild(header);
        tierContainer.appendChild(goalList);
        goalsGrid.appendChild(tierContainer);
        updateMilestoneTierProgress(tierKey); // Initial progress update based on loaded data
    }
}


/**
 * Updates the cumulative progress bar/percentage for milestone goals.
 */
export function updateCumulativeGoalProgress() {
    const progressBar = document.getElementById('cumulative-progress-bar');
    const percentageSpan = document.getElementById('cumulative-percentage');
    if (!progressBar || !percentageSpan) return;

    // Calculate totals from data
    let totalGoalsCumulative = 0;
    let completedGoalsCumulative = 0;
    for (const tierKey in milestoneGoalsData) {
        totalGoalsCumulative += milestoneGoalsData[tierKey].goals.length;
        completedGoalsCumulative += milestoneGoalsData[tierKey].goals.filter(g => g.achieved).length;
    }
    const percentage = (totalGoalsCumulative > 0) ? Math.floor((completedGoalsCumulative / totalGoalsCumulative) * 100) : 0;

    // Update DOM
    progressBar.style.width = `${percentage}%`;
    percentageSpan.textContent = `${percentage}%`;
}

/**
 * Populates the gear progression view with stages and items.
 * Attaches event listeners for gear item checkboxes.
 */
export function populateGearProgression() {
    const gearGrid = document.querySelector('#gear-view .gear-stages-grid');
    if (!gearGrid) {
        console.error("Gear grid container not found!");
        return;
    }
    gearGrid.innerHTML = ''; // Clear previous content

    // Loop through data and create DOM elements
    for (const stageKey in gearProgressionData) {
        const stageData = gearProgressionData[stageKey];
        // Basic check for valid data structure
        if (!stageData || !stageData.items || !Array.isArray(stageData.items)) {
            console.warn(`Skipping gear stage ${stageKey}: Invalid data structure.`);
            continue;
        }

        const stageContainer = document.createElement('div');
        stageContainer.className = 'gear-stage-container container';
        stageContainer.id = `gp-${stageKey}-container`;

        // --- Modify Header HTML ---
        const header = document.createElement('div');
        header.className = 'gear-stage-header';
        header.innerHTML = `
            <h3>${stageData.name}</h3>
            <div class="goal-progress-container">
                <div id="gp-${stageKey}-progress-bar" class="goal-progress-bar" style="background-color: ${stageData.color || 'var(--accent-blue)'};"></div>
            </div>
            <span id="gp-${stageKey}-percentage" class="goal-percentage">0%</span>
            <span class="stage-cost" id="cost-${stageKey}">Cost: ...</span> <!-- ADD Stage Cost Placeholder -->
        `;
        // --- End Modify Header ---

        // --- Restore Item List HTML & Logic ---
        const itemList = document.createElement('div');
        itemList.className = 'gear-item-list'; // Specific class for gear list styling/scrolling

        stageData.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'task gear-item';
             if (item.achieved) {
                itemDiv.classList.add('task-completed');
             }

             const iconFileName = item.style === 'all' ? 'hitpoints.png' : `${item.style}.png`;
             const iconSrc = `icons/${iconFileName}`;

             // --- Modify Item Row HTML ---
             // Add the item-price span, conditionally displayed if price > 0
             const priceString = (item.price && item.price > 0)
                ? `<span class="item-price">(${formatGP(item.price)})</span>`
                : '';

            itemDiv.innerHTML = `
                <input type="checkbox" class="gear-item-checkbox" id="gi-${stageKey}-${index}"
                       data-stage="${stageKey}" data-index="${index}" ${item.achieved ? 'checked' : ''}>
                <label class="task-description" for="gi-${stageKey}-${index}">${item.name} ${priceString}</label> <!-- Add priceString -->
                <img src="${iconSrc}" alt="${item.style}" class="gear-style-icon" title="${item.style} style">
            `;
             // --- End Modify Item Row ---

            const checkbox = itemDiv.querySelector('.gear-item-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', handleGearItemChange);
            }
            itemList.appendChild(itemDiv);
        });

        stageContainer.appendChild(header);
        stageContainer.appendChild(itemList);
        gearGrid.appendChild(stageContainer);

        updateGearStageProgress(stageKey); // Update % bar
        updateGearStageCost(stageKey);   // <-- Call NEW function to calculate initial cost
    }
}

/**
 * Updates the progress bar/percentage for a specific gear progression stage.
 * @param {string} stageKey - Key of the stage (e.g., 'early', 'mid').
 */
export function updateGearStageProgress(stageKey) {
    const stageData = gearProgressionData[stageKey];
    if (!stageData) return;
    const totalItems = stageData.items.length;
    if (totalItems === 0) return;

    // Calculate from data
    const completedItems = stageData.items.filter(item => item.achieved).length;
    const percentage = Math.floor((completedItems / totalItems) * 100);

    // Update DOM
    const progressBar = document.getElementById(`gp-${stageKey}-progress-bar`);
    const percentageSpan = document.getElementById(`gp-${stageKey}-percentage`);
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (percentageSpan) percentageSpan.textContent = `${percentage}%`;
}
// --- ADD NEW FUNCTION ---
/**
 * Calculates and updates the total cost display for unacquired items in a gear stage.
 * @param {string} stageKey - The key for the gear stage (e.g., 'early', 'mid').
 */
export function updateGearStageCost(stageKey) {
    const stageData = gearProgressionData[stageKey];
    const costElement = document.getElementById(`cost-${stageKey}`);

    if (!stageData || !stageData.items || !costElement) {
        // console.warn(`Could not update cost for stage: ${stageKey}`);
        if(costElement) costElement.textContent = "Cost: N/A";
        return;
    }

    let totalCost = 0;
    stageData.items.forEach(item => {
        // Sum price only if NOT achieved AND price is valid
        if (!item.achieved && item.price && item.price > 0) {
            totalCost += item.price;
        }
    });

    // Update the DOM element
    costElement.textContent = `Cost: ${formatGP(totalCost)}`;
    costElement.title = `Total cost of remaining items in this stage: ${totalCost.toLocaleString()} gp`; // Add tooltip with exact value
}

/**
 * Updates the cumulative progress bar/percentage for gear progression.
 */
export function updateCumulativeGearProgress() {
    const progressBar = document.getElementById('cumulative-gear-progress-bar');
    const percentageSpan = document.getElementById('cumulative-gear-percentage');
    if (!progressBar || !percentageSpan) return;

    // Calculate from data
    let totalItemsCumulative = 0;
    let completedItemsCumulative = 0;
    for (const stageKey in gearProgressionData) {
        totalItemsCumulative += gearProgressionData[stageKey].items.length;
        completedItemsCumulative += gearProgressionData[stageKey].items.filter(i => i.achieved).length;
    }
    const percentage = (totalItemsCumulative > 0) ? Math.floor((completedItemsCumulative / totalItemsCumulative) * 100) : 0;

    // Update DOM
    progressBar.style.width = `${percentage}%`;
    percentageSpan.textContent = `${percentage}%`;
}

/**
 * Updates the checked and indeterminate state of a "Complete All" checkbox.
 * @param {string} diaryKey
 * @param {string} difficulty
 */
export function updateCompleteAllCheckboxState(diaryKey, difficulty) {
    const masterCheckbox = document.getElementById(`complete-all-${diaryKey}-${difficulty}`);
    if (!masterCheckbox) return; // Might not be loaded yet or exist

    const taskCategory = masterCheckbox.closest('.task-category');
    if (!taskCategory) return;

    const taskCheckboxes = taskCategory.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`);
    const totalTasks = taskCheckboxes.length;
    if (totalTasks === 0) {
        masterCheckbox.checked = false;
        masterCheckbox.indeterminate = false;
        masterCheckbox.disabled = true; // Disable if no tasks
        return;
    }

    const completedTasks = Array.from(taskCheckboxes).filter(cb => cb.checked).length;

    masterCheckbox.disabled = false; // Ensure enabled if tasks exist

    if (completedTasks === 0) {
        masterCheckbox.checked = false;
        masterCheckbox.indeterminate = false;
    } else if (completedTasks === totalTasks) {
        masterCheckbox.checked = true;
        masterCheckbox.indeterminate = false;
    } else {
        // Some, but not all, are checked
        masterCheckbox.checked = false; // Should not be fully checked
        masterCheckbox.indeterminate = true; // Set indeterminate state
    }
}


/**
 * Shows the specified view and hides others. Updates tab buttons.
 * @param {string} viewIdToShow - The ID of the view container div to show.
 */
export function showView(viewIdToShow) {
    const views = document.querySelectorAll('#dashboard-view, #goals-view, #gear-view, #diaries-view');
    const viewButtons = document.querySelectorAll('.view-navigation .filter-button');
    const skillModalSaveButton = document.getElementById('save-skills');
    const skillModalResetButton = document.getElementById('reset-skills');

    views.forEach(view => {
        view.style.display = view.id === viewIdToShow ? 'block' : 'none';
    });
    viewButtons.forEach(button => {
        button.classList.toggle('active-view', button.dataset.view === viewIdToShow);
    });

    // --- Add Logic to Disable/Enable Modal Buttons ---
    // Only enable if on dashboard view (where skill summary is visible)
    const enableSkillModalButtons = (viewIdToShow === 'dashboard-view');
    if (skillModalSaveButton) skillModalSaveButton.disabled = !enableSkillModalButtons;
    if (skillModalResetButton) skillModalResetButton.disabled = !enableSkillModalButtons;
    // --- End Logic ---


    localStorage.setItem('activeView', viewIdToShow);
    console.log(`Switched to view: ${viewIdToShow}`);
    // Close the modal automatically if switching away from the dashboard view
    if (!enableSkillModalButtons && document.getElementById('skill-editor-modal').style.display === 'block') {
         closeSkillEditor();
    }
}

/**
 * Populates and displays the skill editor modal.
 */
export function openSkillEditor() {
    const modal = document.getElementById('skill-editor-modal');
    const editorContainer = document.getElementById('skill-editor-container');
    if (!modal || !editorContainer) return;
    editorContainer.innerHTML = '';

    // Populate modal based on current skillRequirements data
    const sortedSkills = [...skillRequirements].sort((a, b) => a.skill.localeCompare(b.skill));
    sortedSkills.forEach(skill => {
        // ... (Code to create skill editor item HTML - remains the same) ...
         const currentRate = skill.xpPerHour;
         const skillEditorItem = document.createElement('div');
         skillEditorItem.className = 'skill-editor-item';
         skillEditorItem.innerHTML = `
             <label for="skill-${skill.skill.toLowerCase()}">${skill.skill}:</label>
             <input type="number" id="skill-${skill.skill.toLowerCase()}"
                    value="${skill.current}" min="1" max="99" ${skill.skill === 'Hitpoints' ? 'min="10"' : ''}>
             <div class="rate-section">
                 <input type="text" inputmode="numeric" pattern="[0-9,]*" id="rate-${skill.skill.toLowerCase()}" class="skill-editor-rate-input"
                        value="${currentRate.toLocaleString()}" title="XP Per Hour">
                 <label for="rate-${skill.skill.toLowerCase()}" class="rate-label">XP/hr</label>
             </div>
         `;
        editorContainer.appendChild(skillEditorItem);
    });
    modal.style.display = 'block';
    // NOTE: Rate input formatting listeners are attached globally at the bottom
}

/**
 * Creates the HTML for a list of tasks for a specific difficulty,
 * including inline requirements and a "Toggle All" checkbox.
 * @param {string} diaryKey
 * @param {string} difficulty
 * @returns {HTMLElement} - The container div (task-category) with the tasks and controls.
 */
function createTaskSection(diaryKey, difficulty) {
    const diaryData = diaries[diaryKey];
    // --- Access the new task object array ---
    const tasks = diaryData?.tasks?.[difficulty];
    if (!tasks || tasks.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = `task-category difficulty-${difficulty}`;
        emptyDiv.dataset.difficulty = difficulty;
        emptyDiv.innerHTML = `<h4>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Tasks</h4><p style="color: var(--text-secondary); font-style: italic;">(No tasks defined for this difficulty yet)</p>`;
        return emptyDiv;
    }
    // -------------------------------------

    const totalTasks = tasks.length;

    // --- Create container elements ---
    const taskCategory = document.createElement('div');
    taskCategory.className = `task-category difficulty-${difficulty}`; // Add difficulty class
    taskCategory.dataset.difficulty = difficulty; // Store difficulty

    // Container for H4 and Toggle All
    const headerContainer = document.createElement('div');
    headerContainer.className = 'difficulty-header-controls';

    const headerElement = document.createElement('h4');
    headerElement.innerHTML = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Tasks <span class="difficulty-indicator difficulty-${difficulty}">${difficulty}</span>`;

    // --- Create "Complete All" Checkbox ---
    const completeAllDiv = document.createElement('div');
    completeAllDiv.className = 'complete-all-control';
    const masterCheckboxId = `complete-all-${diaryKey}-${difficulty}`;
    completeAllDiv.innerHTML = `
        <input type="checkbox" class="complete-all-checkbox" id="${masterCheckboxId}" data-diary="${diaryKey}" data-difficulty="${difficulty}">
        <label for="${masterCheckboxId}">Toggle All</label>
    `;
    // Attach event listener (handler function imported from events.js)
    completeAllDiv.querySelector('.complete-all-checkbox').addEventListener('change', handleCompleteAllToggle);
    // ------------------------------------

    headerContainer.appendChild(headerElement);
    headerContainer.appendChild(completeAllDiv); // Add checkbox next to header
    taskCategory.appendChild(headerContainer); // Add the combined header controls

    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks';

    // --- Loop through TASK OBJECTS ---
    tasks.forEach((taskData, index) => {
        const task = document.createElement('div');
        task.className = 'task';

        // --- Generate Requirements String & Skill Data ---
        const requirementsString = taskData.requires.join(', '); // Simple comma-separated list
        const skillReqHighlightData = taskData.requires
            .map(req => req.match(/^([a-zA-Z\s]+)\s\d+$/)?.[1]?.trim()) // Extract skill names
            .filter(Boolean) // Remove null/undefined
            .join(' '); // Space-separated list for data attribute
        task.dataset.requiresSkill = skillReqHighlightData; // For highlighting
        // ----------------------------------------------

        const checkboxId = `task-${diaryKey}-${difficulty}-${index}`;
        task.innerHTML = `
            <input type="checkbox" class="task-checkbox" id="${checkboxId}"
                   data-diary="${diaryKey}" data-difficulty="${difficulty}" data-index="${index}">
            <label class="task-description" for="${checkboxId}">
                ${taskData.description}
                ${taskData.requires.length > 0 ? // Only show reqs span if array isn't empty
                    `<span class="task-requirements">(${requirementsString})</span>` : ''}
            </label>
        `;
        // ---------------------------------------------

        task.querySelector('.task-checkbox').addEventListener('change', handleDiaryTaskChange);
        tasksContainer.appendChild(task);
    });
    // --- End Task Loop ---

    taskCategory.appendChild(tasksContainer);

    // Add progress elements (unchanged)
    const progressContainer = document.createElement('div');
    progressContainer.className = `progress-container difficulty-${difficulty}`; // Style per difficulty
    progressContainer.innerHTML = `<div class="progress-bar" style="width: 0%;"></div>`;
    taskCategory.appendChild(progressContainer);

    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `0/${totalTasks} tasks completed`; // Initial state
    taskCategory.appendChild(progressText);

    return taskCategory;
}

/**
 * Hides the skill editor modal.
 */
export function closeSkillEditor() {
    const modal = document.getElementById('skill-editor-modal');
    if(modal) modal.style.display = 'none';
}

/**
 * Updates the main dashboard summary section with current progress percentages.
 */
export function updateDashboardSummaryProgress() {
    const milestoneContainer = document.getElementById('summary-milestones');
    const gearContainer = document.getElementById('summary-gear');
    const diaryContainer = document.getElementById('summary-diaries');

    // Exit if any container is missing
    if (!milestoneContainer || !gearContainer || !diaryContainer) {
        console.error("One or more dashboard summary containers not found!");
        return;
    }

    // Helper function to create a summary row (keep this definition)
    const createSummaryRow = (label, percentage, color) => {
        const row = document.createElement('div');
        row.className = 'summary-progress-row';
        row.innerHTML = `
            <span class="summary-label">${label}</span>
            <div class="summary-bar-container">
                <div class="summary-bar" style="width: ${percentage}%; background-color: ${color};"></div>
            </div>
            <span class="summary-percentage">${percentage}%</span>
        `;
        return row;
    };

    // --- Update Milestones (Reads from milestoneGoalsData - NO CHANGE NEEDED) ---
    milestoneContainer.innerHTML = '';
    for (const tierKey in milestoneGoalsData) {
        const tier = milestoneGoalsData[tierKey];
        const total = tier.goals.length;
        const completed = tier.goals.filter(g => g.achieved).length;
        const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0;
        milestoneContainer.appendChild(createSummaryRow(tier.name, percentage, tier.color));
    }

    // --- Update Gear (Reads from gearProgressionData - NO CHANGE NEEDED) ---
    gearContainer.innerHTML = '';
    for (const stageKey in gearProgressionData) {
        const stage = gearProgressionData[stageKey];
        const total = stage.items.length;
        const completed = stage.items.filter(i => i.achieved).length;
        const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0;
        gearContainer.appendChild(createSummaryRow(stage.name, percentage, stage.color));
    }

    // --- Update Diaries (Reads from loadedGlobalDiaryProgress - CORRECTED LOGIC) ---
    diaryContainer.innerHTML = '';
    const diaryLevels = { // Define colors for summary bars
        Easy: { color: '#4CAF50', percentage: 0 },
        Medium: { color: '#FFC107', percentage: 0 },
        Hard: { color: '#FF5722', percentage: 0 },
        Elite: { color: '#9C27B0', percentage: 0 }
    };

    // Use the module-scoped variable holding the loaded diary progress
    const savedProgress = loadedGlobalDiaryProgress;

    // Calculate percentage for each difficulty level ACROSS ALL diaries using SAVED data
    for (const diffLevel in diaryLevels) { // e.g., "Easy", "Medium"
        let totalTasksForDiff = 0;
        let completedTasksForDiff = 0;
        const difficultyLower = diffLevel.toLowerCase(); // e.g., "easy", "medium"

        for (const diaryKey in diaries) { // Loop through all diaries defined in data.js
             // Get total task count for this difficulty from data.js structure
            totalTasksForDiff += diaries[diaryKey]?.tasks?.[difficultyLower]?.length || 0;
             // Get completed count for this difficulty from the SAVED progress object
            completedTasksForDiff += savedProgress?.[diaryKey]?.[difficultyLower]?.length || 0;
        }
        // Calculate and store the percentage
        diaryLevels[diffLevel].percentage = totalTasksForDiff > 0 ? Math.floor((completedTasksForDiff / totalTasksForDiff) * 100) : 0;
    }

    // Add summary rows for each difficulty
    for (const levelName in diaryLevels) {
        const levelData = diaryLevels[levelName];
        diaryContainer.appendChild(createSummaryRow(levelName, levelData.percentage, levelData.color));
    }
    // --- End Diary Update ---

} // End of updateDashboardSummaryProgress


// --- Global listeners for Skill Editor Rate Inputs (Can stay here as they relate to UI created here) ---
document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains('skill-editor-rate-input')) {
        event.target.value = event.target.value.replace(/,/g, '');
    }
});
document.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('skill-editor-rate-input')) {
        let value = event.target.value.replace(/,/g, '');
        const skillNameMatch = event.target.id.match(/rate-(.+)/);
        if (/^\d+$/.test(value) && value.length > 0) {
            event.target.value = parseInt(value, 10).toLocaleString();
        } else if (skillNameMatch) {
            const skillNameCapitalized = skillNameMatch[1].charAt(0).toUpperCase() + skillNameMatch[1].slice(1);
            const currentSkillData = skillRequirements.find(s => s.skill === skillNameCapitalized); // Use actual skill name
            event.target.value = currentSkillData ? currentSkillData.xpPerHour.toLocaleString() : '0';
        } else {
            event.target.value = '0'; // Fallback
        }
    }
});
document.addEventListener('input', (event) => {
    if (event.target.classList.contains('skill-editor-rate-input')) {
        let value = event.target.value.replace(/,/g, '');
        if (/^\d+$/.test(value)) {
            event.target.value = parseInt(value, 10).toLocaleString();
        } else if (value === '') {
            event.target.value = '';
        } else {
            event.target.value = value.replace(/[^\d]/g, '');
            if(event.target.value) {
                event.target.value = parseInt(event.target.value, 10).toLocaleString();
            }
        }
    }
});