
$(document).ready(
	function()
	{
		$(document).foundation()
		
		var socket = io()
		
		window.onbeforeunload = function(/*e*/)
		{
			socket.emit('end')
			socket.disconnect()
		}
	}
)