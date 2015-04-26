#!/usr/bin/env node

var DNode = require('dnode');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var express = require('express');	
var server = express.createServer();
require.paths.unshift('.');
var User = require('lib/User.js').User;
var Hash = require('traverse/hash');
var js = require('dnode/web').source();

// configuration
server.configure('development', function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  server.set('port', 9001)
});

server.configure(function(){
  server.set('root', __dirname);
  server.use(express.logger());
  server.use(express.methodOverride());
  server.use(express.cookieDecoder());
  server.use(express.staticProvider(__dirname + '/public'))
});

server.get('/dnode.js', function(req,res) {res.send(js)});
server.listen(server.settings['port']);

var users = [];

function startup (client, con) {

  this.test0 = function () {
    this.current_user = new User(con.stream.socketio.sessionId, 'test');
    users.push(this.current_user);
  };

  this.test1 = function (f) {
    f(users);
  };
}

DNode(startup).listen({
  server : server,
  transports : 'websocket xhr-multipart xhr-polling htmlfile'
    .split(/\s+/),
});
