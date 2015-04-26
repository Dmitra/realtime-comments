function Chat(model) {
  this.joined = function (user) {
    $('<div/>', {
      "class": 'join',
      text: (user.name + ' has joined' + model.text)
    }).appendTo(container);
    container.animate({ scrollTop: container.attr('scrollHeight') }, 200);
  };
  
  this.parted = function (user) {
    $('<div/>', {
      "class": 'part',
      text: (user.name + ' has left')
    }).appendTo(container);
  };
  
  this.said = function (divId, userName, text) {
    var div = $('#'+divId + ' > span'); 
    if (div.length >0) {
      div.text(text);
    } else {
      var newDiv = $('<div/>', {
        id: divId,
        text: '<' + userName + '> : '
      });

      $('<span/>', {text: text}).appendTo(newDiv);
      newDiv.appendTo(container);
    }
  }
}
