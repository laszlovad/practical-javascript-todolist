var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    //Get number of completed todos.
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    
    // Case 1: If everything's true, make everything false.
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    // Case 2: Otherwise, make everything true.
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

// We want to get access to our buttons and run the appropriate methods when
// somebody clicks those buttons.
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
}

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul'); // Pick the element that we want to insert li elements in.
    todosUl.innerHTML = ''; // Clear the list so the for loop won't duplicate its contents.

    for (var i = 0; i < todoList.todos.length; i++) { // Loop over every element in the todos array.
      var todoLi = document.createElement('li'); // Create a new li element.
      var todo = todoList.todos[i]; // For easier manipulation.
      var todoTextWithCompletion = ''; // This is what we want to log in the end, the combination of completion data and todoText.

      if (todo.completed === true) { // This logic decides what the actual string will be in the variable.
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = i; // Sets the newly created todo's id to its position in the array.
      todoLi.textContent = todoTextWithCompletion; // Add the todo text and completion data to the newly created li.
      todoLi.appendChild(this.createDeleteButton()); // Adds a delete button to the li.
      todosUl.appendChild(todoLi); // Insert the newly created li into the ul.
    }
  },
  createDeleteButton: function() { // It should create a button, then return it.
    var deleteButton = document.createElement('button'); // Creates the button.
    deleteButton.textContent = 'Delete'; // Sets its text.
    deleteButton.className = 'deleteButton'; // Adds a class to it.
    return deleteButton; // Returns it.
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event){
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if a delete button was clicked.
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); // Parses the string into a number then runs handlers.deleteTodo.
      }  
    });
  }
}

view.setUpEventListeners();





