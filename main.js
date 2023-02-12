status = "";
input_text = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}

function draw(){
    image(video, 0, 0, 500, 500)
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status_objects").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status_objects").innerHTML = input_text + " Not Found";
            }
        }
    }

}

function start(){
    objectDetection = ml5.objectDetection('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model_Loaded");
    status = true;
}



function modelLoaded(){

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
    

}