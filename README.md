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
3. To run this app, you need to install [ffmpeg](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg) on your machine.

### 2. Simple Todo App
Simple todo app, only allows user to add todo and clear all the todos.
#### Some Notes:
1. Menu in electron need a menu tempate which will specify the label, submenus and callbacks. 
```
const mainMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(mainMenu);
```
The above code will create a menu and attach it to the app, however, it will replace the default menu.

2. Multiple window
```
addWindow = new BrowserWindow({
  width: 300, height: 200, title: "Add New TODO"
});
addWindow.loadURL(`file://${__dirname}/add.html`);
```
Creating new window will just like creating the mainWindow.

3. Platform and Env
`process.platform` will return you the platform that runing the app, and `process.NODE_ENV` will return you the enviornment. Electron can behave differently on different platforms, so we need some platform related code.