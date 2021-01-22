// TaskView.js - This is the largest file in this project and could have been abstracted into multiple views. But for simplicity’s sake, I put everything into one class. The constructor function sets up five Event objects. This allows the view to call the notify() method on each Event object, thus passing the responsibility onto the controller. Next, you see that the constructor calls the init() method. This init method uses method chaining to set up the backbone of this class.

var TaskView = function (model) {
  this.model = model;
  this.addTaskEvent = new Event(this);
  this.selectTaskEvent = new Event(this);
  this.unselectTaskEvent = new Event(this);
  this.completeTaskEvent = new Event(this);
  this.deleteTaskEvent = new Event(this);

  this.init();
};

TaskView.prototype = {

  init: function () {
    this.createChildren()
      .setupHandlers()
      .enable();
  },

  // createChildren() - Caches the $('.js-container') DOM element in a this.$container variable, then refers to that variable for each element thereafter it needs to find(). This is merely a performance thing, and allows jQuery to pull any elements from the variable instead of re-querying/crawling the DOM. Notice the use of return this. This allows for the method chaining inside the previous init() call.

  createChildren: function () {
    // cache the document object
    this.$container = $('.js-container');
    this.$addTaskButton = this.$container.find('.js-add-task-button');
    this.$taskTextBox = this.$container.find('.js-task-textbox');
    this.$tasksContainer = this.$container.find('.js-tasks-container');

    return this;
  },

  // setupHandlers() - This part can be a little tricky to wrap your head around for the first time. This method is setting up the event handlers and changing the scope of the this keyword inside that handler. Basically, whenever you run into a JavaScript event handler and plan to use the ever so famous this keyword inside that callback function, then this is going to reference the actual object or element the event took place on. This is not desirable in many cases, as in the MVC case when you want this to reference the actual class itself. Here, you are calling the bind(this) method on a JavaScript callback function. This changes the this keyword scope to point to that of the class instead of the object or element that initialized that event.

  setupHandlers: function () {

    this.addTaskButtonHandler = this.addTaskButton.bind(this);
    this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
    this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
    this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

    /**
    Handlers from Event Dispatcher
    */
    this.addTaskHandler = this.addTask.bind(this);
    this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
    this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
    this.deleteTasksHandler = this.deleteTasks.bind(this);

    return this;
  },


  // enable() - This method sets up any DOM events and attaches any functions to the Event Dispatcher that were created by the Model. Look at this line of code:

  //   this.model.addTaskEvent.attach(this.addTaskHandler);

  //   What is actually happening here? When the model calls addTaskEvent.notify() your view will run the this.addTaskHandler() method.Sweet! You're actually seeing how the EventDispatcher works! This allows your classes to talk to each other while also staying decoupled. The addTaskHandler() method then calls the show() method which in turn calls the buildList() method and re-renders the HTML list.

  // So what should you take from all of this? Basically, once the model passes responsibility to the view, the view then re- renders the HTML to show the most up - to - date task objects.Also, whenever a user manipulates the view through a DOM event the view then passes off responsibility to the controller.The view does not work directly with the model.

  enable: function () {

    this.$addTaskButton.click(this.addTaskButtonHandler);
    this.$container.on('click', '.js-task', this.selectOrUnselectTaskHandler);
    this.$container.on('click', '.js-complete-task-button', this.completeTaskButtonHandler);
    this.$container.on('click', '.js-delete-task-button', this.deleteTaskButtonHandler);

    /**
     * Event Dispatcher
     */
    this.model.addTaskEvent.attach(this.addTaskHandler);
    this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
    this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
    this.model.deleteTasksEvent.attach(this.deleteTasksHandler);

    return this;
  },

  addTaskButton: function () {
    this.addTaskEvent.notify({
      task: this.$taskTextBox.val()
    });
  },

  completeTaskButton: function () {
    this.completeTaskEvent.notify();
  },

  deleteTaskButton: function () {
    this.deleteTaskEvent.notify();
  },

  selectOrUnselectTask: function () {

    var taskIndex = $(event.target).attr("data-index");

    if ($(event.target).attr('data-task-selected') == 'false') {
      $(event.target).attr('data-task-selected', true);
      this.selectTaskEvent.notify({
        taskIndex: taskIndex
      });
    } else {
      $(event.target).attr('data-task-selected', false);
      this.unselectTaskEvent.notify({
        taskIndex: taskIndex
      });
    }

  },

  show: function () {
    this.buildList();
  },

  buildList: function () {
    var tasks = this.model.getTasks();
    var html = "";
    var $tasksContainer = this.$tasksContainer;

    $tasksContainer.html('');

    var index = 0;
    for (var task in tasks) {

      if (tasks[task].taskStatus == 'completed') {
        html += "<div style='color: green;'>";
      } else {
        html += "<div>";
      }

      $tasksContainer.append(html + "<label><input type='checkbox' class='js-task' data-index=" + index + "data-task-selected='false'>" + tasks[task].taskName + "</label></div>");

      index++;
    }

  },



  /* -------------------- Handlers From Event Dispatcher ----------------- */

  clearTaskTextBox: function () {
    this.$taskTextBox.val('');
  },

  addTask: function () {
    this.show();
  },

  setTasksAsCompleted: function () {
    this.show();

  },

  deleteTasks: function () {
    this.show();

  }

  /* -------------------- End Handlers From Event Dispatcher ----------------- */


};
