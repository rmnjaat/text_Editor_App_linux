const electron = require('electron');


//making browser
const { app, BrowserWindow, ipcMain, dialog, Menu } = electron;

const fs = require('fs');



app.disableHardwareAcceleration();

let filePath = undefined;
// listining for message(key)
//handles events like when event  ready (app is ready) this will triger its callback function
// webprefrence telling broweser that we want to integrate node methods like require in btnFN.js
let win;
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,

      //for version electron >=12
      contextIsolation: false
    }

  });


  win.loadFile('index.html');


  //changing menu
  const menu = Menu.buildFromTemplate(Menutemplete);
  Menu.setApplicationMenu(menu);


  // console.log("hello");
})


// Listens to channel, when a n ew message arrives listener would be called with listener(event, args...).

ipcMain.on('save', (event, text) => {
  // save the text to a file
  saveFile(text);



}
)


function writetofile(data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log("Error in writing file");
    }
    else {
      console.log("file has been saved");
      win.webContents.send('saved', 'sucess');
    }
  })

}

function saveFile(text) {

  if (filePath === undefined) {

    dialog.showSaveDialog(win, { defaultPath: 'filename.txt' }).then((fullpath) => {
      // let {path}=filepath;
      if (fullpath.filePath) {
        filePath = fullpath.filePath;
        // writing file node module to save file

        writetofile(text);

      }
    }).catch((...args) => {
      console.log("args ", args);

    })
  }
  else {
    writetofile(text)


  }

}


//Save clicked sending message from here and renderer is listning it nad  tirgger savetext fn .
const Menutemplete = [
  {
    label: "File",
    submenu: [
      {
        label: "Save",
        accelerator:'Ctrl+s',
        click() {
          win.webContents.send("saveclicked" );
        }
      },
      {
        label: "Save as",
        accelerator:'Ctrl+Shift+s',
        click() {
          filePath=undefined;
          win.webContents.send("saveclicked" );
        }
      },
      { type: 'separator' },

      { role: 'close' } 
    ]
  },

  {
    label: "Edit",
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },

  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },


  {
    label: 'Window',
    submenu: [
      { role: 'minimize' }

    ]
  },


  {
    label: 'About Developer',
    submenu: [
      {
        label: 'GitHub',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/rmnjaat')
        }
      },
      { type: 'separator' },

      {
        label: 'Linkdin',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://linkedin.com/in/raman-jangu')
        }
      }
    ]
  }
]

