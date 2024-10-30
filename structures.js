function placeBuilding(buildingType, tileX, tileY) {
    if (canAffordBuilding(buildingType)) {
        const buildingSprite = new PIXI.Sprite(textures[buildingType.toLowerCase().replace(' ', '')]);
        buildingSprite.x = tileX * tileSize;
        buildingSprite.y = tileY * tileSize;
        app.stage.addChild(buildingSprite);
        deductCost(buildingType); // Deduct the cost from DNA Units
    } else {
        alert("Not enough DNA Units!");
    }
}
