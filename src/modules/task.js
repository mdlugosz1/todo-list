import { v4 as uuidv4 } from 'uuid';

export default class Task {
    constructor(details) {
        this.details = details;
        this.id = uuidv4();
        this.isDone = false;
    }

    toogleStatus() {
        this.isDone = !this.isDone;
        console.log(this.isDone);
    }

    getDetails() {
        return this.details;
    }

    editTask(data) {
        this.details = data;
    }
}
