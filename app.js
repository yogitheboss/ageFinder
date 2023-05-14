let error = {
    type: "none"
};

let dd = document.getElementById("day-input");
let mm = document.getElementById("month-input");
let yy = document.getElementById("year-input");
let labels = document.querySelectorAll(".date-block label")
let dayLabel = labels[0];
let monthLabel = labels[1];
let yearLabel = labels[2];
let dateBlocks = document.querySelectorAll('.date-block')
let dayBlock = dateBlocks[0];
let monthBlock = dateBlocks[1];
let yearBlock = dateBlocks[2];


function checkDate() {
    if ((dd.value < 1 || dd.value > 31) && (mm.value < 1 || mm.value > 12) && (yy.value < 1900 || yy.value > 2020)) {

        error.type = "all";
        validate();
    }
    else if ((dd.value < 1 || dd.value > 31) && (mm.value < 1 || mm.value > 12)) {

        error.type = "dd mm";
        validate();
    }
    else if ((dd.value < 1 || dd.value > 31) && (yy.value > 2023)) {

        error.type = "dd yy";
        validate();
    }
    else if ((mm.value < 1 || mm.value > 12) && (yy.value > 2023)) {

        error.type = "mm yy";
        validate();
    }
    else if (dd.value < 1 || dd.value > 31) {

        error.type = "dd";
        validate();
    }

    else if (mm.value < 1 || mm.value > 12) {

        error.type = "mm";
        validate();
    }
    else if (yy.value > 2023) {

        error.type = "yy";
        validate();
    }
    else {
        error.type = "none";
        validate();
    }
}

function validate() {
    switch (error.type) {
        case "none":
            clearStyles();
            updateDateShower();
            break;
        case "all":
            clearStyles();
            handleDateError();
            break;
        case "dd mm":
            clearStyles();
            handleDayError();
            handleMonthError();
            break;
        case "dd yy":
            clearStyles();
            handleDayError();
            handleYearError();
            break;
        case "mm yy":
            clearStyles();
            handleMonthError();
            handleYearError();
            break;
        case "dd":
            clearStyles();
            handleDayError();
            break;
        case "mm":
            clearStyles();
            handleMonthError();
            break;
        case "yy":
            clearStyles();
            handleYearError();
            break;
    }
}

function handleDayError() {

    addErrorStyles();
    let errorText = document.createElement("p");
    errorText.innerHTML = "Please enter a valid day";
    errorText.classList.add("error-text");
    errorText.style.color = "red";
    dayBlock.appendChild(errorText);
}

function handleMonthError() {
    addErrorStyles();
    let errorText = document.createElement("p");
    errorText.innerHTML = "Please enter a valid month";
    errorText.classList.add("error-text");
    errorText.style.color = "red";
    monthBlock.appendChild(errorText);
}

function handleYearError() {
    addErrorStyles();
    let errorText = document.createElement("p");
    errorText.innerHTML = "Please enter a valid year";
    errorText.classList.add("error-text");
    errorText.style.color = "red";
    yearBlock.appendChild(errorText);
    console.log("year error");
}

function handleDateError() {
    console.log("date error");
    addErrorStyles();
    dateBlocks.forEach(dateBlock => {
        let errorText = document.createElement("p");
        errorText.innerHTML = "Please enter a valid date";
        errorText.classList.add("error-text");
        errorText.style.color = "red";
        dateBlock.appendChild(errorText);
    }
    )
}

function addErrorStyles() {
    dd.style.outlineColor = "red";
    mm.style.outlineColor = "red";
    yy.style.outlineColor = "red";
    dd.style.borderColor = "red";
    mm.style.borderColor = "red";
    yy.style.borderColor = "red";
    labels.forEach(label => {
        label.style.color = "red";
    })
}

function clearStyles() {
    console.log("I am called");
    labels.forEach(label => {
        label.style.color = "var(--smoke-grey)";
    })
    dd.style.outlineColor = "black";
    mm.style.outlineColor = "black";
    yy.style.outlineColor = "black";
    dd.style.borderColor = "black";
    mm.style.borderColor = "black";
    yy.style.borderColor = "black";
    for (dateBlock of dateBlocks) {
        if (dateBlock.children.length > 2) {
            console.log("I am called");
            dateBlock.removeChild(dateBlock.lastChild);
        }
    }
}


function updateDateShower() {
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();
    let birth_day = parseInt(dd.value);
    let birth_month = parseInt(mm.value);
    let birth_year = parseInt(yy.value);
    let dayElement = document.getElementById("selected-day");
    let monthElement = document.getElementById("selected-month");
    let yearElement = document.getElementById("selected-year");
    let today_days = today_year * 365 + today_month * 31 + today_day;
    let birth_days = birth_year * 365 + birth_month * 31 + birth_day;
    if (today_days < birth_days) {
        handleDateError();
        return;
    }
    let total_days = today_days - birth_days;
    let total_years = parseInt(total_days / 365);
    let total_months = parseInt((total_days % 365) / 31);
    let total_days_left = parseInt((total_days % 365) % 31);
    dayElement.innerHTML = total_days_left;
    monthElement.innerHTML = total_months;
    yearElement.innerHTML = total_years;
}

