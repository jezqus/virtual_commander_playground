var napoleonJson = [	 
	{ 'id': 0, 'name': 'Command', 'unitType': 0, 'strength': 0.8, 'softAttack': 0.7, 'defensiveness': 1, 'range': 1, 'move': 6 }, 
	{ 'id': 1, 'name': 'Civilians', 'unitType': 0, 'strength': 0.5, 'softAttack': 0.2, 'defensiveness': 0.4, 'range': 1, 'move': 4 }, 
	{ 'id': 2, 'name': 'Volunteers', 'unitType': 0, 'strength': 0.7, 'softAttack': 0.6, 'defensiveness': 0.6, 'range': 1, 'move': 4 },
	{ 'id': 3, 'name': 'Kosynierzy', 'unitType': 0, 'strength': 0.6, 'softAttack': 0.4, 'defensiveness': 0.6, 'range': 1, 'move': 5 },
	{ 'id': 4, 'name': 'Militia', 'unitType': 0, 'strength': 0.8, 'softAttack': 0.8, 'defensiveness': 0.8, 'range': 1, 'move': 4 },
	{ 'id': 5, 'name': 'Light infantry', 'unitType': 0, 'strength': 0.9, 'softAttack': 1, 'defensiveness': 1, 'range': 1, 'move': 4 },
	{ 'id': 6, 'name': 'Line infantry', 'unitType': 0, 'strength': 1, 'softAttack': 1.2, 'defensiveness': 1.2, 'range': 1, 'move': 4 },
	{ 'id': 7, 'name': 'Grenadier', 'unitType': 0, 'strength': 1.1, 'softAttack': 1.4, 'defensiveness': 1.2, 'range': 1, 'move': 3 },
	{ 'id': 8, 'name': 'Guards', 'unitType': 0, 'strength': 1.1, 'softAttack': 1.4, 'defensiveness': 1.4, 'range': 1, 'move': 4 },
	
	{ 'id': 9, 'name': 'Volunteers cavalry', 'unitType': 1, 'strength': 0.8, 'softAttack': 0.9, 'defensiveness': 0.5, 'range': 1, 'move': 7 },
	{ 'id': 10, 'name': 'Light cavalry', 'unitType': 1, 'strength': 1, 'softAttack': 1, 'defensiveness': 0.7, 'range': 1, 'move': 7 },
	{ 'id': 11, 'name': 'Hussar', 'unitType': 1, 'strength': 1, 'softAttack': 1.1, 'defensiveness': 0.8, 'range': 1, 'move': 7 },
	{ 'id': 12, 'name': 'Lancer', 'unitType': 1, 'strength': 1, 'softAttack': 1.3, 'defensiveness': 0.8, 'range': 1, 'move': 7 },
	{ 'id': 13, 'name': 'Dragoon', 'unitType': 1, 'strength': 1.1, 'softAttack': 1.1, 'defensiveness': 1.2, 'range': 1, 'move': 6 },
	{ 'id': 14, 'name': 'Cuirassier', 'unitType': 1, 'strength': 1.2, 'softAttack': 1.2, 'defensiveness': 1, 'range': 1, 'move': 6 },
	{ 'id': 15, 'name': 'Cuirassier', 'unitType': 1, 'strength': 1.2, 'softAttack': 1.2, 'defensiveness': 1, 'range': 1, 'move': 6 },
	
	{ 'id': 16, 'name': '3-pounds gun', 'unitType': 2, 'strength': 0.6, 'softAttack': 1.2, 'defensiveness': 0.7, 'range': 2, 'move': 3 },
	{ 'id': 17, 'name': '3-pounds horse gun', 'unitType': 2, 'strength': 0.7, 'softAttack': 1.2, 'defensiveness': 0.7, 'range': 2, 'move': 5 },
	{ 'id': 18, 'name': '4-pounds gun', 'unitType': 2, 'strength': 0.6, 'softAttack': 1.3, 'defensiveness': 0.8, 'range': 2, 'move': 3 },
	{ 'id': 19, 'name': '4-pounds horse gun', 'unitType': 2, 'strength': 0.7, 'softAttack': 1.3, 'defensiveness': 0.8, 'range': 2, 'move': 4 },
	{ 'id': 20, 'name': '6-pounds gun', 'unitType': 2, 'strength': 0.7, 'softAttack': 1.4, 'defensiveness': 0.9, 'range': 3, 'move': 2 },
	{ 'id': 21, 'name': '6-pounds horse gun', 'unitType': 2, 'strength': 0.8, 'softAttack': 1.4, 'defensiveness': 0.9, 'range': 3, 'move': 4 },
	{ 'id': 22, 'name': '8-pounds Gun', 'unitType': 2, 'strength': 0.8, 'softAttack': 1.4, 'defensiveness': 1, 'range': 4, 'move': 2 },
	{ 'id': 23, 'name': '12-pounds Gun', 'unitType': 2, 'strength': 0.8, 'softAttack': 1.5, 'defensiveness': 0.9, 'range': 4, 'move': 2 },
	{ 'id': 24, 'name': '24-pounds Gun', 'unitType': 2, 'strength': 0.8, 'softAttack': 1.5, 'defensiveness': 0.8, 'range': 5, 'move': 2 },
];

function PrintNapEq()
{
	for(var index = 0; index < napoleonJson.length; index++)
	{
		var element = napoleonJson[index];
		var format = 'context.EquipmentList.Add(new Models.Equipment() { EquipmentId = ' + element.id + ', Name = "' + element.name + '", Epoque = "Napoleon", UnitType = context.UnitTypes.Find(' + element.unitType + '), Strength = ' + element.strength + ', Defensiveness = ' + element.defensiveness + ', SoftAttack = ' + element.softAttack + ', Range = ' + element.range + ', Move = ' + element.move + ' });';
		
		console.log(format);
	}
}