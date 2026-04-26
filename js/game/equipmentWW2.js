var ww2Json = [	 
	{ 'id': 0, 'name': 'Command', 'unitType': 0, 'strength': 0.8, 'softAttack': 0.7, 'defensiveness': 1, 'range': 1, 'move': 6 }, 
	{ 'id': 1, 'name': 'Civilians', 'unitType': 0, 'strength': 0.5, 'softAttack': 0.2, 'defensiveness': 0.4, 'range': 1, 'move': 4 }, 
	{ 'id': 2, 'name': 'Irregulars', 'unitType': 0, 'strength': 0.8, 'softAttack': 0.6, 'defensiveness': 0.8, 'range': 1, 'move': 5 },
	{ 'id': 3, 'name': 'Infantry', 'unitType': 0, 'strength': 1, 'softAttack': 0.9, 'defensiveness': 1, 'range': 1, 'move': 5 },
	{ 'id': 4, 'name': 'Pioniers', 'unitType': 0, 'strength': 1, 'softAttack': 1.2, 'defensiveness': 1.1, 'range': 1, 'move': 5 },
	{ 'id': 5, 'name': 'Heavy Machine Gun', 'unitType': 0, 'strength': 0.8, 'softAttack': 1, 'defensiveness': 1.4, 'range': 1, 'move': 5 },
	
	{ 'id': 6, 'name': 'Cavalry', 'unitType': 1, 'strength': 1, 'softAttack': 1.1, 'defensiveness': 1, 'range': 1, 'move': 7 },	

	{ 'id': 7, 'name': '75mm gun', 'unitType': 2, 'strength': 2, 'softAttack': 1.5, 'defensiveness': 0.8, 'range': 5, 'move': 5 },
	{ 'id': 8, 'name': '37mm AT gun', 'unitType': 2, 'strength': 1.6, 'softAttack': 1.2, 'defensiveness': 1.6, 'range': 2, 'move': 5 },
	
	{ 'id': 9, 'name': 'Pz I', 'unitType': 3, 'strength': 2.0, 'softAttack': 1.3, 'defensiveness': 1.3, 'range': 1, 'move': 9 },
	{ 'id': 10, 'name': 'Pz II', 'unitType': 3, 'strength': 2.2, 'softAttack': 1.5, 'defensiveness': 1.4, 'range': 1, 'move': 9 },
	{ 'id': 11, 'name': 'Pz III', 'unitType': 3, 'strength': 2.3, 'softAttack': 1.6, 'defensiveness': 1.5, 'range': 1, 'move': 8 },
	{ 'id': 12, 'name': 'Pz IV', 'unitType': 3, 'strength': 2.4, 'softAttack': 1.7, 'defensiveness': 1.6, 'range': 1, 'move': 8 },
	{ 'id': 13, 'name': 'Sd.Kfz. 231', 'unitType': 3, 'strength': 1.8, 'softAttack': 1.2, 'defensiveness': 1.1, 'range': 1, 'move': 8 },
	{ 'id': 14, 'name': 'TKS', 'unitType': 3, 'strength': 2.0, 'softAttack': 1.4, 'defensiveness': 1.5, 'range': 1, 'move': 9 },
	{ 'id': 15, 'name': 'Wz.34', 'unitType': 3, 'strength': 1.8, 'softAttack': 1.3, 'defensiveness': 1.2, 'range': 1, 'move': 8 }
];

function PrintWW2Eq()
{
	for(var index = 0; index < ww2Json.length; index++)
	{
		var element = ww2Json[index];
		var format = 'context.EquipmentList.Add(new Models.Equipment() { EquipmentId = ' + element.id + ', Name = ' + element.name + ', Epoque = "WWII", UnitType = context.UnitTypes.Find(' + element.unitType + '), Strength = ' + element.strength + ', Defensiveness = ' + element.defensiveness + ', SoftAttack = ' + element.softAttack + ', Range = ' + element.range + ', Move = ' + element.move + ' });';
		
		console.log(format);
	}
}

function ShowVictory()
{
	var victoryList = Game.victoryJson;
	for(var index = 0; index < 4; index++)
	{
		console.log('victoryPoints.Add(new VictoryPoint() { VictoryPointId = ' + victoryList[index].id + ', PositionX = ' + victoryList[index].x + ', PositionY = ' + victoryList[index].y + ', VictoryPoints = ' + victoryList[index].victoryPoints + '})');
	}
}

function ViewMap()
{
	var mapFields = Game.mapJson;
	var index = 0;
	for(var i= 0;i < mapFields.length; i++)
	{
		for(var j = 0; j < mapFields[i].length; j++)
		{
			console.log('map.Fields.Add(new MapField() { FieldId = '+ index +', Map = map, PositionX = '+ mapFields[i][j].x +', PositionY = '+ mapFields[i][j].y +', River = ' + GetMappedElement(mapFields[i][j].river) + ', Road = ' + GetMappedElement(mapFields[i][j].road) + ', Terrain = context.Terrain.Find('+ mapFields[i][j]['terrain-id'] +') });');
			index++;
		}
	}
}

function UnmapElement(number)
{
	var terrain = [0, 0, 0, 0, 0, 0];
	for(var i = 6; i > 0; i--)
	{
		terrain[i-1] = Math.floor(number / Math.pow(2, i));
		number = number % Math.pow(2, i);
	}
	
	return terrain;
}

function GetMappedElement(array)
{
	if (array != null)
	{
		//2 4 8 16 32 64 128 256
		var result = 0;
		for(var i = 0; i < array.length; i++)
		{
			if (array[i] == 1) result += Math.pow(2, i + 1);
		}
		
		return result;
	}else
	{
		return 0;
	}
}

function ExportUnits()
{
	var units = Game.jsonUnits;
	for(var i = 0; i < units.length; i++)
	{
		var unit = units[i];
		var unitEntry = 'scenarioUnits.Add(new ScenarioUnit() { Name = "' + unit.name + '", PositionX = ' + unit.x + ', PositionY = ' + unit.y + ', UnitEquipment = new List<UnitEquipment>() });';
		console.log(unitEntry);
		//Object { id: 56, name: "2/21 Panc", side: 2, x: 14, y: 6, unitType: 6, equipment: Array[1], fortify: 1, move: 8 }
		for(var j = 0; j < unit.equipment.length; j++)
		{
			var eq = unit.equipment[j];
			
			var unitEq = 'scenarioUnits[0].UnitEquipment.Add(new UnitEquipment() { EquipmentModel = context.EquipmentList.Find(' + eq.id + '), TotalNumber = ' + eq.maxNum + ', AcctualNumber = ' + eq.num + '});';
			console.log(unitEq);
		}
	}
}