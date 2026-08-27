//
// flower.js
//


let flowers = [];


function setup() {
    createCanvas(800, 800);
}


function drawFlower(cx, cy, s, n, c) {

    fill(c);

    push();
    translate(cx, cy);
    scale(s);

    for (let i=0; i<n; i++) {
        push();
        const angle = 2*PI * i / n;
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
    flowers.push(new Flower(this, mouseX, mouseY));
}


function draw() {
    background(0);

    for (let flower of flowers)
        flower.display();
}



class Flower {
    constructor(p, cx, cy) {
        this.p = p;
        this.cx = cx;
        this.cy = cy;
        this.s = p.random(.25, 1);
        this.n = (int)(p.random(5, 10));
        p.colorMode(p.HSB);
        this.c = p.color(p.random(0, 100), random(0, 50), random(50, 100));
    }

    display() {
        drawFlower(this.cx, this.cy, this.s, this.n, this.c);
    }
}



