"use strict";
const { ipcRenderer } = require('electron');

function selectDirectory()
{
	let data = "do the thing!!";
	ipcRenderer.send('request-mainprocess-action', data);
	ipcRenderer.once('difficulty-picker', (event,args) => {
		var diffSel = document.getElementById("diffSel");
		for (i = 0; i < diffSel.options.length; i++) {
			diffSel.options[i] = null;
		}

		var difficulties = args.difficulties;
		console.log(difficulties);
		diffSel.disabled = false;
		for(var i = 0; i < difficulties.length; i++)
		{
			var option = document.createElement("option");
			option.text = difficulties[i];
			diffSel.add(option);
			console.log(args.songName);
			document.getElementById("workingSong").innerHTML = 'Now Editing: '+ args.songName;
		}
		
	});
}
function eventCopyPaste()
{
	var data = {
		type:  	"eventCopyPaste",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("eventCopyStart").value),
			end: 	parseFloat(document.getElementById("eventCopyEnd").value),
			paste: 	parseFloat(document.getElementById("eventPasteAt").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
function flash()
{
	var data = {
		type:  	"flash",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("flashStart").value),
			end: 	parseFloat(document.getElementById("flashEnd").value),
			timing: parseFloat(document.getElementById("flashTiming").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
function eventRemove()
{
	var data = {
		type:  	"eventRemove",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("eventRemoveStart").value),
			end: 	parseFloat(document.getElementById("eventRemoveEnd").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
function noteCopyPaste()
{
	var data = {
		type:  	"noteCopyPaste",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("noteCopyStart").value),
			end: 	parseFloat(document.getElementById("noteCopyEnd").value),
			paste: 	parseFloat(document.getElementById("notePasteAt").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
function mirror()
{
	var data = {
		type:  	"mirror",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("mirrorStart").value),
			end: 	parseFloat(document.getElementById("mirrorEnd").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
function noteRemove()
{
	var data = {
		type:  	"noteRemove",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("noteRemoveStart").value),
			end: 	parseFloat(document.getElementById("noteRemoveEnd").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}
 
function fuck()
{
	var data = {
		type:  	"fuck",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			start: 	parseFloat(document.getElementById("fuckStart").value),
			end: 	parseFloat(document.getElementById("fuckEnd").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}

// function shiftOffset()
// {
// 	var data = {
// 		type:  	"shiftOffset",
// 		data: 	{
// 			diff: 	document.getElementById("diffSel").value,
// 			noteBeat: 	parseFloat(document.getElementById("noteBeat").value),
// 			offsetBeat: 	parseFloat(document.getElementById("offsetBeat").value)
// 		}
// 	};
// 	ipcRenderer.send('map-edit',data);
// }

function checkDirections()
{
	var data = {
		type:  	"checkDirections",
		data: 	{
			diff: 	document.getElementById("diffSel").value,
			minTime: parseFloat(document.getElementById("dirMinTime").value),
			maxTime: parseFloat(document.getElementById("dirMaxTime").value)
		}
	};
	ipcRenderer.send('map-edit',data);
}