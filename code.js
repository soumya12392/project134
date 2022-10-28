var sound = "";

function preload() {
    sound = loadSound("alarm.mp3");
}

function setup() {
    var canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        sound.stop();
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("baby").innerHTML = "Baby Found!";

            fill(r, g, b);
            var percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    else {
        sound.play();
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("baby").innerHTML = "Baby Not Found!";
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
    objects = results;
}