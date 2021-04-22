export default class ToDoList {
    constructor() {
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(projectID) {
        const projectToRemove = this.projects
            .map((project) => project.id)
            .indexOf(projectID);

        this.projects.splice(projectToRemove, 1);
    }

    renameProject(projectID, newName) {
        this.projects.find(({ id }, index) => {
            if (projectID === id) {
                this.projects[index].name = newName;
            }
        });
    }
}
