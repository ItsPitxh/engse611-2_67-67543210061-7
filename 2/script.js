// เลือก Elements
const form = document.querySelector('form');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');
let todos = [];

function addTodo() {
  const todoText = taskInput.value.trim();
    if(todoText.length > 0) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(todo);
        taskInput.value = '';
        console.log(todos);
        renderTodos();
    }
  renderTodos();
}

function toggleTodo(id) {
  console.log("Hello Toggle" + id);
  todos = todos.map(todo =>  {
    if(todo.id === id) {
      todo.completed = !todo.completed
    }

    return todo;
  });

  renderTodos();
}


function removeTodo(id){ 
  todos = todos.filter(todo => todo.id !== id);

  renderTodos();
}

function removeAll(){ 
  todos = [];
  renderTodos();
}

function removeCompleted(){
  todos = todos.filter(todo=> todo.completed === false);
  renderTodos();
}






// แสดงรายการ Todo
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="task-actions">
        <button class="toggle" data-index="${index}" onclick='toggleTodo(${todo.id});'>${todo.completed ? '↩️' : '✓'}</button>
        <button class="delete" data-index="${index}" onclick='removeTodo(${todo.id});'>🗑️</button>
      </div>
    `;
    
    todoList.appendChild(li);
  });
  
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
})
