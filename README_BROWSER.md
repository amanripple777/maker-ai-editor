# OpenCut browser version

1. Download `OpenCut.html`.
2. Double-click it.
3. Open it in Chrome or Edge if your system asks.
4. Start editing.

The browser editor works without Node.js, npm, Express, a server, or installation. Import media with the **Import media** button or drag files into the Media panel, then drag media onto a timeline track.

## Included browser features

- Local video, image, and audio import using browser APIs
- Canvas preview
- Timeline with video, audio, and text tracks
- Drag clips to tracks, selection, trim fields, split, delete, text, and captions
- Audio volume metadata and basic fade transition metadata
- Undo/redo
- Project save/load as JSON files
- Browser-local editing; source media is not uploaded
- WebM export through Canvas `captureStream()` and `MediaRecorder` where supported

## Honest limitations

The standalone file cannot provide the original Express/FFmpeg MP4 export endpoint. Browser WebM export captures the Canvas preview and therefore does not yet mix source audio into the exported file. WebCodecs and Web Audio can improve this in a hosted/secure browser context, but support varies and they are not required for opening this file directly. For frame-accurate MP4 export, full audio mixing, or production codecs, use an optional desktop/backend component.

Projects saved as JSON contain timeline metadata and local object URLs are not portable across browser sessions; re-import the media after loading a project if the preview is unavailable.
