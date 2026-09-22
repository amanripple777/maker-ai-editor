# OpenCut AI video editor

A functional browser-first multitrack video editor MVP built on the existing Express repository. It supports local media import, a real editable timeline, preview, trim/split, drag/drop clips, waveform visualization, text overlays, transitions, undo/redo, keyboard shortcuts, project JSON save/load, and FFmpeg export.

## Run

```bash
npm install
npm start
```

Open http://localhost:3000. Use **Import** to add local video/audio/image files. Media stays in the browser for editing and is not uploaded until export.

### FFmpeg export

Install FFmpeg and make sure `ffmpeg -version` works. The export endpoint uses the first video clip as its source and produces a playable H.264 MP4. The browser editor remains usable without FFmpeg; the export button reports the installation error clearly.

## Shortcuts

- Space: play/pause
- S: split selected clip at the playhead
- Backspace/Delete: remove selected clip
- Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z: undo/redo
- Arrow keys: move playhead

## Tests

```bash
npm test
```
