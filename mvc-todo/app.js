// App.js - This file is responsible for kicking off the app. An instance of the Model-View-Controller gets created here.

// MODEL and VIEW get passed to CONTROLLER as arguments

$(function () {
  var model = new TaskModel(),
    view = new TaskView(model),
    controller = new TaskController(model, view);
});
