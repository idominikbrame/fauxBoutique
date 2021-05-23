console.log("hello i'm the login.js file")
// manual testing passwords TODO:add tests for login.js
let logins = [
  { username: 'admin', password: '1234'}
]

console.log(logins[0].username)
// form input fields
const username = document.querySelector("#login-username");
const password = document.querySelector("#login-password");

// buttons
const submit = document.querySelector('#login-submit');

// event listeners
submit.addEventListener('click', checkValidity);

// validation and credential check
function displayLoginError() {
  document.querySelector('.login-error-message-container').style.opacity = 1;
}

function checkValidity(e) {
  e.preventDefault();
  logClick()
  if(username.value.length != 0 && password.value.length != 0) {
   return checkCredentials()
  }
  displayLoginError()
}

function checkCredentials() {
  let isRegistered = false;
  for(let i = 0; i < logins.length; i++) {
    if(logins[i].username == username.value && logins[i].password == password.value) {
      isRegistered = true;
      alert('you have successfully logged in')
    } else {
      displayLoginError()
    } 
  }  
}

function logClick() {
  console.log('click')
}