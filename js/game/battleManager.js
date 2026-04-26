var BattleManager = new function() {
	
	this.ApplyLooses = function(unit, lost)
	{
		var totalpower = UnitHelper.GetUnitStrength(unit);
		
		var currentEq = [];
		_.each(unit.equipment, function(eq) {
			
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			var sum = (eq.num * eqDef.strength);
			
			var part = (sum / totalpower) * lost;
			var numberOfDestroyed = Math.round(part / eqDef.strength);
			eq.num = eq.num > numberOfDestroyed ? eq.num - numberOfDestroyed : 0;
			var eqResult = {'name': eqDef.name, 'id': eqDef.id, 'max': eq.maxNum, 'num': eq.num, 'lost': numberOfDestroyed };
			currentEq.push(eqResult);
		});
		
		return currentEq;
	}
	
	this.DirectFight = function(selectedUnit, unitOnField)
	{
		var attackPower = UnitHelper.GetUnitAttack(selectedUnit);
		var defensePower = UnitHelper.GetUnitDefense(unitOnField);
		
		var defenderMapField = Game.mapJson[unitOnField.y][unitOnField.x];
		var attackerMapField = Game.mapJson[selectedUnit.y][selectedUnit.x];
		
		var attackerImpact = Math.random() * attackPower * (0.4 - (TerrainHelper.GetTerrainBonus(defenderMapField) + unitOnField.fortify)/10);
		var defenderImpact = Math.random() * defensePower * (0.4 - TerrainHelper.GetTerrainAttackerBonus(attackerMapField)/10);
		
		var attackCost = TerrainHelper.GetMoveCost(defenderMapField) + 1;
		
		var battleResult = {
			'attackerName': selectedUnit.name,
			'attackerType': selectedUnit.type,
			'attackerPower': attackPower,
			'defenderName': unitOnField.name,
			'defenderType': unitOnField.type,
			'defenderPower': defensePower,
			'defenderLose': Math.ceil(attackerImpact),
			'attackerLose': Math.ceil(defenderImpact),
			'attackCost': attackCost
		};

		battleResult.eqDefender = BattleManager.ApplyLooses(unitOnField, attackerImpact);
		battleResult.eqAttacker = BattleManager.ApplyLooses(selectedUnit, defenderImpact);
		selectedUnit.move -= attackCost;
		
		if (UnitHelper.GetUnitStrength(selectedUnit) <= 0) 
		{
			battleResult.result = "Attacker destroyed";
		}
		else if (UnitHelper.GetUnitStrength(unitOnField) <= 0) 
		{
			battleResult.result = "Defender destroyed";
		}else
		{
			battleResult.result = "Defender hold position";
		}

		return battleResult;
	}
	
	this.RangeFight = function(selectedUnit, unitOnField, range, cost)
	{
		var attackPower = UnitHelper.GetUnitAttack(selectedUnit);
		
		var defenderMapField = Game.mapJson[unitOnField.y][unitOnField.x];
		
		var attackerImpact = Math.random() * attackPower * (0.6 - (TerrainHelper.GetTerrainBonus(defenderMapField) + unitOnField.fortify)/10);
		attackerImpact = attackerImpact * (10 - (range*2 - 2))/10; //R1 = 100% R2 = 80% R3 = 60% ... R5 = 20% dlatego jest mod 0.6 a nie 0.5 czy 0.4
		var battleResult = {
			'attackerName': selectedUnit.name,
			'attackerType': selectedUnit.type,
			'attackerPower': attackPower,
			'defenderName': unitOnField.name,
			'defenderType': unitOnField.type,
			'defenderPower': '?',
			'defenderLose': Math.ceil(attackerImpact),
			'attackerLose': 0,
			'attackCost': cost
		};
		
		battleResult.eqDefender = BattleManager.ApplyLooses(unitOnField, attackerImpact);
		battleResult.eqAttacker = BattleManager.ApplyLooses(selectedUnit, 0);
		
		if (UnitHelper.GetUnitStrength(selectedUnit) <= 0) 
		{
			battleResult.result = "Attacker destroyed";
		}
		else if (UnitHelper.GetUnitStrength(unitOnField) <= 0) 
		{
			battleResult.result = "Defender destroyed";
		}else
		{
			battleResult.result = "Defender hold position";
		}
		
		selectedUnit.move -= cost;

		return battleResult;
	}
	
	this.GetNiebourhoudBattle = function(map, x , y)
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
}