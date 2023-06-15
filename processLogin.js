var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

function getLogins(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php?action=login', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var logins = JSON.parse(xhr.response);
        searchLogin(logins);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    
    xhr.send();
}

function searchLogin(logins){
    
    if(loginEmail.value==="admin@gmail.com" && loginPassword.value==="admin"){
        window.location.replace("index.php");
    }
    else{
        logins.forEach(login => {
            if(login.email == loginEmail.value){
                if(login.password == loginPassword.value){
                    localStorage.setItem('userID',login.id)
                    window.location.replace("Employ.php");
                    
                }
            }
        });
    }
}

var loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click",function(e){
    getLogins(e);
})