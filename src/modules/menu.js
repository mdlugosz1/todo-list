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

                categories.className = 'active';
            }
        });
    }

    renederProjectList(list) {
        const projectsList = this.menu.querySelector('#projects');

        for (let item of list) {
            const project = document.createElement('ul');
            project.textContent = item;
            projectsList.appendChild(project);
        }

        Menu.setActive(this.menu);
    }
}
