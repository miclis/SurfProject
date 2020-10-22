// Dynamic import at build-time
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod.store');
} else {
	module.exports = require('./dev.store');
}
