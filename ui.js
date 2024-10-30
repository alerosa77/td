function setupUI() {
    // Create UI elements (buttons, menus, etc.) here
    createBuildingButtons();
}

function createBuildingButtons() {
    const buttonContainer = new PIXI.Container();
    app.stage.addChild(buttonContainer);

    const buildingTypes = ['Power Plant', 'Extractor', 'Pylon', 'Laser Tower'];

    buildingTypes.forEach((buildingType, index) => {
        const button = new PIXI.Text(buildingType, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        button.y = 10 + index * 30; // Spacing between buttons
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', () => {
            currentBuilding = buildingType;
            isPlacingBuilding = true; // Set placing mode
            alert(`Selected: ${buildingType}`);
        });
        buttonContainer.addChild(button);
    });
}
