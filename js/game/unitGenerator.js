function UnitGenerator() {
	this.mapElement = null;
	this.gridGenerator = null;
	
	this.Init = function(mapId)
	{
		this.mapElement = $("#" + mapId);
		this.gridGenerator = new GridGenerator();
	}
	
	this.GetUnitIco = function(unit)
	{
		switch(unit.unitType)
		{
			case 0:
				return 'images/units/icons/hq_' + unit.side + '.png';
			case 1:
				return 'images/units/icons/infantry.png';
			case 2:
				return 'images/units/icons/cavalry.png';
			case 3:
			case 4: 
				return 'images/units/icons/artillery.png'
			default:
				return '';
		}
	}
	
	this.DrawUnit = function(element, selectUnitMethod, scenarioConfiguration)
	{
		if (element.fortify == 1)
		{
			var fort = this.gridGenerator.GenerateFortification(element.id, 'fort.png', element.x, element.y);
			$(fort).click(selectUnitMethod);
			this.mapElement.append(fort);
		}
		
		var unit = null;
		var ico = null;
		if (scenarioConfiguration.unitView == 'nato')
		{
			var picture = 'images/units/' + scenarioConfiguration['side' + element.side] + '/' + 'unit_' + element.unitType + '.png'
			unit = this.gridGenerator.GenerateUnit(element.id, picture, element.x, element.y);
		}else if (scenarioConfiguration.unitView == 'icos')
		{
			var icoPicture = this.GetUnitIco(element);
			var picture = 'images/units/' + scenarioConfiguration['side' + element.side] + '/empty.png';
			unit = this.gridGenerator.GenerateUnit(element.id, picture, element.x, element.y);
			ico = this.gridGenerator.GenerateIco(element.id, icoPicture, element.x, element.y);
		}
		
		$(unit).click(selectUnitMethod);
		if (ico != null)
		{
			$(ico).click(selectUnitMethod);
		}
		
		var softAttack = Math.round(UnitHelper.GetUnitAttack(element));
		var unitAttack = this.gridGenerator.GenrateUnitAttack(element.id, softAttack, element.x, element.y);
		$(unitAttack).click(selectUnitMethod);
		
		var defensiveness = Math.round(UnitHelper.GetUnitDefense(element));
		var unitdefensiveness = this.gridGenerator.GenrateUnitDefensiveness(element.id, defensiveness, element.x, element.y);
		$(unitdefensiveness).click(selectUnitMethod);
		
		var unitSize = this.gridGenerator.GenrateUnitSize(element.id, "I", element.x, element.y);
		$(unitSize).click(selectUnitMethod);
		
		this.mapElement.append(unit);
		if (ico != null)
		{
			this.mapElement.append(ico);
		}
		this.mapElement.append(unitAttack);
		this.mapElement.append(unitdefensiveness);
		this.mapElement.append(unitSize);
	}
	
	this.DrawEnemyUnit = function(element, selectUnitMethod, scenarioConfiguration)
	{
		var unit = null;
		var ico = null;
		if (scenarioConfiguration.unitView == 'nato')
		{
			var picture = 'images/units/' + scenarioConfiguration['side' + element.side] + '/' + 'unit_' + element.unitType + '.png'
			unit = this.gridGenerator.GenerateUnit(element.id, picture, element.x, element.y);
		}else if (scenarioConfiguration.unitView == 'icos')
		{
			var icoPicture = this.GetUnitIco(element);
			var picture = 'images/units/' + scenarioConfiguration['side' + element.side] + '/empty.png';
			unit = this.gridGenerator.GenerateUnit(element.id, picture, element.x, element.y);
			ico = this.gridGenerator.GenerateIco(element.id, icoPicture, element.x, element.y);
		}
		
		$(unit).click(selectUnitMethod);
		if (ico != null)
		{
			$(ico).click(selectUnitMethod);
		}
		
		var unitSize = this.gridGenerator.GenrateUnitSize(element.id, "I", element.x, element.y);
		$(unitSize).click(selectUnitMethod);
		
		this.mapElement.append(unit);
		if (ico != null)
		{
			this.mapElement.append(ico);
		}
		this.mapElement.append(unitSize);
	}
	
	this.RemoveUnitFromMap = function(unitId)
	{
		var $unit = $("image[data-id='" + unitId + "']");
		$unit.remove();
		
		var $unit = $("image[data-fortificationId='" + unitId + "']");
		$unit.remove();
		
		var $unitTexts = $("text[data-id='" + unitId + "']");
		$unitTexts.remove();
	}
	
	this.DrawVictoryLocation = function(element)
	{
		var picture = "victory" + element.owner + ".png";
		var victoryImage = this.gridGenerator.GenerateVictoryImage(element.id, picture, element.x, element.y);
		$(victoryImage).click(fieldClick);
		$(victoryImage).mouseenter(fieldHoover);
		
		var victoryPoints = this.gridGenerator.GenrateVictoryPoints(element.id, element.victoryPoints, element.x, element.y);
		$(victoryPoints).click(fieldClick);
		$(victoryPoints).mouseenter(fieldHoover);
		
		this.mapElement.append(victoryImage);
		this.mapElement.append(victoryPoints);
	}
	
	this.RemoveVictoryFromMap = function(victoryId)
	{
		var $unit = $("image[data-victoryId='" + victoryId + "']");
		$unit.remove();
		
		var $unitTexts = $("text[data-victoryId='" + victoryId + "']");
		$unitTexts.remove();
	}
}