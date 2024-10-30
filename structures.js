function placeBuilding(x, y) {
    if (isPlacingBuilding && currentBuilding && dnaUnits > 0) {
        let buildingSprite;

        switch (currentBuilding) {
            case 'Power Plant':
                buildingSprite = new PIXI.Sprite(textures.powerplant);
                buildingSprite.scale.set(0.0128, 0.0128); // Scale to match tile size
                break;
            case 'Extractor':
                buildingSprite = new PIXI.Sprite(textures.extractor);
                buildingSprite.scale.set(1, 1); // Assuming already tile size
                break;
            case 'Pylon':
                buildingSprite = new PIXI.Sprite(textures.pylon);
                buildingSprite.scale.set(1, 1); // Assuming already tile size
                break;
            case 'Laser Tower':
                buildingSprite = new PIXI.Sprite(textures.lasertower);
                buildingSprite.scale.set(1, 1); // Assuming already tile size
                break;
        }

        // Set the position of the building based on the clicked tile
        buildingSprite.x = x;
        buildingSprite.y = y;

        // Add the building to the stage
        app.stage.addChild(buildingSprite);

        // Deduct DNA units
        dnaUnits -= getBuildingCost(currentBuilding); // Assuming you have a function to get the cost
        isPlacingBuilding = false; // Reset placing mode
        currentBuilding = null; // Clear current building selection
    }
}
