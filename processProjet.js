import getXMLHttpRequest from "./utilities.js";

// create projet
document.getElementById("addProjet").addEventListener("click",function(){
    document.getElementById("formProjet").reset()
    document.getElementById("create").textContent = "Ajouter"
})

let create = document.getElementById("create");

function ajouterProjet(e) {
    e.preventDefault();
    
    let nomProjet = document.getElementById("nomProjet").value;
    let departementOption = document.getElementById("departemntsSelect").value;

    const method = "POST";
    const url = "processProjet.php?action=create";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData();
    data.append("nomProjet", nomProjet);
    data.append("id_departement", departementOption);

    xhr.addEventListener("readystatechange" , function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText=="success"){
                let successMessage = document.getElementById("succes");
                successMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
            else{
                let failMessage = document.getElementById("failed");
                failMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
        }
    })
    xhr.send(data);
}
  
create.addEventListener("click", function(event){
    if(ValidateModal()){
        //modify projet
        if(this.textContent==="Modifier"){
            modifyProjet(event);
        }
        //create projet
        if(this.textContent==="Ajouter"){
            ajouterProjet(event);
        }
        //document.querySelector(".table-responsive").innerHTML = "";
        getProjets();
    }
    
});

window.onload = ()=>{
    getProjets();
}





// return all projets
function getProjets() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processProjet.php?action=afficherTous', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var projets = JSON.parse(xhr.response);

        createDataTable(projets);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    xhr.send();
}

// create table with projets
function createDataTable(projets) {
    document.querySelector(".table-responsive").innerHTML=`
    <table id="ProjetTable" class="table table-striped w-100">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Departement</th>
                    </tr>
                </thead>
           
        </table>`;

    $('#ProjetTable').DataTable({
        data : projets,
        columns : [
            {data: 'id'},
            {data: 'nom'},
            {data: 'nom_departement'},
            
        ]
    })
    
    /**
     * 
     * 
     * 
     *
     */

        // Get the table element
    var table = document.querySelector(".table-responsive");

    // Get the table head
    var thead = table.getElementsByTagName('thead')[0];

    // Create a new header cell for the buttons column
    var headerCell = document.createElement('th');
    headerCell.textContent = 'Action'; // Set the name of the column

    // Append the new header cell to the table head row
    var headerRow = thead.getElementsByTagName('tr')[0];
    headerRow.appendChild(headerCell);

    // Get the table body
    var tbody = table.getElementsByTagName('tbody')[0];

    // Get the rows in the table body
    var rows = tbody.getElementsByTagName('tr');

    // Iterate over the rows
    for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    // Get the ID from the first cell in the row
    var id = row.cells[0].innerText;

    // Create a new cell for the buttons
    var cell = document.createElement('td');
    cell.setAttribute('class', 'buttons-cell'); // Add a CSS class for styling if desired

    // Create the buttons
    var button1 = document.createElement('a');
    button1.setAttribute('id', id); // Set the ID as a data attribute
    button1.innerHTML = '<i class="fas fa-edit"></i>'; // Add icon 
    button1.setAttribute('class', 'text-primary me-2 editBtn');
    button1.setAttribute('title', 'Modifier');
    button1.setAttribute('data-bs-toggle','modal');
    button1.setAttribute('data-bs-target','#createModal');
    button1.addEventListener('click', function(e){
        openModal(e);
    } );

    var button2 = document.createElement('a');
    button2.setAttribute('id', id); // Set the ID as a data attribute
    button2.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Add icon 
    button2.setAttribute('class', 'text-danger me-2 deleteBtn');
    button2.setAttribute('title', 'Supprimer');
    button2.addEventListener('click',function(e){
        if(confirm("Voulez vous vraiment supprimer ce projet?"))
            suppProjet(e);
    })

    // Append the buttons to the cell
    cell.appendChild(button1);
    cell.appendChild(button2);

    // Append the new cell to the row
    row.appendChild(cell);
    }

}
// modal for the modify button
function openModal(event){
        getDepartements();
        if(document.getElementById("modifiedProjet")){
            document.getElementById("modifiedProjet").remove()
        }
        var id = event.target.parentElement.getAttribute('id');
        console.log(id);
        var projet = document.getElementById(""+id).parentElement.parentElement
        //Bind data to modal form
        document.getElementById("nomProjet").value = projet.children[1].textContent;
        document.getElementById("departemntsSelect").value = projet.children[2].textContent;
        document.getElementById("create").textContent = "Modifier";
        let idInput = document.createElement('input');
        idInput.value = id;
        idInput.type = "hidden"
        idInput.id = "modifiedProjet";
        document.getElementById("formProjet").appendChild(idInput);
    }
// modify projet
function modifyProjet(e){
    e.preventDefault();
    
    
    const method = "POST";
    const url = "processProjet.php?action=modifier";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData(document.getElementById("formProjet"));
    data.append("id",document.getElementById("modifiedProjet").value)
    xhr.addEventListener("readystatechange" , function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText=="error"){
                
                let failMessage = document.getElementById("failed");
                failMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
            else{
                let successMessage = document.getElementById("succes");
                successMessage.removeAttribute("hidden"); // removes the "hidden" attribute
            }
        }
    })
    xhr.send(data);
}


/*************** */
function suppProjet(e) {
    e.preventDefault();
    
    // Get the ID of the projet to delete
    var id = e.target.parentElement.getAttribute('id');
    console.log(id);
    
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    // Configure the request
    xhr.open('POST', 'processProjet.php?action=supprimer', true);
  
    // Define the onload event handler
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            console.log(response);
            if ( response == 'success') {
                console.log('Projet deleted successfully');
                // Remove the row from the table
                getProjets();
            } else {
            console.log('Error deleting Projet');
            }
        } else {
            console.log('Error: ' + xhr.status);
        }
        
    };
  
    // Create the JSON data
    var data = new FormData();
    data.append("id",""+id)
  
    // Send the request with the data
    xhr.send(data);
  }
  
/****************** */


// validate modal
function ValidateModal() {
    var nomProjet = document.getElementById('nomProjet');

    // Vérifier si les champs sont vides
    if (nomProjet.value === '') {
      alert('Veuillez saisir le nom de projet.');
      return false;
    }
  
    // Tous les champs sont valides
    return true;
  }

// return all departements
function getDepartements() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processProjet.php?action=getDepartements', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var departements = JSON.parse(xhr.response);
        AjouterDepartementSelect(departements);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    
    xhr.send();
}

function AjouterDepartementSelect(departements){
    var select = document.getElementById("departemntsSelect");
    departements.forEach(dep => {
        var option = document.createElement("option");
        option.text=dep.nom;
        option.value=dep.id;
        select.add(option);
    });
}

var addProjet = document.getElementById("addProjet");
addProjet.addEventListener("click",function(){
    getDepartements();
})

var modal = document.getElementById("createModal");
modal.addEventListener("hidden.bs.modal",function(){
    var select = document.getElementById("departemntsSelect");
    select.innerHTML=`<option value="0" selected disabled>choisir un departement</option>`
})