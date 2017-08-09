const electron = require('electron')
let remote = electron.remote;

function setWebviewSize() {
    var win = remote.getCurrentWindow();
    var sizeArray = win.getSize();
    if(sizeArray && sizeArray[0] === 1000) {
        document.getElementById('foo').style.height= '700px';
    } else {
        document.getElementById('foo').style.height= '300px';
    }
}

let beginning = true;
function movieMode(label) {
    if(beginning) {
        document.getElementById('header').remove();
        document.getElementById('instructions').remove();
        document.getElementById('hideShowInstruction').style.display = "block";
        document.getElementById('resizeBtn').style.display = "block";
        document.body.style.backgroundColor = '#000';
        label.style.color = '#fff';

        setWebviewSize();
        beginning = false;
    }
}

function setVideoSrc(type, value) {
    var label = document.getElementById('videolabel');
    var video = document.getElementById('foo');

    if("embed" === type) {
        video.src = "https://www.youtube.com/embed/" + value;
        label.innerHTML = "Video ID:";
    } else {
        video.src = value;
        label.innerHTML = "URL:";
    }
}

function switchVideo() {
    var el = document.getElementById('videoID');
    var label = document.getElementById('videolabel');
    var video = document.getElementById('foo');
    if(el.value) {
        document.body.focus();
        if(el.value.indexOf("http") >= 0) {
            if(el.value.indexOf("www.youtube.com/watch") >= 0) {
                var url = new URL(el.value);
                var v = url.searchParams.get("v");
                if(v) {
                    el.value = v;
                    setVideoSrc("embed", v);
                }
            } else {
                setVideoSrc("url", el.value);
            }
        } else {
            setVideoSrc("embed", el.value);
        }
        movieMode(label);
    }
}

function hsStuff(isShow){
    var el = document.getElementById('videoID');
    if(el.value && el !== document.activeElement) {
        console.log(isShow ? "show" : "hide");
        document.body.style.backgroundColor = isShow ? '#000' : 'transparent';
        el.style.visibility = isShow ? '' : 'hidden';
        document.getElementById('videolabel').style.visibility = isShow ? '' : 'hidden';
        document.getElementById('hideShowInstruction').style.visibility = isShow ? '' : 'hidden';
        document.getElementById('resizeBtn').style.visibility = isShow ? '' : 'hidden';
    }
}

//event listeners

document.body.addEventListener('mouseleave', function(){
    hsStuff(false);
})

document.body.addEventListener('mouseenter', function(){
    hsStuff(true);
})

document.getElementById('videoID').addEventListener('change', function(){
     switchVideo();
})
