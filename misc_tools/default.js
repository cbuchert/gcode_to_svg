$(document).ready(function() {
	$('#tsv-to-JSON').on('click', function() {
		var breakCharacter = '\t',
			newLine = '\n',
			tsv = $('#tsv').val().split(newLine),
			returnObject = {},
			propertyNames = tsv[0].split(breakCharacter),
			outputString = '';

		tsv.splice(0, 1);

		for (var i = 0; i < tsv.length; i++) {
			tsv[i] = tsv[i].split(breakCharacter);
		}

		// console.log(propertyNames);

		tsv.forEach(function(element) {
			returnObject[element[0]] = {};

			for (var i = 1; i < propertyNames.length; i++) {
				returnObject[element[0]][propertyNames[i]] = element[i];
			}
		});

		console.log(returnObject);

		$('.build-objects-from-wikipedia-data>.output>#tsv-output').val(JSON.stringify(returnObject));
	});
});