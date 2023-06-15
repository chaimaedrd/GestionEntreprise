import getXMLHttpRequest from "./utilities.js";

var loginID = localStorage.getItem('userID');
console.log("here the id from login to employ page");
console.log(loginID);

window.onload = ()=>{
    getAffectations(loginID);
}





// return all projets
function getAffectations(loginID) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processAffectation.php?action=getAffectationEmploy', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var Affectations = xhr.response;

        createDataTable(Affectations);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    xhr.send();
}

// create table with projets
function createDataTable(affectations) {
    document.querySelector(".table-responsive").innerHTML=`
    <table id="AffectationTable" class="table table-striped w-100">
                <thead>
                    <tr>
                    <th scope="col">Role</th>
                    <th scope="col">Projet</th>
                    </tr>
                </thead>
           
        </table>`;

    $('#AffectationTable').DataTable({
        data : affectations,
        columns : [
            {data: 'role'},
            {data: 'nom_projet'},
            
        ]
    })

}
