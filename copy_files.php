<?php
// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $destination_path = $_POST['destination_path'];
    if (preg_match('/^[a-zA-Z0-9]+$/', $destination_path)){
        if (is_file($destination_path.'.html')) {
        header("Location: http://www.treinamento.rovena.tech/?".$destination_path);
        exit();

        } else {
        // Set the path to the file that stores the number
        $csv_id = "csv_valor.rov";
        
        // Read the number from the file
        $number = intval(file_get_contents($csv_id));
    
        $arquivoPadrao = file_get_contents('files_to_copy/index.html');
        


        // Set the default timezone to Brasília (Brazilian Time)
        date_default_timezone_set('America/Sao_Paulo');
        $currentTime = date('H:i d-m-Y');
    
        $arquivoPadraoModificado = str_replace('[ID_CSV]', $number, $arquivoPadrao);
        $arquivoPadraoModificado = str_replace('[USERNAME]', $destination_path, $arquivoPadraoModificado);
        $arquivoPadraoModificado = str_replace('[HORA_NOTIFICACAO1]', $currentTime, $arquivoPadraoModificado);
        file_put_contents($destination_path . '.html', $arquivoPadraoModificado);
        
        // Increment the number
        $number++;
        
        // Save the incremented number back to the file
        file_put_contents($csv_id, $number);
        $link = "http://www.treinamento.rovena.tech/".$destination_path;
        
        header("Location: ".$destination_path);
        }
      }
      else{
          echo "boa tentativa";
      }
}
?>