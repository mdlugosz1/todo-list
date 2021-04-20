export default class ToDoList {
    constructor() {
        this.projects = ['Become web developer', 'Conquer the world'];
        this.tasks = [];
    }

    getProjects() {
        return this.projects;
    }

    getTasks() {
        return this.tasks;
    }

    addProject(project) {
        this.projects.push(project);
    }

    addTask(task) {
        this.tasks.push(task);
        console.log(this.projects);
    }
}
