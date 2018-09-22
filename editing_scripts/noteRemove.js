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
		if (info.difficultyLevels[i].jsonPath == data.diff)
		{
			difficultyinfo = info.difficultyLevels[i];
			break;
		}
	}
	
	var offsetInBeats = difficultyinfo.offset / 60000 * map._beatsPerMinute;
	var times = {start:data.start+offsetInBeats,end:data.end+offsetInBeats};
	//copying events
	for (var i = notes.length - 2; i >= 0; i--)
	{
		if ((notes[i]._time < times.end) && (notes[i]._time >= times.start))
		{
			map._notes.splice(i, 1);
		}
	}

	
	//sort events
	events.sort(function(a,b){
		return a._time - b._time;
	});
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