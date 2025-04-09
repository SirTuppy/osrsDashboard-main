// events.js
// Description: Handles user interactions and updates application state and UI accordingly.

// --- IMPORTS ---
// Data structures to modify
import {
    miscellaneousGoals, milestoneGoalsData, gearProgressionData,
    combatAchievementsData, diaryCompletionState, questCompletionState, // Import state variables
    // We don't usually need the static data structures like `diaries` or `questMilestonesData`
    // directly in event handlers, unless checking properties not on the event target.
} from './data.js';

// Storage functions to persist changes
import {
    reorderMiscellaneousGoals, saveMiscellaneousGoals, saveMilestoneGoals,
    saveGearProgression, saveCombatAchievements,
    saveProgressToLocalStorage, // Main save function for diaries/misc
    saveQuestCompletion // Specific save function for quests
} from './storage.js';

// UI functions to update the display or interact with UI elements
import {
    showView, populateMiscellaneousGoals, updateMilestoneTierProgress,
    updateCumulativeGoalProgress, updateGearStageProgress, updateGearStageCost,
    updateCumulativeGearProgress, updateTaskProgressDisplay, updateDiaryHeaderProgress,
    updateGlobalProgress, updateDashboardSummaryProgress, updateCompleteAllCheckboxState,
    updateCumulativeCombatProgress, populateCombatTasks, updateCurrentCAFilters,
    getCurrentCAFilters, loadDiaryDifficultyContent
    // No need to import populateQuestsView here, checkbox changes only toggle class/save state
} from './ui.js';

// Drag state variables for miscellaneous goals
let draggedElement = null;
let dragSourceIndex = null;

// --- DIARY EVENT HANDLERS (Refactored) ---

export function handleDiaryTaskChange(event) {
    const checkbox = event.target;
    if (!checkbox || !checkbox.classList.contains('task-checkbox')) return;
    const diaryKey = checkbox.dataset.diary;
    const difficulty = checkbox.dataset.difficulty;
    const taskIndex = parseInt(checkbox.dataset.index);
    const isChecked = checkbox.checked;
    if (!diaryKey || !difficulty || isNaN(taskIndex)) return;

    // Update In-Memory State
    if (!diaryCompletionState[diaryKey]) diaryCompletionState[diaryKey] = {};
    if (!diaryCompletionState[diaryKey][difficulty]) diaryCompletionState[diaryKey][difficulty] = [];
    const completedIndices = diaryCompletionState[diaryKey][difficulty];
    const indexPosition = completedIndices.indexOf(taskIndex);
    if (isChecked && indexPosition === -1) {
        completedIndices.push(taskIndex);
        completedIndices.sort((a, b) => a - b);
    } else if (!isChecked && indexPosition > -1) {
        completedIndices.splice(indexPosition, 1);
    }

    // Update UI & Save
    checkbox.closest('.task')?.classList.toggle('task-completed', isChecked);
    updateTaskProgressDisplay(diaryKey, difficulty);
    updateDiaryHeaderProgress(diaryKey);
    updateGlobalProgress();
    updateDashboardSummaryProgress();
    updateCompleteAllCheckboxState(diaryKey, difficulty);
    saveProgressToLocalStorage(); // Saves diaries AND misc goals
}

export function handleCompleteAllToggle(event) {
    const masterCheckbox = event.target;
    if (!masterCheckbox || !masterCheckbox.classList.contains('complete-all-checkbox')) return;
    const diaryKey = masterCheckbox.dataset.diary;
    const difficulty = masterCheckbox.dataset.difficulty;
    const isChecked = masterCheckbox.checked;
    if (!diaryKey || !difficulty) return;
    const taskCategory = masterCheckbox.closest('.task-category');
    if (!taskCategory) return;
    const taskCheckboxes = taskCategory.querySelectorAll(`.task-checkbox[data-diary="${diaryKey}"][data-difficulty="${difficulty}"]`);
    const newIndices = [];

    // Update In-Memory State & DOM Checkboxes
    if (!diaryCompletionState[diaryKey]) diaryCompletionState[diaryKey] = {};
    taskCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        checkbox.closest('.task')?.classList.toggle('task-completed', isChecked);
        if (isChecked) {
            const taskIndex = parseInt(checkbox.dataset.index);
            if (!isNaN(taskIndex)) newIndices.push(taskIndex);
        }
    });
    if (isChecked) newIndices.sort((a, b) => a - b);
    diaryCompletionState[diaryKey][difficulty] = newIndices;

    // Update UI & Save
    updateTaskProgressDisplay(diaryKey, difficulty);
    updateDiaryHeaderProgress(diaryKey);
    updateGlobalProgress();
    updateDashboardSummaryProgress();
    masterCheckbox.indeterminate = false;
    saveProgressToLocalStorage(); // Saves diaries AND misc goals
}

export function handleDifficultyTabClick(event) {
    const button = event.target.closest('.diff-button');
    if (!button) return;
    const diaryKey = button.dataset.diary;
    const difficulty = button.dataset.difficulty;
    const difficultyTabsContainer = button.closest('.difficulty-tabs');
    if (!diaryKey || !difficulty || !difficultyTabsContainer) return;
    difficultyTabsContainer.querySelectorAll('.diff-button').forEach(btn => btn.classList.remove('active-diff'));
    button.classList.add('active-diff');
    loadDiaryDifficultyContent(diaryKey, difficulty);
}

export function toggleDiaryContent(event) {
    const clickedHeader = event.target.closest('.diary-header');
    if (!clickedHeader) return;
    const parentCard = clickedHeader.closest('.diary-card');
    if (!parentCard) return;
    const targetContent = parentCard.querySelector('.diary-content');
    if (!targetContent) return;
    const isAlreadyActive = targetContent.classList.contains('active');
    const diariesContainer = parentCard.closest('.diaries-grid');
    if (!diariesContainer) return;
    // Close all others first
    diariesContainer.querySelectorAll('.diary-content.active').forEach(activeContent => {
        activeContent.classList.remove('active');
    });
    // Open the target if it wasn't already open
    if (!isAlreadyActive) {
        targetContent.classList.add('active');
    }
}

// --- QUEST EVENT HANDLER (NEW) ---

/**
 * Handles changes to individual quest milestone checkboxes.
 * Updates in-memory state and saves.
 * @param {Event} event - The change event from the quest checkbox.
 */
export function handleQuestCompletionChange(event) {
    const checkbox = event.target;
    if (!checkbox || !checkbox.dataset.questName) return; // Check for the data attribute

    const questName = checkbox.dataset.questName;
    const isChecked = checkbox.checked;

    // Update In-Memory State (questCompletionState)
    questCompletionState[questName] = isChecked;

    // Toggle visual style
    checkbox.closest('.task')?.classList.toggle('task-completed', isChecked);

    // Save the updated quest state
    saveQuestCompletion();

    // Optional: Update any overall quest progress indicators if you add them
    // updateOverallQuestProgress();
}


// --- MISCELLANEOUS GOAL EVENT HANDLERS ---

export function handleMiscGoalCheck(event) {
    const checkbox = event.target;
    const index = parseInt(checkbox.dataset.index);
    if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals[index].completed = checkbox.checked;
        checkbox.closest('.task')?.classList.toggle('task-completed', checkbox.checked);
        saveMiscellaneousGoals(); // Saves only misc goals
    }
}

export function handleMiscGoalDescChange(event) {
    const input = event.target;
    const index = parseInt(input.dataset.index);
    const newDescription = input.value;
    if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals[index].description = newDescription.trim();
        saveMiscellaneousGoals();
    }
}

export function handleMiscGoalDescKey(event) {
    if (event.key === 'Enter') event.target.blur();
}

export function handleMiscGoalRemove(event) {
    const button = event.target.closest('.remove-goal-button');
    if (!button) return;
    const index = parseInt(button.dataset.index);
    if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals.splice(index, 1);
        saveMiscellaneousGoals(); // Save the change first
        populateMiscellaneousGoals(); // Then re-render UI
    }
}

export function addMiscellaneousGoal() {
    miscellaneousGoals.push({ description: "", completed: false });
    saveMiscellaneousGoals();
    populateMiscellaneousGoals();
    const goalsContainer = document.getElementById('miscellaneous-goals');
    const newInput = goalsContainer?.querySelector('.task:last-child input[type="text"]');
    if (newInput) newInput.focus();
}

// --- MILESTONE GOAL EVENT HANDLERS ---

export function handleMilestoneGoalChange(event) {
    const checkbox = event.target;
    const tier = checkbox.dataset.tier;
    const index = parseInt(checkbox.dataset.index);
    if (milestoneGoalsData[tier]?.goals?.[index] !== undefined) {
        milestoneGoalsData[tier].goals[index].achieved = checkbox.checked;
        checkbox.closest('.task')?.classList.toggle('task-completed', checkbox.checked);
        saveMilestoneGoals();
        updateMilestoneTierProgress(tier);
        updateCumulativeGoalProgress();
        updateDashboardSummaryProgress();
    } else console.error(`Milestone goal data not found: ${tier}, ${index}`);
}

// --- GEAR PROGRESSION EVENT HANDLERS ---

export function handleGearItemChange(event) {
    const checkbox = event.target;
    const stageKey = checkbox.dataset.stage;
    const index = parseInt(checkbox.dataset.index);
    if (gearProgressionData[stageKey]?.items?.[index] !== undefined) {
        gearProgressionData[stageKey].items[index].achieved = checkbox.checked;
        checkbox.closest('.task')?.classList.toggle('task-completed', checkbox.checked);
        saveGearProgression();
        updateGearStageProgress(stageKey);
        updateGearStageCost(stageKey);
        updateCumulativeGearProgress();
        updateDashboardSummaryProgress();
    } else console.error(`Gear data not found: ${stageKey}, ${index}`);
}

// --- COMBAT ACHIEVEMENT EVENT HANDLERS ---

export function handleCombatTaskChange(event) {
    const checkbox = event.target;
    if (!checkbox.classList.contains('ca-task-checkbox')) return;
    const bossKey = checkbox.dataset.bossKey;
    const taskName = checkbox.dataset.taskName;
    const isChecked = checkbox.checked;
    if (!bossKey || !taskName || !combatAchievementsData[bossKey]?.tasks) return;
    const task = combatAchievementsData[bossKey].tasks.find(t => t.name === taskName);
    if (task) {
        task.achieved = isChecked;
        checkbox.closest('.task')?.classList.toggle('task-completed', isChecked);
        // Future: updateBossHeaderProgress(bossKey); // Requires recalculating filtered counts
        updateCumulativeCombatProgress();
        updateDashboardSummaryProgress();
        saveCombatAchievements();
    } else console.error(`CA task object not found: ${bossKey}, ${taskName}`);
}

// CA Filter Handlers
export function handleCATierFilter(event) {
    const button = event.target.closest('.filter-button[data-filter-type="tier"]');
    if (!button) return;
    const value = button.dataset.filterValue;
    let currentFilters = getCurrentCAFilters();
    if (value === 'all') currentFilters.tiers = ['all'];
    else {
        let tiers = currentFilters.tiers.filter(t => t !== 'all');
        const index = tiers.indexOf(value);
        if (index > -1) tiers.splice(index, 1); else tiers.push(value);
        currentFilters.tiers = tiers.length > 0 ? tiers : ['all'];
    }
    updateCurrentCAFilters(currentFilters); populateCombatTasks();
}

export function handleCATypeFilter(event) {
    const button = event.target.closest('.filter-button[data-filter-type="type"]');
    if (!button) return;
    const value = button.dataset.filterValue;
    let currentFilters = getCurrentCAFilters();
    if (value === 'all') currentFilters.types = ['all'];
    else {
        let types = currentFilters.types.filter(t => t.toLowerCase() !== 'all');
        const valueLower = value.toLowerCase();
        const index = types.findIndex(t => t.toLowerCase() === valueLower);
        if (index > -1) types.splice(index, 1); else types.push(value);
        currentFilters.types = types.length > 0 ? types : ['all'];
    }
    updateCurrentCAFilters(currentFilters); populateCombatTasks();
}

export function handleCAStatusFilter(event) {
    const button = event.target.closest('.filter-button[data-filter-type="status"]');
    if (!button) return;
    let currentFilters = getCurrentCAFilters();
    currentFilters.status = button.dataset.filterValue;
    updateCurrentCAFilters(currentFilters); populateCombatTasks();
}

export function handleCABossSearch(event) {
    const searchTerm = event.target.value.trim();
    let currentFilters = getCurrentCAFilters();
    currentFilters.bossSearch = searchTerm;
    updateCurrentCAFilters(currentFilters);
    populateCombatTasks(); // Consider debouncing later
}

// --- NAVIGATION & OTHER UI INTERACTION HANDLERS ---

export function handleViewNavigation(event) {
    const button = event.target.closest('.view-navigation .filter-button[data-view]');
    if (button?.dataset?.view) showView(button.dataset.view);
}

/**
 * Handles clicking on skill names in the summary to highlight related diary tasks.
 * Includes logic to switch views and open the relevant diary card.
 */
export function handleSkillNameClick(event) {
    const clickedSkillElement = event.target.closest('.skill-name.clickable');
    if (!clickedSkillElement) return;
    const skillName = clickedSkillElement.dataset.skillName;
    const isActive = clickedSkillElement.classList.contains('active');

    // Deactivate current highlights
    document.querySelectorAll('.task.skill-highlight').forEach(t => t.classList.remove('skill-highlight'));
    document.querySelectorAll('.skill-name.clickable.active').forEach(el => el.classList.remove('active'));

    if (!isActive) {
        clickedSkillElement.classList.add('active'); // Activate clicked skill name
        const escapedSkillName = CSS.escape(skillName); // Escape skill name for querySelector
        const firstMatchingTask = document.querySelector(`.task[data-requires-skill~="${escapedSkillName}"]`);

        if (firstMatchingTask) {
            const targetContent = firstMatchingTask.closest('.diary-content');
            const parentCard = firstMatchingTask.closest('.diary-card');
            const diariesContainer = firstMatchingTask.closest('.diaries-grid');
            const diariesView = document.getElementById('diaries-view');

            // Ensure Diaries view is visible
            if (diariesView && diariesView.style.display === 'none') {
                showView('diaries-view');
            }

            // Open the correct diary card
            if (targetContent && parentCard && diariesContainer && !targetContent.classList.contains('active')) {
                diariesContainer.querySelectorAll('.diary-content.active').forEach(ac => ac.classList.remove('active'));
                targetContent.classList.add('active');
                // parentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Optional scroll
            }
        }

        // Highlight ALL tasks requiring the skill
        document.querySelectorAll(`.task[data-requires-skill~="${escapedSkillName}"]`).forEach(taskElement => {
            taskElement.classList.add('skill-highlight');
        });
    }
    // Clicking active skill just deactivates highlights
}

// --- DRAG AND DROP HANDLERS (Miscellaneous Goals) ---

export function handleDragStart(event) {
    const target = event.target.closest('.draggable-goal');
    if (!target) return;
    draggedElement = target;
    dragSourceIndex = parseInt(draggedElement.dataset.index);
    setTimeout(() => draggedElement.classList.add('dragging'), 0);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', dragSourceIndex.toString());
}

export function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const target = event.target.closest('.draggable-goal');
    if (target && target !== draggedElement) {
        document.querySelectorAll('.draggable-goal.drag-over').forEach(i => i.classList.remove('drag-over'));
        target.classList.add('drag-over');
    }
    return false;
}

export function handleDragLeave(event) {
    const target = event.target.closest('.draggable-goal');
    if (target) target.classList.remove('drag-over');
}

export function handleDragEnd(event) {
    document.querySelectorAll('.draggable-goal.dragging, .draggable-goal.drag-over').forEach(i => {
        i.classList.remove('dragging', 'drag-over');
    });
    draggedElement = null;
    dragSourceIndex = null; // Also reset index state
}

export function handleDrop(event) {
    event.preventDefault();
    const dropTarget = event.target.closest('.draggable-goal');
    if (!dropTarget || dropTarget === draggedElement || dragSourceIndex === null) {
        document.querySelectorAll('.draggable-goal.drag-over').forEach(i => i.classList.remove('drag-over'));
        return false;
    }
    const dropTargetIndex = parseInt(dropTarget.dataset.index);
    dropTarget.classList.remove('drag-over');
    reorderMiscellaneousGoals(dragSourceIndex, dropTargetIndex); // Reorder data (saves)
    populateMiscellaneousGoals(); // Repopulate UI
    return false;
}