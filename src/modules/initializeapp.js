import Form from './form';
import Task from './task';
import Project from './project';
import Menu from './menu';
import DisplayContent from './content';

export default class InitializeApp {
    /*Changes default values of options tags created by Form object to projects IDs. Thanks to that,
    tasks can be added to projects based on their IDs instead names */
    static changeValuesForOptionsInput(toDo) {
        const select = document.querySelector('#project');
        const options = select.querySelectorAll('option');
        const projects = toDo.getProjects();

        for (let i = 0; i < options.length; i++) {
            const projectID = projects[i].id;
            options[i].setAttribute('value', projectID);
        }
    }

    static setupTaskForm(toDo) {
        const container = document.querySelector('.form-container');
        const taskForm = new Form(container);

        if (toDo === undefined) {
            taskForm.addInput(
                ['input', 'text', 'Title'],
                ['input', 'date', 'Date'],
                ['select', 'Priority', ['High', 'Normal', 'Low']],
                ['textarea', 'Description']
            );
            taskForm.addCloseButton();
            taskForm.reneder();
        } else {
            taskForm.addInput(
                ['input', 'text', 'Title'],
                ['input', 'date', 'Date'],
                ['select', 'Priority', ['High', 'Normal', 'Low']],
                ['select', 'Project', toDo.getProjectNames()],
                ['textarea', 'Description']
            );
            taskForm.addCloseButton();
            taskForm.reneder();
            InitializeApp.changeValuesForOptionsInput(toDo);
        }

        container.classList.add('show');
        return taskForm;
    }

    static formSubmitNewTask(form, toDo, menu) {
        form.getSubmitButton().addEventListener('click', () => {
            const container = document.querySelector('.form-container');

            if (form.validation() === false) {
                return;
            } else {
                const task = new Task(form.getValues());
                const getProject = toDo.getSpecifiedProject(
                    task.getDetails().project
                );

                getProject.addTask(task);
                localStorage.setItem('list', JSON.stringify(toDo));
                form.remove();
                container.classList.remove('show');

                //If task is added to active project refresh content page to show changes
                if (task.getDetails().project == menu.getActiveElement()) {
                    const showTasks = new DisplayContent(getProject.getTasks());
                    showTasks.displayTasks(getProject.name);
                    InitializeApp.contentEventHandlers(
                        showTasks,
                        getProject.id,
                        toDo
                    );
                } else {
                    return;
                }
            }
        });
    }

    static setupProjectForm(toDo, menu) {
        const container = document.querySelector('.form-container');
        const projectForm = new Form(container);
        projectForm.addInput(['Project Name', 'input', 'text']);
        projectForm.addCloseButton();
        projectForm.reneder();
        container.classList.add('show');

        InitializeApp.formSubmitNewProject(projectForm, toDo, menu);
    }

    static formSubmitNewProject(form, toDo, menu) {
        form.getSubmitButton().addEventListener('click', () => {
            const container = document.querySelector('.form-container');
            if (form.validation() === false) {
                return;
            } else {
                const project = new Project(form.getValues()['project-name']);
                toDo.addProject(project);
                menu.addProject(project);
                form.remove();
                container.classList.remove('show');
                localStorage.setItem('list', JSON.stringify(toDo));
            }
        });
    }

    static formSetupEditTask(form, task, content, todo) {
        form.getSubmitButton().addEventListener('click', () => {
            task.editTask(form.getValues());
            content.getContent().textContent = '';
            content.displayTasks(document.querySelector('h2').textContent);
            form.remove();
            document.querySelector('.form-container').classList.remove('show');
            localStorage.setItem('list', JSON.stringify(todo));
        });
    }

    static menuEventHandlers(menu, todo) {
        menu.getMenu().addEventListener('click', (event) => {
            const element = event.target;

            if (element.matches('section') || element.matches('#projects')) {
                return;
            } else if (element.matches('#add-project')) {
                InitializeApp.setupProjectForm(todo, menu);
            } else if (element.matches('.fa-trash-alt')) {
                todo.removeProject(event.target.dataset.projectId);
                event.target.closest('ul').remove();
                localStorage.setItem('list', JSON.stringify(todo));
            } else {
                menu.setActiveElement(element);

                let activeProject = menu.getActiveElement();
                let projectName;
                let taskList;

                if (activeProject === 'today') {
                    taskList = todo.todayTasks();
                    projectName = 'Today';
                } else if (activeProject === 'next-week') {
                    taskList = todo.nextWeekTasks();
                    projectName = 'Next 7 days';
                } else {
                    const findProject = todo.getSpecifiedProject(activeProject);
                    taskList = findProject.getTasks();
                    projectName = findProject.getName();
                }

                const showTasks = new DisplayContent(taskList);

                showTasks.displayTasks(projectName);
                InitializeApp.contentEventHandlers(
                    showTasks,
                    activeProject,
                    todo
                );
            }
        });
    }

    static setTodayOrWeekProject(todo, ID) {
        let todayOrWeekProject;

        if (ID === undefined) {
            return;
        } else {
            const tasks = todo.getAllTasks();
            const thisProject = tasks.find(({ id }) => id === ID);
            todayOrWeekProject = todo.getSpecifiedProject(
                thisProject.getDetails().project
            );
        }

        return todayOrWeekProject;
    }

    static contentEventHandlers(content, projectID, todo) {
        content.getContent().addEventListener('click', (event) => {
            const element = event.target.closest('.tasks');
            const dataset = event.target.dataset.taskId;
            let project = todo.getSpecifiedProject(projectID);

            if (projectID === 'today' || projectID === 'next-week') {
                project = InitializeApp.setTodayOrWeekProject(todo, dataset);
            }

            if (element) {
                content.showDetails(element);
            } else {
                return;
            }

            if (event.target.matches('input')) {
                content.changeStatus(event.target.closest('.task-container'));
                project.findTask(dataset).toogleStatus();
            } else if (event.target.matches('.remove')) {
                project.removeTask(dataset);
                event.target.closest('.task-container').remove();
            } else if (event.target.matches('.edit')) {
                const task = project.findTask(dataset);
                const taskDetails = task.getDetails();
                const form = InitializeApp.setupTaskForm();

                form.setValues(taskDetails);
                InitializeApp.formSetupEditTask(form, task, content, todo);
            }

            localStorage.setItem('list', JSON.stringify(todo));
        });
    }

    setToDo(toDo) {
        const menu = new Menu();
        const inbox = document.querySelector('#inbox');

        //Checks if toDo have inbox project, if not creates new one and if there is one, sets it's id to Inbox in menu
        let isInbox = toDo.getProjects().find(({ name }) => name === 'Inbox');

        if (isInbox === undefined) {
            const inboxProject = new Project('Inbox');
            isInbox = inboxProject;
            inbox.setAttribute('data-project-id', inboxProject.id);
            toDo.addProject(inboxProject);
        } else {
            inbox.setAttribute('data-project-id', isInbox.id);
        }

        const inboxContent = new DisplayContent(isInbox.getTasks());
        inboxContent.displayTasks(isInbox.getName());

        menu.setActiveElement(inbox);
        menu.renederProjectList(toDo.getProjects());

        InitializeApp.contentEventHandlers(inboxContent, isInbox.id, toDo);
        InitializeApp.menuEventHandlers(menu, toDo);

        document.querySelector('#add-task').addEventListener('click', () => {
            const newTask = InitializeApp.setupTaskForm(toDo);
            InitializeApp.formSubmitNewTask(newTask, toDo, menu);
        });
    }
}
