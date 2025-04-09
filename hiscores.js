// hiscores.js
import { skillRequirements, currentUsername, HISCORE_SKILL_ORDER } from './data.js';
import { recalculateSkillNeeds } from './calculations.js';
import {
    populateSkillSummary, updateOverallStats, updateAllDiarySkillReqs,
    updateCombatLevelDisplay, updateTotalLevelDisplay, updateDashboardSummaryProgress
} from './ui.js';
import { persistSkillLevels } from './storage.js';

export async function fetchHiscoresData() {
    const usernameElement = document.getElementById('player-name');
    const fetchButton = document.getElementById('fetch-hiscores-button');
    if (!usernameElement || !fetchButton) return;

    const originalButtonText = fetchButton.textContent;
    const usernameToFetch = usernameElement.textContent.trim();

    if (!usernameToFetch || usernameToFetch.toLowerCase() === 'enter username') {
        alert("Please enter a valid username.");
        usernameElement.focus();
        return;
    }
    localStorage.setItem('rsUsername', usernameToFetch);

    console.log(`[Hiscores] Fetching for: ${usernameToFetch}`);
    fetchButton.textContent = 'Fetching...';
    fetchButton.disabled = true;
    // Reset displays while fetching
    updateTotalLevelDisplay('--'); // Keep resetting total level placeholder
    updateCombatLevelDisplay(); // Reset combat level display

    const targetUrl = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(usernameToFetch)}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`; // Or your preferred proxy

    try {
        console.log(`[Hiscores] Requesting URL: ${proxyUrl}`);
        const response = await fetch(proxyUrl);
        console.log(`[Hiscores] Response Status: ${response.status}`);

        if (!response.ok) {
            // ... (error handling remains the same) ...
            let errorMsg = `Error fetching data. Status: ${response.status}`;
            let errorBody = ''; try { errorBody = await response.text(); } catch (_) {}
            console.error(`[Hiscores] Fetch failed. Status: ${response.status}, Body: ${errorBody}`);
            if (response.status === 404 || errorBody.toLowerCase().includes("no player found")) { errorMsg = `Hiscores not found for user "${usernameToFetch}". Check username.`; }
            throw new Error(errorMsg);
        }

        const data = await response.text();
        console.log("[Hiscores] Raw data received:\n", data);
        const lines = data.split('\n');
        console.log("[Hiscores] Data split into lines:", lines);

        let skillsUpdated = false;
        // Removed fetchedTotalLevel variable - we don't get it from this API endpoint

        // --- REMOVED Overall Parsing ---

        // --- CORRECTED Loop for individual skills (Starts from index 0) ---
        console.log("[Hiscores] --- Parsing Individual Skills ---");
        // Loop through the HISCORE_SKILL_ORDER array using its index `skillIndex`
        // This index directly corresponds to the line number in the `lines` array
        for (let skillIndex = 0; skillIndex < HISCORE_SKILL_ORDER.length; skillIndex++) {
            const skillName = HISCORE_SKILL_ORDER[skillIndex]; // Get skill name for this index
            const lineIndex = skillIndex; // <<< CORRECTED: Line index is the same as skill index

            if (!skillName) continue; // Should not happen

            // Check if the line exists in the response
            if (lineIndex < lines.length && lines[lineIndex] && lines[lineIndex].trim() !== '') {
                const parts = lines[lineIndex].split(',');
                console.log(`[Hiscores] Parsing line ${lineIndex} for ${skillName}:`, lines[lineIndex], "Parts:", parts);

                if (parts.length === 3) {
                    const level = parseInt(parts[1]); // Level is at index 1
                    const xp = parseInt(parts[2]); // XP is at index 2
                    console.log(`[Hiscores]   Raw level parsed for ${skillName}: ${level}, XP: ${xp}`);
                    const skillData = skillRequirements.find(s => s.skill === skillName);

                    if (skillData && !isNaN(level)) {
                        let newLevel;
                        if (level === -1) { // Handle unranked
                            newLevel = (skillName === "Hitpoints") ? 10 : 1;
                            console.log(`[Hiscores]   ${skillName} is unranked (-1), setting to base level: ${newLevel}`);
                        } else if (level > 0) {
                            newLevel = (skillName === "Hitpoints" && level < 10) ? 10 : level;
                            console.log(`[Hiscores]   Processed level for ${skillName}: ${newLevel}`);
                        } else {
                            // If level is 0 or less (and not -1), treat as base level too
                            newLevel = (skillName === "Hitpoints") ? 10 : 1;
                            console.warn(`[Hiscores]   Non-positive level (${level}) for ${skillName}, setting to base: ${newLevel}`);
                        }

                        // --- Update Total Level Calculation (Manual) ---
                        // We need to calculate total level manually now
                        // We'll do this *after* all skills are processed.

                        if (skillData.current !== newLevel) {
                            console.log(`[Hiscores]   >>> Updating ${skillName}: ${skillData.current} -> ${newLevel}`);
                            skillData.current = newLevel;
                            skillsUpdated = true;
                        } else {
                            console.log(`[Hiscores]   Level for ${skillName} unchanged (${newLevel}).`);
                        }
                    } else {
                        console.warn(`[Hiscores]   Could not find skillData for ${skillName} or parsed level is NaN (${level}).`);
                    }
                } else {
                    console.warn(`[Hiscores]   Unexpected format for ${skillName} line:`, lines[lineIndex]);
                }
            } else {
                console.warn(`[Hiscores]   Missing or empty line for expected skill ${skillName} at index ${lineIndex}.`);
            }
        }
        console.log("[Hiscores] --- Finished Parsing Individual Skills ---");
        // --- END CORRECTED Loop ---


        // --- Calculate and Update Total Level Manually ---
        let calculatedTotalLevel = 0;
        skillRequirements.forEach(skill => {
            // Sum up the 'current' level for all skills after potential updates
            calculatedTotalLevel += skill.current || 0;
        });
        console.log(`[Hiscores] Manually calculated Total Level: ${calculatedTotalLevel}`);
        updateTotalLevelDisplay(calculatedTotalLevel); // Update UI with calculated total
        // --- End Total Level Calculation ---


        if (skillsUpdated) {
            console.log("[Hiscores] Skills updated. Recalculating, saving, updating UI.");
            recalculateSkillNeeds();
            persistSkillLevels();
            populateSkillSummary(document.querySelector('.sort-buttons .filter-button.active')?.dataset.sort || 'level');
            updateOverallStats();
            updateAllDiarySkillReqs();
            updateCombatLevelDisplay(); // Update combat level based on new stats
            updateDashboardSummaryProgress();
            alert(`Successfully updated skills for ${usernameToFetch}!`);
        } else {
            console.log("[Hiscores] No skill level changes detected.");
            // Still update combat level display even if no skills changed
            updateCombatLevelDisplay();
            alert(`Hiscores fetched for ${usernameToFetch}, but no level changes were found.`);
        }
    } catch (error) {
        console.error('[Hiscores] Fetch Error in catch block:', error);
        alert(`Failed to fetch Hiscores: ${error.message}`);
        updateTotalLevelDisplay('--');
        updateCombatLevelDisplay();
    } finally {
        fetchButton.textContent = originalButtonText;
        fetchButton.disabled = false;
        console.log("[Hiscores] Fetch process finished.");
    }
}