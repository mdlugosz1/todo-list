import Form from './form';
import Task from './task';
import Project from './project';
import Menu from './menu';
import ToDoList from './todolist';
import DisplayContent from './content';

export default class InitializeApp {
    static setDefaultToDo() {
        const toDoList = new ToDoList();
        const menu = new Menu();
        const testProject = new Project('Default Project');
        //Initializes inbox as separate project to be able to give it unique ID
        const inboxProject = new Project('Inbox');

        const inbox = document.querySelector('#inbox');
        inbox.setAttribute('data-project-id', inboxProject.id);

        toDoList.addProject(inboxProject);
        toDoList.addProject(testProject);

        const task1 = new Task({
            title: 'Default task one',
            date: '2020-12-12',
            priority: 'High',
            project: inboxProject.id,
            description: 'Default task one',
        });

        const task2 = new Task({
            title: 'Default task two',
            date: '2020-12-12',
            priority: 'High',
            project: inboxProject.id,
            description: 'Default task two',
        });

        const task3 = new Task({
            title: 'Default task three',
            date: '2020-12-12',
            priority: 'High',
            project: testProject.id,
            description: 'Default task three',
        });

        task2.isDone = true;
        inboxProject.addTask(task1);
        inboxProject.addTask(task2);
        testProject.addTask(task3);

        const inboxContent = new DisplayContent(inboxProject.getTasks());
        inboxContent.displayTasks(inboxProject.name);
        menu.setActiveElement(inbox);
        menu.renederProjectList(toDoList.getProjects());

        InitializeApp.contentEventHandlers(inboxContent, inboxProject);
        InitializeApp.menuEventHandlers(menu, toDoList);
    }

    static menuEventHandlers(menu, todo) {
        menu.getMenu().addEventListener('click', (event) => {
            const element = event.target;

            if (element.matches('section') || element.matches('#projects')) {
                return;
            } else if (element.matches('#add-project')) {
                setupProjectForm();
            } else {
                menu.setActiveElement(element);

                const activeProject = menu.getActiveElement();
                const findProject = todo.getSpecifiedProject(activeProject);
                const tasks = findProject.getTasks();
                const showTasks = new DisplayContent(tasks);
                showTasks.displayTasks(findProject.name);
                InitializeApp.contentEventHandlers(showTasks, findProject);
            }
        });
    }

    static contentEventHandlers(content, project) {
        content.getContent().addEventListener('click', (event) => {
            const element = event.target.closest('.tasks');
            const dataset = event.target.dataset.taskId;

            if (!element) {
                return;
            } else if (event.target.matches('input')) {
                content.changeStatus(event.target.closest('.task-container'));
                project.findTask(dataset).toogleStatus();
            } else if (element.matches('.remove')) {
                project.removeTask(dataset);
                event.target.closest('.task-container').remove();
            } else if (event.target.matches('.edit-button')) {
                const task = project.findTask(dataset);
                const taskDetails = task.getDetails();
                const form = setupTaskForm();

                form.setValues(taskDetails);
                form.submitEvent(() => {
                    task.editTask(form.getValues());
                    content.getContent().textContent = '';
                    content.displayTasks(project.name);
                    form.remove();
                });
            } else {
                content.showDetails(element);
            }
        });
    }
}
