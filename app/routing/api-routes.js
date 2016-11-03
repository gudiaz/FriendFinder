// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var friends = require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

	// ---------------------------------------------------------------------------
	// API GET Requests
	// Below code handles when users "visit" a page
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friendlist', function (request, response) {
		response.json(friends);
	});


	app.post('/api/friend', function (request, response) {
			var newFriend = request.body;
			var sum = [];

			for(var i=0; i<friends.length; i++) {
				sum[i] = 0;

				for(var j=0; j<3; j++) {
					sum[i] += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
				}
				// console.log (sum[i]);	
			}

			friends.push(request.body);
			
			var closestNum = sum.indexOf(Math.min.apply(null,sum));
			var match = friends[closestNum]
			response.json(match); // KEY LINE
	});
}