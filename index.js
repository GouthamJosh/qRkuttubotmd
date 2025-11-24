import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

// Importing the modules
import pairRouter from './pair.js';
import qrRouter from './qr.js';
import QRCode from 'qrcode'; // This is imported but not used in app.js, which is fine

const app = express();

// Resolve the current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// *** Crucial for deployment platforms (Render/Koyeb) ***
// It correctly reads the port set by the hosting environment or defaults to 8000.
const PORT = process.env.PORT || 8000;

// Setting a higher max listeners for event emitters (Good practice for heavy I/O)
import('events').then(events => {
    events.EventEmitter.defaultMaxListeners = 500;
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serving static files from the current directory
app.use(express.static(__dirname));

// ---
// Routes
// ---

// 1. Root Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});

// 2. Health Check Route (*** Recommended Addition for Deployments ***)
// This endpoint is used by Render/Koyeb to determine if your service is running.
app.get('/healthz', (req, res) => {
    // Returning a simple 200 OK status.
    res.status(200).send('OK');
});

// 3. Router Imports
app.use('/pair', pairRouter);
app.use('/qr', qrRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`YoutTube: @killadi_chandu\n\nGitHub: @GouthamSER\n\nServer running on http://localhost:${PORT}`);
});

export default app;
