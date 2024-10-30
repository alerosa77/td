// DNA Units display with Saira Light font
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
buttonContainer.x = app.screen.width / 2 - 200; // Adjust for centered position
app.stage.addChild(buttonContainer);

// Button configuration with new styles
const structures = ['Power Plant', 'Extractor', 'Pylon', 'Laser Tower'];
structures.forEach((structure, index) => {
    const button = new PIXI.Graphics();
    button.beginFill(0xaaaaaa, 0.7); // Lighter gray and 30% transparent
    button.drawRoundedRect(0, 0, 90, 50, 10); // Wider button
    button.endFill();
    button.x = index * 100; // More space between buttons

    // Button label
    const buttonText = new PIXI.Text(structure, {
        fontFamily: 'Saira Light',
        fontSize: 14,
        fill: 0xffffff
    });
    buttonText.anchor.set(0.5);
    buttonText.x = 45;
    buttonText.y = 25;
    button.addChild(buttonText);

    buttonContainer.addChild(button);
    button.interactive = true;
    button.buttonMode = true;

    // Handle build selection and preview
    button.on('pointerdown', () => selectStructure(structure.toLowerCase()));
});

// Preview sprite for selected structure
let previewSprite = null;

// Function to select and preview a structure before placing it
function selectStructure(type) {
    // Remove existing preview sprite if any
    if (previewSprite) {
        app.stage.removeChild(previewSprite);
        previewSprite = null;
    }

    const cost = structureCosts[type];
    if (dnaUnits >= cost) {
        // Create the transparent preview sprite
        previewSprite = new PIXI.Sprite(textures[type]);
        previewSprite.alpha = 0.5; // 50% transparent
        app.stage.addChild(previewSprite);

        // Track mouse movement for preview position
        app.view.addEventListener('mousemove', updatePreviewPosition);

        // Place structure on next click
        app.view.addEventListener('click', () => {
            if (dnaUnits >= cost) {
                placeStructure(type);
                dnaUnits -= cost;
                dnaText.text = `DNA Units: ${dnaUnits}`;
            }
            app.stage.removeChild(previewSprite);
            previewSprite = null;
            app.view.removeEventListener('mousemove', updatePreviewPosition);
        });
    }
}

// Update preview position based on mouse movement
function updatePreviewPosition(event) {
    if (previewSprite) {
        const pos = app.renderer.plugins.interaction.mouse.global;
        const tileX = Math.floor(pos.x / tileSize) * tileSize;
        const tileY = Math.floor(pos.y / tileSize) * tileSize;
        previewSprite.position.set(tileX, tileY);
    }
}

// Place structure function
function placeStructure(type) {
    const pos = app.renderer.plugins.interaction.mouse.global;
    const tileX = Math.floor(pos.x / tileSize) * tileSize;
    const tileY = Math.floor(pos.y / tileSize) * tileSize;

    const structureSprite = new PIXI.Sprite(textures[type]);
    structureSprite.x = tileX;
    structureSprite.y = tileY;
    structureSprite.width = tileSize;
    structureSprite.height = tileSize;

    app.stage.addChild(structureSprite);
}
