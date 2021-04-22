export default class DisplayContent {
    constructor(taskList) {
        this.taskList = taskList;
        this.content = document.querySelector('#content');
    }

    static createContainer() {
        const container = document.createElement('div');
        container.className = 'task-container';
        return container;
    }

    static createHeader(task) {
        const headerContainer = document.createElement('div');
        const header = document.createElement('h3');
        const edit = document.createElement('button');
        const removeButton = document.createElement('button');
        const checkbox = document.createElement('input');

        headerContainer.className = 'tasks';
        header.textContent = task.title;

        edit.textContent = 'edit';
        edit.className = 'edit-button';
        edit.dataset.taskId = task.id;

        removeButton.textContent = 'remove';
        removeButton.className = 'remove';
        removeButton.dataset.taskId = task.id;

        checkbox.setAttribute('type', 'checkbox');

        headerContainer.appendChild(checkbox);
        headerContainer.appendChild(header);
        headerContainer.appendChild(edit);
        headerContainer.appendChild(removeButton);

        return headerContainer;
    }

    static createDetails(task) {
        const detailsHeaders = ['Date', 'Priority', 'Description'];
        const details = [task.date, task.priority, task.description];

        const detailsDiv = document.createElement('div');

        for (let i = 0; i < detailsHeaders.length; i++) {
            const header = document.createElement('h4');
            const info = document.createElement('p');

            header.textContent = detailsHeaders[i];
            info.textContent = details[i];

            detailsDiv.appendChild(header);
            detailsDiv.appendChild(info);
        }

        detailsDiv.className = 'details';

        return detailsDiv;
    }

    static contentEvents(content) {
        content.addEventListener('click', (event) => {
            const taskContainer = event.target.closest('.task-container');

            if (!taskContainer) {
                return;
            } else if (event.target.tagName === 'INPUT') {
                DisplayContent.changeStatus(taskContainer);
            } else {
                DisplayContent.showDetails(taskContainer);
            }
        });
    }

    static showDetails(container) {
        const details = container.children[1];
        details.hidden = !details.hidden;
    }

    static changeStatus(container) {
        container.classList.toggle('finished');
    }

    displayTasks(sectionHeader) {
        const header = document.createElement('h2');
        header.textContent = sectionHeader;

        this.content.textContent = '';
        this.content.appendChild(header);

        for (let task of this.taskList) {
            const content = DisplayContent.createContainer();
            content.appendChild(DisplayContent.createHeader(task));
            content.appendChild(DisplayContent.createDetails(task));
            this.content.appendChild(content);
        }

        DisplayContent.contentEvents(this.content);
    }
}
