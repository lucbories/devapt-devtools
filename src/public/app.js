
window.devapt().on_content_rendered(
	function()
	{
		// console.log('devtools:app.js')

		// $(document).foundation()
		
		var socket = io()
		
		window.onbeforeunload = function(/*e*/)
		{
			socket.emit('end')
			socket.disconnect()
		}
	}
)