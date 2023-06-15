<?php 

include_once('model.php');

$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$role = isset($_POST['role']) ? $_POST['role'] : NULL;
$ProjetOption = isset($_POST['id_projet']) ? $_POST['id_projet'] : NULL;
$ProjetNom = isset($_POST['nom_projet']) ? $_POST['nom_projet'] : NULL;
$EmployeOption = isset($_POST['id_employe']) ? $_POST['id_employe'] : NULL;
$action = isset($_GET['action']) ? $_GET['action'] : NULL;

if ($action == "create") {
    $res = insertAffectation($role, $ProjetOption, $EmployeOption);
    if ($res == "success")
        echo "success";
    else
        echo "error";
}else if ($action == "afficherTous") {
    echo json_encode(getAllAffectations());
}else if ($action == "afficher") {
    echo json_encode(getAffectation($id));
} else if ($action == "modifier") {
    //update function
    $res = modifierAffectation($id,$role, $ProjetOption, $EmployeOption);
    echo json_encode($res);
} else if ($action == "supprimer") {
    $res = deleteAffectation($id);
    echo json_encode($res);
}else if ($action == "getProjets") {
    $res = getProjets();
    echo json_encode($res);
}else if ($action == "getEmployes") {
    $res = getEmployes();
    echo json_encode($res);
}else if ($action == "getAffectationEmploy") {
    $res = getAffectationEmploy($EmployeOption);
    echo json_encode($res);
}