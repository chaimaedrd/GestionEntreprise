import getXMLHttpRequest from "./utilities.js";



window.onload = ()=>{
    getEmployees();
}



var data = null

// return all employees
function getEmployees() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php?action=afficherTous', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var employees = JSON.parse(xhr.response);
        data = employees
        createDataTable(employees);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    xhr.send();
}

// create table with employess
function createDataTable(employees) {
    document.querySelector(".table-responsive").innerHTML=`
    <table id="employeTable" class="table table-striped w-100">
                <thead>
                    <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Departement</th>
                    </tr>
                </thead>
           
        </table>`;

    $('#employeTable').DataTable({
        data : employees,
        columns : [
            {data: 'nom'},
            {data: 'prenom'},
            {data: 'adresse'},
            {data: 'email'},
            {data: 'telephone'},
            {data: 'nom_departement'},
            
        ]
    })
    
}