function GridGenerator() {
	this.GenerateHex2 = function(positionX, positionY, terrainType)
	{
		var node = this.GenerateHexPolygon(positionX, positionY);
		node.setAttribute('class', 'element');
		
		node.setAttribute('data-x', positionX);
		node.setAttribute('data-y', positionY);
		node.setAttribute('data-terrain', terrainType);
		
		return node;
	}
	
	this.GenerateRoute = function(positionX, positionY)
	{
		var node = this.GenerateHexPolygon(positionX, positionY);
		node.setAttribute('class', 'route');
		
		node.setAttribute('data-x', positionX);
		node.setAttribute('data-y', positionY);
		
		return node;
	}
	
	this.GenerateAttackMarker = function(positionX, positionY)
	{
		var node = this.GenerateHexPolygon(positionX, positionY);
		node.setAttribute('class', 'attack-marker');
		
		node.setAttribute('data-x', positionX);
		node.setAttribute('data-y', positionY);
		
		return node;
	}
	
	this.GenerateHexPolygon = function(positionX, positionY)
	{
		var intervalY = 0;
		if (positionX % 2 != 0) intervalY = 20;
		
		var polygon = new Polygon();
		polygon.setPoints(0 +  40*positionX,20 + 40*positionY + intervalY, 
			10 +  40*positionX,0 + 40*positionY + intervalY, 
			40 +  40*positionX,0 + 40*positionY + intervalY, 
			50 +  40*positionX,20 + 40*positionY + intervalY, 
			40 +  40*positionX,40 + 40*positionY + intervalY, 
			10 +  40*positionX,40 + 40*positionY + intervalY);
			
		return polygon.build();
	}
	
	this.GenerateImage = function(src, x, y)
	{ 
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
	
		var image = new Image();
		var node = image.build(src, "50px", "40px", 0 + 40*x, 0 + intervalY + 40*y);
		node.setAttribute('data-x', x);
		node.setAttribute('data-y', y);
		
		return node;
	}
	
	this.GenerateVictoryImage = function(victoryId, src, x, y)
	{ 
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
	
		var image = new Image();
		var node = image.build(src, "36px", "40px", 7 + 40*x, 0 + intervalY -4 + 40*y);
		node.setAttribute('data-victoryId', victoryId);
		
		return node;
	}
	
	this.GenrateVictoryPoints = function(victoryId, points, x, y)
	{
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
		var intervalX = 0;
		if (points < 10) intervalX = 2;
		
		var text = new Text();
		var node = text.build(points, 'black', x*40 + intervalX + 16, y * 40 + intervalY + 21);
		node.setAttribute('data-victoryId', victoryId);
		
		return node;
	}
	
	this.GenerateUnit = function(unitId, src, x, y)
	{ 
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
	
		var image = new Image();
		var node = image.build(src, "30px", "30px", 11 + 40*x, 5 + intervalY +  40*y);
		node.setAttribute('data-id', unitId);
		
		return node;
	}
	
	this.GenerateIco = function(unitId, src, x, y)
	{ 
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
	
		var image = new Image();
		var node = image.build(src, "25px", "25px", 13 + 40*x, 7 + intervalY +  40*y);
		node.setAttribute('data-id', unitId);
		
		return node;
	}
	
	this.GenerateFortification = function(unitId, src, x, y)
	{ 
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
	
		var image = new Image();
		var node = image.build(src, "50px", "40px", 0 + 40*x, 0 + intervalY + 40*y);
		node.setAttribute('data-fortificationId', unitId);
		
		return node;
	}
	
	this.GenrateUnitAttack = function(unitId, power, x, y)
	{
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
		var intervalX = 0;
		if (power < 10) intervalX = 2;
		
		var text = new Text();
		var node = text.build(power, 'white', x*40 + intervalX + 14, y * 40 + intervalY + 33);
		node.setAttribute('data-id', unitId);
		node.setAttribute('class', 'unit-power');
		
		return node;
	}
	
	this.GenrateUnitDefensiveness = function(unitId, power, x, y)
	{
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
		var intervalX = 0;
		if (power < 10) intervalX = 2;
		
		var text = new Text();
		var node = text.build(power, 'white', x*40 + intervalX + 28, y * 40 + intervalY + 33);
		node.setAttribute('data-id', unitId);
		node.setAttribute('class', 'unit-power');
		
		return node;
	}
	
	
	this.GenrateUnitSize = function(unitId, size, x, y)
	{
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
		
		var text = new Text();
		var node = text.build(size, 'white', x*40 + 25, y * 40 + intervalY + 14);
		node.setAttribute('data-id', unitId);
		node.setAttribute('class', 'unit-power');
		
		return node;
	}
	
	this.GenrateMoveCost = function(moveCost, x, y)
	{
		var intervalY = 0;
		if (x % 2 != 0) intervalY = 20;
		
		var text = new Text();
		var node = text.build(moveCost, 'white', x*40 + 20, y * 40 + intervalY + 25);
		node.setAttribute('class', 'routeCost');
		
		return node;
	}
}