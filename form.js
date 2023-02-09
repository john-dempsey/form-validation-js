class Validator {
    constructor(_form) {
        this.form = _form;
        this.errors = null;
    }

    validate() {
        this.errors = {};

        let nameField = this.form.querySelector("#name");
        let categoryInput = this.form.querySelector("#category");
        let experienceBtns = this.form.querySelectorAll("[name=experience]");
        let languageBtns = this.form.querySelectorAll("[name='languages[]']");
        
        if (nameField.value === "") {
            this.errors["name"] = "Name is required";
        }
    
        if (categoryInput.value === "") {
            this.errors["category"] = "Category is required";
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
            this.errors["experience"] = "Experience is required";
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
            this.errors["languages"] = "Choose one or two languages";
        }

        let numErrors = Object.keys(this.errors).length;

        return numErrors === 0;
    }

    showErrors() {
        if ("name" in this.errors) {
            let nameError = this.form.querySelector("#name_error");
            nameError.innerHTML = this.errors["name"];
        }
        if ("category" in this.errors) {
            let categoryError = this.form.querySelector("#category_error");
            categoryError.innerHTML = this.errors["category"];
        }
        if ("experience" in this.errors) {
            let experienceError = this.form.querySelector("#experience_error");
            experienceError.innerHTML = this.errors["experience"];
        }
        if ("languages" in this.errors) {
            let languagesError = this.form.querySelector("#languages_error");
            languagesError.innerHTML = this.errors["languages"];
        }
    }

    clearErrors() {
        let nameError = this.form.querySelector("#name_error");
        let categoryError = this.form.querySelector("#category_error");
        let experienceError = this.form.querySelector("#experience_error");
        let languagesError = this.form.querySelector("#languages_error");
        
        nameError.innerHTML = "";
        categoryError.innerHTML = "";
        experienceError.innerHTML = "";
        languagesError.innerHTML = "";
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