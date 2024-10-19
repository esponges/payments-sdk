import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: uncomment this when we want to serve the SDK as a library
// // Serve all static files from the dist directory
// app.use('/sdk', express.static(path.join(__dirname, '../dist')));

// // Serve the client HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });

// app.get('/zoid', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'index-zoid.html'));
// });

// // Serve the UMD bundle
// app.get('/payment-sdk.umd.js', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'payment-sdk.umd.js'));
// });

// app.listen(port, () => {
//   console.log(`SDK server listening at http://localhost:${port}`);
// });

// export default app;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/zoid', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index-zoid.html'));
});

app.get('/sdk.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'zoid-component.js'));
});

app.listen(port, () => {
  console.log(`SDK server listening at http://localhost:${port}`);
});

export default app;
