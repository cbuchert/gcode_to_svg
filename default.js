$(document).ready(function() {
	var drawSVG = new gcode_to_svg,
		svg = $('svg');

	/*
	Draw grid lines.
	 */
	
	// Draw major grid lines.
	for (var i = 0; i < 10; i++) {
		var spacing = 20,
			h_x1 = 0,
			h_y1 = i * spacing,
			h_x2 = svg.width(),
			h_y2 = i * spacing,
			horizontal = document.createElementNS('http://www.w3.org/2000/svg','line'),

			v_x1 = i * spacing,
			v_y1 = 0,
			v_x2 = i * spacing,
			v_y2 = svg.height(),
			vertical = document.createElementNS('http://www.w3.org/2000/svg','line');

		horizontal.setAttribute('class', 'grid-major');
		horizontal.setAttribute('x1', h_x1);
		horizontal.setAttribute('y1', h_y1);
		horizontal.setAttribute('x2', h_x2);
		horizontal.setAttribute('y2', h_y2);

		vertical.setAttribute('class', 'grid-major');
		vertical.setAttribute('x1', v_x1);
		vertical.setAttribute('y1', v_y1);
		vertical.setAttribute('x2', v_x2);
		vertical.setAttribute('y2', v_y2);

		// Draw horizontal
		svg.append(horizontal);

		// Draw vertical
		svg.append(vertical);
	}
});