function init() {
    // Setup the application and other components
    setupUI();
    createMap();
    loadSkybox(); // Load the skybox
}

// Function to handle the building placement logic
function placeBuilding() {
    if (!isPlacingBuilding || !currentBuilding || !canAffordBuilding(currentBuilding)) return;

    const mousePos = app.renderer.plugins.interaction.mouse.global;
    const tileX = Math.floor(mousePos.x / tileSize);
    const tileY = Math.floor(mousePos.y / tileSize);

    // Check if the tile is valid for placement
    if (isTilePlaceable(tileX, tileY)) {
        // Create the building sprite and add it to the map
        const buildingSprite = new PIXI.Sprite(textures[currentBuilding.toLowerCase().replace(' ', '')]);
        buildingSprite.x = tileX * tileSize;
        buildingSprite.y = tileY * tileSize;
        buildingSprite.width = tileSize;
        buildingSprite.height = tileSize;

        app.stage.addChild(buildingSprite);
        
        // Deduct the cost of the building
        deductCost(currentBuilding); // Use the deductCost function from dna.js
    }
}

// Call the init function to start everything
init();

// Listen for the `pointerup` event globally
app.view.on('pointerup', placeBuilding);

let skybox; // Declare a variable for the skybox

function loadSkybox() {
    const skyboxTexture = PIXI.Texture.from('buildings/skybox.png'); // Load the skybox texture
    skybox = new PIXI.Sprite(skyboxTexture);
    skybox.width = app.screen.width; // Set the width to match the screen
    skybox.height = app.screen.height; // Set the height to match the screen
    skybox.zIndex = -1; // Ensure it is behind all other elements
    app.stage.addChild(skybox);

    // Create an animation loop to pan the skybox
    app.ticker.add(() => {
        skybox.x -= 0.05; // Move skybox left at 5% speed
        if (skybox.x < -skybox.width) {
            skybox.x = 0; // Reset position when it goes off screen
        }
    });
}
