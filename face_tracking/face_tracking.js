//
// Face Tracking
//

// original example from Kyle Mcdonald:
// https://kylemcdonald.github.io/cv-examples/


let capture;
let tracker
let w = 640; 
let h = 480;


let showPoints = false;
let showVideo = false;
let showShapes = true;

let ec;


function setup() 
{
    createCanvas(w, h);

    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });

    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    capture.hide();

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);

    initializeEmotion();
}


function initializeEmotion()
{
    // from clmtracker example clm_emotiondetection.html

    /*
    // set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
    pModel.shapeModel.nonRegularizedVectors.push(9);
    pModel.shapeModel.nonRegularizedVectors.push(11);
    */

    delete emotionModel['disgusted'];
    delete emotionModel['fear'];

    ec = new emotionClassifier();
    ec.init(emotionModel);
}



function drawAllPoints(positions)
{
    colorMode(HSB);
    noFill();
    stroke(255);
    strokeWeight(1);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }
    colorMode(RGB);
}


function drawPoly(positions, begin, end)
{
    beginShape();
    for (let i=begin; i<end; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape(CLOSE);
}


function drawText()
{
    fill(0);
    noStroke();
    rect(0, 0, 150, 100);
    fill(255);
    text("s: show shapes", 25, 25);
    text("p: show points", 25, 50);
    text("v: show video", 25, 75);
}

function draw() 
{
    background(0);

    if (showVideo)
        image(capture, 0, 0, w, h);

    drawText();

    let positions = tracker.getCurrentPosition();
    if (!positions || positions.length === 0) return;

    if (showPoints)
        drawAllPoints(positions);

    if (showShapes)
        drawShapes(positions);

    if (ec)
    {
        let cp = tracker.getCurrentParameters();
        let emotionArray = ec.meanPredict(cp);

        if (emotionArray) {
            noStroke();
            fill(0);
            rect(width-125, 0, 150, 150);
            fill(255);
            let x = width-100;
            let y = 0;

            let maxEmotion = "";
            let maxValue = 0;

            for (let i=0; i<4; i++)
            {
                let em = emotionArray[i];
                let value = em.value.toFixed(2);
                text(em.emotion + " " + value, x, y+=25);

                if (em.value > maxValue)
                {
                    maxEmotion = em.emotion;
                    maxValue = em.value;
                }
            }

            text(maxEmotion, x, y+=25);
        }
    }
}


function drawShapes(positions)
{
    // right eyebrow: 19-22

    fill(0, 255, 0);
    stroke(0, 255, 0);
    drawPoly(positions, 19, 23);

    // left eyebrow: 15-18

    fill(0, 255, 0);
    stroke(0, 255, 0);
    drawPoly(positions, 15, 19);

    // right eye: 23-26

    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 23, 27);

    // left eye: 28-31

    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 28, 32);

    // nose: 62

    noStroke();
    fill(255, 0, 0);
    ellipse(positions[62][0], positions[62][1], 50, 50);

    // mouth: 44-55

    fill(0, 255, 0);
    stroke(0, 0, 255);
    strokeWeight(3);
    drawPoly(positions, 44, 56);
}


function keyPressed() 
{
    if (key == 'p')
        showPoints = !showPoints;

    if (key == 'v')
        showVideo = !showVideo;

    if (key == 's')
        showShapes = !showShapes;
}


function mousePressed()
{
    if (showShapes === true)
    {
        showShapes = false;
        showPoints = true;
        showVideo = false;
    }
    else if (showPoints)
    {
        showShapes= false;
        showPoints = false;
        showVideo = true;
    }
    else if (showVideo)
    {
        showShapes = true;
        showPoints = false;
        showVideo = false;
    }
}


