var drawSVG = new gcode_to_svg('#svg'),
	s = Snap('#svg'),
	gcode = '';

document.getElementById('generate').onclick = function() {
	drawSVG.parseGCode();
};