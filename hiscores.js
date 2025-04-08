// Description: Fetches and updates skill levels from Old School RuneScape Hiscores.
import { skillRequirements, currentUsername, HISCORE_SKILL_ORDER } from './data.js';
import { recalculateSkillNeeds } from './calculations.js';
import { populateSkillSummary, updateOverallStats, updateAllDiarySkillReqs, updateCombatLevelDisplay } from './ui.js';
import { saveSkillLevelsFromModal } from './storage.js'; // It calls saveSkillLevels indirectly by updating skillRequirements and relying on the user to save, OR we save automatically. Let's save automatically.
import { persistSkillLevels } from './storage.js'; // Import the new function

export async function fetchHiscoresData() {
    const usernameElement = document.getElementById('player-name');
    const fetchButton = document.getElementById('fetch-hiscores-button');
    if (!usernameElement || !fetchButton) return;
    const originalButtonText = fetchButton.textContent;

    // Use a local variable for the username fetched from the DOM
    const usernameToFetch = usernameElement.textContent.trim(); // <<< Use local variable

    if (!usernameToFetch || usernameToFetch.toLowerCase() === 'enter username') {
        alert("Please enter a valid username.");
        usernameElement.focus();
        return;
    }
    // Save the fetched username immediately
    localStorage.setItem('rsUsername', usernameToFetch); // <<< Save local variable to storage

    console.log(`Fetching Hiscores for: ${usernameToFetch}`); // <<< Log local variable
    fetchButton.textContent = 'Fetching...';
    fetchButton.disabled = true;

    // Use usernameToFetch in the URL
    const targetUrl = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(usernameToFetch)}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
             let errorMsg = `Error fetching data. Status: ${response.status}`;
             if (response.status === 404) errorMsg = `Hiscores not found for user "${currentUsername}". Check username.`;
             else { try { const errorBody = await response.text(); if (errorBody.toLowerCase().includes("not found")) errorMsg = `Hiscores not found for user "${currentUsername}".`; } catch (_) {} }
            throw new Error(errorMsg);
        }
        const data = await response.text();
        const lines = data.split('\n');
        let skillsUpdated = false;

        for (let i = 0; i < HISCORE_SKILL_ORDER.length; i++) {
            const skillName = HISCORE_SKILL_ORDER[i];
            if (i < lines.length && lines[i].trim() !== '') {
                const parts = lines[i].split(','); // Rank, Level, XP
                if (parts.length === 3) {
                    const level = parseInt(parts[1]);
                    const skillData = skillRequirements.find(s => s.skill === skillName);
                    if (skillData && !isNaN(level) && level > 0) {
                         // Handle HP minimum
                         let newLevel = (skillName === "Hitpoints" && level < 10) ? 10 : level;
                        if (skillData.current !== newLevel) {
                            console.log(`Updating ${skillName}: ${skillData.current} -> ${newLevel}`);
                            skillData.current = newLevel;
                            skillsUpdated = true;
                        }
                    }
                }
            }
        }

        if (skillsUpdated) {
            console.log("Skills updated from Hiscores.");
            recalculateSkillNeeds();
            populateSkillSummary(document.querySelector('.sort-buttons .filter-button.active')?.dataset.sort || 'name');
            updateOverallStats();
            updateAllDiarySkillReqs();
            updateCombatLevelDisplay();
            persistSkillLevels(); // Save updated skill levels to localStorage
             console.log("Updated skill levels saved to localStorage.");
            alert(`Successfully updated skills for ${currentUsername}!`);
        } else {
            console.log("No skill level changes detected from Hiscores.");
            alert(`Hiscores fetched for ${currentUsername}, but no level changes were found.`);
        }
    } catch (error) {
        console.error('Hiscores Fetch Error:', error);
        alert(`Failed to fetch Hiscores: ${error.message}`);
    } finally {
        fetchButton.textContent = originalButtonText;
        fetchButton.disabled = false;
    }
}