let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
  // จัดการกับดัชนีที่ไม่ถูกต้อง
  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  // ลบคลาส active จากทุกสไลด์และจุด
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // เพิ่มคลาส active ให้กับสไลด์และจุดปัจจุบัน
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// เพิ่ม event listeners
document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
  resetTimer();
});

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
  resetTimer();
});

dots.forEach(dot => {
  dot.addEventListener('click', function() {
    const slideIndex = parseInt(this.getAttribute('data-index'));
    showSlide(slideIndex);
    resetTimer();
  });
});

// ตั้งค่าสไลด์อัตโนมัติ
function startSlideTimer() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startSlideTimer();
}

// เริ่มต้นสไลด์อัตโนมัติเมื่อโหลดหน้า
startSlideTimer();


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


function openTab(id) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(id).style.display = "block";  
}
