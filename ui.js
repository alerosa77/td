function setupUI() {
    createDNAUnitsDisplay(); // Create DNA Units display
    createBuildingButtons(); // Create building buttons
}

function createDNAUnitsDisplay() {
    const dnaUnitsText = new PIXI.Text(`DNA Units: ${dnaUnits}`, {
        fontFamily: 'Saira Light',
        fontSize: 36,
        fill: 0xffffff,
    });
    dnaUnitsText.anchor.set(0.5);
    dnaUnitsText.position.set(app.screen.width / 2, 30); // Center top of the screen
    app.stage.addChild(dnaUnitsText);

    // Update the text dynamically if DNA units change
    const updateDNAUnits = () => {
        dnaUnitsText.text = `DNA Units: ${dnaUnits}`;
    };

    // Return the function to update the display
    return updateDNAUnits;
}

function createBuildingButtons() {
    const buttonContainer = new PIXI.Container();
    app.stage.addChild(buttonContainer);

    const buildingTypes = ['Power Plant', 'Extractor', 'Pylon', 'Laser Tower'];

    buildingTypes.forEach((buildingType, index) => {
        const buttonWidth = 200;
        const buttonHeight = 50;

        // Create a rounded rectangle for the button background
        const buttonBackground = new PIXI.Graphics();
        buttonBackground.beginFill(0x333333, 0.5); // Dark gray with 50% transparency
        buttonBackground.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 10); // Rounded corners
        buttonBackground.endFill();
        buttonBackground.y = 100 + index * (buttonHeight + 10); // Spacing between buttons
        buttonContainer.addChild(buttonBackground);

        // Create button text
        const buttonText = new PIXI.Text(buildingType, {
            fontFamily: 'Saira Light',
            fontSize: 24,
            fill: 0xffffff,
        });
        buttonText.anchor.set(0.5);
        buttonText.x = buttonWidth / 2; // Center text horizontally
        buttonText.y = buttonHeight / 2; // Center text vertically
        buttonBackground.addChild(buttonText); // Add text to button background

        // Make button interactive
        buttonBackground.interactive = true;
        buttonBackground.buttonMode = true;
        buttonBackground.on('pointerdown', () => {
            currentBuilding = buildingType;
            isPlacingBuilding = true; // Set placing mode
            alert(`Selected: ${buildingType}`);
        });
    });
}
