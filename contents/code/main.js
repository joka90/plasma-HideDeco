(function () {
  "use strict";

  var state = {
    borderless: {},
 enabled: true
  };


  function isDock(client) {
    return client.specialWindow && (client.resourceName == "plasmashell" || client.resourceName == "latte-dock");
  }

  function screenHaveDock(screen) {
    var clients = workspace.clientList();
    for (var i = 0; i < clients.length; i++) {
      var client = clients[i];
      if (client.screen == screen && isDock(client)) {
        return true;
      }
    }
    return false;
  }

  function onClientMaximizedStateChanged(client, h, v) {
    if (h && v && ! client.specialWindow && screenHaveDock(client.screen) ) {
      if ( client.noBorder ) {
        state.borderless[client.windowId] = true;
      } else {
        client.noBorder = true;
      }
    } else {
      var bless = state.borderless[client.windowId];
      if (bless === undefined || ! bless ) {
        client.noBorder = false;
      } else {
        // set to false here so it is set to true again if we maximize
        state.borderless[client.windowId] = false;
      }
    }
  }

  function onClientAdded(client) {
    if ( ! isDock(client) ) {
      client['clientMaximizedStateChanged(KWin::AbstractClient*,bool,bool)'].connect(onClientMaximizedStateChanged);
    }
  }

  // Connect to existing windows
  var clients = workspace.clientList();
  for (var i = 0; i < clients.length; i++) {
    onClientAdded(clients[i]);
  }

  // Connect to newly created windows
  workspace.clientAdded.connect(onClientAdded);

})();
