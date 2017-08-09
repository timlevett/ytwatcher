const electron = require('electron')

const {Menu} = require('electron')
// Module to control application life.
const app = electron.app
app.setName("YouTube Watcher")
app.setAboutPanelOptions({
    applicationName: "YouTube Watcher"
})

const globalShortcut = electron.globalShortcut

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createGlobalShortcuts(){
    const ret = globalShortcut.register('CommandOrControl+Shift+E', () => {
        console.log('CommandOrControl+Shift+E is pressed')
        if(mainWindow) {
            if(mainWindow.isMinimized()) {
                mainWindow.restore();
            } else {
                mainWindow.minimize();
            }
        }
    })

    if (!ret) {
        console.log('registration failed')
    }

    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+E'))

    app.on('will-quit', () => {
        // Unregister a shortcut.
        globalShortcut.unregister('CommandOrControl+Shift+E')

        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    })
}

function createMenu() {
    //create menu
    var template = [{
        label: "YT Watcher",
        submenu: [
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createMainWindow(){
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 450,
                                    height: 420,
                                    alwaysOnTop: true,
                                    title: require('./package.json').productName,
                                    transparent: true,
                                    frame: false})

    // and load the index.html of the app.
   ///mainWindow.loadURL('https://www.youtube.com/watch?v=siJ9nfiYQIM&index=5&list=PL91WyqCpBlSUONxb2r1b7fRFJgcrsxNLI')
   mainWindow.loadURL(url.format({
     pathname: path.join(__dirname, 'index.html'),
     protocol: 'file:',
     slashes: true
     }))
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
}

function init () {

  createMainWindow();
  createGlobalShortcuts();
  createMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
