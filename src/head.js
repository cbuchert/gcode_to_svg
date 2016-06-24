var gcode_to_svg = function(svgId) {
	var s = Snap(svgId);

	// var circle = s.circle(150, 150, 100);
	// circle.addClass('grid-major');

	/*
	Library variables, their getters, and their setters.
	 */
	
	var scaleFactor = 1;
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
	var setToolHeadPosition = function(xyz) {
		for (key in xyz) {
			switch (key) {
				case 'x':
					toolHeadPosition.x = parseFloat(xyz[key]) * scaleFactor;
					break;
				case 'y':
					toolHeadPosition.y = parseFloat(xyz[key]) * scaleFactor;
					break;
				case 'z':
					toolHeadPosition.z = parseFloat(xyz[key]) * scaleFactor;
					break;
			}
		}
	};

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

	// Clean comments from a line of input
	function cleanComments(line) {
		// console.log(typeof line, line.join(' '));
		line = line.join(' ');
		if (line.split(';').length > 1) {
			line = line.split(';')[0];
		}
		line = line.split(' ');
		line.pop();

		return line;
	}

	// Get clean XYZ coordinates from input.
	function getXYZ(array) {
		var xyz = {};

		for (var i = 0; i < array.length; i++) {
			switch (array[i][0].toLowerCase()) {
				case 'x':
					xyz.x = parseFloat(array[i].substring(1, array[i].length)) * scaleFactor;
					break;
				case 'y':
					xyz.y = parseFloat(array[i].substring(1, array[i].length)) * scaleFactor;
					break;
				case 'z':
					xyz.z = parseFloat(array[i].substring(1, array[i].length)) * scaleFactor;
					break;
			}
		}

		return xyz;
	}