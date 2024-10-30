function placeBuilding(buildingType, tileX, tileY) {
    if (canAffordBuilding(buildingType)) {
        const buildingSprite = new PIXI.Sprite(textures[buildingType.toLowerCase().replace(' ', '')]);
        buildingSprite.x = tileX * tileSize;
        buildingSprite.y = tileY * tileSize;
        app.stage.addChild(buildingSprite);
        deductCost(buildingType); // Deduct the cost from DNA Units
    } else {
        alert("Not enough DNA Units!");
    }
}

function deductCost(buildingType) {
    const buildingCosts = {
        "Power Plant": 30,
        "Extractor": 20,
        "Pylon": 10,
        "Laser Tower": 40,
    };
    dnaUnits -= buildingCosts[buildingType]; // Deduct cost from DNA Units
}

function canAffordBuilding(buildingType) {
    const buildingCosts = {
        "Power Plant": 30,
        "Extractor": 20,
        "Pylon": 10,
        "Laser Tower": 40,
    };
    return dnaUnits >= buildingCosts[buildingType];
}
