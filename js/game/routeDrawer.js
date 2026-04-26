var RouteDrawer = new function() {
	this.DrawRoute = function(fieldHoovered)
	{
		var route = RouteCalculator.GetRoute(fieldHoovered, addFieldIfEmpty)
		if (route != null)
		{
			var hoverX = Number(fieldHoovered.getAttribute("data-x"));
			var hoverY = Number(fieldHoovered.getAttribute("data-y"));
			
			var totalCost = 0;
			_.each(route, function(field)
			{
				totalCost += TerrainHelper.GetMoveCost(field);
			});
			
			if (totalCost <= Game.selectedUnit.move 
			&& route[route.length-1].x == hoverX && route[route.length-1].y == hoverY)
			{
				Game.selectedRoute = route;
				var gridGenerator = new GridGenerator();
				
				for(var i = 0; i < route.length; i++)
				{
					var moveCost = TerrainHelper.GetMoveCost(route[i]);
					var textNode = gridGenerator.GenrateMoveCost(moveCost, route[i].x, route[i].y);
					$(textNode).click(fieldClick);
					$(textNode).mouseleave(fieldOut);
					$("#map").append(textNode);
				
					var node = gridGenerator.GenerateRoute(route[i].x, route[i].y);
					$(node).click(fieldClick);
					$(node).mouseleave(fieldOut);
					$("#map").append(node);
				}
			}
		}
	}
}