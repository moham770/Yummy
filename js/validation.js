let name = document.getElementById("name");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let age = document.getElementById("age");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let submit = document.getElementById("submit");


let nameRegex = /^[a-zA-Z]{3,10}$/;
let emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
let phoneNumberRegex = /^(002)?01[0125][0-9]{8}$/;
let ageRegex = /^(1[89]|[2-5]\d|60)$/;
let passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

function validate(regex, element) {
  if (regex.test(element.value)) {
    return true;
  } else {
    return false;
  }
}

function checkValidate() {
  if (
    validate(nameRegex, name) &&
    validate(emailRegex, email) &&
    validate(phoneNumberRegex, phoneNumber) &&
    validate(ageRegex, age) &&
    validate(passwordRegex, password) &&
    password.value === repassword.value
  ) {
    submit.classList.remove("disabled");
  } else {
    submit.classList.add("disabled");
  }
}

name.addEventListener("input", () => {
  if (validate(nameRegex, name) == true) {
    $(name).next().addClass("d-none");
    $(name).addClass("is-valid");
    $(name).removeClass("is-invalid");
    checkValidate();
  } else {
    $(name).next().removeClass("d-none");
    $(name).addClass("is-invalid");
    $(name).removeClass("is-valid");
    checkValidate();
  }
});
email.addEventListener("input", () => {
  if (validate(emailRegex, email) == true) {
    $(email).next().addClass("d-none");
    $(email).addClass("is-valid");
    $(email).removeClass("is-invalid");
    checkValidate();
  } else {
    $(email).next().removeClass("d-none");
    $(email).addClass("is-invalid");
    $(email).removeClass("is-valid");
    checkValidate();
  }
});
phoneNumber.addEventListener("input", () => {
  if (validate(phoneNumberRegex, phoneNumber) == true) {
    $(phoneNumber).next().addClass("d-none");
    $(phoneNumber).addClass("is-valid");
    $(phoneNumber).removeClass("is-invalid");
    checkValidate();
  } else {
    $(phoneNumber).next().removeClass("d-none");
    $(phoneNumber).addClass("is-invalid");
    $(phoneNumber).removeClass("is-valid");
    checkValidate();
  }
});
age.addEventListener("input", () => {
  if (validate(ageRegex, age) == true) {
    $(age).next().addClass("d-none");
    $(age).addClass("is-valid");
    $(age).removeClass("is-invalid");
    checkValidate();
  } else {
    $(age).next().removeClass("d-none");
    $(age).addClass("is-invalid");
    $(age).removeClass("is-valid");
    checkValidate();
  }
});
password.addEventListener("input", () => {
  if (validate(passwordRegex, password) == true) {
    $(password).next().addClass("d-none");
    $(password).removeClass("is-invalid");
    $(password).addClass("is-valid");
    checkValidate();
  } else {
    $(password).next().removeClass("d-none");
    $(password).addClass("is-invalid");
    $(password).removeClass("is-valid");
    checkValidate();
  }
});
repassword.addEventListener("input", () => {
  if (password.value === repassword.value) {
    $(repassword).next().addClass("d-none");
    $(repassword).removeClass("is-invalid");
    $(repassword).addClass("is-valid");
    checkValidate();
  } else {
    $(repassword).next().removeClass("d-none");
    $(repassword).addClass("is-invalid");
    $(repassword).removeClass("is-valid");
    checkValidate();
  }
});

