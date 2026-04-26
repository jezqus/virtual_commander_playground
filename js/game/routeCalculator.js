var RouteCalculator = new function() {
	
	this.GetRoute = function(fieldHoovered, addMethod)
	{
		Game.selectedRoute = null;
		var hoverX = Number(fieldHoovered.getAttribute("data-x"));
		var hoverY = Number(fieldHoovered.getAttribute("data-y"));
		var selectedx = Number(Game.selectedUnit.x);
		var selectedy = Number(Game.selectedUnit.y);
		
		if (hoverX != selectedx || selectedy != hoverY)
		{
			var fields = new Array();
			for (var i = 0; i < Game.mapJson.length; i++)
			{
				for(var j = 0; j <  Game.mapJson[i].length; j++)
				{
					fields.push(Game.mapJson[i][j]);
				}
			}
			
			var route = new Array();
			fields = RouteCalculator.removeField(fields, selectedx, selectedy);
			
			var startx = selectedx;
			var starty = selectedy;
			
			while(startx != hoverX || starty != hoverY)
			{
				var neibours = RouteCalculator.GetNiebourhoud(fields, startx, starty, addMethod);
				if (neibours != null && neibours.length > 0)
				{
					var isTarget = _.find(neibours, function(field){
						return field.x == hoverX && field.y == hoverY;
					});
					
					if (isTarget != null)
					{
						addMethod(route, neibours, isTarget.x, isTarget.y);
						break;
					}
					else 
					{
						_.each(neibours, function(elem) {
							fields = RouteCalculator.removeField(fields,elem.x, elem.y);
						});
					
						_.each(neibours, function(elem) {
							var moveCost = TerrainHelper.GetMoveCost(elem);
							elem.len = (Math.sqrt((hoverX - elem.x)*(hoverX - elem.x) + (hoverY - elem.y)*(hoverY - elem.y)) + moveCost);
						});	
						fieldOut();
						var sorted = _.sortBy(neibours, function(elem) {
							return elem.len;
						});
						
						addMethod(route, neibours, sorted[0].x, sorted[0].y);
						startx = sorted[0].x;
						starty = sorted[0].y;
					}
				}
				else
				{
					break;
				}
			}
			
			return route;
		}else
		{
			return null;
		}
	}
	
	this.removeField = function(arrayToRemove, x, y)
	{
		return _.reject(arrayToRemove, function(mapElement) { return mapElement.x == x && mapElement.y == y; });
	}
	
	this.GetNiebourhoud = function(arrayToRemove, x , y, addMethod)
	{
		var neibours = new Array();
		if (x % 2 != 0)
		{
			addMethod(neibours, arrayToRemove, x-1, y+1);
			addMethod(neibours, arrayToRemove, x, y+1);
			addMethod(neibours, arrayToRemove, x+1, y+1);
			addMethod(neibours, arrayToRemove, x-1, y);
			addMethod(neibours, arrayToRemove, x+1, y);
			addMethod(neibours, arrayToRemove, x, y-1);
		}else
		{
			addMethod(neibours, arrayToRemove, x-1, y-1);
			addMethod(neibours, arrayToRemove, x, y-1);
			addMethod(neibours, arrayToRemove, x+1, y-1);
			addMethod(neibours, arrayToRemove, x-1, y);
			addMethod(neibours, arrayToRemove, x+1, y);
			addMethod(neibours, arrayToRemove, x, y+1);
		}
		
		return neibours;
	}
}