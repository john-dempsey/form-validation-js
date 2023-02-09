class Validator {
    constructor() {}

    validate(form) {
        let errors = {};

        let nameField = form.querySelector("#name");
        let categoryInput = form.querySelector("#category");
        let experienceBtns = form.querySelectorAll("[name=experience]");
        let languageBtns = form.querySelectorAll("[name='languages[]']");
        
        if (nameField.value === "") {
            errors["name"] = "Name is required";
        }
    
        if (categoryInput.value === "") {
            errors["category"] = "Category is required";
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
            errors["experience"] = "Experience is required";
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
            errors["languages"] = "Choose one or two languages";
        }

        return errors;
    }
}

function showErrors(errors, form) {
    if ("name" in errors) {
        let nameError = form.querySelector("#name_error");
        nameError.innerHTML = errors["name"];
    }
    if ("category" in errors) {
        let categoryError = form.querySelector("#category_error");
        categoryError.innerHTML = errors["category"];
    }
    if ("experience" in errors) {
        let experienceError = form.querySelector("#experience_error");
        experienceError.innerHTML = errors["experience"];
    }
    if ("languages" in errors) {
        let languagesError = form.querySelector("#languages_error");
        languagesError.innerHTML = errors["languages"];
    }

    // for (let key in errors) {
    //     let spanElement = form.querySelector("#" + key + "_error");
    //     let errorMessage = errors[key];
    //     spanElement.innerHTML = errorMessage;
    // }
}

function clearErrors(form) {
    let nameError = form.querySelector("#name_error");
    let categoryError = form.querySelector("#category_error");
    let experienceError = form.querySelector("#experience_error");
    let languagesError = form.querySelector("#languages_error");
    
    nameError.innerHTML = "";
    categoryError.innerHTML = "";
    experienceError.innerHTML = "";
    languagesError.innerHTML = "";
}



function onClick(e) {
    e.preventDefault();

    let commentForm = document.getElementById("comment_form");
    clearErrors(commentForm);
    let validator = new Validator();
    let errors = validator.validate(commentForm);

    // if there was no errors then submit the form
    if (Object.keys(errors).length === 0) {
        commentForm.submit();
    }
    else {
        showErrors(errors, commentForm);
    }
}


let submitBtn = document.getElementById("submit_btn");   
submitBtn.addEventListener("click", onClick);