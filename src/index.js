import { createForm } from './modules/form';
import { toDoList } from './modules/tasks';




const body = document.body;

body.appendChild(createForm());

const form = document.querySelector('.submit-form') ;
const submit = form.querySelector('button');

submit.addEventListener('click', toDoList.addTask);
