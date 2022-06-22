let dom_dilog = document.getElementById('dilog-create');
let header_dilog = document.getElementById('dilog-header');
let button_create = document.getElementById('create-task');


// All tasks
let tasks = [];
let doneTasks = [];

// Store edit task
let storeEditTask = null;

// Show the element
function show(element){
    element.style.display = 'block';
}

// Hide the element
function hide(element){
    element.style.display = 'none';
}

// Cancel the task
function onCancel(){
    hide(dom_dilog);
    window.location.reload();
}

// Store the tasks in the localStorage
function storeTask(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// load the tasks from the localStorage
function loadTask(){
    let taskStorage = JSON.parse(localStorage.getItem('tasks'));
    if(taskStorage !== null){
        tasks = taskStorage;
    }
}

function storeDoneTask(){
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

// Create a new task function
function onCreate(){
    if(storeEditTask != null){
        let editTask = tasks[storeEditTask];
        editTask.title = document.getElementById('title').value;
        editTask.date = document.getElementById('date').value;
        editTask.timeStart = document.getElementById('time-start').value;
        editTask.timeEnd = document.getElementById('time-end').value;

        if((editTask.title != '') && (editTask.date != '') && (editTask.timeStart != '') && (editTask.timeEnd != '') && (editTask.description != '')){

            storeTask();

            displayTask();

            hide(dom_dilog);

            window.location.reload();
        }
        else{
            alert("You are missing input your task! Please! input it.");
        }
    }
    else{
        let newTask = {};
        let titleTask = document.getElementById("title").value;
        let dateTask = document.getElementById("date").value;
        let timeStart = document.getElementById("time-start").value;
        let timeEnd = document.getElementById("time-end").value;
        let description = document.getElementById('description').value;

        if ((titleTask != '') && (dateTask != '') && (timeStart !='') && (timeEnd != '') && (description != '')){
            newTask.title = titleTask;
            newTask.date = dateTask;
            newTask.timeStart = timeStart;
            newTask.timeEnd = timeEnd;
            newTask.description = description;

            tasks.push(newTask);
            
            storeTask();

            displayTask();

            hide(dom_dilog);

            window.location.reload();
        }
        else{
            alert("You are missing input your task! Please! input it.");
        }
    }
}



function displayTask(){
    let container = document.getElementById('container');
    container.remove();
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    
    for(let index = 0; index < tasks.length; index++) {
        let task = tasks[index];

        let cardTask = document.createElement('div');
        cardTask.className = 'card';
        cardTask.dataset.index = index;

        container.appendChild(cardTask);
        
        let headerCard = document.createElement('div');
        headerCard.className = 'title';

        let titleTask = document.createElement('h4');
        let hr = document.createElement('hr');
        let doneIcon = document.createElement('i');
        doneIcon.className = 'fa fa-check-square-o';
        doneIcon.addEventListener('click',doneTask);
        titleTask.textContent = task.title;
        titleTask.addEventListener('click',editTask);
        headerCard.appendChild(titleTask);
        headerCard.appendChild(doneIcon);

        let bodyTask = document.createElement('div');
        bodyTask.className = 'body';
        bodyTask.textContent = task.description;

        let time = document.createElement('div');
        time.className = 'time';

        let date = document.createElement('span');
        let timeStart = document.createElement('span');
        let timeEnd = document.createElement('span');
        date.textContent = "Date : "  + task.date;
        time.appendChild(date);

        timeStart.textContent = "Time Start : " + task.timeStart;
        time.appendChild(timeStart);

        timeEnd.textContent = "Time End : " + task.timeEnd;
        time.appendChild(timeEnd);

        let hrFooter = document.createElement('hr');

        let footer = document.createElement("div");
        footer.className = "footer";
        let trust = document.createElement('i');
        trust.className = "fa fa-trash-o";
        trust.addEventListener('click',deleteTask);
        footer.appendChild(trust);

        cardTask.appendChild(headerCard);
        cardTask.appendChild(hr);
        cardTask.appendChild(bodyTask);
        cardTask.appendChild(time);
        cardTask.appendChild(hrFooter);
        cardTask.appendChild(footer);
    
    }
}

function editTask(event) {
    let editTask = event.target.parentElement.parentElement.dataset.index;
    storeEditTask = editTask;

    let task = tasks[editTask];

    document.getElementById('title').value = task.title;
    document.getElementById('date').value = task.date;
    document.getElementById('description').value = task.description;
    document.getElementById('time-start').value = task.timeStart;
    document.getElementById('time-end').value = task.timeEnd;

    header_dilog.textContent = "Edit Task";
    button_create.textContent = "Update";

    show(dom_dilog);

}


function deleteTask(event){
    let index = event.target.parentElement.parentElement.dataset.index;
    
    tasks.splice(index, 1);

    storeTask();

    displayTask();
}

function doneTask(event) {
    let index = event.target.parentElement.parentElement.dataset.index;
    let doneTask = tasks[index];

    doneTasks.push(doneTask);

    tasks.splice(index,1);

    storeTask();

    storeDoneTask();

    displayTask();
}


loadTask();

displayTask();


