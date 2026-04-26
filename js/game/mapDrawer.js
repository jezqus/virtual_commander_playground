var MapDrawer = new function() {
	
	this.DrawField = function(gridGenerator, mapJson, x, y)
	{
		var terrainImage = TerrainHelper.GetTerrainImage(mapJson[y][x]);
		var node = gridGenerator.GenerateImage(terrainImage, x, y);
		
		$("#map").append(node);
	}
	
	this.DrawHex = function(gridGenerator, mapJson, x, y)
	{
		var node = gridGenerator.GenerateHex2(x,y, mapJson[y][x]["terrain-id"]);
		$(node).click(fieldClick);
		$(node).mouseenter(fieldHoover);
		$("#map").append(node);
	}
	
	this.DrawRiver = function(gridGenerator, mapJson, x, y)
	{
		if (mapJson[y][x].river != null)
		{
			for(var z = 0; z < mapJson[y][x].river.length; z++)
			{
				if (mapJson[y][x].river[z] == 1)
				{
					var riverImage = TerrainHelper.GetRiverImage(z+1);
					var riverNode = gridGenerator.GenerateImage(riverImage, x, y);
					
					$("#map").append(riverNode);
				}
			}
		}
	}
	
	this.DrawRoad = function(gridGenerator, mapJson, x, y)
	{
		if (mapJson[y][x].road != null)
		{
			for(var z = 0; z < mapJson[y][x].road.length; z++)
			{
				if (mapJson[y][x].road[z] == 1)
				{
					var roadImage = TerrainHelper.GetRoadImage(z+1);
					var roadNode = gridGenerator.GenerateImage(roadImage, x, y);
					
					$("#map").append(roadNode);
				}
			}
		}
	}
	
	this.removeField = function(x ,y)
	{
		$("#map image[data-x = '" + x + "'][data-y = '" + y + "']").remove();
		$("#map polygon[data-x = '" + x + "'][data-y = '" + y + "']").remove();
	}
	
	this.DrawMap = function(mapJson)
	{
		var gridGenerator = new GridGenerator();
	
		for (var i = 0; i < mapJson.length; i++)
		{
			for(var j = 0; j <  mapJson[i].length; j++)
			{
				MapDrawer.DrawField(gridGenerator, mapJson, j, i);
				
				MapDrawer.DrawRiver(gridGenerator, mapJson, j, i);
				
				if (mapJson[i][j].road != null)
				{
					for(var z = 0; z < mapJson[i][j].road.length; z++)
					{
						if (mapJson[i][j].road[z] == 1)
						{
							var roadImage = TerrainHelper.GetRoadImage(z+1);
							var roadNode = gridGenerator.GenerateImage(roadImage, j, i);
							
							$("#map").append(roadNode);
						}
					}
				}
			}
		}
		
		for (var i = 0; i < mapJson.length; i++)
		{
			for(var j = 0; j <  mapJson[i].length; j++)
			{
				MapDrawer.DrawHex(gridGenerator, mapJson, j, i);
			}
		}
	}
	
	this.ClearMap = function()
	{
		$("#map").html("");
	}
}