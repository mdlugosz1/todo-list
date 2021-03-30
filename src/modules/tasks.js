import { v4 as uuidv4 } from 'uuid';
import { showList } from './content';
import { getFormData } from './form';
export { toDoList };

class Project {
    constructor(title) {
        this.title = title;
    }
}

class Task extends Project {
    constructor(title, description, date, priority) {
        super(title);
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.id = uuidv4();
        this.isDone = false;
    }
}

const toDoList = (() => {    
    const taskList = [new Task('Test task', 'test test test test test test', '2021-11-11', 'High')];
    
    const addTask = () => {
        const task = new Task(getFormData().title, getFormData().description, getFormData().date, getFormData().priority);
        //document.querySelector('form').remove();
        taskList.push(task);
        showList(taskList);
    };

    const removeTask = (e) => {
        const removeButtonData = e.target.dataset.taskId;

        for (let i = 0; i < taskList.length; i++) {
            if (removeButtonData === taskList[i].id) {
                taskList.splice(i, 1);
            }
        }

        showList(taskList);
    };

    showList(taskList);
    return {
        addTask,
        removeTask,
    }
})();