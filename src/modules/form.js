/* HOW TO USE 

Form class was created to be used in any project. If you want to create new form and append it to existing element 
just create new instance of Form with argument equal to HTML element i.e.:

    const form = new Form(document.body);

Next, you can add as much form specified tags and attributes as you want. Every set of tags, names etc. must be added by
using built in method called addInput and must be passed as array of strings:

    form.addInput(['input', 'text', 'description-for-input']);

Example above will create form with input type set to text and name and id set do description-for-input. If you want add more sets of inputs,
just pass more arrays separated by comma.

For tags that need subtags, for exampe <select>, inputs must be added as follows:

    form.addInput(['select', 'some-name', ['option1', 'option2', 'option3']]);

After all tags set, we need to render our Form object which automatically will apend our form to selected element in our newly
created object:

    form.reneder();


*/

export default class Form {
    constructor(element) {
        this.element = element;
        this.tagList = [];
        this.form = document.createElement('form');
        this.button = document.createElement('button');
        this.blocks;
    }

    static createTagObjects(property, list, tagList, typeList) {
        let formObject = {};
        let newProperty = property;

        tagList.forEach((tag) => {
            for (let i = 0; i < newProperty.length; i++) {
                if (tag === newProperty[i]) {
                    Object.assign(formObject, {
                        tag: newProperty[i],
                    });
                    newProperty.splice(i, 1);
                }
            }
        });

        typeList.forEach((type) => {
            for (let i = 0; i < newProperty.length; i++) {
                if (type === newProperty[i]) {
                    Object.assign(formObject, {
                        type: newProperty[i],
                    });
                    newProperty.splice(i, 1);
                }
            }
        });

        for (let i = 0; i < newProperty.length; i++) {
            if (Array.isArray(newProperty[i])) {
                Object.assign(formObject, { subtags: [newProperty[i]] });
            } else {
                Object.assign(formObject, { name: newProperty[i] });
            }
        }

        list.push(formObject);
    }

    static createBlock(tagList) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement(tagList.tag);
        const br = document.createElement('br');

        if (input.tagName === 'SELECT') {
            for (let key of tagList.subtags) {
                for (let i = 0; i < key.length; i++) {
                    const option = document.createElement('option');
                    option.textContent = key[i];
                    option.value = key[i];
                    input.appendChild(option);
                }
            }
        }

        div.className = tagList.name.toLowerCase();
        div.append(label, br, input);

        return div;
    }

    static addButton(button) {
        button.textContent = 'Submit';
        button.className = 'submit';
        button.setAttribute('type', 'button');

        return button;
    }

    addCloseButton() {
        const button = document.createElement('button');
        button.innerHTML = '&times;';
        button.setAttribute('type', 'button');
        button.className = 'close';
        button.addEventListener('click', () => {
            this.remove();
        });
        this.form.appendChild(button);
    }

    setLabels() {
        const labels = this.form.querySelectorAll('label');

        for (let i = 0; i < labels.length; i++) {
            labels[i].setAttribute(
                'for',
                this.tagList[i].name.replace(/\s+/g, '-').toLowerCase()
            );
            labels[i].textContent = this.tagList[i].name;
        }
    }

    setInputAttributes() {
        this.blocks = this.form.querySelectorAll('div');

        for (let i = 0; i < this.blocks.length; i++) {
            let input = this.blocks[i].lastChild;

            if (input.tagName === 'INPUT') {
                input.setAttribute('type', this.tagList[i].type);
            }

            input.setAttribute(
                'id',
                this.tagList[i].name.replace(/\s+/g, '-').toLowerCase()
            );
            input.setAttribute(
                'name',
                this.tagList[i].name.replace(/\s+/g, '-').toLowerCase()
            );
        }
    }

    addInput(...properties) {
        const possibleTypes = [
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ];
        const possibleTags = [
            'input',
            'textarea',
            'button',
            'select',
            'option',
            'optgroup',
            'fieldset',
            'output',
        ];

        for (let property of properties) {
            if (Array.isArray(property)) {
                Form.createTagObjects(
                    property,
                    this.tagList,
                    possibleTags,
                    possibleTypes
                );
            } else {
                console.error(`${property} is not an array.`);
            }
        }
    }

    reneder() {
        for (let tag of this.tagList) {
            this.form.appendChild(Form.createBlock(tag));
        }

        this.setLabels();
        this.setInputAttributes();
        this.form.appendChild(Form.addButton(this.button));
        this.element.appendChild(this.form);
    }

    remove() {
        this.form.remove();
        this.tagList = [];
    }

    validation() {
        for (let block of this.blocks) {
            if (block.lastChild.value === '') {
                alert('Please fill out empty fields');
                return false;
            }
        }
    }

    getValues() {
        const values = {};

        for (let i = 0; i < this.blocks.length; i++) {
            let input = this.blocks[i].lastChild;
            let name = input.getAttribute('name');
            let inputValues = input.value;

            Object.assign(values, { [name]: inputValues });
        }

        return values;
    }

    submitEvent(callback) {
        this.button.addEventListener('click', callback);
    }
}
