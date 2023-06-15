<?php 

include_once('model.php');

$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$nom = isset($_POST['nomProjet']) ? $_POST['nomProjet'] : NULL;
$departementOption = isset($_POST['id_departement']) ? $_POST['id_departement'] : NULL;
$action = isset($_GET['action']) ? $_GET['action'] : NULL;

if ($action == "create") {
    $res = insertProjet($nom, $departementOption);
    if ($res == "success")
        echo "success";
    else
        echo "error";
}else if ($action == "afficherTous") {
    echo json_encode(getAllProjets());
}else if ($action == "afficher") {
    echo json_encode(getProjet($id));
} else if ($action == "modifier") {
    //update function
    $res = modifierProjet($id,$nom, $departementOption);
    echo json_encode($res);
} else if ($action == "supprimer") {
    $res = deleteProjet($id);
    echo json_encode($res);
}else if ($action == "getDepartements") {
    $res = getDepartements();
    echo json_encode($res);
}