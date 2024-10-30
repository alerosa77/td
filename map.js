function createMap() {
    const mapContainer = new PIXI.Container();
    app.stage.addChild(mapContainer);

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const tileType = getRandomTileType();
            const tileSprite = new PIXI.Sprite(textures[tileType]);
            tileSprite.x = (x - y) * (tileSize / 2);
            tileSprite.y = (x + y) * (tileSize / 4);
            tileSprite.width = tileSprite.height = tileSize;
            mapContainer.addChild(tileSprite);
        }
    }

    mapContainer.x = app.screen.width / 2;
    mapContainer.y = app.screen.height / 4;

    let dragging = false;
    let lastPosition = { x: 0, y: 0 };
    app.view.addEventListener('mousedown', (e) => { dragging = true; lastPosition = { x: e.clientX, y: e.clientY }; });
    app.view.addEventListener('mouseup', () => { dragging = false; });
    app.view.addEventListener('mousemove', (e) => {
        if (dragging) {
            const dx = e.clientX - lastPosition.x;
            const dy = e.clientY - lastPosition.y;
            mapContainer.x += dx;
            mapContainer.y += dy;
            lastPosition = { x: e.clientX, y: e.clientY };
        }
    });
}

function getRandomTileType() {
    const rand = Math.random() * 100;
    if (rand < 40) return 'grass1';
    if (rand < 70) return 'grass2';
    if (rand < 73) return 'dirt1';
    if (rand < 76) return 'dirt2';
    if (rand < 79) return 'flower1';
    if (rand < 81) return 'flower2';
    if (rand < 83) return 'rock1';
    if (rand < 86) return 'rock2';
    if (rand < 88) return 'wood1';
    if (rand < 90) return 'wood2';
    return 'resource';
}
