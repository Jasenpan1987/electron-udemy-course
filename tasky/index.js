const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, Tray } = electron;

let mainWindow, tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false, // disable the top bar
    resizable: false,
    show: false // not display the browser window initially
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  
  tray = new Tray(iconPath); // create icon on the system Tray

  tray.on("click", (event, bounds) => {
    /**
     * In electron, there are two kinds of bounds, a bounds in click handler callback
     * refers to the x and y coordinates against the screen of the click, and a bounds 
     * of a window refers to the window's width and height.
     */
    const { x, y } = bounds; // bounds of the click
    const { height, width } = mainWindow.getBounds(); // dynamically get the window's bounds
    // toggle window by clicking the icon
    if(mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPos = process.platform  === "darwin" ? y : y - height; // get y position by platform

      mainWindow.setBounds({
        x: x - width / 2,
        y: yPos,
        height, width
      })
      mainWindow.show();
    }
    
  })
});

