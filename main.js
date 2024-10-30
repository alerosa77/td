let app; // Declare app in a wider scope

// Declare global variables for map dimensions
const tileSize = 64;
const mapWidth = 50;  // Map width
const mapHeight = 50; // Map height
const textures = {};

document.addEventListener('DOMContentLoaded', () => {
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb
    });
    document.body.appendChild(app.view);

    // Load the textures
    PIXI.Loader.shared
        .add('grass1', 'tileset/grass1.png')
        .add('grass2', 'tileset/grass2.png')
        .add('dirt1', 'tileset/dirt1.png')
        .add('dirt2', 'tileset/dirt2.png')
        .add('flower1', 'tileset/flower1.png')
        .add('flower2', 'tileset/flower2.png')
        .add('rock1', 'tileset/rock1.png')
        .add('rock2', 'tileset/rock2.png')
        .add('wood1', 'tileset/wood1.png')
        .add('wood2', 'tileset/wood2.png')
        .add('resource', 'tileset/resource.png')
        .add('powerplant', 'buildings/powerplant.png')
        .add('extractor', 'buildings/extractor.png')
        .add('pylon', 'buildings/pylon.png')
        .add('lasertower', 'buildings/lasertower.png'); // Load the single image for the laser tower

    PIXI.Loader.shared.load(setup);

    function setup(loader, resources) {
        Object.keys(resources).forEach((key) => {
            textures[key] = resources[key].texture;
        });

        createMap(); // Now this will have access to app and the map dimensions
        setupUI();   // Ensure this function is defined elsewhere

        // Add click event listener for map interactions
        app.stage.interactive = true;
        app.stage.on('pointerdown', (event) => {
            const mousePosition = event.data.getLocalPosition(app.stage);
            const tileX = Math.floor(mousePosition.x / tileSize);
            const tileY = Math.floor(mousePosition.y / tileSize);
            handleClickOnMap(tileX, tileY); // Handle building placement
        });
    }
});

// Create the game map
function createMap() {
    const mapContainer = new PIXI.Container();
    app.stage.addChild(mapContainer);

    const totalTiles = mapWidth * mapHeight;
    const resourceTileCount = Math.floor(totalTiles * 0.05); // 5% of total tiles
    const groundTileCount = totalTiles - resourceTileCount;

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const tileType = getRandomTileType(groundTileCount, resourceTileCount);
            const tileSprite = new PIXI.Sprite(textures[tileType]);
            tileSprite.x = (x - y) * (tileSize / 2);
            tileSprite.y = (x + y) * (tileSize / 4);
            tileSprite.width = tileSprite.height = tileSize;
            mapContainer.addChild(tileSprite);
        }
    }

    mapContainer.x = app.screen.width / 2;
    mapContainer.y = app.screen.height / 4;

    let dragging = false;
    let lastPosition = { x: 0, y: 0 };
    app.view.addEventListener('mousedown', (e) => { dragging = true; lastPosition = { x: e.clientX, y: e.clientY }; });
    app.view.addEventListener('mouseup', () => { dragging = false; });
    app.view.addEventListener('mousemove', (e) => {
        if (dragging) {
            const dx = e.clientX - lastPosition.x;
            const dy = e.clientY - lastPosition.y;
            mapContainer.x += dx;
            mapContainer.y += dy;
            lastPosition = { x: e.clientX, y: e.clientY };
        }
    });
}

function getRandomTileType(groundTileCount, resourceTileCount) {
    const rand = Math.random() * 100;
    if (rand < 40) return 'grass1';
    if (rand < 70) return 'grass2';
    if (rand < 73) return 'dirt1';
    if (rand < 76) return 'dirt2';
    if (rand < 79) return 'flower1';
    if (rand < 81) return 'flower2';
    if (rand < 83) return 'rock1';
    if (rand < 86) return 'rock2';
    if (rand < 88) return 'wood1';
    if (rand < 90) return 'wood2';
    return 'resource'; // Returns resource tile
}

// Handle clicks on the map
function handleClickOnMap(tileX, tileY) {
    if (isPlacingBuilding && currentBuilding) {
        if (canAffordBuilding(currentBuilding)) {
            placeBuilding(currentBuilding, tileX, tileY);
            isPlacingBuilding = false; // Reset after placement
            currentBuilding = null; // Clear selection
            resetCursor(); // Reset cursor back to normal
        } else {
            alert("Not enough DNA Units!");
        }
    }
}

// Reset the cursor to default
function resetCursor() {
    // Logic to reset cursor to default, e.g. changing the mouse style
}

// Place the selected building
function placeBuilding(buildingType, tileX, tileY) {
    const buildingSprite = new PIXI.Sprite(textures[buildingType.toLowerCase().replace(' ', '')]);
    buildingSprite.x = tileX * tileSize;
    buildingSprite.y = tileY * tileSize;
    app.stage.addChild(buildingSprite);
}

// Check if the player can afford a building
function canAffordBuilding(buildingType) {
    const buildingCosts = {
        "Power Plant": 30,
        "Extractor": 20,
        "Pylon": 10,
        "Laser Tower": 40,
    };
    return dnaUnits >= buildingCosts[buildingType];
}

