
// ======================================
// ACADEMIC PLANNER - JAVASCRIPT
// ======================================

// Get HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskCourse = document.getElementById("task-course");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");

const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

// Store tasks in an array.
// Load previously saved tasks from browser storage.
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

let currentFilter = "all";


// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}


// Update progress statistics

function updateStatistics() {

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    const percentage = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;

    document.getElementById("completion-rate").textContent =
        percentage + "%";

    taskCount.textContent = tasks.length === 0
        ? "You have no tasks yet."
        : "You have " + tasks.length + " tasks.";
}



// Display tasks on the page
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.textContent =
            currentFilter === "all"
                ? "No tasks yet. Add your first task above."
                : "No tasks in this category.";

        taskList.appendChild(emptyMessage);
    }

    filteredTasks.forEach(function(task) {

        const listItem = document.createElement("li");

        const taskDetails = document.createElement("div");

        const taskName = document.createElement("strong");
        taskName.textContent = task.name;

        const courseName = document.createElement("p");
        courseName.textContent = "Course: " + task.course;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + task.date;

        const priority = document.createElement("p");
        priority.textContent = task.priority + " Priority";
        priority.className = "priority-label priority-" +
            task.priority.toLowerCase();
        
            const status = document.createElement("p");
        status.textContent = task.completed ? "Completed" : "Pending";

        if (task.completed) {
            taskName.style.textDecoration = "line-through";
        }

        taskDetails.appendChild(taskName);
        taskDetails.appendChild(courseName);
        taskDetails.appendChild(dueDate);
        taskDetails.appendChild(priority);
        taskDetails.appendChild(status);

        // Complete or undo button
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.type = "button";

        completeButton.addEventListener("click", function() {

            const taskIndex = tasks.findIndex(
                item => item.id === task.id
            );

            if (taskIndex !== -1) {
                tasks[taskIndex].completed =
                    !tasks[taskIndex].completed;

                saveTasks();
                displayTasks();
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(item => item.id !== task.id);

            saveTasks();
            displayTasks();
        });

        listItem.appendChild(taskDetails);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateStatistics();
}


// Add a new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();
    const courseName = taskCourse.value.trim();
    const dueDate = taskDate.value;
    const priorityLevel = taskPriority.value;

    if (!taskName || !courseName || !dueDate || !priorityLevel) {
        alert("Please complete all the task fields.");
        return;
    }

    const newTask = {

        id: Date.now() + Math.random(),

        name: taskName,
        course: courseName,
        date: dueDate,
        priority: priorityLevel,

        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskForm.reset();
});


// Filter tasks
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(filterButton) {
            filterButton.style.backgroundColor = "#D4AF37";
            filterButton.style.color = "#222222";
        });

        button.style.backgroundColor = "#222222";
        button.style.color = "#FFFFFF";

        displayTasks();
    });
});


// Clear completed tasks
clearCompletedButton.addEventListener("click", function() {

    const completedTasks = tasks.filter(task => task.completed);

    if (completedTasks.length === 0) {
        alert("There are no completed tasks to clear.");
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all completed tasks?"
    );

    if (confirmClear) {

        tasks = tasks.filter(task => !task.completed);

        saveTasks();
        displayTasks();
    }
});


// Display saved tasks when the page opens
displayTasks();
