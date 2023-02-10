class Validator {
    constructor(_form) {
        this.form = _form;
        this.errors = null;

        this.nameError = this.form.querySelector("#name_error");
        this.categoryError = this.form.querySelector("#category_error");
        this.experienceError = this.form.querySelector("#experience_error");
        this.languagesError = this.form.querySelector("#languages_error");
    }

    validate() {
        this.errors = [];

        let nameField = this.form.querySelector("#name");
        let categoryInput = this.form.querySelector("#category");
        let experienceBtns = this.form.querySelectorAll("[name=experience]");
        let languageBtns = this.form.querySelectorAll("[name='languages[]']");
        
        if (nameField.value === "") {
            let error = {
                field: this.nameError,
                message: "Name is required"
            };
            this.errors.push(error);
        }
    
        if (categoryInput.value === "") {
            let error = {
                field: this.categoryError,
                message: "Category is required"
            };
            this.errors.push(error);
        }
    
        let expSelected = false;
        for (let i = 0; i < experienceBtns.length; i++) {
            let btn = experienceBtns[i];
            if (btn.checked) {
                expSelected = true;
                break;
            }
        }
        if (!expSelected) {
            let error = {
                field: this.experienceError,
                message: "Experience is required"
            };
            this.errors.push(error);
        }
    
        let minLang = 1;
        let maxLang = 2;
        let countLang = 0;
        for (let i = 0; i < languageBtns.length; i++) {
            let btn = languageBtns[i];
            if (btn.checked) {
                countLang++;
            }
        }
        if (countLang < minLang || countLang > maxLang) {
            let error = {
                field: this.languagesError,
                message: "Choose one or two languages"
            };
            this.errors.push(error);
        }

        return this.errors.length === 0;
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
    let validator = new Validator(commentForm);
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