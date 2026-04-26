var ActionManager = new function() {
	
	this.Init = function(){
		radio('reinforce').subscribe(ActionManager.ReinforceUnit);
		radio('fortify').subscribe(ActionManager.FortifyUnit);
	}
  
	this.ReinforceUnit = function(unit)
	{
		if (ActionManager.IsPossibleAction(unit))
		{
			// if (unit.strength <= unit.maxStrength-2)
			// {
				// unit.strength += 2;
			// }else
			// {
				// unit.strength = unit.maxStrength;
			// }
			
			// unit.move = 0;
			
			// redrawUnit(unit);
		}
		else
		{
			alert('Cannot make any action');
		}
	}
	
	this.FortifyUnit = function(unit)
	{
		if (ActionManager.IsPossibleAction(unit))
		{
			unit.fortify = 1;
			unit.move = 0;
			
			redrawUnit(unit);
		}
		else
		{
			alert('Cannot make any action');
		}
	}
	
	this.IsPossibleAction = function(unit)
	{
		return (unit.side == Game.currentSide && unit.move == UnitHelper.GetUnitMoves(unit));
	}
}