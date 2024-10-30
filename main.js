// main.js
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

const tileSize = 64;
const mapWidth = 50;
const mapHeight = 50;

const textures = {}; // Stores textures for tiles and buildings
let dnaUnits = 100; // Starting DNA Units
const structureCosts = {
    powerplant: 50,
    extractor: 10,
    pylon: 3,
    lasertower: 20
};

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
    .add('lasertower', 'buildings/lasertower.png')
    .load(setup);

function setup(loader, resources) {
    textures.grass1 = resources.grass1.texture;
    textures.grass2 = resources.grass2.texture;
    textures.dirt1 = resources.dirt1.texture;
    textures.dirt2 = resources.dirt2.texture;
    textures.flower1 = resources.flower1.texture;
    textures.flower2 = resources.flower2.texture;
    textures.rock1 = resources.rock1.texture;
    textures.rock2 = resources.rock2.texture;
    textures.wood1 = resources.wood1.texture;
    textures.wood2 = resources.wood2.texture;
    textures.resource = resources.resource.texture;
    textures.powerplant = resources.powerplant.texture;
    textures.extractor = resources.extractor.texture;
    textures.pylon = resources.pylon.texture;
    textures.lasertower = resources.lasertower.texture;

    const mapContainer = new PIXI.Container();
    app.stage.addChild(mapContainer);

    // Generate map tiles
    const tiles = [];
    for (let y = 0; y < mapHeight; y++) {
        tiles[y] = [];
        for (let x = 0; x < mapWidth; x++) {
            const tileType = getRandomTileType();
            const tileSprite = new PIXI.Sprite(textures[tileType]);
            tileSprite.x = (x - y) * (tileSize / 2);
            tileSprite.y = (x + y) * (tileSize / 4);
            tileSprite.width = tileSprite.height = tileSize;
            mapContainer.addChild(tileSprite);
            tiles[y][x] = tileSprite;
        }
    }

    // Center the map
    mapContainer.x = app.screen.width / 2;
    mapContainer.y = app.screen.height / 4;

    // Add panning functionality
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

    // DNA Units display
    const dnaText = new PIXI.Text(`DNA Units: ${dnaUnits}`, {
        fontFamily: 'Saira Light',
        fontSize: 24,
        fill: 0xffffff
    });
    dnaText.anchor.set(0.5, 0);
    dnaText.x = app.screen.width / 2;
    dnaText.y = 10;
    app.stage.addChild(dnaText);

    // Buttons for building structures
    const buttonContainer = new PIXI.Container();
    buttonContainer.y = app.screen.height - 70;
    buttonContainer.x = app.screen.width / 2 - 150; // Adjust positioning as needed
    app.stage.addChild(buttonContainer);

    const structures = ['powerplant', 'extractor', 'pylon', 'lasertower'];
    structures.forEach((structure, index) => {
        const button = new PIXI.Graphics();
        button.beginFill(0x666666);
        button.drawRoundedRect(0, 0, 70, 50, 10);
        button.endFill();
        button.x = index * 80;

        // Text for button
        const buttonText = new PIXI.Text(structure, {
            fontFamily: 'Saira Light',
            fontSize: 12,
            fill: 0xffffff
        });
        buttonText.anchor.set(0.5);
        buttonText.x = 35;
        buttonText.y = 25;
        button.addChild(buttonText);

        buttonContainer.addChild(button);
        button.interactive = true;
        button.buttonMode = true;

        // Click event for building structures
        button.on('pointerdown', () => buildStructure(structure, dnaText));
    });
}

// Random tile function
function getRandomTileType() {
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
    return 'resource';
}

// Build structure function
function buildStructure(type, dnaText) {
    const cost = structureCosts[type];
    if (dnaUnits >= cost) {
        dnaUnits -= cost;
        dnaText.text = `DNA Units: ${dnaUnits}`;
        console.log(`Building ${type}`);
        // Additional code for placing structure on map here
    } else {
        console.log(`Not enough DNA Units for ${type}`);
    }
}
