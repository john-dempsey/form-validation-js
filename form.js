let commentForm = document.getElementById("comment_form");

let nameField = document.getElementById("name");
let categoryInput = document.getElementById("category");
let experienceBtns = document.getElementsByName("experience");
let languageBtns = document.getElementsByName("languages[]");

let nameError = document.getElementById("name_error");
let categoryError = document.getElementById("category_error");
let experienceError = document.getElementById("experience_error");
let languagesError = document.getElementById("languages_error");

let submitBtn = document.getElementById("submit_btn");

let errorExists = false;

function showError(errorField, errorMessage) {
    errorField.innerHTML = errorMessage;
    errorExists = true;
}

function onClick(e) {
    e.preventDefault();

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

    // if there was no errors then submit the form
    if (!errorExists) {
        commentForm.submit();
    }
}

submitBtn.addEventListener("click", onClick);