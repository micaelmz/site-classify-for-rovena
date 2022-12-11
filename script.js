// Read the CSV file and extract the text from the "description" column
Papa.parse('csv/file1.csv', {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;

    // Check if the 'data' array is empty
    if (data.length === 0) {
      alert('The CSV file is empty.');
      return;
    }

    // Initialize the 'currentRow' variable with the last row that has a value in the 'classification' column
    let currentRow = data.length - 1;
    while (currentRow >= 0 && !data[currentRow].classification) {
      currentRow--;
    }


    // If no row with a value in the 'classification' column was found, set 'currentRow' to 0
    if (currentRow < 0) {
      currentRow = 0;
    }else{
      currentRow++;
    }

    if (currentRow >= data.length) {
      alert('The CSV file has been fully classified.');
      return;
    }

    // Display the text from the first row of the "description" column
    const textElement = document.getElementById('text');
    textElement.innerHTML = data[currentRow].Text;
    
    const classElement = document.getElementById('classe');
    classElement.innerHTML = data[currentRow].Category;

    // Add event listeners for the buttons
    const button0 = document.getElementById('button0');
    button0.addEventListener('click', () => {
      // Update the classification 0 in the data array
      data[currentRow].classification = 0;

      // Move to the next row of the "description" column
      currentRow++;
      textElement.innerHTML = data[currentRow].Text;
      classElement.innerHTML = data[currentRow].Category;
    });

    const button1 = document.getElementById('button1');
    button1.addEventListener('click', () => {
      // Update the classification 1 in the data array
      data[currentRow].classification = 1;

      // Move to the next row of the "description" column
      currentRow++;
      textElement.innerHTML = data[currentRow].Text;
      classElement.innerHTML = data[currentRow].Category;
    });

    // Add an event listener for the save button
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', () => {
      // Convert the updated data array to a CSV string
      const csv = Papa.unparse(data);
      //saveAs(new Blob([csv], { type: 'text/csv' }), 'file.csv');

      // Send the updated CSV string to the PHP script using the fetch API
      fetch('save-csv.php', {
      method: 'POST',
      body: JSON.stringify({csv: csv}),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(() => {
        // Show a success message
        alert('The CSV file was saved successfully.');
      }).catch((error) => {
        // Show an error message
        alert('An error occurred while saving the CSV file: ' + error);
      });
      window.location.href = window.location.href
    });
  }
});
