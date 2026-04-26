var TerrainHelper = new function() {
	
	this.GetMoveCost = function(field)
	{
		var result = 0;
		switch(field["terrain-id"])
		{
			case 0:
				result = 1;
				break
			case 1:
				result = 2;
				break
			case 2:
				result = 2;
				break
			case 3:
				result = 3;
				break
			case 4:
				result = 1;
				break
			case 5:
				result = 99;
				break
			case 6:
				result = 4;
				break
			default: 
				result = 1;
				break
		}
		
		
		if (field.river != null)
		{
			result += 2;
		}
		
		if (field.road != null && field["terrain-id"] != 5)
		{
			result = 1;
		}
		
		return result;
	}

	this.GetTerrainBonus = function(field)
	{
		var result = 0;
		switch(field["terrain-id"])
		{
			case 0:
				result = 0;
				break
			case 1:
				result = 1;
				break
			case 2:
				result = 1;
				break
			case 3:
				result = 2;
				break
			case 4:
				result = 2;
				break
			case 5:
				result = 0;
				break
			case 6:
				result = -2;
				break
			default: 
				result = 1;
				break
		}
		
		if (field.river != null)
		{
			result -= 1;
		}
		
		return result;
	}

	this.GetTerrainAttackerBonus = function(field)
	{
		var result = 0;
		switch(field["terrain-id"])
		{
			case 0:
				result = 0;
				break
			case 1:
				result = 1;
				break
			case 2:
				result = 0;
				break
			case 3:
				result = -1;
				break
			case 4:
				result = 0;
				break
			case 5:
				result = 0;
				break
			case 6:
				result = -2;
				break
			default: 
				result = 0;
				break
		}
		
		if (field.river != null)
		{
			result -= 1;
		}
		
		return result;
	}

	this.GetTerrainDesc = function(field)
	{
		switch(field["terrain-id"])
		{
			case 0:
				return 'grass';
			case 1:
				return 'forest';
			case 2:
				return 'hills';
			case 3:
				return 'mountains';
			case 4:
				return 'village';
			case 5:
				return 'water';
			case 6:
				return 'marsh';
			default: 
				return '?';
		}
	}

	this.GetTerrainImage = function(field)
	{
		switch(field["terrain-id"])
		{
			case 0:
				return "grass.png";
			case 1:
				return "forest.png";
			case 2:
				return "hill.png";
			case 3:
				return "mountain.png";
			case 4:
				return "village.png";
			case 5:
				return "water.png";
			case 6:
				return "marsh.png";
			default: 
				return '?';
		}
	}
	
	this.GetRiverImage = function(riverId)
	{
		return 'river_' + riverId + '.png';
	}
	
	this.GetRoadImage = function(roadId)
	{
		return 'road_' + roadId + '.png';
	}
}