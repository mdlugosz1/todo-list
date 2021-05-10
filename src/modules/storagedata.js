import ToDoList from './todolist';
import Project from './project';
import Task from './task';

//Converts data saved in storage to valid todo list
export default class ConvertFromStorage {
    static convertToDo(list) {
        const toDoList = new ToDoList();
        const userTasks = ConvertFromStorage.convertTasks(list);
        const userProjects = ConvertFromStorage.convertProjects(list);

        userProjects.forEach((project) => {
            for (let i = 0; i < userTasks.length; i++) {
                if (userTasks[i].details.project === project.id) {
                    project.addTask(userTasks[i]);
                }
            }

            toDoList.addProject(project);
        });

        return toDoList;
    }

    static convertProjects(list) {
        let projectList = [];
        list.projects.forEach((project) => {
            let getProject = new Project(project.name);
            getProject.id = project.id;
            projectList.push(getProject);
        });

        return projectList;
    }

    static convertTasks(list) {
        let taskList = [];
        list.projects.forEach((project) => {
            for (let task of project.tasks) {
                let details = new Task(task.details);
                details.isDone = task.isDone;
                taskList.push(details);
            }
        });

        return taskList;
    }
}
