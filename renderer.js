// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
let remote = electron.remote;

const btn = document.getElementById('resizeBtn');

btn.addEventListener('click', function(){
    var win = remote.getCurrentWindow();
    if(win) {
        if(win.getSize()[0] === 1000) {
            win.setSize(450,420);
            document.getElementById('foo').style.height= '300px';
        } else {
            win.setSize(1000,850);
            document.getElementById('foo').style.height= '700px';
        }

    }

});
