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
	var pasteAt = data.paste+offsetInBeats;

	var copyevents = [];
	//copying events
	for(var i = 0; i < events.length; i++)
	{
		if ((events[i]._time < times.end) && (events[i]._time >= times.start))
		{
			copyevents.push(Object.assign({},events[i]));
		}
	}
	//pasting events
	for (var i = 0; i < copyevents.length; i++)
	{
		var newEvent = Object.assign({},copyevents[i]);
		newEvent._time += pasteAt - times.start;
		map._events.push(newEvent);
		
	}
	//sort events
	events.sort(function(a,b){
		return a._time - b._time;
	});
	console.log(events.length);
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