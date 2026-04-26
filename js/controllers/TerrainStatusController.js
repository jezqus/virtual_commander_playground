app.controller('TerrainStatusController', ['$scope', function($scope) { 
	InitScope(null)
	
	function InitScope(field)
	{
		$scope.type = field != null ? TerrainHelper.GetTerrainDesc(field) : null;
		$scope.moveCost = field != null ? TerrainHelper.GetMoveCost(field) : null;
		$scope.terrainImage = field != null ? TerrainHelper.GetTerrainImage(field) : null;
	}
  
	function Hoover(field)
	{
		InitScope(field);
		$scope.$apply();
	}

	radio('fieldHoover').subscribe(Hoover);
}]);	