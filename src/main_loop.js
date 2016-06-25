	this.parseGCode = function(gcode) {
		gcode = gcode.split('\n');

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
						letterAddresses.F.action(code.substring(1));
						break;

					case 'G':
						if (code.length < 3) {
							code = zeroPad(code);
						}
						if (! gcodes.hasOwnProperty(code)) {
							console.log('Error: No such code as ' + code);
						} else {
							// console.log(code + ': ' + gcodes[code].Description);
							gcodes[code].action(cleanComments(line));
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
						if (code.length < 3) {
							code = zeroPad(code);
						}
						if (! mcodes.hasOwnProperty(code)) {
							console.log('Error: No such code as ' + code);
						} else {
							// console.log(code + ': ' + mcodes[code].Description);
							mcodes[code].action(cleanComments(line));
						}
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