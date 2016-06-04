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

    var gcodes = {
        "G00": {
            "Description": "Rapid positioning",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "On 2- or 3-axis moves, G00 (unlike G01) traditionally does not necessarily  move in a single straight line between start point and end point. It moves  each axis at its max speed until its vector quantity is achieved. Shorter  vector usually finishes first (given similar axis speeds). This matters  because it may yield a dog-leg or hockey-stick motion, which the programmer  needs to consider depending on what obstacles are nearby, to avoid a crash.  Some machines offer interpolated rapids as a feature for ease of  programming (safe to assume a straight line).",
            "action": function(){
                
            }
        },
        "G01": {
            "Description": "Linear interpolation",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "The most common workhorse code for feeding during a cut. The program specs  the start and end points, and the control automatically calculates ( interpolates) the intermediate points to pass through that will yield a  straight line (hence \"linear\"). The control then calculates the angular  velocities at which to turn the axis leadscrews via their servomotors or  stepper motors. The computer performs thousands of calculations per second,  and the motors react quickly to each input. Thus the actual toolpath of the  machining takes place with the given feedrate on a path that is accurately  linear to within very small limits.",
            "action": function(){
                
            }
        },
        "G02": {
            "Description": "Circular interpolation, clockwise",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Very similar in concept to G01. Again, the control interpolates  intermediate points and commands the servo- or stepper motors to rotate the  amount needed for the leadscrew to translate the motion to the correct tool  tip positioning. This process repeated thousands of times per minute  generates the desired toolpath. In the case of G02, the interpolation  generates a circle rather than a line. As with G01, the actual toolpath of  the machining takes place with the given feedrate on a path that accurately  matches the ideal (in G02's case, a circle) to within very small limits. In  fact, the interpolation is so precise (when all conditions are correct)  that milling an interpolated circle can obviate operations such as  drilling, and often even fine boring. *Addresses for radius or arc center:*  G02 and G03 take either an R address (for the radius desired on the part)  or IJK addresses (for the component vectors that define the vector from the  arc start point to the arc center point). *Cutter comp:* On most controls  you cannot start G41 or G42 in G02 or G03 modes. You must already have  compensated in an earlier G01 block. Often a short linear lead-in movement  will be programmed, merely to allow cutter compensation before the main  event, the circle-cutting, begins. *Full circles:* When the arc start point  and the arc end point are identical, a 360° arc, a full circle, will be  cut. (Some older controls cannot support this because arcs cannot cross  between quadrants of the cartesian system. Instead, four quarter-circle  arcs are programmed back-to-back.)",
            "action": function(){
                
            }
        },
        "G03": {
            "Description": "Circular interpolation, counterclockwise",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Same corollary info as for G02.",
            "action": function(){
                
            }
        },
        "G04": {
            "Description": "Dwell",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes an address for dwell period (may be X, U, or P). The dwell period is  specified by a control parameter, typically set to milliseconds. Some  machines can accept either X1.0 (s) or P1000 (ms), which are equivalent. *Choosing  dwell duration*: Often the dwell needs only to last one or two full spindle  rotations. This is typically much less than one second. Be aware when  choosing a duration value that a long dwell is a waste of cycle time. In  some situations it won't matter, but for high-volume repetitive production  (over thousands of cycles), it is worth calculating that perhaps you only  need 100 ms, and you can call it 200 to be safe, but 1000 is just a waste  (too long).",
            "action": function(){
                
            }
        },
        "G05 P10000": {
            "Description": "High-precision contour control (HPCC)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Uses a deep look-ahead buffer and simulation processing to provide better  axis movement acceleration and deceleration during contour milling",
            "action": function(){
                
            }
        },
        "G05.1 Q1.": {
            "Description": "AI Advanced Preview Control",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Uses a deep look-ahead buffer and simulation processing to provide better  axis movement acceleration and deceleration during contour milling",
            "action": function(){
                
            }
        },
        "G06.1": {
            "Description": "Non-uniform rational B-spline (NURBS) Machining",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Activates Non-Uniform Rational B Spline for complex curve and waveform  machining (this code is confirmed in Mazatrol 640M ISO Programming)",
            "action": function(){
                
            }
        },
        "G07": {
            "Description": "Imaginary axis designation",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G09": {
            "Description": "Exact stop check, non-modal",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "The modal version is G61.",
            "action": function(){
                
            }
        },
        "G10": {
            "Description": "Programmable data input",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Modifies the value of work coordinate and tool offsets[6]",
                "action": function(){
                    
                }
        },
        "G11": {
            "Description": "Data write cancel",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G12": {
            "Description": "Full-circle interpolation, clockwise",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Fixed cycle for ease of programming 360° circular interpolation with  blend-radius lead-in and lead-out. Not standard on Fanuc controls.",
            "action": function(){
                
            }
        },
        "G13": {
            "Description": "Full-circle interpolation, counterclockwise",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Fixed cycle for ease of programming 360° circular interpolation with  blend-radius lead-in and lead-out. Not standard on Fanuc controls.",
            "action": function(){
                
            }
        },
        "G17": {
            "Description": "XY plane selection",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                workPlane = 'XY';
            }
        },
        "G18": {
            "Description": "ZX plane selection",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "On most CNC lathes (built 1960s to 2000s), ZX is the only available plane,  so no G17 to G19 codes are used. This is now changing as the era begins in  which live tooling, multitask/multifunction, and mill-turn/turn-mill  gradually become the \"new normal\". But the simpler, traditional form factor  will probably not disappear—it will just move over to make room for the  newer configurations. See also V address.",
            "action": function(){
                workPlane = 'ZX';
            }
        },
        "G19": {
            "Description": "YZ plane selection",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                workPlane = 'YZ';
            }
        },
        "G20": {
            "Description": "Programming in inches",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Somewhat uncommon except in USA and (to lesser extent) Canada and UK.  However, in the global marketplace, competence with both G20 and G21 always  stands some chance of being necessary at any time. The usual minimum  increment in G20 is one ten-thousandth of an inch (0.0001\"), which is a  larger distance than the usual minimum increment in G21 (one thousandth of  a millimeter, .001 mm, that is, one micrometre). This physical difference  sometimes favors G21 programming.",
            "action": function(){
                units = 'imperial';
            }
        },
        "G21": {
            "Description": "Programming in millimeters (mm)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Prevalent worldwide. However, in the global marketplace, competence with  both G20 and G21 always stands some chance of being necessary at any time.",
            "action": function(){
                units = 'metric';
            }
        },
        "G28": {
            "Description": "Return to home position (machine zero, aka machine reference point)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes X Y Z addresses which define the intermediate point that the tool tip  will pass through on its way home to machine zero. They are in terms of  part zero (aka program zero), NOT machine zero.",
            "action": function(){
                
            }
        },
        "G30": {
            "Description": "Return to secondary home position (machine zero, aka machine reference  point)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes a P address specifying *which* machine zero point is desired, *if*  the machine has several secondary points (P1 to P4). Takes X Y Z addresses  which define the intermediate point that the tool tip will pass through on  its way home to machine zero. They are in terms of part zero (aka program  zero), NOT machine zero.",
            "action": function(){
                
            }
        },
        "G31": {
            "Description": "Skip function (used for probes and tool length measurement systems)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G32": {
            "Description": "Single-point threading, longhand style (if not using a cycle, e.g., G76)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "Similar to G01 linear interpolation, except with automatic spindle  synchronization for single-point threading.",
            "action": function(){
                
            }
        },
        "G33": {
            "Description": "Single-point threading, longhand style (if not using a cycle, e.g., G76)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "Some lathe controls assign this mode to G33 rather than G32.",
            "action": function(){
                
            }
        },
        "G34": {
            "Description": "Variable-pitch threading",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G40": {
            "Description": "Tool radius compensation off",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Turn off cutter radius compensation (CRC). Cancels G41 or G42.",
            "action": function(){
                
            }
        },
        "G41": {
            "Description": "Tool radius compensation left",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Turn on cutter radius compensation (CRC), left, for climb milling. *Milling:* Given righthand-helix cutter and M03 spindle direction, G41  corresponds to climb milling (down milling). Takes an address (D or H) that  calls an offset register value for radius. *Turning:* Often needs no D or H address on lathes, because whatever tool  is active automatically calls its geometry offsets with it. (Each turret  station is bound to its geometry offset register.)   G41 and G42 for milling has been partially automated and obviated (although  not completely) since CAM programming has become more common. CAM systems  allow the user to program as if with a zero-diameter cutter. The  fundamental concept of cutter radius compensation is still in play (i.e.,  that the surface produced will be distance R away from the cutter center),  but the programming mindset is different; the human does not choreograph  the toolpath with conscious, painstaking attention to G41, G42, and G40,  because the CAM software takes care of it. The software has various CRC  mode selections, such as *computer, control, wear, reverse wear, off*, some  of which do not use G41/G42 at all (good for roughing, or wide finish  tolerances), and others which use it so that the wear offset can still be  tweaked at the machine (better for tight finish tolerances).",
            "action": function(){
                
            }
        },
        "G42": {
            "Description": "Tool radius compensation right",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Turn on cutter radius compensation (CRC), right, for conventional milling.  Similar corollary info as for G41. Given righthand-helix cutter and M03  spindle direction, G42 corresponds to conventional milling (up milling).",
            "action": function(){
                
            }
        },
        "G43": {
            "Description": "Tool height offset compensation negative",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Takes an address, usually H, to call the tool length offset register value.  The value is *negative* because it will be *added* to the gauge line  position. G43 is the commonly used version (vs G44).",
            "action": function(){
                
            }
        },
        "G44": {
            "Description": "Tool height offset compensation positive",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Takes an address, usually H, to call the tool length offset register value.  The value is *positive* because it will be *subtracted* from the gauge line  position. G44 is the seldom-used version (vs G43).",
            "action": function(){
                
            }
        },
        "G45": {
            "Description": "Axis offset single increase",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G46": {
            "Description": "Axis offset single decrease",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G47": {
            "Description": "Axis offset double increase",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G48": {
            "Description": "Axis offset double decrease",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G49": {
            "Description": "Tool length offset compensation cancel",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Cancels G43 or G44.",
            "action": function(){
                
            }
        },
        "G50": {
            "Description": "Position register (programming of vector from part zero to tool tip)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "Position register is one of the original methods to relate the part  (program) coordinate system to the tool position, which indirectly relates  it to the machine coordinate system, the only position the control really  \"knows\". Not commonly programmed anymore because G54 to G59 (WCSs) are a  better, newer method. Called via G50 for turning, G92 for milling. Those G  addresses also have alternate meanings (which see). Position register can  still be useful for datum shift programming. The \"manual absolute\" switch,  which has very few useful applications in WCS contexts, was more useful in  position register contexts, because it allowed the operator to move the  tool to a certain distance from the part (for example, by touching off a  2.0000\" gage) and then declare to the control what the distance-to-go shall  be (2.0000).",
            "action": function(){
                
            }
        },
        "G52": {
            "Description": "Local coordinate system (LCS)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Temporarily shifts program zero to a new location. It is simply \"an offset  from an offset\", that is, an additional offset added onto the WCS offset.  This simplifies programming in some cases. The typical example is moving  from part to part in a multipart setup. With *G54* active, *G52 X140.0  Y170.0* shifts program zero 140 mm over in X and 170 mm over in Y. When the  part \"over there\" is done, *G52 X0 Y0* returns program zero to normal G54  (by reducing G52 offset to nothing). The same result can also be achieved  (1) using multiple WCS origins, G54/G55/G56/G57/G58/G59; (2) on newer  controls, G54.1 P1/P2/P3/etc. (all the way up to P48); or (3) using G10 for  programmable data input, in which the program can write new offset values  to the offset registers. Which method to use depends on shop-specific  application.",
            "action": function(){
                
            }
        },
        "G53": {
            "Description": "Machine coordinate system",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes absolute coordinates (X,Y,Z,A,B,C) with reference to machine zero  rather than program zero. Can be helpful for tool changes. Nonmodal and  absolute only. Subsequent blocks are interpreted as \"back to G54\" even if  it is not explicitly programmed.",
            "action": function(){
                
            }
        },
        "G54 to G59": {
            "Description": "Work coordinate systems (WCSs)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Have largely replaced position register (G50 and G92). Each tuple of axis  offsets relates program zero directly to machine zero. Standard is 6 tuples  (G54 to G59), with optional extensibility to 48 more via G54.1 P1 to P48.",
            "action": function(){
                
            }
        },
        "G54.1 P1 to P48": {
            "Description": "Extended work coordinate systems",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Up to 48 more WCSs besides the 6 provided as standard by G54 to G59. Note  floating-point extension of G-code data type (formerly all integers). Other  examples have also evolved (e.g., G84.2). Modern controls have the hardware  to handle it.",
            "action": function(){
                
            }
        },
        "G61": {
            "Description": "Exact stop check, modal",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Can be canceled with G64. The non-modal version is G09.",
            "action": function(){
                
            }
        },
        "G62": {
            "Description": "Automatic corner override",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G64": {
            "Description": "Default cutting mode (cancel exact stop check mode)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Cancels G61.",
            "action": function(){
                
            }
        },
        "G70": {
            "Description": "Fixed cycle, multiple repetitive cycle, for finishing (including contours)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G71": {
            "Description": "Fixed cycle, multiple repetitive cycle, for roughing (Z-axis emphasis)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G72": {
            "Description": "Fixed cycle, multiple repetitive cycle, for roughing (X-axis emphasis)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G73": {
            "Description": "Peck drilling cycle for milling – high-speed (NO full retraction from pecks)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Retracts only as far as a clearance increment (system parameter). For when  chipbreaking is the main concern, but chip clogging of flutes is not.  Compare G83.",
            "action": function(){
                
            }
        },
        "G74": {
            "Description": "Tapping cycle for milling, lefthand thread, M04 spindle direction",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "See notes at G84.",
            "action": function(){
                
            }
        },
        "G75": {
            "Description": "Peck grooving cycle for turning",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G76": {
            "Description": "Threading cycle for turning, multiple repetitive cycle",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G80": {
            "Description": "Cancel canned cycle",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "*Milling:* Cancels all cycles such as G73, G81, G83, etc. Z-axis returns  either to Z-initial level or R level, as programmed (G98 or G99,  respectively). *Turning:* Usually not needed on lathes, because a new group-1 G address ( G00 to G03) cancels whatever cycle was active.",
            "action": function(){
                
            }
        },
        "G81": {
            "Description": "Simple drilling cycle",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "No dwell built in",
            "action": function(){
                
            }
        },
        "G82": {
            "Description": "Drilling cycle with dwell",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Dwells at hole bottom (Z-depth) for the number of milliseconds specified by  the P address. Good for when hole bottom finish matters. Good for spot  drilling because the divot will be certain to clean up evenly. Consider the  \"choosing dwell duration\" note at G04.",
            "action": function(){
                
            }
        },
        "G83": {
            "Description": "Peck drilling cycle (full retraction from pecks)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Returns to R-level after each peck. Good for clearing flutes of chips.  Compare G73.",
            "action": function(){
                
            }
        },
        "G84": {
            "Description": "Tapping cycle, righthand thread, M03 spindle direction",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "G74 and G84 are the righthand and lefthand \"pair\" for old-school tapping  with a non-rigid toolholder (\"tapping head\" style). Compare the rigid  tapping \"pair\", G84.2 and G84.3.",
            "action": function(){
                
            }
        },
        "G84.2": {
            "Description": "Tapping cycle, righthand thread, M03 spindle direction, rigid toolholder",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "See notes at G84. Rigid tapping synchronizes speed and feed according to  the desired thread helix. That is, it synchronizes degrees of spindle  rotation with microns of axial travel. Therefore it can use a rigid  toolholder to hold the tap. This feature is not available on old machines  or newer low-end machines, which must use \"tapping head\" motion (G74/G84).",
            "action": function(){
                
            }
        },
        "G84.3": {
            "Description": "Tapping cycle, lefthand thread, M04 spindle direction, rigid toolholder",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "See notes at G84 and G84.2.",
            "action": function(){
                
            }
        },
        "G85": {
            "Description": "boring cycle, feed in/feed out",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "- Good cycle for a reamer.    - In some cases good for single-point boring tool, although in other     cases the lack of depth of cut on the way back out is bad for surface     finish, in which case, G76 (OSS/shift) can be used instead.    - If need dwell at hole bottom, see G89.",
            "action": function(){
                
            }
        },
        "G86": {
            "Description": "boring cycle, feed in/spindle stop/rapid out",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "Boring tool will leave a slight score mark on the way back out. Appropriate  cycle for some applications; for others, G76 (OSS/shift) can be used  instead.",
            "action": function(){
                
            }
        },
        "G87": {
            "Description": "boring cycle, backboring",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "For backboring. Returns to initial level only (G98); this cycle cannot use  G99 because its R level is on the far side of the part, away from the  spindle headstock.",
            "action": function(){
                
            }
        },
        "G88": {
            "Description": "boring cycle, feed in/spindle stop/manual operation",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G89": {
            "Description": "boring cycle, feed in/dwell/feed out",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "G89 is like G85 but with dwell added at bottom of hole.",
            "action": function(){
                
            }
        },
        "G90": {
            "Description": "Fixed cycle, simple cycle, for roughing (Z-axis emphasis)",
            "Milling ( M )": "",
            "Turning ( T )": "T (A)",
            "Corollary info": "When not serving for absolute programming (above)",
            "action": function(){
                
            }
        },
        "G91": {
            "Description": "Incremental programming",
            "Milling ( M )": "M",
            "Turning ( T )": "T (B)",
            "Corollary info": "Positioning defined with reference to previous position. *Milling:* Always as above. *Turning:* Sometimes as above (Fanuc group type B and similarly designed),  but on most lathes (Fanuc group type A and similarly designed), G90/G91 are  not used for absolute/incremental modes. Instead, U and W are the  incremental addresses and X and Z are the absolute addresses. On these  lathes, G90 is a fixed cycle address for roughing.",
            "action": function(){
                
            }
        },
        "G92": {
            "Description": "Threading cycle, simple cycle",
            "Milling ( M )": "",
            "Turning ( T )": "T (A)",
            "Corollary info": "",
            "action": function(){
                
            }
        },
        "G94": {
            "Description": "Fixed cycle, simple cycle, for roughing (X-axis emphasis)",
            "Milling ( M )": "",
            "Turning ( T )": "T (A)",
            "Corollary info": "When not serving for feedrate per minute (above)",
            "action": function(){
                
            }
        },
        "G95": {
            "Description": "Feedrate per revolution",
            "Milling ( M )": "M",
            "Turning ( T )": "T (B)",
            "Corollary info": "On group type A lathes, feedrate per revolution is G99.",
            "action": function(){
                
            }
        },
        "G96": {
            "Description": "Constant surface speed (CSS)",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "Varies spindle speed automatically to achieve a constant surface speed. See speeds  and feeds. Takes an S address integer, which is interpreted as sfm in G20  mode or as m/min in G21 mode.",
            "action": function(){
                
            }
        },
        "G97": {
            "Description": "Constant spindle speed",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes an S address integer, which is interpreted as rev/min (rpm). The  default speed mode per system parameter if no mode is programmed.",
            "action": function(){
                
            }
        },
        "G98": {
            "Description": "Feedrate per minute (group type A)",
            "Milling ( M )": "",
            "Turning ( T )": "T (A)",
            "Corollary info": "Feedrate per minute is G94 on group type B.",
            "action": function(){
                
            }
        },
        "G99": {
            "Description": "Feedrate per revolution (group type A)",
            "Milling ( M )": "",
            "Turning ( T )": "T (A)",
            "Corollary info": "Feedrate per revolution is G95 on group type B.",
            "action": function(){
                
            }
        }
    };

    var mcodes = {
        "M00": {
            "Description": "Compulsory stop",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Non-optional—machine will always stop upon reaching M00 in the program  execution.",
            'action': function() {
                
            }
        },
        "M01": {
            "Description": "Optional stop",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Machine will only stop at M01 if operator has pushed the optional stop  button.",
            'action': function() {
                
            }
        },
        "M02": {
            "Description": "End of program",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Program ends; execution may or may not return to program top (depending on  the control); may or may not reset register values. M02 was the original  program-end code, now considered obsolete, but still supported for backward  compatibility.[7] Many modern controls treat M02 as equivalent to M30.[7]  See M30 for additional discussion of control status upon executing M02 or  M30.",
            'action': function() {
                
            }
        },
        "M03": {
            "Description": "Spindle on (clockwise rotation)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "The speed of the spindle is determined by the address S, in either revolutions  per minute (G97 mode; default) or surface feet per minute or [surface]  meters per minute (G96 mode [CSS] under either G20 or G21). The right-hand  rule can be used to determine which direction is clockwise and which  direction is counter-clockwise.   Right-hand-helix screws moving in the tightening direction (and  right-hand-helix flutes spinning in the cutting direction) are defined as  moving in the M03 direction, and are labeled \"clockwise\" by convention. The  M03 direction is always M03 regardless of local vantage point and local  CW/CCW distinction.",
            'action': function() {
                spindleRotation = 'clockwise';
            }
        },
        "M04": {
            "Description": "Spindle on (counterclockwise rotation)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "See comment above at M03.",
            'action': function() {
                spindleRotation = 'counterclockwise';
            }
        },
        "M05": {
            "Description": "Spindle stop",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                spindleState = 'off';
            }
        },
        "M06": {
            "Description": "Automatic tool change (ATC)",
            "Milling ( M )": "M",
            "Turning ( T )": "T (some-times)",
            "Corollary info": "Many lathes do not use M06 because the T address itself indexes the turret. Programming on any particular machine tool requires knowing which method  that machine uses. To understand how the T address works and how it  interacts (or not) with M06, one must study the various methods, such as  lathe turret programming, ATC fixed tool selection, ATC random memory tool  selection, the concept of \"next tool waiting\", and empty tools. These  concepts are taught in textbooks such as Smid,[3] and online multimedia  (videos, simulators, etc.); all of these teaching resources are usually  paywalled to pay back the costs of their development. They are used in  training classes for operators, both on-site and remotely (e.g., Tooling  University).",
            'action': function() {
                
            }
        },
        "M07": {
            "Description": "Coolant on (mist)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                coolantState = 'mist';
            }
        },
        "M08": {
            "Description": "Coolant on (flood)",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                coolantState = 'flood';
            }
        },
        "M09": {
            "Description": "Coolant off",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                coolantState = 'off';
            }
        },
        "M10": {
            "Description": "Pallet clamp on",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                palletClampState = 'on';
            }
        },
        "M11": {
            "Description": "Pallet clamp off",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                palletClampState = off;
            }
        },
        "M13": {
            "Description": "Spindle on (clockwise rotation) and coolant on (flood)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "This one M-code does the work of both M03 and M08. It is not unusual for  specific machine models to have such combined commands, which make for  shorter, more quickly written programs.",
            'action': function() {
                spindleState = 'on';
                spindleRotation = 'clockwise';
                coolantState = 'flood';
            }
        },
        "M19": {
            "Description": "Spindle orientation",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Spindle orientation is more often called within cycles (automatically) or  during setup (manually), but it is also available under program control via  *M19*. The abbreviation OSS (oriented spindle stop) may be seen in  reference to an oriented stop within cycles.   The relevance of spindle orientation has increased as technology has  advanced. Although 4- and 5-axis contour milling and CNC single-pointing  have depended on spindle position encoders for decades, before the advent  of widespread live tooling and mill-turn/turn-mill systems, it was seldom  relevant in \"regular\" (non-\"special\") machining for the operator (as  opposed to the machine) to know the angular orientation of a spindle except  for within a few restricted contexts (such as tool change, or G76 fine  boring cycles with choreographed tool retraction). Most milling of features  indexed around a turned workpiece was accomplished with separate operations  on indexing head setups; in a sense, indexing heads were invented as  separate pieces of equipment, to be used in separate operations, which  could provide precise spindle orientation in a world where it otherwise  mostly didn't exist (and didn't need to). But as CAD/CAM and multiaxis CNC  machining with multiple rotary-cutter axes becomes the norm, even for  \"regular\" (non-\"special\") applications, machinists now frequently care  about stepping just about *any* spindle through its 360° with precision.",
            'action': function() {
                
            }
        },
        "M21": {
            "Description": "Tailstock forward",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M22": {
            "Description": "Tailstock backward",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M23": {
            "Description": "Thread gradual pullout ON",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M24": {
            "Description": "Thread gradual pullout OFF",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M30": {
            "Description": "End of program, with return to program top",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Today M30 is considered the standard program-end code, and will return  execution to the top of the program. Today most controls also still support  the original program-end code, M02, usually by treating it as equivalent to  M30. *Additional info:* Compare M02 with M30. First, M02 was created, in  the days when the punched tape was expected to be short enough to be  spliced into a continuous loop (which is why on old controls, M02 triggered  no tape rewinding).[7] The other program-end code, M30, was added later to  accommodate longer punched tapes, which were wound on a reel and thus  needed rewinding before another cycle could start.[7] On many newer  controls, there is no longer a difference in how the codes are  executed—both act like M30.",
            'action': function() {
                
            }
        },
        "M41": {
            "Description": "Gear select – gear 1",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M42": {
            "Description": "Gear select – gear 2",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M43": {
            "Description": "Gear select – gear 3",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M44": {
            "Description": "Gear select – gear 4",
            "Milling ( M )": "",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M48": {
            "Description": "Feedrate override allowed",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M49": {
            "Description": "Feedrate override NOT allowed",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Prevent MFO. This rule is also usually called (automatically) within  tapping cycles or single-point threading cycles, where feed is precisely  correlated to speed. Same with spindle speed override (SSO) and feed hold  button. Some controls are capable of providing SSO and MFO during threading.",
            'action': function() {
                
            }
        },
        "M52": {
            "Description": "Unload Last tool from spindle",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Also empty spindle.",
            'action': function() {
                
            }
        },
        "M60": {
            "Description": "Automatic pallet change (APC)",
            "Milling ( M )": "M",
            "Turning ( T )": "",
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                
            }
        },
        "M98": {
            "Description": "Subprogram call",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Takes an address P to specify which subprogram to call, for example, \"M98  P8979\" calls subprogram O8979.",
            'action': function() {
                
            }
        },
        "M99": {
            "Description": "Subprogram end",
            "Milling ( M )": "M",
            "Turning ( T )": "T",
            "Corollary info": "Usually placed at end of subprogram, where it returns execution control to  the main program. The default is that control returns to the block  following the M98 call in the main program. Return to a different block  number can be specified by a P address. M99 can also be used in main  program with block skip for endless loop of main program on bar work on  lathes (until operator toggles block skip).",
            'action': function() {
                
            }
        }
    };

    var letterAddresses = {
        "A": {
            "Description": "Absolute or incremental position of A axis (rotational axis around X axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "B": {
            "Description": "Absolute or incremental position of B axis (rotational axis around Y axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "C": {
            "Description": "Absolute or incremental position of C axis (rotational axis around Z axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "D": {
            "Description": "Defines diameter or radial offset used for cutter compensation. D is used for depth of cut on lathes. It is used for aperture selection and commands on photoplotters.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "E": {
            "Description": "Precision feedrate for threading on lathes",
            "Corollary info": "",
            "action": function() {

            }
        },
        "F": {
            "Description": "Defines feed rate",
            "Corollary info": "Common units are distance per time for mills (inches per minute, IPM, or millimeters per minute, mm/min) and distance per revolution for lathes (inches per revolution, IPR, or millimeters per revolution, mm/rev)",
            "action": function() {

            }
        },
        "*G*": {
            "Description": "Address for preparatory commands",
            "Corollary info": "G commands often tell the control what kind of motion is wanted (e.g., rapid positioning, linear feed, circular feed, fixed cycle) or what offset value to use.",
            "action": function() {

            }
        },
        "H": {
            "Description": "Defines tool length offset; Incremental axis corresponding to C axis (e.g., on a turn-mill)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "I": {
            "Description": "Defines arc center in X axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "J": {
            "Description": "Defines arc center in Y axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "K": {
            "Description": "Defines arc center in Z axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles, equal to L address.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "L": {
            "Description": "Fixed cycle loop count; Specification of what register to edit using G10",
            "Corollary info": "*Fixed cycle loop count:* Defines number of repetitions (\"loops\") of a fixed cycle at *each* position. Assumed to be 1 unless programmed with another integer. Sometimes the K address is used instead of L. With incremental positioning (G91), a series of equally spaced holes can be programmed as a loop rather than as individual positions. *G10 use:* Specification of what register to edit (work offsets, tool radius offsets, tool length offsets, etc.).",
            "action": function() {

            }
        },
        "*M*": {
            "Description": "Miscellaneous function",
            "Corollary info": "Action code, auxiliary command; descriptions vary. Many M-codes call for machine functions, which is why people often say that the \"M\" stands for \"machine\", although it was not intended to.",
            "action": function() {

            }
        },
        "N": {
            "Description": "Line (block) number in program; System parameter number to be changed using G10",
            "Corollary info": "*Line (block) numbers:* Optional, so often omitted. Necessary for certain tasks, such as M99 P address (to tell the control which block of the program to return to if not the default one) or GoTo statements (if the control supports those). N numbering need not increment by 1 (for example, it can increment by 10, 20, or 1000) and can be used on every block or only in certain spots throughout a program. *System parameter number:* G10 allows changing of system parameters under program control.",
            "action": function() {

            }
        },
        "O": {
            "Description": "Program name",
            "Corollary info": "For example, O4501. For many years it was common for CNC control displays to use slashed zero glyphs to ensure effortless distinction of letter \"O\" from digit \"0\". Today's GUI controls often have a choice of fonts, like a PC does.",
            "action": function() {

            }
        },
        "P": {
            "Description": "Serves as parameter address for various G and M codes",
            "Corollary info": "- With G04, defines dwell time value. - Also serves as a parameter in some canned cycles, representing dwell times or other variables. - Also used in the calling and termination of subprograms. (With M98, it specifies which subprogram to call; with M99, it specifies which block number of the main program to return to.)",
            "action": function() {

            }
        },
        "Q": {
            "Description": "Peck increment in canned cycles",
            "Corollary info": "For example, G73, G83 (peck drilling cycles)",
            "action": function() {

            }
        },
        "R": {
            "Description": "Defines size of arc radius, or defines retract height in milling canned cycles",
            "Corollary info": "For radii, not all controls support the R address for G02 and G03, in which case IJK vectors are used. For retract height, the \"R level\", as it's called, is returned to if G99 is programmed.",
            "action": function() {

            }
        },
        "S": {
            "Description": "Defines speed, either spindle speed or surface speed depending on mode",
            "Corollary info": "Data type = integer. In G97 mode (which is usually the default), an integer after S is interpreted as a number of rev/min (rpm). In G96 mode (CSS), an integer after S is interpreted as surface speed—sfm (G20) or m/min (G21). See also Speeds and feeds. On multifunction (turn-mill or mill-turn) machines, which spindle gets the input (main spindle or subspindles) is determined by other M codes.",
            "action": function() {

            }
        },
        "T": {
            "Description": "Tool selection",
            "Corollary info": "To understand how the T address works and how it interacts (or not) with M06, one must study the various methods, such as lathe turret programming, ATC fixed tool selection, ATC random memory tool selection, the concept of \"next tool waiting\", and empty tools. Programming on any particular machine tool requires knowing which method that machine uses. Ways of obtaining this training are mentioned in the comments for M06.",
            "action": function() {

            }
        },
        "U": {
            "Description": "Incremental axis corresponding to X axis (typically only lathe group A controls) Also defines dwell time on some machines (instead of \"P\" or \"X\").",
            "Corollary info": "In these controls, X and U obviate G90 and G91, respectively. On these lathes, G90 is instead a fixed cycle address for roughing.",
            "action": function() {

            }
        },
        "V": {
            "Description": "Incremental axis corresponding to Y axis",
            "Corollary info": "Until the 2000s, the V address was very rarely used, because most lathes that used U and W didn't have a Y-axis, so they didn't use V. (Green *et al.* 1996[5] did not even list V in their table of addresses.) That is still often the case, although the proliferation of live lathe tooling and turn-mill machining has made V address usage less rare than it used to be (Smid 2008[3] shows an example). See also G18.",
            "action": function() {

            }
            },
        "W": {
            "Description": "Incremental axis corresponding to Z axis (typically only lathe group A controls)",
            "Corollary info": "In these controls, Z and W obviate G90 and G91, respectively. On these lathes, G90 is instead a fixed cycle address for roughing.",
            "action": function() {

            }
        },
        "*X*": {
            "Description": "Absolute or incremental position of X axis. Also defines dwell time on some machines (instead of \"P\" or \"U\").",
            "Corollary info": "",
            "action": function() {

            }
        },
        "*Y*": {
            "Description": "Absolute or incremental position of Y axis",
            "Corollary info": "",
            "action": function() {

            }
        },
        "*Z*": {
            "Description": "Absolute or incremental position of Z axis",
            "Corollary info": "The main spindle's axis of rotation often determines which axis of a machine tool is labeled as Z.",
            "action": function() {

            }
        }
    };
	this.parseGCode = function() {
		gcode = document.getElementById('gcode').value.split('\n');

		gcode.forEach(function(line) {
			line = line.split(' ');
			line.forEach(function(code) {
				switch (code[0]) {
					case 'A':
						break;

					case 'B':
						break;

					case 'C':
						break;

					case 'D':
						break;

					case 'E':
						break;

					case 'F':
						break;

					case 'G':
						if (! gcodes.hasOwnProperty(code)) {

						} else {
							console.log(code + ': ' + gcodes[code].Description);
							gcodes[code].action();
						}

						break;

					case 'H':
						break;

					case 'I':
						break;

					case 'J':
						break;

					case 'K':
						break;

					case 'L':
						break;

					case 'M':
						console.log(code + ' is a mcode.');
						break;

					case 'N':
						break;

					case 'O':
						break;

					case 'P':
						break;

					case 'Q':
						break;

					case 'R':
						break;

					case 'S':
						break;

					case 'T':
						break;

					case 'U':
						break;

					case 'V':
						break;

					case 'W':
						break;

					case 'X':
						break;

					case 'Y':
						break;

					case 'Z':
						break;

					default:
						break;
				}
			});
		});
	}
};
