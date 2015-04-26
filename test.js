#!/usr/bin/env node

require.paths.unshift('.');
var User = require('lib/User.js').User;
var Message = require('lib/Message.js').Message;
var Hash = require('traverse/hash');
var Reflection = require('lib/Reflection').Reflection;
var util = require('util');

msgs = []//new Hash()
msg1 = (new Message(1, 29034759028341, 'a'));
msg2 = (new Message(2, 2, 'b'));
msgs.push(msg1);
msgs.push(msg2);

//names = users.map(function (u) {return u.name});
var removed;
msgs.forEach(function(e, i, arr) {
    if (e.id == 2) { removed = arr.splice(i,1)[0] }
    });

console.log(removed);


function chat() {
  this.setUser = function(name) {
    this.name = name;
    console.log(this.getUser());
  }

  this.getUser = function() {
    return this.name;
  }
}

//c = new chat()
//c.setUser('hi');
//console.log(c.getUser())
