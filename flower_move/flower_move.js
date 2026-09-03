//
// flower_move.js
//


let flowers = [];


function setup() {
    createCanvas(800, 800);

    const count = 5;
    for (let i=0; i<count; i++) {
        const x = width/count * (i + .5);
        const y = 100;
        flowers.push(new Flower(x, y, width-x, height-y, String(i+1)));
    }
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


function keyPressed() {
    for (let f of flowers) f.move(); 
}


function draw() {
    background(0);

    for (let flower of flowers) {
        flower.display();

        if (flower.hover()) {
            textSize(30);
            fill(50, 100, 100, 1);
            text(flower.description, width/2, height/2);
        }
    }
}



class Flower {

    constructor(x1, y1, x2, y2, description) {
        this.position1 = createVector(x1, y1);
        this.position2 = createVector(x2, y2);
        this.description = description;

        this.t = 0;
        this.speed = .005;
        this.dt = 0;

        this.s = random(.25, 1);
        this.n = (int)(random(5, 10));
        colorMode(HSB, 100, 100, 100, 1);
        this.c = color(random(0, 100), random(0, 50), random(50, 100), random(.5, 1));
        this.angleOffset = 0;
        this.angleSpeed = random(-.02, .02);
    }

    display() {

        let c = this.hover() ? color(0, 100, 100, 1) : this.c;
        const position = this.position();
        drawFlower(position.x, position.y, this.s, this.n, c, this.angleOffset);
        this.angleOffset += this.angleSpeed;

        this.t += this.dt;
        
        if (this.t <= 0) {
            this.t = 0;
            this.dt = 0;
        }
        if (this.t >= 1) {
            this.t = 1;
            this.dt = 0;
        }
    }

    position() {
        return p5.Vector.lerp(this.position1, this.position2, this.t);
    }

    move() {
        if (this.dt == 0) {
            if (this.t == 1) 
                this.dt = -this.speed;
            if (this.t == 0) 
                this.dt = this.speed;
        }
    }

    hover() {
        const radius = 150 * this.s;
        const position = this.position();
        return dist(mouseX, mouseY, position.x, position.y) < radius;
    }
}



