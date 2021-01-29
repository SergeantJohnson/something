 song="";
 leftWristx=0;
 leftWristy=0;
 rightWristx=0;
 rightWristy=0;
 volume=0;
 ScoreLeftWrist=0;

function preload () {
   song=loadSound('music.mp3');
}

function setup() {
  canvas= createCanvas(600,500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  posenet=ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotPoses);
}

function draw() {
    image(video,0,0,600,500);
    fill('#ff9500');
    stroke('#00ff37');
    if (ScoreLeftWrist>0.2) {
        circle(leftWristx,leftWristy,20);
        inleftWristyNumber=Number(leftWristy);
        NoDecimalLeftWristY=floor(inleftWristyNumber);
        volume=NoDecimalLeftWristY/500;
        console.log("Volume is "+ volume);
        document.getElementById("volume").innerHTML="Volume: "+volume;
    }

    if(scoreRightWrist>0.2) {
        circle(rightWristx,rightWristy,20);
     if(rightWristy>0&&rightWristy<=100) {
         document.getElementById("speed").innerHTML="Speed: 0.5x";
         song.rate(0.5);
     }
     else if(rightWristy>100&&rightWristy<=200) {
         document.getElementById("speed").innerHTML="Speed: 1x";
         song.rate(1);
     }
     else if(rightWristy>200&&rightWristy<=300) {
         document.getElementById("speed").innerHTML="Speed: 1.5x";
         song.rate(1.5);
     }
     else if(rightWristy>300&&rightWristy<=400) {
         document.getElementById("speed").innerHTML="Speed: 2x";
         song.rate(2);
     }
     else if(rightWristy>400&&rightWristy<=500) {
         document.getElementById("speed").innerHTML="Speed: 2.5x";
         song.rate(2.5);
     }
    }
     
    
}

function play() {
    song.play();
    song.setVolume(volume);
    song.rate(1);
}

function stop() {
    song.stop();
    
}

function modelLoaded() {
   console.log("Posenet is Initialized");
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+ leftWristx+" Left Wrist Y = "+leftWristy);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Score right is "+ scoreRightWrist);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+ rightWristx+" Right Wrist Y = "+rightWristy);
        ScoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("Score left is "+ ScoreLeftWrist);
        
    }
}
