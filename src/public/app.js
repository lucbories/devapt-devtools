

function test_socket_1(runtime)
{
	// TEST 1
	const svc_name = 'html_assets_1'
	runtime.register_service(svc_name, {})
	
	var svc = runtime.service(svc_name)
	var svc_socket = svc.socket
	var svc_in = runtime.service(svc_name).get.in
	
	// SERVICE SOCKET OPERATIONS
	svc_socket.on('disconnect',
		(/*data*/) => {
			console.log('receive /' + svc_name + '/disconnect:')
			svc_socket.disconnect()
		}
	)
	
	svc_socket.on('end',
		(/*data*/) => {
			console.log('receive /' + svc_name + '/end:')
			svc_socket.disconnect()
		}
	)
	
	svc_socket.on('pong',
		(data) => {
			console.log('receive ping response for svc:' + svc_name, data)
		}
	)
	
	// OTHERS OPERATIONS
	svc_socket.on('get',
		(data) => {
			console.log('receive /' + svc_name + '/get:', data)
		}
	)
	
	
	svc_in.log()
	
	runtime.ping()
	svc.ping()
	svc.get( { msg:'get all with get'} )
}



function test_socket_2(runtime)
{
	// TEST 1
	const svc_name = 'metrics'
	runtime.register_service(svc_name, {})
	
	var svc = runtime.service(svc_name)
	var svc_socket = svc.socket
	// var svc_in = runtime.service(svc_name).get.in
	
	// SERVICE SOCKET OPERATIONS
	svc_socket.on('disconnect',
		(/*data*/) => {
			console.log('receive /' + svc_name + '/disconnect:')
			svc_socket.disconnect()
		}
	)
	
	svc_socket.on('end',
		(/*data*/) => {
			console.log('receive /' + svc_name + '/end:')
			svc_socket.disconnect()
		}
	)
	
	// OTHERS OPERATIONS
	svc_socket.on('get',
		(data) => {
			console.log('receive /' + svc_name + '/get:', data)
		}
	)
	
	const metrics_get_stream = svc.get()
	metrics_get_stream.onValue(
		(value) => {
			console.log(value, 'test_socket_2:received metrics')
		}
	)
	
	
	svc.subscribe()
	svc_socket.on('post',
		(data) => {
			console.log('receive /' + svc_name + '/post:', data)
		}
	)
}


$(document).ready(
	function()
	{
		$(document).foundation()
		
		var socket = io()
		
		var test_live = 'aaa'
		console.log(test_live, 'livereload browser')
		
		
		socket.emit('hello world !!')
		socket.on('welcome', (msg) => { console.log('msg received', msg) } )
		
		
		var ClientRuntime = require('client_runtime').default
		var runtime = new ClientRuntime()
		
		
		// test_socket_1(runtime)
		test_socket_2(runtime)
		
		
		window.onbeforeunload = function(/*e*/)
		{
			socket.emit('end')
			socket.disconnect()
		}
	}
)