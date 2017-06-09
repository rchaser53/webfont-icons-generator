import * as electron from "electron";
import { app, BrowserWindow } from "electron";

let win;

const path = require('path');
const p = path.join(__dirname, '..', 'dest', 'node_modules');
require('module').globalPaths.push(p);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: false,
    //   webSecurity: false
    // }
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on("closed", () => {
    win = null;
  });
}

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});