var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};
const backGroundColors = ['#E53935', '#D81B60', '#8E24AA', '#1E88E5', '#3949AB', '#546E7A'];
const completedBackgroundColor = '#43A047';
// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);
    }
});

document.getElementById('item').addEventListener('keydown', function(e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    dataObjectUpdated();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    item.childNodes[1].removeChild(item.childNodes[1].childNodes[0]);
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();
    // Check if the item should be added to the completed list or to re-added to the todo list
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerText = text;
    item.style.backgroundColor = backGroundColors[Math.floor(Math.random() * backGroundColors.length)];

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('i');
    remove.classList.add('fa');
    remove.classList.add('fa-trash');
    remove.classList.add('action');

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    if (!completed) {
        const complete = document.createElement('i');
        complete.classList.add('fa');
        complete.classList.add('fa-check');
        complete.classList.add('action');

        // Add click event for completing the item
        complete.addEventListener('click', completeItem);
        buttons.appendChild(complete);
    }

    buttons.appendChild(remove);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
}

renderTodoList();