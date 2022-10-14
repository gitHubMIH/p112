previsao1="";
previsao2="";

Webcam.set({
    width:350,
    height:300,
    pngFormat:"png",
    pngQuality:90
});
                                                                                
camera=document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot()  {
Webcam.snap(function(data_uri){
    document.getElementById("resultado").innerHTML='<img id="capturar"src="'+data_uri+'"/>';
});    
}
console.log("ml5 version ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/etINQBPwi/model.json',modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speakData1="A primeira previsão é "+precisao1;
    speakData2="A segunda previsão é "+precisao2;
    var falar=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(falar);
}
    function check() {
        img=document.getElementById("capturar");
        classifier.classify(img,gotResult);   
    }
    function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("resultado1").innerHTML=results[0].label;
        document.getElementById("resultado2").innerHTML=results[1].label;
        previsao1=results[0].label;
        previsao2=results[1].label;
        speak();
        if (results[0].label=="Tranquilo"){
            document.getElementById("carregarEmoji").innerHTML="&#129305;";
        }
        if (results[0].label=="Legal") {
            document.getElementById("carregarEmoji").innerHTML="&#128077;";
        }
        if (results[0].label=="Vitória") {
            document.getElementById("carregarEmoji").innerHTML="&#9996;";
        }
        if (results[1].label=="tranquilo"){
            document.getElementById("carregarEmoji2").innerHTML="&#129305;";
        }
        if (results[1].label=="Legal") {
            document.getElementById("carregarEmoji2").innerHTML="&#128077;";
        }
        if (results[1].label=="Vitória") {
            document.getElementById("carregarEmoji2").innerHTML="&#9996;";
        }
    }
    }