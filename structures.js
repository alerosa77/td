function placeBuilding(x, y) {
    // Check if the current building is set and DNA units are available
    if (isPlacingBuilding && currentBuilding && dnaUnits > 0) {
        let buildingSprite;

        // Create the building based on the selected type
        switch (currentBuilding) {
            case 'Power Plant':
                buildingSprite = new PIXI.Sprite(textures.powerplant);
                buildingSprite.scale.set(1, 1); // Scale to match the tile size
                break;
            case 'Extractor':
                buildingSprite = new PIXI.Sprite(textures.extractor);
                buildingSprite.scale.set(1, 1); // Scale to match the tile size
                break;
            case 'Pylon':
                buildingSprite = new PIXI.Sprite(textures.pylon);
                buildingSprite.scale.set(1, 1); // Scale to match the tile size
                break;
            case 'Laser Tower':
                buildingSprite = new PIXI.Sprite(textures.lasertower);
                buildingSprite.scale.set(1, 1); // Scale to match the tile size
                break;
        }

        // Set the position of the building
        buildingSprite.x = x;
        buildingSprite.y = y;

        // Add the building to the stage
        app.stage.addChild(buildingSprite);

        // Deduct DNA units
        dnaUnits -= getBuildingCost(currentBuilding); // Assume you have a function to get the cost
        isPlacingBuilding = false; // Reset placing mode
        currentBuilding = null; // Clear current building selection
    }
}
