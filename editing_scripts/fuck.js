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
	var times = {start:data.start+offsetInBeats,end:data.end+offsetInBeats};

	var lasttime = 0;
	for(var i = 0; i < notes.length; i++)
	{
		if ((notes[i]._time < times.end) && (notes[i]._time >= times.start))
		{
			if (notes[i]._time != lasttime)
			{
				var newevent = {
		         "_time":0.0,
		         "_type":0,
		         "_value":0
			    };
			    newevent._time = notes[i]._time;
			    newevent._type = Math.floor(Math.random() * 4);
			    if (newevent._type > 0)
			    	newevent._type++;
			    if (Math.random() < 0.5)
			    	newevent._value = 3;
			    else
			    	newevent._value = 7;
			    events.push(newevent);
			}
			lasttime = notes[i]._time;
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