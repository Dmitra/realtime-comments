#!/usr/bin/env node

//include modules
var DNode = require('dnode');
var express = require('express');	
//include libraries
require.paths.unshift('.');
var Chat = require('lib/Chat.js').Chat;

var server = express.createServer();
var js = require('dnode/web').source();

// configuration
server.configure('development', function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  server.set('port', 9000)
});

server.configure(function(){
  server.set('root', __dirname);
  server.use(express.logger());
  server.use(express.methodOverride());
  server.use(express.cookieDecoder());
  server.use(express.staticProvider(__dirname + '/public'))
});

server.get('/dnode.js', function(req,res) {
    res.headers['Content-Type'] = 'application/javascript';
    res.send(js)
});

server.listen(server.settings['port']);

DNode(Chat).listen({
  server : server
});
