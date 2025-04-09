// app.js - TOP OF FILE
import { currentUsername } from './data.js';
// Import load functions from storage
import { loadCoreDataFromStorage, saveProgressToLocalStorage, saveSkillLevelsFromModal, resetSkillLevels, exportData, handleFileImport } from './storage.js';
// Import UI functions needed for setup or direct call
import { populateDiaries, populateSkillSummary, openSkillEditor, closeSkillEditor, showView, populateMiscellaneousGoals, populateMilestoneGoals, populateGearProgression, updateCombatLevelDisplay, updateOverallStats, updateGlobalProgress, updateDashboardSummaryProgress, applyLoadedDiaryProgress, updateCumulativeGearProgress, updateCumulativeGoalProgress, updateGearStageCost, populateCombatTasks,updateCumulativeCombatProgress } from './ui.js';
// Import Event handlers needed for direct listener setup
import { handleViewNavigation, handleSkillNameClick, handleMiscGoalDescKey, addMiscellaneousGoal, toggleDiaryContent as toggleDiaryHandler, handleDifficultyTabClick, handleCombatTaskChange, handleCATierFilter, handleCATypeFilter, handleCAStatusFilter, handleCABossSearch } from './events.js'; // Import specific handlers needed here
// Import Hiscores function
import { fetchHiscoresData } from './hiscores.js';

import { initializeAndUpdatePrices } from './priceFetcher.js'; // <-- Import fetch function

const themeToggleButton = document.getElementById('theme-toggle-button');
const currentTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Check OS preference

// --- Setup Functions (Defined here for clarity, call imported handlers) ---
function setupViewNavigation() {
    const navContainer = document.querySelector('.view-navigation');
    if(navContainer) navContainer.addEventListener('click', handleViewNavigation); // Use imported handler

    // Initial view load
    const lastView = localStorage.getItem('activeView') || 'dashboard-view';
    if (document.getElementById(lastView)) showView(lastView); else showView('dashboard-view');
}

// --- NEW: Setup CA Filters ---
function setupCAFilters() {
    const tierFilters = document.getElementById('ca-tier-filters');
    const typeFilters = document.getElementById('ca-type-filters');
    const statusFilters = document.getElementById('ca-status-filters');
    const bossSearch = document.getElementById('ca-boss-search');

    // Use event delegation on the containers
    if (tierFilters) {
        tierFilters.addEventListener('click', handleCATierFilter);
    }
    if (typeFilters) {
        typeFilters.addEventListener('click', handleCATypeFilter);
    }
    if (statusFilters) {
        statusFilters.addEventListener('click', handleCAStatusFilter);
    }

    // Use input event for search for real-time filtering
    if (bossSearch) {
        bossSearch.addEventListener('input', handleCABossSearch);
    }
}

function setupSkillEditor() {
    document.getElementById('edit-skills-button')?.addEventListener('click', openSkillEditor);
    document.querySelector('.modal-close')?.addEventListener('click', closeSkillEditor);
    document.getElementById('save-skills')?.addEventListener('click', saveSkillLevelsFromModal);
    document.getElementById('reset-skills')?.addEventListener('click', resetSkillLevels);
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('skill-editor-modal')) {
            closeSkillEditor();
        }
    });
 }

function setupImportExport() {
    const importButton = document.getElementById('import-data-button');
    const exportButton = document.getElementById('export-data-button');
    const fileInput = document.getElementById('import-file-input');
    exportButton?.addEventListener('click', exportData);
    importButton?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', handleFileImport);
 }

// app.js - Inside setupHiscoresFetching
function setupHiscoresFetching() {
    const fetchButton = document.getElementById('fetch-hiscores-button');
    const usernameElement = document.getElementById('player-name');
    if(!fetchButton || !usernameElement) return;

    // Read directly from storage on load
    const savedUsername = localStorage.getItem('rsUsername');
    usernameElement.textContent = savedUsername || 'sirtuppy'; // Use default if nothing saved

    fetchButton.addEventListener('click', fetchHiscoresData);
    usernameElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { event.preventDefault(); usernameElement.blur(); fetchHiscoresData(); }
    });
    usernameElement.addEventListener('blur', () => {
         const newUsername = usernameElement.textContent.trim();
         const currentSaved = localStorage.getItem('rsUsername') || 'sirtuppy';
         if (newUsername !== currentSaved) { // Compare with current stored value
             localStorage.setItem('rsUsername', newUsername); // Just save on blur
             console.log("Username updated in localStorage:", newUsername);
         }
     });
  }

  function setupSaveButton() {
    const saveButton = document.getElementById('save-progress');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            saveProgressToLocalStorage(); // Use imported storage function
            // ... feedback logic ...
            const originalText = saveButton.textContent;
            saveButton.textContent = "Saved!";
            saveButton.style.backgroundColor = "#45a049";
            saveButton.disabled = true;
            setTimeout(() => {
                saveButton.textContent = originalText;
                saveButton.style.backgroundColor = "";
                saveButton.disabled = false;
            }, 1500);
        });
    }
}

function setupAddGoalButton() {
    document.getElementById('add-goal-button')?.addEventListener('click', addMiscellaneousGoal); // Use imported events function
}

function setupSortAndSkillClickListeners() {
    const sortButtonsContainer = document.querySelector('.sort-buttons');
    sortButtonsContainer?.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.sort) {
             sortButtonsContainer.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
             event.target.classList.add('active');
             populateSkillSummary(event.target.dataset.sort); // ui function
         }
    });
    document.getElementById('skill-summary')?.addEventListener('click', handleSkillNameClick); // events function
}

// Function to apply the theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Apply the saved theme or default based on OS preference
if (currentTheme) {
    applyTheme(currentTheme);
} else if (prefersDark) {
    applyTheme('dark'); // Default to dark if OS prefers it and no setting saved
} else {
    applyTheme('light'); // Default to light otherwise
}

// Add event listener for the button
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        // Check the current theme by looking at the body class
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing Dashboard...");

    // --- 1. Load ALL Data State First ---
    const loadedDiaryProgress = await loadCoreDataFromStorage();
    console.log("Core data loaded.");

    // --- 2. Fetch Item Prices (Updates gearProgressionData) ---
    await initializeAndUpdatePrices(); // <-- Add this call
    console.log("Item prices fetched (if any).");

    // --- 3. Populate UI Structure USING Loaded/Updated Data ---
    populateDiaries();
    populateMiscellaneousGoals();
    populateMilestoneGoals();
    populateGearProgression();
    populateCombatTasks(); // <-- Add this call
    console.log("Base UI Populated.");

    // --- 4. Apply Loaded Diary Progress to the DOM ---
    applyLoadedDiaryProgress(loadedDiaryProgress);
    console.log("Applied loaded diary progress.");

    // --- 5. Update Remaining UI Based on Final State ---
    updateCombatLevelDisplay();
    updateOverallStats();
    updateCumulativeGoalProgress();
    updateCumulativeGearProgress();
    updateCumulativeCombatProgress(); // <-- Add this call
    updateDashboardSummaryProgress();
    const sortButtons = document.querySelectorAll('.sort-buttons .filter-button');
sortButtons.forEach(btn => btn.classList.remove('active'));
document.querySelector('.sort-buttons .filter-button[data-sort="level"]')?.classList.add('active');
populateSkillSummary('level');
    console.log("Final UI updates applied.");

    // --- 5. Setup Event Listeners ---
    setupViewNavigation();
    // --- Set initial skill button state ---
    const initialViewId = localStorage.getItem('activeView') || 'dashboard-view';
    const enableSkillModalButtons = (initialViewId === 'dashboard-view');
    const skillModalSaveButton = document.getElementById('save-skills');
    const skillModalResetButton = document.getElementById('reset-skills');
    if (skillModalSaveButton) skillModalSaveButton.disabled = !enableSkillModalButtons;
    if (skillModalResetButton) skillModalResetButton.disabled = !enableSkillModalButtons;
    
    // --- Attach listeners to the NEW diary grid ---
const diariesGrid = document.querySelector('#diaries-view .diaries-grid');
if (diariesGrid) {
    // Listener specifically for expanding/collapsing CARDS (clicks on .diary-header)
    diariesGrid.addEventListener('click', (event) => {
        // Only trigger toggleDiaryHandler if the click was inside a header
        if (event.target.closest('.diary-header')) {
            toggleDiaryHandler(event); // Pass the event to the handler
        }
    });

    // Listener specifically for switching DIFFICULTY TABS (clicks on .diff-button)
    diariesGrid.addEventListener('click', (event) => {
         // Only trigger handleDifficultyTabClick if the click was inside a button
         if (event.target.closest('.diff-button')) {
             handleDifficultyTabClick(event); // Pass the event to the handler
         }
    });
}
// -------------------------------------------

setupSaveButton(); // This button now saves the merged diary state
setupAddGoalButton();
setupCAFilters();
setupSaveButton();
setupAddGoalButton();
setupSkillEditor();
setupImportExport();
setupHiscoresFetching();
setupSortAndSkillClickListeners();

console.log("Dashboard Initialized.");
});