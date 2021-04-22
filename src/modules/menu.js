export default class Menu {
    constructor() {
        this.menu = document.querySelector('.menu');
    }

    static setActive(menu) {
        menu.addEventListener('click', (event) => {
            const categories = event.target.closest('ul');
            const uls = menu.querySelectorAll('ul');

            if (categories.id === 'projects') {
                return;
            } else if (categories.tagName === 'UL') {
                for (let i = 0; i < uls.length; i++) {
                    uls[i].classList.remove('active');
                }

                categories.classList.add('active');
            }
        });
    }

    static clearMenu(projects) {
        const list = projects.querySelectorAll('ul');

        for (let i = list.length - 1; i >= 0; i--) {
            list[i].textContent = '';
        }
    }

    renederProjectList(list) {
        const projectsList = this.menu.querySelector('#projects');

        Menu.clearMenu(projectsList);

        for (let item of list) {
            const project = document.createElement('ul');
            project.textContent = item;
            projectsList.appendChild(project);
        }

        Menu.setActive(this.menu);
    }

    getActiveElement(elements) {
        if (elements.classList.contains('active')) {
            return elements.id;
        }
    }
}
