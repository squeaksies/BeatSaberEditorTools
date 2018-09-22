"use strict";
module.exports.execute = function (folderPath, data){
	var filename = folderPath + "\\" + data.diff;
	var map = require(filename);
	var info = require(folderPath + "\\" + "info.json");
	var events = map._events;
	var notes = map._notes;
	var difficultyinfo = {};

	for(var i = 0; i < info.difficultyLevels.length; i++)
	{
		console.log(info.difficultyLevels[i].jsonPath);
		console.log(data.diff);
		if (info.difficultyLevels[i].jsonPath == data.diff)
		{
			difficultyinfo = info.difficultyLevels[i];
			break;
		}
	}
	
	var offsetInBeats = difficultyinfo.offset / 60000 * map._beatsPerMinute;
	console.log(offsetInBeats);
	var times = {start:data.start+offsetInBeats,end:data.end+offsetInBeats};

	for (var i = notes.length - 2; i >= 0; i--)
	{
		if ((notes[i]._time < times.end) && (notes[i]._time >= times.start))
		{
			notes[i]._lineIndex = 2 - (notes[i]._lineIndex - 1);
			switch(notes[i]._cutDirection) {
				case 2:
				    notes[i]._cutDirection = 3;
				    break;
				case 3:
				    notes[i]._cutDirection = 2;
				    break;
				case 4:
				    notes[i]._cutDirection = 5;
				    break;
				case 5:
				    notes[i]._cutDirection = 4;
				    break;
				case 6:
				    notes[i]._cutDirection = 7;
				    break;
				case 7:
				    notes[i]._cutDirection = 6;
				    break;

				default:
				    break;		
			}
			if(notes[i]._type == 1)
			{
				notes[i]._type = 0;
			}
			else if(notes[i]._type === 0)
			{
				notes[i]._type = 1;
			}
		}
	}
	//write to file
	var jsonData = JSON.stringify(map);
	var fs = require('fs');
	fs.writeFile(filename, jsonData, function(err) {
	    if (err) {
	        console.log(err);
	    }
	});
}
//cry a lot