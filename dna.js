// dna.js
let dnaUnits = 100; // Initial DNA Units

function getDnaUnits() {
    return dnaUnits;
}

function addDnaUnits(amount) {
    dnaUnits += amount;
    console.log(`Added DNA Units: ${amount}. Total: ${dnaUnits}`);
}

function subtractDnaUnits(amount) {
    if (amount <= dnaUnits) {
        dnaUnits -= amount;
        console.log(`Subtracted DNA Units: ${amount}. Total: ${dnaUnits}`);
        return true; // Successfully subtracted
    }
    console.log(`Not enough DNA Units to subtract: ${amount}. Total: ${dnaUnits}`);
    return false; // Not enough units
}

function canAffordBuilding(building) {
    return getBuildingCost(building) <= dnaUnits;
}
