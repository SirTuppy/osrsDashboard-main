import csv
import json
import os

# --- Configuration ---
CSV_FILENAME = 'OSRS- Combat Task List.csv'
JSON_OUTPUT_FILENAME = 'combat_achievements_data.json'
# Define approximate point thresholds for tiers (adjust if needed based on wiki)
TIER_POINTS = {
    1: "easy",
    2: "medium",
    3: "hard",
    4: "elite",
    5: "master",
    6: "grandmaster",
}
# Define structure for output JSON
DEFAULT_COLORS = {
    "easy": "#a0d2db", # Light blue/cyan
    "medium": "#a8d8a0", # Light green
    "hard": "#f8c070", # Light orange
    "elite": "#f5a7a7", # Light red
    "master": "#d7b0f8", # Light purple
    "grandmaster": "#cccccc" # Light grey
}

# Define column indices (0-based) from the CSV
# B=1 (Achieved), C=2 (Boss), D=3 (Name), E=4 (Description),
# F=5 (Type), G=6 (Points), H=7 (Wiki Link), I=8 (Notes)
COL_ACHIEVED = 1
COL_BOSS = 2
COL_NAME = 3
COL_DESC = 4
COL_TYPE = 5
COL_POINTS = 6
COL_WIKI = 7
COL_NOTES = 8

# --- Helper Function ---
def get_tier_from_points(points):
    """Maps points to a tier name string."""
    return TIER_POINTS.get(points, None) # Return None if points value is unexpected

# --- Main Script ---
def main():
    output_data = {}
    # Initialize output structure with tiers
    for points, tier_name in TIER_POINTS.items():
        output_data[tier_name] = {
            "name": f"{tier_name.capitalize()} Tasks",
            "color": DEFAULT_COLORS.get(tier_name, "#ffffff"),
            "tasks": []
        }

    # Check if CSV file exists
    if not os.path.exists(CSV_FILENAME):
        print(f"Error: CSV file not found at '{os.path.abspath(CSV_FILENAME)}'")
        print("Please make sure the script is in the same directory as the CSV.")
        return

    print(f"Reading data from '{CSV_FILENAME}'...")
    tasks_processed = 0
    skipped_rows = 0

    try:
        with open(CSV_FILENAME, mode='r', encoding='utf-8') as infile:
            reader = csv.reader(infile)
            # Skip header rows (adjust number if needed based on CSV layout)
            for _ in range(2): # Skip first 2 rows based on example
                next(reader, None)

            for i, row in enumerate(reader):
                # Basic check for a valid-looking row (e.g., has enough columns, points column looks like a number)
                if not row or len(row) <= COL_NOTES or not row[COL_POINTS].strip().isdigit():
                    skipped_rows += 1
                    # print(f"Skipping row {i+3}: Invalid format or insufficient columns.")
                    continue

                try:
                    points = int(row[COL_POINTS].strip())
                    tier = get_tier_from_points(points)

                    if tier is None:
                        print(f"Warning: Row {i+3} has unexpected points value '{points}'. Skipping.")
                        skipped_rows += 1
                        continue

                    # Handle boolean conversion robustly
                    achieved_str = row[COL_ACHIEVED].strip().upper()
                    achieved = achieved_str == 'TRUE'

                    task_obj = {
                        "name": row[COL_NAME].strip(),
                        "description": row[COL_DESC].strip(),
                        "boss": row[COL_BOSS].strip(),
                        "type": row[COL_TYPE].strip(),
                        "points": points,
                        "wikiLink": row[COL_WIKI].strip(),
                        "notes": row[COL_NOTES].strip(),
                        "achieved": achieved # Use parsed boolean
                    }

                    output_data[tier]["tasks"].append(task_obj)
                    tasks_processed += 1

                except (ValueError, IndexError) as e:
                    print(f"Error processing row {i+3}: {e}. Row data: {row}")
                    skipped_rows += 1

    except FileNotFoundError:
        print(f"Error: Could not find the file '{CSV_FILENAME}'.")
        return
    except Exception as e:
        print(f"An unexpected error occurred while reading the CSV: {e}")
        return

    print(f"Processed {tasks_processed} tasks.")
    if skipped_rows > 0:
        print(f"Skipped {skipped_rows} rows due to formatting or errors.")

    # Write the JSON output
    print(f"Writing data to '{JSON_OUTPUT_FILENAME}'...")
    try:
        with open(JSON_OUTPUT_FILENAME, mode='w', encoding='utf-8') as outfile:
            json.dump(output_data, outfile, indent=4) # Use indent=4 for readability
        print("JSON file created successfully!")
    except Exception as e:
        print(f"An error occurred while writing the JSON file: {e}")

if __name__ == "__main__":
    main()