export default class Menu {
    constructor() {
        this.menu = document.querySelector('.menu');
        this.activeElement;
    }

    static clearMenu(projects) {
        const list = projects.querySelectorAll('ul');

        for (let i = 0; i < list.length; i++) {
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
        const projectsList = this.menu.querySelector('.new-projects');

        Menu.clearMenu(projectsList);

        for (let item of list) {
            if (item.name !== 'Inbox') {
                const circle = document.createElement('i');
                circle.className = 'fas fa-circle';

                const project = document.createElement('ul');
                project.textContent = item.name;
                project.setAttribute('data-project-id', item.id);

                const removeButton = document.createElement('i');
                removeButton.className = 'far fa-trash-alt';
                removeButton.setAttribute('data-project-id', item.id);

                project.prepend(circle);
                project.appendChild(removeButton);
                projectsList.appendChild(project);
            }
        }
    }

    addProject(project) {
        const projectsList = this.menu.querySelector('.new-projects');
        const newProject = document.createElement('ul');
        const removeButton = document.createElement('i');
        const circle = document.createElement('i');

        circle.className = 'fas fa-circle';

        newProject.textContent = project.name;
        newProject.setAttribute('data-project-id', project.id);

        removeButton.className = 'far fa-trash-alt';
        removeButton.setAttribute('data-project-id', project.id);

        newProject.append(circle, removeButton);

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
}
