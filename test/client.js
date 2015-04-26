#!/usr/bin/env node

require.paths.unshift('vendor/mongoose');

var orm = require('mongoose').Mongoose;
orm.model('User', {
  properties: ['name', 'password'],

  cast: {
    name: String,
    password: String
  }
})

var db = orm.connect('mongodb://localhost/chatlantis');
var User = db.model('User');

  //var u = new User();
  //u.name = "user"+Math.random();
  //u.password = 'hi'
  //u.save(function(){console.log('saved')});

  User.find().all(function(array){
    console.log(array);
  })
