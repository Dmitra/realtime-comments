//include modules
var EventEmitter = require('events').EventEmitter;
var Hash = require('traverse/hash');
//include libraries
require.paths.unshift('.');
var User = require('lib/User.js').User;
var Message = require('lib/Message.js').Message;
//create instances
var emitter = new EventEmitter;

var users = [];
var msgs = [];

function Chat(client, con) {
  var tself = this;
  con.on('ready', function () {
    emitter.on('joined', client.joined);
    emitter.on('said', client.said);
    emitter.on('parted', client.parted);
  });

  con.on('end', function () {
    emitter.removeListener('joined', client.joined);
    emitter.removeListener('said', client.said);
    emitter.removeListener('parted', client.parted);
    emitter.emit('parted', tself.removeUser(con.stream.socketio.sessionId));
  });

  this.say = function (text) {
    console.log(this.current_user.name);
    if (this.msg) {
      this.msg.text = text
    } else {
      this.msg = new Message(msgs.length, this.current_user.id, text);
    }
    emitter.emit('said', this.msg.getDivId(), this.current_user.name, text);
  };

  //realtime message finished
  this.told = function () {
    msgs.push(this.msg);
    this.msg = null;
  }

  this.setUser = function (name) {
    this.current_user = new User(con.stream.socketio.sessionId, name);
    users.push(this.current_user);
    emitter.emit('joined', this.current_user);
  };

  //returns previous active user, because 'con' variable hasn't been updated yet
  //this.getCurrentUser = function () {
    //return users.filter(function(u) {return u.id == con.stream.socketio.sessionId})[0];
  //};

  this.removeUser = function(id) {
    var removed;
    users.forEach(function(user, i, arr) {
      if (user.id == id) { removed = arr.splice(i,1)[0] }
    });
    return removed;
  }

  this.getNames = function(f) {
    f(users.map(function (u) {return u.name}));
  };

}
exports.Chat = Chat
