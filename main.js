const { 
       app, 
       BrowserWindow 
      } = require('electron')
const path = require('node:path')

const createWindow = () => 
                     {
                      const win = new BrowserWindow(
                                  {
                                   width: 350,
                                   height: 540,
                                   webPreferences:
                                   {
                                    preload: path
                                             .join(__dirname, 
                                                   'preload.js'),
                                    nodeIntegration: false
                                   }  
                                  })
                      win
                      .loadFile('src/index.html')
                     }

app
.whenReady()
.then(() =>
      {
       createWindow()
       app
       .on('activate', 
           () => 
           {
            if (BrowserWindow
                .getAllWindows()
                .length === 0)
            {createWindow()}
           })
      })

app
.on('window-all-closed', 
    () => 
    {
     if (process
         .platform !== 'darwin') 
     app
     .quit()
    })