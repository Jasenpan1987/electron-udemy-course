import { ipcRenderer } from "electron";
import { ADD_VIDEO, ADD_VIDEOS, REMOVE_VIDEO, REMOVE_ALL_VIDEOS, VIDEO_PROGRESS, VIDEO_COMPLETE } from "./types";

export const addVideos = videos => dispatch => {
  ipcRenderer.send("videos:added", videos);

  ipcRenderer.on("videos:probbed", (event, videosWithMeta) => {
    console.log("probbed::: ", videosWithMeta);
    dispatch({
      type: ADD_VIDEOS,
      payload: videosWithMeta
    });
  });
};

export const convertVideos = () => (dispatch, getState) => {
  const { videos } = getState();
  ipcRenderer.send("videos:convertStart", videos);

  ipcRenderer.on("videos:convertEnd", (event, { video, outputPath }) => {
    dispatch({
      type: VIDEO_COMPLETE,
      payload: {
        ...video,
        outputPath
      }
    })
  });

  ipcRenderer.on("videos:progress", (event, { video, timemark}) => {
    dispatch({
      type: VIDEO_PROGRESS,
      payload: {
        ...video,
        timemark
      }
    });
  });
};

export const showInFolder = outputPath => dispatch => {
  ipcRenderer.send("video:openfolder", outputPath);
};

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: { ...video }
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: "" }
  };
};

export const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS
  };
};
