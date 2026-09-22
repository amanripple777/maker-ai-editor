# OpenCut AI video editor

A functional browser-first multitrack video editor MVP built with Express. It supports local media import, an editable timeline, preview, trim/split, drag/drop clips, waveform previews, project save/load, and optional FFmpeg export.

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
npm start
```

Then open http://localhost:3000. The server also exposes `GET /healthz` for a quick readiness check.

Use **Import** to add local video/audio/image files. Media stays in the browser for editing and is not uploaded until export.

### FFmpeg export (optional)

Install FFmpeg and make sure `ffmpeg -version` works. The editor remains usable without FFmpeg; only MP4 export requires it.

To use a custom FFmpeg binary, set `FFMPEG_PATH` before starting the server.

## Tests

```bash
npm test
```
