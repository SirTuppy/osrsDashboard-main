// events.js - TOP OF FILE
import { miscellaneousGoals, milestoneGoalsData, gearProgressionData } from './data.js';
import { reorderMiscellaneousGoals, saveMiscellaneousGoals, saveMilestoneGoals, saveGearProgression } from './storage.js';
import { showView, updateGearStageCost } from './ui.js'; // Adjust path if needed
import { populateMiscellaneousGoals, updateMilestoneTierProgress, updateCumulativeGoalProgress, updateGearStageProgress, updateCumulativeGearProgress, updateTaskProgressDisplay, updateDiaryHeaderProgress, updateGlobalProgress, updateDashboardSummaryProgress } from './ui.js'; // Need UI update functions

// Drag state variables
let draggedElement = null;
let dragSourceIndex = null;

export function handleDiaryTaskChange(event) {
     const checkbox = event.target;
     const dKey = checkbox.dataset.diary;
     const diff = checkbox.dataset.difficulty;
     checkbox.closest('.task')?.classList.toggle('task-completed', checkbox.checked);
     // Call imported UI functions
     updateTaskProgressDisplay(dKey, diff);
     updateDiaryHeaderProgress(dKey);
     updateGlobalProgress();
     updateDashboardSummaryProgress();
     // Saving is handled by main button
 }

 export function handleMiscGoalCheck(event) {
    const index = parseInt(event.target.dataset.index);
    if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals[index].completed = event.target.checked;
        event.target.closest('.task')?.classList.toggle('task-completed', event.target.checked);
        saveMiscellaneousGoals(); // Save on change
    }
}

export function handleMiscGoalDescChange(event) {
     const index = parseInt(event.target.dataset.index);
     const newDescription = event.target.value;
     if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals[index].description = newDescription.trim();
        saveMiscellaneousGoals();
     }
}
 export function handleMiscGoalDescKey(event) {
    if (event.key === 'Enter') {
        event.target.blur();
    }
 }

 export function handleMiscGoalRemove(event) { // Renamed from removeMiscellaneousGoal
    const button = event.target.closest('.remove-goal-button');
    if (!button) return;
    const index = parseInt(button.dataset.index);
    if (index >= 0 && index < miscellaneousGoals.length) {
        miscellaneousGoals.splice(index, 1);
        populateMiscellaneousGoals(); // Use imported UI function
        saveMiscellaneousGoals(); // Use imported storage function
    }
}

export function handleMilestoneGoalChange(event) {
    const checkbox = event.target;
    const tier = checkbox.dataset.tier;
    const index = parseInt(checkbox.dataset.index);
    if (milestoneGoalsData[tier] && milestoneGoalsData[tier].goals[index] !== undefined) {
        milestoneGoalsData[tier].goals[index].achieved = checkbox.checked;
        checkbox.closest('.task').classList.toggle('task-completed', checkbox.checked);
        // Call imported functions
        updateMilestoneTierProgress(tier);
        saveMilestoneGoals();
        updateCumulativeGoalProgress();
        updateDashboardSummaryProgress();
    } else {
         console.error(`Goal data not found for tier: ${tier}, index: ${index}`);
    }
}

export function handleGearItemChange(event) {
    const checkbox = event.target;
    const stageKey = checkbox.dataset.stage;
    const index = parseInt(checkbox.dataset.index);
    if (gearProgressionData[stageKey] && gearProgressionData[stageKey].items[index] !== undefined) {
        gearProgressionData[stageKey].items[index].achieved = checkbox.checked;
        checkbox.closest('.task').classList.toggle('task-completed', checkbox.checked);

        // Call imported functions
        saveGearProgression(); // Save the change
        updateGearStageProgress(stageKey); // Update the % bar for this stage
        updateGearStageCost(stageKey);   // <-- Add this call to update the cost total
        updateCumulativeGearProgress(); // Update the overall gear % bar
        updateDashboardSummaryProgress(); // Update the dashboard summary section
    } else {
        console.error(`Gear data not found for stage: ${stageKey}, index: ${index}`);
    }
}

export function toggleDiaryContent(event) {
    // Find the diary header that was clicked (or whose child was clicked)
    const clickedHeader = event.target.closest('.diary-header');
    if (!clickedHeader) return; // Exit if the click wasn't on a header

    // Find the content associated with the clicked header
    const targetContent = clickedHeader.nextElementSibling;
    if (!targetContent || !targetContent.classList.contains('diary-content')) {
        console.warn("Could not find diary content for clicked header:", clickedHeader);
        return; // Exit if content isn't found right after header
    }

    // Check if the clicked content is *already* active
    const isAlreadyActive = targetContent.classList.contains('active');

    // Find the main container for all diaries
    const diariesContainer = document.getElementById('diaries-tab');
    if (!diariesContainer) return; // Should not happen, but safe check

    // 1. Close ALL currently open diary contents first
    diariesContainer.querySelectorAll('.diary-content.active').forEach(activeContent => {
        activeContent.classList.remove('active');
    });

    // 2. If the clicked one WASN'T already active, open it now.
    if (!isAlreadyActive) {
        targetContent.classList.add('active');
    }
}

export function addMiscellaneousGoal() {
    miscellaneousGoals.push({ description: "", completed: false });
    populateMiscellaneousGoals(); // Call UI update
    // Focus logic can stay here or move to UI function
    const goalsContainer = document.getElementById('miscellaneous-goals');
    const newInput = goalsContainer?.querySelector('.task:last-child input[type="text"]');
    if (newInput) newInput.focus();
    saveMiscellaneousGoals(); // Save new state
}

export function handleViewNavigation(event) {
    const button = event.target.closest('.view-navigation .filter-button[data-view]');
    if (button) {
       const viewId = button.dataset.view;
       if (viewId && typeof showView === 'function') { // Check if showView is imported
           showView(viewId);
       } else if (!showView) {
            console.error("showView function not imported correctly in events.js");
       }
    }
}

export function handleSkillNameClick(event) {
    // ... (code from script.js) ...
    // Ensure it calls add/remove classList correctly
    const clickedSkillElement = event.target.closest('.skill-name.clickable');
    if (!clickedSkillElement) return;
    const skillName = clickedSkillElement.dataset.skillName;
    const isActive = clickedSkillElement.classList.contains('active');
    document.querySelectorAll('.task.skill-highlight').forEach(task => task.classList.remove('skill-highlight'));
    document.querySelectorAll('.skill-name.clickable.active').forEach(el => el.classList.remove('active'));
    if (!isActive) {
        clickedSkillElement.classList.add('active');
        document.querySelectorAll('.task').forEach(taskElement => {
            const requiredSkills = taskElement.dataset.requiresSkill || '';
            if (requiredSkills.split(' ').includes(skillName)) {
                taskElement.classList.add('skill-highlight');
                const diaryContent = taskElement.closest('.diary-content');
                // Check if ui.js showView function exists and is imported if needed
                // Or just directly manipulate classList here
                if (diaryContent && !diaryContent.classList.contains('active')) {
                    diaryContent.classList.add('active');
                }
            }
        });
    }
}

export function handleDragStart(event) {
    // Store the dragged element
    draggedElement = event.target;
    dragSourceIndex = parseInt(draggedElement.dataset.index);
    
    // Add styling to show it's being dragged
    setTimeout(() => {
        draggedElement.classList.add('dragging');
    }, 0);
    
    // Set data for drag operation
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', dragSourceIndex);
}

export function handleDragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
    
    // Add visual cue for drop target
    if (event.target.classList.contains('draggable-goal') && event.target !== draggedElement) {
        event.target.classList.add('drag-over');
    }
    
    return false;
}

export function handleDragLeave(event) {
    // Remove visual cue
    if (event.target.classList.contains('draggable-goal')) {
        event.target.classList.remove('drag-over');
    }
}

export function handleDragEnd(event) {
    // Remove all drag classes
    document.querySelectorAll('.draggable-goal').forEach(item => {
        item.classList.remove('dragging');
        item.classList.remove('drag-over');
    });
    
    draggedElement = null;
}

export function handleDrop(event) {
    // Prevent default actions
    event.preventDefault();
    
    // Get the target element
    const dropTarget = event.target.closest('.draggable-goal');
    if (!dropTarget || dropTarget === draggedElement) return;
    
    // Get the target index
    const dropTargetIndex = parseInt(dropTarget.dataset.index);
    
    // Reorder the goals
    reorderMiscellaneousGoals(dragSourceIndex, dropTargetIndex);
    
    // Repopulate the goals to reflect the new order
    populateMiscellaneousGoals();
    
    return false;
}