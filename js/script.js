document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const filterOptions = document.getElementById("filterOptions");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => displayTask(task));
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTaskObject(text) {
        return { text, completed: false, id: Date.now() };
    }

    function displayTask(task) {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.dataset.id = task.id;
        li.classList.toggle("completed", task.completed);
        
        li.addEventListener("click", function () {
            toggleTaskCompletion(task.id);
        });
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation();
            removeTask(task.id);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") return;

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = createTaskObject(text);
        tasks.push(newTask);
        saveTasks(tasks);
        displayTask(newTask);
        taskInput.value = "";
    }

    function toggleTaskCompletion(taskId) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
        saveTasks(tasks);
        loadTasks();
    }

    function removeTask(taskId) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        loadTasks();
    }

    function filterTasks(filter) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks
            .filter(task => filter === "all" || (filter === "completed" && task.completed) || (filter === "active" && !task.completed))
            .forEach(task => displayTask(task));
    }

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") addTask();
    });
    filterOptions.addEventListener("change", function () {
        filterTasks(this.value);
    });
    
    loadTasks();
});
