<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DreamQuest</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="https://cdn.datatables.net/v/bs5/dt-1.13.4/datatables.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
		<div class="container">
			<a class="navbar-brand" href="home.html"><span class="text-warning">Dream</span>Quest</a> <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button"><span class="navbar-toggler-icon"></span></button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link" href="home.php">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="employ.php">Profil</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="EmployDepart.php">Departements</a>
					</li>
                    <li class="nav-item">
						<a class="nav-link" href="EmployEmploy.php">Employes</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Projects</a>
					</li>
                    <li class="nav-item">
						<a class="nav-link" href="affectationEmploy.php">Affectations</a>
					</li>
                    <li class="nav-item">
						<a class="nav-link" href="home.php">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
    <br>
    <br>
    <section class="container py-5">
        <div class="row">
            <div class=" col-sm mb-5 mx-auto">
                <h1 class="fs-4 text-center lead text-primary"> EMPLOYE </h1>
            </div>
        </div>
        <div class="dropdown-divider border-warning"></div>
        <div class="row">
            <div class="col-md-6">
                <h5 class="fw-bold mb-0 ">Mes informations</h5>
            </div>
        </div>
        <div class="dropdown-divider border-warning"></div>
        <br>
        <section class="container py-5 col-md-6">
            <form id="modifyEmployeForm">
                <h1 id="succes" style="background-color: lightgreen; color:darkgreen; font-size: medium; padding :10px;" hidden>Modification faite avec succes</h1>
                <h1 id="failed" style="background-color: #FFCCCB; color:darkred; font-size: medium; padding :10px;" hidden>Modification non faite</h1>
                
                <div class="mb-3">
                <label for="loginEmployPrenom" class="form-label">Prenom : </label>
                <input type="text" class="form-control" id="loginEmployPrenom">
                </div>

                <div class="mb-3">
                <label for="loginEmployNom" class="form-label">Nom : </label>
                <input type="text" class="form-control" id="loginEmployNom">
                </div>
                
                <div class="mb-3">
                <label for="loginEmployAdresse" class="form-label">Adresse : </label>
                <input type="text" class="form-control" id="loginEmployAdresse">
                </div>

                <div class="mb-3">
                <label for="loginEmployEmail" class="form-label">Email : </label>
                <input type="email" class="form-control" id="loginEmployEmail">
                </div>

                <div class="mb-3">
                <label for="loginEmployTelephone" class="form-label">Telephone : </label>
                <input type="text" class="form-control" id="loginEmployTelephone">
                </div>

                <div class="mb-3">
                <label for="loginEmployPassword" class="form-label">Password : </label>
                <input type="text" class="form-control" id="loginEmployPassword">
                </div>

                <button id = "loginInfoModify" type="submit" class="btn btn-primary">Modifier</button>
            </form>
        </section>
    </section>

    <script src="processEmploy.js" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/v/bs5/dt-1.13.4/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>