function Message(id, user_id, text) {
  var id = id;
  var user_id = user_id;

  this.text = text;

  this.__defineGetter__("id", function(){
      return id;
  });

  this.__defineGetter__("user_id", function(){
      return user_id;
  });

  this.getDivId = function () {return ""+user_id+id}
};
exports.Message = Message
