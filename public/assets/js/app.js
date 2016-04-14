(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import devapt_browser from '../../../public/assets/js/devapt-browser'

$(document).ready(function () {
	var socket = io();

	socket.emit('hello world !!!');
	socket.on('welcome', function (msg) {
		console.log('msg received', msg);
	});

	var ClientRuntime = require('client_runtime').default;
	var runtime = new ClientRuntime();
	// runtime.register_service('svc1', {})
	runtime.register_service('metrics', {});

	var metrics_socket = runtime.service('metrics').socket;
	var metrics_in = runtime.service('metrics').get.in;
	metrics_socket.on('get', function (data) {
		console.log('receive /metrics/get:', data);
	});

	metrics_socket.on('disconnect', function (data) {
		console.log('receive /metrics/disconnect:');
		metrics_socket.disconnect();
	});

	metrics_socket.on('end', function (data) {
		console.log('receive /metrics/end:');
		metrics_socket.disconnect();
	});

	// metrics_in.onValue( console.debug )
	metrics_in.log();

	// metrics_socket.emit('get', { msg:'get all with emit'})
	runtime.service('metrics').get({ msg: 'get all with get' });

	// console.log(runtime.service('metrics'), 'runtime.service(metrics)')

	// var responses = runtime.service('metrics').get('my get requets')

	window.onbeforeunload = function (e) {
		socket.emit('end');
		socket.disconnect();
	};
});


},{"client_runtime":"client_runtime"}]},{},[1]);
