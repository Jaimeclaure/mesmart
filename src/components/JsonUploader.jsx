// src/components/JsonUploader.jsx
import React from 'react';

const JsonUploader = ({ onUploadSuccess }) => { // Changed prop name for clarity
  const handleFileChange = async (event) => { // Made async
    const files = event.target.files;
    if (!files.length) return;

    const uploads = [];
    let filesProcessed = 0;
    let errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      // Use a Promise to handle FileReader's async nature
      const readFile = new Promise((resolve, reject) => {
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target.result);
            let category = null;

            // Identify category (you might need more robust logic)
            if (content.productosCafes) category = 'cafe';
            else if (content.productosHamburguesas) category = 'hamburguesa';
            else if (content.productosBistro) category = 'bistro';
            else if (content.productosPostres) category = 'postre';

            if (category) {
              uploads.push({ category: category, data: content });
            } else {
              errors.push(`Could not identify category for file: ${file.name}`);
            }
            resolve();
          } catch (error) {
            errors.push(`Error parsing ${file.name}: ${error.message}`);
            reject(error);
          }
        };
        reader.onerror = (error) => {
           errors.push(`Error reading ${file.name}`);
           reject(error);
        }
        reader.readAsText(file);
      });

      try {
         await readFile; // Wait for this file to be read
      } catch(e) {
         // Error already pushed, continue to next file
      }

      filesProcessed++;
    }

    // After attempting to read all files
    if (errors.length > 0) {
        alert(`Errors occurred:\n${errors.join('\n')}`);
    }

    if (uploads.length > 0) {
      try {
        // Call the Netlify function
        const response = await fetch('/.netlify/functions/update-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploads), // Send all updates at once
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Server responded with an error');
        }

        const result = await response.json();
        console.log('Update result:', result);
        onUploadSuccess(uploads); // Notify App.jsx to update local state
        alert(`${uploads.length} category/ies updated successfully!`);

      } catch (error) {
        console.error("Error calling update-products function:", error);
        alert(`Failed to update products on the server: ${error.message}`);
      }
    } else if (errors.length === 0) {
        alert("No valid menu JSON files were selected or identified.");
    }
  };

  return (
    <div className="uploader-container">
      <label htmlFor="json-upload" className="upload-button">
        Actualizar Precios (.json)
      </label>
      <input
        id="json-upload"
        type="file"
        multiple
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default JsonUploader;