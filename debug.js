'use strict';

function debug(x) {
	console.log('--' + JSON.stringify(x));
	return 0;
}
module.exports.debug = debug;
