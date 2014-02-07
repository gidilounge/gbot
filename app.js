var xmpp = require('simple-xmpp');
var request = require('request');
var schedule = require('node-schedule');



//Simple Logging
var subscribers = [];

xmpp.on('online', function() {
    console.log('Yes, I\'m connected!');
   

});

xmpp.on('chat', function(from, message) {

	var playerObject = function(myobject) {
		
		for(i=0; i < myobject.tracks.length; i++)
	    {
	     
	        //console.log('Song ID: %s \nPlays: %s \nTrackname: %s \nArtist: %s \n \n', myobject.tracks[i].id, myobject.tracks[i].plays, myobject.tracks[i].title, myobject.tracks[i].artist.name );
	  
	     	//xmpp.send(from, myobject.tracks[i].title);
	     	xmpp.send(from, myobject.tracks[i].artist.name);   

		}

		xmpp.send(from, i + ' Songs found!! ');

			//console.log(songs);
	 }

		

		if ((message.indexOf('gimme10') !== -1) || (message.indexOf('gimme 10') !== -1) ) {

			console.log(message.substring(9));
			xmpp.send(from, message.substring(9));

			//Make API Call
			request('http://gplayer.herokuapp.com/api/playlist/cloudafrica', function (error, response, body) {
				
				if (!error && response.statusCode == 200) {
				
					var parsedBody = JSON.parse(body);
					playerObject(parsedBody);
				};
		
			});
		}
		
		else if ((message.indexOf('add') != -1) && (from == 'olumide.southpaw@gmail.com')) {

			subscribers.push(message.substring(4));

			//xmpp.subscribe(message.substring(4));

			console.log(subscribers);

		}

		else if ((message.indexOf('show') != -1) && (from == 'olumide.southpaw@gmail.com')) {

			subscribers.push(message.substring(4));
			console.log(subscribers);

		}

		else {	
			
			var senderror = 'Sorry, I no understand wetin you mean by ' + message;
			xmpp.send(from, senderror);

		}
	
});



xmpp.on('error', function(err) {
    console.error(err);
});





xmpp.on('subscribe', function(from) {

if (subscribers.indexOf(from) != -1) {
    xmpp.acceptSubscription(from);
	console.log(from + ' has been added to BOT'); 

    }


});

xmpp.on('close', function() {
    console.log('connection has been closed!');
});



xmpp.connect({
        jid	: 'gidilounge5@gmail.com',
        password : '',
        host : 'talk.google.com',
        port : 5222
});



//xmpp.subscribe('olumide.southpaw@gmail.com');




xmpp.setPresence('available', 'Gidilounge API');
// check for incoming subscription requests
xmpp.getRoster();




