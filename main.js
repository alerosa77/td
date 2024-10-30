// Create a PixiJS application
const app = new PIXI.Application({
    width: 800,  // Set the width of the canvas
    height: 600, // Set the height of the canvas
    backgroundColor: 0xAAAAAA // Set the background color
});

// Add the canvas to the HTML body
document.body.appendChild(app.view);

// Create a new graphics object
const graphics = new PIXI.Graphics();

// Set the fill color
graphics.beginFill(0xFF0000); // Red color
// Draw a rectangle
graphics.drawRect(100, 100, 200, 150); // (x, y, width, height)
// End the fill
graphics.endFill();

// Add the graphics object to the stage
app.stage.addChild(graphics);
