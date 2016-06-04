var gcode_to_svg = function(gcodeId, svgId) {
	var gcode = document.getElementById(gcodeId),
		s = Snap(svgId);

	/*
	Library variables, their getters, and their setters.
	 */
	
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
	var getSpindleState = function() {
		return spindleState;
	};
	var getSpindleRotation = function() {
		return spindleRotation;
	};
	var setSpindleState = function(newSpindleState) {
		spindleState = newSpindleState;
	};
	var setSpindleRotation = function(newSpindleRotation) {
		spindleRotation = newSpindleRotation;
	};
