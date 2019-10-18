import * as d3 from 'd3';

(function() {
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var xValue = function(d) {
			return d.bweight;
		},
		xScale = d3.scaleLinear().range([0, width]), // value -> display
		xMap = function(d) {
			return xScale(xValue(d));
		},
		xAxis = d3.axisTop(xScale);

	var yValue = function(d) {
			return d['total'];
		},
		yScale = d3.scaleLinear().range([height, 0]), // value -> display
		yMap = function(d) {
			return yScale(yValue(d));
		},
		yAxis = d3.axisLeft(yScale);

	var cValue = function(d) {
			return d.event;
		},
		color = d3.scaleOrdinal(d3.schemePaired);

	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var tooltip = d3
		.select('body')
		.append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0);

	d3.json('http://127.0.0.1:8000/list/').then(function(data) {
		data.forEach(d => {
			d.total = +d.total;
			d.bweight = +d.bweight;
		});

		xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
		yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

		svg
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis)
			.append('text')
			.attr('class', 'label')
			.attr('x', width)
			.attr('y', -6)
			.style('text-anchor', 'end')
			.text('Body Weight (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('class', 'label')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Total (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.selectAll('.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('r', 3.5)
			.attr('cx', xMap)
			.attr('cy', yMap)
			.style('fill', function(d) {
				return color(cValue(d));
			})
			.on('mouseover', function(d) {
				tooltip
					.transition()
					.duration(200)
					.style('opacity', 0.9);
				tooltip
					.html(d['lname'] + '<br/> (' + xValue(d) + ', ' + yValue(d) + ')')
					.style('left', d3.event.pageX + 5 + 'px')
					.style('top', d3.event.pageY - 28 + 'px');
			})
			.on('mouseout', function(d) {
				tooltip
					.transition()
					.duration(500)
					.style('opacity', 0);
			});

		var category = d3
			.nest()
			.key(function(d) {
				return d.category;
			})
			.rollup(function(a) {
				return a.length;
			})
			.entries(data);
		category.unshift({
			key: 'ALL',
			value: d3.sum(category, function(d) {
				return d.total;
			})
		});

		var selector = d3.select('#selector');
		selector
			.selectAll('option')
			.data(category)
			.enter()
			.append('option')
			.text(function(d) {
				return d.key;
			})
			.attr('value', function(d) {
				return d.key;
			});

		selector.on('change', function() {
			d3.selectAll('.dot').attr('opacity', 1);
			var value = selector.property('value');
			if (value != 'ALL') {
				d3.selectAll('.dot')
					.filter(function(d) {
						return d.category != value;
					})
					.attr('opacity', 0.1);
			}
		});

		var legend = svg
			.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 20 + ')';
			});

		legend
			.append('rect')
			.attr('x', width - 18)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);

		legend
			.append('text')
			.attr('x', width - 24)
			.attr('y', 8)
			.attr('dy', '.35em')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '10px')
			.attr('fill', 'black')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});
	});
})();

(function() {
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var xValue = function(d) {
			return d.bweight;
		},
		xScale = d3.scaleLinear().range([0, width]), // value -> display
		xMap = function(d) {
			return xScale(xValue(d));
		},
		xAxis = d3.axisTop(xScale);

	var yValue = function(d) {
			return d['snatch'];
		},
		yScale = d3.scaleLinear().range([height, 0]), // value -> display
		yMap = function(d) {
			return yScale(yValue(d));
		},
		yAxis = d3.axisLeft(yScale);

	var cValue = function(d) {
			return d.event;
		},
		color = d3.scaleOrdinal(d3.schemePaired);

	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var tooltip = d3
		.select('body')
		.append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0);

	d3.json('http://127.0.0.1:8000/list/').then(function(data) {
		data.forEach(d => {
			d.snatch = +d.snatch;
			d.bweight = +d.bweight;
		});

		xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
		yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

		svg
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis)
			.append('text')
			.attr('class', 'label')
			.attr('x', width)
			.attr('y', -6)
			.style('text-anchor', 'end')
			.text('Body Weight (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('class', 'label')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Snatch (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.selectAll('.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('r', 3.5)
			.attr('cx', xMap)
			.attr('cy', yMap)
			.style('fill', function(d) {
				return color(cValue(d));
			})
			.on('mouseover', function(d) {
				tooltip
					.transition()
					.duration(200)
					.style('opacity', 0.9);
				tooltip
					.html(d['lname'] + '<br/> (' + xValue(d) + ', ' + yValue(d) + ')')
					.style('left', d3.event.pageX + 5 + 'px')
					.style('top', d3.event.pageY - 28 + 'px');
			})
			.on('mouseout', function(d) {
				tooltip
					.transition()
					.duration(500)
					.style('opacity', 0);
			});

		var category = d3
			.nest()
			.key(function(d) {
				return d.category;
			})
			.rollup(function(a) {
				return a.length;
			})
			.entries(data);
		category.unshift({
			key: 'ALL',
			value: d3.sum(category, function(d) {
				return d.snatch;
			})
		});

		var selector = d3.select('#selector');
		selector
			.selectAll('option')
			.data(category)
			.enter()
			.append('option')
			.text(function(d) {
				return d.key;
			})
			.attr('value', function(d) {
				return d.key;
			});

		selector.on('change', function() {
			d3.selectAll('.dot').attr('opacity', 1);
			var value = selector.property('value');
			if (value != 'ALL') {
				d3.selectAll('.dot')
					.filter(function(d) {
						return d.category != value;
					})
					.attr('opacity', 0.1);
			}
		});

		var legend = svg
			.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 20 + ')';
			});

		legend
			.append('rect')
			.attr('x', width - 18)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);

		legend
			.append('text')
			.attr('x', width - 24)
			.attr('y', 8)
			.attr('dy', '.35em')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '10px')
			.attr('fill', 'black')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});
	});
})();

(function() {
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var xValue = function(d) {
			return d.bweight;
		},
		xScale = d3.scaleLinear().range([0, width]), // value -> display
		xMap = function(d) {
			return xScale(xValue(d));
		},
		xAxis = d3.axisTop(xScale);

	var yValue = function(d) {
			return d['jerk'];
		},
		yScale = d3.scaleLinear().range([height, 0]), // value -> display
		yMap = function(d) {
			return yScale(yValue(d));
		},
		yAxis = d3.axisLeft(yScale);

	var cValue = function(d) {
			return d.event;
		},
		color = d3.scaleOrdinal(d3.schemePaired);

	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var tooltip = d3
		.select('body')
		.append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0);

	d3.json('http://127.0.0.1:8000/list/').then(function(data) {
		data.forEach(d => {
			d.jerk = +d.jerk;
			d.bweight = +d.bweight;
		});

		xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
		yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

		svg
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis)
			.append('text')
			.attr('class', 'label')
			.attr('x', width)
			.attr('y', -6)
			.style('text-anchor', 'end')
			.text('Body Weight (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('class', 'label')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Clean and Jerk (kg)')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'black');

		svg
			.selectAll('.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('r', 3.5)
			.attr('cx', xMap)
			.attr('cy', yMap)
			.style('fill', function(d) {
				return color(cValue(d));
			})
			.on('mouseover', function(d) {
				tooltip
					.transition()
					.duration(200)
					.style('opacity', 0.9);
				tooltip
					.html(d['lname'] + '<br/> (' + xValue(d) + ', ' + yValue(d) + ')')
					.style('left', d3.event.pageX + 5 + 'px')
					.style('top', d3.event.pageY - 28 + 'px');
			})
			.on('mouseout', function(d) {
				tooltip
					.transition()
					.duration(500)
					.style('opacity', 0);
			});

		var category = d3
			.nest()
			.key(function(d) {
				return d.category;
			})
			.rollup(function(a) {
				return a.length;
			})
			.entries(data);
		category.unshift({
			key: 'ALL',
			value: d3.sum(category, function(d) {
				return d.jerk;
			})
		});

		var selector = d3.select('#selector');
		selector
			.selectAll('option')
			.data(category)
			.enter()
			.append('option')
			.text(function(d) {
				return d.key;
			})
			.attr('value', function(d) {
				return d.key;
			});

		selector.on('change', function() {
			d3.selectAll('.dot').attr('opacity', 1);
			var value = selector.property('value');
			if (value != 'ALL') {
				d3.selectAll('.dot')
					.filter(function(d) {
						return d.category != value;
					})
					.attr('opacity', 0.1);
			}
		});

		var legend = svg
			.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 20 + ')';
			});

		legend
			.append('rect')
			.attr('x', width - 18)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);

		legend
			.append('text')
			.attr('x', width - 24)
			.attr('y', 8)
			.attr('dy', '.35em')
			.attr('font-family', 'sans-serif')
			.attr('font-size', '10px')
			.attr('fill', 'black')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});
	});
})();
