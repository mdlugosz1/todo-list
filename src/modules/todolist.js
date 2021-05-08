export default class ToDoList {
    constructor() {
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }

    getSpecifiedProject(projectID) {
        const project = this.getProjects().find(({ id }) => {
            if (id === projectID) {
                return projectID;
            }
        });

        return project;
    }

    addProject(...projects) {
        for (let project of projects) {
            this.projects.push(project);
        }
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

    getProjectNames() {
        const names = this.projects.map((project) => project.name);
        return names;
    }
}
