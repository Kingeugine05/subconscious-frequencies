import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Get port from command line arguments or environment variable
const args = process.argv.slice(2);
const PORT = args[0] || process.env.PORT || 5001;

// Add CORS headers and security policies
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Add Content-Security-Policy to allow iframe embedding
  res.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors *");
  res.header('X-Frame-Options', 'ALLOWALL');
  res.header('X-Content-Type-Options', 'nosniff');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
const staticDir = path.join(__dirname, 'dist/public');
console.log(`Serving static files from: ${staticDir}`);

// List files in the directory for debugging
const files = fs.readdirSync(staticDir);
console.log('Files in static directory:', files);

// Check if index.html exists
const indexPath = path.join(staticDir, 'index.html');
const indexExists = fs.existsSync(indexPath);
console.log(`index.html exists: ${indexExists}`);

// Serve static files with caching disabled for troubleshooting
app.use(express.static(staticDir, {
  etag: false,
  lastModified: false,
  maxAge: 0,
  index: false
}));

// Explicitly handle the root path
app.get('/', (req, res) => {
  console.log('Root path request');
  
  if (!indexExists) {
    return res.status(404).send('index.html not found');
  }
  
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      return res.status(500).send('Error serving index.html');
    }
  });
});

// Handle all other routes for SPA
app.get('*', (req, res) => {
  console.log(`Request for: ${req.path}`);
  
  if (req.path.startsWith('/api/')) {
    return res.status(404).send('API not implemented in simple server');
  }
  
  // Check if the path exists as a static file
  const filePath = path.join(staticDir, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending ${req.path}:`, err);
        return res.status(500).send(`Error serving ${req.path}`);
      }
    });
  }
  
  // Special handling for static resources that don't exist
  // Return a proper 404 for static resources like CSS, JS, images, etc.
  if (req.path.includes('/static/') || 
      req.path.endsWith('.css') || 
      req.path.endsWith('.js') || 
      req.path.endsWith('.png') || 
      req.path.endsWith('.jpg') || 
      req.path.endsWith('.svg') || 
      req.path.endsWith('.ico')) {
    return res.status(404).send(`Resource not found: ${req.path}`);
  }
  
  // Check if this is a known SPA route that should be handled by the client
  const spaRoutes = ['/offline', '/notes', '/settings', '/bioneural-beats'];
  if (spaRoutes.includes(req.path)) {
    // Fall back to index.html for SPA routing
    if (!indexExists) {
      return res.status(404).send('index.html not found');
    }
    
    res.setHeader('Content-Type', 'text/html');
    return res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        return res.status(500).send('Error serving index.html');
      }
    });
  }
  
  // For all other paths that don't exist as files and aren't SPA routes,
  // return a proper 404 error instead of falling back to index.html
  return res.status(404).send(`Resource not found: ${req.path}`);
});

app.listen(PORT, () => {
  console.log(`Simple server running at http://localhost:${PORT}`);
});