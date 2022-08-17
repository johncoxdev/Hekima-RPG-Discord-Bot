/**
 * Basic event that is ran when an error has occured.
 */
module.exports = {
	name: 'error',
	execute(error) {
		console.log("*[FATAL ERROR]*:", error)
	},
};