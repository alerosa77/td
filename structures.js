// structures.js
const buildingCosts = {
    "Power Plant": 50,
    "Extractor": 30,
    "Pylon": 20,
    "Laser Tower": 70
};

// Function to place a building on the map
function placeBuilding(building, x, y) {
    const buildingTexture = getBuildingTexture(building);
    if (buildingTexture) {
        const buildingSprite = new PIXI.Sprite(buildingTexture);
        buildingSprite.x = x * tileSize;
        buildingSprite.y = y * tileSize;
        app.stage.addChild(buildingSprite);
        console.log(`Placed ${building} at (${x}, ${y})`); // Debug: Log placement
    } else {
        console.log(`Invalid building type: ${building}`);
    }
}

// Function to get the texture for a building
function getBuildingTexture(building) {
    switch (building) {
        case "Power Plant":
            return textures.powerplant;
        case "Extractor":
            return textures.extractor;
        case "Pylon":
            return textures.pylon;
        case "Laser Tower":
            return textures.lasertower;
        default:
            return null; // If the building type is not recognized
    }
}

// Function to get the cost of a building
function getBuildingCost(building) {
    return buildingCosts[building] || 0; // Return 0 if building type is not recognized
}
