
URL = window.URL || window.webkitURL;
var clicked = -1
var gumStream;                      //stream from getUserMedia()
var rec;                            //Recorder.js object
var input;                          //MediaStreamAudioSourceNode we'll be recording
var transtxt=document.getElementById('translation');
var lang=document.getElementById("langSelect").value;
var stt;


document.getElementById("langSelect").addEventListener("change", langSelect);
function langSelect(){
    lang = document.getElementById("langSelect").value;

    console.log(lang)
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function (e) {

        if (this.readyState === 4) {
            transtxt.innerHTML = e.target.responseText;
            
        }
    };
    stt = document.getElementById('STT');

    var fd = new FormData();
    fd.append("lang",lang);
    fd.append("text",stt.value);
    xhr.open("POST", "/translate", true);
    xhr.send(fd);
}

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
recordButton.addEventListener("click", startRecording);

function startRecording() {
    clicked = clicked + 1
    recordButton.style.color="red";
    console.log(clicked)
    if (clicked % 2 == 0)            //start rec
    {
        console.log("recordButton clicked");

        var constraints = { audio: true, video: false }
        recordButton.disabled = true;

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
         audioContext = new AudioContext();

            gumStream = stream;

            input = audioContext.createMediaStreamSource(stream);
            rec = new Recorder(input, { numChannels: 1 })

            rec.record()

            console.log("Recording started");

        }).catch(function (err) {
        });
    }
    else {
        recordButton.style.color="black";

        console.log("stopButton clicked");
        rec.stop();
        gumStream.getAudioTracks()[0].stop();

        rec.exportWAV(createDownloadLink);
    }
}
function createDownloadLink(blob) {

    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');

    var filename = new Date().toISOString();

    au.controls = true;
    au.src = url;

    link.href = url;
    link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
    link.innerHTML = "download";

    //add the new audio element to li
    li.appendChild(au);
    //upload link
    stt = document.getElementById('STT');
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {

        if (this.readyState === 4) {
            stt.innerHTML = e.target.responseText;
        }
    };
    var fd = new FormData();
    fd.append("audio_data", blob, filename);
    xhr.open("POST", "/resultpage", true);
    xhr.send(fd);


}
