const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const filters = document.querySelectorAll('.filter-btn');
const countSpan = document.querySelector('#todoCount');
const clearBtn = document.querySelector('#clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function renderTodos() {
    todoList.textContent = ''; 
    let filteredTodos = todos;
    
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';
        delBtn.className = 'delete-btn';
        
        li.append(span, delBtn);
        todoList.append(li);
    });
    
    updateCount();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    countSpan.textContent = `${activeCount} items left`;
}

todoList.addEventListener('click', (e) => {
    const id = Number(e.target.closest('li').dataset.id);
    
    if (e.target.tagName === 'SPAN') {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        renderTodos();
    }
    
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    }
});

todoList.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'SPAN') {
        const id = Number(e.target.closest('li').dataset.id);
        const todo = todos.find(t => t.id === id);
        
        const editInput = document.createElement('input');
        editInput.value = todo.text;
        
        editInput.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                todo.text = editInput.value.trim();
                renderTodos();
            }
        });
        
        e.target.replaceWith(editInput);
        editInput.focus();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    
    todos.push({ id: Date.now(), text, completed: false });
    input.value = '';
    renderTodos();
});

clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        renderTodos();
    });
});

renderTodos();