const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();
const port = 3001; // You can choose a different port if this one is in use

// Middleware
app.use(cors()); // Allow requests from your frontend (e.g., Vite dev server)
app.use(express.json({ limit: '10mb' })); // To parse JSON request bodies, increased limit for potentially larger data

// Define the path to your data directory
const dataDir = path.join(__dirname, 'src', 'data');

// Helper function to save data to a file
const saveDataToFile = (fileName, data, res) => {
  const filePath = path.join(dataDir, fileName);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to ${fileName}:`, err);
      // Send a server error response
      return res.status(500).json({ message: `Failed to save ${fileName}`, error: err.message });
    }
    console.log(`${fileName} updated successfully.`);
    // Send a success response
    res.status(200).json({ message: `${fileName} updated successfully.` });
  });
};

// API Endpoints for saving data
// ---------------------------------

// Save Projects
app.post('/api/save-projects', (req, res) => {
  saveDataToFile('projects.json', req.body, res);
});

// Save Certificates
app.post('/api/save-certificates', (req, res) => {
  saveDataToFile('certificates.json', req.body, res);
});

// Save Tech Stack
app.post('/api/save-techstack', (req, res) => {
  saveDataToFile('techStack.json', req.body, res);
});

// Basic check to see if server is running
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'Studio backend server is running.' });
});


// Start the server
app.listen(port, () => {
  console.log(`Studio backend server listening at http://localhost:${port}`);
  console.log(`Data directory: ${dataDir}`);
  // Check if data files exist, create them if not (as empty arrays)
  ['projects.json', 'certificates.json', 'techStack.json'].forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFile(filePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
          console.error(`Error creating ${fileName}:`, err);
        } else {
          console.log(`Created empty ${fileName} at ${filePath}`);
        }
      });
    }
  });
});

// Basic error handling for unhandled routes
app.use((req, res) => {
  res.status(404).send("Sorry, can't find that endpoint!");
}); 