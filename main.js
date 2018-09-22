"use strict";
const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const dialog = electron.dialog;
let mainWindow;

var songFolder = "";
//Listen for app start
app.on('ready', function(){
	//create new window
	mainWindow = new BrowserWindow({icon:path.join(__dirname,"/icon.ico")});
	//load html file
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
	// mainWindow.webContents.openDevTools();

	//quit when closed
	mainWindow.on('closed', function(){
		app.quit();
	});

	mainWindow.setMenu(null);
});
ipcMain.on('request-mainprocess-action', (event, arg) => {
	selectDirectory().then((folder) => {
		songFolder = folder;
		event.sender.send('difficulty-picker',getInfo(songFolder));
	});
	
});

ipcMain.on('map-edit',(event,arg) =>{
	if (arg.type != "checkDirections")
	{
		makeBackup(songFolder,arg.data.diff);
	}
	
	var res = require("./editing_scripts/" + arg.type +".js").execute(songFolder,arg.data);
	if (arg.type == "checkDirections")
	{

		let errorWindow = new BrowserWindow({width: 400, height:800,icon:path.join(__dirname,"/icon.ico")});
		errorWindow.setMenu(null);
		errorWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'errorWindow.html'),
		protocol: 'file:',
		slashes: true
		}));
		ipcMain.once('direction-checker',(event,arg) => {
			event.sender.send('direction-checker',res);
		});
	}
});

function selectDirectory() {
	return new Promise((resolve, reject) => {
		dialog.showOpenDialog(mainWindow, {
			properties: ['openDirectory']
		}, (filenames) => {
			resolve(filenames[0]);
		});
	})
	
}

function getInfo(dir)
{
	var songInfo = {};
	try {
		var info = require(dir+"\\info.json");
		var difficultyjsons = [];
		for(var i = 0; i < info.difficultyLevels.length; i++)
		{
			difficultyjsons.push(info.difficultyLevels[i].jsonPath);
		}
		songInfo = {
			songName : info.songName,
			difficulties : difficultyjsons 
		};
		// ipcMain.send('difficulty-picker',difficultyjsons);
	}
	catch(err)
	{
		dialog.showMessageBox(mainWindow, {
			type: 'error',
			message: 'No info.json found in this folder.'
		});
	}
	return songInfo;
}

function makeBackup(dir,fileName)
{
	var fs = require('fs');
	const bakdir = dir+ "\\backups";
	if (!fs.existsSync(bakdir)){
	    fs.mkdirSync(bakdir);
	}
	fs.createReadStream(dir+"\\"+fileName).pipe(fs.createWriteStream(bakdir+"\\"+fileName.replace(".json","")+Date.now()+".json"));
}