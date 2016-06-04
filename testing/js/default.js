var drawSVG = new gcode_to_svg,
	s = Snap('#svg'),
	gcode = '';

var circle = s.circle(150, 150, 100);
circle.addClass('grid-major');

document.getElementById('generate').onclick = function() {
	drawSVG.parseGCode();
};