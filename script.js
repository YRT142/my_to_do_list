const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

// Function to update the remaining tasks count
function updateCounter() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const remainingTasks = totalTasks - completedTasks;
    
    taskCounter.textContent = `${remainingTasks} out of ${totalTasks} task remaining`;
}

// Function to attach event listeners to a task item
function attachTaskEvents(taskItem) {
    const taskText = taskItem.querySelector('.task-text');
    const deleteBtn = taskItem.querySelector('.delete-btn');

    // Toggle completed state on text click
    taskText.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateCounter();
    });

    // Delete task on button click
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        updateCounter();
    });
}

// Initialize listeners for the pre-existing default tasks
document.querySelectorAll('.task-item').forEach(item => {
    attachTaskEvents(item);
});
updateCounter();

// Add new task functionality
addTaskBtn.addEventListener('click', () => {
    const taskTextValue = taskInput.value.trim();
    if (taskTextValue === '') return;

    // Create new elements
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskTextValue;

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = 'Delete Task';

    // Assemble and append
    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);

    // Attach events and update counter
    attachTaskEvents(li);
    updateCounter();

    // Clear input
    taskInput.value = '';
});

// Allow adding task via 'Enter' key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});