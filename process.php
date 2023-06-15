<?php 

include_once('model.php');

$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$nom = isset($_POST['nomEmploy']) ? $_POST['nomEmploy'] : NULL;
$prenom = isset($_POST['prenomEmploy']) ? $_POST['prenomEmploy'] : NULL;
$adresse = isset($_POST['adresseEmploy']) ? $_POST['adresseEmploy'] : NULL;
$email = isset($_POST['emailEmploy']) ? $_POST['emailEmploy'] : NULL;
$tel = isset($_POST['telEmploy']) ? $_POST['telEmploy'] : NULL;
$departementOption = isset($_POST['id_departement']) ? $_POST['id_departement'] : NULL;
/*************************** */
$loginPassword = isset($_POST['loginPassword']) ? $_POST['loginPassword'] : NULL;
$action = isset($_GET['action']) ? $_GET['action'] : NULL;

if ($action == "create") {
    $res = insertEmploye($nom, $prenom, $adresse, $email, $tel, $departementOption);
    if ($res == "success")
        echo "success";
    else
        echo "error";
}else if ($action == "afficherTous") {
    echo json_encode(getAllEmployes());
}else if ($action == "afficher") {
    echo json_encode(getEmploye($id));
} else if ($action == "modifier") {
    //update function
    $res = modifierEmploye($id,$nom, $prenom, $adresse, $email, $tel,$departementOption);
    echo json_encode($res);
} else if ($action == "supprimer") {
    $res = deleteEmployee($id);
    echo json_encode($res);
}else if ($action == "getDepartements") {
    $res = getDepartements();
    echo json_encode($res);
}
/************************** */
else if($action=="login"){
    $res = getEmployes();
    echo json_encode($res);
}

/************ */

else if ($action == "modifierEmploye") {
    //update function
    $res = modifierEmployeForm($id,$nom, $prenom, $adresse, $email, $tel,$loginPassword);
    echo json_encode($res);
}