export default class Menu {
    constructor() {
        this.menu = document.querySelector('.menu');
        this.activeElement;
    }

    static clearMenu(projects) {
        const list = projects.querySelectorAll('ul');

        for (let i = list.length - 1; i >= 0; i--) {
            list[i].textContent = '';
        }
    }

    setActiveElement(element) {
        const uls = document.querySelectorAll('ul');
        if (element.id === 'projects') {
            return;
        } else if (element.tagName === 'UL') {
            for (let i = 0; i < uls.length; i++) {
                uls[i].classList.remove('active');
            }

            element.classList.add('active');
            this.activeElement = element;
        }
    }

    renederProjectList(list) {
        const projectsList = this.menu.querySelector('#projects');

        Menu.clearMenu(projectsList);

        for (let item of list) {
            if (item.name === 'Inbox') {
                continue;
            }

            const project = document.createElement('ul');
            project.textContent = item.name;
            project.setAttribute('data-project-id', item.id);

            const removeButton = document.createElement('i');
            removeButton.className = 'far fa-trash-alt';
            removeButton.setAttribute('data-project-id', item.id);

            project.appendChild(removeButton);
            projectsList.appendChild(project);
        }
    }

    addProject(project) {
        const projectsList = this.menu.querySelector('#projects');
        const newProject = document.createElement('ul');
        newProject.textContent = project.name;
        newProject.setAttribute('data-project-id', project.id);
        const removeButton = document.createElement('i');
        removeButton.className = 'far fa-trash-alt';
        removeButton.setAttribute('data-project-id', project.id);
        newProject.appendChild(removeButton);
        projectsList.appendChild(newProject);
    }

    getActiveElement() {
        const elementAttribute = this.activeElement.getAttribute(
            'data-project-id'
        );

        if (elementAttribute === null) {
            return this.activeElement.id;
        } else {
            return this.activeElement.getAttribute('data-project-id');
        }
    }

    getMenu() {
        return this.menu;
    }
    /* onClick(callback) {
        this.menu.addEventListener('click', callback);
    } */
}
