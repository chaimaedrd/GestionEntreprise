import getXMLHttpRequest from "./utilities.js";

window.onload = ()=>{
    getDepart();
}





// return all employees
function getDepart() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processDepart.php?action=afficherTous', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var departements = JSON.parse(xhr.response);

        createDataTable(departements);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    xhr.send();
}

// create table with departements
function createDataTable(departements) {
    document.querySelector(".table-responsive").innerHTML=`
    <table id="DepartTable" class="table table-striped w-100">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
           
        </table>`;

    $('#DepartTable').DataTable({
        data : departements,
        columns : [
            {data: 'id'},
            {data: 'nom'},
            {data: 'description'},
            
        ]
    })
    
    
}
