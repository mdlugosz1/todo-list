import Task from './modules/task';
import Project from './modules/project';
import ToDoList from './modules/todolist';
import InitializeApp from './modules/initializeapp';
import ConvertFromStorage from './modules/storagedata';

const startApp = new InitializeApp();

if (localStorage.getItem('list') == null) {
    const defaultToDo = new ToDoList();
    const testProject = new Project('Default Project');
    const task1 = new Task({
        title: 'Default task one',
        date: '2021-05-12',
        priority: 'High',
        project: testProject.id,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    });

    const task2 = new Task({
        title: 'Default task two',
        date: '2021-05-27',
        priority: 'Normal',
        project: testProject.id,
        description: 'Default task two',
    });

    task2.isDone = true;

    const task3 = new Task({
        title: 'Default task three',
        date: '2021-05-16',
        priority: 'Low',
        project: testProject.id,
        description: 'Default task three',
    });

    testProject.addTask(task1);
    testProject.addTask(task2);
    testProject.addTask(task3);
    defaultToDo.addProject(testProject);
    startApp.setToDo(defaultToDo);
} else {
    const userList = JSON.parse(localStorage.getItem('list'));
    const userToDo = ConvertFromStorage.convertToDo(userList);
    startApp.setToDo(userToDo);
}
