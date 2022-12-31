<?php

// Get the CSV string
$csv = $_POST['csv'];
$idCsv = $_POST['ID_CSV'];


// Save the CSV string to a file
file_put_contents('csv/' . $idCsv . '.csv', $csv);

?>