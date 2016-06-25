var gcode_to_svg = function(svgId) {
	var s = Snap(svgId);

	// var circle = s.circle(150, 150, 100);
	// circle.addClass('grid-major');

	/*
	Helper functions.
	 */
	
	// Debug to command line
	this.debugging = false;
	function debug(value) {
		if (this.debugging) {
			console.log(value);
		}
	}
	
	function drawAxes() {
			var x = s.line(0, visualOrigin.y, visualOrigin.x * 2, visualOrigin.y),
				y = s.line(visualOrigin.x, 0, visualOrigin.x, visualOrigin.y * 2);
	
			x.addClass('grid-major');
			y.addClass('grid-major');
	}

	// Move input values from svg origin to visual origin.
	function translateToVisualOrigin(xyz) {
		debug('Adjusting to visual origin: x=' + visualOrigin.x + ', y=' + visualOrigin.y);
		for (key in xyz) {
			switch (key) {
				case 'x':
					debug('\tMoving x coordinate from ' + xyz[key] + ' to ' + (xyz[key] + (visualOrigin.x)));
					xyz[key] = xyz[key] + (visualOrigin.x);
					break;
				case 'y':
					debug('\tMoving y coordinate from ' + xyz[key] + ' to ' + (xyz[key] + (visualOrigin.y)));
					xyz[key] = xyz[key] + (visualOrigin.y);
					break;
			}
		}

		return xyz;
	}
	function translateToVisualOriginX(x) {
		x = x + visualOrigin.x;
		return x;
	}
	function translateToVisualOriginY(y) {
		y = y + visualOrigin.y;
		return y;
	}

	// Scale a value.
	function scale(value) {
		return value * scaleFactor;
	}

	// Clean comments from a line of input
	function cleanComments(line) {
		// console.log(typeof line, line.join(' '));
		line = line.join(' ');
		if (line.split(';').length > 1) {
			line = line.split(';')[0];
		}
		line = line.split(' ');
		// line.pop();

		return line;
	}

	// Get clean XYZ coordinates from input.
	function getXYZ(array) {
		debug('Running getXYZ on ' + array);
		var xyz = {};

		// console.log(array);

		for (var i = 0; i < array.length; i++) {
			switch (array[i][0].toLowerCase()) {
				case 'x':
					xyz.x = scale(parseFloat(array[i].substring(1)));
					debug('\tX was determined to be ' + xyz.x);
					break;
				case 'y':
					xyz.y = scale(parseFloat(array[i].substring(1))) * -1;
					debug('\tY was determined to be ' + xyz.y);
					break;
				case 'z':
					xyz.z = scale(parseFloat(array[i].substring(1)));
					debug('\tZ was determined to be ' + xyz.z);
					break;
			}
		}

		debug('\tTranslating the coordinates to the visual origin.');
		debug('\tReturn values:')

		return translateToVisualOrigin(xyz);
	}

	// Pad a code with a leading zero on its numeric component.
	function zeroPad(value) {
		var returnValue = value.substring(0, 1) + '0' + value.substring(1);
		// console.log(returnValue);
		return returnValue;
	}

	/*
	Library variables, their getters, and their setters.
	 */
	
	// console.log(svgId);
	var visualOrigin = {
		x: document.getElementById(svgId.substring(1)).clientWidth / 2,
		y: document.getElementById(svgId.substring(1)).clientHeight / 2
	}
	this.getVisualOrigin = function() {
		return visualOrigin;
	}
	this.setVisualOrigin = function(x, y) {
		visualOrigin.x = x;
		visualOrigin.y = y;
	}
	
	var scaleFactor = 2;
	this.getScaleFactor = function() {
		return scaleFactor;
	}
	this.setScaleFactor = function(value) {
		scaleFactor = value;
	}
	
	// The tool head position.
	var toolHeadPosition = {
		x: 0,
		y: 0,
		z: 10
	};
	var getToolHeadPosition = function() {
		return toolHeadPosition;
	};
	function setToolHeadPosition(xyz) {
		for (key in xyz) {
			switch (key) {
				case 'x':
					toolHeadPosition.x = xyz.x;
					break;
				case 'y':
					toolHeadPosition.y = xyz.y;
					break;
				case 'z':
					toolHeadPosition.z = xyz.z;
					break;
			}
		}
	};
	function updateToolHeadPosition(xyz) {
		for (key in xyz) {
			switch (key) {
				case 'x':
					toolHeadPosition.x = xyz.x;
					break;
				case 'y':
					toolHeadPosition.y = xyz.y;
					break;
				case 'z':
					toolHeadPosition.z = xyz.z;
					break;
			}
		}
	}

	// The units of measure.
	var units = '';
	this.getUnits = function() {
		return units;
	};
	this.setUnits = function(newUnits) {
		units = newUnits;
	};

	// The current work plane.
	var workPlane = '';
	this.getWorkPlane = function() {
		return workPlane;
	};
	this.setWorkPlane = function(newWorkPlane) {
		workPlane = newWorkPlane;
	};

	// The state of the coolant system.
	var coolantState = '';
	this.getCoolantState = function() {
		return coolantState;
	};
	this.setCoolantState = function(newCoolantState) {
		coolantState = newCoolantState;
	};

	// The pallet clamp state.
	var palletClampState = '';
	this.getPalletClampState = function() {
		return palletClampState;
	};
	this.setPalletClampState = function(newPalletClampState) {
		palletClampState = newPalletClampState;
	};

	// The lathe spindle.
	var spindleState = 'off',
		spindleRotation = 'clockwise';
	this.getSpindleState = function() {
		return spindleState;
	};
	this.getSpindleRotation = function() {
		return spindleRotation;
	};
	this.setSpindleState = function(newSpindleState) {
		spindleState = newSpindleState;
	};
	this.setSpindleRotation = function(newSpindleRotation) {
		spindleRotation = newSpindleRotation;
	};

	// The feed rate
	var feedRate = 0;
	this.getFeedRate = function() {
		return feedRate;
	}
	this.setFeedRate = function(value) {
		feedRate = value;
	}

	drawAxes();
