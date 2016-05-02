(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function test_socket_1(runtime) {
	// TEST 1
	var svc_name = 'html_assets_1';
	runtime.register_service(svc_name, {});

	var svc = runtime.service(svc_name);
	var svc_socket = svc.socket;
	var svc_in = runtime.service(svc_name).get.in;

	// SERVICE SOCKET OPERATIONS
	svc_socket.on('disconnect', function () /*data*/{
		console.log('receive /' + svc_name + '/disconnect:');
		svc_socket.disconnect();
	});

	svc_socket.on('end', function () /*data*/{
		console.log('receive /' + svc_name + '/end:');
		svc_socket.disconnect();
	});

	svc_socket.on('pong', function (data) {
		console.log('receive ping response for svc:' + svc_name, data);
	});

	// OTHERS OPERATIONS
	svc_socket.on('get', function (data) {
		console.log('receive /' + svc_name + '/get:', data);
	});

	svc_in.log();

	runtime.ping();
	svc.ping();
	svc.get({ msg: 'get all with get' });
}

function test_socket_2(runtime) {
	// TEST 1
	var svc_name = 'metrics';
	runtime.register_service(svc_name, {});

	var svc = runtime.service(svc_name);
	var svc_socket = svc.socket;
	// var svc_in = runtime.service(svc_name).get.in

	// SERVICE SOCKET OPERATIONS
	svc_socket.on('disconnect', function () /*data*/{
		console.log('receive /' + svc_name + '/disconnect:');
		svc_socket.disconnect();
	});

	svc_socket.on('end', function () /*data*/{
		console.log('receive /' + svc_name + '/end:');
		svc_socket.disconnect();
	});

	// OTHERS OPERATIONS
	svc_socket.on('get', function (data) {
		console.log('receive /' + svc_name + '/get:', data);
	});

	var metrics_get_stream = svc.get();
	metrics_get_stream.onValue(function (value) {
		console.log(value, 'test_socket_2:received metrics');
	});

	svc.subscribe();

	var metrics_post_stream = svc.post();
	metrics_post_stream.onValue(function (data) {
		console.log('receive /' + svc_name + '/post:', data);
	});
}

$(document).ready(function () {
	$(document).foundation();

	var socket = io();

	var test_live = 'aaa';
	console.log(test_live, 'livereload browser');

	socket.emit('hello world !!');
	socket.on('welcome', function (msg) {
		console.log('msg received', msg);
	});

	var ClientRuntime = require('client_runtime').default;
	var runtime = new ClientRuntime();

	// test_socket_1(runtime)
	test_socket_2(runtime);

	window.onbeforeunload = function () /*e*/{
		socket.emit('end');
		socket.disconnect();
	};
});


},{"client_runtime":"client_runtime"}]},{},[1]);
