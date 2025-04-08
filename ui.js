// ui.js
// Description: Functions related to updating the User Interface (DOM manipulation).

// --- IMPORTS ---
// Import data needed to display information
import { skillRequirements, miscellaneousGoals, milestoneGoalsData, gearProgressionData, diaries } from './data.js';
// Import calculation functions used for display logic
import { totalXpForLevel, formatXp, calculateHoursNeeded, parseBoostAmount, calculateCombatLevel } from './calculations.js';
// Import specific event handlers needed for attaching listeners IN this module
import { handleDragStart, handleDragOver, handleDragEnd, handleDragLeave, handleDrop, handleMilestoneGoalChange, handleGearItemChange, handleMiscGoalCheck, handleMiscGoalDescChange, handleMiscGoalDescKey, handleMiscGoalRemove, handleDiaryTaskChange } from './events.js';
// NOTE: We import handlers that are attached *during UI population*.
// Handlers attached directly in app.js (like navigation, main save button) don't need to be imported here.

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
 * Populates the diary cards and their content in the DOM.
 * Attaches event listeners for diary task checkboxes.
 */
export function populateDiaries() {
    const diariesData = window.diaries || diaries; // Use imported diaries data preferably

    for (const [diaryKey, diary] of Object.entries(diariesData)) {
        const diaryContent = document.getElementById(`${diaryKey}-diary`);
        const diaryHeader = document.querySelector(`.diary-header[data-diary="${diaryKey}"]`);
        if (!diaryContent || !diaryHeader) continue;

        diaryContent.innerHTML = ''; // Clear existing content
        const difficulty = 'elite'; // Hardcoded for now
        const tasks = diary.tasks[difficulty] || [];
        const totalTasks = tasks.length;

        // Calculate required skills string for data attribute
        const diarySkillReqs = new Set();
        if (diary.requirements) {
            diary.requirements.forEach(req => {
                const match = req.match(/^([a-zA-Z\s]+)\s(\d+)$/);
                if (match) diarySkillReqs.add(match[1].trim());
            });
        }
        const skillReqString = Array.from(diarySkillReqs).join(' ');

        // --- Reset Header Count & Progress Text Visually ---
        const headerTaskCount = document.querySelector(`.diary-header[data-diary="${diaryKey}"] .diary-tasks-count`);
        if (headerTaskCount) headerTaskCount.textContent = `0/${totalTasks} Elite`;

        // We can't reliably find the old progress text here after clearing innerHTML,
        // so we'll just recreate it below.

        // Create task category elements
        const taskCategory = document.createElement('div');
        taskCategory.className = 'task-category';
        const headerElement = document.createElement('h4'); // Renamed variable to avoid conflict
        headerElement.innerHTML = `Elite Tasks <span class="difficulty-indicator difficulty-${difficulty}">${difficulty}</span>`;
        taskCategory.appendChild(headerElement);
        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'tasks';

        // Create individual task elements
        tasks.forEach((taskText, index) => {
            const task = document.createElement('div');
            task.className = 'task';
            task.setAttribute('data-requires-skill', skillReqString);
            task.innerHTML = `
                <input type="checkbox" class="task-checkbox" id="task-${diaryKey}-${difficulty}-${index}"
                       data-diary="${diaryKey}" data-difficulty="${difficulty}" data-index="${index}">
                <label class="task-description" for="task-${diaryKey}-${difficulty}-${index}">${taskText}</label>
            `;
            task.querySelector('.task-checkbox').addEventListener('change', handleDiaryTaskChange);
            tasksContainer.appendChild(task);
        });
        taskCategory.appendChild(tasksContainer);

        // Add progress bar and text elements
        const progressContainer = document.createElement('div');
        progressContainer.className = `progress-container difficulty-${difficulty}`;
        progressContainer.innerHTML = `<div class="progress-bar" style="width: 0%;"></div>`;
        taskCategory.appendChild(progressContainer);

        // ***** FIX HERE *****
        // Create the progressText element before using it
        const progressText = document.createElement('div');
        // ********************

        progressText.className = 'progress-text';
        progressText.textContent = `0/${totalTasks} tasks completed`; // Initialize text
        taskCategory.appendChild(progressText); // Append the newly created element

        diaryContent.appendChild(taskCategory);

        // Add skill requirements section
        if (diary.requirements && diary.requirements.length > 0) {
             const reqContainer = document.createElement('div');
             reqContainer.className = 'skill-requirements';
             reqContainer.innerHTML = '<h4>Skill Requirements</h4>';
             diary.requirements.forEach(requirement => {
                // ... (rest of skill requirement logic is likely fine) ...
                const match = requirement.match(/^([a-zA-Z\s]+)\s(\d+)$/);
                if (!match) return;
                 const skillName = match[1].trim();
                 const levelRequired = parseInt(match[2]);
                 const skillData = skillRequirements.find(s => s.skill === skillName);
                 const currentLevel = skillData ? skillData.current : 1;
                 const isMet = currentLevel >= levelRequired;
                 const boost = skillData?.boost;
                 const boostAmount = parseBoostAmount(boost);
                 const canBoostMeet = !isMet && boostAmount > 0 && (currentLevel + boostAmount >= levelRequired);

                 const reqDiv = document.createElement('div');
                 reqDiv.className = 'skill-requirement';
                 const skillNameSpan = document.createElement('span');
                 skillNameSpan.textContent = requirement;
                  if (boost && boost !== 'N/A') {
                     skillNameSpan.classList.add('tooltip');
                     skillNameSpan.innerHTML += `<span class="tooltiptext">Boost: ${boost}</span>`;
                 }
                 const skillLevelSpan = document.createElement('span');
                 skillLevelSpan.className = isMet ? 'skill-met' : 'skill-not-met';
                 skillLevelSpan.textContent = `${currentLevel}/${levelRequired}`;
                  if (!isMet && canBoostMeet) {
                     skillLevelSpan.innerHTML += ` <span style="color: var(--accent-yellow); font-size:0.9em;" title="Boostable">(B)</span>`;
                 }
                 reqDiv.appendChild(skillNameSpan);
                 reqDiv.appendChild(skillLevelSpan);
                 reqContainer.appendChild(reqDiv);
             });
             diaryContent.appendChild(reqContainer);
        }
    }
     console.log("Diaries populated."); // Keep or remove log as desired
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

/**
 * Applies the loaded diary progress data to the checkboxes in the DOM.
 * Should be called AFTER populateDiaries has run.
 * @param {object} loadedProgressData - The diary progress object loaded from storage.
 */
export function applyLoadedDiaryProgress(loadedProgressData) {
    console.log("Applying loaded diary progress to DOM...");
    // Reset all checkboxes first for a clean slate
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.task')?.classList.remove('task-completed'); // Also reset visual style
    });

    if (!loadedProgressData || typeof loadedProgressData !== 'object') {
        console.log("No valid diary progress data to apply.");
        return;
    }

    // Iterate through the loaded data and check the corresponding boxes
    for (const [diaryKey, difficulties] of Object.entries(loadedProgressData)) {
        if (!difficulties || typeof difficulties !== 'object') continue; // Skip invalid difficulty data

        for (const [difficulty, indices] of Object.entries(difficulties)) {
            if (!Array.isArray(indices)) continue; // Skip invalid index array

            indices.forEach(index => {
                const checkbox = document.querySelector(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"][data-index="${index}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.closest('.task')?.classList.add('task-completed'); // Apply visual style
                } else {
                    // This might happen if diary structure changes, safe to log
                    // console.warn(`Checkbox not found for ${diaryKey}-${difficulty}-${index}`);
                }
            });
        }
    }
    console.log("Finished applying loaded diary progress.");

    // --- Crucial: Update progress displays AFTER applying loaded state ---
    Object.keys(diaries).forEach(diaryKey => { // Use the imported diaries data keys
        // Assuming only elite for now, adjust if other difficulties are added
        updateTaskProgressDisplay(diaryKey, 'elite');
        updateDiaryHeaderProgress(diaryKey);
    });
    updateGlobalProgress(); // Update overall header stats
    updateDashboardSummaryProgress(); // Update the summary section too
}

/**
 * Updates the progress bar and text for a specific diary difficulty.
 * @param {string} diaryKey - The key for the diary (e.g., 'ardougne').
 * @param {string} difficulty - The difficulty tier (e.g., 'elite').
 */
export function updateTaskProgressDisplay(diaryKey, difficulty) {
    // Find relevant DOM elements for this specific diary/difficulty
    const diaryContent = document.getElementById(`${diaryKey}-diary`);
    if (!diaryContent) return;
    // Assuming only one task-category per diary content for Elite
    const categoryContainer = diaryContent.querySelector(`.task-category`);
    if (!categoryContainer) return;
    const progressBar = categoryContainer.querySelector(`.progress-bar`);
    const progressText = categoryContainer.querySelector(`.progress-text`);
    const tasks = diaryContent.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`);

    // Calculate progress
    const completed = Array.from(tasks).filter(task => task.checked).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.floor((completed / total) * 100) : 0;

    // Update DOM
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${completed}/${total} tasks completed`;
}

/**
 * Updates the header progress (percentage, count, bar) for a specific diary.
 * @param {string} diaryKey - The key for the diary.
 */
export function updateDiaryHeaderProgress(diaryKey) {
    // Calculate progress based on DOM state
    const allTasks = document.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="elite"]`);
    const completedTasks = Array.from(allTasks).filter(task => task.checked).length;
    const totalTasks = allTasks.length;
    const percentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

    // Find header elements
    const diaryHeader = document.querySelector(`.diary-header[data-diary="${diaryKey}"]`);
    if (!diaryHeader) return;
    const percentageSpan = diaryHeader.querySelector('.diary-percentage');
    const countSpan = diaryHeader.querySelector('.diary-tasks-count');
    const progressBar = diaryHeader.querySelector('.diary-progress-bar');

    // Update DOM
    if (percentageSpan) percentageSpan.textContent = `${percentage}%`;
    if (countSpan) countSpan.textContent = `${completedTasks}/${totalTasks} Elite`;
    if (progressBar) progressBar.style.width = `${percentage}%`;
}


/**
 * Updates the global elite diary progress display in the main header stats.
 */
export function updateGlobalProgress() {
    // Calculate progress based on DOM state
    const allEliteTasks = document.querySelectorAll('.task-checkbox[data-difficulty="elite"]');
    const completedEliteTasks = Array.from(allEliteTasks).filter(task => task.checked).length;
    const totalEliteTasks = allEliteTasks.length;
    const percentage = totalEliteTasks > 0 ? Math.floor((completedEliteTasks / totalEliteTasks) * 100) : 0;

    // Update DOM elements
    document.getElementById('elite-completed').textContent = completedEliteTasks;
    document.getElementById('elite-total').textContent = totalEliteTasks;
    document.getElementById('overall-progress').textContent = percentage;
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
 * Shows the specified view and hides others. Updates tab buttons.
 * @param {string} viewIdToShow - The ID of the view container div to show.
 */
export function showView(viewIdToShow) {
    const views = document.querySelectorAll('#dashboard-view, #goals-view, #gear-view');
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
    if (!milestoneContainer || !gearContainer || !diaryContainer) return;

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

    // Update Milestones
    milestoneContainer.innerHTML = '';
    for (const tierKey in milestoneGoalsData) {
        const tier = milestoneGoalsData[tierKey];
        const total = tier.goals.length;
        const completed = tier.goals.filter(g => g.achieved).length;
        const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0;
        milestoneContainer.appendChild(createSummaryRow(tier.name, percentage, tier.color));
    }

    // Update Gear
    gearContainer.innerHTML = '';
    for (const stageKey in gearProgressionData) {
        const stage = gearProgressionData[stageKey];
        const total = stage.items.length;
        const completed = stage.items.filter(i => i.achieved).length;
        const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0;
        gearContainer.appendChild(createSummaryRow(stage.name, percentage, stage.color));
    }

    // Update Diaries
    diaryContainer.innerHTML = '';
    const diaryLevels = {
        Easy: { color: '#ADD8E6', percentage: 0 }, // Hardcoded for now
        Medium: { color: '#90EE90', percentage: 0 }, // Hardcoded for now
        Hard: { color: '#FFB6C1', percentage: 0 }, // Hardcoded for now
        Elite: { color: '#FFD700', percentage: 0 }   // Calculate Elite
    };
    const allEliteTasks = document.querySelectorAll('.task-checkbox[data-difficulty="elite"]');
    const completedEliteTasks = Array.from(allEliteTasks).filter(task => task.checked).length;
    const totalEliteTasks = allEliteTasks.length;
    diaryLevels.Elite.percentage = (totalEliteTasks > 0) ? Math.floor((completedEliteTasks / totalEliteTasks) * 100) : 0;

    for (const levelName in diaryLevels) {
        const levelData = diaryLevels[levelName];
        diaryContainer.appendChild(createSummaryRow(levelName, levelData.percentage, levelData.color));
    }

}


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