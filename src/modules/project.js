import { v4 as uuidv4 } from 'uuid';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = uuidv4();
    }

    setName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name;
    }

    findTask(taskID) {
        const task = this.tasks.find(({ id }, index) => {
            if (taskID === id) {
                return this.tasks[index];
            }
        });

        return task;
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(id) {
        const taskToRemove = this.tasks.map((task) => task.id).indexOf(id);
        this.tasks.splice(taskToRemove, 1);
    }
}
