const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const _ = require("lodash");

const { app, BrowserWindow, ipcMain, shell } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on("videos:added", (event, videos) => {
  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metaData) => {
        video.duration = metaData.format.duration;
        video.format = "avi";
        resolve(video);
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      mainWindow.webContents.send("videos:probbed", results);
    });
});

ipcMain.on("videos:convertStart", (event, videos) => {
  _.forEach(videos, function(videoContent, videoName) {
    const outputDir = videoContent.path.split(videoContent.name)[0];
    const outputName = videoContent.name.split(".")[0];
    const outputFullPath = `${outputDir}${outputName}.${videoContent.format}`;

    ffmpeg(videoContent.path)
      .output(outputFullPath)
      .on("progress", ({ timemark }) => {
        // the percentage is not accurate, so we need to do calculation by using timemark
        mainWindow.webContents.send("videos:progress", { video: videoContent, timemark });
      })
      .on("end", () => {
        mainWindow.webContents.send("videos:convertEnd", {
          video: videoContent,
          outputPath: outputFullPath
        })
      })
      .run();
  });
});

ipcMain.on("video:openfolder", (event, path) => {
  shell.showItemInFolder(path);
});