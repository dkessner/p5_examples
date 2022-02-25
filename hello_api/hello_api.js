function setup() {
  createCanvas(400, 400);

}

let x = 50;


let catimg;
let catdata;


function draw() 
{
    background(0);

    if (catimg)
    {
        image(catimg, 0, 0, catdata.w, catdata.h);
    }
    else if (catimg === null)
    {
        fill(255);
        text("Loading", width/2, height/2);
    }
}


function mousePressed()
{
    catimg = null;
    const caturl = "https://api.thecatapi.com/v1/images/search";
    loadJSON(caturl, getRandomCatPic);
}


function getRandomCatPic(data)
{
    console.log(data[0]);

    catimg = createImg(data[0].url, "random cat image", null, () => {
        textAlign(CENTER);
        console.log("Loaded: " + data[0].url);
        catimg.hide();
    });

    catdata = {w:0, h:0};

    if (data[0].width > data[0].height)
        catdata.w = width;
    else
        catdata.h = height;
}

