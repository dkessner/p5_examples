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
        let w = 0, h = 0;

        if (catdata.width > catdata.height)
            w = width;
        else
            h = height;

        image(catimg, 0, 0, w, h);
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
    catdata = data[0];
    console.log(catdata);

    catimg = createImg(catdata.url, "random cat image", null, () => {
        textAlign(CENTER);
        console.log("Loaded: " + catdata.url);
        catimg.hide();
    });

}

