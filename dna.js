let dnaUnits = 100; // Initial DNA Units

function canAffordBuilding(buildingType) {
    const buildingCosts = {
        "Power Plant": 30,
        "Extractor": 20,
        "Pylon": 10,
        "Laser Tower": 40,
    };
    return dnaUnits >= buildingCosts[buildingType];
}

let dnaUnits = 100; // Initialize DNA Units

function deductCost(buildingType) {
    const buildingCosts = {
        "Power Plant": 30,
        "Extractor": 20,
        "Pylon": 10,
        "Laser Tower": 40,
    };
    dnaUnits -= buildingCosts[buildingType]; // Deduct cost from DNA Units
}
