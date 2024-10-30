let app; // Declare app in a wider scope

// Declare global variables for map dimensions
const tileSize = 64;
const mapWidth = 50;  // Map width
const mapHeight = 50; // Map height
const textures = {};
let dnaUnits = 100; // Initial DNA Units
let currentBuilding = null; // Track the selected building
let isPlacingBuilding = false; // Track if the player is placing a building

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
    app.view.addEventListener('mousedown', (e) => { dragging = true; lastPosition = { x: e.clientX, y: e.clientY }
