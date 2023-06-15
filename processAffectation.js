import getXMLHttpRequest from "./utilities.js";

// create Affectation
document.getElementById("addAffectation").addEventListener("click",function(){
    document.getElementById("formAffectation").reset()
    document.getElementById("create").textContent = "Ajouter"
})

let create = document.getElementById("create");

function ajouterAffectation(e) {
    e.preventDefault();
    
    let roleAffectation = document.getElementById("roleAffectation").value;
    let projetOption = document.getElementById("projetsSelect").value;
    let employeOption = document.getElementById("employesSelect").value;

    const method = "POST";
    const url = "processAffectation.php?action=create";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData();
    data.append("roleAffectation", roleAffectation);
    data.append("id_projet", projetOption);
    data.append("id_employe", employeOption);

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
        //modify Affectation
        if(this.textContent==="Modifier"){
            modifyAffectation(event);
        }
        //create Affectation
        if(this.textContent==="Ajouter"){
            ajouterAffectation(event);
        }
        //document.querySelector(".table-responsive").innerHTML = "";
        getAffectations();
    }
    
});

window.onload = ()=>{
    getAffectations();
}





// return all projets
function getAffectations() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processAffectation.php?action=afficherTous', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var Affectations = JSON.parse(xhr.response);

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
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Projet</th>
                    <th scope="col">Employe</th>
                    </tr>
                </thead>
           
        </table>`;

    $('#AffectationTable').DataTable({
        data : affectations,
        columns : [
            {data: 'id'},
            {data: 'role'},
            {data: 'nom_projet'},
            {data: 'nom_employe'},

            
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
        if(confirm("Voulez vous vraiment supprimer cette affectation?"))
            suppAffectation(e);
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
        getProjets();
        getEmployes();
        if(document.getElementById("modifiedAffectation")){
            document.getElementById("modifiedAffectation").remove()
        }
        var id = event.target.parentElement.getAttribute('id');
        console.log(id);
        var Affectation = document.getElementById(""+id).parentElement.parentElement
        //Bind data to modal form
        document.getElementById("roleAffectation").value = Affectation.children[1].textContent;
        document.getElementById("projetsSelect").value = Affectation.children[2].textContent;
        document.getElementById("employesSelect").value = Affectation.children[3].textContent;

        document.getElementById("create").textContent = "Modifier";
        let idInput = document.createElement('input');
        idInput.value = id;
        idInput.type = "hidden"
        idInput.id = "modifiedAffectation";
        document.getElementById("formAffectation").appendChild(idInput);
    }
// modify projet
function modifyAffectation(e){
    e.preventDefault();
    
    
    const method = "POST";
    const url = "processAffectation.php?action=modifier";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData(document.getElementById("formAffectation"));
    data.append("id",document.getElementById("modifiedAffectation").value)
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
function suppAffectation(e) {
    e.preventDefault();
    
    // Get the ID of the projet to delete
    var id = e.target.parentElement.getAttribute('id');
    console.log(id);
    
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    // Configure the request
    xhr.open('POST', 'processAffectation.php?action=supprimer', true);
  
    // Define the onload event handler
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            console.log(response);
            if (response == 'success') {
                console.log('Affectation deleted successfully');
                getAffectations();
            } else {
            console.log('Error deleting Affectation');
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
    var roleAffectation = document.getElementById('roleAffectation');

    // Vérifier si les champs sont vides
    if (roleAffectation.value === '') {
      alert("Veuillez saisir le role de l'affectation.");
      return false;
    }
  
    // Tous les champs sont valides
    return true;
  }

// return all departements
function getProjets() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processAffectation.php?action=getProjets', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var projets = JSON.parse(xhr.response);
        AjouterProjetSelect(projets);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    
    xhr.send();
}

function getEmployes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'processAffectation.php?action=getEmployes', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var employes = JSON.parse(xhr.response);
        AjouterEmployeSelect(employes);
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    
    xhr.send();
}

function AjouterProjetSelect(projets){
    var select = document.getElementById("projetsSelect");
    projets.forEach(dep => {
        var option = document.createElement("option");
        option.text=dep.nom;
        option.value=dep.id;
        select.add(option);
    });
}

function AjouterEmployeSelect(employes){
    var select = document.getElementById("employesSelect");
    employes.forEach(dep => {
        var option = document.createElement("option");
        option.text=dep.nom;
        option.value=dep.id;
        select.add(option);
    });
}

var addAffectation = document.getElementById("addAffectation");
addAffectation.addEventListener("click",function(){
    getProjets();
    getEmployes();
})

var modal = document.getElementById("createModal");
modal.addEventListener("hidden.bs.modal",function(){
    var select = document.getElementById("projetsSelect");
    select.innerHTML=`<option value="0" selected disabled>choisir un projet</option>`
    var select2 = document.getElementById("employesSelect");
    select2.innerHTML=`<option value="0" selected disabled>choisir un employe</option>`
})