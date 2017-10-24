## Electron Udemy Course
### 1. Video duration app
A simple app to let user select a video file, and get the duration of the selected video.
#### Some Notes:
1. Electron apps are desktop apps runs on the top of the Chromium (similar to google chrome).
2. How IPC works in electron.
```
// electron ipc:
// From window to Electron App
// mainWindow   (ipcRenderer.send) --------------------> (ipcMain.on)     Electron App
// From App to Electron window
// Electron App (mainWindow.webContents.send) ---------> (ipcRenderer.on) mainWindow
```