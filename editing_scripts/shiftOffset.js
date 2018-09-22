"use strict";

module.exports.execute = function (folderPath, data){
	var filename = folderPath + "\\" + data.diff;
	var map = require(filename);
	var info = require(folderPath + "\\" + "info.json");
	var events = map._events;
	var notes = map._notes;
	var difficultyinfo = {};

	for(var j = 0; j < info.difficultyLevels.length; j++)
	{
		if (info.difficultyLevels[j].jsonPath == data.diff)
		{
			difficultyinfo = info.difficultyLevels[j];
			break;
		}
	}
	
	var offsetInBeats = difficultyinfo.offset / 60000 * map._beatsPerMinute;

	var noteBeat = data.noteBeat + offsetInBeats;
	var offsetBeat = data.offsetBeat + offsetInBeats;

	var targetNote = notes[0];

	for(var i = 0; i < notes.length; i++)
	{
		if (Math.abs(noteBeat - notes[i]._time) < Math.abs(noteBeat - targetNote))
		{
			targetNote = notes[i];
		}
	}
	var newOffset = (offsetBeat - targetNote._time) / map._beatsPerMinute * 60000 + difficultyinfo.offset;
	difficultyinfo.offset = newOffset;
	difficultyinfo.oldOffset = newOffset;
	//write to file
	var jsonData = JSON.stringify(info);
	var fs = require('fs');
	fs.writeFile(folderPath + "\\" + "info.json", jsonData, function(err) {
	    if (err) {
	        console.log(err);
	    }
	});
}










//cry a lot