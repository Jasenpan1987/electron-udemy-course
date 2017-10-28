const electron = require("electron");

const { app, BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(path) {
    super({
      height: 500,
      width: 300,
      frame: false, // disable the top bar
      resizable: false,
      show: false, // not display the browser window initially
      webPreferences: {
        backgroundThrottling: false // the background task will still running event we toggle away the current window
      }
    });
    this.loadURL(path);
    this.on("blur", this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;