const electron = require("electron");
const path = require("path");
const TimerTray = require("./app/TimerTray");
const MainWindow = require("./app/MainWindow");

const { app, ipcMain } = electron;

let mainWindow, tray;

app.on("ready", () => {
  app.dock.hide(); // do not display the electron icon on dock

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  
  // need to keep a copy otherwise will be garbage collected
  tray = new TimerTray(iconPath, mainWindow);

  ipcMain.on("update:timer", (event, message) => {
    // when a window is on inactive or blur, electron will automatically pause / throttling all
    // the events on the window or we need to add 
    // webPerwebPreferences: { backgroundThrottling: false } to the config object
    tray.setTitle(message);
  });
  

});

