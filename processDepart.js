import getXMLHttpRequest from "./utilities.js";

// create employee
document.getElementById("addDepart").addEventListener("click",function(){
    document.getElementById("formDepart").reset()
    document.getElementById("create").textContent = "Ajouter"
})

let create = document.getElementById("create");

function ajouterDepart(e) {
    e.preventDefault();
    
    let nomDepart = document.getElementById("nomDepart").value;
    let descriptionDepart = document.getElementById("descriptionDepart").value;
    //alert(descriptionDepart+" "+nomDepart);

    const method = "POST";
    const url = "processDepart.php?action=create";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData();
    data.append("nomDepart", nomDepart);
    data.append("descriptionDepart", descriptionDepart);

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
  
create.addEventListener("click", function(event){
    if(ValidateModal()){
        //modify departement
        if(this.textContent==="Modifier"){
            modifyDepart(event);
            getDepart();
        }
        //create employee
        if(this.textContent==="Ajouter"){
            ajouterDepart(event);
        }
        //document.querySelector(".table-responsive").innerHTML = "";
        getDepart();
    }
    
});

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
        if(confirm("Voulez vous vraiment supprimer cet employe?"))
            suppDepart(e);
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
        //getDepartements();
        if(document.getElementById("modifiedDepart")){
            document.getElementById("modifiedDepart").remove()
        }
        var id = event.target.parentElement.getAttribute('id');
        console.log(id);
        var departement = document.getElementById(""+id).parentElement.parentElement
        //Bind data to modal form
        document.getElementById("nomDepart").value = departement.children[1].textContent;
        document.getElementById("descriptionDepart").value = departement.children[2].textContent;
        document.getElementById("create").textContent = "Modifier";
        let idInput = document.createElement('input');
        idInput.value = id;
        idInput.type = "hidden"
        idInput.id = "modifiedDepart";
        document.getElementById("formDepart").appendChild(idInput);
    }
// modify employee
function modifyDepart(e){
    e.preventDefault();
    
    
    const method = "POST";
    const url = "processDepart.php?action=modifier";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData(document.getElementById("formDepart"));
    data.append("id",document.getElementById("modifiedDepart").value)
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

function suppDepart(e) {
    e.preventDefault();
    
    // Get the ID of the departement to delete
    var id = e.target.parentElement.getAttribute('id');
    console.log("here"+id);
    
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    // Configure the request
    xhr.open('POST', 'processDepart.php?action=supprimer', true);
  
    // Set the content type header for JSON
  
    // Define the onload event handler
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response === 'success') {
                console.log('Departement deleted successfully');
                getDepart();
            } else {
            console.log('Error deleting departement');
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
    var nomDepart = document.getElementById('nomDepart');
    var descriptionDepart = document.getElementById('descriptionDepart');
  
    // Vérifier si les champs sont vides
    if (nomDepart.value === '' || descriptionDepart.value === '') {
      alert('Veuillez remplir tous les champs.');
      return false;
    }
  
  
    // Tous les champs sont valides
    return true;
  }

/*
// return all departements
function getDepartements() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php?action=getDepartements', true);
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


var addEmployee = document.getElementById("addEmployee");
addEmployee.addEventListener("click",function(){
    getDepartements();
})


var modal = document.getElementById("createModal");
modal.addEventListener("hidden.bs.modal",function(){
    var select = document.getElementById("departemntsSelect");
    select.innerHTML=`<option value="0" selected disabled>choisir un departement</option>`
})
*/