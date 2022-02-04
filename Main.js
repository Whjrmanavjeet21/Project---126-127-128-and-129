Song1 = "";
Song2 = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";


function setup() {
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload() {
    Song1 = loadSound("Song1.mp3");
    Song2 = loadSound("Song2.mp3");
}

function draw(){
    image(video,0,0,500,500);

    fill("#003300");
    stroke("#003300");

    song_name = Song1.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Song2.stop();
        if(song_name == false){
            Song1.play();
        } 
        else {
            console.log("Song name is Nani teri morni ko chor le gaye");
            document.getElementById("song_id").innerHTML = "Song name is Nani teri morni ko chor le gaye";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}