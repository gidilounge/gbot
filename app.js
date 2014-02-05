var xmpp = require('simple-xmpp');
var request = require('request');

xmpp.on('online', function() {
    console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
	
	xmpp.send(from, 'echo: ' + message);
    console.log('%s says %s', from, message);
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('subscribe', function(from) {
if (from === 'a.friend@gmail.com') {
    xmpp.acceptSubscription(from);
    }
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