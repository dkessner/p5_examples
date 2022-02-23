function setup() {
  createCanvas(400, 400);

}

let x = 50;

let catimg;

function draw() 
{
    background(0);
    if (catimg)
        image(catimg, 0, 0);
}


function mousePressed()
{
    let caturl = "https://api.thecatapi.com/v1/images/search";
    loadJSON(caturl, getRandomCatPic);
}


function getRandomCatPic(data)
{
    console.log(data);

    catimg = createImg(data[0].url, "noimage");
    //catimg.resize(width, height); // throws errors 
}

