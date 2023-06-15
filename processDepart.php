<?php 

include_once('model.php');

$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$nom = isset($_POST['nomDepart']) ? $_POST['nomDepart'] : NULL;
$description = isset($_POST['descriptionDepart']) ? $_POST['descriptionDepart'] : NULL;
$action = isset($_GET['action']) ? $_GET['action'] : NULL;

if ($action == "create") {
    $res = insertDepart($nom, $description);
    if ($res == "success")
        echo "success";
    else
        echo "error";
}else if ($action == "afficherTous") {
    echo json_encode(getAllDepart());
}else if ($action == "afficher") {
    echo json_encode(getDepart($id));
} else if ($action == "modifier") {
    //update function
    $res = modifierDepart($id,$nom,$description);
    echo json_encode($res);
} else if ($action == "supprimer") {
    $res = deleteDepart($id);
    echo json_encode($res);
}