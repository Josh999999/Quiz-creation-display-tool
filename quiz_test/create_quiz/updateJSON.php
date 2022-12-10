<?php
    session_start();
    //Routes the an unauthenticated user back to the login page
    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true || $_SESSION['role'] !== "manager" && $_SESSION['role'] !== "administrator"){
      header("location: ../../templates/login.php");
      exit;
    }


    //Functionality to handle requests to the server:
    //Recieving the "quiz" JSON object and putting it into a new JSON file
    //and inserting it into the database:
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['JSON_quiz']) && isset($_POST['JSON_quiz_name'])){
        //Encode array to json:
        //Convert the JSON string to an object using 'json_decode()' and
        //Convert back to the JSON with 'json_encode()', with the 'JSON_PRETTY_PRINT'
        //keyword to format the JSON properly.
        $json = json_decode($_POST['JSON_quiz']);
        $json = json_encode($json, JSON_PRETTY_PRINT);
        $json_name = $_POST['JSON_quiz_name'];
        $json_filePath = "..quizes/" . $json_name . ".json";

        //generate json file:
        file_put_contents($json_filePath, $json);
        print("File uploaded");
    }

    //return back to the home page:
    header("../../templates/createTask.php");
?>