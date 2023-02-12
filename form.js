class Validator {
    constructor() {}

    notEmpty(field) {
        return field.value !== "";
    }

    minLength(field, minLen) {
        return field.value.length >= minLen;
    }

    maxLength(field, minLen) {
        return field.value.length <= minLen;
    }

    numeric(field) {
        return !isNaN(field.value) && !isNaN(parseFloat(field.value));
    }

    min(field, minValue) {
        return this.numeric(field) && parseFloat(field.value) >= minValue;
    }

    max(field, maxValue) {
        return this.numeric(field) && parseFloat(field.value) <= maxValue;
    }

    minChecked(buttons, minNum) {
        let count = 0;
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons[i];
            if (btn.checked) {
                count++;
            }
        }
        return count >= minNum;
    }

    maxChecked(buttons, maxNum) {
        let count = 0;
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons[i];
            if (btn.checked) {
                count++;
            }
        }
        return count <= maxNum;
    }
}

class FormValidator {
    constructor(_form) {
        this.validator = new Validator();

        this.form = _form;
        this.errors = null;

        this.nameError = this.form.querySelector("#name_error");
        this.categoryError = this.form.querySelector("#category_error");
        this.experienceError = this.form.querySelector("#experience_error");
        this.languagesError = this.form.querySelector("#languages_error");
    }

    validate() {
        this.errors = [];

        this.validateName();
        this.validateCategory();
        this.validateExperience();
        this.validateLanguages();

        return this.errors.length === 0;
    }

    validateName() {
        let nameField = this.form.querySelector("#name");
        
        if (!this.validator.notEmpty(nameField)) {
            let error = {
                field: this.nameError,
                message: "Name is required"
            };
            this.errors.push(error);
        }
    }

    validateCategory() {
        let categoryInput = this.form.querySelector("#category");

        if (!this.validator.notEmpty(categoryInput)) {
            let error = {
                field: this.categoryError,
                message: "Category is required"
            };
            this.errors.push(error);
        }
    }

    validateExperience() {
        let experienceBtns = this.form.querySelectorAll("[name=experience]");
    
        if (!this.validator.minChecked(experienceBtns, 1)) {
            let error = {
                field: this.experienceError,
                message: "Experience is required"
            };
            this.errors.push(error);
        }
    }

    validateLanguages() {
        let languageBtns = this.form.querySelectorAll("[name='languages[]']");

        let minLang = 1;
        let maxLang = 2;
        if (!this.validator.minChecked(languageBtns, minLang) || !this.validator.maxChecked(languageBtns, maxLang)) {
            let error = {
                field: this.languagesError,
                message: "Choose one or two languages"
            };
            this.errors.push(error);
        }
    }

    showErrors() {
        for (let i = 0; i < this.errors.length; i++) {
            let error = this.errors[i];
            error.field.innerHTML = error.message;
        }
    }

    clearErrors() {
        this.nameError.innerHTML = "";
        this.categoryError.innerHTML = "";
        this.experienceError.innerHTML = "";
        this.languagesError.innerHTML = "";
    }
}

function onClick(e) {
    e.preventDefault();

    let commentForm = document.getElementById("comment_form");
    let validator = new FormValidator(commentForm);
    validator.clearErrors();
    let formValid = validator.validate();

   if (formValid) {
        commentForm.submit();
    }
    else {
        validator.showErrors();
    }
}

let submitBtn = document.getElementById("submit_btn");   
submitBtn.addEventListener("click", onClick);