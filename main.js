var BTS_BUTTER = "";
var BTS_PTD = "";

function preload(){
    BTS_BUTTER = "BTS_BUTTER.MP3";
    BTS_PTD = "BTS_PTD.mp3";
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(385, 200);

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 500, 400);
}