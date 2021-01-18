// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, globalShortcut, nativeImage } = require('electron');
const path = require('path');

let mime = require('mime-types');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let showOrHide = true;

try {
    require('electron-reloader')(module)
} catch (_) { }

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 700,
        height: 540,
        center: true,
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: true,
            contextIsolation: false
        },
        alwaysOnTop: true,
        frame: false
    });

    // let trayIcon = __dirname + '/icon.ico';
    // appTray = new Tray();
    let trayIcon = path.join(__dirname, 'icon.ico');
    appTray = new Tray(nativeImage.createFromPath(trayIcon));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: function(){
                app.quit();
            }
        }
    ]);

    appTray.setContextMenu(contextMenu);

    // and load the index.html of the app.
    let htmlFile = path.join(__dirname, 'index.html');
    mainWindow.loadFile(htmlFile);
    // mainWindow.loadURL('http://localhost:3000');

    //Open the DevTools
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed',
        function () {
            mainWindow = null;
    });

    // mainWindow.on('show', (event) => {
    //     mainWindow.focus();
    // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

app.whenReady().then(() => {
    // Register a 'CommandOrControl+X' shortcut listener.
    const hide = globalShortcut.register('CommandOrControl+`', () => {
        if(showOrHide) {
            mainWindow.hide();
            showOrHide = false;
        } else {
            mainWindow.show();
            showOrHide = true;
        }
    });

    // const esc = globalShortcut.register('Esc', () => {
    //     if(showOrHide) {
    //         mainWindow.hide();
    //         showOrHide = false;
    //     }
    // });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// app.allowRendererProcessReuse = false;   //FIXED: https://github.com/hello-chenchen/system-operate-tools/issues/8