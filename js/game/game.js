var Game = new function() {
	this.mapJson = null;
	this.jsonUnits = null;
	this.victoryJson = null;
	this.scenarioJson = null;
    this.selectedUnit = null;
	this.selectedRoute = null;
	this.currentSide = null;
	this.currentTurn = null;
	this.lastTurn = null;
	
    this.Initialize = function(mapJson, jsonUnits, victoryJson, scenarioJson) {
		Game.mapJson = mapJson;
		Game.jsonUnits = jsonUnits;
		Game.victoryJson = victoryJson;
		Game.scenarioJson = scenarioJson;
		
        Game.lastTurn = scenarioJson.lastTurn;
		Game.currentTurn = scenarioJson.currentTurn;
		Game.currentSide = scenarioJson.currentSide;
		
		Game.DrawMap();
		Game.DrawVictoryLocations();
		Game.DrawUnits(Game.currentSide);
		
		alert(scenarioJson.name + ' - ' + scenarioJson.description);
	}
	
	this.DrawMap = function()
	{
		MapDrawer.DrawMap(this.mapJson);
	}
	
	this.DrawVictoryLocations = function()
	{
		var unitGenerator = new UnitGenerator();
		unitGenerator.Init("map");
		
		_.each(Game.victoryJson, function(element) {
			unitGenerator.DrawVictoryLocation(element);
		});
		
	}
	
	this.DrawUnits = function(side)
	{
		var unitGenerator = new UnitGenerator();
		unitGenerator.Init("map");
		
		_.each(Game.jsonUnits, function(element) {
			if (UnitHelper.GetUnitStrength(element) > 0)
			{
				element.move = UnitHelper.GetUnitMoves(element);
				
				if (element.side == Game.currentSide)
				{
					unitGenerator.DrawUnit(element, selectUnit, Game.scenarioJson);
				}else
				{
					unitGenerator.DrawEnemyUnit(element, selectEnemyUnit, Game.scenarioJson);
				}
			}
		});
	}
	
	this.ClearAllUnits = function()
	{
		var unitGenerator = new UnitGenerator();
		unitGenerator.Init("map");
		
		_.each(Game.jsonUnits, function(element) {
			unitGenerator.RemoveUnitFromMap(element.id);
		});
	}
	
	this.ChangeUnitView = function()
	{
		if (Game.scenarioJson.unitView == 'icos') Game.scenarioJson.unitView = 'nato';
		else Game.scenarioJson.unitView = 'icos';
		
		Game.ClearAllUnits();
		Game.DrawUnits();
	}
	
	this.EndTurn = function()
	{
		if (confirm('Are you sure you want to end your turn?')) {
			Game.ClearAllUnits();
			Game.ChangeTurn();
		}
	}
	
	this.ChangeTurn = function()
	{
		if (Game.currentSide == 1)
		{
			Game.currentSide++;
		}else
		{
			if (Game.currentTurn < Game.lastTurn)
			{
				Game.currentSide--;
				Game.currentTurn++;
			}else
			{
				var result = Game.PrepareScenarioResult();
				radio('scenarioEnd').broadcast(result);
				$('#scenarioResult').modal('show');
				return;
			}
		}
		
		alert('Prepare player units');
		Game.DrawUnits(Game.currentSide);
	}
	
	this.EndScenario = function()
	{
		var result = Game.PrepareScenarioResult();
		radio('scenarioEnd').broadcast(result);
		$('#scenarioResult').modal('show');
	}
	
	this.PrepareScenarioResult = function()
	{
		var scenrioResult = {};
		
		scenrioResult.player1Units = Game.GetSideUnits(1);
		scenrioResult.player2Units = Game.GetSideUnits(2);
		
		scenrioResult.player1VictoryPoints = Game.SumVictoryPointsFromFields(1);
		scenrioResult.player2VictoryPoints = Game.SumVictoryPointsFromFields(2);
		
		scenrioResult.player1TotalPoints = scenrioResult.player1VictoryPoints + Game.SumPlayerPoints(scenrioResult.player2Units);
		scenrioResult.player2TotalPoints = scenrioResult.player2VictoryPoints + Game.SumPlayerPoints(scenrioResult.player1Units);
		
		if (scenrioResult.player1TotalPoints == scenrioResult.player2TotalPoints) 
		{
			scenrioResult.result = 0;
		}
		else if(scenrioResult.player1TotalPoints >= scenrioResult.player2TotalPoints)
		{
			scenrioResult.result = 1;
		}
		else
		{
			scenrioResult.result = 2;
		}
		
		return scenrioResult;
	}
	
	this.SumVictoryPointsFromFields = function(sideId)
	{
		var points = 0;
		var playerOwns = _.filter(this.victoryJson, function(field){ return field.owner == sideId; });
		
		if (playerOwns != null)
		{
			_.each(playerOwns, function(element) {
				points += element.victoryPoints;
			});
		}
		
		return points;
	}
	
	this.SumPlayerPoints = function(opponentUnits)
	{	
		var pointsForDestoyedUnit = 2;
		
		var points = 0;
		var lostPower = 0;
		
		_.each(opponentUnits, function(element) {
			if (UnitHelper.GetUnitStrength(element) <= 0)
			{
				points += pointsForDestoyedUnit;
			}
		});
		
		return points;
	}
	
	this.GetSideUnits = function(sideId)
	{
		var units = _.filter(this.jsonUnits, function(element){ return element.side == sideId; });
		return units;
	}
}