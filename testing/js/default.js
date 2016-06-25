var s = Snap('#svg');

var editor = CodeMirror.fromTextArea(document.getElementById('gcode'), {
	lineNumbers: true
});

drawSVG = new gcode_to_svg('#svg');

$(document).ready(function() {
	$('#scale').val(drawSVG.getScaleFactor());

	$('#generate').click(function() {
		drawSVG.parseGCode(editor.getValue());
	});

	$('#clear').click(function(){
		$('.toolpath').remove();
	});

	$('#update-scale').click(function() {
		drawSVG.setScaleFactor($('#scale').val());
		$('#scale').val(drawSVG.getScaleFactor());
	});
});
