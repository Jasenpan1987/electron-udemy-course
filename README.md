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

### 3. Tray Timer App With React
A timer app that allows user to set and timer for tasks. It will be a icon on the Tray and you can toggle the display of the window by clicking the icon.
#### Some Notes:
1. Create Tray Icon Object
```
const tray = new Tray(ICON_PATH);
```
2. The display of the mainWindow, you need to calculate the correct coordinates for the window, the coordinates can be different depending on which platform you are building with.

3. Every event handler callback will recieve an bounds argument that can refers to the x and y coordinates for the current clicking point
```
onClick(event, bounds) {...}
```
The mainWindow also has bounds, and you can get it by calling `mainWindow.getBounds()`, you can get the height and width of the window from the result of `getBounds()`, also, you can set the position of the window by calling
```
mainWindow.setBounds(
  {
    x: xx,
    y: xx,
    height: xx,
    width: xx
  }
);
```
4. When you unfocus a window, the background tasks such as tasks created by `setInterval` or `setTimeout` will also be throttled, to disable this feature, you can pass   `webPreferences: { backgroundThrottling: false }` configuration when creating the window object.

5. To set some text after the tray icon, you can call `tray.setTitle(message);`.
