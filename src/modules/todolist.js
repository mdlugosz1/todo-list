import { parseISO, differenceInCalendarDays } from 'date-fns/esm//fp';

export default class ToDoList {
    constructor() {
        this.projects = [];
    }

    getAllTasks() {
        const allTasks = this.projects.map((project) => project.tasks).flat();
        return allTasks;
    }

    todayTasks() {
        const todayTasks = this.getAllTasks().filter((task) => {
            const today = new Date();
            const taskDate = parseISO(task.details.date);

            if (differenceInCalendarDays(today)(taskDate) === 0) {
                return task;
            }
        });

        return todayTasks;
    }

    nextWeekTasks() {
        const nextWeek = this.getAllTasks().filter((task) => {
            const today = new Date();
            const taskDate = parseISO(task.details.date);
            const difference = differenceInCalendarDays(today)(taskDate);

            if (difference <= 7 && difference >= 1) {
                return task;
            }
        });

        return nextWeek;
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
