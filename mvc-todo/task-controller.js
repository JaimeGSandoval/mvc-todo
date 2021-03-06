// TaskController.js - This class sits between the view and the model and acts as the glue that binds them together. It allows for easy decoupling of your model and view.

// Whenever the view uses the EventDispatcher, the controller will be there to listen and then update the model.

// Besides that, all the method declarations inside this file should look relatively similar to the View and Model.

var TaskController = function (model, view) {
  console.log('model', model);
  console.log('view', view);
  this.model = model;
  this.view = view;

  this.init();
};

TaskController.prototype = {

  init: function () {
    this.setupHandlers().enable();
  },

  setupHandlers: function () {

    this.addTaskHandler = this.addTask.bind(this);
    this.selectTaskHandler = this.selectTask.bind(this);
    this.unselectTaskHandler = this.unselectTask.bind(this);
    this.completeTaskHandler = this.completeTask.bind(this);
    this.deleteTaskHandler = this.deleteTask.bind(this);
    return this;
  },

  enable: function () {

    this.view.addTaskEvent.attach(this.addTaskHandler);
    this.view.completeTaskEvent.attach(this.completeTaskHandler);
    this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
    this.view.selectTaskEvent.attach(this.selectTaskHandler);
    this.view.unselectTaskEvent.attach(this.unselectTaskHandler);

    return this;
  },


  // points to MODEL to add data
  addTask: function (sender, args) {
    this.model.addTask(args.task);
  },

  selectTask: function (sender, args) {
    this.model.setSelectedTask(args.taskIndex);
  },

  unselectTask: function (sender, args) {
    this.model.unselectTask(args.taskIndex);
  },

  completeTask: function () {
    this.model.setTasksAsCompleted();
  },

  deleteTask: function () {
    this.model.deleteTasks();
  }

};
