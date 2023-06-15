import getXMLHttpRequest from "./utilities.js";

// create employee
document.getElementById("addEmployee").addEventListener("click",function(){
    document.getElementById("formEmploye").reset()
    document.getElementById("create").textContent = "Ajouter"
})

let create = document.getElementById("create");

function ajouterEmploy(e) {
    e.preventDefault();
    
    let nomEmploy = document.getElementById("nomEmploy").value;
    let prenomEmploy = document.getElementById("prenomEmploy").value;
    let adresseEmploy = document.getElementById("adresseEmploy").value;
    let emailEmploy = document.getElementById("emailEmploy").value;
    let telEmploy = document.getElementById("telEmploy").value;
    let departementOption = document.getElementById("departemntsSelect").value;

    const method = "POST";
    const url = "process.php?action=create";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData();
    data.append("nomEmploy", nomEmploy);
    data.append("prenomEmploy", prenomEmploy);
    data.append("adresseEmploy", adresseEmploy);
    data.append("emailEmploy", emailEmploy);
    data.append("telEmploy", telEmploy);
    data.append("id_departement", departementOption);

    xhr.addEventListener("readystatechange" , function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText=="error"){
                
                let failMessage = document.getElementById("failed");
                failMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
            else{
                let successMessage = document.getElementById("succes");
                successMessage.removeAttribute("hidden"); // removes the "hidden" attribute
                getEmployees();
            }
        }
    })
    xhr.send(data);
}
  
create.addEventListener("click", function(event){
    if(ValidateModal()){
        //modify employee
        if(this.textContent==="Modifier"){
            modifyEmployee(event);
        }
        //create employee
        if(this.textContent==="Ajouter"){
            ajouterEmploy(event);
        }
        //document.querySelector(".table-responsive").innerHTML = "";
        getEmployees();
    }
    
});

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
                    <th scope="col">#</th>
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
            {data: 'id'},
            {data: 'nom'},
            {data: 'prenom'},
            {data: 'adresse'},
            {data: 'email'},
            {data: 'telephone'},
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
    rows = Array.from(rows)
    console.log(rows[0]);
    // Iterate over the rows
    for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    // Get the ID from the first cell in the row
    var emp_id = row.firstElementChild.textContent;

    // Create a new cell for the buttons
    var cell = document.createElement('td');
    cell.setAttribute('class', 'buttons-cell'); // Add a CSS class for styling if desired

    // Create the buttons
    var button1 = document.createElement('a');
    button1.id = emp_id;
    button1.className = 'text-primary me-2  p-3 editBtn btn';
    button1.title = 'Modifier';
    button1.setAttribute('data-bs-toggle','modal');
    button1.setAttribute('data-bs-target','#createModal');
    button1.addEventListener('click', function(e){
        openModal(e);
    } );
    var editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit"
    button1.appendChild(editIcon);

    var button2 = document.createElement('button');
    button2.setAttribute('id', emp_id); // Set the ID as a data attribute
    var deleteIcon = document.createElement("i")
    deleteIcon.className = "fas fa-trash-alt";
    button2.appendChild(deleteIcon);
    button2.setAttribute('class', 'text-danger me-2 deleteBtn btn');
    button2.setAttribute('title', 'Supprimer');
    button2.type = "submit"
    button2.addEventListener('click',function(e){
        if(confirm("Voulez vous vraiment supprimer cet employe?"))
            suppEmployee(e);
    })

    var deleteForm = document.createElement("form");
    deleteForm.className="d-flex";
    deleteForm.appendChild(button2);
    deleteForm.appendChild(button1);
    // Append the buttons to the cell
    cell.appendChild(deleteForm);

    // Append the new cell to the row
    row.appendChild(cell);
    }

}
// modal for the modify button
function openModal(event){
        getDepartements();
        if(document.getElementById("modifiedEmploye")){
            document.getElementById("modifiedEmploye").remove()
        }

        console.log(event.target)

        var dept_id = event.target.parentElement.getAttribute("id")
        //console.log("employee id is = "+dept_id)

        var employee = event.target.parentElement.parentElement.parentElement
        //console.log(employee);

        document.getElementById("nomEmploy").value = employee.children[1].textContent;
        document.getElementById("prenomEmploy").value = employee.children[2].textContent;
        document.getElementById("adresseEmploy").value = employee.children[3].textContent;
        document.getElementById("emailEmploy").value = employee.children[4].textContent;
        document.getElementById("telEmploy").value = employee.children[5].textContent;
        document.getElementById(`departemntsSelect`).selectedIndex = dept_id;
        document.getElementById("create").textContent = "Modifier";
        let idInput = document.createElement('input');
        idInput.value = dept_id;
        idInput.type = "hidden"
        idInput.id = "modifiedEmploye";
        document.getElementById("formEmploye").appendChild(idInput);

     
    }
// modify employee
function modifyEmployee(e){
    e.preventDefault();
    
    
    const method = "POST";
    const url = "process.php?action=modifier";

    var xhr = getXMLHttpRequest();
    xhr.open(method, url, true);

    let data = new FormData(document.getElementById("formEmploye"));
    data.append("id",document.getElementById("modifiedEmploye").value)
    xhr.addEventListener("readystatechange" , function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("this is response");
            console.log(response);
            if (response=="error"){
                let failMessage = document.getElementById("failed");
                failMessage.removeAttribute("hidden"); // removes the "hidden" attribute

            }
            else{
                let successMessage = document.getElementById("succes");
                successMessage.removeAttribute("hidden"); // removes the "hidden" attribute
                getEmployees();
            }
        }
    })
    xhr.send(data);
}


/*************** */
function suppEmployee(e) {
    e.preventDefault();
    
    // Get the ID of the employee to delete
    var id = e.target.parentElement.getAttribute('id');
    console.log("here"+id);
    
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
  
    // Configure the request
    xhr.open('POST', 'process.php?action=supprimer', true);
    
    // Define the onload event handler
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response === 'success') {
                console.log('Employee deleted successfully');
                getEmployees();
            } else {
            console.log('Error deleting employee');
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
    var nomEmploy = document.getElementById('nomEmploy');
    var prenomEmploy = document.getElementById('prenomEmploy');
    var adresseEmploy = document.getElementById('adresseEmploy');
    var emailEmploy = document.getElementById('emailEmploy');
    var telEmploy = document.getElementById('telEmploy');
  
    // Vérifier si les champs sont vides
    if (nomEmploy.value === '' || prenomEmploy.value === '' || adresseEmploy.value === '' || emailEmploy.value === '' || telEmploy.value === '') {
      alert('Veuillez remplir tous les champs.');
      return false;
    }
  
    // Vérifier la validité de l'adresse email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEmploy.value)) {
      alert('Veuillez entrer une adresse email valide.');
      return false;
    }
  
    // Tous les champs sont valides
    return true;
  }

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
