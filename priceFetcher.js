// priceFetcher.js (Corrected Option 1 - Fetch ALL, then Apply)
import { gearProgressionData } from './data.js';
import { updateGearStageCost } from './ui.js'; // Ensure this is exported from ui.js

const WIKI_API_BASE = 'https://prices.runescape.wiki/api/v1/osrs';
const MAPPING_ENDPOINT = `${WIKI_API_BASE}/mapping`;
const LATEST_PRICES_ENDPOINT = `${WIKI_API_BASE}/latest`; // Endpoint for ALL latest prices

// --- SET YOUR USER AGENT ---
const USER_AGENT = 'OSRS Dashboard Project - Personal Use'; // Update if needed

// Module scope variables for caching
let itemMappingCache = null;
let latestPriceDataCache = null; // Will store ALL fetched prices {id: {high, low, ...}}
let lastPriceFetchTimestamp = 0;
const PRICE_CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// ===== FIXED PRICES (Fallback for Untradeables/Misses) =====
const FIXED_PRICES = {
    // Untradeables (Set to 0) - Use final item ID as key
    10551: 0, 3844: 0, 10498: 0, 12612: 0, 13337: 0, 12658: 0, 2413: 0,
    12608: 0, 2412: 0, 2414: 0, 6107: 0, 6108: 0, 6109: 0, 6110: 0, // God Capes, Ard Cloaks IDs
    6570: 0, 12954: 0, 19675: 0, 10499: 0, 4224: 0, 7462: 0, 11665: 0,
    11664: 0, 11663: 0, 11773: 0, 22109: 0, 23975: 0, 23977: 0, 23979: 0,
    25867: 0, 11771: 0, 21791: 0, 21793: 0, 21795: 0, 11770: 0, 22943: 0,
    21295: 0, 28903: 0, 13182: 0, 11865: 0, 12018: 0, 20657: 0,

    // Add any other untradeable IDs you know
    // Example explicit price (usually not needed if API is reliable)
    // 21304: 950000, // Obsidian platelegs
};


/**
 * Fetches and caches the item name/ID mapping from the Wiki API.
 */
async function fetchAndCacheMapping() {
    // (This function remains unchanged from your previous correct version)
    if (itemMappingCache) return true;
    console.log("[PriceFetcher] Fetching item name/ID mapping...");
    try {
        const response = await fetch(MAPPING_ENDPOINT, { headers: { 'User-Agent': USER_AGENT } });
        if (!response.ok) throw new Error(`Mapping API failed: ${response.status}`);
        const mappingData = await response.json();
        const nameToId = {};
        const idToName = {};
        mappingData.forEach(item => {
            const normalizedName = item.name.toLowerCase().trim();
            if (!nameToId[normalizedName]) nameToId[normalizedName] = item.id;
            idToName[item.id] = normalizedName;
        });
        itemMappingCache = { nameToId, idToName };
        console.log(`[PriceFetcher] Fetched map (${Object.keys(nameToId).length} unique names).`);
        return true;
    } catch (error) {
        console.error("[PriceFetcher] Error fetching mapping:", error);
        itemMappingCache = null;
        return false;
    }
}

/**
 * Attempts to find the best matching item ID for a given name using the mapping cache.
 * (This function remains unchanged from your previous correct version)
 */
function findBestMatchingId(itemName) {
     if (!itemMappingCache || !itemMappingCache.nameToId) return null;
     const nameMap = itemMappingCache.nameToId;
     const normalizedName = itemName.toLowerCase().trim();
     // 1. Try exact match
     if (nameMap[normalizedName]) return nameMap[normalizedName];
     // 2. Check for specific tradeable variations BEFORE stripping
     const unchargedName = normalizedName.replace(/\s*\((charged|active|c|i)\)$/, '').trim() + " (uncharged)";
     if (normalizedName !== unchargedName && nameMap[unchargedName]) return nameMap[unchargedName];
     // 3. Strip suffixes as fallback
     const patternsToRemove = [
         /\s*\(\d+\)$/, /\s*\(i\)$/, /\s*\(c\)$/, /\s*\(active\)$/,
         /\s*\(basic\)$/, /\s*\(attuned\)$/, /\s*\(perfected\)$/, /\s*\(or\)$/,
         /\s*\(l\)$/, /\s*\(g\)$/, /\s*\(t\)$/,
     ];
     let baseName = normalizedName;
     for (const pattern of patternsToRemove) {
         if (pattern.test(baseName)) {
              const potentialBase = baseName.replace(pattern, '').trim();
              if (potentialBase !== baseName) {
                    if (nameMap[potentialBase]) return nameMap[potentialBase];
                    baseName = potentialBase;
                    if (nameMap[baseName]) return nameMap[baseName];
              }
         }
     }
     return null;
}


/**
 * Fetches and caches the latest price data for ALL items from the Wiki API.
 */
async function fetchAndCacheLatestPrices(/* No parameters needed */) { // Parameter removed
    const now = Date.now();
    if (latestPriceDataCache && (now - lastPriceFetchTimestamp < PRICE_CACHE_DURATION_MS)) {
        // console.log("[PriceFetcher] Using cached latest prices.");
        return true;
    }

    console.log('[PriceFetcher] Fetching latest prices for ALL ITEMS...'); // Log change
    const url = LATEST_PRICES_ENDPOINT; // Use base endpoint

    try {
        const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
        if (!response.ok) {
            let errorBody = '';
            try { errorBody = await response.text(); } catch (_) {}
            throw new Error(`Latest Prices API failed: ${response.status}. Body: ${errorBody}`);
        }
        const priceData = await response.json();
        if (!priceData.data) throw new Error("Invalid API response: missing 'data' field");

        latestPriceDataCache = priceData.data; // Store the entire price data object
        lastPriceFetchTimestamp = now;
        console.log(`[PriceFetcher] Fetched ALL latest prices for ${Object.keys(latestPriceDataCache).length} item IDs.`);
        return true;
    } catch (error) {
        console.error("[PriceFetcher] Error fetching latest prices:", error);
        return false;
    }
}

/**
 * Applies prices to items in gearProgressionData using cached API data and fallbacks.
 * Uses item.foundId (which might be precursor ID or name-matched ID) for API lookup.
 * Uses item.itemId (original ID) for FIXED_PRICES lookup.
 */
function applyPricesToGearData() {
    console.log("[PriceFetcher] Applying prices to gear data...");
    if (!itemMappingCache) { // Although mapping is mainly used earlier now, keep check
        console.error("[PriceFetcher] Cannot apply prices reliably: Item mapping not available!");
        // return; // Maybe don't return, try applying fixed prices anyway?
    }
    if (!latestPriceDataCache) {
        console.warn("[PriceFetcher] No latest price data cache available. Relying on fallbacks.");
        latestPriceDataCache = {};
    }

    let appliedApiCount = 0;
    let appliedFixedCount = 0;
    let missingFromApiCount = 0; // Count where API specifically lacked data for foundId
    let nameMapMissCount = 0;    // Count where findBestMatchingId returned null AND no precursor set

    for (const stageKey in gearProgressionData) {
        if (!gearProgressionData[stageKey]?.items) continue;

        gearProgressionData[stageKey].items.forEach(item => {
            const originalItemIdFromData = item.itemId; // Original ID from data.js (for fixed lookup)
            // --- Use item.foundId which was already determined in initializeAndUpdatePrices ---
            const priceLookupId = item.foundId;
            let priceApplied = false;
            item.price = 0; // Reset price

            // Count name mapping misses ONLY if no precursor ID was specified AND findBestMatchingId failed
            if (!priceLookupId && !item.priceSourceItemId) {
                nameMapMissCount++;
            }

            // 1. Try API price using the determined priceLookupId
            if (priceLookupId && latestPriceDataCache[priceLookupId]) {
                const priceInfo = latestPriceDataCache[priceLookupId];
                item.price = priceInfo.high !== null ? priceInfo.high : 0;
                if (item.price > 0) {
                    appliedApiCount++;
                    priceApplied = true;
                } else {
                    // API returned data, but high price was null/0 (often for very low volume items)
                    // console.warn(`[PriceFetcher] API price was null/0 for ID ${priceLookupId} (${item.name})`);
                     missingFromApiCount++; // Count this as an API miss for the summary
                }
            } else if (priceLookupId) {
                 // We had an ID to look up (precursor or name-mapped), but it wasn't in the full price cache
                 // This is less likely now we fetch all, unless API truly doesn't list it OR ID was wrong
                 missingFromApiCount++;
            }
            // Note: nameMapMissCount handled implicitly when priceLookupId is null

            // 2. Fallback to FIXED_PRICES using the ORIGINAL itemId from data.js
            if (!priceApplied && originalItemIdFromData && FIXED_PRICES[originalItemIdFromData] !== undefined) {
                item.price = FIXED_PRICES[originalItemIdFromData];
                appliedFixedCount++;
                priceApplied = true; // Mark as applied even if 0 (for untradeables)
                // If an API price was missed, but we applied a fixed price, remove from missing count
                if (priceLookupId && !latestPriceDataCache[priceLookupId]) {
                     missingFromApiCount = Math.max(0, missingFromApiCount - 1);
                }
            }

            // Final check for logging completely unpriced items
             if (!priceApplied) {
                 // This log now covers items where mapping failed AND fixed failed,
                 // OR where lookup ID existed but API lacked data AND fixed failed.
                 // console.warn(`[PriceFetcher] No price source found for ${item.name} (Lookup ID: ${priceLookupId}, Original ID: ${originalItemIdFromData})`);
             }
        });
    }
    console.log(`[PriceFetcher] Price summary: API=${appliedApiCount}, Fixed=${appliedFixedCount}, NameMiss=${nameMapMissCount}, ApiMiss=${missingFromApiCount}`);
}


/**
 * Updates the cost display for all gear stages in the UI.
 */
function updateAllGearStageCosts() {
    // (This function remains unchanged from your previous correct version)
    console.log("[PriceFetcher] Updating all gear stage costs in UI...");
    if (typeof updateGearStageCost === 'function') {
        for (const stageKey in gearProgressionData) {
            updateGearStageCost(stageKey);
        }
    } else {
        console.error("[PriceFetcher] Cannot update UI costs: 'updateGearStageCost' not available/imported from ui.js!");
    }
}


// --- MAIN EXPORTED FUNCTION ---
/**
 * Initializes price fetching: gets mapping, fetches ALL latest prices,
 * applies them to gearProgressionData (using name mapping, precursors, and fallbacks),
 * and updates the UI cost totals.
 */
export async function initializeAndUpdatePrices() {
    console.log("[PriceFetcher] Initializing and updating item prices...");

    // 1. Fetch Name->ID mapping
    const mappingSuccess = await fetchAndCacheMapping();
    if (!mappingSuccess) { /* ... handle error ... */ }

    // *** ENSURE THIS LOOP CORRECTLY SETS item.foundId ***
    if (itemMappingCache) {
        console.log("[PriceFetcher] Determining required item IDs for price lookup...");
        for (const stageKey in gearProgressionData) {
            if (!gearProgressionData[stageKey]?.items) continue;
            gearProgressionData[stageKey].items.forEach(item => {
                item.foundId = null; // Reset foundId
                let idForPriceLookup = null;

                if (item.priceSourceItemId) { // PRIORITIZE PRECURSOR
                    idForPriceLookup = item.priceSourceItemId;
                } else { // FALLBACK TO NAME MATCHING
                    idForPriceLookup = findBestMatchingId(item.name);
                }
                item.foundId = idForPriceLookup; // STORE THE RESULT

                if (!idForPriceLookup && item.itemId && FIXED_PRICES[item.itemId] === undefined) {
                    console.warn(`[PriceFetcher] Could not determine price lookup ID for "${item.name}" and no fixed price found.`);
                }
            });
        }
    } else { /* ... handle mapping failure ... */ }

    // 2. Fetch ALL latest prices
    const pricesSuccess = await fetchAndCacheLatestPrices();
    if (!pricesSuccess) { /* ... handle error ... */ }

    // 3. Apply prices (uses the item.foundId set above)
    applyPricesToGearData();

    // 4. Update the UI cost displays for all stages
    updateAllGearStageCosts();

    console.log("[PriceFetcher] Item price update cycle complete.");
}