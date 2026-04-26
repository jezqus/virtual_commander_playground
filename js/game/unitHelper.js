var UnitHelper = new function()
{
	this.GetEqDefinition = function(eqId)
	{
		return _.find(equipmentJson, function(eq) { 
			return eq.id == eqId; 
		});
	}
	
	this.GetUnitAttack = function(unit)
	{
		var sum = 0;
		_.each(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			sum += (eq.num * eqDef.softAttack);
		});
		
		return sum;
	}
	
	this.GetUnitDefense = function(unit)
	{
		var sum = 0;
		_.each(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			sum += (eq.num * eqDef.defensiveness);
		});
		
		return sum;
	}
	
	this.GetUnitStrength = function(unit)
	{
		var sum = 0;
		_.each(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			sum += (eq.num * eqDef.strength);
		});
		
		return sum;
	}
	
	this.GetUnitMoves = function(unit)
	{
		var minMove = _.min(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			return eqDef.move;
		});
		var eqDef = UnitHelper.GetEqDefinition(minMove.id);
		
		return eqDef.move;
	}

	this.GetUnitMaxRange = function(unit)
	{
		var eqMaxRange = _.max(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			return eqDef.range;
		});
		var eqDef = UnitHelper.GetEqDefinition(eqMaxRange.id);
		return eqDef.range;
	}
	
	this.GetUnitPowerOnRange = function(range, unit)
	{
		var sum = 0;
		_.each(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			if (eqDef.range >= range)
			{
				sum += (eqDef.softAttack * (1 - range/10));
			}
		});
		
		return move;
	}
	
	this.GetEqDetails = function(unit)
	{
		var equipment = [];
		var eqMaxRange = _.each(unit.equipment, function(eq) {
			var eqDef = UnitHelper.GetEqDefinition(eq.id);
			var eqEntry = { 'name': eqDef.name, 'num': eq.num, 'max': eq.maxNum, 'def': eqDef }; 
			equipment.push(eqEntry);
		});
		
		return equipment;
	}
}