//
// flower.js
//


let flowers = [];


function setup() {
    createCanvas(800, 800);
}


function drawFlower(cx, cy, s, n, c, angleOffset) {

    fill(c);

    push();
    translate(cx, cy);
    scale(s);

    for (let i=0; i<n; i++) {
        push();
        const angle = 2*PI * i / n + angleOffset;
        rotate(angle);
        translate(70, 0);
        ellipse(0, 0, 100, 50);
        pop();
    }

    fill(255);
    ellipse(0, 0, 50, 50);

    pop();
}


function mousePressed() {
    flowers.push(new Flower(mouseX, mouseY));
}


function draw() {
    background(0);

    for (let flower of flowers)
        flower.display();
}



class Flower {
    constructor(cx, cy) {
        this.position = createVector(cx, cy);
        this.velocity = createVector(random(-5, 5), random(-5, 5));
        this.s = random(.25, 1);
        this.n = (int)(random(5, 10));
        colorMode(HSB);
        this.c = color(random(0, 100), random(0, 50), random(50, 100));
        this.angleOffset = 0;
        this.angleSpeed = random(-.02, .02);
    }

    display() {
        drawFlower(this.position.x, this.position.y, this.s, this.n, this.c, this.angleOffset);
        this.angleOffset += this.angleSpeed;
        this.position.add(this.velocity);

        if (this.position.x < 0 || this.position.x > width)
            this.velocity.x *= -1;

        if (this.position.y < 0 || this.position.y > height)
            this.velocity.y *= -1;
    }
}



