
// ========================================
// ROTATING WINDMILL BLADES
// Math-Based Animation using p5.js
// ========================================

// Windmill position
let centerX;
let centerY;

// Windmill dimensions
let bladeLength = 110;

// Rotation variables
let rotationAngle = 0;
let rotationSpeed = 0.025;

// Animation control
let isPaused = false;


// ========================================
// SETUP
// ========================================

function setup() {

    // Create the animation canvas
    let canvas = createCanvas(700, 500);

    // Place the canvas inside the HTML container
    canvas.parent("canvas-container");

    // Set the windmill center
    centerX = width / 2;
    centerY = 190;

    // Use radians for rotation
    angleMode(RADIANS);
}


// ========================================
// DRAW
// ========================================

function draw() {

    // Sky background
    background(135, 206, 235);

    // Draw the sun
    drawSun();

    // Draw the ground
    drawGround();

    // Draw the windmill tower
    drawTower();

    // Draw the rotating blades
    drawBlades();

    // Draw the center of the windmill
    drawHub();

    // Draw control instructions
    drawInstructions();

    // Update rotation angle
    if (!isPaused) {
        rotationAngle += rotationSpeed;
    }
}


// ========================================
// SUN
// ========================================

function drawSun() {

    noStroke();
    fill(255, 220, 70);

    circle(590, 80, 75);
}


// ========================================
// GROUND
// ========================================

function drawGround() {

    noStroke();
    fill(80, 170, 90);

    rect(0, 350, width, 150);
}


// ========================================
// WINDMILL TOWER
// ========================================

function drawTower() {

    noStroke();

    // Tower body
    fill(235, 225, 195);

    quad(
        centerX - 22, centerY + 5,
        centerX + 22, centerY + 5,
        centerX + 65, 350,
        centerX - 65, 350
    );

    // Tower roof
    fill(150, 70, 50);

    triangle(
        centerX - 30, centerY + 5,
        centerX + 30, centerY + 5,
        centerX, centerY - 35
    );
}


// ========================================
// WINDMILL BLADES
// ========================================

function drawBlades() {

    // Save the current drawing settings
    push();

    // Move the origin to the windmill center
    translate(centerX, centerY);

    // Rotate the entire blade system
    rotate(rotationAngle);

    // Draw four blades
    for (let bladeNumber = 0; bladeNumber < 4; bladeNumber++) {

        // Each blade is separated by 90 degrees
        let bladeAngle = bladeNumber * HALF_PI;

        // Save the current drawing settings
        push();

        // Rotate each blade into its position
        rotate(bladeAngle);

        // Blade appearance
        fill(245, 245, 245);
        stroke(70, 70, 70);
        strokeWeight(2);

        // Draw the blade shape
        beginShape();

        vertex(0, 0);
        vertex(15, -bladeLength * 0.25);
        vertex(12, -bladeLength);
        vertex(-12, -bladeLength);
        vertex(-15, -bladeLength * 0.25);

        endShape(CLOSE);

        // Restore the previous drawing settings
        pop();
    }

    // Restore the original drawing settings
    pop();
}


// ========================================
// CENTER HUB
// ========================================

function drawHub() {

    noStroke();

    fill(80, 80, 80);

    circle(centerX, centerY, 35);

    fill(220);

    circle(centerX, centerY, 15);
}


// ========================================
// CONTROL INSTRUCTIONS
// ========================================

function drawInstructions() {

    fill(255);
    noStroke();

    textAlign(CENTER);
    textSize(15);

    text("P: Pause / Resume", width / 2, 405);
    text("I: Increase Speed | D: Decrease Speed", width / 2, 430);
    text("R: Reset Animation", width / 2, 455);

    // Display current speed
    text("Rotation Speed: " + rotationSpeed.toFixed(3), width / 2, 480);
}


// ========================================
// KEYBOARD CONTROLS
// ========================================

function keyPressed() {

    // Pause or resume
    if (key === 'p' || key === 'P') {
        isPaused = !isPaused;
    }

    // Increase rotation speed
    if (key === 'i' || key === 'I   ') {    
        rotationSpeed += 0.005;
    }

    // Decrease rotation speed
    if (key === 'd' || key === 'D') {

        rotationSpeed -= 0.005;

        // Prevent negative rotation speed
        rotationSpeed = max(0, rotationSpeed);
    }

    // Reset animation
    if (key === 'r' || key === 'R') {

        rotationAngle = 0;
        rotationSpeed = 0.025;
        isPaused = false;
    }
}
