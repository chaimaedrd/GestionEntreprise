<?php

//Connection a la base de donnée
function connectionDB()
{
    $db = new PDO('mysql:host=localhost;dbname=gestionentreprise', 'root', '');
    return $db;
}

//insertion d'un employe 
function insertEmploye($nom, $prenom, $adresse, $email, $telephone,$dep_id)
{   
    $db = connectionDB();
    if($dep_id == 0)
        $res = $db->exec("INSERT INTO employes (nom, prenom, adresse,email,telephone) VALUES ('" . $nom . "', '" . $prenom . "', '" . $adresse . "','" . $email . "','" . $telephone . "')");
    else
        $res = $db->exec("INSERT INTO employes (nom, prenom, adresse,email,telephone,id_departement) VALUES ('" . $nom . "', '" . $prenom . "', '" . $adresse . "','" . $email . "','" . $telephone . "','" . $dep_id . "')");
    if ($res)
        return "success";
    else
        return "error";
}

//afficher tous les employes
function getAllEmployes()
{
    $db = connectionDB();
    $res = $db->query("SELECT e.*,d.nom nom_departement  FROM employes e LEFT JOIN departements d ON e.id_departement=d.id order by e.id");
    //parcourir $res qui contient beaucoups de ligne et le retouner sous format de json
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//afficher un employe
function getEmploye($id)
{
    $db = connectionDB();
    $res = $db->query("SELECT * FROM employes WHERE id = '" . $id . "'");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//modifier un employe
function modifierEmploye($id,$nom, $prenom, $adresse, $email, $telephone,$dep_id)
{
    $db = connectionDB();
    if($dep_id == 0)
        $res = $db->exec("UPDATE employes SET nom = '" . $nom . "', prenom = '" . $prenom . "', adresse = '" . $adresse . "', email = '" . $email . "', telephone = '" . $telephone . "' WHERE id = '" . $id . "'");
    else
    $res = $db->exec("UPDATE employes SET nom = '" . $nom . "', prenom = '" . $prenom . "', adresse = '" . $adresse . "', email = '" . $email . "', telephone = '" . $telephone . "', id_departement'" . $dep_id . "' WHERE id = '" . $id . "'");   
        if ($res)
        return "success";
    else
        return "error";
}

//supprimer un employe
function deleteEmployee($id)
{
    $db = connectionDB();
    $res = $db->exec("DELETE FROM employes WHERE id = '" . $id . "'");
    if ($res)
        return "success";
    else
        return "error";
}

function getDepartements()
{ 
    $db = connectionDB();
    $res = $db->query("SELECT * FROM departements");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}


//DEPARTEMENTS PART

//insertion d'un departement 
function insertDepart($nom, $description)
{   
    $db = connectionDB();
    $res = $db->exec("INSERT INTO departements (nom, description) VALUES ('" . $nom . "', '" . $description . "')");
    if ($res)
        return "success";
    else
        return "error";
}

//afficher tous les departements
function getAllDepart()
{
    $db = connectionDB();
    $res = $db->query("SELECT * FROM departements order by id");
    //parcourir $res qui contient beaucoups de ligne et le retouner sous format de json
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//afficher un departement
function getDepart($id)
{
    $db = connectionDB();
    $res = $db->query("SELECT * FROM departements WHERE id = '" . $id . "'");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//modifier un departement
function modifierDepart($id,$nom, $description)
{
    $db = connectionDB();
    $res = $db->exec("UPDATE departements SET nom = '" . $nom . "', description = '" . $description . "' WHERE id = '" . $id . "'");   
        if ($res)
        return "success";
    else
        return "error";
}

//supprimer un departement
function deleteDepart($id)
{
    $db = connectionDB();
    $res = $db->exec("DELETE FROM departements WHERE id = '" . $id . "'");
    if ($res)
        return "success";
    else
        return "error";
}


// PROJETS PART

//insertion d'un employe 
function insertProjet($nom, $dep_id)
{   
    $db = connectionDB();
    if($dep_id == 0)
        $res = $db->exec("INSERT INTO projets (nom) VALUES ('" . $nom . "')");
    else
        $res = $db->exec("INSERT INTO projets (nom,id_departement) VALUES ('" . $nom . "', '" . $dep_id . "')");
    if ($res)
        return "success";
    else
        return "error";
}

//afficher tous les employes
function getAllProjets()
{
    $db = connectionDB();
    $res = $db->query("SELECT p.*,d.nom nom_departement  FROM projets p LEFT JOIN departements d ON p.id_departement=d.id order by p.id");
    //parcourir $res qui contient beaucoups de ligne et le retouner sous format de json
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//afficher un employe
function getProjet($id)
{
    $db = connectionDB();
    $res = $db->query("SELECT * FROM projets WHERE id = '" . $id . "'");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//modifier un employe
function modifierProjet($id,$nom,$dep_id)
{
    $db = connectionDB();
    if($dep_id == 0)
        $res = $db->exec("UPDATE projets SET nom = '" . $nom . "' WHERE id = '" . $id . "'");
    else
    $res = $db->exec("UPDATE projets SET nom = '" . $nom . "', id_departement'" . $dep_id . "' WHERE id = '" . $id . "'");   
        if ($res)
        return "success";
    else
        return "error";
}

//supprimer un employe
function deleteProjet($id)
{
    $db = connectionDB();
    $res = $db->exec("DELETE FROM projets WHERE id = '" . $id . "'");
    if ($res)
        return "success";
    else
        return "error";
}


// AFFECTATION PART


//insertion d'une affectation 
function insertAffectation($role,$projet_id,$employe_id)
{   
    $db = connectionDB();
    if($projet_id != 0 || $employe_id != 0)
        $res = $db->exec("INSERT INTO affectationep (id_projet, id_employe, role) VALUES ('" . $projet_id  . "', '" . $employe_id . "', '" . $role . "')");
    if ($res)
        return "success";
    else
        return "error";
}

//afficher tous les affectations
function getAllAffectations()
{
    $db = connectionDB();
    $res = $db->query("SELECT af.*,p.nom nom_projet, e.nom nom_employe  FROM affectationep af LEFT JOIN projets p ON af.id_projet=p.id LEFT JOIN employes e ON af.id_employe=e.id order by af.id");
    //parcourir $res qui contient beaucoups de ligne et le retouner sous format de json
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//afficher un employe
function getAffectation($id)
{
    $db = connectionDB();
    $res = $db->query("SELECT * FROM affectationep WHERE id = '" . $id . "'");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

//modifier un employe
function modifierAffectation($id,$role,$projet_id,$employe_id)
{
    $db = connectionDB();
    if($projet_id == 0 || $employe_id==0)
        $res = $db->exec("UPDATE affectationep SET role = '" . $role . "' WHERE id = '" . $id . "'");
    else
    $res = $db->exec("UPDATE affectationep SET role = '" . $role . "',  id_projet ='" . $projet_id . "',id_employe ='" . $employe_id . "' WHERE id = '" . $id . "'");   
        if ($res)
        return "success";
    else
        return "error";
}

//supprimer un employe
function deleteAffectation($id)
{
    $db = connectionDB();
    $res = $db->exec("DELETE FROM affectationep WHERE id = '" . $id . "'");
    if ($res)
        return "success";
    else
        return "error";
}

function getProjets()
{ 
    $db = connectionDB();
    $res = $db->query("SELECT * FROM projets");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

function getEmployes()
{ 
    $db = connectionDB();
    $res = $db->query("SELECT * FROM employes");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}

/************* */

//modifier un employe by him
function modifierEmployeForm($id,$nom, $prenom, $adresse, $email, $telephone,$password)
{
    $db = connectionDB();
    $res = $db->exec("UPDATE employes SET nom = '" . $nom . "', prenom = '" . $prenom . "', adresse = '" . $adresse . "', email = '" . $email . "', telephone = '" . $telephone . "', password = '" . $password . "' WHERE id = '" . $id . "'");   
    if ($res)
        return "success";
    else
        return "error";
}


/*********** */

function getAffectationEmploy($id)
{
    $db = connectionDB();
    $res = $db->query("SELECT af.role role, p.nom nom_projet FROM affectationep af LEFT JOIN projets p ON af.id_projet=p.id WHERE af.id_employe = '"+$id+"'");
    $rows = $res->fetchAll(PDO::FETCH_ASSOC);
    return $rows;
}
