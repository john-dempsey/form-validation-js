class Validator {
    constructor() {}

    validate(form) {
        let nameField = form.querySelector("#name");
        let categoryInput = form.querySelector("#category");
        let experienceBtns = form.querySelectorAll("[name=experience]");
        let languageBtns = form.querySelectorAll("[name='languages[]']");
        
        let nameError = form.querySelector("#name_error");
        let categoryError = form.querySelector("#category_error");
        let experienceError = form.querySelector("#experience_error");
        let languagesError = form.querySelector("#languages_error");
        
        let errorExists = false;
        
        function showError(errorField, errorMessage) {
            errorField.innerHTML = errorMessage;
            errorExists = true;
        }
        nameError.innerHTML = "";
        categoryError.innerHTML = "";
        experienceError.innerHTML = "";
        languagesError.innerHTML = "";
        errorExists = false;
    
        if (nameField.value === "") {
            showError(nameError, "Name is required");
        }
    
        if (categoryInput.value === "") {
            showError(categoryError, "Category is required");
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
            showError(experienceError, "Experience is required");
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
            showError(languagesError, "Choose one or two languages");
        }

        return errorExists;
    }
}

function onClick(e) {
    e.preventDefault();

    let commentForm = document.getElementById("comment_form");
    let validator = new Validator();
    let errorExists = validator.validate(commentForm);

    // if there was no errors then submit the form
    if (!errorExists) {
        commentForm.submit();
    }
}


let submitBtn = document.getElementById("submit_btn");   
submitBtn.addEventListener("click", onClick);