// app.js - Main application entry point

// --- Core Data Imports ---
import {
    currentUsername, // Example: Used for default username
    customSkillXPRates // Needed for indicator logic
} from './data.js';

// --- Storage Function Imports ---
import {
    loadCoreDataFromStorage, saveSkillLevelsFromModal, resetSkillLevels,
    exportData, handleFileImport
} from './storage.js';

// --- UI Function Imports ---
import {
    populateDiaries, populateSkillSummary, openSkillEditor, closeSkillEditor, showView,
    populateMiscellaneousGoals, populateMilestoneGoals, populateGearProgression,
    updateCombatLevelDisplay, updateOverallStats, updateCumulativeGoalProgress,
    updateCumulativeGearProgress, updateDashboardSummaryProgress, populateCombatTasks,
    updateCumulativeCombatProgress, updateGearStageCost,
    updateAllDiarySkillReqs,
    populateQuestsView // <-- ADDED Quest View Population
} from './ui.js';

// --- Event Handler Imports ---
import {
    handleViewNavigation, handleSkillNameClick, handleMiscGoalDescKey, addMiscellaneousGoal,
    toggleDiaryContent as toggleDiaryHandler, handleDifficultyTabClick, handleCATierFilter,
    handleCATypeFilter, handleCAStatusFilter, handleCABossSearch,
    handleQuestCompletionChange // <-- ADDED Quest Handler (even if attached in UI)
    // Other handlers attached dynamically in ui.js
} from './events.js';

// --- API/Calculation Function Imports ---
import { fetchHiscoresData } from './hiscores.js';
import { initializeAndUpdatePrices } from './priceFetcher.js';

// --- Theme Toggle Setup ---
const themeToggleButton = document.getElementById('theme-toggle-button');
const currentTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleButton) themeToggleButton.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}
if (currentTheme) applyTheme(currentTheme);
else if (prefersDark) applyTheme('dark');
else applyTheme('light');

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
    });
}

// --- Setup Functions (Attaching Event Listeners to Static Elements) ---

function setupViewNavigation() {
    const navContainer = document.querySelector('.view-navigation.header-view-navigation');
    if (navContainer) navContainer.addEventListener('click', handleViewNavigation);
    else console.error("View navigation container not found.");

    const lastView = localStorage.getItem('activeView') || 'dashboard-view';
    // Add 'quests-view' to the list of known views for validation
    const knownViews = ['dashboard-view', 'diaries-view', 'goals-view', 'gear-view', 'combat-tasks-view', 'quests-view'];
    if (knownViews.includes(lastView) && document.getElementById(lastView)) {
        showView(lastView);
    } else {
        console.warn(`Saved view "${lastView}" not found or invalid, defaulting to dashboard.`);
        showView('dashboard-view');
    }
}

function setupCAFilters() {
    const filtersContainer = document.querySelector('.ca-filters');
    const bossSearch = document.getElementById('ca-boss-search');
    if (filtersContainer) {
        filtersContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.filter-button[data-filter-type]');
            if (button) {
                const type = button.dataset.filterType;
                if (type === 'tier') handleCATierFilter(event);
                else if (type === 'type') handleCATypeFilter(event);
                else if (type === 'status') handleCAStatusFilter(event);
            }
        });
    } else console.warn("CA Filters container not found.");
    if (bossSearch) bossSearch.addEventListener('input', handleCABossSearch);
    else console.warn("CA Boss Search input not found.");
}

function setupSkillEditor() {
    document.getElementById('edit-skills-button')?.addEventListener('click', openSkillEditor);
    document.querySelector('#skill-editor-modal .modal-close')?.addEventListener('click', closeSkillEditor);
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('skill-editor-modal')) closeSkillEditor();
    });
    document.getElementById('save-skills')?.addEventListener('click', () => {
        const changes = saveSkillLevelsFromModal();
        if (changes.levelsChanged || changes.ratesChanged) {
            populateSkillSummary(document.querySelector('.sort-buttons .filter-button.active')?.dataset.sort || 'level');
            updateOverallStats();
            updateAllDiarySkillReqs();
            updateCombatLevelDisplay();
            updateDashboardSummaryProgress();
            document.getElementById('custom-rates-indicator').style.display = Object.keys(customSkillXPRates).length > 0 ? 'inline' : 'none';
        }
        closeSkillEditor();
    });
    document.getElementById('reset-skills')?.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all skill levels and XP rates to default?")) {
            resetSkillLevels();
            populateSkillSummary(document.querySelector('.sort-buttons .filter-button.active')?.dataset.sort || 'level');
            updateOverallStats();
            updateAllDiarySkillReqs();
            updateCombatLevelDisplay();
            updateDashboardSummaryProgress();
            document.getElementById('custom-rates-indicator').style.display = 'none';
            closeSkillEditor();
        }
    });
}

function setupImportExport() {
    const importButton = document.getElementById('import-data-button');
    const exportButton = document.getElementById('export-data-button');
    const fileInput = document.getElementById('import-file-input');
    if (exportButton) exportButton.addEventListener('click', exportData);
    if (importButton && fileInput) {
        importButton.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileImport);
    }
}

function setupHiscoresFetching() {
    const fetchButton = document.getElementById('fetch-hiscores-button');
    const usernameElement = document.getElementById('player-name');
    if (!fetchButton || !usernameElement) return;
    const savedUsername = localStorage.getItem('rsUsername');
    usernameElement.textContent = savedUsername || 'Enter Username';
    fetchButton.addEventListener('click', fetchHiscoresData);
    usernameElement.addEventListener('keypress', (event) => { if (event.key === 'Enter') { event.preventDefault(); usernameElement.blur(); } });
    usernameElement.addEventListener('blur', () => {
        const newUsername = usernameElement.textContent.trim();
        const currentSaved = localStorage.getItem('rsUsername') || '';
        if (newUsername && newUsername.toLowerCase() !== 'enter username' && newUsername !== currentSaved) {
            localStorage.setItem('rsUsername', newUsername); console.log("Username updated:", newUsername);
        } else if (!newUsername || newUsername.toLowerCase() === 'enter username') {
            usernameElement.textContent = 'Enter Username';
            if (currentSaved) { localStorage.removeItem('rsUsername'); console.log("Username cleared."); }
        }
    });
}

function setupAddGoalButton() {
    document.getElementById('add-goal-button')?.addEventListener('click', addMiscellaneousGoal);
}

function setupSortAndSkillClickListeners() {
    const sortButtonsContainer = document.querySelector('.sort-buttons');
    const skillSummaryContainer = document.getElementById('skill-summary');
    if (sortButtonsContainer) {
        sortButtonsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('.filter-button[data-sort]');
            if (button) {
                sortButtonsContainer.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                populateSkillSummary(button.dataset.sort);
            }
        });
    }
    if (skillSummaryContainer) skillSummaryContainer.addEventListener('click', handleSkillNameClick);
}

// --- DOMContentLoaded - Main Initialization Sequence ---
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Initializing Dashboard...");

    // --- 1. Load ALL Data State ---
    await loadCoreDataFromStorage();
    console.log("Core data loaded.");

    // --- 2. Fetch External Data ---
    try {
        await initializeAndUpdatePrices();
        console.log("Item prices fetched and applied.");
    } catch (error) { console.error("Failed to initialize item prices:", error); }

    // --- 3. Populate UI Structure ---
    populateDiaries();
    populateMiscellaneousGoals();
    populateMilestoneGoals();
    populateGearProgression();
    populateCombatTasks();
    populateQuestsView(); // <-- POPULATE NEW QUEST VIEW
    console.log("Base UI Populated.");

    // --- 4. Update UI Displays Based on Final State ---
    updateCombatLevelDisplay();
    updateOverallStats();
    updateCumulativeGoalProgress();
    updateCumulativeGearProgress();
    updateCumulativeCombatProgress();
    updateDashboardSummaryProgress();
    const initialSort = 'level';
    document.querySelectorAll('.sort-buttons .filter-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.sort-buttons .filter-button[data-sort="${initialSort}"]`)?.classList.add('active');
    populateSkillSummary(initialSort);
    document.getElementById('custom-rates-indicator').style.display = Object.keys(customSkillXPRates).length > 0 ? 'inline' : 'none';
    console.log("UI displays updated.");

    // --- 5. Setup Event Listeners for Static Elements ---
    setupViewNavigation(); // Includes setting initial view
    setupSkillEditor();
    setupImportExport();
    setupHiscoresFetching();
    setupSortAndSkillClickListeners();
    setupAddGoalButton();
    setupCAFilters();

    // Diary Grid Event Delegation
    const diariesGrid = document.querySelector('#diaries-view .diaries-grid');
    if (diariesGrid) {
        diariesGrid.addEventListener('click', (event) => {
            if (event.target.closest('.diary-header')) toggleDiaryHandler(event);
            else if (event.target.closest('.diff-button')) handleDifficultyTabClick(event);
            // Individual task clicks handled by listeners attached during population
        });
    }

    // Quest View Event Delegation (NEW - if needed, but currently attached directly)
    // const questsView = document.getElementById('quests-view');
    // if (questsView) {
    //    questsView.addEventListener('change', (event) => {
    //         if (event.target.classList.contains('quest-checkbox')) { // Use a specific class
    //             handleQuestCompletionChange(event);
    //         }
    //     });
    // }
    // Note: For quests, attaching directly in populateQuestsView is also fine as the list isn't dynamically reloaded like diary difficulties.

    console.log("Dashboard Initialized.");
});