class FormElement {
    constructor(name, input, type, options) {
        this.name = name;
        this.input = input;
        this.type = type;
        this.options = options;
    }

    createLabel() {
        const label = document.createElement('label');
        label.setAttribute('for', this.name);
        label.textContent = this.name;
        return label;
    }

    createInput() {
        const attributes = ['type', 'id', 'name'];
        const input = document.createElement(this.input);
        
        for (let i = 0; i < attributes.length; i++) {
            if (i === 0) {
                input.setAttribute(attributes[i], this.type);
            } else {
                input.setAttribute(attributes[i], this.name);
            }
        }

        if (this.input === 'select') {
            input.removeAttribute('type');

            for (let i = 0; i < this.options.length; i++) {
                const option = document.createElement('option');
                option.setAttribute('value', this.options[i]);
                option.textContent = this.options[i];
                input.appendChild(option);
            }
        }

        return input;
    }
}

function createForm() {
    const form = document.createElement('form');
    const formProperties = [['Title', 'input', 'text'], ['Date', 'input', 'date'], ['Prority', 'select', '', ['High', 'Normal', 'Low']], ['Description', 'textarea']];
    const elements = [];
    form.className = 'submit-form';

    //Loop that creates form elements with properties given in formProperties variable
    formProperties.forEach(element => {
        let newElement = new FormElement();
        let keys = Object.keys(newElement);

        for (let i = 0; i < element.length; i++) {
           newElement[keys[i]] = element[i];
        }

        elements.push(newElement);
    });

    for (let i = 0; i < elements.length; i++) {
        form.appendChild(elements[i].createLabel());
        form.appendChild(elements[i].createInput());
    }

    return form;
}

const body = document.body;
const add = document.querySelector('.fas');

    body.appendChild(createForm());
