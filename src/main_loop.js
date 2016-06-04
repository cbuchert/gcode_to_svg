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