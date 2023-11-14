document.addEventListener('DOMContentLoaded', function () {

    loadTasks();

    document.getElementById('addTaskBtn').addEventListener('click', addTask);
});



document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();

    document.getElementById('addTaskBtn').addEventListener('click', addTask);
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value));

    li.innerHTML += ' <button onclick="editTask(this)">Edit</button>';
    li.innerHTML += ' <button onclick="deleteTask(this)">Delete</button>';
    li.innerHTML += ' <input type="checkbox" onclick="toggleTaskStatus(this)">';

    taskList.appendChild(li);

    saveTasks();

    taskInput.value = '';
}

function editTask(button) {
    var li = button.parentElement;
    var newText = prompt('Edit task:', li.firstChild.nodeValue);

    if (newText !== null) {
        li.firstChild.nodeValue = newText;

       
        saveTasks();
    }
}

function deleteTask(button) {
    var li = button.parentElement;
    li.remove();


    saveTasks();
}

function toggleTaskStatus(checkbox) {
    var li = checkbox.parentElement;
    li.classList.toggle('completed');

    
    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var task = {
            text: taskList.children[i].firstChild.nodeValue,
            completed: taskList.children[i].classList.contains('completed')
        };
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(tasks[i].text));

        if (tasks[i].completed) {
            li.classList.add('completed');
        }

        li.innerHTML += ' <button onclick="editTask(this)">Edit</button>';
        li.innerHTML += ' <button onclick="deleteTask(this)">Delete</button>';
        li.innerHTML += ' <input type="checkbox" onclick="toggleTaskStatus(this)">';

        taskList.appendChild(li);
    }
}

