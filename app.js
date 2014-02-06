var xmpp = require('simple-xmpp');
var request = require('request');

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

			//console.log(songs);
	 }

		

		if (message.indexOf('!top10') !== -1) {

			console.log(message.substring(7));
			xmpp.send(from, message.substring(7));

			//Make API Call
			request('http://gplayer.herokuapp.com/api/playlist/cloudafrica', function (error, response, body) {
				
				if (!error && response.statusCode == 200) {
				
					var parsedBody = JSON.parse(body);
					playerObject(parsedBody);
				};
		
			});
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

    xmpp.acceptSubscription(from);
    
});

xmpp.on('close', function() {
    console.log('connection has been closed!');
});



xmpp.connect({
        jid	: 'gidilounge5@gmail.com',
        password : 'Fibonacci1234',
        host : 'talk.google.com',
        port : 5222
});

xmpp.subscribe('olumide.southpaw@gmail.com');

xmpp.setPresence('available', 'Gidilounge API');
// check for incoming subscription requests
xmpp.getRoster();



