// ui.js
function setupUI() {
    const dnaText = new PIXI.Text(`DNA Units: ${dnaUnits}`, {
        fontFamily: 'Saira Light',
        fontSize: 24,
        fill: 0xffffff
    });
    dnaText.anchor.set(0.5, 0);
    dnaText.x = app.screen.width / 2;
    dnaText.y = 10;
    app.stage.addChild(dnaText);

    const buttonContainer = new PIXI.Container();
    buttonContainer.y = app.screen.height - 70;
    buttonContainer.x = app.screen.width / 2 - 150;
    app.stage.addChild(buttonContainer);

    const structures = ['powerplant', 'extractor', 'pylon', 'lasertower'];
    structures.forEach((structure, index) => {
        const button = new PIXI.Graphics();
        button.beginFill(0x666666);
        button.drawRoundedRect(0, 0, 70, 50, 10);
        button.endFill();
        button.x = index * 80;

        const buttonText = new PIXI.Text(structure, {
            fontFamily: 'Saira Light',
            fontSize: 12,
            fill: 0xffffff
        });
        buttonText.anchor.set(0.5);
        buttonText.x = 35;
        buttonText.y = 25;
        button.addChild(buttonText);

        buttonContainer.addChild(button);
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', () => buildStructure(structure, dnaText));
    });
}
