

let rangeMax;
let gridCount = 5;
let gridSize;

let xFunction;
let yFunction;
let zFunction;
let uRange;
let vRange;

let gridRange = {min:-gridCount, max:gridCount};
let circleRange = {min:0, max:2*Math.PI};


function setup() 
{ 
    createCanvas(800, 800, WEBGL);

    let cam = createEasyCam();
    cam.rotateY(PI/12);
    cam.rotateX(PI/6);
    document.oncontextmenu = function() { return false; }

    rangeMax = width/6.;
    gridSize = rangeMax/gridCount;

    console.log("rangeMax:" + rangeMax);

    xFunction = projectU;
    yFunction = projectV;
    zFunction = hyperbolicParaboloid;
    uRange = gridRange;
    vRange = gridRange;
} 

function draw(){
    background(0);
   
    initialTransformation();
    drawXYplane();
    drawAxes();
    drawSurface(zFunction);
}


function initialTransformation()
{
    rotateX(PI/2);
    rotateZ(PI/2);
    scale(1, -1, 1);
}


function drawAxes()
{
    strokeWeight(3);

    stroke(255);
    line(-rangeMax, 0, 0, 0, 0, 0);
    stroke(255, 0, 0);
    line(0, 0, 0, rangeMax, 0, 0);

    stroke(255);
    line(0, -rangeMax, 0, 0, 0, 0);
    stroke(0, 255, 0);
    line(0, 0, 0, 0, rangeMax, 0);

    stroke(255);
    line(0, 0, -rangeMax, 0, 0, 0);
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, rangeMax);
}

function drawXYplane()
{
    stroke(200, 200);
    for (let i=-gridCount; i<=gridCount; i++)
    {
        if (i==0) continue;
        let x = rangeMax * i / gridCount;
        line(x, -rangeMax, 0, x, rangeMax, 0);        
    }

    for (let i=-gridCount; i<=gridCount; i++)
    {
        if (i==0) continue;
        let y = rangeMax * i / gridCount;
        line(-rangeMax, y, 0, rangeMax, y, 0);        
    }
}


function hyperbolicParaboloid(x,y) {return (x*x - y*y);}

function ellipticParaboloid(x,y) {return (x*x + y*y);}

function projectU(u, v) {return u;}
function projectV(u, v) {return v;}

const torusA = 4;
const torusB = 1;

function torusX(u,v) {return (torusA + torusB*Math.cos(v))*Math.cos(u);}
function torusY(u,v) {return (torusA + torusB*Math.cos(v))*Math.sin(u);}
function torusZ(u,v) {return torusB*Math.sin(v);}

function indexIntoRange(i, n, range) { return range.min + i*(range.max-range.min)/n; }


function drawLineSegments(sampleCount, range, uFunction, vFunction, xFunction, yFunction, zFunction)
{
    let parameter = j => indexIntoRange(j, sampleCount, range);

    beginShape();
    for (let j=0; j<=sampleCount; j++)
    {
        let t = parameter(j);
        let u = uFunction(t);
        let v = vFunction(t);
        let x = xFunction(u, v)*gridSize;
        let y = yFunction(u, v)*gridSize;
        let z = zFunction(u, v)*gridSize;
        vertex(x, y, z);
    }
    endShape();
}


function drawSurface()
{
    stroke(0, 0, 255);
    strokeWeight(1);
    noFill();

    let sampleCount = 40;

    for (let i=0; i<=sampleCount; i++)
    {
        let u = indexIntoRange(i, sampleCount, uRange);
        let uFunction = t => u; // const
        let vFunction = t => t; // identity

        drawLineSegments(sampleCount, vRange, 
                         uFunction, vFunction, 
                         xFunction, yFunction, zFunction);
    }

    for (let i=0; i<=sampleCount; i++)
    {
        let v = indexIntoRange(i, sampleCount, vRange);
        let vFunction = t => v; // const
        let uFunction = t => t; // identity

        drawLineSegments(sampleCount, uRange, 
                         uFunction, vFunction, 
                         xFunction, yFunction, zFunction);
    }
}


function keyPressed()
{
    if (key == 'h')
    {
        xFunction = projectU;
        yFunction = projectV;
        zFunction = hyperbolicParaboloid;
        uRange = vRange = gridRange;
    }
    else if (key == 'e')
    {
        xFunction = projectU;
        yFunction = projectV;
        zFunction = ellipticParaboloid;
        uRange = vRange = gridRange;
    }
    else if (key == 't')
    {
        xFunction = torusX;
        yFunction = torusY;
        zFunction = torusZ;
        uRange = circleRange;
        vRange = circleRange;
    }
}


