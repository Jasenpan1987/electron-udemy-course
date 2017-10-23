const electron = require("electron");

const { app } = electron; // overall running electron app process

app.on("ready", () => { // event based
  console.log("app is ready");
});