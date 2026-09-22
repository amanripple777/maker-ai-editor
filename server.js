const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;
const uploads = path.join(os.tmpdir(), 'opencut-uploads');
fs.mkdirSync(uploads, { recursive: true });
const upload = multer({ dest: uploads, limits: { fileSize: 1024 * 1024 * 1024 } });
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/export', upload.single('project'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'A project JSON file is required.' });
  let project;
  try { project = JSON.parse(fs.readFileSync(req.file.path, 'utf8')); } catch { return res.status(400).json({ error: 'Invalid project JSON.' }); }
  const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
  const output = path.join(uploads, `${Date.now()}-opencut.mp4`);
  const firstVideo = (project.clips || []).find(c => c.type === 'video' && c.source);
  if (!firstVideo) return res.status(400).json({ error: 'Add a video clip before exporting.' });
  const args = ['-y', '-i', firstVideo.source, '-t', String(Math.max(0.1, firstVideo.duration || 1)), '-c:v', 'libx264', '-c:a', 'aac', '-movflags', '+faststart', output];
  const child = spawn(ffmpeg, args);
  let error = '';
  child.stderr.on('data', data => { error += data.toString(); });
  child.on('error', err => res.status(501).json({ error: `FFmpeg is unavailable. Install FFmpeg and ensure it is on PATH. ${err.message}` }));
  child.on('close', code => {
    if (code !== 0) return res.status(500).json({ error: `FFmpeg export failed: ${error.slice(-500)}` });
    res.download(output, 'opencut-export.mp4', () => fs.rm(output, { force: true }, () => {}));
  });
});
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.listen(port, () => console.log(`OpenCut running at http://localhost:${port}`));
