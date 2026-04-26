function removeUnit(unit)
{
	var unitGenerator = new UnitGenerator();
	unitGenerator.RemoveUnitFromMap(unit.id);
	
	Game.jsonUnits = _.reject(Game.jsonUnits, function(unitOnList) { return unitOnList.id == unit.id; });
}

function redrawUnit(unit)
{
	var unitGenerator = new UnitGenerator();
	unitGenerator.Init("map");
	unitGenerator.RemoveUnitFromMap(unit.id);
	if (unit.side == Game.currentSide) unitGenerator.DrawUnit(unit, selectUnit, Game.scenarioJson);
	else unitGenerator.DrawEnemyUnit(unit, selectEnemyUnit, Game.scenarioJson);
}

function redrawVictoryElement(victoryElement)
{
	var unitGenerator = new UnitGenerator();
	unitGenerator.Init("map");
	unitGenerator.RemoveVictoryFromMap(victoryElement.id);
	unitGenerator.DrawVictoryLocation(victoryElement);
}


function moveUnit(unit, x, y)
{
	unit.x = x;
	unit.y = y;
	
	unit.fortify = 0;
	var victoryLocationField = _.find(Game.victoryJson, function(victoryLocation) { return victoryLocation.x == x && victoryLocation.y == y; });
	if (victoryLocationField != null)
	{
		victoryLocationField.owner = unit.side;
		redrawVictoryElement(victoryLocationField);
	}
	
	redrawUnit(unit);
} 

function selectUnit(t) { 
	var unitId = this.getAttribute("data-id");
	var unit = _.find(Game.jsonUnits, function(element) { return element.id == unitId; });

	if (Game.selectedUnit == null)
	{
		Game.selectedUnit = unit;
	}
	else
	{
		if (Game.selectedUnit.id == unitId)
		{
			Game.selectedUnit = null;
		}else
		{
			Game.selectedUnit = unit;
		}
	}
	
	radio('unitSelected').broadcast(Game.selectedUnit);
}

function selectEnemyUnit(t)
{
	var unitId = this.getAttribute("data-id");
	var unitOnField = _.find(Game.jsonUnits, function(element) { return element.id == unitId; });
	
	if (Game.selectedUnit != null)
	{
		if (Game.selectedUnit == unitOnField)
		{
			Game.selectedUnit = null;
		}
		else
		{
			Game.selectedUnit = unitOnField;
		}
	}else
	{
		Game.selectedUnit = unitOnField;
	}
	
	radio('enemyUnitSelected').broadcast(Game.selectedUnit);
}

function GetNiebourhoudBattle(map, x , y)
{
	var neibours = new Array();
	if (x % 2 != 0)
	{
		neibours.push(map[y+1][x-1]);
		neibours.push(map[y+1][x]);
		neibours.push(map[y+1][x+1]);
		neibours.push(map[y][x-1]);
		neibours.push(map[y][x+1]);
		neibours.push(map[y-1][x]);
	}else
	{
		neibours.push(map[y-1][x-1]);
		neibours.push(map[y-1][x]);
		neibours.push(map[y-1][x+1]);
		neibours.push(map[y][x-1]);
		neibours.push(map[y][x+1]);
		neibours.push(map[y+1][x]);
	}
	
	return neibours;
}

function fieldHoover(t)
{
	var terrainX = Number(this.getAttribute("data-x"));
	var terrainY = Number(this.getAttribute("data-y"));

	radio('fieldHoover').broadcast(Game.mapJson[terrainY][terrainX]);	
	
	if (Game.selectedUnit != null && (Game.selectedUnit.side == Game.currentSide))
	{
		var unitOnField = unitOnField = _.find(Game.jsonUnits, function(element) { return element.x == terrainX && element.y == terrainY && element.side != Game.currentSide; });
		
		if (unitOnField != null)
		{
			var route = RouteCalculator.GetRoute(this, addField);
			if (route != null && route.length <= UnitHelper.GetUnitMaxRange(Game.selectedUnit))
			{
				var gridGenerator = new GridGenerator();				
				var textNode = gridGenerator.GenrateMoveCost(route.length, terrainX, terrainY);
				$(textNode).click(attack);
				$(textNode).mouseleave(fieldOut);
				$("#map").append(textNode);
			
				var node = gridGenerator.GenerateAttackMarker(terrainX, terrainY);
				$(node).click(attack);
				$(node).mouseleave(fieldOut);
				$("#map").append(node);
			}
		}else
		{
			RouteDrawer.DrawRoute(this);
		}
	}
}

function attack(t)
{
	var terrainX = Number(this.getAttribute("data-x"));
	var terrainY = Number(this.getAttribute("data-y"));
	
	if (Game.selectedUnit != null && (Game.selectedUnit.side == Game.currentSide))
	{
		var unitOnField = unitOnField = _.find(Game.jsonUnits, function(element) { return element.x == terrainX && element.y == terrainY && element.side != Game.currentSide; });
		if (unitOnField != null)
		{
			var route = RouteCalculator.GetRoute(this, addField);
			if (route.length == 1)
			{
				var attackCost = TerrainHelper.GetMoveCost(route[0]) + 1;
				if (attackCost <= Game.selectedUnit.move)
				{
					var result = BattleManager.DirectFight(Game.selectedUnit, unitOnField);
					radio('battleResultModal').broadcast(result);
					$('#battleResult').modal('show');
					
					if (UnitHelper.GetUnitStrength(Game.selectedUnit) <= 0) removeUnit(Game.selectedUnit); else redrawUnit(Game.selectedUnit);
					if (UnitHelper.GetUnitStrength(unitOnField) <= 0) {
						removeUnit(unitOnField); 
						moveUnit(Game.selectedUnit, unitOnField.x, unitOnField.y);
					}
					else redrawUnit(unitOnField);
					
					Game.selectedUnit = null;
					
					radio('unitSelected').broadcast(null);
				}
				else
				{
					alert('cannot attack - move points not enough');
				}
			}else
			{
				if (route.length <= UnitHelper.GetUnitMaxRange(Game.selectedUnit) && Game.selectedUnit.move >= 2)
				{
					var result = BattleManager.RangeFight(Game.selectedUnit, unitOnField, route.length, 2);
					radio('battleResultModal').broadcast(result);
					$('#battleResult').modal('show');
					
					if (UnitHelper.GetUnitStrength(Game.selectedUnit) <= 0) removeUnit(Game.selectedUnit); else redrawUnit(Game.selectedUnit);
					if (UnitHelper.GetUnitStrength(unitOnField) <= 0) {
						removeUnit(unitOnField); 
					}
					else redrawUnit(unitOnField);
					
					radio('unitSelected').broadcast(Game.selectedUnit);
				}else
				{
					alert('cannot attack - move points not enough');
				}
			}
		}
	}
}

function fieldOut()
{
	$(".route").remove();
	$(".attack-marker").remove();
	$(".routeCost").remove();
}

function addFieldIfEmpty(array, arrayToRemove, x, y)
{
	var field = _.find(arrayToRemove, function(mapElement) {
		return mapElement.x == x && mapElement.y == y
			&& _.find(Game.jsonUnits, function(unit) { return unit.x == x && unit.y == y; }) == null;
	});
	
	if (field != null)
	{
		array.push(field);
	}
}

function addField(array, arrayToRemove, x, y)
{
	var field = _.find(arrayToRemove, function(mapElement) {
		return mapElement.x == x && mapElement.y == y;
	});
	
	if (field != null)
	{
		array.push(field);
	}
}

function fieldClick(t) { 
	fieldOut();
 	var x = this.getAttribute("data-x");
	var y = this.getAttribute("data-y");
	
	if (Game.selectedUnit != null)
	{
		if (Game.selectedRoute != null)
		{
			moveUnit(Game.selectedUnit, x, y);
			var totalCost = 0;
			_.each(Game.selectedRoute, function(field)
			{
				totalCost += TerrainHelper.GetMoveCost(field);
			});
			Game.selectedUnit.move -= totalCost;
			Game.selectedUnit = null;
			Game.selectedRoute = null;
			
			radio('unitSelected').broadcast(null);
		}
		else
		{
			
		}
	}else
	{
		alert("X " + x + " Y " + y);
	}
}

function loadScenario(scenarioName)
{
	window.gameData = [];
	
	loadJSONFile(scenarioName, 'units');
	loadJSONFile(scenarioName, 'map');
	loadJSONFile(scenarioName, 'victory');
	loadJSONFile(scenarioName, 'scenario');
}

function loadJSONFile(scenarioName, fileType)
{
	var request = $.ajax({
	  url: 'loader.php?scenarioName=' + scenarioName + '&fileType=' + fileType,
	  method: "GET",
	  dataType: "html"
	}).done(function( data ) {
	  window.gameData[fileType] = eval(data);
	  radio('scenarioLoaded').broadcast(null);
	});
}

function InitScenario()
{
	if (window.gameData != null && window.gameData['map'] != null && window.gameData['map'].length > 0 
		&& window.gameData['units'] != null && window.gameData['units'].length > 0
		&& window.gameData['victory'] != null && window.gameData['victory'].length > 0
		&& window.gameData['scenario'] != null && window.gameData['scenario'].length > 0)
	{
		MapDrawer.ClearMap();
		
		if (window.gameData['scenario'][0].equipment == 'napoleon')
		{
			window.equipmentJson = napoleonJson;
		}
		else if (window.gameData['scenario'][0].equipment == 'ww2')
		{
			window.equipmentJson = ww2Json;
		}
		
		Game.Initialize(window.gameData['map'], window.gameData['units'], window.gameData['victory'], window.gameData['scenario'][0]);
		ActionManager.Init();
	}
}

$(document).ready(function() {
	radio('scenarioLoaded').subscribe(InitScenario);
	
	loadScenario('Mokra_1939');
	//loadScenario('tutorial');
	
	
});