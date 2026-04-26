app.controller('BattleResultController', ['$scope', function($scope) { 
	function InitScope(battleResult)
	{	
		$scope.battleResult = battleResult;
	}
	
	InitScope(null);
  
	function BattleResult(battleResult)
	{
		InitScope(battleResult);
		$scope.$apply();
	}
  
	radio('battleResultModal').subscribe(BattleResult);
}]);