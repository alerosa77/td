// ui.js
let selectedBuilding = null; // Variable to track the selected building type

function setupUI() {
    const uiContainer = new PIXI.Container();
    app.stage.addChild(uiContainer);

    // Create DNA Units display
    const dnaText = new PIXI.Text(`DNA Units: ${getDnaUnits()}`, {
        fontFamily: 'Saira Light',
        fontSize: 24,
        fill: 0xffffff
    });
    dnaText.x = 10;
    dnaText.y = 10;
    uiContainer.addChild(dnaText);

    // Create buttons
    const buttonNames = ["Power Plant", "Extractor", "Pylon", "Laser Tower"];
    const buttonWidth = 180; // Adjusted button width
    const buttonHeight = 50; // Button height
    const buttonSpacing = 30; // Space between buttons
    const buttonContainer = new PIXI.Container();
    buttonContainer.y = app.view.height - buttonHeight - 10; // Positioning at the bottom

    buttonNames.forEach((name, index) => {
        const button = new PIXI.Graphics();
        button.beginFill(0xcccccc, 0.3); // Light gray with 30% transparency
        button.drawRect(0, 0, buttonWidth, buttonHeight);
        button.endFill();
        button.x = index * (buttonWidth + buttonSpacing);
        button.interactive = true;
        button.buttonMode = true;

        button.on('pointerdown', () => {
            selectedBuilding = name; // Set the selected building
            updateCursor(); // Change the cursor to the building sprite
        });

        const buttonText = new PIXI.Text(name, {
            fontFamily: 'Saira Light',
            fontSize: 18,
            fill: 0x000000
        });
        buttonText.x = button.x + buttonWidth / 2 - buttonText.width / 2;
        buttonText.y = button.y + buttonHeight / 2 - buttonText.height / 2;

        buttonContainer.addChild(button);
        buttonContainer.addChild(buttonText);
    });

    uiContainer.addChild(buttonContainer);

    // Add a listener for clicks to place buildings
    app.stage.interactive = true;
    app.stage.on('pointerdown', (event) => {
        if (selectedBuilding) {
            const position = event.data.getLocalPosition(app.stage);
            const tileX = Math.floor(position.x / tileSize);
            const tileY = Math.floor(position.y / tileSize);
            
            // Check if the user has enough DNA Units
            if (canAffordBuilding(selectedBuilding)) {
                placeBuilding(selectedBuilding, tileX, tileY);
                subtractDnaUnits(getBuildingCost(selectedBuilding)); // Deduct DNA Units based on the building
                updateDnaDisplay(dnaText); // Update the displayed DNA Units
            }
        }
    });
}

// Function to update the DNA units display
function updateDnaDisplay(dnaText) {
    dnaText.text = `DNA Units: ${getDnaUnits()}`;
}

// Function to update the cursor to show selected building
function updateCursor() {
    if (selectedBuilding) {
        const cursorTexture = textures[selectedBuilding.toLowerCase().replace(' ', '')]; // Assume naming is consistent
        app.renderer.plugins.interaction.cursorStyles['pointer'] = cursorTexture; // Set custom cursor style
    }
}
