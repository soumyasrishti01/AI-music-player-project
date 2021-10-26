var BTS_BUTTER = "";
var BTS_PTD = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

songBUTTER_status = "";
songPTD_status = "";

function preload() {
    BTS_BUTTER = "https://drive.google.com/file/d/16OdaHAFuHZGT2uBfwEDliYONzYeU_1kI/view?usp=sharing";
    BTS_PTD = "https://drive.google.com/file/d/1b47ShII90_dDKLo-ACdzFjDyYt_iy8cA/view?usp=sharing";
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(385, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("PoseNet Is Initialized")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 500, 400);
    stroke("#FF0000");
    fill("#FF0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        BTS_PTD.stop();
        if (songBUTTER_status == false) {
            BTS_BUTTER.play();
            document.getElementById("song").innerHTML = "Playing - BTS Butter song"
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        BTS_BUTTER.stop();
        if (songPTD_status == false) {
            BTS_PTD.play();
            document.getElementById("song").innerHTML = "Playing - BTS Permission To Dance song"
        }
    }
}