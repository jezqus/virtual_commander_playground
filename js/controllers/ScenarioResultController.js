app.controller('ScenarioResultController', ['$scope', function($scope) { 
	
	$scope.GetStatus = function(element)
	{
		if (UnitHelper.GetUnitStrength(element) <= 0) return ' - destroyed';
		else return ' - operational';
	}
	
	function InitScope(scenarioResult)
	{
		if (scenarioResult != null)
		{
			$scope.winner = GetWinner(scenarioResult);
			$scope.player1Units = scenarioResult.player1Units;
			$scope.player2Units = scenarioResult.player2Units;
			$scope.player1VictoryPoints = scenarioResult.player1VictoryPoints;
			$scope.player2VictoryPoints = scenarioResult.player2VictoryPoints;
			$scope.player1TotalPoints = scenarioResult.player1TotalPoints;
			$scope.player2TotalPoints = scenarioResult.player2TotalPoints;
		}
	}
	
	InitScope(null);
	
	function GetWinner(scenarioResult)
	{
		switch(scenarioResult.result)
		{
			case 0:
				return 'Result - draw';
			case 1:
				return 'Player 1(red) has won battle';
			case 2:
				return 'Player 2(blue) has won battle';
			default:
				return '?';
		}
	}
  
	function ScenarioResult(scenarioResult)
	{
		InitScope(scenarioResult);
		$scope.$apply();
	}
  
	radio('scenarioEnd').subscribe(ScenarioResult);
}]);