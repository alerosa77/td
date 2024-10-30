// structures.js
const structureCosts = {
    powerplant: 50,
    extractor: 10,
    pylon: 3,
    lasertower: 20
};

function buildStructure(type, dnaText) {
    const cost = structureCosts[type];
    if (dnaUnits >= cost) {
        dnaUnits -= cost;
        updateDNADisplay(dnaText);
        if (type === 'lasertower') animateLaserTower();
    } else {
        console.log(`Not enough DNA Units for ${type}`);
    }
}

function animateLaserTower() {
    const laserTower = new PIXI.AnimatedSprite([
        textures['lasertower_frame1'],
        textures['lasertower_frame11'],
        // Add additional laser tower frames here
    ]);
    laserTower.animationSpeed = 0.1;
    laserTower.play();
}
