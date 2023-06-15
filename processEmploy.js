import getXMLHttpRequest from "./utilities.js";

var loginID = localStorage.getItem('userID');
console.log("here the id from login to employ page");
console.log(loginID);
window.onload = ()=>{
    getEmploye(loginID);
}


// PROCESS EMPLOY

function getEmploye(loginID) {
    var xhr = new getXMLHttpRequest();
    xhr.open('POST', 'process.php?action=afficher', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var employe = JSON.parse(xhr.response);
        console.log(employe);
        console.log(employe[0].prenom);
        RemplirChamp(employe);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    var data = new FormData();
    data.append('id',loginID);
    xhr.send(data);
}

function RemplirChamp(employe){
    document.getElementById('loginEmployPrenom').value = employe[0].prenom;
    document.getElementById('loginEmployNom').value = employe[0].nom;
    document.getElementById('loginEmployAdresse').value = employe[0].adresse;
    document.getElementById('loginEmployEmail').value = employe[0].email;
    document.getElementById('loginEmployTelephone').value = employe[0].telephone;
    document.getElementById('loginEmployPassword').value = employe[0].password;
}


var loginInfoModify = document.getElementById("loginInfoModify");
loginInfoModify.addEventListener("click",function(e){
    if(confirm("Etes vous sure de cette modification?")){
        e.preventDefault();
        console.log("modifier");
        modifyEmployee(e);
    }
})



// modify employee
function modifyEmployee(e){
    e.preventDefault();
    
    
    const method = "POST";
    const url = "process.php?action=modifierEmploye";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData();
    data.append("id",loginID)
    data.append("nomEmploy",document.getElementById('loginEmployNom').value)
    data.append("prenomEmploy",document.getElementById('loginEmployPrenom').value)
    data.append("adresseEmploy",document.getElementById('loginEmployAdresse').value)
    data.append("emailEmploy",document.getElementById('loginEmployEmail').value)
    data.append("telEmploy",document.getElementById('loginEmployTelephone').value)
    data.append("loginPassword",document.getElementById('loginEmployPassword').value)
    xhr.addEventListener("readystatechange" , function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var response = JSON.parse(xhr.responseText);
            var response = xhr.responseText;
            console.log("this is response");
            console.log(response);
            if (response=="error"){
                let failMessage = document.getElementById("failed");
                failMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
            else{
                let successMessage = document.getElementById("succes");
                successMessage.removeAttribute("hidden"); // removes the "hidden" attribute
                getEmploye(loginID);
            }
        }
    })
    xhr.send(data);
}
