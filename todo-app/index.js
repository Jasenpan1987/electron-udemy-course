const electron = require("electron");

const {
  app, BrowserWindow, 
  Menu, // create electron menus
  ipcMain
} = electron;

let mainWindow, addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on("closed", () => { // when the browser window is closed, close the entire App
    app.quit();
  });

  // creates a new menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu); // can show different menus by calling this func
});

ipcMain.on("todo:add", (event, todo) => {
  // console.log("todo::: ", todo);
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close(); // addWindow is still in the memory -> memory leak
  // addWindow = null;
});

const createAddWindow = () => {
  addWindow = new BrowserWindow({
    width: 300, height: 200, title: "Add New TODO"
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);
  // Very Necessary Code!!!
  addWindow.on("closed", () => addWindow = null); // collect the garbage
  
}

const menuTemplate = [ // each item obj in this array corespondence to a seperate menu on the top
  {
    label: "File",
    submenu: [
      {
        label: "New TODO",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear All",
        click() {
          mainWindow.webContents.send("todo:clearall");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q", // short-cut
        click() { // onClick event
          app.quit();
        }
      }
    ]
  }
];

// the menu work differently on windows and osx, need to add an empty menu when on osx
if (process.platform === "darwin") { // darwin -> osx
  menuTemplate.unshift({});
}

// check NODE_ENV
if (process.NODE_ENV !== "production") { // only available when we are in the dev mode
  // production
  // development
  // test
  // stage
  menuTemplate.push({
    label: "DEVELOP",
    submenu: [
      { role: "reload" }, // electron preset menu items
      { // old way
        label: "Toggle developer tools",
        // make sure we open the devTool for the current active window
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools(); 
        },
        // short-cut
        accelerator: process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I"
      }
    ]
  })
}