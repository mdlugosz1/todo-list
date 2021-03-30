export { showList };
import { toDoList } from './tasks';

class DisplayTask {
    constructor(header, id, desc, date, priority) {
        this.header = header;
        this.id = id;
        this.desc = desc;
        this.date = date;
        this.priority = priority;
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'task-container';
        return container;
    }

    createHeader() {
        const headerContainer = document.createElement('div');
        const header = document.createElement('h3');
        const edit = document.createElement('button');
        const remove = document.createElement('button');

        headerContainer.className = 'tasks';
        headerContainer.dataset.taskId = this.id;
        header.textContent = this.header;
        edit.textContent = 'edit';
        edit.className = 'edit-button'
        edit.dataset.takId = this.id;
        remove.textContent = 'remove';
        remove.className = 'remove-button';
        remove.dataset.taskId = this.id;

        headerContainer.appendChild(header);
        headerContainer.appendChild(edit);
        headerContainer.appendChild(remove);

        return headerContainer;
    }

    createDetails() {
        
    }
}

const showList = (list) => {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    
    for (let i = 0; i < list.length; i++) {
        const newTask = new DisplayTask(list[i].title, list[i].id, list[i].description, list[i].date, list[i].priority);
        const container = newTask.createContainer();
        container.appendChild(newTask.createHeader());
        container.appendChild(newTask.createDetails());
        content.appendChild(container);
    }

    const remove = document.querySelectorAll('.remove');
    remove.forEach(button => {
        button.addEventListener('click', toDoList.removeTask);
    });
    showDetails();
};

const showDetails = () => {
    const tasks = document.querySelectorAll('.tasks');

    tasks.forEach(task => {
        task.addEventListener('click', event => {
            const myClick = event.target.dataset.taskId;
            const details = document.querySelectorAll('.details');
            
            for (let detail of details) {
                if (myClick === detail.dataset.taskId) {
                    detail.classList.toggle('show');
                }
            }
        })
    })
};