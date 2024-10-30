function setupUI() {
    const buttonContainer = new PIXI.Container();
    app.stage.addChild(buttonContainer);

    const buttonNames = ['Power Plant', 'Extractor', 'Pylon', 'Laser Tower'];
    buttonNames.forEach((name, index) => {
        const button = new PIXI.Graphics();
        button.beginFill(0x808080, 0.5); // Dark gray with 50% transparency
        button.drawRoundedRect(100, 100 + index * 60, 200, 50, 10); // Rounded rectangle
        button.endFill();
        button.interactive = true;
        button.buttonMode = true;

        const buttonText = new PIXI.Text(name, { fontFamily: 'Saira Light', fontSize: 24, fill: 0xFFFFFF });
        buttonText.anchor.set(0.5);
        buttonText.x = 200;
        buttonText.y = 125 + index * 60; // Center the text vertically
        button.addChild(buttonText);

        button.on('pointerdown', () => {
            onBuildingButtonClick(name);
        });

        buttonContainer.addChild(button);
    });
}

function onBuildingButtonClick(buildingName) {
    // Set the current building and update the cursor
    currentBuilding = buildingName;
    isPlacingBuilding = true; // Enable placing mode

    // Change the cursor to the building sprite at 50% transparency
    const cursorSprite = new PIXI.Sprite(textures[buildingName.toLowerCase().replace(' ', '')]); // Use building name to get texture
    cursorSprite.scale.set(0.0128, 0.0128); // Scale down the cursor to tile size
    cursorSprite.alpha = 0.5; // Set to 50% transparency
    app.stage.addChild(cursorSprite);

    // Update mouse move event to track placement
    app.view.on('mousemove', (e) => {
        const mousePos = e.data.getLocalPosition(app.stage);
        cursorSprite.x = mousePos.x - cursorSprite.width / 2; // Center the cursor sprite
        cursorSprite.y = mousePos.y - cursorSprite.height / 2; // Center the cursor sprite
    });

    // Reset the cursor on pointer up
    app.view.on('pointerup', () => {
        app.stage.removeChild(cursorSprite);
        app.view.off('mousemove'); // Remove mouse move event
        isPlacingBuilding = false; // Disable placing mode
    });
}
