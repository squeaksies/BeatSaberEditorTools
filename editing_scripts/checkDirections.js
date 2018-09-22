"use strict";

module.exports.execute = function (folderPath, data){
	var filename = folderPath + "\\" + data.diff;
	var map = require(filename);
	var info = require(folderPath + "\\" + "info.json");
	var events = map._events;
	var notes = map._notes;
	var difficultyinfo = {};
	var minTime = data.minTime;
	var maxTime = data.maxTime;
	for(var i = 0; i < info.difficultyLevels.length; i++)
	{
		if (info.difficultyLevels[i].jsonPath == data.diff)
		{
			difficultyinfo = info.difficultyLevels[i];
			break;
		}
	}
	var offsetInBeats = difficultyinfo.offset / 60000 * map._beatsPerMinute;
	console.log(offsetInBeats);
	//split notes into red and blue
	var blues = [];
	var reds = [];
	for(var i = 0; i < notes.length; i++)
	{
		var note = notes[i];
		if (note._type == 1)
			blues.push(note);
		if (note._type === 0)
			reds.push(note);
	}
	var errors = [];
	var lastNote = {_time : 0};
	var lastError = false;
	for(var i = 0; i < blues.length; i++)
	{
		var notetiming = blues[i]._time - lastNote._time;
		if (notetiming >= minTime && notetiming <= maxTime)
		{
			if (checkDirection(lastNote,blues[i]))
			{
				if (!lastError)
				{
					errors.push({color: "blue", time:blues[i]._time - offsetInBeats});
					lastError = true;
				}
			}
			else
			{
				lastError = false;
			}
		}
		lastNote = blues[i];
		
	}
	var lastNote = {_time : 0};
	var lastError = false;
	for(var i = 0; i < reds.length; i++)
	{
		var notetiming = reds[i]._time - lastNote._time;
		if (notetiming >= minTime && notetiming <= maxTime)
		{
			if (checkDirection(lastNote,reds[i]))
			{
				if (!lastError)
				{
					errors.push({color: "red", time:reds[i]._time - offsetInBeats});
					lastError = true;
				}
			}
			else
			{
				lastError = false;
			}
		}
		lastNote = reds[i];
		
	}
	errors.sort(function(a,b){
		return a.time - b.time;
	});
	return errors;
}
	
function checkDirection(lastNote,note)
{
	var dir = note._cutDirection;
	if(note._cutDirection == 8)
		return false;
	if (lastNote._cutDirection == dir)
	{
		return true;
	}
	switch(lastNote._cutDirection) {
		case 0:
			if (dir == 4 | dir == 5)
			{
				return true;
			}
			break;
		case 1:
			if (dir == 6 | dir == 7)
			{
				return true;
			}
			break;
		case 2:
		    if (dir == 4 | dir == 6)
			{
				return true;
			}
		    break;
		case 3:
		    if (dir == 5 | dir == 7)
			{
				return true;
			}
		    break;
		case 4:
		    if (dir === 0 | dir == 2)
			{
				return true;
			}
		    break;
		case 5:
		    if (dir === 0 | dir == 3)
			{
				return true;
			}
		    break;
		case 6:
		    if (dir == 1 | dir == 2)
			{
				return true;
			}
		    break;
		case 7:
		    if (dir == 1 | dir == 3)
			{
				return true;
			}
		    break;

		default:
		    break;		
	}
	return false;
}

	








//cry a lot