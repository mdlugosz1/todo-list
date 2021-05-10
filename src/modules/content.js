export default class DisplayContent {
    constructor(taskList) {
        this.taskList = taskList;
        this.content = document.createElement('div');
        this.section = document.querySelector('#content');
    }

    static createContainer() {
        const container = document.createElement('div');
        container.className = 'task-container';
        return container;
    }

    static createHeader(task) {
        const headerContainer = document.createElement('div');
        const header = document.createElement('h3');
        const edit = document.createElement('i');
        const removeButton = document.createElement('i');
        const checkbox = document.createElement('input');

        headerContainer.className = 'tasks';
        header.textContent = task.details.title;

        edit.className = 'far fa-edit edit';
        edit.dataset.taskId = task.id;

        removeButton.className = 'far fa-trash-alt remove';
        removeButton.setAttribute('data-task-id', task.id);

        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('data-task-id', task.id);

        if (task.details.priority === 'High') {
            checkbox.classList.add('priority-high');
        } else if (task.details.priority === 'Normal') {
            checkbox.classList.add('priority-normal');
        } else {
            checkbox.classList.add('priority-low');
        }

        headerContainer.append(checkbox, header, edit, removeButton);

        DisplayContent.checkIfDone(task, checkbox);
        return headerContainer;
    }

    static createDetails(task) {
        const detailsHeaders = ['Date', 'Priority', 'Description'];
        const details = [
            task.details.date,
            task.details.priority,
            task.details.description,
        ];

        const detailsDiv = document.createElement('div');

        for (let i = 0; i < detailsHeaders.length; i++) {
            const container = document.createElement('div');
            const header = document.createElement('h4');
            const info = document.createElement('p');

            container.className = 'task-' + detailsHeaders[i].toLowerCase();
            header.textContent = detailsHeaders[i];
            info.textContent = details[i];

            container.append(header, info);
            detailsDiv.append(container);
        }

        detailsDiv.classList.add('details');

        return detailsDiv;
    }

    static checkIfDone(task, checkbox) {
        if (task.isDone === true) {
            checkbox.checked = true;
        }
    }

    showDetails(container) {
        const details = container.nextElementSibling;
        details.classList.toggle('show');
    }

    changeStatus(container) {
        container.classList.toggle('finished');
    }

    displayTasks(sectionHeader) {
        const header = document.createElement('h2');
        header.textContent = sectionHeader;

        this.content.className = 'project-tasks';

        this.section.textContent = '';
        this.section.appendChild(header);

        if (this.taskList.length === 0) {
            this.content.textContent = 'NO TASKS IN THIS PROJECT';
        } else {
            for (let task of this.taskList) {
                const content = DisplayContent.createContainer();
                content.append(
                    DisplayContent.createHeader(task),
                    DisplayContent.createDetails(task)
                );
                this.content.appendChild(content);

                if (task.isDone === true) {
                    content.classList.add('finished');
                }
            }
        }

        this.section.appendChild(this.content);
    }

    getContent() {
        return this.content;
    }
}
