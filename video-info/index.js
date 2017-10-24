const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

// electron ipc:
// From window to Electron App
// mainWindow   (ipcRenderer.send) --------------------> (ipcMain.on)     Electron App
// From App to Electron window
// Electron App (mainWindow.webContents.send) ---------> (ipcRenderer.on) mainWindow


const { app, BrowserWindow, ipcMain } = electron; // overall running electron app process

let mainWindow;

app.on("ready", () => { // event based
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);

});

// register event listener
ipcMain.on("video:submit", (event, filePath) => {
  ffmpeg.ffprobe(filePath, (error, meta) => {
    // console.log(meta.format.duration);
    mainWindow && mainWindow.webContents.send("video:duration", meta.format.duration);
  })
});
