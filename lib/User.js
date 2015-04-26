function User(id, name) {
  var id = id;
  var loggedIn = false;

  this.__defineGetter__("id", function(){
      return id;
  });

  this.name = name;

  this.login = function(aName, aId) {
    sessionId = aId;
    name = aName;
  }; 

  isLoggedIn = function() {
    return loggedIn;
  };
};
exports.User = User
