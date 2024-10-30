// main.js
let app; // Declare app in a wider scope

// Declare global variables for map dimensions
const tileSize = 64;
const mapWidth = 50;  // Map width
const mapHeight = 50; // Map height
const textures = {};
let dnaUnits = 100; // Initial DNA Units

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

        // Create an array to hold laser tower frames
        const lasertowerFrames = [];
        const frameWidth = 64; // Adjust this to the actual width of each frame
        const frameHeight = 64; // Adjust this to the actual height of each frame

        // Loop to extract frames from the single image
        for (let i = 0; i < 11; i++) {
            lasertowerFrames.push(new PIXI.Texture(
                textures.lasertower,
                new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight) // Extract frame
            ));
        }

        createMap(); // Now this will have access to app and the map dimensions
        setupUI();   // Ensure this function is defined elsewhere
    }
});

// Ensure createMap is defined, e.g.:
function createMap() {
    // Example of using mapWidth and mapHeight
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const tile = new PIXI.Sprite(textures.grass1); // Just an example
            tile.x = x * tileSize;
            tile.y = y * tileSize;
            app.stage.addChild(tile);
        }
    }
}

// Ensure setupUI is defined, e.g.:
function setupUI() {
    // UI setup code goes here
}
