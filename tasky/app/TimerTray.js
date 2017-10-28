const electron = require("electron");

const { Tray, Menu, app } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath); // create icon on the system Tray
    this.mainWindow = mainWindow; // pass along the mainWindow reference

    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));

    this.setToolTip("Timer App"); // add a tool tip, from parent class
  }

  onClick(event, bounds) {
    /**
     * In electron, there are two kinds of bounds, a bounds in click handler callback
     * refers to the x and y coordinates against the screen of the click, and a bounds 
     * of a window refers to the window's width and height.
     */
    const { x, y } = bounds; // bounds of the click
    const { height, width } = this.mainWindow.getBounds(); // dynamically get the window's bounds
    // toggle window by clicking the icon
    if(this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPos = process.platform  === "darwin" ? y : y - height; // get y position by platform

      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPos,
        height, width
      })
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click() {
          app.quit();
        }
      }
    ]);

    this.popUpContextMenu(menuConfig); // attach this menu on the tray
  }
}

module.exports = TimerTray;