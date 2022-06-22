
let doneTasks = [];


function loadDoneTask(){
    let doneTask = JSON.parse(localStorage.getItem('doneTasks'));
    console.log(doneTask);
    if (doneTask !== null){
        doneTasks = doneTask;
    }
}

function storeDoneTask() {
    localStorage.setItem("doneTasks",JSON.stringify(doneTasks));
}


function displayTask(){
    let container = document.getElementById('container');
    container.remove();
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    for(let index = 0; index < doneTasks.length; index++) {
        let taskDone = doneTasks[index];

        let cardTask = document.createElement('div');
        cardTask.className = 'card';
        cardTask.dataset.index = index;

        container.appendChild(cardTask);
        
        let headerCard = document.createElement('div');
        headerCard.className = 'title';

        let titleTask = document.createElement('h4');
        let hr = document.createElement('hr');
        titleTask.textContent = taskDone.title;
        headerCard.appendChild(titleTask);

        let bodyTask = document.createElement('div');
        bodyTask.className = 'body';
        bodyTask.textContent = taskDone.description;

        let time = document.createElement('div');
        time.className = 'time';

        let date = document.createElement('span');
        let timeStart = document.createElement('span');
        let timeEnd = document.createElement('span');
        date.textContent = "Date : "  + taskDone.date;
        time.appendChild(date);

        timeStart.textContent = "Time Start : " + taskDone.timeStart;
        time.appendChild(timeStart);

        timeEnd.textContent = "Time End : " + taskDone.timeEnd;
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

function deleteTask(event) {
    let index = event.target.parentElement.parentElement.dataset.index;
    
    doneTasks.splice(index, 1);

    storeDoneTask();

    displayTask();
}

loadDoneTask();
displayTask();