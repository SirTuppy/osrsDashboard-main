// ui.js
// Description: Functions related to updating the User Interface (DOM manipulation).

// --- IMPORTS ---
import {
    skillRequirements, miscellaneousGoals, milestoneGoalsData, gearProgressionData,
    diaries, combatAchievementsData, combatAchievementTiers, diaryCompletionState,
    customSkillXPRates,
    questUnlocksData, // <-- Import quest data structures
    majorMilestonesData,
    questCompletionState // <-- Import quest completion state
} from './data.js';
import { totalXpForLevel, formatXp, calculateHoursNeeded, parseBoostAmount, calculateCombatLevel } from './calculations.js';
import {
    handleDragStart, handleDragOver, handleDragEnd, handleDragLeave, handleDrop,
    handleMilestoneGoalChange, handleGearItemChange, handleMiscGoalCheck,
    handleMiscGoalDescChange, handleMiscGoalDescKey, handleMiscGoalRemove,
    handleDiaryTaskChange, handleCompleteAllToggle, handleCombatTaskChange,
    handleQuestCompletionChange // <-- Import quest event handler
} from './events.js';

// --- Module Scope Variable for Filters ---
let currentCAFilters = {
    tiers: ['all'], types: ['all'], status: 'all', bossSearch: ''
};

// --- Helper Functions ---

function formatGP(amount) { /* ... (implementation from previous response) ... */
    if (amount <= 0) return "0 gp";
    if (amount >= 1000000000) return (amount / 1000000000).toFixed(2) + "b gp";
    if (amount >= 1000000) return (amount / 1000000).toFixed(2) + "m gp";
    if (amount >= 1000) return (amount / 1000).toFixed(1) + "k gp";
    return amount.toLocaleString() + " gp";
}
function toggleBossSection(event) { /* ... (implementation from previous response) ... */
    const header = event.currentTarget;
    const container = header.closest('.ca-boss-container');
    if (!container) return;
    const taskList = container.querySelector('.ca-task-list');
    const icon = header.querySelector('.ca-toggle-icon');
    if (taskList) {
        const isHidden = taskList.style.display === 'none';
        taskList.style.display = isHidden ? 'block' : 'none';
        if (icon) icon.textContent = isHidden ? '▲' : '▼';
        container.classList.toggle('collapsed', !isHidden);
    }
}
function createSkillRequirementsSection(diaryKey, difficulty) { /* ... (implementation from previous response) ... */
    const diaryData = diaries[diaryKey];
    const tasksForDifficulty = diaryData?.tasks?.[difficulty];
    if (!tasksForDifficulty) return null;
    const aggregatedSkillReqs = new Map();
    const skillReqRegex = /^([a-zA-Z\s]+)\s+(\d+)$/;
    tasksForDifficulty.forEach(task => {
        task.requires.forEach(reqStr => {
            const match = reqStr.match(skillReqRegex);
            if (match) {
                const skillName = match[1].trim();
                const level = parseInt(match[2]);
                if (!aggregatedSkillReqs.has(skillName) || level > aggregatedSkillReqs.get(skillName)) {
                    aggregatedSkillReqs.set(skillName, level);
                }
            }
        });
    });
    if (aggregatedSkillReqs.size === 0) return null;
    const reqContainer = document.createElement('div');
    reqContainer.className = 'skill-requirements';
    reqContainer.dataset.difficulty = difficulty;
    reqContainer.innerHTML = `<h4>Skill Requirements (${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})</h4>`;
    const sortedSkillNames = Array.from(aggregatedSkillReqs.keys()).sort();
    sortedSkillNames.forEach(skillName => {
        const levelRequired = aggregatedSkillReqs.get(skillName);
        const skillData = skillRequirements.find(s => s.skill === skillName);
        const currentLevel = skillData ? skillData.current : 1;
        const isMet = currentLevel >= levelRequired;
        const boost = skillData?.boost;
        const boostAmount = parseBoostAmount(boost);
        const canBoostMeet = !isMet && boostAmount > 0 && (currentLevel + boostAmount >= levelRequired);
        const reqDiv = document.createElement('div');
        reqDiv.className = 'skill-requirement';
        const skillNameSpan = document.createElement('span');
        skillNameSpan.textContent = `${skillName} ${levelRequired}`;
        if (boost && boost !== 'N/A') {
            skillNameSpan.classList.add('tooltip');
            skillNameSpan.innerHTML += `<span class="tooltiptext">Boost: ${boost}</span>`;
        }
        const skillLevelSpan = document.createElement('span');
        skillLevelSpan.className = isMet ? 'skill-met' : 'skill-not-met';
        skillLevelSpan.textContent = `${currentLevel}/${levelRequired}`;
        if (!isMet && canBoostMeet) {
            skillLevelSpan.innerHTML += ` <span style="color: var(--accent-yellow-green); font-size:0.9em;" title="Boostable">(B)</span>`;
        }
        reqDiv.appendChild(skillNameSpan);
        reqDiv.appendChild(skillLevelSpan);
        reqContainer.appendChild(reqDiv);
    });
    return reqContainer;
}
function createTaskSection(diaryKey, difficulty) { /* ... (implementation from previous response) ... */
    const diaryData = diaries[diaryKey];
    const tasks = diaryData?.tasks?.[difficulty];
    if (!tasks || tasks.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = `task-category difficulty-${difficulty}`;
        emptyDiv.dataset.difficulty = difficulty;
        emptyDiv.innerHTML = `<h4>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Tasks</h4><p style="color: var(--text-secondary); font-style: italic;">(No tasks defined)</p>`;
        return emptyDiv;
    }
    const totalTasks = tasks.length;
    const taskCategory = document.createElement('div');
    taskCategory.className = `task-category difficulty-${difficulty}`;
    taskCategory.dataset.difficulty = difficulty;
    const headerContainer = document.createElement('div');
    headerContainer.className = 'difficulty-header-controls';
    const headerElement = document.createElement('h4');
    headerElement.innerHTML = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Tasks <span class="difficulty-indicator difficulty-${difficulty}">${difficulty}</span>`;
    const completeAllDiv = document.createElement('div');
    completeAllDiv.className = 'complete-all-control';
    const masterCheckboxId = `complete-all-${diaryKey}-${difficulty}`;
    completeAllDiv.innerHTML = `<input type="checkbox" class="complete-all-checkbox" id="${masterCheckboxId}" data-diary="${diaryKey}" data-difficulty="${difficulty}"><label for="${masterCheckboxId}">Toggle All</label>`;
    const masterCheckbox = completeAllDiv.querySelector('.complete-all-checkbox');
    if (masterCheckbox) masterCheckbox.addEventListener('change', handleCompleteAllToggle);
    headerContainer.appendChild(headerElement);
    headerContainer.appendChild(completeAllDiv);
    taskCategory.appendChild(headerContainer);
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks';
    tasks.forEach((taskData, index) => {
        const task = document.createElement('div');
        task.className = 'task';
        const requirementsString = taskData.requires.join(', ');
        const skillReqHighlightData = taskData.requires.map(req => req.match(/^([a-zA-Z\s]+)\s\d+$/)?.[1]?.trim()).filter(Boolean).join(' ');
        task.dataset.requiresSkill = skillReqHighlightData;
        const checkboxId = `task-${diaryKey}-${difficulty}-${index}`;
        task.innerHTML = `<input type="checkbox" class="task-checkbox" id="${checkboxId}" data-diary="${diaryKey}" data-difficulty="${difficulty}" data-index="${index}"><label class="task-description" for="${checkboxId}">${taskData.description}${taskData.requires.length > 0 ? `<span class="task-requirements">(${requirementsString})</span>` : ''}</label>`;
        const checkbox = task.querySelector('.task-checkbox');
        if (checkbox) checkbox.addEventListener('change', handleDiaryTaskChange);
        tasksContainer.appendChild(task);
    });
    taskCategory.appendChild(tasksContainer);
    const progressContainer = document.createElement('div');
    progressContainer.className = `progress-container difficulty-${difficulty}`;
    progressContainer.innerHTML = `<div class="progress-bar" style="width: 0%;"></div>`;
    taskCategory.appendChild(progressContainer);
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `0/${totalTasks} tasks completed`;
    taskCategory.appendChild(progressText);
    return taskCategory;
}
function applyLoadedChecksToDifficulty(diaryKey, difficulty) { /* ... (implementation from previous response) ... */
    const difficultyIndices = diaryCompletionState?.[diaryKey]?.[difficulty];
    const taskSection = document.querySelector(`#${diaryKey}-diary .task-category[data-difficulty="${difficulty}"]`);
    if (!taskSection) return;
    taskSection.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.task')?.classList.remove('task-completed');
    });
    if (Array.isArray(difficultyIndices)) {
        difficultyIndices.forEach(index => {
            const checkbox = taskSection.querySelector(`.task-checkbox[data-index="${index}"]`);
            if (checkbox) { checkbox.checked = true; checkbox.closest('.task')?.classList.add('task-completed'); }
        });
    }
}
function filterBossTasks(bossTasks, filters) { /* ... (implementation from previous response) ... */
    if (!bossTasks) return [];
    return bossTasks.filter(task => {
        const tierLower = task.tier?.toLowerCase();
        if (!filters.tiers.includes('all') && !filters.tiers.includes(tierLower)) return false;
        const typeLower = task.type?.toLowerCase();
        const filterTypesLower = filters.types.map(t => t.toLowerCase());
        if (!filterTypesLower.includes('all') && !filterTypesLower.includes(typeLower)) return false;
        if (filters.status === 'incomplete' && task.achieved) return false;
        if (filters.status === 'completed' && !task.achieved) return false;
        const searchTermLower = filters.bossSearch.toLowerCase();
        if (searchTermLower && !task.name.toLowerCase().includes(searchTermLower) && !(task.description && task.description.toLowerCase().includes(searchTermLower)) && !(task.boss && task.boss.toLowerCase().includes(searchTermLower))) return false;
        return true;
    });
}
function updateFilterButtonsUI(filters) { /* ... (implementation from previous response) ... */
    const tierContainer = document.getElementById('ca-tier-filters');
    if (tierContainer) tierContainer.querySelectorAll('.filter-button').forEach(btn => btn.classList.toggle('active', filters.tiers.includes(btn.dataset.filterValue)));
    const typeContainer = document.getElementById('ca-type-filters');
    if (typeContainer) typeContainer.querySelectorAll('.filter-button').forEach(btn => { const vL = btn.dataset.filterValue.toLowerCase(); btn.classList.toggle('active', filters.types.some(ft => ft.toLowerCase() === vL)); });
    const statusContainer = document.getElementById('ca-status-filters');
    if (statusContainer) statusContainer.querySelectorAll('.filter-button').forEach(btn => btn.classList.toggle('active', filters.status === btn.dataset.filterValue));
}

// --- EXPORTED UI FUNCTIONS ---

export function getCurrentCAFilters() { return { ...currentCAFilters }; }
export function updateCurrentCAFilters(newFilters) { currentCAFilters = { ...currentCAFilters, ...newFilters }; console.log("Updated CA Filters:", currentCAFilters); }

export function populateSkillSummary(sortBy = 'level') { /* ... (implementation from previous response) ... */
    const skillSummaryElement = document.getElementById('skill-summary');
    if (!skillSummaryElement) return;
    skillSummaryElement.innerHTML = '';
    let sortedSkills = [...skillRequirements].filter(skill => skill.required > 1);
    if (sortBy === 'name') sortedSkills.sort((a, b) => a.skill.localeCompare(b.skill));
    else if (sortBy === 'level') sortedSkills.sort((a, b) => (b.levels - a.levels) || (b.current - a.current));
    else if (sortBy === 'hours') sortedSkills.sort((a, b) => (calculateHoursNeeded(b.xpNeeded, b.xpPerHour) - calculateHoursNeeded(a.xpNeeded, a.xpPerHour)) || (b.levels - a.levels));
    sortedSkills.forEach(skill => {
        const skillProgress = document.createElement('div');
        skillProgress.className = 'skill-progress';
        const isMet = skill.current >= skill.required;
        const progressPercentage = isMet ? 100 : Math.min(100, Math.max(0, Math.floor((totalXpForLevel(skill.current) / totalXpForLevel(skill.required)) * 100)));
        const hoursNeeded = calculateHoursNeeded(skill.xpNeeded, skill.xpPerHour);
        const boostAmount = parseBoostAmount(skill.boost);
        const canBoostMeet = !isMet && boostAmount > 0 && (skill.current + boostAmount >= skill.required);
        const boostIndicatorHTML = canBoostMeet ? `<span class="required-level-indicator" title="Boostable">(B)</span>` : '';
        const formattedXpNeeded = formatXp(skill.xpNeeded);
        skillProgress.innerHTML = `<div class="skill-name clickable" data-skill-name="${skill.skill}">${skill.skill}</div><div class="skill-level"><span class="editable-level" data-skill="${skill.skill}">${skill.current}</span>/${skill.required}${boostIndicatorHTML}</div><div class="skill-progress-container tooltip"><div class="skill-progress-bar" style="width: ${progressPercentage}%"></div>${!isMet && skill.xpNeeded > 0 ? `<div class="xp-info">${formattedXpNeeded} XP</div>` : ''}${skill.boost && skill.boost !== 'N/A' ? `<span class="tooltiptext">Boost: ${skill.boost}</span>` : ''}</div>${isMet ? '<div class="completed-indicator">✓</div>' : (hoursNeeded > 0 ? `<div class="training-time" title="${skill.xpPerHour.toLocaleString()} XP/hr">${hoursNeeded.toFixed(1)} hrs</div>` : '<div class="training-time">-</div>')}`;
        skillSummaryElement.appendChild(skillProgress);
    });
    skillSummaryElement.querySelectorAll('.editable-level').forEach(el => el.addEventListener('click', openSkillEditor));
}

export function updateOverallStats() { /* ... (implementation from previous response) ... */
    let totalLevelsNeeded = 0, totalXpNeeded = 0, totalHoursNeeded = 0;
    skillRequirements.forEach(skill => { if (skill.current < skill.required && skill.required > 1) { totalLevelsNeeded += skill.levels; totalXpNeeded += skill.xpNeeded; totalHoursNeeded += calculateHoursNeeded(skill.xpNeeded, skill.xpPerHour); } });
    const levelsNeededEl = document.getElementById('total-levels-needed');
    const xpNeededEl = document.getElementById('total-xp-needed');
    const timeEl = document.getElementById('total-time');
    if (levelsNeededEl) levelsNeededEl.textContent = totalLevelsNeeded;
    if (xpNeededEl) xpNeededEl.textContent = formatXp(totalXpNeeded);
    if (timeEl) timeEl.textContent = totalHoursNeeded.toFixed(1);
    updateGlobalProgress();
}

export function populateDiaries() { /* ... (implementation from previous response, verified correct) ... */
    const diariesGrid = document.querySelector('#diaries-view .diaries-grid');
    if (!diariesGrid) { console.error("Diary grid container '#diaries-view .diaries-grid' not found!"); return; }
    diariesGrid.innerHTML = '';
    const difficulties = ["easy", "medium", "hard", "elite"];
    for (const [diaryKey, diary] of Object.entries(diaries)) {
        const diaryCard = document.createElement('article'); diaryCard.className = 'diary-card container';
        const diaryHeader = document.createElement('header'); diaryHeader.className = 'diary-header'; diaryHeader.dataset.diary = diaryKey;
        let totalTasksAllDifficulties = 0; difficulties.forEach(diff => { totalTasksAllDifficulties += diary.tasks[diff]?.length || 0; });
        diaryHeader.innerHTML = `<div class="diary-title-row"><span class="diary-name">${diary.name}</span><span class="diary-progress"><span class="diary-percentage">0%</span><span class="diary-tasks-count">0/${totalTasksAllDifficulties} Total</span></span></div><div class="diary-progress-bar-container"><div class="diary-progress-bar progress-${diaryKey}" style="width: 0%;"></div></div>`;
        const diaryContent = document.createElement('div'); diaryContent.className = 'diary-content'; diaryContent.id = `${diaryKey}-diary`;
        const difficultyTabs = document.createElement('nav'); difficultyTabs.className = 'difficulty-tabs';
        let firstAvailableDifficulty = null;
        difficulties.forEach((diff) => { if (diary.tasks[diff]?.length > 0) { if (!firstAvailableDifficulty) firstAvailableDifficulty = diff; const button = document.createElement('button'); button.className = 'diff-button filter-button'; button.dataset.diary = diaryKey; button.dataset.difficulty = diff; button.textContent = diff.charAt(0).toUpperCase() + diff.slice(1); difficultyTabs.appendChild(button); } });
        diaryContent.appendChild(difficultyTabs);
        diaryContent.appendChild(document.createElement('div')).className = 'tasks-area';
        diaryContent.appendChild(document.createElement('div')).className = 'skill-requirements-area';
        diaryCard.appendChild(diaryHeader); diaryCard.appendChild(diaryContent); diariesGrid.appendChild(diaryCard);
        const initialDifficulty = firstAvailableDifficulty || 'easy';
        const initialButton = difficultyTabs.querySelector(`.diff-button[data-difficulty="${initialDifficulty}"]`);
        if (initialButton) initialButton.classList.add('active-diff');
        loadDiaryDifficultyContent(diaryKey, initialDifficulty);
        updateDiaryHeaderProgress(diaryKey);
    }
    console.log("Diary cards populated.");
}

export function loadDiaryDifficultyContent(diaryKey, difficulty) { /* ... (implementation from previous response, verified correct) ... */
    const diaryContent = document.getElementById(`${diaryKey}-diary`); if (!diaryContent) return;
    const tasksArea = diaryContent.querySelector('.tasks-area'); const skillReqArea = diaryContent.querySelector('.skill-requirements-area'); if (!tasksArea || !skillReqArea) return;
    tasksArea.innerHTML = ''; skillReqArea.innerHTML = '';
    const taskSection = createTaskSection(diaryKey, difficulty); if (taskSection) tasksArea.appendChild(taskSection);
    const skillSection = createSkillRequirementsSection(diaryKey, difficulty); if (skillSection) skillReqArea.appendChild(skillSection);
    applyLoadedChecksToDifficulty(diaryKey, difficulty);
    updateTaskProgressDisplay(diaryKey, difficulty);
    updateCompleteAllCheckboxState(diaryKey, difficulty);
    updateAllDiarySkillReqs();
}

export function updateAllDiarySkillReqs() { /* ... (implementation from previous response, verified correct) ... */
    document.querySelectorAll('.skill-requirement').forEach(reqDiv => {
        const skillNameSpan = reqDiv.querySelector('span:first-child'); const skillLevelSpan = reqDiv.querySelector('span:last-child'); if (!skillNameSpan || !skillLevelSpan) return;
        const requirementTextMatch = skillNameSpan.textContent.match(/^([a-zA-Z\s]+)\s(\d+)/); if (!requirementTextMatch) return;
        const skillName = requirementTextMatch[1].trim(); const levelRequired = parseInt(requirementTextMatch[2]);
        const skillData = skillRequirements.find(s => s.skill === skillName); const currentLevel = skillData ? skillData.current : 1; const isMet = currentLevel >= levelRequired;
        const boost = skillData?.boost; const boostAmount = parseBoostAmount(boost); const canBoostMeet = !isMet && boostAmount > 0 && (currentLevel + boostAmount >= levelRequired);
        skillLevelSpan.textContent = `${currentLevel}/${levelRequired}`; let boostIndicator = skillLevelSpan.querySelector('span[title="Boostable"]');
        if (!isMet && canBoostMeet) { if (!boostIndicator) { boostIndicator = document.createElement('span'); boostIndicator.style.color = 'var(--accent-yellow-green)'; boostIndicator.style.fontSize = '0.9em'; boostIndicator.title = 'Boostable'; boostIndicator.textContent = ' (B)'; skillLevelSpan.appendChild(boostIndicator); } }
        else if (boostIndicator) { boostIndicator.remove(); }
        skillLevelSpan.className = isMet ? 'skill-met' : 'skill-not-met';
    });
}

export function updateTaskProgressDisplay(diaryKey, difficulty) { /* ... (implementation from previous response, verified correct) ... */
    const diaryContent = document.getElementById(`${diaryKey}-diary`); if (!diaryContent) return;
    const categoryContainer = diaryContent.querySelector(`.task-category[data-difficulty="${difficulty}"]`); if (!categoryContainer) return;
    const progressBar = categoryContainer.querySelector('.progress-bar'); const progressText = categoryContainer.querySelector('.progress-text');
    const tasks = categoryContainer.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`);
    const completed = Array.from(tasks).filter(task => task.checked).length; const total = tasks.length; const percentage = total > 0 ? Math.floor((completed / total) * 100) : 0;
    if (progressBar) progressBar.style.width = `${percentage}%`; if (progressText) progressText.textContent = `${completed}/${total} tasks completed`;
}

export function updateDiaryHeaderProgress(diaryKey) { /* ... (implementation from previous response, verified correct) ... */
    const diaryHeader = document.querySelector(`.diary-header[data-diary="${diaryKey}"]`); if (!diaryHeader) return;
    let totalTasks = 0, completedTasks = 0; const difficulties = ["easy", "medium", "hard", "elite"]; const diaryData = diaries[diaryKey]; const currentDiaryState = diaryCompletionState;
    if (diaryData?.tasks) { difficulties.forEach(diff => { totalTasks += diaryData.tasks[diff]?.length || 0; completedTasks += currentDiaryState?.[diaryKey]?.[diff]?.length || 0; }); }
    const overallPercentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;
    const percentageSpan = diaryHeader.querySelector('.diary-percentage'); const countSpan = diaryHeader.querySelector('.diary-tasks-count'); const progressBar = diaryHeader.querySelector('.diary-progress-bar');
    if (percentageSpan) percentageSpan.textContent = `${overallPercentage}%`; if (countSpan) countSpan.textContent = `${completedTasks}/${totalTasks} Total`; if (progressBar) progressBar.style.width = `${overallPercentage}%`;
}

export function updateGlobalProgress() { /* ... (implementation from previous response, verified correct) ... */
    let grandTotal = 0, grandCompleted = 0; const difficulties = ["easy", "medium", "hard", "elite"]; const currentDiaryState = diaryCompletionState;
    for (const diaryKey in diaries) { const diaryData = diaries[diaryKey]; if (diaryData?.tasks) { difficulties.forEach(diff => { grandTotal += diaryData.tasks[diff]?.length || 0; grandCompleted += currentDiaryState?.[diaryKey]?.[diff]?.length || 0; }); } }
    const overallPercentage = grandTotal > 0 ? Math.floor((grandCompleted / grandTotal) * 100) : 0;
    const completedSpan = document.getElementById('elite-completed'); const totalSpan = document.getElementById('elite-total'); const progressSpan = document.getElementById('overall-progress');
    if (completedSpan) completedSpan.textContent = grandCompleted; if (totalSpan) totalSpan.textContent = grandTotal; if (progressSpan) progressSpan.textContent = overallPercentage;
}

export function updateCombatLevelDisplay() { /* ... (implementation from previous response, verified correct) ... */
    const combatLevelElement = document.getElementById('combat-level-display'); if (!combatLevelElement) return;
    const currentLevels = {}; skillRequirements.forEach(skill => { if (["Attack", "Strength", "Defence", "Hitpoints", "Prayer", "Ranged", "Magic"].includes(skill.skill)) currentLevels[skill.skill] = skill.current || (skill.skill === "Hitpoints" ? 10 : 1); });
    if (currentLevels.Hitpoints < 10) currentLevels.Hitpoints = 10; const combatLevel = calculateCombatLevel(currentLevels); combatLevelElement.textContent = `Combat Level: ${combatLevel}`;
}

export function populateMiscellaneousGoals() { /* ... (implementation from previous response, verified correct) ... */
    const goalsContainer = document.getElementById('miscellaneous-goals'); if (!goalsContainer) return; goalsContainer.innerHTML = '';
    if (miscellaneousGoals.length === 0) { goalsContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 10px 0;">No miscellaneous goals added yet.</p>'; return; }
    miscellaneousGoals.forEach((goal, index) => {
        const goalDiv = document.createElement('div'); goalDiv.className = 'task draggable-goal'; if (goal.completed) goalDiv.classList.add('task-completed');
        goalDiv.draggable = true; goalDiv.dataset.index = index;
        goalDiv.innerHTML = `<div class="drag-handle" title="Drag to reorder">☰</div><input type="checkbox" class="goal-checkbox" id="misc-goal-${index}" data-index="${index}" ${goal.completed ? 'checked' : ''}><input type="text" class="task-description" value="${goal.description}" placeholder="Enter goal..." data-index="${index}"><button class="remove-goal-button" data-index="${index}" title="Remove goal">×</button>`;
        goalDiv.querySelector('.goal-checkbox').addEventListener('change', handleMiscGoalCheck); goalDiv.querySelector('input[type="text"]').addEventListener('change', handleMiscGoalDescChange); goalDiv.querySelector('input[type="text"]').addEventListener('keypress', handleMiscGoalDescKey); goalDiv.querySelector('.remove-goal-button').addEventListener('click', handleMiscGoalRemove);
        goalDiv.addEventListener('dragstart', handleDragStart); goalDiv.addEventListener('dragover', handleDragOver); goalDiv.addEventListener('dragleave', handleDragLeave); goalDiv.addEventListener('dragend', handleDragEnd); goalDiv.addEventListener('drop', handleDrop);
        goalsContainer.appendChild(goalDiv);
    });
}

export function updateMilestoneTierProgress(tierKey) { /* ... (implementation from previous response, verified correct) ... */
    const tierData = milestoneGoalsData[tierKey]; if (!tierData?.goals) return; const totalGoals = tierData.goals.length; if (totalGoals === 0) return;
    const completedGoals = tierData.goals.filter(goal => goal.achieved).length; const percentage = Math.floor((completedGoals / totalGoals) * 100);
    const container = document.getElementById(`${tierKey}-goals-container`); if (!container) return;
    const progressBar = container.querySelector('.goal-progress-bar'); const percentageSpan = container.querySelector('.goal-percentage');
    if (progressBar) progressBar.style.width = `${percentage}%`; if (percentageSpan) percentageSpan.textContent = `${percentage}%`;
}

export function populateMilestoneGoals() { /* ... (implementation from previous response, verified correct) ... */
    const goalsGrid = document.querySelector('#goals-view .goals-grid'); if (!goalsGrid) return; goalsGrid.innerHTML = '';
    for (const tierKey in milestoneGoalsData) {
        const tierData = milestoneGoalsData[tierKey]; const tierContainer = document.createElement('div'); tierContainer.className = 'goal-tier-container container'; tierContainer.id = `${tierKey}-goals-container`;
        const header = document.createElement('div'); header.className = 'goal-tier-header'; header.innerHTML = `<h3>${tierData.name}</h3><div class="goal-progress-container"><div class="goal-progress-bar" style="background-color: ${tierData.color || 'var(--accent-blue)'}; width: 0%;"></div></div><span class="goal-percentage" id="${tierKey}-goal-percentage">0%</span>`;
        const goalList = document.createElement('div'); goalList.className = 'tasks goal-list';
        tierData.goals.forEach((goal, index) => {
            const taskDiv = document.createElement('div'); taskDiv.className = 'task'; if (goal.achieved) taskDiv.classList.add('task-completed');
            taskDiv.innerHTML = `<input type="checkbox" class="milestone-goal-checkbox" id="mg-${tierKey}-${index}" data-tier="${tierKey}" data-index="${index}" ${goal.achieved ? 'checked' : ''}><label class="task-description" for="mg-${tierKey}-${index}">${goal.name}</label>${goal.info ? `<span class="goal-info">${goal.info}</span>` : ''}`;
            const checkbox = taskDiv.querySelector('.milestone-goal-checkbox'); if (checkbox) checkbox.addEventListener('change', handleMilestoneGoalChange); goalList.appendChild(taskDiv);
        });
        tierContainer.appendChild(header); tierContainer.appendChild(goalList); goalsGrid.appendChild(tierContainer); updateMilestoneTierProgress(tierKey);
    }
}

export function updateCumulativeGoalProgress() { /* ... (implementation from previous response, verified correct) ... */
    const progressBar = document.getElementById('cumulative-progress-bar'); const percentageSpan = document.getElementById('cumulative-percentage'); if (!progressBar || !percentageSpan) return;
    let total = 0, completed = 0; for (const tierKey in milestoneGoalsData) { if(milestoneGoalsData[tierKey]?.goals) { total += milestoneGoalsData[tierKey].goals.length; completed += milestoneGoalsData[tierKey].goals.filter(g => g.achieved).length; } }
    const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0; progressBar.style.width = `${percentage}%`; percentageSpan.textContent = `${percentage}%`;
}

export function populateGearProgression() { /* ... (implementation from previous response, verified correct) ... */
    const gearGrid = document.querySelector('#gear-view .gear-stages-grid'); if (!gearGrid) return; gearGrid.innerHTML = '';
    for (const stageKey in gearProgressionData) {
        const stageData = gearProgressionData[stageKey]; if (!stageData?.items?.length) continue;
        const stageContainer = document.createElement('div'); stageContainer.className = 'gear-stage-container container'; stageContainer.id = `gp-${stageKey}-container`;
        const header = document.createElement('div'); header.className = 'gear-stage-header'; header.innerHTML = `<h3>${stageData.name}</h3><div class="goal-progress-container"><div id="gp-${stageKey}-progress-bar" class="goal-progress-bar" style="background-color: ${stageData.color || 'var(--accent-blue-muted)'}; width: 0%;"></div></div><span id="gp-${stageKey}-percentage" class="goal-percentage">0%</span><span class="stage-cost" id="cost-${stageKey}">Cost: ...</span>`;
        const itemList = document.createElement('div'); itemList.className = 'gear-item-list';
        stageData.items.forEach((item, index) => {
            const itemDiv = document.createElement('div'); itemDiv.className = 'task gear-item'; if (item.achieved) itemDiv.classList.add('task-completed');
            const iconFileName = item.style === 'all' ? 'hitpoints.png' : `${item.style}.png`; const iconSrc = `icons/${iconFileName}`; const priceString = (item.price > 0) ? `<span class="item-price">(${formatGP(item.price)})</span>` : '';
            itemDiv.innerHTML = `<input type="checkbox" class="gear-item-checkbox" id="gi-${stageKey}-${index}" data-stage="${stageKey}" data-index="${index}" ${item.achieved ? 'checked' : ''}><label class="task-description" for="gi-${stageKey}-${index}">${item.name} ${priceString}</label><img src="${iconSrc}" alt="${item.style}" class="gear-style-icon" title="${item.style} style">`;
            const checkbox = itemDiv.querySelector('.gear-item-checkbox'); if (checkbox) checkbox.addEventListener('change', handleGearItemChange); itemList.appendChild(itemDiv);
        });
        stageContainer.appendChild(header); stageContainer.appendChild(itemList); gearGrid.appendChild(stageContainer);
        updateGearStageProgress(stageKey); updateGearStageCost(stageKey);
    }
}

export function updateGearStageProgress(stageKey) { /* ... (implementation from previous response, verified correct) ... */
    const stageData = gearProgressionData[stageKey]; if (!stageData?.items?.length) return; const total = stageData.items.length; const completed = stageData.items.filter(item => item.achieved).length; const percentage = Math.floor((completed / total) * 100);
    const progressBar = document.getElementById(`gp-${stageKey}-progress-bar`); const percentageSpan = document.getElementById(`gp-${stageKey}-percentage`);
    if (progressBar) progressBar.style.width = `${percentage}%`; if (percentageSpan) percentageSpan.textContent = `${percentage}%`;
}

export function updateGearStageCost(stageKey) { /* ... (implementation from previous response, verified correct) ... */
    const stageData = gearProgressionData[stageKey]; const costElement = document.getElementById(`cost-${stageKey}`); if (!stageData?.items || !costElement) { if (costElement) costElement.textContent = "Cost: N/A"; return; }
    let totalCost = 0; stageData.items.forEach(item => { if (!item.achieved && item.price > 0) totalCost += item.price; });
    costElement.textContent = `Cost: ${formatGP(totalCost)}`; costElement.title = `Total cost of remaining items: ${totalCost.toLocaleString()} gp`;
}

export function updateCumulativeGearProgress() { /* ... (implementation from previous response, verified correct) ... */
    const progressBar = document.getElementById('cumulative-gear-progress-bar'); const percentageSpan = document.getElementById('cumulative-gear-percentage'); if (!progressBar || !percentageSpan) return;
    let total = 0, completed = 0; for (const stageKey in gearProgressionData) { if (gearProgressionData[stageKey]?.items) { total += gearProgressionData[stageKey].items.length; completed += gearProgressionData[stageKey].items.filter(i => i.achieved).length; } }
    const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0; progressBar.style.width = `${percentage}%`; percentageSpan.textContent = `${percentage}%`;
}

export function updateCompleteAllCheckboxState(diaryKey, difficulty) { /* ... (implementation from previous response, verified correct) ... */
    const masterCheckbox = document.getElementById(`complete-all-${diaryKey}-${difficulty}`); if (!masterCheckbox) return; const taskCategory = masterCheckbox.closest('.task-category'); if (!taskCategory) return;
    const taskCheckboxes = taskCategory.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`); const totalTasks = taskCheckboxes.length; if (totalTasks === 0) { masterCheckbox.checked = false; masterCheckbox.indeterminate = false; masterCheckbox.disabled = true; return; }
    const completedTasks = Array.from(taskCheckboxes).filter(cb => cb.checked).length; masterCheckbox.disabled = false;
    if (completedTasks === 0) { masterCheckbox.checked = false; masterCheckbox.indeterminate = false; } else if (completedTasks === totalTasks) { masterCheckbox.checked = true; masterCheckbox.indeterminate = false; } else { masterCheckbox.checked = false; masterCheckbox.indeterminate = true; }
}

export function showView(viewIdToShow) { // <-- Includes the fix
    const views = document.querySelectorAll('#dashboard-view, #goals-view, #gear-view, #diaries-view, #combat-tasks-view, #quests-view'); // <-- Added quests-view
    const viewButtons = document.querySelectorAll('.view-navigation .filter-button');
    const skillModalSaveButton = document.getElementById('save-skills');
    const skillModalResetButton = document.getElementById('reset-skills');
    const skillEditorButton = document.getElementById('edit-skills-button');

    let foundView = false;
    views.forEach(view => {
        // Correct assignment logic
        if (view.id === viewIdToShow) {
            view.style.display = 'block';
            foundView = true;
        } else {
             view.style.display = 'none';
        }
    });

    // Fallback if viewId doesn't exist or isn't found
    if (!foundView) {
        console.warn(`View ID "${viewIdToShow}" not found. Defaulting to dashboard.`);
        viewIdToShow = 'dashboard-view'; // Correct default assignment
        const dashboardView = document.getElementById('dashboard-view');
        if (dashboardView) {
            dashboardView.style.display = 'block'; // Correct display setting
        }
    }

    viewButtons.forEach(button => {
        button.classList.toggle('active-view', button.dataset.view === viewIdToShow);
    });

    const enableSkillModalButtons = (viewIdToShow === 'dashboard-view');
    if (skillModalSaveButton) skillModalSaveButton.disabled = !enableSkillModalButtons;
    if (skillModalResetButton) skillModalResetButton.disabled = !enableSkillModalButtons;
    if (skillEditorButton) skillEditorButton.disabled = !enableSkillModalButtons;

    localStorage.setItem('activeView', viewIdToShow);
    console.log(`Switched to view: ${viewIdToShow}`);

    if (!enableSkillModalButtons && document.getElementById('skill-editor-modal')?.style.display === 'block') {
        closeSkillEditor();
    }
}

export function openSkillEditor() { /* ... (implementation from previous response) ... */
    const modal = document.getElementById('skill-editor-modal'); const editorContainer = document.getElementById('skill-editor-container'); if (!modal || !editorContainer) return; editorContainer.innerHTML = '';
    const sortedSkills = [...skillRequirements].sort((a, b) => a.skill.localeCompare(b.skill));
    sortedSkills.forEach(skill => {
        const currentRate = skill.xpPerHour; const skillEditorItem = document.createElement('div'); skillEditorItem.className = 'skill-editor-item';
        skillEditorItem.innerHTML = `<label for="skill-${skill.skill.toLowerCase()}">${skill.skill}:</label><input type="number" id="skill-${skill.skill.toLowerCase()}" value="${skill.current}" min="1" max="99" ${skill.skill === 'Hitpoints' ? 'min="10"' : ''}><div class="rate-section"><input type="text" inputmode="numeric" pattern="[0-9,]*" id="rate-${skill.skill.toLowerCase()}" class="skill-editor-rate-input" value="${currentRate.toLocaleString()}" title="XP Per Hour"><label for="rate-${skill.skill.toLowerCase()}" class="rate-label">XP/hr</label></div>`;
        editorContainer.appendChild(skillEditorItem);
    });
    modal.style.display = 'block';
}

export function closeSkillEditor() { /* ... (implementation from previous response) ... */
    const modal = document.getElementById('skill-editor-modal'); if (modal) modal.style.display = 'none';
}

export function updateDashboardSummaryProgress() { /* ... (implementation from previous response, verified correct) ... */
    const milestoneContainer = document.getElementById('summary-milestones'); const gearContainer = document.getElementById('summary-gear'); const diaryContainer = document.getElementById('summary-diaries'); const caContainer = document.getElementById('summary-combat-tasks'); if (!milestoneContainer || !gearContainer || !diaryContainer || !caContainer) return;
    const createSummaryRow = (label, percentage, color) => { const row = document.createElement('div'); row.className = 'summary-progress-row'; row.innerHTML = `<span class="summary-label">${label}</span><div class="summary-bar-container"><div class="summary-bar" style="width: ${percentage}%; background-color: ${color || 'var(--accent-blue-muted)'};"></div></div><span class="summary-percentage">${percentage}%</span>`; return row; };
    milestoneContainer.innerHTML = ''; for (const tierKey in milestoneGoalsData) { const tier = milestoneGoalsData[tierKey]; if (tier?.goals) { const total = tier.goals.length; const completed = tier.goals.filter(g => g.achieved).length; const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0; milestoneContainer.appendChild(createSummaryRow(tier.name, percentage, tier.color)); } }
    gearContainer.innerHTML = ''; for (const stageKey in gearProgressionData) { const stage = gearProgressionData[stageKey]; if (stage?.items) { const total = stage.items.length; const completed = stage.items.filter(i => i.achieved).length; const percentage = (total > 0) ? Math.floor((completed / total) * 100) : 0; gearContainer.appendChild(createSummaryRow(stage.name, percentage, stage.color)); } }
    diaryContainer.innerHTML = ''; const diaryLevels = { Easy: { color: 'var(--accent-green-muted)', percentage: 0 }, Medium: { color: 'var(--accent-gold-dark)', percentage: 0 }, Hard: { color: 'var(--accent-red-deep)', percentage: 0 }, Elite: { color: 'var(--accent-indigo-muted)', percentage: 0 } }; const currentDiaryState = diaryCompletionState;
    for (const diffLevel in diaryLevels) { let total = 0, completed = 0; const difficultyLower = diffLevel.toLowerCase(); for (const diaryKey in diaries) { total += diaries[diaryKey]?.tasks?.[difficultyLower]?.length || 0; completed += currentDiaryState?.[diaryKey]?.[difficultyLower]?.length || 0; } diaryLevels[diffLevel].percentage = total > 0 ? Math.floor((completed / total) * 100) : 0; }
    for (const levelName in diaryLevels) { diaryContainer.appendChild(createSummaryRow(levelName, diaryLevels[levelName].percentage, diaryLevels[levelName].color)); }
    caContainer.innerHTML = ''; const caTierOrder = ["easy", "medium", "hard", "elite", "master", "grandmaster"]; const caDefaultColors = { easy: "#a0d2db", medium: "#a8d8a0", hard: "#f8c070", elite: "#f5a7a7", master: "#d7b0f8", grandmaster: "#cccccc" };
    caTierOrder.forEach(tierKey => { let total = 0, completed = 0; for (const bossKey in combatAchievementsData) { combatAchievementsData[bossKey]?.tasks?.forEach(task => { if (task.tier === tierKey) { total++; if (task.achieved) completed++; } }); } if (total > 0) { const percentage = Math.floor((completed / total) * 100); const tierName = tierKey.charAt(0).toUpperCase() + tierKey.slice(1); caContainer.appendChild(createSummaryRow(tierName, percentage, caDefaultColors[tierKey])); } });
}

export function populateCombatTasks() { /* ... (implementation from previous response, verified correct) ... */
    const caGrid = document.querySelector('#combat-tasks-view .combat-tasks-grid'); if (!caGrid) return; caGrid.innerHTML = ''; const filters = getCurrentCAFilters(); updateFilterButtonsUI(filters);
    const sortedBossKeys = Object.keys(combatAchievementsData).sort((a, b) => { if (a === 'n_a') return 1; if (b === 'n_a') return -1; return (combatAchievementsData[a]?.name || a).localeCompare(combatAchievementsData[b]?.name || b); });
    let bossesDisplayed = 0;
    sortedBossKeys.forEach(bossKey => {
        const bossData = combatAchievementsData[bossKey]; if (!bossData?.tasks) return; const filteredTasks = filterBossTasks(bossData.tasks, filters);
        if (filteredTasks.length > 0) {
            bossesDisplayed++; const bossContainer = document.createElement('article'); bossContainer.className = 'ca-boss-container container'; bossContainer.id = `ca-boss-${bossKey}`; const startCollapsed = false; if (startCollapsed) bossContainer.classList.add('collapsed');
            const bossHeader = document.createElement('header'); bossHeader.className = 'ca-boss-header'; bossHeader.style.cursor = 'pointer'; bossHeader.title = `Click to toggle ${bossData.name} tasks`;
            const completedFiltered = filteredTasks.filter(t => t.achieved).length; const totalFilteredPts = filteredTasks.reduce((s, t) => s + (t.points || 0), 0); const completedFilteredPts = filteredTasks.reduce((s, t) => s + (t.achieved ? (t.points || 0) : 0), 0);
            bossHeader.innerHTML = `<h3>${bossData.name}</h3><span class="ca-boss-progress" style="font-size: 0.9em; color: var(--text-secondary); margin-left: 15px;">(${completedFiltered}/${filteredTasks.length} shown)</span><span class="ca-boss-points" style="font-size: 0.9em; color: var(--text-secondary); margin-left: 10px;">(${completedFilteredPts}/${totalFilteredPts} pts)</span><span class="ca-toggle-icon" style="margin-left: auto;">${startCollapsed ? '▼' : '▲'}</span>`;
            bossContainer.appendChild(bossHeader); bossHeader.addEventListener('click', toggleBossSection); const taskList = document.createElement('div'); taskList.className = 'tasks ca-task-list'; taskList.style.display = startCollapsed ? 'none' : 'block';
            filteredTasks.sort((a, b) => (b.points || 0) - (a.points || 0) || a.name.localeCompare(b.name));
            filteredTasks.forEach((task, index) => {
                const taskDiv = document.createElement('div'); taskDiv.className = 'task'; if (task.achieved) taskDiv.classList.add('task-completed');
                const wikiLinkHtml = task.wikiLink ? `<span class="ca-task-wiki"><a href="${task.wikiLink}" target="_blank" title="Open Wiki Page">[Wiki]</a></span>` : ''; const pointsHtml = task.points ? `<span class="ca-task-points">${task.points}pt${task.points !== 1 ? 's' : ''}</span>` : '';
                const typeHtml = task.type ? `<span class="task-requirements" style="margin-left: 5px;">(${task.type})</span>` : ''; const tierHtml = task.tier ? `<span class="task-requirements" style="margin-left: 5px; text-transform: capitalize;">[${task.tier}]</span>` : ''; const checkboxId = `ca-${bossKey}-${index}`;
                taskDiv.innerHTML = `<input type="checkbox" class="ca-task-checkbox" id="${checkboxId}" data-boss-key="${bossKey}" data-task-name="${task.name}" ${task.achieved ? 'checked' : ''}><label class="task-description" for="${checkboxId}" title="${task.description || ''}"> ${task.name} ${tierHtml} ${typeHtml} </label>${pointsHtml} ${wikiLinkHtml}`;
                const checkbox = taskDiv.querySelector('.ca-task-checkbox'); if (checkbox) checkbox.addEventListener('change', handleCombatTaskChange); taskList.appendChild(taskDiv);
            });
            bossContainer.appendChild(taskList); caGrid.appendChild(bossContainer);
        }
    });
    if (bossesDisplayed === 0) caGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1; margin-top: 20px;">No combat achievements match the current filters.</p>';
    updateCumulativeCombatProgress();
}

export function updateCumulativeCombatProgress() { /* ... (implementation from previous response, verified correct) ... */
    const totalPointsSpan = document.getElementById('ca-total-points'); const currentTierSpan = document.getElementById('ca-current-tier'); const progressBar = document.getElementById('cumulative-ca-progress-bar'); const percentageSpan = document.getElementById('cumulative-ca-percentage'); if (!totalPointsSpan || !currentTierSpan || !progressBar || !percentageSpan) return;
    let grandTotalPoints = 0, totalPossiblePoints = 0; for (const bossKey in combatAchievementsData) { combatAchievementsData[bossKey]?.tasks?.forEach(task => { const points = task.points || 0; totalPossiblePoints += points; if (task.achieved) grandTotalPoints += points; }); }
    let currentTierName = "None"; if (grandTotalPoints >= 1153) currentTierName = "Grandmaster"; else if (grandTotalPoints >= 718) currentTierName = "Master"; else if (grandTotalPoints >= 405) currentTierName = "Elite"; else if (grandTotalPoints >= 178) currentTierName = "Hard"; else if (grandTotalPoints >= 58) currentTierName = "Medium"; else if (grandTotalPoints >= 8) currentTierName = "Easy";
    const percentage = totalPossiblePoints > 0 ? Math.floor((grandTotalPoints / totalPossiblePoints) * 100) : 0; totalPointsSpan.textContent = grandTotalPoints; currentTierSpan.textContent = currentTierName; progressBar.style.width = `${percentage}%`; percentageSpan.textContent = `${percentage}%`;
}


// --- NEW Quest View Population ---
/**
 * Populates the Quest Milestones view.
 */
export function populateQuestsView() {
    const questViewContainer = document.getElementById('quests-view');
    if (!questViewContainer) {
        console.error("Quest view container '#quests-view' not found!");
        return;
    }
    questViewContainer.innerHTML = '<h2>Quest Milestones</h2>'; // Reset view and add title

    const grid = document.createElement('section');
    grid.className = 'quests-grid container'; // Reuse container styling, add quests-grid for potential layout
    // Style with grid layout (e.g., 2 columns) or just flex column
    grid.style.display = 'flex';
    grid.style.flexDirection = 'column';
    grid.style.gap = '20px'; // Spacing between sections

    // --- Populate Notable Unlocks ---
    const unlocksSection = document.createElement('section');
    unlocksSection.className = 'quest-section'; // For potential specific styling
    unlocksSection.innerHTML = '<h3 style="border-bottom: 1px solid var(--border-medium); padding-bottom: 5px; margin-bottom: 15px;">Notable Unlocks</h3>';
    const unlocksList = document.createElement('div');
    unlocksList.className = 'tasks quest-list'; // Reuse task list styling

    for (const categoryKey in questUnlocksData) {
        const category = questUnlocksData[categoryKey];
        // Optional: Add category sub-headers if desired
        // unlocksList.innerHTML += `<h4 style="margin-top: 10px; margin-bottom: 5px;">${category.name}</h4>`;

        category.quests.forEach(quest => {
            const questName = quest.name;
            const isCompleted = questCompletionState[questName] === true; // Check state using name key

            const taskDiv = document.createElement('div');
            taskDiv.className = 'task quest-milestone'; // Specific class for quests
            if (isCompleted) taskDiv.classList.add('task-completed');

            // Use quest name for unique ID and data attribute
            const checkboxId = `quest-${questName.replace(/\s+/g, '-')}`; // Create a safe ID

            taskDiv.innerHTML = `
                <input type="checkbox" class="quest-checkbox" id="${checkboxId}"
                       data-quest-name="${questName}" ${isCompleted ? 'checked' : ''}>
                <label class="task-description" for="${checkboxId}">${questName}</label>
                ${quest.unlock ? `<span class="goal-info">(${quest.unlock})</span>` : ''}
                ${quest.wikiLink ? `<span class="quest-wiki-link" style="margin-left: auto; padding-left: 10px;"><a href="${quest.wikiLink}" target="_blank" title="Open Wiki">[Wiki]</a></span>` : ''}
            `;

            // Attach event handler
            const checkbox = taskDiv.querySelector('.quest-checkbox');
            if (checkbox) checkbox.addEventListener('change', handleQuestCompletionChange);

            unlocksList.appendChild(taskDiv);
        });
    }
    unlocksSection.appendChild(unlocksList);
    grid.appendChild(unlocksSection);


    // --- Populate Major Milestones ---
    const milestonesSection = document.createElement('section');
    milestonesSection.className = 'quest-section';
    milestonesSection.innerHTML = '<h3 style="border-bottom: 1px solid var(--border-medium); padding-bottom: 5px; margin-bottom: 15px;">Major Milestones</h3>';
    const milestonesList = document.createElement('div');
    milestonesList.className = 'tasks quest-list';

    majorMilestonesData.forEach(milestone => {
        const milestoneName = milestone.name;
        const isCompleted = questCompletionState[milestoneName] === true;

        const taskDiv = document.createElement('div');
        taskDiv.className = 'task quest-milestone';
        if (isCompleted) taskDiv.classList.add('task-completed');

        const checkboxId = `quest-${milestoneName.replace(/\s+/g, '-')}`;

        taskDiv.innerHTML = `
            <input type="checkbox" class="quest-checkbox" id="${checkboxId}"
                   data-quest-name="${milestoneName}" ${isCompleted ? 'checked' : ''}>
            <label class="task-description" for="${checkboxId}">${milestoneName}</label>
            ${milestone.info ? `<span class="goal-info">(${milestone.info})</span>` : ''}
        `;

        // Attach event handler
        const checkbox = taskDiv.querySelector('.quest-checkbox');
        if (checkbox) checkbox.addEventListener('change', handleQuestCompletionChange);

        milestonesList.appendChild(taskDiv);
    });
    milestonesSection.appendChild(milestonesList);
    grid.appendChild(milestonesSection);

    // Append the grid to the main view container
    questViewContainer.appendChild(grid);
    console.log("Quests view populated.");
}

// --- Global listeners for Skill Editor Rate Inputs ---
document.addEventListener('focusin', (event) => {
    if (event.target.classList.contains('skill-editor-rate-input')) {
        event.target.value = event.target.value.replace(/,/g, '');
    }
});
document.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('skill-editor-rate-input')) {
        let value = event.target.value.replace(/,/g, '');
        const skillNameMatch = event.target.id.match(/rate-(.+)/);
        const skillName = skillNameMatch ? skillNameMatch[1] : null;
        if (/^\d+$/.test(value) && value.length > 0) {
            event.target.value = parseInt(value, 10).toLocaleString();
        } else if (skillName) {
            const skillData = skillRequirements.find(s => s.skill.toLowerCase() === skillName);
            event.target.value = skillData ? skillData.xpPerHour.toLocaleString() : '0';
        } else {
            event.target.value = '0';
        }
    }
});