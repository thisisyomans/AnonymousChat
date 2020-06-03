var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ appId: process.env.APP_ID, key: process.env.KEY, secret: process.env.SECRET, cluster: process.env.CLUSTER });

app.post('/message', function(req, res) {
	var message = req.body.message;
	pusher.trigger('public-chat', 'message-added', { message });
	res.sendStatus(200);
});

app.get('/', function(req, res) {
	res.sendFile('/public/index.html', { root: __dirname });
})

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
});
