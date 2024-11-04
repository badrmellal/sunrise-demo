
// Made by Badr Mellal, visit my portfolio below
// https://badr-mellal.com

var groundHeight;
var mountain1;
var mountain2;
var tree;
var moon;
var sun;
var clouds = [{}, {}, {}];
var birds = [];  // Adding birds for more life

function setup() {
    createCanvas(800, 600);
    groundHeight = (height / 3) * 2;

    mountain1 = {
        x: 400,
        y: groundHeight,
        height: 320,
        width: 260
    };
    mountain2 = {
        x: 580,
        y: groundHeight,
        height: 220,
        width: 180
    };

    tree = {
        x: 150,
        y: groundHeight + 20,
        trunkWidth: 30,
        trunkHeight: 140,
        canopyWidth: 120,
        canopyHeight: 100
    };

    sun = {
        x: 150,
        y: 100,
        diameter: 85
    };

    moon = {
        x: 650,
        y: 100,
        diameter: 75
    };

    clouds[0] = {
        x: 100,
        y: 120,
        size: 50,
        speed: 0.3
    };
    clouds[1] = {
        x: 130,  // Overlapping with first cloud
        y: 115,  // Slightly higher
        size: 70,
        speed: 0.3
    };
    clouds[2] = {
        x: 160,  // Overlapping with middle cloud
        y: 120,
        size: 50,
        speed: 0.3
    };

    // Initializing birds
    for (let i = 0; i < 5; i++) {
        birds.push({
            x: random(width),
            y: random(height/3),
            speed: random(1, 2),
            size: random(8, 12)
        });
    }
}

function draw() {
    let timeOfDay = map(mouseX, 0, width, 0, 1);
    
    // Enhancing sky colors with more natural transition
    let skyColorDay = color(135, 206, 235);
    let skyColorNight = color(25, 25, 112);
    let currentSkyColor = lerpColor(skyColorDay, skyColorNight, timeOfDay);
    background(currentSkyColor);

    // Drawing birds during day
    if (timeOfDay < 0.5) {
        drawBirds(timeOfDay);
    }

    // Drawing connected clouds with fade out at night
    drawClouds(timeOfDay);

    // Drawing sun
    if (timeOfDay < 0.5) {
        let sunOpacity = map(timeOfDay, 0, 0.5, 255, 0);
        fill(255, 255, 0, sunOpacity);
        ellipse(sun.x, sun.y, sun.diameter);
        
        // Adding simple sun glow during day
        let glowOpacity = map(timeOfDay, 0, 0.5, 50, 0);
        fill(255, 255, 200, glowOpacity);
        ellipse(sun.x, sun.y, sun.diameter * 1.2);
    }

    // Enhancing moon with subtle details
    if (timeOfDay > 0.3) {
        let moonBrightness = map(timeOfDay, 0.3, 1, 150, 255);
        if (timeOfDay < 0.5) {
            fill(currentSkyColor);
        } else {
            fill(moonBrightness);
            // Adding subtle moon glow at night
            let glowOpacity = map(timeOfDay, 0.5, 1, 0, 30);
            fill(255, 255, 255, glowOpacity);
            ellipse(moon.x, moon.y, moon.diameter * 1.3);
            fill(moonBrightness);
        }
        ellipse(moon.x, moon.y, moon.diameter);
    }

    // Enhancing ground with subtle gradient
    let groundColorDay = color(126, 200, 80);
    let groundColorNight = color(40, 100, 40);
    let currentGroundColor = lerpColor(groundColorDay, groundColorNight, timeOfDay);
    fill(currentGroundColor);
    rect(0, groundHeight, width, height - groundHeight);

    drawGrass(timeOfDay);

    drawMountains(timeOfDay);

    drawTree(timeOfDay);

    // Night overlay with smoother transition
    fill(0, 0, 20, map(timeOfDay, 0.3, 1, 0, 160));
    rect(0, 0, width, height);
}

function drawClouds(timeOfDay) {
    noStroke();
    let cloudOpacity = map(timeOfDay, 0, 1, 255, 100);
    fill(255, cloudOpacity);
    
    // Moving all clouds together as one formation
    for (let cloud of clouds) {
        cloud.x += cloud.speed;
        if (cloud.x > width + 100) { 
            cloud.x = -100;
        }
    }

    for (let cloud of clouds) {
        ellipse(cloud.x, cloud.y, cloud.size);
        ellipse(cloud.x - cloud.size/4, cloud.y + 5, cloud.size/2);
        ellipse(cloud.x + cloud.size/4, cloud.y + 5, cloud.size/2);
    }
}

function drawBirds(timeOfDay) {
    let birdOpacity = map(timeOfDay, 0, 0.5, 255, 0);
    stroke(0, birdOpacity);
    strokeWeight(2);
    
    for (let bird of birds) {
        bird.x += bird.speed;
        if (bird.x > width) {
            bird.x = -20;
            bird.y = random(height/3);
        }
        
        // Simple bird shape
        beginShape();
        vertex(bird.x, bird.y);
        vertex(bird.x - bird.size/2, bird.y - bird.size/2);
        vertex(bird.x - bird.size, bird.y);
        endShape();
    }
    noStroke();
}

function drawGrass(timeOfDay) {
    let grassColorDay = color(106, 190, 70);
    let grassColorNight = color(30, 90, 30);
    let currentGrassColor = lerpColor(grassColorDay, grassColorNight, timeOfDay);
    
    for (let i = 0; i < width; i += 20) {
        fill(currentGrassColor);
        rect(i, groundHeight, 2, -random(5, 15));
    }
}

function drawMountains(timeOfDay) {
    let mountainColorDay = color(128, 128, 128);
    let mountainColorNight = color(60, 60, 60);
    let currentMountainColor = lerpColor(mountainColorDay, mountainColorNight, timeOfDay);
    fill(currentMountainColor);
    
    // First mountain with snow cap
    triangle(mountain1.x, mountain1.y,
            mountain1.x + mountain1.width, mountain1.y,
            mountain1.x + (mountain1.width / 2), mountain1.y - mountain1.height);
            
    // Snow cap
    fill(255, map(timeOfDay, 0, 1, 255, 150));
    triangle(
        mountain1.x + mountain1.width * 0.35, mountain1.y - mountain1.height * 0.7,
        mountain1.x + mountain1.width * 0.65, mountain1.y - mountain1.height * 0.7,
        mountain1.x + mountain1.width * 0.5, mountain1.y - mountain1.height
    );

    // Second mountain
    fill(currentMountainColor);
    triangle(mountain2.x, mountain2.y,
            mountain2.x + mountain2.width, mountain2.y,
            mountain2.x + (mountain2.width / 2), mountain2.y - mountain2.height);
}

function drawTree(timeOfDay) {
    let trunkColorDay = color(139, 69, 19);
    let trunkColorNight = color(69, 35, 10);
    let currentTrunkColor = lerpColor(trunkColorDay, trunkColorNight, timeOfDay);
    
    fill(0, 0, 0, 30);
    rect(tree.x - tree.trunkWidth/2 + 5, tree.y - tree.trunkHeight, 
         tree.trunkWidth, tree.trunkHeight);
         
    fill(currentTrunkColor);
    rect(tree.x - tree.trunkWidth/2, tree.y - tree.trunkHeight, 
         tree.trunkWidth, tree.trunkHeight);

    let leafColorDay = color(34, 139, 34);
    let leafColorNight = color(17, 70, 17);
    let currentLeafColor = lerpColor(leafColorDay, leafColorNight, timeOfDay);
    fill(currentLeafColor);
    
    triangle(
        tree.x - tree.canopyWidth/2,
        tree.y - tree.trunkHeight,
        tree.x + tree.canopyWidth/2,
        tree.y - tree.trunkHeight,
        tree.x,
        tree.y - tree.trunkHeight - tree.canopyHeight
    );
    
    triangle(
        tree.x - tree.canopyWidth/2 * 0.8,
        tree.y - tree.trunkHeight - tree.canopyHeight/2,
        tree.x + tree.canopyWidth/2 * 0.8,
        tree.y - tree.trunkHeight - tree.canopyHeight/2,
        tree.x,
        tree.y - tree.trunkHeight - tree.canopyHeight * 1.5
    );
}
