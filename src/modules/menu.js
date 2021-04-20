export default class Menu {
    renederList(list) {
        const projectsList = document.querySelector('#projects');

        for (let item of list) {
            const project = document.createElement('ul');
            project.textContent = item.name;
            projectsList.appendChild(project);
        }
    }

    showTodayTasks() {}

    showWeeklyTasks() {}
}
