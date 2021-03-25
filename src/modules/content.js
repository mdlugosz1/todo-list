export { showList };

class DisplayTask {
    constructor(container, header, id) {
        this.container = container;
        this.header = header;
        this.id = id;
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = this.container;
        return container;
    }

    createHeader() {
        const headerConatiner = document.createElement('div');
        const header = document.createElement('h3');
        const edit = document.createElement('button');
        const remove = document.createElement('button');

        headerConatiner.className = 'tasks';
        header.textContent = this.header;
        edit.textContent = 'edit';
        remove.textContent = 'remove';

        headerConatiner.appendChild(header);
        headerConatiner.appendChild(edit);
        headerConatiner.appendChild(remove);

        headerConatiner.value = this.id;
        return headerConatiner;
    }

    createDetails(desc) {
        const details = document.createElement('div');
        details.textContent = desc;
        details.value = this.id;
        details.className = 'details';
        details.classList.add('hidden');
        return details;
    }
}

const showList = (list) => {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    
    for (let i = 0; i < list.length; i++) {
        const newTask = new DisplayTask('task-container', list[i].title, list[i].id);
        const fuckingContainer = newTask.createContainer();
        fuckingContainer.appendChild(newTask.createHeader());
        fuckingContainer.appendChild(newTask.createDetails(list[i].description));
        content.appendChild(fuckingContainer);
    }

    showDetails();
};

const showDetails = () => {
    const tasks = document.querySelectorAll('.tasks');

    tasks.forEach(task => {
        task.addEventListener('click', event => {
            const myClick = event.target.value;
            const details = document.querySelectorAll('.details');
            
            for (let detail of details) {
                if (myClick === detail.value) {
                    detail.classList.toggle('show');
                }
            }
        })
    })
};