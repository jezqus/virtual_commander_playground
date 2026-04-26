app.controller('UnitStatusController', ['$scope', function($scope) { 

	function InitScope(unit)
	{
		$scope.name = unit != null ? unit.name : null;
		$scope.attack = unit != null ? Math.round(UnitHelper.GetUnitAttack(unit)) : null;
		$scope.defense = unit != null ? Math.round(UnitHelper.GetUnitDefense(unit)) : null;
		$scope.moves = unit != null ? unit.move : null;
		$scope.range = unit != null ? UnitHelper.GetUnitMaxRange(unit) : null;
		$scope.fortify = unit != null ? (unit.fortify == 1 ?  'F' : null): null;
	}
	
	InitScope(Game.selectedUnit);
  
	$scope.Reinforce = function(){
    	radio('reinforce').broadcast(Game.selectedUnit);
		InitScope(Game.selectedUnit);
	}
  
	$scope.Fortify = function(){
    	radio('fortify').broadcast(Game.selectedUnit);
		InitScope(Game.selectedUnit);
	}
  
	$scope.Details = function() {
		$('#unitDetails').modal('show');
	}
  
	function UnitSelected(unit)
	{
		InitScope(unit);
		$scope.$apply();
	}
	
	function EnemyUnitSelected(unit)
	{
		$scope.name = unit != null ? unit.name : null;
		$scope.attack = '?';
		$scope.defense = unit != null ? (Math.round(UnitHelper.GetUnitDefense(unit)) > 5 ? 'strong' : 'weak') : null;
		$scope.moves = unit != null ? (unit.move > 5 ? 'fast' : 'slow') : null;
		$scope.range = '?';
		$scope.fortify = '';
		$scope.$apply();
	}
  
	radio('unitSelected').subscribe(UnitSelected);
	radio('enemyUnitSelected').subscribe(EnemyUnitSelected);
}]);