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
const textures = {};
let dnaUnits = 100;

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
    .add('pylon', 'buildings/pylon.png');

// Load laser tower frames dynamically
for (let i = 1; i <= 11; i++) {
    PIXI.Loader.shared.add(`lasertower_frame${i}`, `buildings/lasertower_frame${i}.png`);
}

PIXI.Loader.shared.load(setup);

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

    // Create an array to hold laser tower frames
    const lasertowerFrames = [];
    for (let i = 1; i <= 11; i++) {
        lasertowerFrames.push(resources[`lasertower_frame${i}`].texture);
    }

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

  
