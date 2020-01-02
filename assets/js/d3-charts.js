var gauge = function(container, configuration) {
	var that = {};
	var config = {
		size						: 200,
		clipWidth					: 200,
		clipHeight					: 110,
		padding						: 20,
		ringInset					: 20,
		ringWidth					: 20,
		
		pointerWidth				: 10,
		pointerTailLength			: 5,
		pointerHeadLengthPercent	: 0.75,
		
		minValue					: 0,
		maxValue					: 100,
		criteria					: '>=',
		
		minAngle					: -90,
		maxAngle					: 90,
		
		transitionMs				: 750,
		
		majorTicks					: 5,
		labelFormat					: d3.format(',g'),
		suffix						: '%',
		labelInset					: 10,
		
		arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
	};
	var range = undefined;
	var r = undefined;
	var pointerHeadLength = undefined;
	var value = 0;
	
	var svg = undefined;
	var arc = undefined;
	var scale = undefined;
	var ticks = undefined;
	var tickData = undefined;
	var pointer = undefined;
	var pointerTarget = undefined;

	var donut = d3.pie();
	
	function deg2rad(deg) {
		return deg * Math.PI / 180;
	}
	
	function newAngle(d) {
		var ratio = scale(d);
		var newAngle = config.minAngle + (ratio * range);
		return newAngle;
	}
	
	function configure(configuration) {
		var prop = undefined;
		for ( prop in configuration ) {
			config[prop] = configuration[prop];
		}
		
		range = config.maxAngle - config.minAngle;
		r = config.size / 2;
		pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

		// a linear scale that maps domain values to a percent from 0..1
		scale = d3.scaleLinear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
		ticks = scale.ticks(config.majorTicks);
		tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
		
		arc = d3.arc()
			.innerRadius(r - config.ringWidth - config.ringInset)
			.outerRadius(r - config.ringInset)
			.startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(config.minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(config.minAngle + (ratio * range));
			});
	}
	that.configure = configure;
	
	function centerTranslation() {
		return 'translate('+r +','+ (r+(config.padding)) +')';
	}
	
	function isRendered() {
		return (svg !== undefined);
	}
	that.isRendered = isRendered;
	
	function render(newValue, targetValue) {
		svg = d3.select(container)
			.append('svg:svg')
				.attr('class', 'gauge')
				.attr('width', config.clipWidth+config.padding)
				.attr('height', function(d){
					var height = undefined;
					if(config.minAngle >= -90 && config.maxAngle <= 90){						
						height = (config.clipHeight/2)+(config.padding*3);
					}
					else{
						height = config.clipHeight;
					}
					return height;
				});
		
		var centerTx = centerTranslation();
		
		var arcs = svg.append('g')
				.attr('class', 'arc')
				.attr('transform', centerTx);
		
		arcs.selectAll('path')
				.data(tickData)
			.enter().append('path')
				.attr('fill', function(d, i) {
					
					if(compare(parseInt(newValue), config.criteria, parseInt(targetValue))){
						if(config.criteria.indexOf('>') !== -1){
							color = d3.interpolateHsl(d3.rgb('#BFDBA1'), d3.rgb('#354D1D'));
						}
						else{
							color = d3.interpolateHsl(d3.rgb('#354D1D'), d3.rgb('#BFDBA1'));
						}
						// return '#84BB4C';
					}
					else{
						if(config.criteria.indexOf('>') !== -1){
							color = d3.interpolateHsl(d3.rgb('#E73A3A'), d3.rgb('#F6B4B4'));
						}
						else{
							color = d3.interpolateHsl(d3.rgb('#F6B4B4'), d3.rgb('#E73A3A'));							
						}
						// return '#ED6E6E';
					}
					return color(d * i);
				})
				.attr('d', arc);
		
		var lg = svg.append('g')
				.attr('class', 'label')
				.attr('transform', centerTx);

		lg.selectAll('text')
				.data(ticks)
			.enter().append('text')
				.attr('x', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					var polarAngle = undefined;
					
					if(newAngle == 0){
						polarAngle = 90;
					}
					else if(newAngle < 0 && newAngle >= -90) {
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle < -90 && newAngle >= -180){
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle > 0 && newAngle <= 90){
						polarAngle = 90-newAngle;
					}
					else if(newAngle > 90 && newAngle <= 180){
						polarAngle = 270+(180-newAngle);
					}
					var polarRadius = Math.abs(config.labelInset - r);
					
					var fax = polarRadius*Math.cos(polarAngle*(Math.PI/180));
					if(fax >= 0){
						fax += (d.toString().length*2);
					}
					else {
						fax -= (d.toString().length*2);
					}
					return fax;
				})
				.attr('y', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					var polarAngle = undefined;
					
					if(newAngle == 0){
						polarAngle = 90;
					}
					else if(newAngle < 0 && newAngle >= -90) {
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle < -90 && newAngle >= -180){
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle > 0 && newAngle <= 90){
						polarAngle = 90-newAngle;
					}
					else if(newAngle > 90 && newAngle <= 180){
						polarAngle = 270+(180-newAngle);
					}
					var polarRadius = Math.abs(config.labelInset - r);
					return -polarRadius*Math.sin(polarAngle*(Math.PI/180));
				})
				/* .attr('transform', function(d) {
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					
					var carteseanAngle = (config.maxAngle - config.minAngle) - (ratio * range);
					return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
				}) */
				.text(function(d){
					// config.labelFormat
					return d+config.suffix;
				});
				
		svg.append('g')
			.attr('class', 'target')
			.attr('transform', centerTx)
			.selectAll('text')
			.data([1,2]).enter()
			.append('text')
			.attr('x', function(d) {
					d = targetValue;
					var ratio = scale(d);
					var newAngle = config.minAngle + (ratio * range);
					var polarAngle = undefined;
					
					if(newAngle == 0){
						polarAngle = 90;
					}
					else if(newAngle < 0 && newAngle >= -90) {
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle < -90 && newAngle >= -180){
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle > 0 && newAngle <= 90){
						polarAngle = 90-newAngle;
					}
					else if(newAngle > 90 && newAngle <= 180){
						polarAngle = 270+(180-newAngle);
					}
					var polarRadius = Math.abs(config.labelInset - r);
					
					var fax = polarRadius*Math.cos(polarAngle*(Math.PI/180));
					if(fax >= 0){
						fax += (d.toString().length*2.5);
					}
					else {
						fax -= (d.toString().length*2.5);
					}
					return fax;
				})
				.attr('y', function(d) {
					
					var ratio = scale(targetValue);
					var newAngle = config.minAngle + (ratio * range);
					var polarAngle = undefined;
					
					if(newAngle == 0){
						polarAngle = 90;
					}
					else if(newAngle < 0 && newAngle >= -90) {
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle < -90 && newAngle >= -180){
						polarAngle = Math.abs(newAngle)+90;
					}
					else if(newAngle > 0 && newAngle <= 90){
						polarAngle = 90-newAngle;
					}
					else if(newAngle > 90 && newAngle <= 180){
						polarAngle = 270+(180-newAngle);
					}
					var polarRadius = Math.abs(config.labelInset - r);
					var fay = -polarRadius*Math.sin(polarAngle*(Math.PI/180));
					
					if(d==1)
						fay -= 19;
					else
						fay -= 4;
					
					return fay;
				})
				.text(function(d){
					if(d==1)
						return targetValue+config.suffix;
					else
						return 'Target';
				});
				
		svg.append('g')
			.attr('class', 'actual')
			.attr('transform', centerTx)
			.selectAll('text')
			.data([0]).enter()
			.append('text')
			.attr('x', 0)
			.attr('y', 20)
			.text(function(d){
				return newValue+config.suffix;
			})
			
		

		var lineData = [ [config.pointerWidth / 2, 0], 
						[0, -pointerHeadLength],
						[-(config.pointerWidth / 2), 0],
						[0, config.pointerTailLength],
						[config.pointerWidth / 2, 0] ];
		var pointerLine = d3.line().curve(d3.curveMonotoneX);
		var pg = svg.append('g').data([lineData])
				.attr('class', 'pointer')
				.attr('transform', centerTx);
				
		pointer = pg.append('path')
			.attr('d', pointerLine)
			.attr('transform', 'rotate(' +config.minAngle +')');
						
		var lineDataTarget = [ [0, -(r - config.ringWidth - config.ringInset)], 
						[0, -(r - config.ringInset + 10)],
						[(config.pointerWidth / 2), -(r - config.ringInset + 10)],
						[0, -(r - config.ringInset + 10)],
						[(config.pointerWidth / 2), -(r - config.ringInset + 10)]
						];
						
		var pointerLineTarget = d3.line().curve(d3.curveMonotoneX);
		var pgt = svg.append('g').data([lineDataTarget])
				.attr('class', 'target-pointer')
				.attr('transform', centerTx);
				
		pointerTarget = pgt.append('path')
			.attr('d', pointerLineTarget)
			.attr('transform', 'rotate(' +config.minAngle +')');
			
		update(newValue === undefined ? 0 : newValue, targetValue === undefined ? 95 : targetValue);
	}
	that.render = render;
	
	function update(newValue, targetValue, newConfiguration) {
		if ( newConfiguration  !== undefined) {
			configure(newConfiguration);
		}
		var ratio = scale(newValue);
		var newAngle = config.minAngle + (ratio * range);
		pointer.transition()
			.duration(config.transitionMs)
			.ease(d3.easeExp)
			.attr('transform', 'rotate(' +newAngle +')');
			
		var targetRatio = scale(targetValue);
		var targetAngle = config.minAngle + (targetRatio * range);
		pointerTarget.transition()
			.duration(config.transitionMs)
			.ease(d3.easeExp)
			.attr('transform', 'rotate(' +targetAngle +')');
	}
	
	function compare(post, operator, value) {
		switch (operator) {
			case '>':   return post > value;
			case '<':   return post < value;
			case '>=':  return post >= value;
			case '<=':  return post <= value;
			case '==':  return post == value;
			case '!=':  return post != value;
			case '===': return post === value;
			case '!==': return post !== value;
		}
	}

	that.update = update;

	configure(configuration);
	
	return that;
};


var bullet = function(container, config, data) {
	var config = config;
	var data = data;
	
	var width = config.width - config.left - config.right;
	var height = config.height - config.top - config.bottom;

	var chart = generateBullet()
		.width(width)
		.height(height);
		

	var svg = d3.select(container).selectAll("svg")
		  .data(data)
		.enter().append("svg")
		  .attr("class", "bullet")
		  .attr("width", width + config.left + config.right)
		  .attr("height", height + config.top + config.right)
		.append("g")
		  .attr("transform", "translate(" + config.bottom + "," + config.bottom + ")")
		  .call(chart);
	
	
	function generateBullet() {
	  var orient = "left", // TODO top & bottom
		  reverse = false,
		  duration = 0,
		  ranges = bulletRanges,
		  markers = bulletMarkers,
		  measures = bulletMeasures,
		  width = 380,
		  height = 30,
		  tickFormat = null;

	  // For each small multiple…
	  function bullet(g) {
		g.each(function(d, i) {
		  var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
			  markerz = markers.call(this, d, i).slice().sort(d3.descending),
			  measurez = measures.call(this, d, i).slice().sort(d3.descending),
			  g = d3.select(this);

		  // Compute the new x-scale.
		  var x1 = d3.scaleLinear()
			  .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
			  .range(reverse ? [width, 0] : [0, width]);

		  // Retrieve the old x-scale, if this is an update.
		  var x0 = this.__chart__ || d3.scaleLinear()
			  .domain([0, Infinity])
			  .range(x1.range());

		  // Stash the new scale.
		  this.__chart__ = x1;

		  // Derive width-scales from the x-scales.
		  var w0 = bulletWidth(x0),
			  w1 = bulletWidth(x1),
			  lw0 = bulletWidthLabel(x0),
			  lw1 = bulletWidthLabel(x1);

		  // Update the range rects.
		  var rg = g.append('g');
		  var rangeLabel = rg.selectAll("text.label")
						.data(rangez);
		  rangeLabel.enter().append('text')
				.attr('class', 'label')
				.attr('x', lw1)
				.attr('y', -config.left)
				.text(function(d){
					return config.rangeLabel+': '+d;
				});
		  
		  var range = rg.selectAll("rect.range")
						.data(rangez);

		  range.enter().append("rect")
			  .attr("class", function(d, i) { return "range s" + i; })
			  .attr("width", w0)
			  .attr("height", height)
			  .attr("x", reverse ? x0 : 0)
			.transition()
			  .duration(duration)
			  .attr("width", w1)
			  .attr("x", reverse ? x1 : 0);

		  range.transition()
			  .duration(duration)
			  .attr("x", reverse ? x1 : 0)
			  .attr("width", w1)
			  .attr("height", height);

		  // Update the measure rects.
		  var mg = g.append('g');
		  var measureLabel = mg.selectAll("text.label")
						.data(measurez);
		  measureLabel.enter().append('text')
				.attr('class', 'label')
				.attr('x', lw1)
				.attr('y', height / 3 - (config.top/2))
				.text(function(d){
					return config.mesaureLabel+': '+d;
				});
				
		  var measure = mg.selectAll("rect.measure")
			  .data(measurez);

		  measure.enter().append("rect")
			  .attr("class", function(d, i) { return "measure s" + i; })
			  .attr("width", w0)
			  .attr("height", height / 3)
			  .attr("x", reverse ? x0 : 0)
			  .attr("y", height / 3)
			.transition()
			  .duration(duration)
			  .attr("width", w1)
			  .attr("x", reverse ? x1 : 0);

		  measure.transition()
			  .duration(duration)
			  .attr("width", w1)
			  .attr("height", height / 3)
			  .attr("x", reverse ? x1 : 0)
			  .attr("y", height / 3);

		  // Update the marker lines.
		  var marker = g.selectAll("line.marker")
			  .data(markerz);

		  marker.enter().append("line")
			  .attr("class", "marker")
			  .attr("x1", x0)
			  .attr("x2", x0)
			  .attr("y1", height / 6)
			  .attr("y2", height * 5 / 6)
			.transition()
			  .duration(duration)
			  .attr("x1", x1)
			  .attr("x2", x1);

		  marker.transition()
			  .duration(duration)
			  .attr("x1", x1)
			  .attr("x2", x1)
			  .attr("y1", height / 6)
			  .attr("y2", height * 5 / 6);

		  // Compute the tick format.
		  var format = tickFormat || x1.tickFormat(8);

		  // Update the tick groups.
		  var tick = g.selectAll("g.tick")
			  .data(x1.ticks(8), function(d) {
				return this.textContent || format(d);
			  });

		  // Initialize the ticks with the old scale, x0.
		  var tickEnter = tick.enter().append("g")
			  .attr("class", "tick")
			  .attr("transform", bulletTranslate(x0))
			  .style("opacity", 1e-6);

		  tickEnter.append("line")
			  .attr("y1", height)
			  .attr("y2", height * 7 / 6);

		  tickEnter.append("text")
			  .attr("text-anchor", "middle")
			  .attr("dy", "1em")
			  .attr("y", height * 7 / 6)
			  .text(format);

		  // Transition the entering ticks to the new scale, x1.
		  tickEnter.transition()
			  .duration(duration)
			  .attr("transform", bulletTranslate(x1))
			  .style("opacity", 1);

		  // Transition the updating ticks to the new scale, x1.
		  var tickUpdate = tick.transition()
			  .duration(duration)
			  .attr("transform", bulletTranslate(x1))
			  .style("opacity", 1);

		  tickUpdate.select("line")
			  .attr("y1", height)
			  .attr("y2", height * 7 / 6);

		  tickUpdate.select("text")
			  .attr("y", height * 7 / 6);

		  // Transition the exiting ticks to the new scale, x1.
		  tick.exit().transition()
			  .duration(duration)
			  .attr("transform", bulletTranslate(x1))
			  .style("opacity", 1e-6)
			  .remove();
		});
		d3.timerFlush();
	  }

	  // left, right, top, bottom
	  bullet.orient = function(x) {
		if (!arguments.length) return orient;
		orient = x;
		reverse = orient == "right" || orient == "bottom";
		return bullet;
	  };

	  // ranges (bad, satisfactory, good)
	  bullet.ranges = function(x) {
		if (!arguments.length) return ranges;
		ranges = x;
		return bullet;
	  };

	  // markers (previous, goal)
	  bullet.markers = function(x) {
		if (!arguments.length) return markers;
		markers = x;
		return bullet;
	  };

	  // measures (actual, forecast)
	  bullet.measures = function(x) {
		if (!arguments.length) return measures;
		measures = x;
		return bullet;
	  };

	  bullet.width = function(x) {
		if (!arguments.length) return width;
		width = x;
		return bullet;
	  };

	  bullet.height = function(x) {
		if (!arguments.length) return height;
		height = x;
		return bullet;
	  };

	  bullet.tickFormat = function(x) {
		if (!arguments.length) return tickFormat;
		tickFormat = x;
		return bullet;
	  };

	  bullet.duration = function(x) {
		if (!arguments.length) return duration;
		duration = x;
		return bullet;
	  };

	  return bullet;
	};

	function bulletRanges(d) {
	  return d.ranges;
	}

	function bulletMarkers(d) {
	  return d.markers;
	}

	function bulletMeasures(d) {
	  return d.measures;
	}

	function bulletTranslate(x) {
	  return function(d) {
		return "translate(" + x(d) + ",0)";
	  };
	}

	function bulletWidth(x) {
	  var x0 = x(0);
	  return function(d) {
		return Math.abs(x(d) - x0);
	  };
	}
	
	function bulletWidthLabel(x) {
	  var x0 = x(0);
	  return function(d) {
		return Math.abs(x(d) - x0) - (config.right*1.5) - (config.mesaureLabel.length*2);
	  };
	}
};

var donut = function(container, config, data) {
	var config = config;
	var data = data;
	var arcLabel = container.substring(1, container.length);
	
	var width = config.width;
	var height = config.height;
	var donutWidth = config.donutWidth;
	var radius1 = Math.min(width, height) / 2;
	var radius2 = radius1 - donutWidth;
	var radius3 = radius1 - donutWidth;
	
	var arc1 = d3.arc()
	  .innerRadius(radius1 - donutWidth)  
	  .outerRadius(radius1);
	var arcLabel1 = d3.arc()
	  .innerRadius(radius1 - donutWidth)
	  .outerRadius(radius1 - donutWidth + (donutWidth/2) );
	  
	var arc2 = d3.arc()
	  .innerRadius(radius2 - donutWidth)  
	  .outerRadius(radius2);
	var arcLabel2 = d3.arc()
	  .innerRadius(radius2 - donutWidth)  
	  .outerRadius(radius2 - donutWidth+(donutWidth/2));
	  
	var arc3 = d3.arc()
	  .innerRadius(radius3 - donutWidth)  
	  .outerRadius(radius3);
	var arcLabel3 = d3.arc()
	  .innerRadius(radius3 - donutWidth)  
	  .outerRadius(radius3 - donutWidth+(donutWidth/2));
	  
	var pie = d3.pie()
		//.startAngle(-90 * Math.PI/180)
		//.endAngle(-90 * Math.PI/180 + 2*Math.PI)
		.value(function(d) { return d.size; })
		.sort(null);

	var svg = d3.select(container)
	  .append('svg')
	  .attr("class", "donut")
	  .attr('width', width)
	  .attr('height', height);

	svg.tooltip = d3.select("body").append("div").attr("class", "sunburst-tooltip");
	svg.on("mousemove", function() {
		svg.tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px")
	});

	var svg1 = svg.append('g')
	  .attr('transform', 'translate(' + (width / 2) + 
		',' + (height / 2) + ')');
	
	var path1 = svg1.selectAll('g')
	  .data(pie(data))
	  .enter()
	  .append('g')
	  .attr('class', 'slice')
	  .append('path')
	  .attr('d', arc1)
	  .attr("class", "main-arc")
	  .attr('fill', function(d, i) { 
		return d.data.fill;
	  })
	  .each(function(d,i) {
			//Search pattern for everything between the start and the first capital L
			var firstArcSection = /(^.+?)L/; 	

			//Grab everything up to the first Line statement
			if(d3.select(this).attr("d").indexOf('L') !== -1){
				var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
			}
			else{
				var newArc = d3.select(this).attr("d").split('A', 2).join('A');
			}

			//Replace all the comma's so that IE can handle it
			newArc = newArc.replace(/,/g , " ");
			
			//If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
			//flip the end and start position
			if ((d.startAngle+d.endAngle)/2 > 90 * Math.PI/180 && (d.startAngle+d.endAngle)/2 < 270 * Math.PI/180) {

				if(newArc.indexOf(' 0 1 1 ') !== -1){
					var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
					middleLoc 	= /A(.*?) 0 1 1 /,	//Everything between the first capital A and 0 0 1
					endLoc 		= / 0 1 1 (.*?)$/,	//Everything between the first 0 0 1 and the end of the string (denoted by $)
					swapLoc = ' 0 1 0 ';
				}
				else{
					var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
					middleLoc 	= /A(.*?) 0 0 1 /,	//Everything between the first capital A and 0 0 1
					endLoc 		= / 0 0 1 (.*?)$/,	//Everything between the first 0 0 1 and the end of the string (denoted by $)
					swapLoc = ' 0 0 0 ';
				}
				
				//Flip the direction of the arc by switching the start en end point (and sweep flag)
				//of those elements that are below the horizontal line
				var newStart = endLoc.exec( newArc )[1];
				var newEnd = startLoc.exec( newArc )[1];
				var middleSec = middleLoc.exec( newArc )[1];
				
				//Build up the new arc notation, set the sweep-flag to 0
				newArc = "M" + newStart + "A" + middleSec + swapLoc + newEnd;
			}//if
			
			//Create a new invisible arc that the text can flow along
			
			svg1.append('path')
			  .attr("class", "hidden-arc")
			  .attr("id", arcLabel+"-"+i)
			  .attr('d', newArc)
			  .attr('fill', 'none');
		});
	  
	svg1.selectAll("g")
		.append("text")
		.attr("class", "label")
		.attr("dy", function(d,i) { return (((d.startAngle+d.endAngle)/2 > 90 * Math.PI/180 && (d.startAngle+d.endAngle)/2 < 270 * Math.PI/180) ? -37.5 : 37.5); });
	
	svg1.selectAll('g')
		.select('text').append("textPath")
		.attr("class", "text-stroke")
		.attr("xlink:href",function(d,i){return "#"+arcLabel+"-"+i;})
		.style("text-anchor","middle")
		.style("overflow", "hidden")
		.attr("startOffset", function(d){
			return "50%";
		})
		.text(function(d){return d.data.name+': '+d.data.size;})
		.style('display', function(d){
			var radianAngle = d.endAngle - d.startAngle;
			var angle = (radianAngle*180)/Math.PI;
			var label = d.data.name+': '+d.data.size;
			if(label.length > angle/3){
				return 'none';
			}
		});
	
	svg1.selectAll('g')
		.select('path')
		.on('mouseover', function(d){
			svg.tooltip.style("display", "inline");
			svg.tooltip.html('<div class="tooltip-tile">'+d.data.name+'</div>'+config.label+': <i>'+d.data.size+'</i>');
		})
		.on("mouseout", function() {
			svg.tooltip.style("display", "none")
		})
		.on("click", function(d){
			
		});
		
	 svg1.append('g')
		.append('text')
		.attr('class', 'summary')
		.attr('x', -(config.donutWidth/2) - 5)
		.attr('y', 5)
		.text(function(){
			var total = 0;
			$.each(data, function(i, d){
				total += d.size;
			});
			
			return total+' '+config.label;
		})
};

var stackedbar = function(container, config, data){
	$(container).html('');
	var svg = d3.select(container),
    margin = {top: config.top, right: config.right, bottom: config.bottom, left: config.left},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top/2 + ")");

	var x0 = d3.scaleBand()
		.rangeRound([0, width])
		.paddingInner(0.1);

	var x1 = d3.scaleBand()
		.padding(0.05);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	/* var z = d3.scaleOrdinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]); */
	/* var z = d3.scaleOrdinal()
		.range(["#03375c", "#055280", "#2994be", "#56adb6", "#69d1da"]); */
	
	/* var z = d3.scaleOrdinal()
		.range(["#26c6da", "#4dd0e1", "#80deea", "#b2ebf2"]); */
	
	var z = d3.scaleOrdinal()
		.range(["#0277bd", "#039be5", "#4fc3f7", "#81d4fa", "#b3e5fc"]);
		
	var data = data;
	var columns = Object.keys(data[0]);
	var keys = [];
	$.each(columns, function(index, label){
		if(label != config.xAxis){
			keys.push(label);
		}
	});

	x0.domain(data.map(function(d) { return d[config.xAxis]; }));
	x1.domain(keys).rangeRound([0, x0.bandwidth()]);
	y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

	g.append("g")
      .attr("class", "axis left")
      .call(d3.axisLeft(y).ticks(5, "s").tickSize(-width - margin.left - margin.right, 0, 0))
	  .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");
		  
	svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
	  .attr("style", "fill: #a7a7a7;font-weight: 600;letter-spacing: 1px;font-size:11px;text-transform:uppercase;")
      .style("text-anchor", "middle")
      .text("Columns");
	
	svg.tooltip = d3.select("body").append("div").attr("class", "sunburst-tooltip");
	svg.on("mousemove", function() {
		svg.tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px")
	});
	
	var gg = g.append("g");
	var groups = gg.selectAll("g")
		.data(data)
		.enter().append("g")
		.attr("transform", function(d) { 
			var ix = parseInt(x0(d[config.xAxis])) + 30;
			return "translate(" + ix + ",0)"; 
		});
		
	groups.selectAll("rect")
		.data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
		.enter().append("rect")
		.attr("x", function(d) { return x1(d.key); })
		.attr("y", function(d) { return y(d.value); })
		.attr("width", x1.bandwidth())
		.attr("height", function(d) { return height - y(d.value); })
		.attr("fill", function(d) { 
			return config.colors[d.key]; 
		})		
		.on("mouseover", function(d) {
			svg.tooltip.style("display", "inline");
			var html = "<div class='tooltip-tile'>"+d.key+": <i>"+d.value+"</i></div>";
			svg.tooltip.html(html);
		})
		.on("mouseout", function() { svg.tooltip.style("display", "none"); });
		
	groups.selectAll("text")
		.data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
		.enter()
		.append("text")
		.text(function(d){ return d.value; })
		.attr("x", function(d) { 
			return x1(d.key) + (x1.bandwidth()/2) - (d.value).toString().length*3;
		})
		.attr("y", function(d) { 
			return y(d.value) - 4;
		})
		.style("fill", '#a7a7a7')
		.style("font-weight", 'bold');

	g.append("g")
		  .attr("class", "axis")
		  .attr("transform", "translate(30," + height + ")")
		  .call(d3.axisBottom(x0))
		  .selectAll("text")
		  .text(function(d){
			return (d.length > 12) ? d.substring(0, 12)+'..' : d;
		  })
	      .append("title").text(function(d){ return d});

	var legend = svg.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "end")
		.attr("class", "legend")
		.attr("style", "fill: rgb(167, 167, 167);font-size: 11px;text-transform: capitalize;")
		.selectAll("g")
		.data(keys.slice())
		.enter().append("g")
		.attr("transform", function(d, i) {
			var lwidth = -(width - (width/(keys.length+1))*(i+1) ) ;
			var lheight = (height+margin.top*1.5);
			return "translate("+lwidth+"," + lheight + ")"; 
		});

	legend.append("rect")
		.attr("x", width)
		.attr("y", 9.5/2)
		.attr("width", 10)
		.attr("height", 10)
		.attr("fill", function(d) { 
			return config.colors[d.key]; 
		});

	legend.append("text")
		.attr("x", width + 15 )
		.attr("y", 9.5)
		.attr("dy", "0.32em")
		.style("text-anchor", "start")
		.text(function(d) { return d; });
};