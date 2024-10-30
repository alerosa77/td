const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

const tileSize = 64; // Tile size in pixels
const mapWidth = 50; // Number of tiles horizontally
const mapHeight = 50; // Number of tiles vertically

const textures = {}; // To store textures for different tile types

// Load the textures
PIXI.Loader.shared
  .add('grass1', 'tileset/grass1.png')
  .add('grass2', 'tileset/grass2.png')
  .add('dirt1', 'tileset/dirt1.png')
  .add('dirt2', 'tileset/dirt2.png')
  .add('flower1', 'tileset/flower1.png')
  .add('flower2', 'tileset/flower2.png')
  .add('rocks1', 'tileset/rocks1.png')
  .add('rocks2', 'tileset/rocks2.png')
  .add('wood1', 'tileset/wood1.png')
  .add('wood2', 'tileset/wood2.png')
  .add('resource', 'tileset/resource.png')
  .load(setup);

function setup(loader, resources) {
  textures.grass1 = resources.grass1.texture;
  textures.grass2 = resources.grass2.texture;
  textures.dirt1 = resources.dirt1.texture;
  textures.dirt2 = resources.dirt2.texture;
  textures.flower1 = resources.flower1.texture;
  textures.flower2 = resources.flower2.texture;
  textures.rocks1 = resources.rocks1.texture;
  textures.rocks2 = resources.rocks2.texture;
  textures.wood1 = resources.wood1.texture;
  textures.wood2 = resources.wood2.texture;
  textures.resource = resources.resource.texture;

  const mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);

  // Generate the map with given distribution
  const tiles = [];
  for (let y = 0; y < mapHeight; y++) {
    tiles[y] = [];
    for (let x = 0; x < mapWidth; x++) {
      const tileType = getRandomTileType();
      const tileSprite = new PIXI.Sprite(textures[tileType]);

      // Position the tile with isometric perspective
      tileSprite.x = (x - y) * (tileSize / 2);
      tileSprite.y = (x + y) * (tileSize / 4);
      tileSprite.width = tileSprite.height = tileSize;

      mapContainer.addChild(tileSprite);
      tiles[y][x] = tileSprite;
    }
  }

  // Center the map initially
  mapContainer.x = app.screen.width / 2;
  mapContainer.y = app.screen.height / 4;

  // Enable panning by dragging
  let dragging = false;
  let lastPosition = { x: 0, y: 0 };

  app.view.addEventListener('mousedown', (e) => {
    dragging = true;
    lastPosition = { x: e.clientX, y: e.clientY };
  });

  app.view.addEventListener('mouseup', () => {
    dragging = false;
  });

  app.view.addEventListener('mousemove', (e) => {
    if (dragging) {
      const dx = e.clientX - lastPosition.x;
      const dy = e.clientY - lastPosition.y;
      mapContainer.x += dx;
      mapContainer.y += dy;
      lastPosition = { x: e.clientX, y: e.clientY };
    }
  });

  function getRandomTileType() {
    const rand = Math.random() * 100;
    if (rand < 30) return 'grass1';
    if (rand < 50) return 'grass2';
    if (rand < 55) return 'dirt1';
    if (rand < 60) return 'dirt2';
    if (rand < 65) return 'flower1';
    if (rand < 70) return 'flower2';
    if (rand < 75) return 'rocks1';
    if (rand < 80) return 'rocks2';
    if (rand < 85) return 'wood1';
    if (rand < 90) return 'wood2';
    return 'resource'; // Resource tiles ~10%
  }
}
