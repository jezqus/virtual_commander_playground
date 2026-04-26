function Polygon() {
    this.pointList = [];
    this.node = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    this.build = function() {
        var res = [];
        for (var i=0,l=this.pointList.length;i<l;i++) 
		{
            res.push(this.pointList[i].join(','));
        }
		
        var pointsAttrString = res.join(' ');
		this.node.setAttribute('points', pointsAttrString);
		
		return this.node;
    }
	
	this.setPoints = function()
	{
		for (var i=0,l=arguments.length;i<l;i+=2) 
		{
          this.pointList.push([arguments[i],arguments[i+1]]);
		}
	}
};

function Image() {
	this.node = document.createElementNS('http://www.w3.org/2000/svg','image');
    this.build = function(src, width, height, x, y) {
		this.node.setAttribute('width', width);
		this.node.setAttribute('height', height);
		this.node.setAttribute('x', x);
		this.node.setAttribute('y', y);
		this.node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', src);
		
		return this.node;
    }
}

function Text() {
	this.node = document.createElementNS('http://www.w3.org/2000/svg','text');
    this.build = function(text, color, x, y) {
		this.node.setAttribute('x', x);
		this.node.setAttribute('y', y);
		this.node.setAttribute('fill', color);
		this.node.textContent = text;
		return this.node;
    }
}