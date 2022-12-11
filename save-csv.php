<?php

// Set the 'Content-Type' HTTP header to 'text/javascript; charset=utf-8'
header('Content-Type: text/javascript; charset=utf-8');

// Get the JSON object from the POST request body
$json = file_get_contents('php://input');

// Decode the JSON object
$obj = json_decode($json);

// Get the CSV data from the 'csv' property of the JSON object
$csvData = $obj->csv;

// Encode the CSV data as UTF-8
$csvData = mb_convert_encoding($csvData, 'UTF-8');

// Save the encoded CSV data to the server root
file_put_contents('csv/file1.csv', $csvData, FILE_TEXT);

?>
