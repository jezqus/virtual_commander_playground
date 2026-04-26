function fieldHoover(t)
{
	
}

function SetTerrainMode()
{
	 $('#terrain').show();
	 $('#river').hide();
	 $('#road').hide();
	 mapGenMode = 1;
}

function SetRiverMode()
{
	$('#terrain').hide();
	$('#river').show();
	$('#road').hide();
	mapGenMode = 2;
}

function SetRoadMode()
{
	$('#terrain').hide();
	$('#river').hide();
	$('#road').show();
	mapGenMode = 3;
}

function SetTerrain(id)
{
	currentTerrainToSet = id;
}

function SetRiver(id)
{
	currentRiverToSet = id;
}

function SetRoad(id)
{
	currentRoadToSet = id;
}

function GetMapJson()
{
	$("#mapJson").html(JSON.stringify(mapJson));
}

function fieldClick(field) { 
	var x = this.getAttribute("data-x");
	var y = this.getAttribute("data-y");
	
	if (mapGenMode == 1)
	{
		//var newTerrain = prompt('0 - grass 1 - forest 2 - hills 3 - mountains 4 - village 5 - water 6 marsh');
		mapJson[y][x]["terrain-id"] = Number(currentTerrainToSet);
	}else if (mapGenMode == 2)
	{
		if (mapJson[y][x].river == null)
		{
			mapJson[y][x].river = [0, 0, 0, 0, 0, 0];
		}
		if (mapJson[y][x].river[currentRiverToSet] == 1)
		{
			mapJson[y][x].river[currentRiverToSet] = 0;
		}else
		{
			mapJson[y][x].river[currentRiverToSet] = 1;
		}
	}else
	{
		if (mapJson[y][x].road == null)
		{
			mapJson[y][x].road = [0, 0, 0, 0, 0, 0];
		}
		if (mapJson[y][x].road[currentRoadToSet] == 1)
		{
			mapJson[y][x].road[currentRoadToSet] = 0;
		}else
		{
			mapJson[y][x].road[currentRoadToSet] = 1;
		}
	}
	
	MapDrawer.removeField(x, y);
	
	var gridGenerator = new GridGenerator();
	MapDrawer.DrawField(gridGenerator, mapJson, x, y);
	MapDrawer.DrawRiver(gridGenerator, mapJson, x, y);
	MapDrawer.DrawRoad(gridGenerator, mapJson, x, y);
	MapDrawer.DrawHex(gridGenerator, mapJson, x, y);
}

var currentTerrainToSet = 0;
var currentRiverToSet = 0;
var currentRoadToSet = 0;
var mapGenMode = 1; // 1 map gen 2 river gen 3 road gen
var mapJson = [];

function GenarateBasic()
{
	var sizeX = Number(prompt('szerokosc'));
	var sizeY = Number(prompt('wysokosc'));

	for(var i = 0; i < sizeY; i++)
	{
		mapJson[i] = [];
		
		for(var j = 0; j < sizeX; j++)
		{
			mapJson[i][j] = { 'x': j, 'y': i, 'terrain-id': 0 }
		}
	}
}

$(document).ready(function() {
	
	SetTerrainMode();
	GenarateBasic();
	
	MapDrawer.DrawMap(mapJson);
	
});