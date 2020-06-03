$(document).ready(function() {
	Pusher.logToConsole = true; //enables pusher logging, don't add in production

	var pusher = new Pusher(process.env.KEY,  {
		cluster: process.env.CLUSTER,
		encrypted: false
	});
	
	let channel = pusher.subscribe('public-chat');
	channel.bind('message-added', onMessageAdded);

	$('#btn-chat').click(function() {
		const message = $("#message").val();
		$("#message").val("");

		//$(".chat").append(message);

		//send message
		$.post( "http://localhost:5000/message", { message } );	
	});
	function onMessageAdded(data) {
                  let template = $("#new-message").html();
                  template = template.replace("{{body}}", data.message);
                  
                  $(".chat").append(template);
          }
});
